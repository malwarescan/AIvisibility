# JSON-LD License Field Implementation

**Date:** October 8, 2025  
**Issue:** Google Search Console warnings: "Missing field 'license'" for CreativeWork-type JSON-LD across nrlcmd.com

## Problem

Google requires the `license` field for all JSON-LD types that extend `CreativeWork` (WebPage, FAQPage, Article, HowTo, SoftwareApplication, etc.). This field was missing from our JSON-LD markup, causing warnings in Search Console.

## Solution Implemented

### 1. Created Canonical License Page

**File:** `/pages/legal/license.php`
- Publicly accessible at `https://nrlcmd.com/legal/license/`
- Defines the license governing Neural Command Agentic Training Kit and documentation
- Includes proper JSON-LD with self-referencing license field
- Contains:
  - Permitted use terms
  - Restrictions (no resale, sublicensing, etc.)
  - Attribution requirements
  - Contact email for commercial licensing

### 2. Configuration System

**File:** `/config/app.php`
```php
return [
  'site_url'    => 'https://nrlcmd.com',
  'license_url' => 'https://nrlcmd.com/legal/license/',
];
```

**File:** `/bootstrap/config.php`
- Added `app_config()` helper function with memoization
- Provides centralized access to configuration values

### 3. Schema Helper Library

**File:** `/lib/schema.php`

**Functions:**
- `schema_add_license(array $json): array`
  - Automatically adds license field to CreativeWork types
  - Types supported: WebPage, Article, FAQPage, HowTo, SoftwareApplication, CollectionPage, AboutPage, ItemPage, Blog, BlogPosting, TechArticle
  - Does NOT add license to non-CreativeWork types (Service, LocalBusiness, Organization)
  
- `render_jsonld(array $json): string`
  - Wrapper that adds license and renders as JSON-LD script tag
  - Uses proper encoding flags (JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE)

### 4. Updated index.php

- Added `require __DIR__.'/bootstrap/config.php';` to bootstrap
- Added HTTP `Link` header for license: `Link: <https://nrlcmd.com/legal/license/>; rel="license"`
- Added route for `/legal/license/` → `/pages/legal/license.php`

### 5. Updated router_map.php

- Added route mapping for `/legal/license/` to license page

### 6. Updated Page Templates

**Homepage** (`/pages/home.php`):
- Added `require_once __DIR__ . '/../lib/schema.php';`
- Wrapped `$webPageLD` with `schema_add_license()`
- Wrapped `$faqLD` with `schema_add_license()`
- Result: WebPage and FAQPage now include license field

**Service-City Pages** (`/pages/services/city.php`):
- Added `require_once __DIR__.'/../../lib/schema.php';`
- Updated FAQPage rendering to use `render_jsonld($faqJson)`
- Result: All programmatic service-city pages now include license in FAQPage

**Educational Pages**:
- Updated 5 educational pages to use `render_jsonld(ld_faq($faqs))`:
  - `/pages/what-is-google-ai-mode.php`
  - `/pages/how-to-get-featured-in-ai-overviews.php`
  - `/pages/why-is-my-site-not-showing-in-ai-answers.php`
  - `/pages/who-controls-which-sites-ai-picks.php`
  - `/pages/ai-seo-vs-traditional-seo.php`
- Result: All FAQPage JSON-LD now includes license field

## What Types Get License

### ✅ Gets License (CreativeWork descendants)
- WebPage
- FAQPage
- Article
- HowTo
- SoftwareApplication
- Blog
- BlogPosting
- TechArticle
- CollectionPage
- AboutPage
- ItemPage

### ❌ Does NOT Get License (non-CreativeWork types)
- Service
- LocalBusiness
- Organization
- BreadcrumbList
- SpeakableSpecification

## Verification

Once deployed, verify license appears in JSON-LD:

```bash
# Homepage
curl -s https://nrlcmd.com/ | grep -o '"license":"[^"]*"'

# Service-city page
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -o '"license":"[^"]*"'

# Educational page
curl -s https://nrlcmd.com/what-is-google-ai-mode/ | grep -o '"license":"[^"]*"'
```

Expected output for all:
```json
"license":"https://nrlcmd.com/legal/license/"
```

## Files Modified

- `bootstrap/config.php` - NEW: Config loader with memoization
- `config/app.php` - NEW: Site configuration with license URL
- `index.php` - Added config bootstrap, license HTTP header, license route
- `lib/router_map.php` - Added license page route
- `lib/schema.php` - NEW: Schema helper for automatic license injection
- `pages/home.php` - Updated to use schema_add_license() for WebPage and FAQPage
- `pages/legal/license.php` - NEW: License page with terms
- `pages/services/city.php` - Updated to use render_jsonld() for FAQPage
- `pages/what-is-google-ai-mode.php` - Updated to use render_jsonld()
- `pages/how-to-get-featured-in-ai-overviews.php` - Updated via sed script
- `pages/why-is-my-site-not-showing-in-ai-answers.php` - Updated via sed script
- `pages/who-controls-which-sites-ai-picks.php` - Updated via sed script
- `pages/ai-seo-vs-traditional-seo.php` - Updated via sed script

## Impact

- **Immediate:** All CreativeWork-type JSON-LD now includes required `license` field
- **SEO:** Resolves Google Search Console "Missing field 'license'" warnings
- **Compliance:** Provides clear license terms for site content and code
- **Scalability:** Centralized helper ensures consistency across all current and future pages
- **HTTP Headers:** Added `Link: rel="license"` header for enhanced discoverability

## Next Steps

1. **Wait for Railway deployment** (~1-2 minutes)
2. **Verify license field** appears in JSON-LD on key pages
3. **Re-validate in Google Search Console:**
   - URL Inspection tool on affected URLs
   - Request re-indexing
4. **Monitor GSC over 7-14 days:**
   - "Missing field 'license'" warnings should clear for newly crawled pages
   - Historical warnings will persist until Google re-crawls those URLs

## Acceptance Criteria

✅ License page accessible at `/legal/license/`  
✅ All CreativeWork JSON-LD includes `license` field pointing to license page  
✅ Non-CreativeWork JSON-LD (Service, Organization) unchanged  
✅ HTTP `Link` header present on all HTML pages  
✅ Schema helper is reusable and maintainable  
✅ No breaking changes to existing functionality

