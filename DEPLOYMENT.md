# BEC Deployment Guide

The app is a TanStack Start application: UI plus server functions ship as one build.
Below is how to deploy it as a split frontend (Vercel) + backend (Railway) setup.

## 1. Frontend — Vercel

- Build command: `npm run build`
- Output: handled by the framework adapter (no custom output directory needed)
- Node version: 20+
- Environment variables: copy from `.env.example`
  - `VITE_API_BASE_URL` — leave empty for same-origin, or point at the Railway backend
    (e.g. `https://bec-api.up.railway.app`). All client API calls go through
    `apiUrl()` in `src/lib/config.ts`, so switching backends is env-only.
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`
  - `VITE_SITE_URL` — public URL used for canonical/OG links

Never put service-role keys or database passwords in `VITE_*` variables.

## 2. Backend — Railway

- Start command: `npm run start` (serves the built server bundle)
- Health check path: `/` (or add `/api/public/health` if you need a dedicated probe)
- Environment variables: copy from `.env.server.example`
  - `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - `DATABASE_URL` only if connecting to Postgres directly
  - `ALLOWED_ORIGINS` — must include the Vercel domain and the custom domain
  - `WEBHOOK_SECRET` for any inbound webhook route under `src/routes/api/public/*`

## 3. Post-deploy checklist

- [ ] Confirm every public page renders (`/`, `/about`, `/services`, `/community`,
      `/events`, `/reviews`, `/resources`, `/resources/:slug`, `/contact`, `/join`)
- [ ] Submit one contact, review, join and newsletter form against production
- [ ] Sign in at `/auth` and confirm `/admin` loads for the admin account
- [ ] Verify 404 page at a random URL
- [ ] Check meta titles/descriptions with a social preview tool
- [ ] Point the custom domain at the frontend and update `VITE_SITE_URL`

## Note on the current hosting

In this workspace the database, auth and server functions already run on the managed
Lovable Cloud backend, so publishing from Lovable deploys frontend and backend together
with no extra configuration. The Vercel/Railway path above is only needed if you move
off managed hosting.
