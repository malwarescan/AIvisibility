# Fix: Homepage Redirect Issue (Catch-All Routing)

## Problem

Many URLs in Google Search Console were showing impressions but redirecting to the homepage, causing:
- Canonical confusion
- Crawl waste
- Diluted homepage signals
- Query → page mapping issues

## Root Cause

The router in `index.php` had two problematic patterns:

1. **Invalid page validation** (line 256): Invalid pages were silently defaulted to `'home'` instead of returning 404
2. **Missing file fallback** (lines 263-264): When page files didn't exist, the homepage was served instead of a 404

This created a catch-all redirect pattern where any unknown, deprecated, or typo URL would show the homepage content, making Google think these URLs were valid but canonical to `/`.

## Solution

### Changes Made

1. **Proper 404 handling for invalid pages:**
   ```php
   if (!in_array($page,$valid)) {
       // Invalid page - return 404 instead of redirecting to homepage
       http_response_code(404);
       $page = '404';
       $pageFile = __DIR__.'/pages/404.php';
       // ...
   }
   ```

2. **Proper 404 handling for missing files:**
   ```php
   if ($pageFile && file_exists($pageFile)) {
       include $pageFile;
   } else {
       // Page file doesn't exist - return 404, don't show homepage
       http_response_code(404);
       // Try to include a 404 page, otherwise show minimal error
       $errorPage = __DIR__.'/pages/404.php';
       if (file_exists($errorPage)) {
           include $errorPage;
       } else {
           // Minimal 404 response if no 404 page exists
           echo '<!DOCTYPE html>...';
       }
   }
   ```

3. **Created proper 404 page** (`pages/404.php`):
   - Returns proper 404 HTTP status
   - Shows user-friendly error message
   - Provides navigation links to valid pages

## Impact

### Before
- Invalid URLs → Homepage (200 OK)
- Missing pages → Homepage (200 OK)
- Google sees all URLs as valid homepage variants
- Homepage signals diluted by unrelated queries

### After
- Invalid URLs → 404 Not Found
- Missing pages → 404 Not Found
- Google correctly identifies non-existent pages
- Homepage signals remain clean and focused

## Page State Handling

| Page State | HTTP Response | Behavior |
|------------|---------------|----------|
| Page exists | 200 OK | Serve page normally |
| Page intentionally removed | 410 Gone (future) | Mark as permanently removed |
| Page temporarily missing | 404 Not Found | Standard not found |
| Page replaced | 301 → specific replacement | Redirect to new location |
| Random/invalid URL | 404 Not Found | Standard not found |
| ~~Unknown page~~ | ~~200 OK (homepage)~~ | **FIXED: Now 404** |

## Testing

Test invalid URLs:
```bash
curl -I http://localhost:8000/nonexistent-page
# Should return: HTTP/1.1 404 Not Found

curl -I http://localhost:8000/services/invalid-service/invalid-city
# Should return: HTTP/1.1 404 Not Found
```

Test valid pages:
```bash
curl -I http://localhost:8000/
# Should return: HTTP/1.1 200 OK

curl -I http://localhost:8000/services/
# Should return: HTTP/1.1 200 OK
```

## Next Steps

1. **Monitor GSC**: Watch for reduction in homepage impressions from invalid URLs
2. **Clean up Google's memory**: Let Google recrawl naturally, or use temporary removals for worst offenders
3. **Consider 410 Gone**: For pages that were intentionally removed, consider returning 410 instead of 404
4. **Review redirects**: Check if any legitimate redirects to homepage should be changed to specific replacement pages

## Related Files

- `index.php` - Main router (lines 254-280)
- `pages/404.php` - 404 error page template
- `.htaccess` - URL rewriting rules (no changes needed)

## Notes

- This fix aligns with the "each page has a role" directive by preventing homepage from absorbing unrelated queries
- This improves crawl quality and reduces homepage noise
- This reinforces schema and page-role discipline

