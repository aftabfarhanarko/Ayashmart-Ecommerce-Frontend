<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Docker Quick Reference Guide 🐳

**A quick reference manual for building and orchestrating the AyashMart frontend container.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-v22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

[Main README](./README.md) · [Full Docker Guide](./DOCKER_INSTRUCTIONS.md) · [Deployment Guide](./DEPLOYMENT.md)

</div>

---

## 👨‍💻 For Developers (Local Quick Start)

Spin up the AyashMart Next.js storefront locally with a single command:

### 1. Environment Configuration

```bash
cp .env.example .env
```

Ensure `NEXT_PUBLIC_API_URL` is set to your preferred API endpoint (e.g. `http://localhost:8000` or production).

### 2. Launch the Container

```bash
docker compose up --build -d
```

Access the application in your browser at: **[http://localhost:3000](http://localhost:3000)**

### 3. Check Live Logs

```bash
docker compose logs -f
```

### 4. Stop the Container

```bash
docker compose down
```

---

## 🛠️ For DevOps (Production Container Engine)

The included [Dockerfile](./Dockerfile) implements an optimized multi-stage build that extracts Next.js `standalone` artifacts.

### Key Specifications

| Attribute | Specification |
| --------- | ------------- |
| **Base Image** | `node:22-alpine` |
| **Output Port** | `3000` |
| **Entrypoint** | `node server.js` |
| **Runtime Security** | Runs under unprivileged user `nextjs:nodejs` (UID 1001) |
| **Optimization** | Leverages `.next/standalone` output tracing |

### Manual Docker Build & Run

```bash
# 1. Build Docker image
docker build -t ayashmart/frontend:latest .

# 2. Run container
docker run -d \
  --name ayashmart-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="https://ayashmart.com/api" \
  -e NODE_ENV="production" \
  ayashmart/frontend:latest
```

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
