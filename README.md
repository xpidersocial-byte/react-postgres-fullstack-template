# XPIDER Inventory Engine: React + Postgres + Cloudflare

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xpidersocial-byte/react-postgres-fullstack-template)

A modern full-stack web application powered by **React 19**, **Hono.js**, and **PostgreSQL**, optimized for the **Cloudflare Free Tier**.

## ✨ Features
- **Frontend:** React with Vite & React Router (SPA).
- **Backend:** Fast Hono.js API server running on Workers.
- **Database:** PostgreSQL accelerated by **Cloudflare Hyperdrive**.
- **Cloudflare Integrated:**
  - **D1 SQL Database** for local Cloudflare storage.
  - **KV Storage** for session and metadata management.
  - **R2 Object Storage** for asset/image hosting.
- **Storage Dashboard:** Integrated UI component to monitor Cloudflare service availability.
- **Smart Placement:** Optimized performance by running logic closer to your database.

## 🚀 Quick Start
1. **Clone & Install:**
   ```bash
   npm install
   ```
2. **Run Locally:**
   ```bash
   npm run dev
   ```
   *The app runs in "Mock Data" mode by default. Check the **Storage Dashboard** at the bottom of the page to see connection status.*

## 📖 Documentation
For detailed setup instructions on connecting a real PostgreSQL database, D1, KV, and R2, see:
- [documentation.md](./documentation.md)
- [GEMINI.md](./GEMINI.md)

## 🛠️ Tech Stack
- **React 19**
- **Hono.js**
- **Postgres** (via `postgres` library)
- **Tailwind CSS 4**
- **Cloudflare Workers & Assets**
- **Cloudflare D1, KV, R2, & Hyperdrive**

## 🌐 Deployment
Deploy your full website for free to Cloudflare:
```bash
npm run deploy
```
