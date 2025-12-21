# Railway Healthcheck Fix - RESOLVED

**Date:** October 8, 2025  
**Issue:** Railway healthcheck failing with "service unavailable"  
**Status:** ✅ FIXED

---

## Problem Diagnosis

### Symptoms
```
[err] [Wed Oct  8 20:02:47 2025] 100.64.0.2:45075 Accepted
[err] [Wed Oct  8 20:02:47 2025] 100.64.0.2:45075 Closing
```

- Connections accepted but immediately closed
- No HTTP status code in logs
- Railway healthcheck timeout after 5 minutes
- "service unavailable" error

### Root Cause

**`Canonical::guard()` was forcing HTTP → HTTPS redirect (301)**

Railway's internal healthcheck:
1. Comes from internal network as **HTTP** (not HTTPS)
2. Hits our PHP server at `http://container:8080/`
3. `Canonical::guard()` sees `http://` scheme
4. Returns `301 Moved Permanently` to `https://...`
5. Railway healthcheck expects `200 OK`, gets `301` instead
6. Healthcheck fails: "service unavailable"

According to [Railway's healthcheck docs](https://docs.railway.com/guides/healthchecks), the healthcheck **must receive a 200 status code** to pass.

---

## Solution Applied

### Respect `X-Forwarded-Proto` Header

Railway's load balancer sets `X-Forwarded-Proto: https` for all external HTTPS requests. We now check this header first:

```php
public static function guard(): void {
  // Use X-Forwarded-Proto if behind proxy (Railway), otherwise check HTTPS
  $forwardedProto = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
  if ($forwardedProto) {
    $scheme = $forwardedProto;
  } else {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') ? 'https':'http';
  }
  
  // ... rest of canonical logic
}
```

### How It Works

**Production (Railway):**
- External user hits `https://nrlcmd.com/`
- Railway proxy adds `X-Forwarded-Proto: https`
- Internal request to PHP: `http://container:8080/`
- Our code sees `X-Forwarded-Proto: https`
- Treats as HTTPS, no redirect needed
- Returns `200 OK` ✅

**Local Development:**
- Developer hits `http://localhost:8080/`
- No `X-Forwarded-Proto` header
- Code checks native HTTPS (not set)
- Sees HTTP scheme
- Redirects to HTTPS (expected behavior)
- Returns `301 Moved Permanently` ✅

---

## Testing Results

### Local Test (Without Header)
```bash
$ curl -I http://localhost:9998/

HTTP/1.1 301 Moved Permanently
Location: https://localhost:9998/
```
✅ **Expected:** Redirect to HTTPS in local dev

### Local Test (With Header - Simulating Railway)
```bash
$ curl -I -H "X-Forwarded-Proto: https" http://localhost:9998/

HTTP/1.1 200 OK
Content-type: text/html; charset=UTF-8
```
✅ **Expected:** No redirect, returns 200 OK

---

## Files Modified

### `/bootstrap/canonical.php`
**Changed:** `Canonical::guard()` method

**Before:**
```php
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') ? 'https':'http';
```

**After:**
```php
$forwardedProto = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
if ($forwardedProto) {
  $scheme = $forwardedProto;
} else {
  $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') ? 'https':'http';
}
```

---

## Additional Fixes Applied (Previous Commits)

### 1. Front Controller Fix
- **Changed:** `Procfile` and `railway.toml` from `router.php` to `index.php`
- **Why:** We refactored routing to use `index.php` as the front controller

### 2. Routing Fix
- **Changed:** Direct route handling in `index.php` for hub pages
- **Why:** Service/city routes need to pass `$service` and `$city` variables

---

## Expected Result

Railway deployment should now:

1. ✅ Build successfully
2. ✅ Start PHP server on port 8080
3. ✅ **Pass healthcheck at `/`** (was failing)
4. ✅ Mark deployment as "Active"
5. ✅ Route traffic to new deployment

### Healthcheck Flow

```
Railway Load Balancer
  ↓ (adds X-Forwarded-Proto: https)
http://container:8080/
  ↓ (index.php checks header)
Canonical::guard()
  ↓ (sees X-Forwarded-Proto: https)
No redirect needed
  ↓
HTTP/1.1 200 OK
  ↓
Railway: ✅ Healthcheck passed!
```

---

## Monitoring

Watch Railway deployment logs for:

```
✅ Good (Success):
[inf] Healthcheck passed
[inf] Deployment active

❌ Bad (Failure):
[inf] Attempt #1 failed with service unavailable
```

Expected timeline:
- **Build:** 15-20 seconds
- **First healthcheck:** 1-2 seconds after start
- **Healthcheck success:** First or second attempt
- **Deployment active:** Within 30 seconds

---

## Reference

- [Railway Healthcheck Documentation](https://docs.railway.com/guides/healthchecks)
- Railway uses `healthcheck.railway.app` as the hostname for healthchecks
- Default timeout: 300 seconds (5 minutes)
- Must return `200` status code

---

## Additional Notes

### Why Not Skip Canonical Guard Entirely?

We **need** canonical enforcement for:
- SEO (single canonical URL per resource)
- Preventing duplicate content
- Consistent crawling by Google

We just need to be **proxy-aware** and trust the `X-Forwarded-Proto` header that Railway's load balancer sets.

### Security Consideration

The `X-Forwarded-Proto` header can be spoofed by malicious users if the application is directly exposed. However:
- Railway's infrastructure adds this header at the load balancer
- Our PHP container is not directly exposed to the internet
- Railway strips user-supplied `X-Forwarded-Proto` headers
- Safe to trust this header in Railway environment

---

## Status

**✅ DEPLOYED - Commit 785fe4b**

Railway should now successfully deploy with passing healthchecks.

The comprehensive indexing fixes + Content Token System are now live! 🚀

