#!/bin/bash
# ==============================================================================
# PulseCraft - Automated Kubernetes Cluster Deployment Script
# Works with: K3s, MicroK8s, Minikube, EKS, GKE, DigitalOcean Kubernetes (DOKS)
# ==============================================================================

set -e

DOMAIN_NAME=$1

if [ -z "$DOMAIN_NAME" ]; then
  echo "Usage: bash deploy-k8s.sh <your-domain.com>"
  exit 1
fi

echo "☸️ [1/4] Applying Kubernetes Namespace & Kustomize Manifests..."
sed -i "s/your-domain.com/$DOMAIN_NAME/g" k8s/ingress.yaml
kubectl apply -k k8s/

echo "⏳ [2/4] Waiting for Backend & Frontend Deployments to roll out..."
kubectl rollout status deployment/pulsecraft-backend -n pulsecraft --timeout=120s
kubectl rollout status deployment/pulsecraft-frontend -n pulsecraft --timeout=120s

echo "🔍 [3/4] Inspecting Running Pods & Services in 'pulsecraft' namespace..."
kubectl get pods,svc,ingress -n pulsecraft

echo "✅ PulseCraft successfully deployed on Kubernetes Cluster!"
echo "Access your app via Ingress at: https://$DOMAIN_NAME"
