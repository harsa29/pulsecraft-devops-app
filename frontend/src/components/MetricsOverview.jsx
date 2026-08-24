import React from 'react';
import { Cpu, HardDrive, CpuIcon, Zap, Clock, Users } from 'lucide-react';

export default function MetricsOverview({ currentMetric }) {
  if (!currentMetric) {
    return (
      <div className="grid-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-panel" style={{ padding: '20px', minHeight: '120px', opacity: 0.5 }}>
            Loading Telemetry Metrics...
          </div>
        ))}
      </div>
    );
  }

  const { cpuUsage, ramUsage, jvmHeapUsage, latencyMs, requestsPerSec, activeThreads, healthStatus } = currentMetric;

  const getCpuColor = (val) => val > 75 ? 'var(--status-danger)' : val > 45 ? 'var(--status-warning)' : 'var(--primary-cyan)';
  const getLatencyColor = (val) => val > 200 ? 'var(--status-danger)' : val > 80 ? 'var(--status-warning)' : 'var(--status-success)';

  return (
    <div className="grid-4">
      {/* CPU Usage Card */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>System CPU Load</span>
          <div style={{ background: 'rgba(0, 242, 254, 0.12)', padding: '8px', borderRadius: '8px', color: getCpuColor(cpuUsage) }}>
            <Cpu size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: getCpuColor(cpuUsage), fontFamily: 'var(--font-mono)' }}>
          {cpuUsage}%
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(cpuUsage, 100)}%`, height: '100%', background: getCpuColor(cpuUsage), transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* RAM & Memory Card */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Host RAM Usage</span>
          <div style={{ background: 'rgba(79, 172, 254, 0.12)', padding: '8px', borderRadius: '8px', color: 'var(--primary-blue)' }}>
            <HardDrive size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
          {ramUsage}%
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(ramUsage, 100)}%`, height: '100%', background: 'var(--primary-blue)', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* JVM Heap Usage Card */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>JVM Heap Allocation</span>
          <div style={{ background: 'rgba(127, 0, 255, 0.12)', padding: '8px', borderRadius: '8px', color: 'var(--accent-purple)' }}>
            <Zap size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
          {jvmHeapUsage} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>MB</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
          {activeThreads} Active Worker Threads
        </div>
      </div>

      {/* Latency & Throughput Card */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>API Latency p95</span>
          <div style={{ background: 'rgba(0, 230, 118, 0.12)', padding: '8px', borderRadius: '8px', color: getLatencyColor(latencyMs) }}>
            <Clock size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: getLatencyColor(latencyMs), fontFamily: 'var(--font-mono)' }}>
          {latencyMs} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>ms</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>RPS: <strong style={{ color: '#fff' }}>{requestsPerSec} req/s</strong></span>
          <span style={{ color: healthStatus === 'HEALTHY' ? 'var(--status-success)' : 'var(--status-warning)' }}>
            ● {healthStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
