# Plan - Visual Upgrade for Events, Resources, and Join Pages

Enhance the visual presentation of the Events, Resources, and Join pages to match the premium "BEC" corporate aesthetic, focusing on interactivity, layout, and modern UI patterns.

## User Review Required

> [!IMPORTANT]
> - All existing content, data connections, and backend logic will remain unchanged.
> - New high-quality images and SVG patterns will be added to match the brand DNA (Deep Green #08735d, Gold #c09643).

## Proposed Changes

### Events Page (/events)
- **Countdown Timers**: Add large, high-impact countdown clocks (Days/Hours/Mins) to upcoming event cards.
- **Categorization**: Implement smooth animated tabs for "Upcoming", "Past", and "All" event views.
- **Visual Grid**: Past events will use a photo-heavy grid with a brand-green overlay and icon reveal on hover.
- **Multi-Step Registration**: Refactor the registration modal into a 3-step wizard:
  - Step 1: Event Details & Summary
  - Step 2: User Information Form
  - Step 3: Confirmation & Success message
- **Visual hierarchy**: Add a progress bar to the modal top to guide the user.

### Resources Page (/resources)
- **Featured Hero**: Re-layout the top of the page to showcase the latest/featured article as a full-width, high-impact hero card.
- **Article Grid**: Upgrade the remaining list to a clean 3-column masonry-style grid.
- **Interactive Cards**:
  - Image zoom-on-hover effects.
  - "Gold" category chips (#c09643).
  - "Read time" badges for quick user assessment.
- **Sticky Filters**: Add a sticky category navigation sidebar for desktop and a horizontal scroll bar for mobile.
- **Newsletter Block**: Design a full-width dark green (#08735d) call-to-action section at the bottom with a centered, minimalist input field.

### Join Page (/join)
- **Tier Cards**: Enhance cards with a glowing "brand green" animated border that activates on hover.
- **Highlighting**: Apply a distinctive dark green background and a "Most Popular" gold badge to the Professional tier.
- **Comparison Table**: Add a detailed feature comparison matrix below the tier cards for transparency.
- **Form Upgrade**: Implement floating label inputs (modern "Material" style) and ensure the tier selection is automatically synced with the clicked card.

### Global Styles
- Add CSS utilities for "glowing borders", "floating labels", and "diagonal section dividers".

## Technical Details
- **Framer Motion**: Used for tab transitions, modal steps, and card animations.
- **Tailwind CSS**: Leveraging custom theme colors defined in `src/styles.css`.
- **Lucide React**: Integrating new icons for categories and badges.
- **State Management**: Using local React state for modal steps and tab filtering.
