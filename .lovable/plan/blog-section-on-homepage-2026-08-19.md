---
name: Final Implementation Phase - Blog & Membership
description: Add a blog insights section and upgrade the membership pricing system on the home and join pages.
type: feature
---

## Blog Section on Homepage
- Implement a new `BlogInsights` component in `src/components/shared/BlogInsights.tsx`.
- Integrated below the `FAQSection` on the homepage.
- Fetch 3 latest posts using `publicApi.posts.getAll()`.
- Implement responsive grid: 3 col (desktop), 2 col (tablet), 1 col (mobile).
- Card design: 16:9 hover-zoom images, category chips, author metadata, and "Read More" CTA.
- Outlined "View All Articles" button linking to `/resources`.

## Membership System Upgrade
- **Homepage Teaser**: Add a compact membership section above the footer CTA.
  - Light green tint background (`#08735d` at 4% opacity).
  - Pill chips for tiers (Basic, Professional ★, Corporate).
- **/join Page Overhaul**:
  - Replace existing tier cards with new premium designs.
  - **Basic**: Grey pill badge, green icon, outlined CTA.
  - **Professional (Featured)**: Green badge, gold icon, 1.03x scale, deep shadow, filled CTA.
  - **Corporate**: Dark green background, white/gold text, gold icon, filled white CTA.
- Integrated join form pre-selection logic for each tier.

## Technical Details
- **Colors**: Green (`#08735d`), Gold (`#c09643`), Background (`#fbfcfb`), Text (`#14202d`).
- **Typography**: Plus Jakarta Sans, 36px bold titles.
- **Animations**: Framer Motion for fade-up reveals and staggered card entrances (0.12s increments).
- **Icons**: Lucide-react (Users, Rocket/Zap, Building).
