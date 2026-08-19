const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'src/styles.css'), 'utf-8');

// 1. Remove .bec-actions a { ... } and hover logic that conflicts with base buttons
content = content.replace(/\.bec-actions a\s*\{[\s\S]*?\n(?:@media[\s\S]*?\n)?\.bec-actions a:hover\s*\{[\s\S]*?\n/g, '');
content = content.replace(/\.bec-actions a\s*\{[\s\S]*?\}/g, '');
content = content.replace(/\.bec-actions a:hover[\s\S]*?\}/g, '');

// 2. Remove old .bec-primary and .bec-secondary from top (around line 686)
content = content.replace(/\.bec-primary\s*\{[\s\S]*?\n\.bec-primary:hover\s*\{[\s\S]*?\n\.bec-secondary\s*\{[\s\S]*?\n\.bec-secondary:hover\s*\{[\s\S]*?\n/g, '');

// 3. Remove old .bec-primary with !important (around line 3028)
content = content.replace(/\.bec-primary\s*\{[\s\S]*?\n\}\n\n\.bec-primary::after\s*\{[\s\S]*?\n\}\n\n\.bec-primary:hover::after\s*\{[\s\S]*?\n\}\n\n\n\.bec-primary:hover\s*\{[\s\S]*?\n\}/g, '');

// 4. Remove .bec-btn-hover (which was used sporadically)
content = content.replace(/\.bec-btn-hover[\s\S]*?\}/g, '');

// 5. Inject new Button System right before MOBILE OPTIMIZATION
const buttonSystem = `
/* ==========================================================================
   BUTTON SYSTEM (PHASE 5)
   ========================================================================== */
.bec-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;
  min-width: 140px;
}

.bec-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(8, 115, 93, 0.2);
}

.bec-button:active {
  transform: scale(0.98);
}

.bec-button svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.bec-button:hover svg {
  transform: translateX(4px);
}

/* Primary Variant */
.bec-primary {
  background-color: #08735d;
  color: #fff;
  border: 1px solid #08735d;
  box-shadow: 0 4px 12px rgba(8, 115, 93, 0.15);
}

.bec-primary:hover {
  background-color: #065c4a;
  border-color: #065c4a;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(8, 115, 93, 0.3);
}

/* Secondary Variant */
.bec-secondary {
  background-color: #fff;
  color: #14202d;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.bec-secondary:hover {
  background-color: #f8faf9;
  border-color: #08735d;
  color: #08735d;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(8, 115, 93, 0.1);
}

/* Tertiary / Ghost Variant */
.bec-tertiary {
  background-color: transparent;
  color: #08735d;
  border: 1px solid transparent;
}

.bec-tertiary:hover {
  background-color: rgba(8, 115, 93, 0.05);
  color: #065c4a;
}
`;

content = content.replace("/* ==========================================================================\n   MOBILE OPTIMIZATION — COMPLETE PASS", buttonSystem + "\n/* ==========================================================================\n   MOBILE OPTIMIZATION — COMPLETE PASS");

fs.writeFileSync(path.join(__dirname, 'src/styles.css'), content);
console.log("Button system injected!");
