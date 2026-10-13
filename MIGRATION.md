<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Server Migration & Portability Guide 🔄

**Step-by-step procedures for moving AyashMart across VPS servers and cloud providers with zero downtime.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Hostinger VPS](https://img.shields.io/badge/Hosted_on-Hostinger_VPS-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com/vps-hosting)
[![Nginx](https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org)

[Main README](./README.md) · [Deployment Guide](./DEPLOYMENT.md) · [Docker Instructions](./DOCKER_INSTRUCTIONS.md)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Pre-Migration Checklist](#-pre-migration-checklist)
- [Step-by-Step Migration Process](#-step-by-step-migration-process)
  - [Step 1: Prepare the Target Server](#step-1-prepare-the-target-server)
  - [Step 2: Transfer Application & Configs](#step-2-transfer-application--configs)
  - [Step 3: Build & Test on Target Server](#step-3-build--test-on-target-server)
  - [Step 4: Configure Nginx & SSL](#step-4-configure-nginx--ssl)
  - [Step 5: Zero-Downtime DNS Cutover](#step-5-zero-downtime-dns-cutover)
  - [Step 6: Post-Migration Validation](#step-6-post-migration-validation)
- [Rollback Plan](#-rollback-plan)
- [Developer](#-developer)
- [License](#-license)

---

## 💡 Overview

Thanks to **Docker** containerization, **AyashMart** is completely cloud-agnostic. Whether migrating between Hostinger VPS plans, switching from AWS/DigitalOcean to Hostinger, or relocating to an on-premise server, migration is fast, repeatable, and safe.

---

## 📋 Pre-Migration Checklist

- [ ] Target VPS provisioned with Ubuntu 24.04 LTS
- [ ] SSH access established to both source and target servers
- [ ] Lower DNS TTL to 300 seconds (5 minutes) at least 24 hours in advance
- [ ] Backup created of current `.env` and SSL certificates
- [ ] Docker and Docker Compose installed on target host

---

## 🚀 Step-by-Step Migration Process

### Step 1: Prepare the Target Server

On the new server, install Docker, Docker Compose, and Nginx:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Install Nginx
sudo apt install -y nginx certbot python3-certbot-nginx

# Configure UFW
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

---

### Step 2: Transfer Application & Configs

Clone the repository and securely copy configuration files from the old server:

```bash
# On new server:
git clone https://github.com/aftabfarhanarko/Ayashmart-Ecommerce-Frontend.git ayashmart
cd ayashmart

# Securely copy .env from old server (or manually recreate it):
scp deploy@OLD_SERVER_IP:~/ayashmart/.env .env
```

---

### Step 3: Build & Test on Target Server

Start the application container on the new host:

```bash
docker compose up --build -d

# Verify local container response
curl -I http://127.0.0.1:3000
```

---

### Step 4: Configure Nginx & SSL

Set up Nginx on the target host:

```bash
sudo nano /etc/nginx/sites-available/ayashmart
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ayashmart.com www.ayashmart.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ayashmart /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

### Step 5: Zero-Downtime DNS Cutover

1. In your domain DNS manager (Hostinger hPanel or Cloudflare), update the **A Records** (`@` and `www`) to point to the **NEW VPS IP**.
2. Run Certbot on the new server once DNS propagates to issue HTTPS certificates:
   ```bash
   sudo certbot --nginx -d ayashmart.com -d www.ayashmart.com
   ```
3. Test automatic certificate renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

---

### Step 6: Post-Migration Validation

- [x] Check website loading at `https://ayashmart.com`
- [x] Verify SSL padlock in browser
- [x] Test responsive navigation, cart, and checkout flows
- [x] Confirm backend API connectivity
- [x] Decommission old server only after 48-72 hours of stable operation

---

## 🔄 Rollback Plan

If unexpected issues arise during cutover:
1. Revert domain DNS `A` records back to the **OLD_SERVER_IP**.
2. Keep the old server running until all DNS resolvers pick up the restored IP.
3. Investigate target server logs with `docker compose logs` and Nginx logs at `/var/log/nginx/error.log`.

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
