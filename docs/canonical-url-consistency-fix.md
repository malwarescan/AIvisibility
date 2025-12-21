# Canonical URL Consistency Fix

## Problem

The "Alternate page with proper canonical tag" issue in Google Search Console (1,164 pages) indicates that Google is seeing multiple URL variants (with/without trailing slashes, www vs non-www) that all correctly canonicalize to the preferred version. While this is actually working as intended (the canonical tags are functioning correctly), there was an inconsistency in how canonical URLs were being generated.

## Root Cause

There was a mismatch between:
1. `Canonical::normalizePath()` - removes trailing slashes (except root), used by `Canonical::guard()` for redirects
2. `nc_page_url()` - was always adding trailing slashes, used for canonical tags in HTML

This meant the canonical URL in the `<link rel="canonical">` tag could have a different format than the actual served URL after normalization.

## Solution

Updated `nc_page_url()` in `lib/schema_utils.php` to use the same normalization logic as `Canonical::normalizePath()`. This ensures:

1. Canonical URLs match the actual served URLs exactly
2. No trailing slashes except for root path (`/`)
3. Consistent URL format across the site

## Code Changes

**File:** `lib/schema_utils.php`

```php
if (!function_exists('nc_page_url')) {
  function nc_page_url(): string {
    // Use normalized path (consistent with Canonical::normalizePath)
    // This ensures canonical URLs match the actual served URLs after Canonical::guard() normalization
    // normalizePath removes trailing slashes (except root) to match the canonical standard
    require_once __DIR__.'/../bootstrap/canonical.php';
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
    $normalizedPath = Canonical::normalizePath($uri);
    return nc_base_url().$normalizedPath;
  }
}
```

## Impact

- **Immediate:** Canonical URLs in HTML now match the served URLs exactly
- **Long-term:** Reduces confusion for search engines and should help Google consolidate duplicate entries faster
- **Note:** The "Alternate page with proper canonical tag" status is actually expected and indicates canonical tags are working correctly. This fix ensures consistency, but Google may still show these entries until it re-crawls and consolidates.

## Testing

To verify the fix:

1. Check that canonical URLs match served URLs:
   ```bash
   curl -s https://nrlcmd.com/services/agentic-seo/new-york-ny/ | grep 'rel="canonical"'
   ```
   Should show: `<link rel="canonical" href="https://nrlcmd.com/services/agentic-seo/new-york-ny">`

2. Verify normalization:
   ```bash
   curl -I https://nrlcmd.com/services/agentic-seo/new-york-ny/
   ```
   Should redirect (301) to: `https://nrlcmd.com/services/agentic-seo/new-york-ny`

## Timeline

- **2025-12-21:** Issue identified from Google Search Console coverage report
- **2025-12-21:** Inconsistency identified and fixed

## Related Files

- `lib/schema_utils.php` - Fixed `nc_page_url()` function
- `bootstrap/canonical.php` - `Canonical::normalizePath()` normalization logic
- `templates/head.php` - Uses `nc_page_url()` for canonical tags

