# Master Schema Matrix (Authoritative)

This document defines the complete, applicable schema system for the site, organized by page role and intent, with strict rules to prevent signal dilution.

## Global Baseline (ALL Indexable Pages)

These apply site-wide, no exceptions.

### 1. Organization (REQUIRED)

**Where:** Every page  
**Why:** Establishes entity trust and consistency

Use once per page.

**Key fields:**
- `@type`: Organization
- `name`
- `url`
- `logo`
- `sameAs` (LinkedIn, etc.)
- `contactPoint` (light, non-salesy)

**Do NOT:**
- Stuff services here
- Add offers
- Add reviews globally

### 2. WebSite (HOME ONLY)

**Where:** Homepage only  
**Why:** Defines brand + internal search semantics

**Key fields:**
- `@type`: WebSite
- `name`
- `url`
- `potentialAction` → SearchAction (optional)

**Do NOT:**
- Add SearchAction if you don't have real site search

### 3. WebPage (ALL PAGES)

**Where:** Every page  
**Why:** Page-level disambiguation for Google and agents

**Key fields:**
- `@type`: WebPage
- `name`
- `url`
- `isPartOf` → WebSite
- `about` → Organization

This is lightweight but important.

## Homepage (/)

### 4. Organization (expanded)

Same as baseline, but homepage may include:
- `founder`
- `knowsAbout` (LLM visibility, AI search, SEO systems)

Keep `knowsAbout` concise. No buzzword lists.

### 5. BreadcrumbList (OPTIONAL)

Only if breadcrumbs are visible in UI.

**STRICT RULE:** Homepage must NOT contain:
- ❌ Service schema
- ❌ FAQPage schema
- ❌ Offer schema
- ❌ Product schema

## Contact Page (/contact)

### 6. ContactPoint (REQUIRED)

**Where:** Contact page only  
**Why:** Legitimate contact surface without forms

**Key fields:**
- `@type`: ContactPoint
- `contactType`: "Sales" or "General"
- `email`
- `telephone`
- `availableLanguage`

**STRICT RULES:**
- ❌ No Service schema here
- ❌ No FAQ
- ❌ No Offer
- ❌ No Product

This page is a gateway, not a conversion surface.

## Service Pages (/services/...)

These are your money pages. Schema discipline matters most here.

### 7. Service (PRIMARY)

**Where:** Each individual service page  
**Why:** Clear commercial intent and eligibility

**Key fields:**
- `@type`: Service
- `name`
- `description`
- `provider` → Organization
- `areaServed` (if geographic)
- `serviceType`

**RULES:**
- ONE Service per page
- Service must match page title and H1
- Do NOT reuse the same Service name across multiple pages
- ❌ NO `hasOfferCatalog`
- ❌ NO `offers`
- ❌ NO `review`
- ❌ NO `aggregateRating`

### 8. BreadcrumbList (RECOMMENDED)

Improves CTR and hierarchy clarity.

### 9. FAQPage (CONDITIONAL)

Use ONLY if:
- Questions are genuinely decision-blocking
- FAQs are visible on page
- They reinforce the Service

**Good FAQ examples:**
- Who this service is for
- How it differs from alternatives
- What happens next

**Bad FAQ examples:**
- Definitions
- Blog-style education
- Generic SEO questions

## Authority / Insight Pages (/insights, /resources, blogs)

These pages must not compete with services.

### 10. Article (PRIMARY)

**Where:** Blog posts, insights, long-form analysis

**Key fields:**
- `@type`: Article or BlogPosting
- `headline`
- `author`
- `datePublished`
- `about` (LLM visibility, AI search, etc.)

**Do NOT:**
- Add Service schema
- Add Offer
- Add Product

### 11. FAQPage (RARE)

Only if the article is literally structured as Q&A.

## Case Studies (IF / WHEN USED)

### 12. CaseStudy (OPTIONAL)

Google doesn't officially document this heavily, but it works as a subtype of CreativeWork.

**Key fields:**
- `@type`: CreativeWork
- `name`
- `about`
- `provider` → Organization

**Do NOT:**
- Attach Offers
- Attach pricing

## Location Pages (IF USED)

### 13. LocalBusiness (ONLY IF TRUE)

Use ONLY if:
- You genuinely serve or operate in that area
- You have substantiation

Otherwise, stick with:
- Service + areaServed

False LocalBusiness schema will hurt you.

## What You Should NOT Use (VERY IMPORTANT)

**Do NOT use these anywhere unless reality changes:**
- ❌ Product
- ❌ Offer
- ❌ Review / AggregateRating (unless verifiable and visible)
- ❌ Event
- ❌ SoftwareApplication
- ❌ HowTo
- ❌ Course

These will:
- Confuse Google
- Trigger enhancement volatility
- Undermine trust

## Schema Stacking Rule (CRITICAL)

Each page should answer ONE question:

**"What kind of page is this?"**

**Correct examples:**
- Service + FAQPage
- Article + Organization
- ContactPoint + Organization

**Incorrect examples:**
- Service + Article + Product
- FAQPage everywhere
- Organization + everything

## Agentic / AI Overview Compatibility

Your current and future schema strategy should prioritize:
- Clear entity relationships
- Minimal schema types
- High signal-to-noise
- Role clarity

LLMs prefer:
- Fewer, stronger schema signals
- Consistent entity usage
- No contradictory types

## Final Rule to Lock In

**Schema does not create trust. It amplifies clarity that already exists.**

If a page's intent is unclear, schema will not save it.

## Implementation

The schema enforcement system is implemented in:
- `lib/schema_enforcement.php` - Validation and cleaning functions
- `templates/head.php` - Automatic enforcement on all pages
- `tools/audit-schema-compliance.php` - Compliance auditing tool

All pages are automatically cleaned of prohibited schema types at render time.

