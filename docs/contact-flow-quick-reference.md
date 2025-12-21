# Contact Flow — Quick Reference Card

## 🚫 PROHIBITED (Hard Rules)

- ❌ Forms anywhere
- ❌ Direct mailto in navigation
- ❌ Direct tel: in navigation
- ❌ Booking widgets (Calendly, etc.)
- ❌ Forced modal opens
- ❌ Multiple contact systems

## ✅ REQUIRED (Locked)

### Entry Points
- All contact links → `/contact/`

### Contact Page (`/contact/`)
- Title: "Contact Neural Command"
- Two CTAs: "Start Conversation" + "Request an Audit"
- Both have `data-contact-trigger`
- Zero forms

### Modal
- Three options: Email, Call, LinkedIn
- Email: Pre-filled with context
- Call: Native tel: link
- LinkedIn: Opens in new tab

### Intent Detection
- Auto-detected (no user selection)
- SALES: services, contact, homepage
- AUDIT: diagnostics, resources, audits

## 📋 Flow Diagram

```
Homepage/Header
    ↓
/contact/ (gateway)
    ↓
CTA click [data-contact-trigger]
    ↓
Modal opens
    ↓
User chooses:
  • Email → mailto: with context
  • Call → tel: link
  • LinkedIn → new tab
```

## 🔍 Compliance Check

Before any change, verify:
1. No forms introduced?
2. Context preserved in email?
3. User agency maintained?
4. Single contact path?
5. No automation of user?

**If any answer is NO, reject the change.**

---

**Status: LOCKED** | **Version: FINAL**

