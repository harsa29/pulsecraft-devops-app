# 🌐 Complete Step-by-Step Deployment Guide: Deploying PulseCraft on Your Domain

This guide will walk you step-by-step through deploying the **PulseCraft** Java (Spring Boot) + React full-stack application on a Linux VPS (Ubuntu/Debian) mapped to your custom domain name with free SSL (Let's Encrypt/Certbot) and fully automated GitHub Actions CI/CD.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Domain Name & DNS Configuration](#step-1-domain-name--dns-configuration)
3. [Step 2: Linux VPS Provisioning & Hardening](#step-2-linux-vps-provisioning--hardening)
4. [Step 3: Cloning Project & Automated Docker Deployment](#step-3-cloning-project--automated-docker-deployment)
5. [Step 4: Setting Up Free SSL Certificate (HTTPS)](#step-4-setting-up-free-ssl-certificate-https)
6. [Step 5: Setting Up GitHub Actions CI/CD Pipeline](#step-5-setting-up-github-actions-cicd-pipeline)
7. [Step 6: Maintenance & Logs Inspection](#step-6-maintenance--logs-inspection)

---

## 1. Prerequisites
Before beginning, ensure you have:
- A registered domain name (e.g. `example.com` or `app.yourdomain.com` from Namecheap, Cloudflare, GoDaddy, etc.).
- A Linux Virtual Private Server (VPS) running **Ubuntu 22.04 LTS** or **Ubuntu 24.04 LTS** (DigitalOcean, AWS EC2, Hetzner, Linode, Vultr). Minimum specs: 1 vCPU, 2 GB RAM.
- A GitHub repository containing this codebase.
- A Docker Hub account (free).

---

## Step 1: Domain Name & DNS Configuration

1. Log into your domain registrar's DNS Management Console (e.g., Cloudflare, Namecheap).
2. Create an **A Record** pointing your domain directly to your Linux VPS Public IP Address:
   | Type | Host / Name | Value / Target | TTL |
   | :--- | :--- | :--- | :--- |
   | **A** | `@` (or `app`) | `YOUR_SERVER_PUBLIC_IP` (e.g. `203.0.113.45`) | Auto / 300s |
   | **A** | `www` | `YOUR_SERVER_PUBLIC_IP` (e.g. `203.0.113.45`) | Auto / 300s |

3. Verify DNS propagation using terminal or [dnschecker.org](https://dnschecker.org):
   ```bash
   ping your-domain.com
   ```
   *(Ensure it resolves to your VPS IP before proceeding).*

---

## Step 2: Linux VPS Provisioning & Hardening

1. SSH into your VPS server:
   ```bash
   ssh ubuntu@YOUR_SERVER_PUBLIC_IP
   ```

2. Generate an SSH key pair on your local machine (or server) for GitHub Actions deployment:
   ```bash
   ssh-keygen -t ed25519 -C "deploy@pulsecraft"
   ```
   - Copy public key to `~/.ssh/authorized_keys` on your Linux server:
     ```bash
     cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
     chmod 600 ~/.ssh/authorized_keys
     ```
   - **Save the Private Key** (`~/.ssh/id_ed25519`) for GitHub Actions setup later.

---

## Step 3: Cloning Project & Automated Docker Deployment

1. Clone your project repository onto the server into `/opt/pulsecraft`:
   ```bash
   sudo mkdir -p /opt/pulsecraft
   sudo chown -R $USER:$USER /opt/pulsecraft
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git /opt/pulsecraft
   cd /opt/pulsecraft
   ```

2. Run the automated deployment bash script:
   ```bash
   sudo bash devops/scripts/deploy.sh your-domain.com
   ```
   This script automatically:
   - Installs Docker and Docker Compose plugin.
   - Configures UFW firewall (Allows ports 22 SSH, 80 HTTP, 443 HTTPS).
   - Builds Java & React Docker images and launches container services.

---

## Step 4: Setting Up Free SSL Certificate (HTTPS)

1. Obtain a free SSL certificate from Let's Encrypt using Certbot:
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```
2. Select option `2` to automatically redirect all HTTP traffic to secure HTTPS.
3. Test automated SSL certificate renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

---

## Step 5: Setting Up GitHub Actions CI/CD Pipeline

To enable **100% automated push-to-deploy** whenever you push code to GitHub:

1. Open your GitHub Repository in your browser.
2. Navigate to **Settings** → **Secrets and variables** → **Actions**.
3. Add the following Repository Secrets:

| Secret Name | Description / Value |
| :--- | :--- |
| `SERVER_HOST` | Your Linux VPS Public IP address (e.g. `203.0.113.45`) |
| `SERVER_USER` | Server SSH username (e.g. `ubuntu` or `root`) |
| `SSH_PRIVATE_KEY` | Content of your private SSH key (`~/.ssh/id_ed25519`) |
| `DOCKER_USERNAME` | Your Docker Hub Username |
| `DOCKER_PASSWORD` | Your Docker Hub Password or Personal Access Token |

4. Test the pipeline:
   Make any commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "feat: deploy to production"
   git push origin main
   ```
   GitHub Actions will automatically run unit tests, build Docker images, push them to Docker Hub, SSH into your Linux server, and reload the application with zero downtime!

---

## Step 6: Maintenance & Logs Inspection

- **View Live Application Logs**:
  ```bash
  cd /opt/pulsecraft
  docker compose logs -f
  ```
- **View Java Backend Specific Logs**:
  ```bash
  docker logs -f pulsecraft-backend
  ```
- **Check Backend Health API**:
  ```bash
  curl https://your-domain.com/api/v1/metrics/live
  ```

---

## ☸️ Step 7: Deploying to Kubernetes (k8s / K3s / EKS / GKE)

For container-orchestrated production clusters (AWS EKS, DigitalOcean Kubernetes, Google GKE, K3s, Minikube):

1. **Prerequisites**: Ensure `kubectl` is installed and connected to your target Kubernetes cluster.

2. **One-Command Deployment via Kustomize**:
   ```bash
   bash k8s/deploy-k8s.sh your-domain.com
   ```
   *Alternatively, apply manually:*
   ```bash
   kubectl apply -k k8s/
   ```

3. **Verify Deployment & Pod Health**:
   ```bash
   kubectl get pods -n pulsecraft
   kubectl get svc -n pulsecraft
   kubectl get ingress -n pulsecraft
   ```

4. **View Live Container Logs**:
   ```bash
   # Stream Java Backend logs
   kubectl logs -f deployment/pulsecraft-backend -n pulsecraft

   # Stream React Nginx Frontend logs
   kubectl logs -f deployment/pulsecraft-frontend -n pulsecraft
   ```

---

🎉 **Congratulations!** Your **PulseCraft** Java + React full-stack application is live and secured on your domain!

