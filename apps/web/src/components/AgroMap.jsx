import { useState, useRef, useCallback } from 'react';
import Sidebar from './Sidebar';
import Panel   from './Panel';
import { parcelas } from '../data/parcelas';
import { useAzureMap, centroid, polygonAreaHa, descargar } from '../hooks/useAzureMap';

const MAX_VERTICES = 7;

export default function AgroMap() {
  // ── State ──────────────────────────────────────────────────────────────────
  const mapContainerRef = useRef(null);

  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [selectedP,     setSelectedP]     = useState(null);
  const [activeFilters, setActiveFilters] = useState(new Set(['cultivada','barbecho','proyectada','litigio']));
  const [heatmapOn,     setHeatmapOn]     = useState(false);
  const [tooltip,       setTooltip]       = useState({ visible: false, text: '', x: 0, y: 0 });
  const [searchQ,       setSearchQ]       = useState('');
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [showExport,    setShowExport]    = useState(false);
  const [drawMode,      setDrawMode]      = useState(false);   // 'draw' | 'measure' | false
  const [drawInfo,      setDrawInfo]      = useState({ count: 0, area: '0.0' });
  const [mapStyle,      setMapStyle]      = useState('satellite_road_labels');

  // ── Map hook ───────────────────────────────────────────────────────────────
  const { setStyle, fitAll, flyTo, toggleHeatmap, startDrawing, stopDrawing, undoVertex, getDrawnCoords } =
    useAzureMap({
      containerRef: mapContainerRef,
      activeFilters,
      onParcelaClick: p => setSelectedP(p),
      onTooltip: upd => setTooltip(prev => ({ ...prev, ...upd })),
    });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleToggleFilter = useCallback(estado => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      next.has(estado) ? next.delete(estado) : next.add(estado);
      return next;
    });
  }, []);

  const handleSelectParcela = useCallback(p => {
    flyTo(centroid(p.coords));
    setSelectedP(p);
    setSidebarOpen(false);
  }, [flyTo]);

  const handleToggleHeatmap = useCallback(() => {
    setHeatmapOn(prev => { toggleHeatmap(!prev); return !prev; });
  }, [toggleHeatmap]);

  const handleSetStyle = useCallback(style => {
    setMapStyle(style);
    setStyle(style);
  }, [setStyle]);

  // Drawing
  const startDrawMode = useCallback(mode => {
    if (drawMode) { stopDrawing(); setDrawMode(false); setDrawInfo({ count: 0, area: '0.0' }); return; }
    setDrawMode(mode);
    setDrawInfo({ count: 0, area: '0.0' });
    startDrawing(info => setDrawInfo(info));
  }, [drawMode, startDrawing, stopDrawing]);

  const handleUndo = useCallback(() => {
    undoVertex(info => setDrawInfo(info));
  }, [undoVertex]);

  const handleConfirmDraw = useCallback(() => {
    const coords = getDrawnCoords();
    if (coords.length < 3) { alert('Necesitas al menos 3 puntos.'); return; }
    const closed = [...coords, coords[0]];
    const area   = polygonAreaHa(closed);
    const msg    = drawMode === 'measure'
      ? `📐 Área medida: ${area} ha\n📍 Vértices: ${coords.length}`
      : `🌾 Polígono guardado\n📐 Área: ${area} ha\n📍 Vértices: ${coords.length}`;
    alert(msg);
    console.log('GeoJSON:', JSON.stringify({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [closed] } }, null, 2));
    stopDrawing();
    setDrawMode(false);
    setDrawInfo({ count: 0, area: '0.0' });
  }, [drawMode, getDrawnCoords, stopDrawing]);

  const handleCancelDraw = useCallback(() => {
    stopDrawing(); setDrawMode(false); setDrawInfo({ count: 0, area: '0.0' });
  }, [stopDrawing]);

  // Search
  const searchMatches = searchQ.trim()
    ? parcelas.filter(p =>
        p.nombre.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.propietario.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.cultivo.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQ.toLowerCase()))
    : [];

  // Export
  const exportCSV = () => {
    const headers = ['ID','Nombre','Propietario','Cultivo','Hectáreas','Estado','Riego','Siembra','Cosecha','NDVI','Rendimiento'];
    const rows = parcelas.map(p => [p.id,p.nombre,p.propietario,p.cultivo,p.hectareas,p.estado_parcela,p.riego,p.siembra,p.cosecha_est,p.ndvi,p.rendimiento_est]);
    descargar([headers,...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n'), 'parcelas.csv', 'text/csv');
    setShowExport(false);
  };

  const exportGeoJSON = () => {
    const fc = { type: 'FeatureCollection', features: parcelas.map(p => ({ type: 'Feature', properties: { id: p.id, nombre: p.nombre, cultivo: p.cultivo, hectareas: p.hectareas, estado: p.estado_parcela, ndvi: p.ndvi }, geometry: { type: 'Polygon', coordinates: [p.coords] } })) };
    descargar(JSON.stringify(fc, null, 2), 'parcelas.geojson', 'application/json');
    setShowExport(false);
  };

  const exportKML = () => {
    const kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n<Document>\n${parcelas.map(p => `<Placemark><name>${p.nombre}</name><description>${p.cultivo} - ${p.hectareas} ha</description><Polygon><outerBoundaryIs><LinearRing><coordinates>${p.coords.map(c => `${c[0]},${c[1]},0`).join(' ')}</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>`).join('\n')}\n</Document>\n</kml>`;
    descargar(kml, 'parcelas.kml', 'application/vnd.google-earth.kml+xml');
    setShowExport(false);
  };

  // ── Stats bar ──────────────────────────────────────────────────────────────
  const totalHa  = parcelas.reduce((s, p) => s + p.hectareas, 0).toFixed(1);
  const cultivos = new Set(parcelas.filter(p => !p.cultivo.includes('Sin')).map(p => p.cultivo)).size;
  const produc   = parcelas.filter(p => p.estado_parcela === 'cultivada').length;
  const avgNdvi  = (parcelas.reduce((s, p) => s + p.ndvi, 0) / parcelas.length).toFixed(2);

  // ── Draw indicator ─────────────────────────────────────────────────────────
  const drawComplete = drawInfo.count === MAX_VERTICES;
  const drawLabel = drawMode
    ? drawComplete
      ? `✅ Polígono completo — Área: ${drawInfo.area} ha — Arrastra puntos para ajustar`
      : `${drawMode === 'measure' ? 'Modo medición' : 'Modo dibujo'} — ${drawInfo.count}/${MAX_VERTICES} puntos${drawInfo.count > 0 ? ` · ${drawInfo.area} ha` : ''}`
    : '';

  return (
    <div className="agromap-root">
      {/* ── Map canvas ── */}
      <div ref={mapContainerRef} className="map-canvas" />

      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="logo">
          <div className="logo-icon">🌾</div>
          <div>
            <div className="logo-text">AgroMap Pro</div>
            <div className="logo-sub">Valle de Santiago, Gto.</div>
          </div>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text" placeholder="Buscar parcela, propietario, cultivo…"
            value={searchQ}
            onChange={e => { setSearchQ(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          />
          {searchOpen && searchMatches.length > 0 && (
            <div className="search-results show">
              {searchMatches.map(p => (
                <div key={p.id} className="search-result-item" onMouseDown={() => { handleSelectParcela(p); setSearchQ(''); setSearchOpen(false); }}>
                  <div className="sr-emoji">{p.emoji}</div>
                  <div>
                    <div className="sr-name">{p.nombre}</div>
                    <div className="sr-sub">{p.id} · {p.hectareas} ha · {p.propietario}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="topbar-stats">
          {[
            { v: parcelas.length,  label: 'Parcelas'    },
            { v: totalHa,          label: 'Hectáreas'   },
            { v: cultivos,         label: 'Cultivos'    },
            { v: produc,           label: 'Produciendo' },
            { v: avgNdvi,          label: 'NDVI Prom.'  },
          ].map(({ v, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-value">{v}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="topbar-actions">
          <button className={`tb-btn ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(o => !o)}>
            📊<span className="tb-tooltip">Dashboard</span>
          </button>
          <button className={`tb-btn ${drawMode === 'draw' ? 'active' : ''}`} onClick={() => startDrawMode('draw')}>
            ✏️<span className="tb-tooltip">Dibujar parcela</span>
          </button>
          <button className={`tb-btn ${drawMode === 'measure' ? 'active' : ''}`} onClick={() => startDrawMode('measure')}>
            📐<span className="tb-tooltip">Medir área</span>
          </button>
          <button className={`tb-btn ${heatmapOn ? 'active' : ''}`} onClick={handleToggleHeatmap}>
            🔥<span className="tb-tooltip">Mapa NDVI</span>
          </button>
          <button className="tb-btn" onClick={() => setShowExport(true)}>
            📥<span className="tb-tooltip">Exportar datos</span>
          </button>
        </div>
      </div>

      {/* ── Draw indicator ── */}
      {drawMode && (
        <div className={`draw-indicator ${drawComplete ? 'green' : ''}`}>
          {!drawComplete && <div className="draw-pulse" />}
          <span>{drawLabel}</span>
          <div className="point-counter" style={{ marginLeft: 8 }}>
            {Array.from({ length: MAX_VERTICES }, (_, i) => (
              <div key={i} className={`pc-dot ${i < drawInfo.count ? 'filled' : ''}`} />
            ))}
          </div>
        </div>
      )}

      {/* ── Draw actions ── */}
      {drawMode && (
        <div className="draw-actions">
          <button className="btn btn-ghost" onClick={handleUndo}>↩ Deshacer</button>
          <button className="btn btn-primary" onClick={handleConfirmDraw}>✅ Confirmar</button>
          <button className="btn btn-ghost" style={{ color: 'var(--red-light)' }} onClick={handleCancelDraw}>✕ Cancelar</button>
        </div>
      )}

      {/* ── Sidebar ── */}
      <Sidebar
        open={sidebarOpen}
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onSelectParcela={handleSelectParcela}
      />

      {/* ── Detail Panel ── */}
      <Panel parcela={selectedP} onClose={() => setSelectedP(null)} />

      {/* ── Map controls ── */}
      <div className="map-controls">
        <button className={`mc-btn ${mapStyle === 'satellite_road_labels' ? 'active' : ''}`} onClick={() => handleSetStyle('satellite_road_labels')} title="Satélite">🛰️</button>
        <button className={`mc-btn ${mapStyle === 'grayscale_dark' ? 'active' : ''}`} onClick={() => handleSetStyle('grayscale_dark')} title="Oscuro">🌑</button>
        <button className={`mc-btn ${mapStyle === 'road' ? 'active' : ''}`} onClick={() => handleSetStyle('road')} title="Carretera">🗺️</button>
        <button className="mc-btn" onClick={fitAll} title="Ver todas">🎯</button>
      </div>

      {/* ── Tooltip ── */}
      {tooltip.visible && (
        <div
          className="map-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.text }}
        />
      )}

      {/* ── Leyenda ── */}
      <div className={`leyenda ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="leyenda-title">Estado de Parcela</div>
        {[['#4caf50','Cultivada'],['#ffc107','Barbecho'],['#2196f3','Proyectada'],['#f44336','En litigio']].map(([color, label]) => (
          <div key={label} className="leyenda-item">
            <div className="leyenda-color" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>

      {/* ── Weather widget ── */}
      <div className="weather-widget">
        <div className="weather-header">
          <div className="weather-icon">⛅</div>
          <div>
            <div className="weather-temp">24°C</div>
            <div className="weather-desc">Parcialmente nublado</div>
          </div>
        </div>
        <div className="weather-details">
          <div className="wd-item">💧 <span>62%</span> hum</div>
          <div className="wd-item">🌬️ <span>12</span> km/h</div>
          <div className="wd-item">☀️ UV <span>6</span></div>
        </div>
      </div>

      {/* ── Export modal ── */}
      {showExport && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowExport(false)}>
          <div className="modal">
            <h3>📥 Exportar Datos de Parcelas</h3>
            <div className="export-options" style={{ marginBottom: 20 }}>
              {[
                { icon: '📄', title: 'CSV (Excel)',        desc: 'Tabla con todos los datos de parcelas',  fn: exportCSV },
                { icon: '🗺️', title: 'GeoJSON',           desc: 'Polígonos geoespaciales para GIS',       fn: exportGeoJSON },
                { icon: '🌐', title: 'KML (Google Earth)', desc: 'Abrir parcelas en Google Earth',         fn: exportKML },
              ].map(opt => (
                <div key={opt.title} className="export-option" onClick={opt.fn}>
                  <div className="eo-icon">{opt.icon}</div>
                  <div>
                    <div className="eo-title">{opt.title}</div>
                    <div className="eo-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-btn-row">
              <button className="btn btn-ghost" onClick={() => setShowExport(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
