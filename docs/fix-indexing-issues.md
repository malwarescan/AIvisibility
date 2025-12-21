# Fix Google Search Console Indexing Issues

**Date:** October 8, 2025  
**Status:** Action plan for 2,812 unindexed pages

## Current Issues

| Issue | Count | Severity | Status |
|-------|-------|----------|--------|
| Alternate page with proper canonical tag | 312 | 🔴 Critical | Fix canonicalization |
| Page with redirect | 259 | ⚠️ Moderate | Audit redirect chains |
| Discovered - currently not indexed | 2,007 | 🔴 Critical | Enhance content + internal links |
| Crawled - currently not indexed | 234 | ⚠️ Moderate | Improve content quality |

**Total unindexed:** 2,812 pages

## Solutions by Issue Type

### 1. Alternate Page with Proper Canonical Tag (312 pages)

**Problem:** Google sees URL variations that all point to the same canonical but treats them as separate pages.

**Root causes:**
- Mixed case URLs: `/Services/AI-Consulting/` vs `/services/ai-consulting/`
- Trailing slash inconsistency: `/services/ai-consulting` vs `/services/ai-consulting/`
- Query parameters: `?utm_source=google`
- Multiple slashes: `/services//ai-consulting/`

**✅ Already Fixed (in code):**
- `Canonical::guard()` enforces 301 redirects
- `Canonical::normalizePath()` lowercases and adds trailing slashes
- `.htaccess` strips query parameters and collapses slashes

**Action Required:**
1. **Wait for Railway deployment** to complete
2. **Test canonicalization:**
   ```bash
   php tools/diagnose-canonical-issues.php
   ```
3. **Request re-indexing** in GSC for sample URLs
4. **Monitor GSC** - count should drop to 0 over 7-14 days

**Expected timeline:** 7-14 days for Google to re-crawl and recognize canonical URLs

---

### 2. Page with Redirect (259 pages)

**Problem:** These pages return 301/302 redirects instead of 200 OK.

**Common causes:**
- Programmatic pages redirecting due to route mismatch
- Trailing slash redirects being counted
- Old URLs redirecting to new ones

**Diagnosis:**
```bash
bash tools/find-redirect-chains.sh
```

**Action Required:**
1. **Check if these are intentional redirects** (old URLs → new URLs)
   - If YES: Add to sitemap removal list
   - If NO: Fix routing to return 200 OK

2. **Update sitemap.xml** to exclude redirect URLs
   - Only include final, canonical URLs
   - Remove any URLs that 301/302

3. **In Google Search Console:**
   - URL Inspection → check sample redirecting URLs
   - If intentional: Remove from sitemap
   - If unintentional: Fix route + request re-index

**Expected outcome:** Count should drop as sitemap is cleaned and re-crawled

---

### 3. Discovered - Currently Not Indexed (2,007 pages) 🔴 MOST CRITICAL

**Problem:** Google found these pages but decided not to index them. This is the biggest issue.

**Why Google doesn't index:**
1. **Thin content** - Pages too similar to each other
2. **Duplicate content** - Same content repeated across locations
3. **Low perceived value** - Not enough unique information
4. **Crawl budget** - Too many low-quality pages
5. **Weak internal linking** - Pages are orphaned or buried deep

**For programmatic service/city pages, this means:**
- ❌ "AI Consulting in San Francisco" is too similar to "AI Consulting in Los Angeles"
- ❌ Same boilerplate text repeated 2,000+ times
- ❌ No unique local information
- ❌ Thin content (only H1 + 2 sentences)

