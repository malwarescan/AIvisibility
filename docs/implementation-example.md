# Implementation Example: Using Page Role Enforcement

## Example 1: Conversion Page (Service + City)

**File:** `pages/services/city.php`

```php
<?php
require_once __DIR__.'/../../lib/page_role_enforcement.php';
require_once __DIR__.'/../../lib/snippet_helper.php';

$service = 'ChatGPT SEO Services';
$cityName = 'New York';
$stateAbbr = 'NY';

// Generate role-aligned snippets
$snippets = nc_snippet_conversion(
  service: $service,
  location: "$cityName, $stateAbbr",
  outcome: "Get cited in ChatGPT and AI Overviews",
  who: "businesses",
  proof: "Trusted by 100+ companies"
);

$ctx = [
  'title' => $snippets['title'],
  'desc' => $snippets['description']
];
```

**Output:**
- Title: "ChatGPT SEO Services Get cited in ChatGPT and AI Overviews in New York, NY | Neural Command"
- Description: "For businesses. Get cited in ChatGPT and AI Overviews. Trusted by 100+ companies. in New York, NY."

---

## Example 2: Authority Page (Insight/Research)

**File:** `pages/insights/geo-16-framework.php`

```php
<?php
require_once __DIR__.'/../../lib/page_role_enforcement.php';
require_once __DIR__.'/../../lib/snippet_helper.php';

// Generate role-aligned snippets
$snippets = nc_snippet_authority(
  topic: "GEO-16 Framework Explained",
  domain: "AI citation behavior and answer engine optimization",
  takeaway: "Understand the 16 pillars that determine AI citation likelihood"
);

$ctx = [
  'title' => $snippets['title'],
  'desc' => $snippets['description']
];
```

**Output:**
- Title: "GEO-16 Framework Explained | Neural Command"
- Description: "Learn about GEO-16 Framework Explained. Research and insights on AI citation behavior and answer engine optimization."

---

## Example 3: Hybrid Page (About/Contact)

**File:** `pages/about.php`

```php
<?php
require_once __DIR__.'/../lib/page_role_enforcement.php';
require_once __DIR__.'/../lib/snippet_helper.php';

// Generate role-aligned snippets
$snippets = nc_snippet_hybrid(
  topic: "About Neural Command",
  service: "AI visibility services"
);

$ctx = [
  'title' => $snippets['title'],
  'desc' => $snippets['description']
];
```

**Output:**
- Title: "About Neural Command — AI Visibility Services | Neural Command"
- Description: "Understanding About Neural Command. How it impacts AI visibility and search results. Learn how our services can help."

---

## Manual Override (When Needed)

If you need to manually set snippets but still validate:

```php
<?php
require_once __DIR__.'/../lib/page_role_enforcement.php';

$path = '/services/chatgpt-seo/';
$title = "ChatGPT SEO Services | Neural Command";
$description = "Get cited in ChatGPT with our SEO services.";

// Validate
$audit = PageRoleEnforcement::auditPage($path, $title, $description);

if (!$audit['aligned']) {
  // Log issues
  error_log("Snippet issues for $path: " . implode(', ', $audit['issues']));
}

$ctx = [
  'title' => $title,
  'desc' => $description
];
```

---

## Migration Checklist

For each page file:

1. **Identify the role:**
   - Service pages → CONVERSION
   - Insights/case studies → AUTHORITY
   - About/contact → HYBRID

2. **Replace manual snippets:**
   ```php
   // OLD
   $ctx = [
     'title' => 'Some Title | Neural Command',
     'desc' => 'Some description'
   ];
   
   // NEW
   require_once __DIR__.'/../lib/snippet_helper.php';
   $snippets = nc_snippet_conversion(...);
   $ctx = [
     'title' => $snippets['title'],
     'desc' => $snippets['description']
   ];
   ```

3. **Run audit:**
   ```bash
   php tools/audit-page-snippets.php
   ```

4. **Fix any issues reported**

5. **Test in browser** (check `<title>` and `<meta name="description">`)

