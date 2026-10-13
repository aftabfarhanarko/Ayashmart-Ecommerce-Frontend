<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Production Deployment Guide 🚀

**Comprehensive production deployment guide for AyashMart on Hostinger VPS, Vercel and Docker.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Hostinger VPS](https://img.shields.io/badge/Hosted_on-Hostinger_VPS-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com/vps-hosting)
[![Nginx](https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org)
[![SSL](https://img.shields.io/badge/SSL-Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)](https://letsencrypt.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)

[Main README](./README.md) · [Docker Guide](./DOCKER_INSTRUCTIONS.md) · [Live Demo](https://ayashmart.com) · [Report an Issue](../../issues)

</div>

---

## 📖 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Deployment Prerequisites](#-deployment-prerequisites)
- [Hostinger VPS Production Deployment](#-hostinger-vps-production-deployment)
  - [Step 1: VPS Provisioning & OS Setup](#step-1-vps-provisioning--os-setup)
  - [Step 2: DNS & Domain Mapping](#step-2-dns--domain-mapping)
  - [Step 3: Server Security & Hardening](#step-3-server-security--hardening)
  - [Step 4: Swap Memory Configuration](#step-4-swap-memory-configuration)
  - [Step 5: Docker Engine & Compose Setup](#step-5-docker-engine--compose-setup)
  - [Step 6: Repository Deployment](#step-6-repository-deployment)
  - [Step 7: Environment Configuration](#step-7-environment-configuration)
  - [Step 8: Docker Container Launch](#step-8-docker-container-launch)
  - [Step 9: Nginx Reverse Proxy Setup](#step-9-nginx-reverse-proxy-setup)
  - [Step 10: Let's Encrypt SSL Installation](#step-10-lets-encrypt-ssl-installation)
- [Alternative Deployment Options](#-alternative-deployment-options)
  - [Option A: Vercel Deployment](#option-a-vercel-deployment)
  - [Option B: Node.js + PM2 Deployment](#option-b-nodejs--pm2-deployment)
- [Updating the Live Application](#-updating-the-live-application)
- [Maintenance & Health Checks](#-maintenance--health-checks)
- [Production Security Checklist](#-production-security-checklist)
- [Troubleshooting](#-troubleshooting)
- [Developer](#-developer)
- [License](#-license)

---

## 🏗️ Overview & Architecture

**AyashMart** is engineered to be deployed seamlessly on cloud virtual servers or managed serverless platforms. In our standard production setup on **Hostinger VPS**, Nginx serves as a hardened reverse proxy with automatic SSL termination, securely passing incoming HTTPS traffic to the isolated Next.js Docker container.

```text
                                  ┌──────────────────────────────────────────────┐
                                  │             Public Internet                  │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                        HTTPS / 443 & HTTP / 80
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │             UFW Firewall                     │
                                  │        (Ports 22, 80, 443 Allowed)           │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │             Nginx Web Server                 │
                                  │      (SSL Termination & Reverse Proxy)       │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                               Proxy to 127.0.0.1:3000
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │       Docker Container: ayashmart-web        │
                                  │       Next.js App (node:22-alpine)           │
                                  └──────────────────────────────────────────────┘
```

---

## 📋 Deployment Prerequisites

| Requirement | Recommended Specification | Notes |
| ----------- | ------------------------- | ----- |
| **VPS Server** | Hostinger KVM 1 or KVM 2 | 1-2 vCPU, 4GB-8GB RAM, NVMe Storage |
| **Operating System** | Ubuntu 24.04 LTS (Noble Numbat) | Stable, modern kernel with long-term support |
| **Domain** | `ayashmart.com` + `www.ayashmart.com` | DNS control via Hostinger hPanel or Cloudflare |
| **Authentication** | SSH Public Key Access | Avoid root password login for security |

---

## 🖥️ Hostinger VPS Production Deployment

### Step 1: VPS Provisioning & OS Setup

1. Log in to **Hostinger hPanel** → **VPS Dashboard** → Select your VPS server.
2. Under **OS & Panel** → **Operating System**, choose **Ubuntu 24.04 LTS**.
3. Set your root credentials and upload your local machine's public SSH key (`~/.ssh/id_rsa.pub`).
4. Note your server's **Public IP address** (e.g., `185.xxx.xxx.xxx`).

---

### Step 2: DNS & Domain Mapping

In your domain's DNS manager (Hostinger hPanel or Cloudflare), create or update the following DNS `A` records:

| Record Type | Host / Name | Target / Value | TTL |
| ----------- | ----------- | -------------- | --- |
| `A` | `@` | `YOUR_VPS_PUBLIC_IP` | 3600 (or Auto) |
| `A` | `www` | `YOUR_VPS_PUBLIC_IP` | 3600 (or Auto) |

> [!NOTE]
> DNS propagation typically takes between 2 to 30 minutes. You can verify using `ping ayashmart.com` or `dig ayashmart.com +short`.

---

### Step 3: Server Security & Hardening

Connect to your VPS via terminal:

```bash
ssh root@YOUR_VPS_PUBLIC_IP
```

Update system packages and create a dedicated deploy user:

```bash
apt update && apt upgrade -y

# Create user 'deploy'
adduser deploy
usermod -aG sudo deploy
```

Authorize your local SSH key for user `deploy` (run this from your local computer):

```bash
ssh-copy-id deploy@YOUR_VPS_PUBLIC_IP
```

Configure and enable the Uncomplicated Firewall (UFW):

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status
```

Harden SSH configurations to disable password and root logins:

```bash
sudo nano /etc/ssh/sshd_config
# Verify or set:
#   PermitRootLogin no
#   PasswordAuthentication no
sudo systemctl restart ssh
```

Switch to the `deploy` user:

```bash
su - deploy
```

---

### Step 4: Swap Memory Configuration

Next.js builds require transient peak memory. Adding a 2GB swap partition prevents the build process from being abruptly killed (`Out Of Memory - SIGKILL`) on entry-level VPS instances:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

### Step 5: Docker Engine & Compose Setup

Install the latest official Docker engine:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# Verify installations
docker --version
docker compose version
```

---

### Step 6: Repository Deployment

Clone the AyashMart repository onto the VPS:

```bash
sudo apt install -y git
cd ~
git clone https://github.com/aftabfarhanarko/Ayashmart-Ecommerce-Frontend.git ayashmart
cd ayashmart
```

---

### Step 7: Environment Configuration

Create the production environment file on the server:

```bash
nano .env
```

Add your production environment keys:

```env
NEXT_PUBLIC_API_URL=https://ayashmart.com/api
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

> [!CAUTION]
> Never commit `.env` containing sensitive credentials to Git. Keep it secure and restricted on the VPS with `chmod 600 .env`.

---

### Step 8: Docker Container Launch

Ensure [docker-compose.yml](./docker-compose.yml) binds only to `127.0.0.1:3000` so that only Nginx can route traffic:

```yaml
version: '3.8'

services:
  ayashmart-web:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
```

Build and launch the container in the background:

```bash
docker compose up --build -d
```

Verify that the container is healthy:

```bash
docker compose ps
curl -I http://127.0.0.1:3000
```

---

### Step 9: Nginx Reverse Proxy Setup

Install Nginx:

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/ayashmart
```

Add the following reverse proxy configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ayashmart.com www.ayashmart.com;

    client_max_body_size 30M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site configuration and verify syntax:

```bash
sudo ln -s /etc/nginx/sites-available/ayashmart /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

### Step 10: Let's Encrypt SSL Installation

Install Certbot and request a free TLS certificate with automated renewal:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ayashmart.com -d www.ayashmart.com
```

Select the option to automatically redirect all HTTP traffic to HTTPS. Test the renewal process:

```bash
sudo certbot renew --dry-run
```

🎉 **Congratulations! AyashMart is live and secure at [https://ayashmart.com](https://ayashmart.com).**

---

## ☁️ Alternative Deployment Options

### Option A: Vercel Deployment

For frictionless zero-config deployments with automated CI/CD:

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Select your repository: `Ayashmart-Ecommerce-Frontend`.
4. Configure Framework Preset: **Next.js**.
5. Add any required environment variables (`NEXT_PUBLIC_API_URL`).
6. Click **Deploy**.
7. In Vercel Project Settings → Domains, add `ayashmart.com` and follow DNS instructions.

---

### Option B: Node.js + PM2 Deployment

If you prefer deploying without Docker:

```bash
# 1. Install Node.js v22 via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22

# 2. Build the app
cd ~/ayashmart
npm ci
npm run build

# 3. Launch via PM2 Process Manager
npm install -g pm2
pm2 start npm --name "ayashmart-frontend" -- start
pm2 save
pm2 startup
```

---

## 🔄 Updating the Live Application

Whenever you push new code or bug fixes to GitHub, update production with zero hassle:

```bash
cd ~/ayashmart
git pull origin main
docker compose up --build -d
docker image prune -f
```

---

## 📊 Maintenance & Health Checks

| Task | Command |
| ---- | ------- |
| **Inspect Live App Logs** | `docker compose logs -f` |
| **Restart Application** | `docker compose restart` |
| **Stop Application** | `docker compose down` |
| **Check Docker Containers** | `docker compose ps` |
| **Nginx Status** | `sudo systemctl status nginx` |
| **Nginx Error Log** | `sudo tail -f /var/log/nginx/error.log` |
| **Server Disk Space** | `df -h` |
| **Server RAM Usage** | `free -m` |
| **Clean Docker Build Cache** | `docker system prune -af` |

---

## 🔐 Production Security Checklist

- [x] Hostinger VPS root password login disabled (SSH key only)
- [x] UFW firewall active and allowing only ports 22, 80, 443
- [x] Application Docker container bound to `127.0.0.1:3000` (internal only)
- [x] Full HTTPS encryption active via Let's Encrypt Certbot
- [x] `restart: unless-stopped` enabled in Docker Compose
- [x] `.env` secrets excluded from version control
- [x] Hostinger weekly backups active in hPanel
- [x] Next.js Telemetry disabled (`NEXT_TELEMETRY_DISABLED=1`)

---

## 🛠️ Troubleshooting

| Issue | Root Cause | Resolution |
| ----- | ---------- | ---------- |
| **502 Bad Gateway** | Next.js container not running on port 3000 | Check container status with `docker compose ps` and inspect logs with `docker compose logs -f` |
| **Domain not resolving** | DNS records not propagated | Ensure A records point to VPS IP via `dig ayashmart.com` |
| **SSL handshake failed** | Certbot was unable to complete ACME challenge | Verify DNS propagation and ensure port 80 is accessible, then re-run `sudo certbot --nginx` |
| **Build process killed** | Insufficient server RAM during build | Configure 2GB swap file as described in Step 4 |
| **`Permission denied` (Docker)** | Current user not in the docker group | Run `sudo usermod -aG docker $USER` and log back in |
| **Nginx configuration test failed** | Syntax error in Nginx config | Run `sudo nginx -t` to locate the exact erroneous directive |

---

## 📞 Contact

**AyashMart**

- 🌐 Website: [ayashmart.com](https://ayashmart.com)
- 💬 WhatsApp: [Chat with us](https://wa.me/+8801613410880)

---

## 👨‍💻 Developer

This project is designed and developed by **Aftab Farhan ARKO**.

---

## 📄 License

© 2026 AyashMart. All rights reserved.

This is proprietary software. Unauthorized copying, distribution or modification of this project is strictly prohibited.

---

<div align="center">

**Made with ❤️ for AyashMart**

Developed by **Aftab Farhan ARKO**

</div>
