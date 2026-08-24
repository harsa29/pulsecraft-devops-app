import React from 'react';
import { Server, Globe, Signal } from 'lucide-react';

export default function NodeStatusMap({ nodes }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={20} color="var(--primary-blue)" />
          Regional Infrastructure Nodes
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
          Multi-region edge health and latency response check
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {nodes.map((node) => {
          const isOnline = node.status === 'ONLINE';
          return (
            <div
              key={node.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{node.name}</span>
                <span className={`pulse-dot ${isOnline ? 'online' : 'degraded'}`} />
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                IP: {node.ipAddress}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Signal size={14} /> Ping:
                </span>
                <span style={{ color: isOnline ? 'var(--status-success)' : 'var(--status-warning)', fontWeight: 600 }}>
                  {node.pingMs} ms
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>Load Avg:</span>
                <span style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{node.loadAverage}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
