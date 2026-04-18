import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { parcelas } from '../data/parcelas';

Chart.register(...registerables);

// ── Sidebar component ────────────────────────────────────────────────────────
export default function Sidebar({ open, activeFilters, onToggleFilter, onSelectParcela }) {
  const cultivoChartRef = useRef(null);
  const ndviChartRef    = useRef(null);
  const cultivoInstance = useRef(null);
  const ndviInstance    = useRef(null);

  // Stats
  const totalHa      = parcelas.reduce((s, p) => s + p.hectareas, 0);
  const totalInv     = parcelas.reduce((s, p) => s + p.inversion, 0);
  const cultivando   = parcelas.filter(p => p.estado_parcela === 'cultivada');
  const estIngresos  = cultivando.reduce((s, p) => {
    const rend = parseFloat(p.rendimiento_est) || 0;
    return s + rend * p.hectareas * p.precio_ton;
  }, 0);

  const fmt = n => '$' + n.toLocaleString('es-MX');

  const estados = [
    { key: 'cultivada',  label: 'Cultivada',   count: parcelas.filter(p => p.estado_parcela === 'cultivada').length },
    { key: 'barbecho',   label: 'Barbecho',     count: parcelas.filter(p => p.estado_parcela === 'barbecho').length },
    { key: 'proyectada', label: 'Proyectada',   count: parcelas.filter(p => p.estado_parcela === 'proyectada').length },
    { key: 'litigio',    label: 'Litigio',      count: parcelas.filter(p => p.estado_parcela === 'litigio').length },
  ];

  // ── Charts ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;

    // Destroy previous instances
    cultivoInstance.current?.destroy();
    ndviInstance.current?.destroy();

    // Cultivo doughnut
    const cultivoMap = {};
    parcelas.forEach(p => {
      const c = p.cultivo.includes('Sin') ? 'Sin asignar' : p.cultivo;
      cultivoMap[c] = (cultivoMap[c] || 0) + p.hectareas;
    });
    const colors = ['#4caf50','#66bb6a','#81c784','#a5d6a7','#ffc107','#ff9800','#2196f3','#f44336','#9c27b0','#00bcd4'];

    if (cultivoChartRef.current) {
      cultivoInstance.current = new Chart(cultivoChartRef.current, {
        type: 'doughnut',
        data: {
          labels: Object.keys(cultivoMap),
          datasets: [{ data: Object.values(cultivoMap), backgroundColor: colors, borderColor: 'rgba(0,0,0,0.3)', borderWidth: 1 }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: '#a5d6a7', font: { size: 10, family: 'Inter' }, boxWidth: 10, padding: 6 } } },
        },
      });
    }

    // NDVI bar
    const estadosArr = ['cultivada', 'barbecho', 'proyectada', 'litigio'];
    const ndviColors = ['#4caf50', '#ffc107', '#2196f3', '#f44336'];
    const avgNdvi = estadosArr.map(e => {
      const ps = parcelas.filter(p => p.estado_parcela === e);
      return ps.length ? +(ps.reduce((s, p) => s + p.ndvi, 0) / ps.length).toFixed(2) : 0;
    });

    if (ndviChartRef.current) {
      ndviInstance.current = new Chart(ndviChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Cultivada', 'Barbecho', 'Proyectada', 'Litigio'],
          datasets: [{
            data: avgNdvi, label: 'NDVI Promedio',
            backgroundColor: ndviColors.map(c => c + '55'), borderColor: ndviColors,
            borderWidth: 1, borderRadius: 4,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: {
            y: { min: 0, max: 1, grid: { color: 'rgba(76,175,80,0.06)' }, ticks: { color: '#66bb6a', font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { color: '#66bb6a', font: { size: 10 } } },
          },
          plugins: { legend: { display: false } },
        },
      });
    }

    return () => {
      cultivoInstance.current?.destroy();
      ndviInstance.current?.destroy();
    };
  }, [open]);

  const filtered = parcelas.filter(p => activeFilters.has(p.estado_parcela));

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      {/* Dashboard KPIs */}
      <div className="sidebar-section">
        <div className="sidebar-title">📊 Resumen General</div>
        <div className="dashboard-grid">
          <div className="dash-card">
            <div className="dash-card-value">{totalHa.toFixed(1)}<span style={{ fontSize: 12, color: 'var(--green-300)' }}> ha</span></div>
            <div className="dash-card-label">Superficie Total</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-value">{cultivando.length}/{parcelas.length}</div>
            <div className="dash-card-label">En Producción</div>
            <div className="dash-card-delta up">↑ {Math.round(cultivando.length / parcelas.length * 100)}% activas</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-value" style={{ fontSize: 16 }}>{fmt(totalInv)}</div>
            <div className="dash-card-label">Inversión Total</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-value" style={{ fontSize: 14 }}>{fmt(Math.round(estIngresos))}</div>
            <div className="dash-card-label">Ingreso Est. Bruto</div>
            <div className="dash-card-delta up">↑ Proyección ciclo</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sidebar-section">
        <div className="sidebar-title">🏷️ Filtrar por Estado</div>
        <div className="filter-chips">
          {estados.map(e => (
            <div
              key={e.key}
              className={`chip ${e.key} ${activeFilters.has(e.key) ? 'active' : ''}`}
              onClick={() => onToggleFilter(e.key)}
            >
              {e.label} ({e.count})
            </div>
          ))}
        </div>
      </div>

      {/* Cultivo chart */}
      <div className="sidebar-section">
        <div className="sidebar-title">📈 Distribución por Cultivo</div>
        <div className="chart-container">
          <canvas ref={cultivoChartRef} />
        </div>
      </div>

      {/* NDVI chart */}
      <div className="sidebar-section">
        <div className="sidebar-title">🌱 NDVI Promedio por Estado</div>
        <div className="chart-container">
          <canvas ref={ndviChartRef} />
        </div>
      </div>

      {/* Parcela list */}
      <div className="sidebar-section">
        <div className="sidebar-title">📋 Todas las Parcelas</div>
        {filtered.map(p => (
          <div key={p.id} className="parcela-list-item" onClick={() => onSelectParcela(p)}>
            <div className={`pli-status ${p.estado_parcela}`} />
            <div className="pli-emoji">{p.emoji}</div>
            <div>
              <div className="pli-name">{p.nombre}</div>
              <div className="pli-sub">{p.cultivo}</div>
            </div>
            <div className="pli-ha">{p.hectareas} ha</div>
          </div>
        ))}
      </div>
    </div>
  );
}