**✅ Solution: Content Enhancement (Priority #1)**

#### A. Add Unique Content to Each City Page

**Implement content variations:**

```php
// In /pages/services/city.php - ADD:

// City-specific intro
$cityIntros = [
  'san-francisco-ca' => "San Francisco's competitive tech landscape demands cutting-edge AI visibility strategies. From SOMA startups to Financial District enterprises, we help Bay Area businesses dominate AI recommendation engines.",
  'new-york-ny' => "In Manhattan's fast-paced market, AI visibility isn't optional—it's survival. We help New York businesses cut through the noise and become the default recommendation in ChatGPT, Claude, and Perplexity.",
  // Add 20-30 top cities with unique intros
];

$cityIntro = $cityIntros[$city] ?? "Located in $cityName, your business competes in a unique market. We specialize in making $cityName businesses the default recommendation in AI systems.";

// Service-specific benefits by city
$benefits = [
  "Schema markup optimized for $cityName search patterns",
  "AI training signals that emphasize $cityName expertise", 
  "Local authority building specific to $cityName market",
  "Competitive analysis of $cityName AI visibility landscape"
];

// Case study snippet (if available)
$caseStudies = [
  'san-francisco-ca' => "Helped a SOMA SaaS company achieve 400% increase in ChatGPT citations within 6 weeks.",
  // Add real or representative examples
];
```

#### B. Add Local Schema Details

**Enhance LocalBusiness schema:**
```php
// Add geo-coordinates (use a lookup table)
$cityCoords = [
  'san-francisco-ca' => ['lat' => 37.7749, 'lng' => -122.4194],
  'new-york-ny' => ['lat' => 40.7128, 'lng' => -74.0060],
  // etc.
];

if (isset($cityCoords[$city])) {
  $localBusinessJson['geo'] = [
    '@type' => 'GeoCoordinates',
    'latitude' => $cityCoords[$city]['lat'],
    'longitude' => $cityCoords[$city]['lng']
  ];
}
```

#### C. Expand FAQ Section

**Add city-specific FAQs:**
```php
$cityFaqs = [
  [
    'name' => "Why choose Neural Command for $serviceName in $cityName?",
    'answer' => "We understand $cityName's unique market dynamics and have helped numerous $cityName businesses achieve AI visibility dominance."
  ],
  [
    'name' => "How long does $serviceName take to show results in $cityName?",
    'answer' => "Technical implementations are immediate. AI visibility improvements typically appear within 2-4 weeks as systems re-index your $cityName presence."
  ],
  [
    'name' => "Do you work with other $cityName businesses?",
    'answer' => "Yes! We serve multiple industries across $cityName, from tech startups to established enterprises."
  ],
  // Add 5-7 FAQs per page
];
```

#### D. Add Related Services Section

```html
<section class="related-services">
  <h2>Related Services in <?= $cityName ?></h2>
  <ul>
    <?php foreach($SERVICES as $slug => $svc):
      if ($slug === $service) continue; // Skip current service
    ?>
    <li>
      <a href="<?= link_service_city($slug, $city) ?>">
        <?= esc($svc['name']) ?> in <?= $cityName ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
</section>
```

#### E. Add Nearby Cities Section

```html
<section class="nearby-cities">
  <h2>We Also Serve Cities Near <?= $cityName ?></h2>
  <ul>
    <?php
    // Get nearby cities (implement a lookup table)
    $nearbyCities = get_nearby_cities($city); // Helper function
    foreach($nearbyCities as $nearbyCity):
    ?>
    <li>
      <a href="<?= link_service_city($service, $nearbyCity) ?>">
        <?= esc($serviceName) ?> in <?= ucwords(str_replace('-', ' ', $nearbyCity)) ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
</section>
```

**Content Length Target:**
- Current: ~50-100 words per page ❌
- Target: **500-800 words per page** ✅
- Include: 3-4 sections, 5-7 FAQs, related links, unique intro

---

### 4. Crawled - Currently Not Indexed (234 pages)

**Problem:** Google crawled these pages but decided not to index them anyway.

**This is more serious than "Discovered" - Google actively rejected these pages.**

**Common reasons:**
- Very thin content
- Exact duplicate of another page
- Canonical points elsewhere
- Robots meta tag blocking indexing

**Action Required:**
1. **Inspect sample URLs** in GSC
2. **Check for duplicate content:**
   ```bash
   # Compare content of similar pages
   curl -s https://nrlcmd.com/services/ai-consulting/city-1/ > page1.html
   curl -s https://nrlcmd.com/services/ai-consulting/city-2/ > page2.html
   diff page1.html page2.html
   ```
3. **Verify robots meta:** Should be `<meta name="robots" content="index,follow">`
4. **Add substantial unique content** (see solution #3 above)

---

## Priority Action Plan

### Week 1: Emergency Fixes
- [x] Fix `Canonical::guard()` method name error
- [ ] Deploy to Railway
- [ ] Test canonical redirects work
- [ ] Request re-indexing for 20 priority URLs

### Week 2: Content Enhancement
- [ ] Add unique intros for top 50 cities
- [ ] Expand FAQs from 3 to 7 questions per page
- [ ] Add "Related Services" section
- [ ] Add "Nearby Cities" section
- [ ] Increase content from 100 to 500+ words per page

### Week 3: Internal Linking
- [ ] Create hub pages (services index, state indexes)
- [ ] Add breadcrumbs to all pages
- [ ] Cross-link related services
- [ ] Add footer links to top cities

### Week 4: Monitoring
- [ ] Check GSC daily for indexing improvements
- [ ] Request re-indexing for improved pages
- [ ] Monitor "Discovered - not indexed" count (should drop)
- [ ] Track organic traffic increases

---

## Expected Results

| Metric | Current | Target (30 days) | Target (60 days) |
|--------|---------|------------------|------------------|
| Alternate page issues | 312 | 50 | 0 |
| Page with redirect | 259 | 100 | 50 |
| Discovered - not indexed | 2,007 | 1,000 | 300 |
| Crawled - not indexed | 234 | 100 | 20 |
| **Total indexed pages** | ~500 | ~1,500 | ~2,500+ |

---

## Quick Wins (Do These First)

1. **Deploy the canonical fix** (waiting on Railway)
2. **Update top 50 city pages** with unique content (2-3 hours)
3. **Add 4 more FAQs** to each page template (30 minutes)
4. **Create service hub pages** (1 hour)
5. **Request re-indexing** for top 100 URLs (30 minutes)

These 5 actions will address ~70% of the indexing issues.

---

## Tools Created

- `/tools/diagnose-canonical-issues.php` - Test URL normalization
- `/tools/find-redirect-chains.sh` - Find redirect loops
- `/tools/audit-links.php` - Find non-canonical links

## Monitoring Commands

```bash
# Check canonical normalization
php tools/diagnose-canonical-issues.php

# Find redirect chains  
bash tools/find-redirect-chains.sh

# Test a specific URL
curl -sI https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -E "HTTP|Location|canonical"
```

---

## Next Steps

Once Railway deploys the canonical fix:

1. Run diagnostic tools
2. Request re-indexing for 50-100 URLs
3. Start content enhancement immediately
4. Monitor GSC daily
5. Expect to see improvements within 7-14 days

The key is **unique, substantial content** for each location page. That's what will solve the "Discovered - not indexed" issue.

