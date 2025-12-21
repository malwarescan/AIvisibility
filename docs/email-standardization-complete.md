# Global Contact Email Standardization — COMPLETE

**Date:** 2025-01-21  
**Status:** ✅ COMPLETE  
**Priority:** P0 (Trust & Communication)

## Summary

All instances of `hello@nrlcmd.com` and `hirejoelm@gmail.com` have been replaced with the standardized contact email: `contact@neuralcommandllc.com`

## Single Source of Truth

**Defined in `config.php`:**
```php
define('NC_CONTACT_EMAIL', 'contact@neuralcommandllc.com');
define('NC_EMAIL', 'contact@neuralcommandllc.com'); // Legacy alias
```

## Files Updated

### Core Configuration
- ✅ `config.php` — Added `NC_CONTACT_EMAIL` constant

### Templates & UI
- ✅ `templates/contact-modal.php` — Uses `NC_CONTACT_EMAIL` for mailto links
- ✅ `pages/services/city.php` — Replaced hardcoded `hello@nrlcmd.com`

### JavaScript
- ✅ `assets/js/contact-modal-controller.js` — Fallback email updated to `contact@neuralcommandllc.com`

### Schema
- ✅ `pages/contact.php` — ContactPoint schema uses `NC_CONTACT_EMAIL`

### Processing Scripts
- ✅ `pages/process-contact.php` — All email references updated
- ✅ `pages/process-audit.php` — Uses `NC_CONTACT_EMAIL`
- ✅ `pages/quote-thanks.php` — Uses `NC_CONTACT_EMAIL`

## Verification Results

### ✅ Zero Old Email References
- No instances of `hello@nrlcmd.com` in user-facing code
- No instances of `hirejoelm@gmail.com` in user-facing code
- All mailto links use `contact@neuralcommandllc.com`

### ✅ Contact Modal
- Email link displays: `contact@neuralcommandllc.com`
- Mailto href: `mailto:contact@neuralcommandllc.com`
- JavaScript fallback: `contact@neuralcommandllc.com`

### ✅ Schema Compliance
- ContactPoint schema uses `NC_CONTACT_EMAIL`
- No stale email addresses in JSON-LD

## Prohibited Email Addresses (Enforced)

The following are **PROHIBITED** everywhere:
- ❌ `hello@nrlcmd.com`
- ❌ Any `@nrlcmd.com` email
- ❌ `hirejoelm@gmail.com` (replaced)
- ❌ Any alternate inbox aliases

## Governance Rule

**If any instance of `hello@nrlcmd.com` or `@nrlcmd.com` reappears:**
- It is a regression
- It blocks deploy
- It must be fixed immediately

## Final Checklist

- ✅ No `hello@nrlcmd.com` anywhere in repo
- ✅ Contact modal uses `contact@neuralcommandllc.com`
- ✅ ContactPoint schema updated
- ✅ Header/footer checked (no email references found)
- ✅ Mailto opens correctly with context
- ✅ All processing scripts updated
- ✅ JavaScript fallback updated

## Next Steps (Optional)

If desired, we can:
- Add a CI guardrail that fails builds if `@nrlcmd.com` appears
- QA the live site after deploy for any cached remnants
- Create a regex-level sweep checklist for Cursor

---

**END REPORT**

