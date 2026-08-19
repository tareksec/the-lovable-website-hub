# Plan: Professional Rich Text Editor for BEC Admin Panel

Upgrade the simple `textarea` blog content editor to a professional-grade rich text editor using **TipTap**, including a sticky toolbar, image/link handling, and a dual-column management layout.

## User Review Required

> [!IMPORTANT]
> - **Image Uploads**: I will implement a placeholder `/api/admin/upload` server route. If you have a specific storage provider preference (e.g., Supabase Storage bucket name), please let me know.
> - **Rich Text Data**: Changing to rich text will store HTML in the `content` field. Existing plain text posts will still work but might lack formatting until edited.

## Proposed Changes

### 1. Dependencies
Install TipTap and required extensions:
- `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`
- Extensions: `Image`, `Link`, `Placeholder`, `TextAlign`, `Underline`, `Color`, `Highlight`

### 2. Rich Text Editor Component
Create `src/components/admin/RichTextEditor.tsx`:
- **TipTap Instance**: Configured with the requested extensions and placeholder.
- **Sticky Toolbar**: 
  - Styled as per requirements (sticky top, white bg, specific button sizing/states).
  - Grouped controls: Formatting, Headings, Alignment, Lists, Inserts, Colors, History.
- **Link/Image Modals**: 
  - Link popup for URL, text, and `_blank` target.
  - Image modal with Upload (Drag & Drop) and URL tabs.

### 3. Admin Layout Upgrade
Refactor `src/pages/admin/index.tsx` (`PostsTab`):
- **Two-Column Layout**: Editor on the left (65%), Sidebar on the right (35%).
- **Enhanced Sidebar**: 
  - Publish box with Status toggle (Draft/Published) and Auto-save status.
  - Cover Image box with preview and upload capability.
  - Settings (Category, Tags).
- **Expanded Title Area**: Full-width borderless title and excerpt fields.

### 4. Backend & API
- **API Route**: Create `src/routes/api/admin/upload.ts` to handle multipart/form-data image uploads.
- **Post Persistence**: Update the `posts` table via Supabase to include a `published` boolean if not already fully utilized (the schema has it, but the current UI uses it as "Publish Post" which inserts).

## Technical Details

- **TipTap Styling**: Scoped CSS in `src/styles.css` using the `.ProseMirror` class to ensure H1-H3, Blockquotes, and Lists match the BEC visual DNA (Green bullets, specific H sizes).
- **Image Handling**: Implement a custom TipTap node or use `extension-image` with standard upload flow.
- **Auto-save**: Use a debounced `useEffect` to save drafts to the local state or database every 30 seconds.

## Visual DNA Alignment
- **Typography**: Plus Jakarta Sans for UI, specific weights for headings (800 for H1).
- **Colors**: Deep Green (`#08735d`) for primary buttons and active states.
- **Borders**: Soft gray (`#e5e7eb`) with 12px/24px rounded corners.
