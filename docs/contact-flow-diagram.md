# Contact Flow: Homepage → Email/Text

## Complete User Journey

### STEP 1: Homepage (`/`)
**User sees:**
- Header navigation with "Contact" link
- Homepage CTA: "Book a Console Session" → links to `/contact/`

**User action:** Clicks "Contact" in header OR clicks "Book a Console Session"

---

### STEP 2: Contact Page (`/contact/`)
**User sees:**
- Page title: "Contact Neural Command"
- Intro text: "Choose how you want to start the conversation..."
- Two CTA buttons:
  - "Start Conversation" (has `data-contact-trigger`)
  - "Request an Audit" (has `data-contact-trigger`)

**User action:** Clicks either button

---

### STEP 3: Modal Opens (JavaScript Trigger)
**What happens:**
1. JavaScript detects click on `[data-contact-trigger]`
2. `contact-modal-controller.js` runs:
   - Detects page path: `/contact/`
   - Classifies intent: `sales` (from path)
   - Sets context: `General Inquiry`
   - Calculates lead score: Based on path depth, intent, schema types, time on page
   - Extracts schema types from page JSON-LD
   - Updates mailto: link with context

3. Modal appears (overlay + content)

**User sees modal with:**
- Title: "Contact Us"
- Intro: "Choose how you'd like to reach us:"
- Three options:
  - **Email Us** → `hirejoelm@gmail.com`
  - **Call Us** → `+1 844-568-4624 (844-Lovin-AI)`
  - **LinkedIn** → Opens LinkedIn company page

---

### STEP 4A: User Clicks "Email Us"
**What happens:**
1. JavaScript has pre-filled the mailto: link:
   ```
   mailto:hirejoelm@gmail.com?subject=[SALES] Contact Request - General Inquiry (Score: 25)&body=Hello,%0A%0AI'm interested in learning more about your services.%0A%0A---%0AContext: General Inquiry%0AIntent: sales%0ALead Score: 25%0APath Depth: 1%0APage: http://localhost:8000/contact/%0A
   ```

2. User's default email client opens (Mail, Gmail, Outlook, etc.)

3. Email is pre-filled with:
   - **To:** `hirejoelm@gmail.com`
   - **Subject:** `[SALES] Contact Request - General Inquiry (Score: 25)`
   - **Body:**
     ```
     Hello,
     
     I'm interested in learning more about your services.
     
     ---
     Context: General Inquiry
     Intent: sales
     Lead Score: 25
     Path Depth: 1
     Page: http://localhost:8000/contact/
     ```

4. **User types their message and clicks Send**

---

### STEP 4B: User Clicks "Call Us"
**What happens:**
1. Browser/device opens phone dialer
2. Number pre-filled: `+1 844-568-4624`
3. **User taps "Call"**

---

### STEP 4C: User Clicks "LinkedIn"
**What happens:**
1. Opens LinkedIn company page in new tab
2. URL: `https://www.linkedin.com/company/neural-command/`
3. **User can connect/message on LinkedIn**

---

## Context-Aware Behavior

### If User Came From Service Page
**Example:** `/services/chatgpt-seo/new-york-ny/`

**Modal email subject becomes:**
```
[SALES] Contact Request - Service: chatgpt seo (Score: 45)
```

**Email body includes:**
```
Context: Service: chatgpt seo
Intent: sales
Lead Score: 45
Path Depth: 3
Schema Types: Service, Organization, LocalBusiness
Page: http://localhost:8000/services/chatgpt-seo/new-york-ny/
```

### If User Came From Audit/Diagnostic Page
**Example:** `/resources/diagnostic/`

**Modal email subject becomes:**
```
[AUDIT] Contact Request - AI Visibility Diagnostic (Score: 35)
```

**Email body includes:**
```
Context: AI Visibility Diagnostic
Intent: audit
Lead Score: 35
Path Depth: 2
Page: http://localhost:8000/resources/diagnostic/
```

---

## Technical Flow Diagram

```
HOMEPAGE (/)
    │
    ├─→ Header "Contact" link
    │   └─→ /contact/
    │
    └─→ "Book a Console Session" CTA
        └─→ /contact/

CONTACT PAGE (/contact/)
    │
    ├─→ "Start Conversation" button [data-contact-trigger]
    │   └─→ JavaScript: openModal()
    │       └─→ Modal opens
    │
    └─→ "Request an Audit" button [data-contact-trigger]
        └─→ JavaScript: openModal()
            └─→ Modal opens

MODAL (contact-modal.php)
    │
    ├─→ "Email Us" link
    │   └─→ mailto:hirejoelm@gmail.com?subject=...&body=...
    │       └─→ User's email client opens
    │           └─→ User types message → Sends
    │
    ├─→ "Call Us" link
    │   └─→ tel:+18445684624
    │       └─→ Phone dialer opens
    │           └─→ User taps "Call"
    │
    └─→ "LinkedIn" link
        └─→ https://www.linkedin.com/company/neural-command/
            └─→ LinkedIn opens in new tab
                └─→ User can connect/message
```

---

## Files Involved

| File | Purpose |
|------|---------|
| `pages/home.php` | Homepage with Contact CTA |
| `templates/header.php` | Header navigation with Contact link |
| `pages/contact.php` | Contact page with CTA buttons |
| `templates/contact-modal.php` | Modal HTML (Email/Call/LinkedIn options) |
| `assets/js/contact-modal-controller.js` | Modal logic, intent detection, mailto: generation |
| `templates/footer.php` | Includes modal and JS (available site-wide) |

---

## Key Features

✅ **No forms** - Everything goes through mailto: or tel:
✅ **Context-aware** - Email subject/body includes intent, score, page context
✅ **Intent detection** - Automatically detects SALES vs AUDIT
✅ **Lead scoring** - Calculates 0-100 score based on page depth, intent, schema types
✅ **Schema extraction** - Pulls JSON-LD types from page for tagging
✅ **Single contact surface** - Modal is the only action point (no forms anywhere)

---

## Testing the Flow

1. Go to http://localhost:8000/
2. Click "Contact" in header OR "Book a Console Session"
3. You're on `/contact/` page
4. Click "Start Conversation" or "Request an Audit"
5. Modal opens
6. Click "Email Us" → Your email client opens with pre-filled message
7. Click "Call Us" → Phone dialer opens
8. Click "LinkedIn" → LinkedIn opens in new tab

