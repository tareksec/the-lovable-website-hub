# BEC Website — Audit & Upgrade Plan

## 1. What exists and works

- All 9 public pages exist and render: `/`, `/about`, `/services`, `/community`, `/reviews`, `/events`, `/resources`, `/contact`, `/join`.
- Shared layout: header nav with active-link state, footer with quick links + LinkedIn, scroll-to-top button, page transitions.
- Homepage design is complete and on-brand (hero, 4 service cards, 5 impact stats).
- Design tokens are correct: green #08735d, gold #c09643, background #fbfcfb, dark text #14202d, Plus Jakarta Sans, breakpoints at 900px and 700px.
- Per-page SEO metadata (title, description, og tags) on every route.
- Services page lists the 4 correct services with feature lists.
- A typed API client (`src/lib/publicApi.ts`) defines every endpoint and data shape the site needs.

## 2. What is missing

- **The entire backend.** No database, no API, no server code. Every `/api/*` call 404s.
- **Admin panel** (`/admin`) — does not exist at all. No auth, no login, no CRUD for Posts, Reviews, Events, Members, Team, Stats.
- **Persistence** for the 6 public forms/reads: reviews, event registration, membership applications, contact messages, newsletter signups, blog posts.
- Team members on About, stats on Community, posts on Resources — all read from the dead API.
- Mobile navigation menu (no hamburger; on small screens the links become a horizontally scrolling strip).
- Individual blog post pages (`/resources/:slug`) — posts have slugs but nothing renders one.
- Membership tiers on `/join` are form values only; no pricing/benefit presentation per tier.

## 3. What is broken or wrong

- Community, Events, Reviews, Resources, About (team) all show permanent empty states or error states because the API is absent.
- Contact, Join, Review-submit, Newsletter, Event-registration forms all fail on submit — data is silently lost.
- Data fetching uses `useEffect` + local state instead of TanStack Query (which is installed), so no caching, retries, or SSR-friendly loading.
- The home nav's first link is hard-styled as active (`:first-child` gold underline) regardless of the current page, conflicting with the real active state.
- Stats are hardcoded in the homepage rather than driven by the manageable "Site Stats" the admin panel is meant to control.

## 4. Tech stack note (important)

Your listed stack — Wouter, Express 5 + Pino, standalone PostgreSQL/Drizzle, Vercel + Railway — is not what this project runs on and can't be installed here. This project is **TanStack Start (React 19, Vite, TanStack Router + Query, Tailwind 4)** with server functions, deployed as one app. Equivalents I'll use:

| You asked for | Here |
| --- | --- |
| Wouter | TanStack Router (already routing the site) |
| Express 5 + Pino | TanStack server functions + `/api/public/*` routes |
| PostgreSQL + Drizzle | Lovable Cloud PostgreSQL (Postgres, with row-level security) |
| Zod validation | Zod (already installed) — unchanged |
| JWT httpOnly cookie auth | Lovable Cloud auth (secure session tokens) + role table |
| Vercel + Railway | Single Lovable deploy (frontend + backend together) |

Everything you asked for functionally is achievable; only the vendor names change. The homepage design stays exactly as-is.

## 5. Upgrade plan

**Phase 1 — Backend foundation**
Enable Lovable Cloud. Create tables with RLS + grants: `posts`, `reviews`, `events`, `event_registrations`, `members`, `team_members`, `site_stats`, `contact_messages`, `newsletter_subscribers`, plus `user_roles` (admin role in a separate table, never on profiles). Seed real BEC content: the 4 services, the 4 impact stats, sample team/events/posts.

**Phase 2 — Wire the public site**
Replace `src/lib/publicApi.ts` fetches with server functions + TanStack Query. Public reads (approved reviews, published posts, upcoming events, team, stats) via anon-readable policies; all writes (contact, join, review submit, newsletter, event registration) via validated server functions with Zod. Forms get success/error toasts and disabled-while-submitting states.

**Phase 3 — Admin panel**
`/admin` login page + protected `/admin/*` area gated by the admin role (checked server-side, never client-side). Dashboard with sections: Posts (create/edit/delete/publish), Reviews (approve/reject), Events (CRUD + view registrations), Members (view applications, change status), Team Members (CRUD + ordering), Site Stats (edit impact numbers). Plus read-only views of contact messages and newsletter subscribers.

**Phase 4 — Polish**
Mobile hamburger nav; `/resources/$slug` blog detail pages with per-post SEO/og:image; membership tier cards on `/join`; stats driven from the database; fix the nav first-child active styling; consistent loading skeletons and empty states across all pages.

Homepage layout and visual design are preserved exactly throughout.
