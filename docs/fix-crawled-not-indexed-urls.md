# Fix for "Crawled - Currently Not Indexed" URLs

## Problem

Google Search Console reports 3,524 pages that were crawled but not indexed. Analysis reveals these are primarily malformed URLs that Google correctly chose not to index:

1. URLs with `/breadcrumb`, `/webpage`, or `/article` appended (from old `nc_id()` bug)
2. URLs with double language prefix (`/ko/ko/`)
3. URLs that are just `/breadcrumb`, `/webpage`, etc. at root

## Root Cause

The old `nc_id()` function was stripping `#` from fragment identifiers, creating invalid URLs like:
- `/page/breadcrumb` instead of `/page/#breadcrumb`
- `/page/webpage` instead of `/page/#webpage`
- `/page/article` instead of `/page/#article`

Additionally, there appears to be a bug causing double language prefixes (`/ko/ko/`).

## Solution

Enhanced redirect handling in `index.php` to catch and redirect all malformed URL patterns:

### 1. Fragment Identifier Segments

Redirect URLs with `/breadcrumb`, `/webpage`, or `/article` appended:

```php
// Redirect malformed URLs with /breadcrumb, /webpage, or /article appended
if (preg_match('#/(breadcrumb|webpage|article)(/|$)#', $path)) {
  $cleanPath = preg_replace('#/(breadcrumb|webpage|article)+(/|$)#', '/', $path);
  $cleanPath = rtrim($cleanPath, '/') ?: '/';
  $canonicalUrl = Canonical::absolute($cleanPath);
  header('Location: '.$canonicalUrl, true, 301);
  exit;
}
```

### 2. Double Language Prefix

Redirect URLs with duplicate language prefixes:

```php
// Redirect URLs with double language prefix (e.g., /ko/ko/page -> /ko/page)
if (preg_match('#^/(ko|en)/(ko|en)/#', $path)) {
  // Remove the first duplicate language prefix
  $cleanPath = preg_replace('#^/(ko|en)/(?=\1/)#', '/', $path);
  $canonicalUrl = Canonical::absolute($cleanPath);
  header('Location: '.$canonicalUrl, true, 301);
  exit;
}
```

## Impact

- **Immediate:** All malformed URLs will redirect to canonical versions with 301 status
- **Ongoing:** As Google re-crawls, it will follow redirects and update its index
- **Long-term:** The "Crawled - currently not indexed" count should decrease as Google recognizes these are invalid URLs that redirect properly

## Expected Behavior

- `/services/page/breadcrumb` → 301 → `/services/page`
- `/insights/geo-16-framework/article` → 301 → `/insights/geo-16-framework`
- `/ko/ko/services/page` → 301 → `/ko/services/page`
- `/breadcrumb` → 301 → `/`
- `/webpage` → 301 → `/`

## Timeline

- **2025-12-21:** Issue identified from Google Search Console coverage report
- **2025-12-21:** Enhanced redirect handling implemented

## Related Files

- `index.php` - Enhanced redirect handling for malformed URLs
- `lib/schema_utils.php` - Fixed `nc_id()` function (prevents future malformed URLs)

