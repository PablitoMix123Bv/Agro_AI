import { useEffect, useRef, useCallback } from 'react';
import * as atlas from 'azure-maps-control';
import { parcelas, colorEstado } from '../data/parcelas';

const AZURE_MAPS_KEY = import.meta.env.VITE_AZURE_MAPS_KEY;
const MAX_VERTICES = 7;

// ── Utilities ────────────────────────────────────────────────────────────────
export function centroid(coords) {
  let lat = 0, lon = 0;
  coords.forEach(c => { lon += c[0]; lat += c[1]; });
  return [lon / coords.length, lat / coords.length];
}

export function polygonAreaHa(coords) {
  let area = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[i + 1];
    area += (x2 - x1) * (y2 + y1);
  }
  area = Math.abs(area / 2);
  const mPerDegLon = 111320 * Math.cos(20.39 * Math.PI / 180);
  const mPerDegLat = 110540;
  area = area * mPerDegLon * mPerDegLat;
  return (area / 10000).toFixed(1);
}

export function descargar(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Custom hook: useAzureMap ─────────────────────────────────────────────────
export function useAzureMap({ containerRef, activeFilters, onParcelaClick, onTooltip }) {
  const mapRef        = useRef(null);
  const polyLayersRef = useRef({});
  const heatLayerRef  = useRef(null);

  // Drawing state
  const drawVertices   = useRef([]);
  const drawMarkers    = useRef([]);
  const drawPreviewDS  = useRef(null);
  const drawLineDS     = useRef(null);
  const clickHandlerRef = useRef(null);
  const isDragging     = useRef(false);

  // ── Init map ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new atlas.Map(containerRef.current, {
      center: [-101.1885, 20.3930],
      zoom: 14,
      style: 'satellite_road_labels',
      view: 'Auto',
      authOptions: { authType: 'subscriptionKey', subscriptionKey: AZURE_MAPS_KEY },
    });

    mapRef.current = map;

    map.events.add('ready', () => {
      // Preview data sources for 7-point drawing
      drawPreviewDS.current = new atlas.source.DataSource('ds_draw_preview');
      drawLineDS.current    = new atlas.source.DataSource('ds_draw_line');
      map.sources.add(drawPreviewDS.current);
      map.sources.add(drawLineDS.current);
      map.layers.add(new atlas.layer.PolygonLayer(drawPreviewDS.current, 'draw_poly', { fillColor: '#ff5252', fillOpacity: 0.2 }));
      map.layers.add(new atlas.layer.LineLayer(drawLineDS.current, 'draw_line', { strokeColor: '#ff5252', strokeWidth: 2.5, strokeDashArray: [6, 4] }));

      // Polygon layers per state
      const estados = ['cultivada', 'barbecho', 'proyectada', 'litigio'];
      estados.forEach(estado => {
        const ds = new atlas.source.DataSource(`ds_${estado}`);
        map.sources.add(ds);

        parcelas
          .filter(p => p.estado_parcela === estado)
          .forEach(p => {
            ds.add(new atlas.data.Feature(
              new atlas.data.Polygon([p.coords]),
              { id: p.id, nombre: p.nombre, estado: p.estado_parcela },
            ));
          });

        const col = colorEstado[estado];

        const polyLayer = new atlas.layer.PolygonLayer(ds, `poly_${estado}`, {
          fillColor: col.fill, fillOpacity: 0.35,
        });
        const lineLayer = new atlas.layer.LineLayer(ds, `line_${estado}`, {
          strokeColor: col.stroke, strokeWidth: 2.5,
          strokeDashArray: estado === 'proyectada' ? [5, 5] : [1],
        });

        polyLayersRef.current[estado] = polyLayer;
        map.layers.add(polyLayer);
        map.layers.add(lineLayer);

        // Click → open panel
        map.events.add('click', polyLayer, (e) => {
          if (!e.shapes?.length) return;
          const props = e.shapes[0].getProperties();
          const p = parcelas.find(x => x.id === props.id);
          if (p) onParcelaClick(p);
        });

        // Hover
        map.events.add('mouseover', polyLayer, (e) => {
          map.getCanvasContainer().style.cursor = 'pointer';
          polyLayer.setOptions({ fillOpacity: 0.55 });
          if (e.shapes?.length) {
            const props = e.shapes[0].getProperties();
            const p = parcelas.find(x => x.id === props.id);
            if (p) onTooltip({ visible: true, text: `${p.emoji} ${p.nombre}<br/>${p.hectareas} ha · ${p.cultivo}` });
          }
        });
        map.events.add('mousemove', polyLayer, (e) => {
          if (e.originalEvent) onTooltip({ x: e.originalEvent.clientX + 16, y: e.originalEvent.clientY - 12 });
        });
        map.events.add('mouseout', polyLayer, () => {
          map.getCanvasContainer().style.cursor = '';
          polyLayer.setOptions({ fillOpacity: 0.35 });
          onTooltip({ visible: false });
        });
      });

      // Labels
      const dsLabels = new atlas.source.DataSource('ds_labels');
      map.sources.add(dsLabels);
      parcelas.forEach(p => {
        const c = centroid(p.coords);
        dsLabels.add(new atlas.data.Feature(
          new atlas.data.Point(c),
          { label: `${p.emoji} ${p.id.replace('GTO-VS-0', 'P')}`, ha: p.hectareas.toFixed(1) },
        ));
      });
      map.layers.add(new atlas.layer.SymbolLayer(dsLabels, null, {
        iconOptions: { image: 'none' },
        textOptions: {
          textField: ['concat', ['get', 'label'], '\n', ['get', 'ha'], ' ha'],
          color: '#fff', haloColor: '#000', haloWidth: 1.5,
          size: 11, font: ['StandardFont-Bold'],
        },
        filter: ['>=', ['zoom'], 13],
      }));

      // NDVI heatmap
      const dsHeat = new atlas.source.DataSource('ds_heatmap');
      map.sources.add(dsHeat);
      parcelas.forEach(p => {
        dsHeat.add(new atlas.data.Feature(new atlas.data.Point(centroid(p.coords)), { weight: p.ndvi * p.hectareas }));
      });
      heatLayerRef.current = new atlas.layer.HeatMapLayer(dsHeat, 'heatmap_ndvi', {
        radius: 40, opacity: 0.6, intensity: 1.5,
        color: ['interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(0,0,0,0)', 0.2, '#f44336', 0.4, '#ff9800',
          0.6, '#ffc107', 0.8, '#8bc34a', 1.0, '#4caf50',
        ],
        weight: ['get', 'weight'],
        visible: false,
      });
      map.layers.add(heatLayerRef.current);
    });

    return () => { map.dispose(); mapRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update layer visibility when filters change ──────────────────────────
  useEffect(() => {
    Object.entries(polyLayersRef.current).forEach(([estado, layer]) => {
      layer.setOptions({ visible: activeFilters.has(estado) });
    });
  }, [activeFilters]);

  // ── Map control methods ──────────────────────────────────────────────────
  const setStyle = useCallback((style) => {
    mapRef.current?.setStyle({ style });
  }, []);

  const fitAll = useCallback(() => {
    const all = parcelas.flatMap(p => p.coords);
    const bbox = atlas.data.BoundingBox.fromPositions(all);
    mapRef.current?.setCamera({ bounds: bbox, padding: 60, type: 'fly', duration: 800 });
  }, []);

  const flyTo = useCallback((center, zoom = 15) => {
    mapRef.current?.setCamera({ center, zoom, type: 'fly', duration: 600 });
  }, []);

  const toggleHeatmap = useCallback((visible) => {
    heatLayerRef.current?.setOptions({ visible });
  }, []);

  // ── 7-point drawing ──────────────────────────────────────────────────────
  const updatePreview = useCallback(() => {
    const verts = drawVertices.current;
    drawPreviewDS.current?.clear();
    drawLineDS.current?.clear();
    if (verts.length < 2) return;
    if (verts.length >= 3) {
      const closed = [...verts, verts[0]];
      drawPreviewDS.current?.add(new atlas.data.Feature(new atlas.data.Polygon([closed])));
      drawLineDS.current?.add(new atlas.data.Feature(new atlas.data.LineString(closed)));
    } else {
      drawLineDS.current?.add(new atlas.data.Feature(new atlas.data.LineString([...verts])));
    }
  }, []);

  const startDrawing = useCallback((onUpdate) => {
    const map = mapRef.current;
    if (!map) return;
    drawVertices.current = [];
    drawMarkers.current.forEach(m => map.markers.remove(m));
    drawMarkers.current = [];
    drawPreviewDS.current?.clear();
    drawLineDS.current?.clear();
    map.getCanvasContainer().style.cursor = 'crosshair';

    clickHandlerRef.current = (e) => {
      if (isDragging.current) return;
      if (drawVertices.current.length >= MAX_VERTICES) return;
      const idx = drawVertices.current.length;
      const pos = [e.position[0], e.position[1]];
      drawVertices.current.push(pos);

      const el = document.createElement('div');
      el.className = 'vertex-marker';
      el.textContent = idx + 1;

      const marker = new atlas.HtmlMarker({ position: pos, htmlContent: el, draggable: true });
      map.events.add('dragstart', marker, () => { isDragging.current = true; });
      map.events.add('drag', marker, () => {
        const p = marker.getOptions().position;
        drawVertices.current[idx] = [p[0], p[1]];
        updatePreview();
        const area = polygonAreaHa([...drawVertices.current, drawVertices.current[0]]);
        onUpdate({ count: drawVertices.current.length, area });
      });
      map.events.add('dragend', marker, () => {
        setTimeout(() => { isDragging.current = false; }, 100);
      });

      map.markers.add(marker);
      drawMarkers.current.push(marker);
      updatePreview();
      const area = polygonAreaHa([...drawVertices.current, drawVertices.current[0]]);
      onUpdate({ count: drawVertices.current.length, area });
    };

    map.events.add('click', clickHandlerRef.current);
  }, [updatePreview]);

  const stopDrawing = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    if (clickHandlerRef.current) {
      map.events.remove('click', clickHandlerRef.current);
      clickHandlerRef.current = null;
    }
    drawMarkers.current.forEach(m => map.markers.remove(m));
    drawMarkers.current = [];
    drawVertices.current = [];
    drawPreviewDS.current?.clear();
    drawLineDS.current?.clear();
    map.getCanvasContainer().style.cursor = '';
  }, []);

  const undoVertex = useCallback((onUpdate) => {
    const map = mapRef.current;
    if (!drawVertices.current.length) return;
    drawVertices.current.pop();
    const last = drawMarkers.current.pop();
    if (last) map?.markers.remove(last);
    updatePreview();
    onUpdate({ count: drawVertices.current.length, area: polygonAreaHa([...drawVertices.current, drawVertices.current[0]]) });
  }, [updatePreview]);

  const getDrawnCoords = useCallback(() => drawVertices.current, []);

  return { setStyle, fitAll, flyTo, toggleHeatmap, startDrawing, stopDrawing, undoVertex, getDrawnCoords };
}
