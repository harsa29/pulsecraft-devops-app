import React from 'react';
import { Activity, Flame, ShieldCheck, Terminal, Server, RefreshCw } from 'lucide-react';

export default function Header({ isLive, onToggleLive, onTriggerSpike, onOpenDevOpsGuide, onRefreshAll, isBackendConnected }) {
  return (
    <header className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ background: 'linear-gradient(135deg, #00f2fe, #7f00ff)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
          <Activity size={26} color="#fff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
              PulseCraft
            </h1>
            <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 254, 0.15)', color: 'var(--primary-cyan)', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
              v1.0-PROD
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            Java Spring Boot + React + Multi-Stage DevOps Telemetry Platform
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {/* Backend Connection Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
          <span className={`pulse-dot ${isBackendConnected ? 'online' : 'critical'}`} />
          <span style={{ color: isBackendConnected ? 'var(--status-success)' : 'var(--status-danger)', fontWeight: 500 }}>
            {isBackendConnected ? 'Backend Connected (Java 21)' : 'Offline / Proxying'}
          </span>
        </div>

        {/* Live Stream Toggle */}
        <button onClick={onToggleLive} className="btn-outline" style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={15} style={{ animation: isLive ? 'spin 3s linear infinite' : 'none' }} />
          {isLive ? 'Live Polling (3s)' : 'Paused'}
        </button>

        {/* Trigger Simulated Anomaly */}
        <button onClick={onTriggerSpike} className="btn-danger-glow" style={{ fontSize: '0.85rem' }}>
          <Flame size={16} />
          Trigger Anomaly Spike
        </button>

        {/* Open DevOps Setup Guide */}
        <button onClick={onOpenDevOpsGuide} className="btn-glow" style={{ fontSize: '0.85rem' }}>
          <Terminal size={16} />
          DevOps & Deploy Guide
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
}
