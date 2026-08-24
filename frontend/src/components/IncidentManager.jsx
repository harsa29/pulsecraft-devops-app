import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function IncidentManager({ incidents, onCreateIncident, onUpdateStatus, onDeleteIncident }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [serviceName, setServiceName] = useState('pulsecraft-backend');
  const [severity, setSeverity] = useState('WARNING');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onCreateIncident({
      title,
      serviceName,
      severity,
      description,
      status: 'OPEN'
    });
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return { bg: 'rgba(255, 23, 68, 0.15)', color: '#ff1744', border: 'rgba(255, 23, 68, 0.4)' };
      case 'WARNING':
        return { bg: 'rgba(255, 171, 0, 0.15)', color: '#ffab00', border: 'rgba(255, 171, 0, 0.4)' };
      default:
        return { bg: 'rgba(41, 182, 246, 0.15)', color: '#29b6f6', border: 'rgba(41, 182, 246, 0.4)' };
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="var(--status-warning)" />
            Active Incident & Alert Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
            Spring Data JPA / H2 Persisted Incident Logs
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn-outline" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Log New Incident
        </button>
      </div>

      {/* Incident List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {incidents.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No active incidents detected. All services operating normally.
          </div>
        ) : (
          incidents.map((inc) => {
            const sevBadge = getSeverityBadge(inc.severity);
            return (
              <div
                key={inc.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ background: sevBadge.bg, color: sevBadge.color, border: `1px solid ${sevBadge.border}`, padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginTop: '2px' }}>
                    {inc.severity}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                      {inc.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Service: <span style={{ color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>{inc.serviceName}</span> • Created: {new Date(inc.createdAt).toLocaleTimeString()}
                    </div>
                    {inc.description && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                        {inc.description}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Status Selector */}
                  <select
                    value={inc.status}
                    onChange={(e) => onUpdateStatus(inc.id, e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      color: inc.status === 'RESOLVED' ? 'var(--status-success)' : inc.status === 'IN_PROGRESS' ? 'var(--status-warning)' : 'var(--status-danger)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>

                  <button
                    onClick={() => onDeleteIncident(inc.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
                    title="Delete Incident"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Log New Incident</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memory Spike in Worker Queue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Service Name</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(15,23,42,0.95)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="INFO">INFO</option>
                  <option value="WARNING">WARNING</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide technical details or stack trace summary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-glow">Create Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
