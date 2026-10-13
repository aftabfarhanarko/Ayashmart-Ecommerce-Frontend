<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Docker Guide & Instructions 🐳

**Comprehensive guide for building, running and managing AyashMart with Docker & Docker Compose.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-v22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Hostinger VPS](https://img.shields.io/badge/Hosted_on-Hostinger_VPS-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com/vps-hosting)

[Main README](./README.md) · [Deployment Guide](./DEPLOYMENT.md) · [Live Demo](https://ayashmart.com) · [Report an Issue](../../issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Multi-Stage Docker Architecture](#-multi-stage-docker-architecture)
- [Docker Compose Configuration](#-docker-compose-configuration)
- [Environment Variables](#-environment-variables)
- [Development vs Production Modes](#-development-vs-production-modes)
- [Useful Docker Commands](#-useful-docker-commands)
- [Troubleshooting](#-troubleshooting)
- [Developer](#-developer)
- [License](#-license)

---

## 💡 Overview

Containerizing **AyashMart** with Docker eliminates local environment inconsistencies ("works on my machine" syndrome), automates dependency isolation, and guarantees identical builds across development and production servers (including Hostinger VPS).

The application leverages Next.js **standalone output** within an optimized multi-stage `node:22-alpine` image to achieve minimal image size and blazing-fast cold starts.

---

## 📋 Prerequisites

Before getting started, make sure you have the following installed on your host machine:

| Requirement | Supported Platforms | Installation Guide |
| ----------- | ------------------- | ------------------ |
| **Docker Desktop** / **Docker Engine** | Windows, macOS, Linux | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |
| **Docker Compose v2+** | Included with Docker Desktop / Linux package | [docs.docker.com/compose](https://docs.docker.com/compose/) |
| **Git** | All platforms | [git-scm.com](https://git-scm.com/) |

---

## ⚡ Quick Start

Run the entire AyashMart storefront with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/aftabfarhanarko/Ayashmart-Ecommerce-Frontend.git
cd Ayashmart-Ecommerce-Frontend

# 2. (Optional) Setup environment variables
cp .env.example .env

# 3. Build and launch the container
docker compose up --build
```

Once built, open **[http://localhost:3000](http://localhost:3000)** in your browser.

> [!TIP]
> To run in the background (detached mode), use the `-d` flag:
> ```bash
> docker compose up --build -d
> ```

To stop the running application:
```bash
docker compose down
```

---

## 🏗️ Multi-Stage Docker Architecture

The project's [Dockerfile](./Dockerfile) is crafted with a high-performance 3-stage build pipeline:

```text
┌─────────────────────────┐
│ Stage 1: deps           │  node:22-alpine + libc6-compat
│ Install dependencies    │  Runs npm install --legacy-peer-deps
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Stage 2: builder        │  Compiles Next.js standalone build
│ Build application       │  Optimizes assets & generates .next/standalone
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Stage 3: runner         │  Unprivileged nextjs user (UID 1001)
│ Production runtime      │  Lightweight footprint: only standalone & static assets
└─────────────────────────┘
```

### Key Highlights:
- **Base OS:** Alpine Linux (`node:22-alpine`) for a compact and secure footprint.
- **Security:** Runs under an unprivileged user (`nextjs:nodejs`, UID 1001).
- **Standalone Tracing:** Next.js traces runtime dependencies automatically, discarding unneeded node_modules for minimal memory usage.
- **Port:** Exposes internal port `3000`.

---

## ⚙️ Docker Compose Configuration

The default [docker-compose.yml](./docker-compose.yml) provides a ready-to-run setup:

```yaml
version: '3.8'

services:
  ayashmart-web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NODE_ENV=production
    restart: unless-stopped
```

> [!NOTE]
> On a production VPS, bind the port to `127.0.0.1:3000:3000` so only Nginx can route traffic to it.

---

## 🔑 Environment Variables

AyashMart reads environment variables for API configuration and runtime settings. Pass them via `.env`:

```env
# API Endpoint
NEXT_PUBLIC_API_URL=https://ayashmart.com/api

# Node Environment
NODE_ENV=production

# Disable Next.js Telemetry
NEXT_TELEMETRY_DISABLED=1
```

---

## 🔄 Development vs Production Modes

### Running in Production Mode (Default)
Builds the optimized standalone bundle and serves via `node server.js`:
```bash
docker compose up --build
```

### Running with Hot Reloading (Development)
If you want to edit code live with Docker, you can mount your source directory into the container. Add volumes in `docker-compose.yml`:

```yaml
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    command: npm run dev -- --turbo
```

---

## 🛠️ Useful Docker Commands

| Action | Command |
| ------ | ------- |
| **Build & start containers** | `docker compose up --build -d` |
| **View real-time logs** | `docker compose logs -f` |
| **Stop containers** | `docker compose stop` |
| **Stop & remove containers** | `docker compose down` |
| **Restart container** | `docker compose restart` |
| **Inspect container shell** | `docker compose exec ayashmart-web sh` |
| **Check running status** | `docker compose ps` |
| **Force clean rebuild** | `docker compose up --build --force-recreate` |
| **Remove unused Docker images & cache** | `docker system prune -af` |

---

## 🔧 Troubleshooting

| Issue | Cause | Solution |
| ----- | ----- | -------- |
| **Port 3000 already in use** | Another service is using port 3000 | Change port in `docker-compose.yml` to `"3001:3000"` and access `http://localhost:3001` |
| **Build fails due to OOM (Out of Memory)** | Insufficient RAM allocated to Docker engine | Allocate at least 2-4GB memory in Docker Desktop Settings or add a swap file on Linux VPS |
| **Changes not reflecting** | Cached layers in Docker | Rebuild using `docker compose build --no-cache` |
| **`npm ci` / `npm install` slow on Windows** | NTFS volume mount latency | Run within WSL2 backend or be patient during the first image build |
| **`permission denied` executing docker** | Non-root Linux user without docker group access | Run `sudo usermod -aG docker $USER` and log back into your shell |
| **Container crashes immediately** | Missing environment variable or build issue | Run `docker compose logs` to inspect the exact Node.js stack trace |

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
