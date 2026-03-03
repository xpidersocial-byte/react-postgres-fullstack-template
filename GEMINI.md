# GEMINI.md - XPIDER Inventory Engine Project Context

## Project Overview
This project is the 'XPIDER Inventory Engine', a full-stack web application migrated to Next.js/React and hosted on Cloudflare Pages/Workers. It utilizes Cloudflare's complete storage suite (D1, KV, R2) and connects to an external PostgreSQL database via Hyperdrive.

## Tech Stack
- **Frontend:** React 19 (Vite), Tailwind CSS 4, React Router 7.
- **Backend:** Hono.js running on Cloudflare Workers.
- **Database:** PostgreSQL (via Hyperdrive) + Cloudflare D1 (SQL).
- **Storage:** Cloudflare KV (Caching/Sessions), Cloudflare R2 (Assets).

## Key Bindings
- `D1`: Primary SQL database for local Cloudflare storage.
- `KV`: Key-value storage for metadata and session management.
- `R2`: Object storage for book covers and media assets.
- `HYPERDRIVE`: Optimized connection to external PostgreSQL (e.g., Neon.tech).

## Development Guidelines
- Always prioritize Cloudflare's "Edge" compatibility (e.g., use `postgres` or `@neondatabase/serverless` instead of standard `pg` node drivers).
- Use the `StorageDashboard.jsx` component to verify service availability.
- When adding new features, ensure they respect the "Mock Data" fallback pattern established in `api/index.js`.
