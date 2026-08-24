# Multi-Stage Dockerfile for React Vite Frontend

# --- Stage 1: Build React Bundle ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies with caching
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source code and build production dist
COPY . .
RUN npm run build

# --- Stage 2: Serve static files with Nginx Alpine ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy built distribution files from builder
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
