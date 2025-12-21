# Sitemap XML Error Fix

**Date:** October 8, 2025  
**Issue:** Google Search Console reported XML errors in sitemap - "Invalid XML tag" with 5,355 instances of `<br>` and `<b>` tags appearing in sitemap XML.

## Root Cause

The old `/sitemap.xml.php` file was:
1. Loading `config.php` which contains large arrays with HTML-like content in service descriptions
2. Using helper functions that might have been outputting content
3. Not properly isolated from the HTML rendering pipeline

## Solution Implemented

### 1. Deleted Problematic Files
- Removed `/sitemap.xml.php` (old root sitemap with HTML contamination)
- Removed `/public/sitemap.xml.php` (duplicate/conflicting file)

### 2. Created Clean Sitemap Architecture

#### `/public/sitemap.index.php`
- Generates sitemap index pointing to sharded sitemap pages
- Calculates number of pages needed based on 45,000 URLs per shard
- Outputs pure XML with no HTML contamination
- Fixed CSV reading deprecation warnings by adding escape parameter

#### `/public/sitemap.page.php`
- Generates individual sitemap shards
- Each shard contains up to 45,000 URLs
- Builds canonical URLs using `Canonical::absolute()` for all pages:
  - Core pages (home, about, services, contact, etc.)
  - Service pages
  - State pages
  - Service × city combinations
  - Priority city pages
- Validates each URL before inclusion:
  - Must start with `https://`
  - Must be lowercase
  - Must end with `/` (or be file-like)
  - Must have no query parameters
- Uses `ENT_XML1` flag for proper XML escaping

### 3. Fixed Canonical Class

#### `/bootstrap/canonical.php`
- Fixed "Undefined array key 0" errors in `normalizePath()`
- Added `array_values()` to re-index array after filtering
- Added `isset()` checks before accessing array indices
- Properly handles edge cases for paths with fewer than 3 segments

### 4. Updated Routing

#### `/index.php`
- Route `/sitemap.xml` → `/public/sitemap.index.php`
- Route `/sitemaps/sitemap-{N}.xml` → `/public/sitemap.page.php` with page parameter
- Maintained `/robots.txt` routing

#### `/public/robots.txt.php`
- Updated to disallow noisy query parameters:
  - `utm_*`, `ref`, `fbclid`, `gclid`, `msclkid`, `_hsmi`, `_hsenc`
- Points to sitemap index: `https://nrlcmd.com/sitemap.xml`

## Validation

All sitemap files validated successfully with `xmllint`:
```bash
✓ Sitemap index is valid XML
✓ Sitemap page 1 is valid XML
```

Sample output shows clean XML structure with no HTML tags:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nrlcmd.com/</loc>
    <lastmod>2025-10-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

## Deployment

Changes committed and pushed to main branch:
```
Fix sitemap XML errors: remove old sitemap files with HTML tags, 
implement proper sitemap index and sharded pages with clean XML output

7 files changed, 120 insertions(+), 156 deletions(-)
```

## Next Steps for User

1. **Wait for Railway deployment** (automatic, ~1-2 minutes)
2. **Verify sitemap is accessible:**
   - Visit `https://nrlcmd.com/sitemap.xml`
   - Should see sitemap index with links to shard files
   - Visit `https://nrlcmd.com/sitemaps/sitemap-1.xml`
   - Should see actual URLs (no HTML tags)
3. **Re-submit sitemap in Google Search Console:**
   - Go to GSC → Sitemaps
   - Remove old sitemap if present
   - Add new sitemap: `https://nrlcmd.com/sitemap.xml`
   - Click "Submit"
4. **Monitor GSC for 24-48 hours:**
   - XML parsing errors should clear
   - "Invalid XML tag" errors should disappear
   - Sitemap status should show "Success"

## Technical Benefits

1. **Clean separation** - Sitemap generation isolated from HTML rendering
2. **Scalability** - Sharded architecture supports 45,000+ URLs per page
3. **Maintainability** - Single source of truth via config arrays
4. **Standards compliance** - Proper XML escaping and validation
5. **Performance** - No unnecessary config loading or processing
6. **Canonical consistency** - All URLs use same normalization logic

## Files Modified
- `bootstrap/canonical.php` - Fixed array access bugs
- `index.php` - Updated routing for sitemap shards
- `public/robots.txt.php` - Added query param disallows
- `public/sitemap.index.php` - Fixed CSV deprecation warnings
- `public/sitemap.page.php` - NEW: Clean sitemap page generator

## Files Deleted
- `sitemap.xml.php` (root) - Old file with HTML contamination
- `public/sitemap.xml.php` - Conflicting/non-functional file

