<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart

**A modern, fast and secure e-commerce platform for premium electronics, smart gadgets and accessories in Bangladesh.**

<sub>🚀 Developed by <b>FTB Farhaa</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-v22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Hostinger VPS](https://img.shields.io/badge/Hosted_on-Hostinger_VPS-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com/vps-hosting)

[Live Demo](https://ayashmart.com) · [Docker Guide](./DOCKER_INSTRUCTIONS.md) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Option 1: Docker (Recommended)](#option-1-docker-recommended)
  - [Option 2: Local Development](#option-2-local-development)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
  - [Vercel](#vercel)
  - [Hostinger VPS (Production)](#-hostinger-vps-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Contact](#-contact)
- [Developer](#-developer)
- [License](#-license)

---

## 🛍️ About the Project

**AyashMart** is a full-featured online store built with [Next.js](https://nextjs.org). It offers customers a smooth shopping experience, from browsing categories and discovering new arrivals to secure checkout and fast delivery, across all devices.

The storefront focuses on premium electronics, power banks, smart devices, home appliances and innovative gadgets.

> 🌐 **Live website:** [https://ayashmart.com](https://ayashmart.com)

---

## ✨ Key Features

**Shopping Experience**
- 🗂️ **Category browsing:** shop by category with a dedicated categories page
- ⭐ **Featured products & New Arrivals:** curated collections on the home page
- ⚡ **Flash Sales:** live countdown-based promotional events
- 🛒 **Cart & Checkout:** simple, secure purchase flow
- 👤 **User accounts:** authentication and account management

**Trust & Support**
- 🚚 **Fast & free shipping** on qualifying orders, with express options
- 🔄 **30-day returns** policy
- 🔒 **Secure checkout** with encrypted payment information
- 💬 **24/7 customer support** with WhatsApp and Messenger integration
- 🗣️ **Customer reviews:** social proof from real customers

**Engagement & Compliance**
- 📬 **Newsletter subscription** for exclusive deals and product updates
- 📄 **Legal pages:** Privacy Policy, Terms & Conditions, Returns & Refunds, Cookie Policy and Copyright Information
- 🔍 **SEO-optimized:** meta tags, Open Graph and Twitter Card support
- 📱 **Fully responsive** design for mobile, tablet and desktop

---

## 🧰 Tech Stack

| Layer                | Technology                                              |
| -------------------- | ------------------------------------------------------- |
| **Framework**        | [Next.js](https://nextjs.org) (App Router)              |
| **Runtime**          | [Node.js](https://nodejs.org) v22 LTS                   |
| **Package Manager**  | npm                                                     |
| **Bundler (Dev)**    | Turbopack                                               |
| **Animations**       | [animate.css](https://animate.style)                    |
| **Containerization** | Docker & Docker Compose                                 |
| **Web Server**       | Nginx (reverse proxy) + Let's Encrypt SSL               |
| **Hosting**          | [Hostinger VPS](https://www.hostinger.com/vps-hosting) / [Vercel](https://vercel.com) |

---

## 🚀 Getting Started

You can run the project using **Docker** (recommended) or **locally** on your machine.

### Option 1: Docker (Recommended)

Run the entire project without installing dependencies manually.

**Prerequisites**
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

**Steps**

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

# 2. Build and start the containers
docker compose up --build
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> 📘 For detailed Docker instructions and troubleshooting, see [DOCKER_INSTRUCTIONS.md](./DOCKER_INSTRUCTIONS.md).

---

### Option 2: Local Development

**Prerequisites**
- [Node.js](https://nodejs.org) **v22 LTS** (recommended)
- npm (bundled with Node.js)

**Steps**

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

# 2. Install dependencies (exact versions from package-lock.json)
npm ci

# 3. Start the development server with Turbopack
npm run dev -- --turbo
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> [!IMPORTANT]
> You **must** run the dev server with the `--turbo` flag. The standard `npm run dev` (Webpack) currently fails due to CSS parsing issues with `animate.css`. Turbopack handles this correctly.

> [!NOTE]
> Use `npm ci` instead of `npm install` to guarantee a reproducible install from `package-lock.json`.

---

## 📜 Available Scripts

| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `npm run dev -- --turbo`    | Start the development server (Turbopack)         |
| `npm run build`             | Create an optimized production build             |
| `npm run start`             | Start the production server                      |
| `npm run lint`              | Run the linter                                   |
| `docker compose up --build` | Build and run the app with Docker                |

---

## 📁 Project Structure

```text
.
├── app/                    # Next.js App Router (pages, layouts, routes)
├── components/             # Reusable UI components
├── public/                 # Static assets (logos, icons, images)
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose configuration
├── DOCKER_INSTRUCTIONS.md  # Detailed Docker guide
├── package.json
└── package-lock.json
```

> 📝 *Adjust the tree above to match your actual folder layout.*

---

## ☁️ Deployment

### Vercel

The easiest way to deploy this Next.js app is with the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

### Hostinger VPS

For full control, lower cost and a local-friendly setup, AyashMart can be self-hosted on a **Hostinger VPS**. The complete step-by-step guide is below. 👇

---

## 🖥️ Hostinger VPS Deployment Guide

This guide deploys AyashMart on a fresh **Ubuntu 24.04 LTS** Hostinger VPS using **Docker**, **Nginx** (reverse proxy) and a free **Let's Encrypt SSL** certificate.

```text
Visitor ──▶ Nginx (80/443, SSL) ──▶ Docker container (Next.js :3000)
```

### ✅ Prerequisites

| Requirement | Details |
| ----------- | ------- |
| **VPS plan** | Hostinger KVM 1 (1 vCPU / 4 GB RAM) or higher recommended |
| **OS** | Ubuntu 24.04 LTS (or the *Ubuntu 24.04 with Docker* template) |
| **Domain** | A domain name (e.g. `ayashmart.com`) with access to its DNS settings |
| **Access** | Root password or SSH key from hPanel |

---

### Step 1: Create the VPS on Hostinger

1. Log in to **hPanel** → **VPS** → select your server.
2. Go to **OS & Panel → Operating System** and choose **Ubuntu 24.04 LTS**.
   *(Tip: choosing the **Ubuntu 24.04 with Docker** template lets you skip Step 4.)*
3. Set a strong root password and (recommended) add your **SSH public key**.
4. Note the server's **public IP address** from the VPS overview page.

---

### Step 2: Point your domain to the VPS

In your domain's DNS manager (hPanel → **Domains → DNS / Nameservers**, or your registrar), add:

| Type | Name  | Value (Points to) | TTL  |
| ---- | ----- | ----------------- | ---- |
| `A`  | `@`   | `YOUR_VPS_IP`     | 3600 |
| `A`  | `www` | `YOUR_VPS_IP`     | 3600 |

> DNS can take from a few minutes up to a few hours to propagate. Verify with `ping ayashmart.com`.

---

### Step 3: Connect and secure the server

Connect via SSH (or use the **Browser terminal** in hPanel):

```bash
ssh root@YOUR_VPS_IP
```

Update the system and create a non-root user:

```bash
apt update && apt upgrade -y

# Create a deploy user with sudo rights
adduser deploy
usermod -aG sudo deploy
```

Copy your SSH key to the new user (run from **your local machine**):

```bash
ssh-copy-id deploy@YOUR_VPS_IP
```

Enable the firewall (UFW):

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

> [!IMPORTANT]
> Also make sure ports **22, 80 and 443** are allowed in the **Hostinger firewall** (hPanel → VPS → **Security → Firewall**) if you have one enabled there.

**(Recommended) Harden SSH** once key-login works for `deploy`:

```bash
sudo nano /etc/ssh/sshd_config
# Set:
#   PermitRootLogin no
#   PasswordAuthentication no
sudo systemctl restart ssh
```

**(Optional) Add swap** to avoid out-of-memory errors during `next build` on small plans:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

From here on, work as the `deploy` user:

```bash
su - deploy
```

---

### Step 4: Install Docker & Docker Compose

*(Skip if you used the Ubuntu with Docker template.)*

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

---

### Step 5: Clone the project

```bash
sudo apt install -y git
cd ~
git clone <your-repository-url> ayashmart
cd ayashmart
```

> For a private repository, use a [GitHub deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) or a personal access token.

---

### Step 6: Configure environment variables

If the project uses environment variables, create a `.env` file on the server:

```bash
nano .env
```

> [!CAUTION]
> Never commit `.env` files or secrets to Git. Make sure `.env` is listed in `.gitignore`.

---

### Step 7: Build and run with Docker

Bind the app to localhost only, so it is reachable **only through Nginx** and not directly from the internet. In `docker-compose.yml`:

```yaml
services:
  web:
    build: .
    restart: unless-stopped        # auto-restart on crash or reboot
    ports:
      - "127.0.0.1:3000:3000"      # localhost only
```

Start the app in the background:

```bash
docker compose up --build -d
```

Check that it is running:

```bash
docker compose ps
curl -I http://127.0.0.1:3000
```

---

### Step 8: Install and configure Nginx

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/ayashmart
```

Paste the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ayashmart.com www.ayashmart.com;

    client_max_body_size 20M;

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

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/ayashmart /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Your site should now load at **http://ayashmart.com**.

---

### Step 9: Enable free HTTPS (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ayashmart.com -d www.ayashmart.com
```

Choose the option to **redirect HTTP to HTTPS** when prompted. Then confirm that automatic renewal works:

```bash
sudo certbot renew --dry-run
```

🎉 Your store is now live at **https://ayashmart.com**.

---

### 🔄 Updating the live site

Whenever you push new changes to your repository:

```bash
cd ~/ayashmart
git pull origin main
docker compose up --build -d
docker image prune -f      # clean up old images
```

---

### 📊 Useful maintenance commands

| Task                         | Command                                        |
| ---------------------------- | ---------------------------------------------- |
| View live app logs           | `docker compose logs -f`                       |
| Restart the app              | `docker compose restart`                       |
| Stop the app                 | `docker compose down`                          |
| Check container status       | `docker compose ps`                            |
| Check Nginx status           | `sudo systemctl status nginx`                  |
| Test Nginx config            | `sudo nginx -t`                                |
| View Nginx error log         | `sudo tail -f /var/log/nginx/error.log`        |
| Check disk usage             | `df -h`                                        |
| Check memory usage           | `free -h`                                      |
| Clean unused Docker data     | `docker system prune -af`                      |

---

### 🔁 Alternative: Deploy without Docker (Node.js + PM2)

<details>
<summary><b>Click to expand</b></summary>

```bash
# 1. Install Node.js v22 LTS via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22

# 2. Install dependencies and build
cd ~/ayashmart
npm ci
npm run build

# 3. Run with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "ayashmart" -- start
pm2 save
pm2 startup        # run the command it prints so PM2 starts on boot
```

Then continue with **Step 8 (Nginx)** and **Step 9 (HTTPS)** exactly as above.

To update: `git pull && npm ci && npm run build && pm2 restart ayashmart`

</details>

---

### 🔐 Production checklist

- [ ] Root login and password SSH login disabled
- [ ] UFW firewall enabled (22, 80, 443 only)
- [ ] App bound to `127.0.0.1:3000` (not exposed publicly)
- [ ] HTTPS enabled with auto-renewing certificate
- [ ] `restart: unless-stopped` set in `docker-compose.yml`
- [ ] `.env` file kept out of Git
- [ ] Hostinger **weekly/daily backups** enabled in hPanel
- [ ] Regular updates: `sudo apt update && sudo apt upgrade -y`

---

## 🛠️ Troubleshooting

| Problem                                   | Solution                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| CSS parsing error with `animate.css`      | Run the dev server with `npm run dev -- --turbo`                         |
| Dependency mismatch or install errors     | Delete `node_modules` and run `npm ci`                                   |
| Port 3000 already in use                  | Stop the other process or change the port mapping in `docker-compose.yml`|
| Docker build issues                       | See [DOCKER_INSTRUCTIONS.md](./DOCKER_INSTRUCTIONS.md)                   |
| **502 Bad Gateway** on the VPS            | App container is down. Run `docker compose ps` and `docker compose logs -f` |
| **Site not loading** on the domain        | Check DNS `A` records, and that ports 80/443 are open in UFW and the Hostinger firewall |
| **Build killed / out of memory**          | Add a swap file (see Step 3) or upgrade the VPS plan                     |
| **Certbot fails** to issue certificate    | Make sure DNS points to the VPS IP and port 80 is open, then retry       |
| `permission denied` running Docker        | Run `sudo usermod -aG docker $USER` then log out and back in             |
| Nginx config error                        | Run `sudo nginx -t` to find the exact line                               |
| Old version still showing after deploy    | Re-run `docker compose up --build -d` and hard-refresh the browser       |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

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