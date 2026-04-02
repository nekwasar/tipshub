#!/bin/bash

# ============================================
# TipsHub Deployment Script
# Domain: tipshub.cc
# ============================================

set -e

echo "=========================================="
echo "TipsHub Deployment Script"
echo "=========================================="

# Configuration
DOMAIN="tipshub.cc"
WWW_DOMAIN="www.tipshub.cc"
EMAIL="mail@tipshub.cc"
APP_DIR="/opt/tipshub"
NGINX_CONTAINER="tipshub-nginx"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root (sudo)"
    exit 1
fi

# ============================================
# Step 1: Install Certbot
# ============================================
log_info "Installing Certbot..."

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
fi

case "$OS" in
    ubuntu|debian)
        apt update
        apt install -y certbot python3-certbot-nginx
        ;;
    centos|rhel|rocky|almalinux)
        yum install -y epel-release
        yum install -y certbot python3-certbot-nginx
        ;;
    *)
        log_error "Unsupported OS: $OS"
        exit 1
        ;;
esac

log_info "Certbot installed successfully"

# ============================================
# Step 2: Stop any nginx to allow certbot to work
# ============================================
log_info "Stopping nginx service..."

# Stop Docker nginx if running
docker stop $NGINX_CONTAINER 2>/dev/null || true

# Stop system nginx if running (aapanel)
systemctl stop nginx 2>/dev/null || true
systemctl stop httpd 2>/dev/null || true

# Wait a bit
sleep 2

# ============================================
# Step 3: Get SSL Certificate
# ============================================
log_info "Getting SSL certificate for $DOMAIN and $WWW_DOMAIN..."

# Create temp nginx config for validation
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

cat > /etc/nginx/sites-available/tipshub <<EOF
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 404;
    }
}
EOF

ln -sf /etc/nginx/sites-available/tipshub /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Get certificate
certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos --email $EMAIL

# ============================================
# Step 4: Configure Docker Nginx
# ============================================
log_info "Configuring Docker nginx with SSL..."

# Create SSL directory
mkdir -p $APP_DIR/ssl

# Copy certificates
cp /etc/live/$DOMAIN/fullchain.pem $APP_DIR/ssl/cert.pem
cp /etc/live/$DOMAIN/privkey.pem $APP_DIR/ssl/key.pem
cp /etc/live/$DOMAIN/chain.pem $APP_DIR/ssl/chain.pem

# Set proper permissions
chmod 600 $APP_DIR/ssl/key.pem

# Create nginx config with SSL
cat > $APP_DIR/nginx/nginx.conf <<EOF
upstream backend {
    server backend:8000;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://\$host\$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name $DOMAIN $WWW_DOMAIN;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # Frontend (Coming Soon)
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Admin
    location /admin/ {
        proxy_pass http://backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    # Static files
    location /static/ {
        alias /app/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Media files
    location /media/ {
        alias /app/media/;
        expires 30d;
    }
}
EOF

# ============================================
# Step 5: Update Docker Compose
# ============================================
log_info "Updating docker-compose.yml..."

# Update nginx service to include SSL volumes
cat > $APP_DIR/docker-compose.yml <<EOF
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: tipshub-db
    environment:
      POSTGRES_DB: \${DB_NAME:-tipshub}
      POSTGRES_USER: \${DB_USER:-tipshub_user}
      POSTGRES_PASSWORD: \${DB_PASSWORD:-changeme}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tipshub_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: tipshub-backend
    environment:
      DATABASE_URL: postgres://\${DB_USER:-tipshub_user}:\${DB_PASSWORD:-changeme}@db:5432/\${DB_NAME:-tipshub}
      SECRET_KEY: \${DJANGO_SECRET_KEY:-changeme-secret-key}
      DEBUG: \${DEBUG:-False}
      ALLOWED_HOSTS: \${ALLOWED_HOSTS:-localhost,tipshub.cc,www.tipshub.cc}
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: tipshub-frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: tipshub-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - static_volume:/app/staticfiles:ro
      - media_volume:/app/media:ro
    depends_on:
      - backend
      - frontend
    restart: unless-stopped

volumes:
  postgres_data:
  static_volume:
  media_volume:
EOF

# ============================================
# Step 6: Start the application
# ============================================
log_info "Starting the application..."

cd $APP_DIR
docker-compose down
docker-compose up -d --build

# ============================================
# Step 7: Setup auto-renewal
# ============================================
log_info "Setting up automatic certificate renewal..."

# Add renewal cron job
(crontab -l 2>/dev/null || echo "") | grep -v certbot > /tmp/cron.tmp
echo "0 0 * * * certbot renew --quiet --deploy-hook 'docker exec tipshub-nginx nginx -s reload'" >> /tmp/cron.tmp
crontab /tmp/cron.tmp
rm /tmp/cron.tmp

log_info "Auto-renewal configured"

# ============================================
# Done
# ============================================
echo ""
echo "=========================================="
echo -e "${GREEN}Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Your site should be available at:"
echo "  - https://tipshub.cc"
echo "  - https://www.tipshub.cc"
echo ""
echo "To check status:"
echo "  cd $APP_DIR"
echo "  docker-compose logs -f"
echo ""
echo "To view running containers:"
echo "  docker-compose ps"
echo ""
