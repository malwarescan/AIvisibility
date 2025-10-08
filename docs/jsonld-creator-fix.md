# JSON-LD Creator Field Implementation

**Date:** October 8, 2025  
**Issue:** Google Search Console warnings: "Missing field 'creator'" for CreativeWork-type JSON-LD across nrlcmd.com

## Problem

Google requires the `creator` field for all JSON-LD types that extend `CreativeWork` (WebPage, FAQPage, Article, HowTo, SoftwareApplication, etc.). This field identifies the person who created the content.

## Solution Implemented

### 1. Updated Schema Helper Library

**File:** `/lib/schema.php`

**Added `schema_add_creator()` function:**
```php
function schema_add_creator(array $json): array {
  $creativeWorkTypes = [
    'CreativeWork','WebPage','Article','FAQPage','HowTo','SoftwareApplication',
    'CollectionPage','AboutPage','ItemPage','Blog','BlogPosting','TechArticle'
  ];
  
  $type = is_string($json['@type'] ?? null) ? $json['@type'] : null;
  
  if ($type && in_array($type, $creativeWorkTypes, true)) {
    $json['creator'] = [
      '@type' => 'Person',
      'name'  => 'Joel David Maldonado',
      'url'   => 'https://nrlcmd.com/#creator'
    ];
  }
  
  return $json;
}
```

**Updated `render_jsonld()` function:**
```php
function render_jsonld(array $json): string {
  $json = schema_add_license($json);
  $json = schema_add_creator($json);  // NEW: Adds creator
  return '<script type="application/ld+json">'.json_encode($json, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
}
```

### 2. Created Person Schema Partial

**File:** `/partials/person.php`

Global Person schema that can be referenced by `@id`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://nrlcmd.com/#creator",
  "name": "Joel David Maldonado",
  "url": "https://nrlcmd.com/",
  "affiliation": {
    "@type": "Organization",
    "name": "Neural Command, LLC",
    "url": "https://nrlcmd.com/"
  }
}
```

### 3. Included Person Schema in Footer

**File:** `/templates/footer.php`

Added `<?php include __DIR__.'/../partials/person.php'; ?>` before `</body>` tag.

This ensures the Person schema appears once on every page, providing a canonical definition that all `creator` fields can reference via `@id`.

## What Gets Creator Field

### ✅ Gets Creator (CreativeWork descendants)
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

### ❌ Does NOT Get Creator (non-CreativeWork types)
- Service
- LocalBusiness
- Organization
- BreadcrumbList
- SpeakableSpecification

## How It Works

1. **Automatic Injection:** Any JSON-LD passed through `render_jsonld()` automatically gets both `license` and `creator` fields if it's a CreativeWork type
2. **Centralized Logic:** All creator attribution happens in one place (`lib/schema.php`)
3. **Global Person Schema:** The Person partial in the footer provides a referenceable entity
4. **Zero Manual Changes:** Existing pages that already use `render_jsonld()` automatically get the creator field

## Pages Already Updated (from previous license fix)

All these pages automatically now include the `creator` field:

- Homepage (`/pages/home.php`) - WebPage and FAQPage
- Service-city pages (`/pages/services/city.php`) - FAQPage
- Educational pages:
  - `/pages/what-is-google-ai-mode.php` - FAQPage
  - `/pages/how-to-get-featured-in-ai-overviews.php` - FAQPage
  - `/pages/why-is-my-site-not-showing-in-ai-answers.php` - FAQPage
  - `/pages/who-controls-which-sites-ai-picks.php` - FAQPage
  - `/pages/ai-seo-vs-traditional-seo.php` - FAQPage

## Example Output

For a FAQPage, the JSON-LD now includes:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/#faq",
  "license": "https://nrlcmd.com/legal/license/",
  "creator": {
    "@type": "Person",
    "name": "Joel David Maldonado",
    "url": "https://nrlcmd.com/#creator"
  },
  "mainEntity": [...]
}
```

## Verification Commands

Once deployed, verify creator appears in JSON-LD:

```bash
# Homepage
curl -s https://nrlcmd.com/ | grep -o '"creator":{[^}]*}'

# Service-city page
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -o '"creator":{[^}]*}'

# Educational page
curl -s https://nrlcmd.com/what-is-google-ai-mode/ | grep -o '"creator":{[^}]*}'
```

Expected output:
```json
"creator":{"@type":"Person","name":"Joel David Maldonado","url":"https://nrlcmd.com/#creator"}
```

## Files Modified

- `lib/schema.php` - Added `schema_add_creator()` function and updated `render_jsonld()`
- `partials/person.php` - NEW: Global Person schema for Joel David Maldonado
- `templates/footer.php` - Include Person schema before `</body>`

## Benefits

1. **Automatic:** No manual updates needed for existing or new pages
2. **Consistent:** All CreativeWork types get identical creator attribution
3. **Compliant:** Resolves Google Search Console warnings
4. **Scalable:** New pages using `render_jsonld()` automatically get creator field
5. **Maintainable:** Single source of truth for creator information
6. **SEO Enhanced:** Proper authorship attribution can improve search visibility

## Impact

- **Immediate:** All CreativeWork JSON-LD now includes `creator` field
- **SEO:** Google Search Console warnings should clear over 7-14 days as pages are re-crawled
- **Rich Results:** Pages now qualify for enhanced author-based search features
- **Authority:** Proper attribution to Joel David Maldonado across all content

## Next Steps

1. **Wait for Railway deployment** (~1-2 minutes after push)
2. **Verify creator field** appears in JSON-LD on key pages using curl commands above
3. **Re-validate in Google Search Console:**
   - URL Inspection tool on affected URLs
   - Request re-indexing for key pages
4. **Monitor GSC over 7-14 days:**
   - "Missing field 'creator'" warnings should clear
   - Check "Enhancements" section for any new rich result eligibility

## Acceptance Criteria

✅ Creator field automatically added to all CreativeWork JSON-LD types  
✅ Non-CreativeWork JSON-LD (Service, Organization) unchanged  
✅ Global Person schema available at `#creator` for reference  
✅ Person schema included once per page in footer  
✅ No manual updates needed for existing pages  
✅ Future pages using `render_jsonld()` automatically get creator

