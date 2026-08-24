# 🚀 PulseCraft: Complete Folder-by-Folder Guide & Production Deployment for `harsavardhandevops.cloud`

Welcome to **PulseCraft** — a unique, real-time Cloud Infrastructure & Application Telemetry Control Center. This comprehensive documentation explains **what the application does**, breaks down **every folder and file in the codebase**, and provides a **step-by-step guide to deploy it on your domain `harsavardhandevops.cloud`**.

---

## 📑 Table of Contents
1. [What Does This Application Do?](#1-what-does-this-application-do)
2. [Folder-by-Folder Codebase Breakdown](#2-folder-by-folder-codebase-breakdown)
   - [Root Directory](#21-root-directory)
   - [`backend/` (Java Spring Boot Stack)](#22-backend-java-spring-boot-stack)
   - [`frontend/` (React Vite SPA Stack)](#23-frontend-react-vite-spa-stack)
   - [`devops/` (Server & Nginx Configs)](#24-devops-server--nginx-configs)
   - [`k8s/` (Kubernetes Manifests)](#25-k8s-kubernetes-manifests)
   - [`.github/workflows/` (CI/CD Pipeline)](#26-githubworkflows-cicd-pipeline)
3. [Step-by-Step Deployment Guide for `harsavardhandevops.cloud`](#3-step-by-step-deployment-guide-for-harsavardhandevopscloud)
   - [Option A: Docker Compose & Nginx VPS Deployment](#option-a-docker-compose--nginx-vps-deployment-recommended)
   - [Option B: Kubernetes (K8s / K3s) Cluster Deployment](#option-b-kubernetes-k8s--k3s-cluster-deployment)
4. [Setting Up Automated GitHub Actions CI/CD](#4-setting-up-automated-github-actions-cicd)
5. [Maintenance & Command Cheat-Sheet](#5-maintenance--command-cheat-sheet)

---

## 1. What Does This Application Do?

**PulseCraft** is a real-time cloud health and telemetry monitoring platform. It combines a high-performance **Java 21 / Spring Boot 3.2** backend with a visually striking, glassmorphic **React Vite** frontend.

### Core Capabilities:
- 📊 **Real-Time Telemetry Streaming**: Streams live host CPU load %, RAM usage %, JVM Heap memory allocation, API response latency (p95), and HTTP request throughput.
- ⚡ **60fps Live Streaming Visualizer**: Custom SVG line charts plotting CPU load vs. API response latency in real-time.
- 🚨 **Incident & Alert Response System**: Full CRUD alert board backed by Spring Data JPA & H2 Database. Log, track, filter, and resolve infrastructure incidents.
- 🌍 **Regional Edge Node Health Map**: Monitors ping times, load averages, and IP status across cloud regions (US-East, EU-Central, AP-South, AP-East).
- 🔄 **DevOps CI/CD Visualizer**: Displays interactive pipeline stages (Git Push → Spring Boot Test → React Build → Docker Push → Server Deploy) with real-time log snippets.
- 💥 **Simulated Anomaly Trigger**: Features a "Trigger Anomaly Spike" button to simulate high CPU/memory degradation and test incident response workflows.

---

## 2. Folder-by-Folder Codebase Breakdown

```
Java+React/
├── backend/                  # Java Spring Boot 3.2 REST API Server
├── frontend/                 # React 18 Vite Single Page Application
├── devops/                   # Server Nginx, Systemd & Bash Deployment Scripts
├── k8s/                      # Production Kubernetes Manifests & Kustomize
├── .github/workflows/        # Automated GitHub Actions CI/CD Pipeline
├── docker-compose.yml        # Unified Multi-Container Production Setup
└── DEPLOYMENT_GUIDE.md       # Quick Deployment Reference
```

---

### 2.1 Root Directory

- **`docker-compose.yml`**: Defines the multi-container production setup orchestrating `pulsecraft-backend` (Spring Boot on port 8080) and `pulsecraft-frontend` (Nginx React SPA on port 80) over an isolated Docker bridge network.
- **`DEPLOYMENT_GUIDE.md`**: Master deployment handbook for production environments.

---

### 2.2 `backend/` (Java Spring Boot Stack)

The backend is built with Java 21 and Spring Boot 3.2, providing REST APIs, actuator health metrics, and JPA persistence.

```
backend/
├── pom.xml                                       # Maven build file (Spring Web, JPA, Actuator, H2, Lombok)
├── Dockerfile                                    # Multi-stage Docker build (Maven -> JDK 21 Alpine runtime)
└── src/main/
    ├── resources/
    │   └── application.properties                # Spring Boot configuration (H2 DB, Actuator endpoints, Server Port)
    └── java/com/pulsecraft/
        ├── PulseCraftApplication.java            # Spring Boot entry point (@EnableScheduling)
        ├── config/
        │   └── CorsConfig.java                   # Enables Cross-Origin Resource Sharing for React frontend
        ├── model/
        │   ├── MetricPoint.java                  # DTO for CPU, RAM, JVM Heap, Latency, and Throughput
        │   ├── Incident.java                     # JPA Entity representing alerts in H2 Database
        │   ├── ServerNode.java                   # Model for regional cloud node status
        │   └── PipelineStage.java                # Model for CI/CD pipeline visualizer stages
        ├── repository/
        │   └── IncidentRepository.java           # Spring Data JPA interface for CRUD database operations
        ├── service/
        │   ├── TelemetryService.java             # Telemetry generator & live history queue
        │   ├── IncidentService.java              # Incident management logic & database seeding
        │   └── PipelineService.java              # DevOps pipeline stage status provider
        └── controller/
            ├── TelemetryController.java          # REST API (/api/v1/metrics/live, /history, /trigger-spike)
            ├── IncidentController.java           # REST API (/api/v1/incidents GET, POST, PATCH, DELETE)
            ├── NodeController.java               # REST API (/api/v1/nodes GET)
            └── PipelineController.java           # REST API (/api/v1/devops/pipeline GET)
```

---

### 2.3 `frontend/` (React Vite SPA Stack)

The frontend is a single-page React application built with Vite, styled with custom glassmorphic CSS tokens, and served via an internal Nginx container.

```
frontend/
├── package.json                                  # Node dependencies (React 18, Lucide React icons, Axios, Vite)
├── vite.config.js                                # Vite dev server & API proxy (/api -> http://localhost:8080)
├── index.html                                    # HTML shell with Google Fonts (Outfit & JetBrains Mono)
├── nginx.conf                                    # Internal Nginx server config for SPA routing & gzip compression
├── Dockerfile                                    # Multi-stage Docker build (Node 20 build -> Nginx Alpine distribution)
└── src/
    ├── main.jsx                                  # React DOM root mounting script
    ├── index.css                                 # Glassmorphic dark mode design system (variables, animations, grids)
    ├── App.jsx                                   # Core application state, backend polling, and layout coordinator
    └── components/
        ├── Header.jsx                            # Navigation, connection indicator, live toggle, anomaly trigger
        ├── MetricsOverview.jsx                   # Live telemetry gauges for CPU, RAM, JVM Heap, Latency
        ├── LiveCharts.jsx                        # 60fps streaming SVG line chart for CPU & Latency
        ├── IncidentManager.jsx                   # Alert logger board, severity badges, incident creation modal
        ├── NodeStatusMap.jsx                     # Regional cloud node health cards
        ├── PipelineVisualizer.jsx                # DevOps pipeline stage timeline with log snippet inspector
        └── DevOpsGuideDrawer.jsx                 # Slide-over in-app documentation drawer
```

---

### 2.4 `devops/` (Server & Nginx Configs)

Configurations for non-Kubernetes Linux server deployments.

```
devops/
├── nginx/
│   └── default.conf                              # Production Nginx reverse proxy (SSL HTTPS, Rate limiting, WebSockets)
├── systemd/
│   └── pulsecraft-backend.service                # Linux Systemd unit file for running Java JAR natively as a daemon
└── scripts/
    └── deploy.sh                                 # Automated bash script (Installs Docker, UFW firewall, SSL Certbot)
```

---

### 2.5 `k8s/` (Kubernetes Manifests)

Production-grade Kubernetes manifests supporting Kustomize deployment.

```
k8s/
├── namespace.yaml                                # Creates dedicated 'pulsecraft' Kubernetes namespace
├── configmap.yaml                                # Application environment variables & Spring Boot config
├── secret.yaml                                   # Encrypted database credentials template
├── backend-deployment.yaml                       # Java Spring Boot 2-replica Deployment with Liveness & Readiness probes
├── backend-service.yaml                          # ClusterIP Service for Spring Boot (Port 8080)
├── frontend-deployment.yaml                      # React Nginx 2-replica Deployment with resource limits
├── frontend-service.yaml                         # ClusterIP Service for React SPA (Port 80)
├── ingress.yaml                                  # NGINX Ingress Controller routing with Cert-Manager SSL
├── kustomization.yaml                            # Kustomize single-command manifest (`kubectl apply -k k8s/`)
└── deploy-k8s.sh                                 # Automated cluster deployment script
```

---

### 2.6 `.github/workflows/` (CI/CD Pipeline)

- **`ci-cd.yml`**: GitHub Actions workflow triggered on push to `main`.
  1. Compiles and runs unit tests for Java Spring Boot (`backend-ci`).
  2. Installs npm dependencies and builds Vite bundle (`frontend-ci`).
  3. Builds Docker images for both frontend and backend and pushes them to Docker Hub.
  4. SSHs into your Linux server and executes `docker compose pull && docker compose up -d`.

---

## 3. Step-by-Step Deployment Guide for `harsavardhandevops.cloud`

This section details how to deploy PulseCraft on your domain **`harsavardhandevops.cloud`**.

---

### Option A: Docker Compose & Nginx VPS Deployment (Recommended)

#### Step 1: Configure DNS A Records
Log into your domain provider console (Cloudflare / Namecheap / GoDaddy) for `harsavardhandevops.cloud`:

| Type | Host | Points To / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_LINUX_SERVER_IP` | Auto / 300s |
| **A** | `www` | `YOUR_LINUX_SERVER_IP` | Auto / 300s |

*Test DNS resolution on your local terminal:*
```bash
ping harsavardhandevops.cloud
```

---

#### Step 2: Prepare Your Linux Server
SSH into your Ubuntu/Debian VPS server:
```bash
ssh ubuntu@YOUR_LINUX_SERVER_IP
```

Clone the repository into `/opt/pulsecraft`:
```bash
sudo mkdir -p /opt/pulsecraft
sudo chown -R $USER:$USER /opt/pulsecraft
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git /opt/pulsecraft
cd /opt/pulsecraft
```

---

#### Step 3: Run the Automated Deployment Script
Execute the deployment script with your domain name:
```bash
sudo bash devops/scripts/deploy.sh harsavardhandevops.cloud
```

This script will automatically:
1. Update system packages and install Docker + Docker Compose.
2. Configure UFW Firewall (Allow SSH 22, HTTP 80, HTTPS 443).
3. Build and launch the Java backend and React frontend containers.
4. Request and configure a free **Let's Encrypt SSL Certificate** for `harsavardhandevops.cloud` and `www.harsavardhandevops.cloud`.

---

### Option B: Kubernetes (K8s / K3s) Cluster Deployment

If you are running a Kubernetes cluster (K3s, MicroK8s, Minikube, EKS, GKE, DOKS):

1. Connect `kubectl` to your cluster.
2. Run the automated Kubernetes deployment script:
   ```bash
   bash k8s/deploy-k8s.sh harsavardhandevops.cloud
   ```
3. Or deploy manually via Kustomize:
   ```bash
   sed -i 's/your-domain.com/harsavardhandevops.cloud/g' k8s/ingress.yaml
   kubectl apply -k k8s/
   ```
4. Verify running pods and ingress status:
   ```bash
   kubectl get pods,svc,ingress -n pulsecraft
   ```

---

## 4. Setting Up Automated GitHub Actions CI/CD

To enable automatic push-to-deploy whenever you push code to GitHub:

1. Open your GitHub Repository in your browser.
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Add the following 5 secrets:

| Secret Name | Value |
| :--- | :--- |
| `SERVER_HOST` | `YOUR_LINUX_SERVER_IP` |
| `SERVER_USER` | `ubuntu` (or `root`) |
| `SSH_PRIVATE_KEY` | Content of your private SSH key (`cat ~/.ssh/id_ed25519`) |
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password / access token |

Now, whenever you run `git push origin main`, GitHub Actions will test, build, push Docker containers, and update `harsavardhandevops.cloud` automatically!

---

## 5. Maintenance & Command Cheat-Sheet

| Task | Command |
| :--- | :--- |
| **Start Stack Locally** | `docker compose up --build -d` |
| **Stop Stack Locally** | `docker compose down` |
| **View Live Server Logs** | `cd /opt/pulsecraft && docker compose logs -f` |
| **View Backend Container Logs** | `docker logs -f pulsecraft-backend` |
| **View Frontend Container Logs** | `docker logs -f pulsecraft-frontend` |
| **View Kubernetes Pod Logs** | `kubectl logs -f deployment/pulsecraft-backend -n pulsecraft` |
| **Test Live Telemetry API** | `curl https://harsavardhandevops.cloud/api/v1/metrics/live` |
| **Renew SSL Certificate** | `sudo certbot renew --dry-run` |

---

🎉 **Congratulations!** Your **PulseCraft** Java + React application is ready for production on **`harsavardhandevops.cloud`**!
