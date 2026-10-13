<div align="center">

<img src="https://ayashmart.com/logo-primary.png" alt="AyashMart Logo" width="320" />

# AyashMart — Backend & API Integration Guide 🔌

**Documentation for API communication, REST services, authentication, and state management in AyashMart.**

<sub>🚀 Developed by <b>Aftab Farhan ARKO</b></sub>

[![Live Site](https://img.shields.io/badge/Live-ayashmart.com-e11d1d?style=for-the-badge)](https://ayashmart.com)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![REST API](https://img.shields.io/badge/API-RESTful-009688?style=for-the-badge)](https://ayashmart.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

[Main README](./README.md) · [Deployment Guide](./DEPLOYMENT.md) · [Docker Instructions](./DOCKER_INSTRUCTIONS.md)

</div>

---

## 📖 Table of Contents

- [Integration Overview](#-integration-overview)
- [Configuration & Environment](#-configuration--environment)
- [Authentication System](#-authentication-system)
- [Cart & Checkout Services](#-cart--checkout-services)
- [Catalog & Product Endpoints](#-catalog--product-endpoints)
- [Architecture & State Management](#-architecture--state-management)
- [Developer](#-developer)
- [License](#-license)

---

## 💡 Integration Overview

The **AyashMart** storefront communicates with the backend via centralized REST API services. This guide documents the client endpoints, data payloads, and integration conventions used across the frontend.

---

## ⚙️ Configuration & Environment

API configuration is centralized in `src/lib/api-config.ts` and controlled via environment variables:

```env
# Primary Backend API URL
NEXT_PUBLIC_API_URL=https://ayashmart.com/api

# Company / Tenant Identifier
COMPANY_ID=ayashmart
```

```typescript
// src/lib/api-config.ts
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  companyId: process.env.COMPANY_ID || 'ayashmart',
};
```

---

## 🔐 Authentication System

AyashMart handles customer authentication using JSON Web Tokens (JWT) and NextAuth:

- **Login Endpoint:** `POST /systemuser/login`
- **Registration Endpoint:** `POST /systemuser/register` (routed via Next.js API route `src/app/api/register/route.ts`)
- **Token Handling:** JWT tokens are persisted in session cookies and forwarded in the `Authorization: Bearer <TOKEN>` header for protected user requests.

---

## 🛒 Cart & Checkout Services

Shopping cart state is managed globally through `CartContext` (`src/context/CartContext.tsx`) and synced with the backend:

| Action | HTTP Method | Endpoint | Description |
| ------ | ----------- | -------- | ----------- |
| **Fetch Cart** | `GET` | `/cartproducts/user/:userId` | Retrieves current cart items for the authenticated user |
| **Add to Cart** | `POST` | `/cartproducts` | Adds an item with quantity, selected variant, and unit price |
| **Update Quantity** | `PATCH` | `/cartproducts/:id` | Modifies item quantity |
| **Remove Item** | `DELETE` | `/cartproducts/:id` | Removes a single line item from the cart |
| **Clear Cart** | `DELETE` | `/cartproducts/user/:userId` | Empties the user's shopping cart upon successful checkout |

---

## 🛍️ Catalog & Product Endpoints

Catalog data retrieval is encapsulated inside `src/lib/api-services.ts`:

| Method | Endpoint | Functionality |
| ------ | -------- | ------------- |
| `getProducts()` | `GET /products` | Fetches catalog products with pagination & filtering |
| `getProduct(id)` | `GET /products/:id` | Retrieves detailed product information, images & attributes |
| `getTrendingProducts()` | `GET /products/trending` | Fetches trending / best-selling items for the homepage |
| `getFlashSaleProducts()` | `GET /products/flash-sale` | Retrieves discounted items for the active flash sale |
| `getCategories()` | `GET /categories` | Retrieves all product categories and taxonomies |
| `getBanners()` | `GET /banners` | Fetches marketing hero banners and promotional carousels |

---

## 🏛️ Architecture & State Management

- **Client State:** Global cart state, wishlists, and user sessions are managed using React Context and local caching.
- **Error Handling:** Centralized try/catch wrappers ensure graceful fallbacks when external API requests experience transient network latency.
- **Component Separation:** UI components remain decoupled from direct HTTP calls by importing clean functions from `src/lib/api-services.ts`.

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
