# CONTACT FLOW DIRECTIVE — FINAL LOCKED VERSION
**VERSION: FINAL** | **STATUS: LOCKED** | **SCOPE: SITE-WIDE** | **FORMS: PROHIBITED**

## PRIMARY OBJECTIVE

Provide a frictionless, high-intent contact pathway that:
- Preserves user context
- Self-qualifies inbound leads
- Avoids CRM pollution
- Maintains trust for high-ticket services
- Keeps all contact actions human-initiated

---

## CANONICAL USER FLOW (NON-NEGOTIABLE)

### STEP 1 — ENTRY POINTS

**Allowed entry points:**
- Homepage (`/`)
- Header navigation
- Homepage CTAs

**ALL contact entry points MUST route to:**
→ `/contact/`

**PROHIBITED:**
- ❌ Direct mailto links in navigation
- ❌ Direct modal opens from header
- ❌ Direct tel: links in navigation

**Current Implementation:**
- ✅ Header "Contact" link → `/contact/`
- ✅ Homepage "Book a Console Session" → `/contact/`
- ✅ No mailto/tel in header or homepage

---

### STEP 2 — CONTACT PAGE (`/contact/`)

**ROLE:** GATEWAY PAGE (NOT A FORM PAGE)

**The `/contact/` page MUST:**
- ✅ Be crawlable
- ✅ Contain ZERO forms
- ✅ Contain ONLY CTAs

**Required elements:**
- ✅ Page title: "Contact Neural Command"
- ✅ Short explanatory copy
- ✅ Exactly two CTA buttons:
  - "Start Conversation"
  - "Request an Audit"

**Both CTAs MUST include:**
- ✅ `data-contact-trigger` attribute

**PROHIBITED:**
- ❌ Submission logic
- ❌ Mailto links
- ❌ Tel links
- ❌ Embedded widgets
- ❌ Forms of any kind

**Current Implementation:**
- ✅ File: `pages/contact.php`
- ✅ Two buttons with `data-contact-trigger`
- ✅ No forms, no mailto, no tel
- ✅ Crawlable page

---

### STEP 3 — MODAL TRIGGER LOGIC

**Clicking any element with `[data-contact-trigger]`:**
- ✅ Prevents default action
- ✅ Opens the contact modal
- ✅ Runs the contact intelligence controller

**The controller MUST:**
- ✅ Detect current page path
- ✅ Classify intent:
  - SALES for services, contact, homepage
  - AUDIT for diagnostics, resources, audits
- ✅ Set human-readable context
- ✅ Calculate lead score (0–100) using:
  - Path depth
  - Intent bias
  - Schema types
  - Time on page (optional)
- ✅ Extract JSON-LD schema types from the page
- ✅ Populate contact actions with context

**PROHIBITED:**
- ❌ Server calls
- ❌ Background POSTs
- ❌ Silent data collection

**Current Implementation:**
- ✅ File: `assets/js/contact-modal-controller.js`
- ✅ Intent detection: SALES/AUDIT
- ✅ Lead scoring: 0-100
- ✅ Schema extraction from JSON-LD
- ✅ Context-aware mailto: generation
- ✅ No server calls, no POSTs

---

### STEP 4 — MODAL CONTENT (ONLY CONTACT OPTIONS)

**The modal is the ONLY contact action surface.**

**The modal MUST contain exactly three options:**

#### 1) EMAIL US (PRIMARY)
- ✅ mailto: link
- ✅ Email address defined server-side (PHP/config): `hirejoelm@gmail.com`
- ✅ Subject format: `[SALES|AUDIT] Contact Request - {Context} (Score: XX)`
- ✅ Body MUST include:
  - Context
  - Intent
  - Lead Score
  - Path Depth
  - Schema Types (if present)
  - Page URL
  - Referrer

#### 2) CALL US
- ✅ tel: link
- ✅ Human-readable phone number: `+1 844-568-4624 (844-Lovin-AI)`
- ✅ No JavaScript interception

#### 3) LINKEDIN
- ✅ Opens official company page
- ✅ New tab (`target="_blank"`)
- ✅ Optional but allowed

**Current Implementation:**
- ✅ File: `templates/contact-modal.php`
- ✅ Three options: Email, Call, LinkedIn
- ✅ Email pre-filled with context
- ✅ Call uses native tel: link
- ✅ LinkedIn opens in new tab

---

## PROHIBITED ELEMENTS (HARD FAIL CONDITIONS)

**The following are NOT allowed anywhere:**

- ❌ Contact forms
- ❌ Hidden form submissions
- ❌ Silent CRM ingestion
- ❌ Auto-booking links
- ❌ Calendly / booking embeds
- ❌ Forced modal opens on page load
- ❌ Direct mailto links in navigation
- ❌ Multiple contact systems

**If any of these appear, the directive is violated.**

**Compliance Check:**
- ✅ No forms found in contact page
- ✅ No booking widgets found
- ✅ No forced modal opens
- ✅ No direct mailto in navigation
- ✅ Single contact system (modal only)

---

## INTENT & CONTEXT RULES

- ✅ Context is derived from the page the user was on
- ✅ Intent is inferred automatically
- ✅ Users are NOT asked to choose intent explicitly
- ✅ The system adapts, the user does not

**Examples:**
- Service page → SALES
- Diagnostic page → AUDIT
- Contact page → SALES (default)

**Current Implementation:**
- ✅ `inferIntentFromPath()` function
- ✅ `inferContextLabel()` function
- ✅ Automatic classification
- ✅ No user selection required

---

## POSITIONING PRINCIPLE (LOCKED)

**This site does NOT capture leads.**
**This site initiates conversations.**

**The contact system exists to:**
- Filter unserious inbound
- Preserve context for humans
- Signal confidence and authority

**Conversion is defined as:**
A human choosing to write, call, or connect.

---

## QUALITY CONTROL

**Any future change MUST satisfy all of the following:**
- ✅ Does not introduce a form
- ✅ Does not remove context from email
- ✅ Does not automate the user
- ✅ Does not fragment contact paths
- ✅ Does not reduce user agency

**If not, it is rejected.**

---

## FINAL STATEMENT

**`/contact` is the gateway.**
**The modal is the action.**
**Email, phone, and LinkedIn are the only exits.**

---

## IMPLEMENTATION FILES

| File | Purpose | Status |
|------|---------|--------|
| `pages/contact.php` | Gateway page (CTAs only) | ✅ Compliant |
| `templates/contact-modal.php` | Modal (Email/Call/LinkedIn) | ✅ Compliant |
| `assets/js/contact-modal-controller.js` | Intent detection, scoring, mailto: generation | ✅ Compliant |
| `templates/header.php` | Navigation (routes to /contact/) | ✅ Compliant |
| `pages/home.php` | Homepage (routes to /contact/) | ✅ Compliant |
| `templates/footer.php` | Includes modal globally | ✅ Compliant |

---

## VERIFICATION CHECKLIST

- [x] All entry points route to `/contact/`
- [x] Contact page has zero forms
- [x] Contact page has exactly two CTAs with `data-contact-trigger`
- [x] Modal contains only Email, Call, LinkedIn
- [x] Email includes full context (intent, score, schema, page URL)
- [x] No mailto/tel links in navigation
- [x] No booking widgets
- [x] No forced modal opens
- [x] Intent is auto-detected (no user selection)
- [x] Lead scoring is automatic
- [x] Schema extraction is automatic

**STATUS: FULLY COMPLIANT**

---

## END DIRECTIVE

**This directive is LOCKED. Any changes must maintain compliance with all rules above.**

