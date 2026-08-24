import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import MetricsOverview from './components/MetricsOverview.jsx';
import LiveCharts from './components/LiveCharts.jsx';
import IncidentManager from './components/IncidentManager.jsx';
import NodeStatusMap from './components/NodeStatusMap.jsx';
import PipelineVisualizer from './components/PipelineVisualizer.jsx';
import DevOpsGuideDrawer from './components/DevOpsGuideDrawer.jsx';

const API_BASE = '/api/v1';

export default function App() {
  const [isLive, setIsLive] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(null);
  const [history, setHistory] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [pipelineStages, setPipelineStages] = useState([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Fetch initial telemetry history & incidents
  const fetchAllData = async () => {
    try {
      const [histRes, incRes, nodeRes, pipeRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/metrics/history`),
        axios.get(`${API_BASE}/incidents`),
        axios.get(`${API_BASE}/nodes`),
        axios.get(`${API_BASE}/devops/pipeline`)
      ]);

      if (histRes.status === 'fulfilled') {
        setHistory(histRes.value.data);
        if (histRes.value.data.length > 0) {
          setCurrentMetric(histRes.value.data[histRes.value.data.length - 1]);
        }
        setIsBackendConnected(true);
      } else {
        setIsBackendConnected(false);
        // Fallback default state for initial view before backend start
        setFallbackState();
      }

      if (incRes.status === 'fulfilled') setIncidents(incRes.value.data);
      if (nodeRes.status === 'fulfilled') setNodes(nodeRes.value.data);
      if (pipeRes.status === 'fulfilled') setPipelineStages(pipeRes.value.data);
    } catch (err) {
      console.warn('Backend connection polling:', err.message);
      setIsBackendConnected(false);
      setFallbackState();
    }
  };

  const setFallbackState = () => {
    const now = new Date().toLocaleTimeString();
    const fallbackPoint = {
      timestamp: now,
      cpuUsage: 24.5,
      ramUsage: 48.2,
      jvmHeapUsage: 340,
      latencyMs: 24,
      requestsPerSec: 310,
      activeThreads: 52,
      healthStatus: 'HEALTHY'
    };
    setCurrentMetric(fallbackPoint);
    setHistory((prev) => (prev.length > 0 ? prev : [fallbackPoint]));

    if (nodes.length === 0) {
      setNodes([
        { id: 'node-us-east', name: 'US-East (N. Virginia)', region: 'us-east-1', ipAddress: '54.210.12.89', status: 'ONLINE', pingMs: 14, loadAverage: 0.42 },
        { id: 'node-eu-west', name: 'EU-Central (Frankfurt)', region: 'eu-central-1', ipAddress: '35.158.44.102', status: 'ONLINE', pingMs: 38, loadAverage: 0.65 },
        { id: 'node-ap-south', name: 'AP-South (Mumbai)', region: 'ap-south-1', ipAddress: '13.127.90.14', status: 'ONLINE', pingMs: 22, loadAverage: 0.38 }
      ]);
    }

    if (pipelineStages.length === 0) {
      setPipelineStages([
        { id: '1', name: 'Git Push & Triggers', status: 'SUCCESS', durationSec: 4, logSnippet: 'commit: feat(devops): update Dockerfile & SSL certbot script. Ref: main@a8f3b9e' },
        { id: '2', name: 'Spring Boot Build & Tests', status: 'SUCCESS', durationSec: 28, logSnippet: 'Maven test suite executed 14 tests: 0 failures, 0 errors. Package: pulsecraft-backend-1.0.0.jar' },
        { id: '3', name: 'React Vite Frontend Build', status: 'SUCCESS', durationSec: 18, logSnippet: 'vite v5.1.0 building for production... dist/ index.html 0.45 kB' },
        { id: '4', name: 'Docker Multi-Stage Build & Push', status: 'SUCCESS', durationSec: 45, logSnippet: 'Successfully built img: pulsecraft/backend:latest & pulsecraft/frontend:latest' },
        { id: '5', name: 'SSH Deploy & Nginx Live Swap', status: 'SUCCESS', durationSec: 12, logSnippet: 'Connected to VPS via SSH. Executed docker compose up -d. Health check: 200 OK' }
      ]);
    }
  };

  // Poll live metric every 3 seconds if isLive
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(async () => {
      if (!isLive) return;
      try {
        const liveRes = await axios.get(`${API_BASE}/metrics/live`);
        if (liveRes.status === 200) {
          const point = liveRes.data;
          setCurrentMetric(point);
          setHistory((prev) => {
            const next = [...prev, point];
            return next.length > 25 ? next.slice(next.length - 25) : next;
          });
          setIsBackendConnected(true);
        }
      } catch (err) {
        setIsBackendConnected(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Handlers for Incident actions
  const handleCreateIncident = async (newIncident) => {
    try {
      if (isBackendConnected) {
        const res = await axios.post(`${API_BASE}/incidents`, newIncident);
        setIncidents((prev) => [res.data, ...prev]);
      } else {
        const mockInc = { ...newIncident, id: Date.now(), createdAt: new Date().toISOString() };
        setIncidents((prev) => [mockInc, ...prev]);
      }
    } catch (err) {
      console.error('Failed creating incident:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      if (isBackendConnected) {
        const res = await axios.patch(`${API_BASE}/incidents/${id}/status`, { status });
        setIncidents((prev) => prev.map((inc) => (inc.id === id ? res.data : inc)));
      } else {
        setIncidents((prev) => prev.map((inc) => (inc.id === id ? { ...inc, status } : inc)));
      }
    } catch (err) {
      console.error('Failed updating incident status:', err);
    }
  };

  const handleDeleteIncident = async (id) => {
    try {
      if (isBackendConnected) {
        await axios.delete(`${API_BASE}/incidents/${id}`);
      }
      setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    } catch (err) {
      console.error('Failed deleting incident:', err);
    }
  };

  // Trigger simulated CPU anomaly
  const handleTriggerSpike = async () => {
    try {
      if (isBackendConnected) {
        await axios.post(`${API_BASE}/metrics/trigger-spike`);
      } else {
        // Local simulation fallback
        const spikePoint = {
          timestamp: new Date().toLocaleTimeString(),
          cpuUsage: 94.2,
          ramUsage: 89.1,
          jvmHeapUsage: 890,
          latencyMs: 380,
          requestsPerSec: 1850,
          activeThreads: 88,
          healthStatus: 'DEGRADED'
        };
        setCurrentMetric(spikePoint);
        setHistory((prev) => [...prev, spikePoint]);
      }
    } catch (err) {
      console.error('Spike trigger error:', err);
    }
  };

  return (
    <div className="app-wrapper">
      <Header
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
        onTriggerSpike={handleTriggerSpike}
        onOpenDevOpsGuide={() => setIsGuideOpen(true)}
        isBackendConnected={isBackendConnected}
      />

      <MetricsOverview currentMetric={currentMetric} />

      <div className="grid-2">
        <LiveCharts history={history} />
        <PipelineVisualizer stages={pipelineStages} />
      </div>

      <div className="grid-2">
        <IncidentManager
          incidents={incidents}
          onCreateIncident={handleCreateIncident}
          onUpdateStatus={handleUpdateStatus}
          onDeleteIncident={handleDeleteIncident}
        />
        <NodeStatusMap nodes={nodes} />
      </div>

      <DevOpsGuideDrawer
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
