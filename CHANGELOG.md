<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Release Changelog 📝

**Chronological release notes, improvements, and architectural milestones for AyashMart.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-v22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

[Main README](./README.md) · [Deployment Guide](./DEPLOYMENT.md) · [Docker Instructions](./DOCKER_INSTRUCTIONS.md)

</div>

---

## 📖 Table of Contents

- [v1.3.0 — Production Hardening & Documentation Overhaul (2026-10)](#v130--production-hardening--documentation-overhaul-2026-10)
- [v1.2.0 — Build Crash Fixes & Error Handling (2026-02)](#v120--build-crash-fixes--error-handling-2026-02)
- [v1.1.0 — Architecture Refactor & Performance Optimization (2026-02)](#v110--architecture-refactor--performance-optimization-2026-02)
- [v1.0.0 — Initial AyashMart Storefront Release (2026-02)](#v100--initial-ayashmart-storefront-release-2026-02)
- [Developer](#-developer)
- [License](#-license)

---

## v1.3.0 — Production Hardening & Documentation Overhaul (2026-10)

### 🚀 Highlights & Features
- **Docker Production Pipeline:** Polished `node:22-alpine` multi-stage build with unprivileged runner user and `.next/standalone` output optimization.
- **Hostinger VPS & Nginx Automation:** Complete automated deployment guidelines with Nginx reverse proxy, Certbot SSL auto-renewal, and UFW firewall hardening.
- **Turbopack Dev Workflow:** Standardized `npm run dev -- --turbo` to avoid Webpack CSS parsing conflicts with `animate.css`.
- **Standardized Documentation Suite:** Unified all repository markdown documentation (`README.md`, `DEPLOYMENT.md`, `DOCKER_INSTRUCTIONS.md`, `DOCKER.md`, `MIGRATION.md`, `INTEGRATION_NOTES.md`, `CHANGELOG.md`).

---

## v1.2.0 — Build Crash Fixes & Error Handling (2026-02)

### 🐛 Bug Fixes & Stability
- **Apollo GraphQL Build Resilience:** Wrapped `client.query` calls in `try/catch` handlers within Flash Sale and product list pages to prevent build-time crashes (`ECONNREFUSED`) when backend is unreachable during static pre-rendering.
- **Checkout Page Safety:** Resolved variable shadowing and redeclaration anomalies in checkout and order flow components.
- **Type Safety Enhancements:** Updated TypeScript configurations and cleaned linting errors across App Router layouts.

---

## v1.1.0 — Architecture Refactor & Performance Optimization (2026-02)

### ⚡ Architectural Enhancements
- **Dynamic Routing & Components:** Refactored storefront layout into clean modular components for Category browsing, Hero Carousels, and Featured Collections.
- **Axios API Layer:** Unified global HTTP request handling with standard API client services and configurable backend URLs.
- **Asset Optimization:** Integrated Next.js Image optimization and WebP caching for fast image loading.

---

## v1.0.0 — Initial AyashMart Storefront Release (2026-02)

### 🛍️ Storefront Launch
- **Next.js 14 App Router:** Modern frontend architecture with responsive design for mobile, tablet, and desktop shoppers.
- **Catalog & Discovery:** Dynamic product listings, category pages, flash sale countdown timers, and search.
- **Cart & Checkout Experience:** Integrated shopping cart, local state management, and streamlined checkout UI.
- **Trust & Compliance Pages:** Added Terms of Service, Privacy Policy, Return & Refund Policy, and WhatsApp customer support links.

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
