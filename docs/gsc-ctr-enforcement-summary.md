# GSC CTR + Intent Realignment Kernel - Implementation Summary

## ✅ What's Been Implemented

### 1. Core Enforcement Library
**File:** `lib/page_role_enforcement.php`

- Page role classification (CONVERSION, AUTHORITY, HYBRID)
- Snippet generation templates for each role
- Validation logic for titles and descriptions
- Audit function to check alignment

### 2. Helper Functions
**File:** `lib/snippet_helper.php`

- `nc_snippet_conversion()` - Generate conversion page snippets
- `nc_snippet_authority()` - Generate authority page snippets  
- `nc_snippet_hybrid()` - Generate hybrid page snippets
- `nc_set_snippet()` - Generic snippet setter

### 3. Audit Tool
**File:** `tools/audit-page-snippets.php`

- Scans all page files recursively
- Validates snippets against role requirements
- Reports issues and warnings
- Provides alignment percentage

### 4. Documentation
- `docs/gsc-ctr-intent-enforcement.md` - Full directive and rules
- `docs/implementation-example.md` - Usage examples

---

## 🎯 Next Steps

### Immediate Actions

1. **Run Full Audit**
   ```bash
   php tools/audit-page-snippets.php > audit-report.txt
   ```

2. **Prioritize High-Impression, Low-CTR Pages**
   - Export from GSC: Queries with impressions > 100, CTR < 2%
   - Match queries to pages
   - Fix snippets using enforcement helpers

3. **Migrate Service Pages First**
   - Start with `/services/*/city.php` pages (highest volume)
   - Use `nc_snippet_conversion()` helper
   - Test in browser

4. **Fix Authority Pages**
   - Remove service language from `/insights/*`, `/case-studies/*`
   - Use `nc_snippet_authority()` helper
   - Ensure descriptions signal learning, not buying

### Weekly Process

1. **Monday:** Pull GSC data (queries with impressions > clicks)
2. **Tuesday:** Identify intent mismatches
3. **Wednesday:** Fix snippets using enforcement helpers
4. **Thursday:** Deploy and verify
5. **Friday:** Observe CTR delta

---

## 📋 Hard Rules (Enforced)

✅ **NO page attempts all three roles**
✅ **NO abstract language in conversion titles** (framework, methodology, etc.)
✅ **NO service language in authority descriptions**
✅ **NO forms anywhere** (contact modal only - already implemented)
✅ **NO direct mailto in navigation** (all go to `/contact/` - already implemented)
✅ **Schema MUST match page role** (no Product/Service on authority pages)

---

## 🔍 Quality Control

### Fail Condition Detection
If a page:
- Ranks top 10
- Has impressions > 100
- Has CTR < 2%

**Action:** Immediately audit and fix using enforcement system.

### Validation Checklist
- [ ] Title length: 50-60 chars (mobile-optimized)
- [ ] Description length: 120-160 chars
- [ ] Title matches role requirements
- [ ] Description matches role requirements
- [ ] No abstract language in conversion titles
- [ ] No service language in authority descriptions
- [ ] Schema matches page role

---

## 📊 Success Metrics

Track in GSC:
- **CTR improvement** per page (week-over-week)
- **Impression growth** (indicates Google testing more)
- **Click growth** (indicates users choosing us)
- **Ranking stability** (pages that rank but get clicks stay ranked)

---

## 🚨 Common Mistakes to Avoid

1. **Don't fix both role AND snippet blindly** - Fix one based on data
2. **Don't add more schema when rich results disappear** - Fix intent alignment first
3. **Don't chase queries** - Fix pages to match intent
4. **Don't use abstract language** - Use concrete outcomes
5. **Don't mix roles** - One page = one role

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `lib/page_role_enforcement.php` | Core enforcement logic |
| `lib/snippet_helper.php` | Helper functions for pages |
| `tools/audit-page-snippets.php` | Audit tool |
| `docs/gsc-ctr-intent-enforcement.md` | Full directive |
| `docs/implementation-example.md` | Usage examples |

---

## 💡 Key Principle

**We do not optimize for rankings. We optimize for selection.**

Google rewards pages users choose. The enforcement system exists to make that choice obvious.

