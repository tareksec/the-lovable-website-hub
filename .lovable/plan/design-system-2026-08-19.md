---
name: Featured Testimonial Block & FAQ Section
description: Implementation of a premium testimonial slider and a dual-column FAQ section across Home, Reviews, and Contact pages with strict design system adherence.
type: feature
---

## Design System
- Green: `#08735d`
- Gold: `#c09643`
- Background: `#fbfcfb`
- Text: `#14202d`
- Font: `Plus Jakarta Sans`
- Breakpoints: `900px` (desktop/tablet), `700px` (mobile)

## Requirements

### 1. Featured Testimonial Block (Section 4)
- **Locations**: `/reviews` (Hero), Homepage (above footer).
- **Layout (Reviews Page)**: 50/50 split.
  - **Left**: Large image with green gradient overlay and floating "10,000+ Professionals Trust BEC" badge.
  - **Right**: Testimonial slider with header, gold quote icon, and 3 auto-rotating slides.
- **Content**: 3 specific testimonials (Rahman Kabir, Nusrat Jahan, Ashraf Hossain) with photos, names, designations, and 5-star ratings.
- **Controls**: Arrows (green/white), dots (gold active).
- **Animations**: Slide + fade transitions, author fade-up, star fill effect.
- **Homepage Version**: Compact centered green card (`#08735d`) with white text and gold stars.

### 2. FAQ Section (Section 5)
- **Locations**: Homepage (between stats and blog), `/contact` (below form).
- **Layout**: 2-column split.
  - **Left (40%)**: Green card with support icon, title, description, contact links (email, LinkedIn), and "Connect on LinkedIn" button.
  - **Right (60%)**: Accordion with 5 specific questions and answers about BEC.
- **Interactive**: Smooth accordion expand/collapse.

## Implementation Details

### Components to Create
- `src/components/home/TestimonialSlider.tsx`: Reusable slider component with full and compact modes.
- `src/components/shared/FAQAccordion.tsx`: Reusable FAQ component with split layout.

### Styles to Update
- `src/styles.css`: Add styles for:
  - Testimonial slider transitions and star animations.
  - FAQ card and accordion custom variants.
  - Mobile swipe support for the slider.

### Pages to Update
- `src/pages/home/index.tsx`: Integrate compact testimonial slider and FAQ section.
- `src/pages/reviews/index.tsx`: Replace/Add featured testimonial hero.
- `src/pages/contact/index.tsx`: Replace/Enhance existing FAQ with the new split layout.

## Constraints
- Do not change Phase 1 work or existing content outside these new sections.
- Adhere strictly to provided hex codes and font.
- Ensure full mobile responsiveness at defined breakpoints.
