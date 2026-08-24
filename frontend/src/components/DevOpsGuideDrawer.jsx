import React from 'react';
import { X, Server, Terminal, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function DevOpsGuideDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'flex-end', zIndex: 2000 }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', height: '100%', borderRadius: 0, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              DevOps Architecture & Quick Deploy Guide
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Complete Stack: Git → GitHub Actions CI/CD → Docker → Nginx → SSL Certbot → Linux VPS
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* DevOps Tooling Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary-cyan)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={16} /> Backend Stack
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Java 21, Spring Boot 3.2, Spring Data JPA, H2 Database, Actuator, Maven wrapper.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={16} /> Frontend Stack
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              React 18, Vite SPA, Glassmorphism CSS design system, Lucide icons.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={16} /> Container Orchestration
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Multi-stage Dockerfiles (JDK 21 & Node/Nginx), docker-compose.yml.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--status-success)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> Server & SSL
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Nginx reverse proxy with WebSockets, Let's Encrypt / Certbot, Systemd.
            </p>
          </div>
        </div>

        {/* Commands Quick-Reference */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
            Local Development Commands
          </h3>
          <div style={{ background: '#02040a', padding: '16px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '6px' }}># 1. Start Java Spring Boot Backend</div>
            <code style={{ color: 'var(--primary-cyan)' }}>cd backend && ./mvnw spring-boot:run</code>

            <div style={{ color: 'var(--text-muted)', margin: '12px 0 6px' }}># 2. Start React Frontend Dev Server</div>
            <code style={{ color: 'var(--primary-cyan)' }}>cd frontend && npm install && npm run dev</code>

            <div style={{ color: 'var(--text-muted)', margin: '12px 0 6px' }}># 3. Launch Full Production Stack with Docker Compose</div>
            <code style={{ color: 'var(--status-success)' }}>docker compose up --build -d</code>

            <div style={{ color: 'var(--text-muted)', margin: '12px 0 6px' }}># 4. Deploy to Kubernetes Cluster (Kustomize)</div>
            <code style={{ color: 'var(--primary-blue)' }}>kubectl apply -k k8s/</code>
          </div>
        </div>

        {/* Step-by-Step Server Quick Summary */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
            Linux Server Deployment Summary
          </h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Point your domain's <strong>A Record</strong> to your Linux VPS Public IP address.</li>
            <li>Run the automated deployment script on your server: <code style={{ color: 'var(--primary-cyan)' }}>bash devops/scripts/deploy.sh your-domain.com</code></li>
            <li>Configure GitHub Repository Secrets (`SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`).</li>
            <li>Push changes to <code style={{ color: 'var(--accent-purple)' }}>main</code> branch — GitHub Actions will test, build, and deploy automatically!</li>
          </ol>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-card)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Detailed markdown documentation available in <strong>DEPLOYMENT_GUIDE.md</strong>.
        </div>
      </div>
    </div>
  );
}
