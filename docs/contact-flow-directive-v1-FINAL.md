# CONTACT GATEWAY + MODAL ACTION SYSTEM
**VERSION: 1.0 — FINAL** | **STATUS: LOCKED** | **SCOPE: /contact + GLOBAL CTAs**
**FORMS: PROHIBITED** | **BOOKING: PROHIBITED** | **CRM INGESTION: PROHIBITED (SITE-SIDE)**

## PRIMARY OBJECTIVE

Create a contact system that:
- Preserves user agency
- Filters low-intent inbound naturally
- Supports high-ticket, expert-led conversations
- Aligns with Google's expectations for a legitimate Contact page
- Avoids automation, friction, and conversion theater

---

## CANONICAL FLOW (LOCKED)

```
Homepage / Any Entry
    ↓
/contact/   (gateway, orientation only)
    ↓
CTA click (data-contact-trigger)
    ↓
Contact Modal (single action surface)
    ↓
Email / Call / LinkedIn (human-initiated)
```

---

## /CONTACT PAGE — ROLE & CONTENT

### ROLE:
- Gateway page
- Orientation layer
- NOT a sales page
- NOT a form page
- NOT a booking page

### The /contact page MUST:
- ✅ Be crawlable
- ✅ Contain explanatory copy
- ✅ Contain exactly TWO CTAs
- ✅ Trigger the modal, not actions directly

---

## /CONTACT — REQUIRED COPY (EXACT, APPROVED)

### H1:
**Contact Neural Command**

### Intro copy (MANDATORY, verbatim or near-verbatim):

> We work with teams and founders who need clarity around AI visibility, search performance, and strategic execution.
> 
> If you're exploring fit, validating an approach, or deciding next steps, choose how you'd like to start the conversation below.

---

### Section: What this conversation is / is not

**This is a good fit if you are:**
- Evaluating AI search visibility, SEO, or AI-driven discovery
- Comparing approaches or vendors
- Looking for a second opinion on strategy or direction
- Responsible for decisions or implementation

**This may not be a fit if you are:**
- Looking for free tactical advice
- Requesting speculative estimates without context
- Not yet in a position to act or decide

---

### Section: What happens next

When you reach out, your message goes directly to us.

We'll respond by email or phone with next steps, or ask for clarification if needed. There's no automated follow-up and no obligation.

---

## /CONTACT — CTAs (LOCKED)

**Exactly TWO buttons, no more, no less:**
- Start Conversation
- Request an Audit

**Both MUST:**
- ✅ Include `data-contact-trigger`
- ✅ Open the contact modal
- ✅ Perform no other action

**PROHIBITED:**
- ❌ No mailto
- ❌ No tel
- ❌ No links
- ❌ No forms

---

## SALES vs AUDIT FRAMING (LOGIC, NOT UI)

**The /contact page itself remains neutral.**

**Intent is inferred by:**
- Referring page path
- Page depth
- Content classification

**Rules:**
- Homepage, services, contact → SALES intent
- Diagnostics, resources, audits → AUDIT intent

**The user is NEVER asked to choose intent explicitly.**
**The system adapts silently.**

---

## CONTACT MODAL — ROLE

**The modal is the ONLY contact action surface.**

**It MUST present exactly THREE options:**
1. **Email Us** (mailto, pre-filled)
2. **Call Us** (tel)
3. **LinkedIn** (company page, new tab)

**PROHIBITED:**
- ❌ No inputs
- ❌ No submissions
- ❌ No automation

---

## EMAIL OPTION — REQUIRED STRUCTURE

### Email address:
- ✅ Defined server-side (PHP/config)
- ✅ Never hardcoded in JS

### Subject format (LOCKED):
```
[SALES|AUDIT] Contact Request - {Context} (Score: XX)
```

### Email body MUST include:
- ✅ Context
- ✅ Intent
- ✅ Lead score
- ✅ Path depth
- ✅ Schema types (if present)
- ✅ Page URL
- ✅ Referrer

**This context is informational, not transactional.**

---

## SCHEMA — LIGHT, SUPPORTIVE, NON-DILUTING

**The /contact page MAY include ONLY the following schema:**
- ✅ Organization
- ✅ ContactPoint

**STRICT RULES:**
- ❌ No Service schema
- ❌ No Product schema
- ❌ No FAQ schema
- ❌ No Offer schema
- ❌ No Review schema

**Schema exists to:**
- Legitimize the page
- Support crawl understanding
- NOT to generate rich results

---

## GLOBAL CTA RULES

### Header / Footer:
- ✅ Contact → `/contact/`

### Homepage primary CTA:
- ✅ MAY open modal directly via `data-contact-trigger`
- ✅ Label examples:
  - Book a Consultation
  - Start a Conversation

**This creates:**
- Fast lane for high-intent users
- Gateway for cautious users
- One unified action surface

---

## PROHIBITED ELEMENTS (HARD FAIL)

**The following invalidate compliance immediately:**

- ❌ Forms anywhere in contact flow
- ❌ Calendars or booking widgets
- ❌ Auto-opening modals
- ❌ Direct mailto in navigation
- ❌ Multiple contact systems
- ❌ Silent CRM ingestion
- ❌ Forced follow-up automation

---

## POSITIONING PRINCIPLE (LOCKED)

**This site does not "capture leads."**
**It initiates conversations.**

**Conversion is defined as:**
A human choosing to write, call, or connect.

---

## QUALITY & GOVERNANCE

- ✅ This directive is the source of truth
- ✅ Any change must maintain full compliance
- ✅ If intent clarity is reduced, the change is rejected
- ✅ If automation is introduced, the change is rejected

---

## FINAL STATEMENT

**`/contact` explains the conversation.**
**The modal is the action.**
**Email, phone, and LinkedIn are the only exits.**

---

## IMPLEMENTATION STATUS

| Component | Status | File |
|-----------|--------|------|
| /contact page copy | ✅ Implemented | `pages/contact.php` |
| CTAs (exactly two) | ✅ Implemented | `pages/contact.php` |
| Modal (three options) | ✅ Implemented | `templates/contact-modal.php` |
| Intent detection | ✅ Implemented | `assets/js/contact-modal-controller.js` |
| Email context | ✅ Implemented | `assets/js/contact-modal-controller.js` |
| No forms | ✅ Compliant | Verified |
| No booking widgets | ✅ Compliant | Verified |
| No direct mailto in nav | ✅ Compliant | Verified |

**STATUS: FULLY COMPLIANT**

---

## END META DIRECTIVE

