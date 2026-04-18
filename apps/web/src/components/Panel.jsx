import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { estadoLabel } from '../data/parcelas';
import { polygonAreaHa } from '../hooks/useAzureMap';

Chart.register(...registerables);

const TABS = ['general', 'produccion', 'historico', 'coordenadas'];
const TAB_LABELS = { general: 'General', produccion: 'Producción', historico: 'Histórico', coordenadas: 'Coords' };

function fmt(n) { return '$' + n.toLocaleString('es-MX'); }

function ndviHistory(base) {
  return Array.from({ length: 12 }, (_, i) => {
    const v = base + Math.sin(i * 0.8) * 0.15 + (Math.random() * 0.08 - 0.04);
    return Math.max(0.1, Math.min(0.95, v));
  });
}

// ── Panel component ──────────────────────────────────────────────────────────
export default function Panel({ parcela, onClose }) {
  const [tab, setTab] = useState('general');

  // Reset tab when parcela changes
  useEffect(() => { setTab('general'); }, [parcela?.id]);

  if (!parcela) return null;

  const ndviColor = parcela.ndvi >= 0.6 ? '#4caf50' : parcela.ndvi >= 0.35 ? '#ffc107' : '#f44336';
  const ndviPct   = Math.round(parcela.ndvi * 100);

  return (
    <div className={`panel ${parcela ? 'visible' : ''}`}>
      {/* Header */}
      <div className="panel-header">
        <div>
          <div className="panel-id">{parcela.id}</div>
          <div className="panel-name">{parcela.nombre}</div>
        </div>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      {/* Tabs */}
      <div className="panel-tabs">
        {TABS.map(t => (
          <div
            key={t}
            className={`panel-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {TAB_LABELS[t]}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="panel-body">
        {tab === 'general'     && <TabGeneral    parcela={parcela} ndviColor={ndviColor} ndviPct={ndviPct} />}
        {tab === 'produccion'  && <TabProduccion parcela={parcela} />}
        {tab === 'historico'   && <TabHistorico  parcela={parcela} />}
        {tab === 'coordenadas' && <TabCoords     parcela={parcela} />}
      </div>
    </div>
  );
}

// ── Tab: General ─────────────────────────────────────────────────────────────
function TabGeneral({ parcela: p, ndviColor, ndviPct }) {
  return (
    <>
      <div className={`status-badge ${p.estado_parcela}`}>
        <div className="status-dot" /> {estadoLabel[p.estado_parcela]}
      </div>

      <div className="crop-badge">
        <div className="crop-emoji">{p.emoji}</div>
        <div>
          <div className="crop-info-name">{p.cultivo}</div>
          <div className="crop-info-cycle">{p.ciclo}</div>
        </div>
      </div>

      <div className="data-grid">
        <DataCard label="Superficie"     value={p.hectareas} unit="ha" />
        <DataCard label="Rend. Estimado" value={p.rendimiento_est} small />
        <DataCard label="Inversión"      value={fmt(p.inversion)} small />
        <DataCard label="Precio / Ton"   value={p.precio_ton ? fmt(p.precio_ton) : '–'} small />
      </div>

      <div className="health-bar-wrap info-section">
        <div className="health-bar-label">
          <span>Índice NDVI (salud vegetal)</span>
          <span style={{ color: ndviColor }}>{p.ndvi.toFixed(2)}</span>
        </div>
        <div className="health-bar-track">
          <div className="health-bar-fill" style={{ width: `${ndviPct}%`, background: ndviColor }} />
        </div>
      </div>

      <InfoSection title="👤 Propietario">
        <InfoRow label="Titular"   value={p.propietario} />
        <InfoRow label="Municipio" value={p.municipio} />
        <InfoRow label="Lote"      value={p.lote} />
      </InfoSection>
    </>
  );
}

// ── Tab: Producción ───────────────────────────────────────────────────────────
function TabProduccion({ parcela: p }) {
  const rend       = parseFloat(p.rendimiento_est) || 0;
  const ingreso    = rend * p.hectareas * p.precio_ton;
  const utilidad   = ingreso - p.inversion;
  const roi        = p.inversion > 0 ? Math.round(utilidad / p.inversion * 100) : null;
  const roiColor   = utilidad >= 0 ? '#4caf50' : '#f44336';

  return (
    <>
      <InfoSection title="💧 Sistema de Producción">
        <InfoRow label="Sistema de riego"  value={p.riego} />
        <InfoRow label="Fecha de siembra"  value={p.siembra} />
        <InfoRow label="Cosecha estimada"  value={p.cosecha_est} />
        <InfoRow label="Rendimiento"       value={p.rendimiento_est} />
      </InfoSection>

      <InfoSection title="💰 Proyección Financiera">
        <div className="data-grid">
          <DataCard label="Inversión"    value={fmt(p.inversion)} small />
          <DataCard label="Ingreso Est." value={ingreso > 0 ? fmt(Math.round(ingreso)) : '–'} small />
          <DataCard label="Utilidad Est." value={utilidad !== 0 ? fmt(Math.round(utilidad)) : '–'} small color={roiColor} />
          <DataCard label="ROI"          value={roi !== null ? `${roi}%` : '–'} small color={roiColor} />
        </div>
      </InfoSection>

      {p.inversion > 0 && (
        <InfoSection title="📊 Desglose de Costos (est.)">
          {[
            ['Semilla / plántula', 0.15], ['Mano de obra', 0.30],
            ['Insumos agrícolas', 0.25], ['Riego y energía', 0.18], ['Otros', 0.12],
          ].map(([label, pct]) => (
            <InfoRow key={label} label={label} value={fmt(Math.round(p.inversion * pct))} />
          ))}
        </InfoSection>
      )}
    </>
  );
}

// ── Tab: Histórico ────────────────────────────────────────────────────────────
function TabHistorico({ parcela: p }) {
  const ndviRef  = useRef(null);
  const tempRef  = useRef(null);
  const rainRef  = useRef(null);
  const charts   = useRef([]);

  useEffect(() => {
    charts.current.forEach(c => c.destroy());
    charts.current = [];

    const months12 = ['May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'];

    if (ndviRef.current) {
      charts.current.push(new Chart(ndviRef.current, {
        type: 'line',
        data: {
          labels: months12,
          datasets: [{ label: 'NDVI', data: ndviHistory(p.ndvi), borderColor: '#4caf50', backgroundColor: 'rgba(76,175,80,0.1)', fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#81c784', borderWidth: 2 }],
        },
        options: miniChartOpts({ y: { min: 0, max: 1 }, color: '#66bb6a' }),
      }));
    }

    if (tempRef.current) {
      charts.current.push(new Chart(tempRef.current, {
        type: 'line',
        data: {
          labels: months12,
          datasets: [{ data: [18,20,22,25,27,26,24,23,22,19,17,16], borderColor: '#ff9800', backgroundColor: 'rgba(255,152,0,0.08)', fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2 }],
        },
        options: miniChartOpts({ color: '#ffa726', tickSuffix: '°' }),
      }));
    }

    if (rainRef.current) {
      charts.current.push(new Chart(rainRef.current, {
        type: 'bar',
        data: {
          labels: months12,
          datasets: [{ data: [22,85,120,95,60,28,10,5,8,12,6,15], backgroundColor: 'rgba(33,150,243,0.3)', borderColor: '#2196f3', borderWidth: 1, borderRadius: 3 }],
        },
        options: miniChartOpts({ color: '#64b5f6', tickSuffix: 'mm' }),
      }));
    }

    return () => charts.current.forEach(c => c.destroy());
  }, [p.id, p.ndvi]);

  return (
    <>
      <InfoSection title="📈 Historial NDVI (12 meses)">
        <div className="panel-chart-container"><canvas ref={ndviRef} /></div>
      </InfoSection>
      <InfoSection title="🌡️ Temperatura media mensual">
        <div className="panel-chart-container"><canvas ref={tempRef} /></div>
      </InfoSection>
      <InfoSection title="🌧️ Precipitación mensual">
        <div className="panel-chart-container"><canvas ref={rainRef} /></div>
      </InfoSection>
    </>
  );
}

function miniChartOpts({ color, y = {}, tickSuffix = '' }) {
  return {
    responsive: true, maintainAspectRatio: false,
    scales: {
      y: { ...y, grid: { color: `${color}22` }, ticks: { color, font: { size: 9 }, callback: v => v + tickSuffix } },
      x: { grid: { display: false }, ticks: { color, font: { size: 9 } } },
    },
    plugins: { legend: { display: false } },
  };
}

// ── Tab: Coordenadas ──────────────────────────────────────────────────────────
function TabCoords({ parcela: p }) {
  const cen = [
    p.coords.reduce((s, c) => s + c[0], 0) / p.coords.length,
    p.coords.reduce((s, c) => s + c[1], 0) / p.coords.length,
  ];

  const copyGeoJSON = () => {
    const geojson = { type: 'Feature', properties: { id: p.id, nombre: p.nombre }, geometry: { type: 'Polygon', coordinates: [p.coords] } };
    navigator.clipboard.writeText(JSON.stringify(geojson, null, 2))
      .then(() => alert('GeoJSON copiado al portapapeles'))
      .catch(() => { console.log(JSON.stringify(geojson, null, 2)); alert('Ver consola'); });
  };

  return (
    <>
      <InfoSection title="📍 Vértices del Polígono">
        <table style={{ width: '100%', fontSize: 11, color: 'var(--green-200)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(76,175,80,0.1)' }}>
              {['Vértice','Longitud','Latitud'].map(h => (
                <th key={h} style={{ textAlign: h === 'Vértice' ? 'left' : 'right', padding: '6px 4px', color: 'var(--green-400)', fontSize: 9, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.coords.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '5px 4px', color: 'var(--green-400)' }}>V{i + 1}</td>
                <td style={{ padding: '5px 4px', textAlign: 'right', fontFamily: 'monospace' }}>{c[0].toFixed(4)}</td>
                <td style={{ padding: '5px 4px', textAlign: 'right', fontFamily: 'monospace' }}>{c[1].toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfoSection>

      <InfoSection title="📐 Cálculos Geoespaciales">
        <InfoRow label="Perímetro aprox." value={`${(p.hectareas * 4.2).toFixed(0)} m`} />
        <InfoRow label="Centroide" value={cen.map(v => v.toFixed(4)).join(', ')} mono />
        <InfoRow label="Vértices" value={p.coords.length} />
        <InfoRow label="Zona UTM" value="14N (EPSG:32614)" />
      </InfoSection>

      <button className="btn btn-primary" onClick={copyGeoJSON} style={{ width: '100%', marginTop: 12 }}>
        📋 Copiar coordenadas GeoJSON
      </button>
    </>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────
function InfoSection({ title, children }) {
  return (
    <div className="info-section">
      <div className="info-section-title">{title}</div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value" style={mono ? { fontFamily: 'monospace', fontSize: 11 } : {}}>{value}</span>
    </div>
  );
}

function DataCard({ label, value, unit, small, color }) {
  return (
    <div className="data-card">
      <div className="data-card-label">{label}</div>
      <div className="data-card-value" style={{ ...(small && { fontSize: 13 }), ...(color && { color }) }}>
        {value}{unit && <span className="data-card-unit">{unit}</span>}
      </div>
    </div>
  );
}
