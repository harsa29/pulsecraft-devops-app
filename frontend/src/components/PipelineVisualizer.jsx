import React, { useState } from 'react';
import { GitBranch, Box, CheckCircle2, ArrowRight, Play, Terminal } from 'lucide-react';

export default function PipelineVisualizer({ stages }) {
  const [selectedStage, setSelectedStage] = useState(null);

  if (!stages || stages.length === 0) return null;

  const currentSelected = selectedStage || stages[stages.length - 1];

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={20} color="var(--primary-cyan)" />
            Git Push to Production CI/CD Pipeline
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
            GitHub Actions → Docker Hub → Linux Server Nginx Deploy
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--status-success)', background: 'rgba(0, 230, 118, 0.1)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,230,118,0.3)' }}>
          <CheckCircle2 size={16} /> Workflow Status: PASSING
        </div>
      </div>

      {/* Pipeline Steps Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '12px' }}>
        {stages.map((stage, idx) => {
          const isSelected = currentSelected.id === stage.id;
          return (
            <React.Fragment key={stage.id}>
              <div
                onClick={() => setSelectedStage(stage)}
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--primary-cyan)' : '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  minWidth: '180px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Stage {idx + 1}</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap' }}>{stage.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>● {stage.status}</span>
                  <span style={{ color: 'var(--text-dim)' }}>{stage.durationSec}s</span>
                </div>
              </div>
              {idx < stages.length - 1 && (
                <ArrowRight size={16} color="var(--text-dim)" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Log Output Viewer for Selected Stage */}
      {currentSelected && (
        <div style={{ marginTop: '16px', background: '#02040a', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} color="var(--primary-cyan)" /> Step Log Output: <strong>{currentSelected.name}</strong>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>Execution Time: {currentSelected.durationSec} seconds</span>
          </div>
          <pre className="mono-font" style={{ color: 'var(--primary-cyan)', fontSize: '0.82rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            {currentSelected.logSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}
