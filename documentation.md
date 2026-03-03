# XPIDER Inventory Engine - Documentation

## Project Structure
- `/src`: Frontend React components, routes, and logic.
  - `/src/components`: UI components (including `StorageDashboard.jsx`).
  - `/src/lib`: Frontend utility functions.
- `/api`: Backend Hono.js API server running on Cloudflare Workers.
  - `/api/routes`: Modular API route definitions (Books, Storage).
  - `/api/lib`: Backend utilities and mock data fallbacks.
- `wrangler.jsonc`: Cloudflare configuration and service bindings.
- `init.sql`: Database schema and initial seed data for PostgreSQL.

## Cloudflare Free-Tier Storage Setup

### 1. D1 Database (SQL)
To initialize your local D1 SQL database:
```bash
npx wrangler d1 create inventory-db
```
Update the `database_id` in `wrangler.jsonc`.

### 2. KV Namespace (Key-Value)
To create a KV namespace for metadata/sessions:
```bash
npx wrangler kv:namespace create APP_KV
```
Update the `id` in `wrangler.jsonc`.

### 3. R2 Bucket (Object Storage)
To create a bucket for image assets:
```bash
npx wrangler r2 bucket create app-assets
```
Update the `bucket_name` in `wrangler.jsonc`.

### 4. Hyperdrive (PostgreSQL Accelerator)
If using an external Postgres DB (e.g., Neon.tech):
```bash
npx wrangler hyperdrive create my-hyperdrive --connection-string="postgres://user:pass@host:5432/db"
```
Update the `id` in `wrangler.jsonc`.

## Local Development
Run the app in development mode:
```bash
npm install
npm run dev
```
By default, the app uses a **Mock Data** pattern if these services are not configured. The **Storage Dashboard** at the bottom of the home page will indicate which services are connected.

## Deployment
Deploy your full website to Cloudflare:
```bash
npm run deploy
```
