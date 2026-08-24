import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export default function LiveCharts({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Gathering streaming chart telemetry points...
      </div>
    );
  }

  const svgWidth = 700;
  const svgHeight = 220;
  const padding = 30;

  const maxLatency = Math.max(...history.map(d => d.latencyMs), 100);
  const pointsCpu = history.map((d, index) => {
    const x = padding + (index / (history.length - 1 || 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - (d.cpuUsage / 100) * (svgHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const pointsLatency = history.map((d, index) => {
    const x = padding + (index / (history.length - 1 || 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - (d.latencyMs / maxLatency) * (svgHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--primary-cyan)" />
            Real-Time Telemetry Streaming Stream
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
            Live CPU Load % vs. Response Latency (ms) past 25 intervals
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '4px', background: 'var(--primary-cyan)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-muted)' }}>CPU %</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '4px', background: 'var(--accent-purple)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-muted)' }}>Latency ms</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', minWidth: '500px' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * (svgHeight - padding * 2);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={svgWidth - padding}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* CPU Polyline */}
          <polyline
            fill="none"
            stroke="var(--primary-cyan)"
            strokeWidth="3"
            points={pointsCpu}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Latency Polyline */}
          <polyline
            fill="none"
            stroke="var(--accent-purple)"
            strokeWidth="3"
            points={pointsLatency}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {history.map((d, index) => {
            const x = padding + (index / (history.length - 1 || 1)) * (svgWidth - padding * 2);
            const yCpu = svgHeight - padding - (d.cpuUsage / 100) * (svgHeight - padding * 2);
            return (
              <circle
                key={index}
                cx={x}
                cy={yCpu}
                r="4"
                fill="var(--primary-cyan)"
                style={{ transition: 'all 0.3s ease' }}
              />
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '8px' }}>
        <span>{history[0]?.timestamp || '00:00:00'}</span>
        <span>Latest ({history[history.length - 1]?.timestamp || '00:00:00'})</span>
      </div>
    </div>
  );
}
