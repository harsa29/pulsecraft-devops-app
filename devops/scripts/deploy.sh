#!/bin/bash
# ==============================================================================
# PulseCraft - Automated Linux Server Provisioning & Deployment Script
# Target OS: Ubuntu 20.04 / 22.04 / 24.04 LTS, Debian 11/12
# ==============================================================================

set -e

DOMAIN_NAME=$1

if [ -z "$DOMAIN_NAME" ]; then
  echo "Usage: sudo bash deploy.sh <your-domain.com>"
  exit 1
fi

echo "🚀 [1/5] Updating Linux package indexes..."
sudo apt-get update -y && sudo apt-get upgrade -y

echo "🐳 [2/5] Installing Docker, Docker Compose, and Curl..."
sudo apt-get install -y curl git ufw certbot python3-certbot-nginx

if ! command -v docker &> /dev/null; then
  echo "Installing Docker Engine..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  rm get-docker.sh
fi

echo "🛡️ [3/5] Configuring UFW Firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw --force enable

echo "⚙️ [4/5] Building & Launching PulseCraft Docker Containers..."
docker compose down || true
docker compose up --build -d

echo "🔒 [5/5] Requesting Let's Encrypt SSL Certificate for $DOMAIN_NAME..."
# Ensure domain resolves to IP before running Certbot
sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos -m admin@$DOMAIN_NAME --redirect || {
  echo "⚠️ Certbot SSL setup warning. Ensure DNS A record points to this server IP."
}

echo "✅ PulseCraft deployment complete! Access your app at: https://$DOMAIN_NAME"
