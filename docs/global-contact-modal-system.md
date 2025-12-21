# Global Contact Modal System

## Overview

A site-wide contact modal system that automatically routes leads (SALES vs AUDIT), scores leads based on page depth and schema context, extracts JSON-LD schema types for intent tagging, integrates with CRM systems, and handles dead CTAs globally.

## Features

### 1. Automatic Lead Routing (SALES vs AUDIT)

The system automatically determines lead intent based on the page path:

**SALES-intent pages:**
- `/services/*` - Service pages
- `/pricing` - Pricing pages
- `/contact` - Contact page

**AUDIT-intent pages:**
- `/audit*` - Audit-related pages
- `/ai-visibility*` - AI visibility pages
- `/insights/*` - Insights/blog pages
- `/case-studies/*` - Case study pages
- `/resources/diagnostic` - Diagnostic tools

**Default:** `sales` (if no match)

### 2. Lead Scoring (0-100)

Lead score is calculated using:

- **Path Depth** (0-40 points): Deeper pages indicate more specific intent
  - Formula: `min(40, pathDepth * 10)`
  
- **Intent Bias** (15-25 points):
  - Sales: +15 points
  - Audit: +25 points
  
- **Schema Types** (5-20 points):
  - `Service`: +20 points
  - `LocalBusiness`: +10 points
  - `Product`: +10 points
  - `Organization`: +5 points
  - `FAQPage`: +5 points
  - `Review`/`AggregateRating`: +5 points
  
- **Time on Page** (0-20 points):
  - +1 point per 15 seconds, max 20 points

### 3. Schema-Aware Intent Tagging

The system extracts `@type` values from all JSON-LD scripts on the page and includes them as tags in the CRM payload. This enables CRM-side automation based on schema types (e.g., "if schema:Service, route to sales team").

### 4. Email-Only System

All lead data (intent, score, schema types, context) is included in the email notification. The email subject and body contain all the routing and scoring information you need to prioritize and route leads manually or via email filters.

### 5. Dead CTA Capture

Any element with `data-contact-trigger` attribute will automatically open the modal:

```html
<!-- Button -->
<button data-contact-trigger>Contact Us</button>

<!-- Link -->
<a href="#" data-contact-trigger>Get Started</a>

<!-- Any element -->
<div data-contact-trigger>Click to contact</div>
```

This allows you to replace broken booking endpoints, dead links, or any CTA with a simple attribute.

### 6. Global Modal

The modal is included in `templates/footer.php`, making it available on every page without per-page code changes.

## Files

### JavaScript
- `assets/js/contact-modal-controller.js` - Main controller (intent detection, scoring, schema extraction, dead CTA handling)

### Templates
- `templates/contact-modal.php` - Modal HTML template
- `templates/footer.php` - Includes modal (modified)

### Backend
- `pages/process-contact.php` - Enhanced form handler (CRM integration, email with context)
- `config.php` - CRM configuration constants (modified)

### Styles
- `assets/css/styles.css` - Modal CSS styles (added)

## Usage

### Opening the Modal Programmatically

```javascript
// Open modal
window.openContactModal();

// Close modal
window.closeContactModal();
```

### Triggering from HTML

Add `data-contact-trigger` to any element:

```html
<a href="#" data-contact-trigger>Contact</a>
```

### Email Subject Format

Email subjects automatically include context:

```
[SALES] [Service: generative-engine-optimization] Score 75 — New Contact Request from John Doe
```

or

```
[AUDIT] [AI Visibility Diagnostic] Score 82 — New Contact Request from Jane Smith
```

## Technical Details

### Intent Detection

Uses simple path-based matching with fallback to `sales`:

```javascript
function inferIntentFromPath(path) {
  if (path.includes('/services/')) return 'sales';
  if (path.includes('/audit')) return 'audit';
  // ... more patterns
  return 'sales'; // default
}
```

### Schema Extraction

Walks JSON-LD objects recursively to extract all `@type` values:

```javascript
function extractTypesFromJsonLd(nodes) {
  const out = new Set();
  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    const t = obj['@type'];
    if (typeof t === 'string') out.add(t);
    if (Array.isArray(t)) t.forEach(x => out.add(x));
    Object.values(obj).forEach(walk);
  }
  nodes.forEach(walk);
  return Array.from(out);
}
```

### Score Updates

The lead score updates every 5 seconds while the user is on the page, and once more when the modal opens (capturing time-on-page accurately).

## Error Handling

- **Email failures:** Falls back to PHP `mail()` function if SMTP fails
- **Form validation:** Validates required fields on both client and server side

## Security

- All user input is escaped using `esc()` function
- Form validation on both client and server side
- CSRF protection via standard PHP form handling

## Testing

1. Test modal opens via `data-contact-trigger` attribute
2. Test modal opens programmatically via `window.openContactModal()`
3. Verify intent detection on different page types
4. Verify schema extraction (check browser console for extracted types)
5. Verify lead score calculation
6. Test form submission and email delivery
7. Verify email contains all context (intent, score, schema types, etc.)

## Future Enhancements

- Add UTM parameter tracking
- Add conversion goal tracking
- Add A/B testing for modal variants
- Add analytics event tracking
- Add webhook support for external integrations

