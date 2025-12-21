# Comprehensive JSON-LD Schema Implementation

**Date:** October 8, 2025  
**Status:** All location pages now have complete JSON-LD markup

## Overview

Every location-specific URL (e.g., `/services/ai-consulting/san-francisco-ca/`) now includes a complete set of JSON-LD schemas to maximize search visibility and rich result eligibility.

## What's Implemented on Each Location Page

### 1. Organization Schema
**Purpose:** Establishes Neural Command, LLC as the parent organization  
**Location:** Every page  
**Fields:**
- `@type`: Organization
- `@id`: `https://nrlcmd.com/#organization`
- `name`: Neural Command, LLC
- `legalName`: Neural Command, LLC
- `founder`: Joel David Maldonado (links to Person schema)
- `address`: Santa Monica, CA headquarters
- `telephone`: +1-844-568-4624
- `email`: hello@neuralcommandllc.com
- `sameAs`: LinkedIn profile

### 2. LocalBusiness Schema
**Purpose:** Shows local presence in each city  
**Location:** Every city page  
**Fields:**
- `@type`: LocalBusiness
- `@id`: `{canonical}#localbusiness`
- `name`: "Neural Command, LLC - {City}, {State}"
- `parentOrganization`: Links to main Organization
- `areaServed`: Specific city and state
- `address`: Physical headquarters
- `telephone`, `email`, `priceRange`
- State extraction: Automatically extracts state from city slug (e.g., "san-francisco-ca" → "San Francisco, CA")

### 3. Service Schema
**Purpose:** Defines the specific service offering  
**Location:** Every service-city page  
**Fields:**
- `@type`: Service
- `@id`: `{canonical}#service`
- `name`: "{Service} in {City}"
- `serviceType`: Service name
- `description`: Comprehensive description
- `provider`: Links to LocalBusiness schema
- `areaServed`: City-specific
- `category`: "SEO Services"
- `offers`: Pricing structure

### 4. BreadcrumbList Schema
**Purpose:** Navigation hierarchy for rich snippets  
**Location:** Every page  
**Structure:**
```
Home → Services → {Service Name} → {City}
```
**Example:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nrlcmd.com/"},
    {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://nrlcmd.com/services/"},
    {"@type": "ListItem", "position": 3, "name": "AI Consulting", "item": "https://nrlcmd.com/services/ai-consulting/"},
    {"@type": "ListItem", "position": 4, "name": "San Francisco", "item": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/"}
  ]
}
```

### 5. WebPage Schema  
**Purpose:** Identifies the page itself (CreativeWork type)  
**Location:** Every page  
**Fields:**
- `@type`: WebPage
- `@id`: `{canonical}#webpage`
- `name`: Page title
- `description`: Meta description
- `isPartOf`: Links to WebSite schema
- `about`: Links to Organization
- `breadcrumb`: Links to BreadcrumbList
- **`license`**: Automatically added via `render_jsonld()` ✨
- **`creator`**: Automatically added via `render_jsonld()` ✨

### 6. FAQPage Schema
**Purpose:** Frequently asked questions (CreativeWork type)  
**Location:** Every page  
**Fields:**
- `@type`: FAQPage
- `@id`: `{canonical}#faq`
- `mainEntity`: Array of Question/Answer pairs
- **`license`**: Automatically added via `render_jsonld()` ✨
- **`creator`**: Automatically added via `render_jsonld()` ✨

## Implementation Architecture

### New Schema Builders Library

**File:** `/lib/schema_builders.php`

**Functions:**
1. `build_organization_schema()` - Neural Command, LLC organization
2. `build_local_business_schema($city, $state, $canonical)` - Location-specific business
3. `build_service_schema($serviceName, $serviceSlug, $city, $canonical)` - Service offerings
4. `build_breadcrumb_schema($items)` - Navigation breadcrumbs
5. `build_webpage_schema($canonical, $title, $desc)` - Page metadata

### Automatic Enhancement

All WebPage and FAQPage schemas are passed through `render_jsonld()` which automatically adds:
- `license`: https://nrlcmd.com/legal/license/
- `creator`: Joel David Maldonado

This happens via `/lib/schema.php` helper functions.

## Example: Complete Schema Stack for a Location Page

For `https://nrlcmd.com/services/ai-consulting/san-francisco-ca/`:

```html
<head>
  <!-- 1. Organization -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nrlcmd.com/#organization",
    "name": "Neural Command, LLC",
    "founder": {
      "@type": "Person",
      "@id": "https://nrlcmd.com/#creator",
      "name": "Joel David Maldonado"
    },
    ...
  }
  </script>
  
  <!-- 2. LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/#localbusiness",
    "name": "Neural Command, LLC - San Francisco, CA",
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://nrlcmd.com/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": "San Francisco",
      "containedInPlace": {
        "@type": "State",
        "name": "CA"
      }
    },
    ...
  }
  </script>
  
  <!-- 3. Service -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/#service",
    "name": "AI Consulting in San Francisco",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/#localbusiness"
    },
    ...
  }
  </script>
  
  <!-- 4. BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  }
  </script>
  
  <!-- 5. WebPage (with license & creator) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/#webpage",
    "license": "https://nrlcmd.com/legal/license/",
    "creator": {
      "@type": "Person",
      "name": "Joel David Maldonado",
      "url": "https://nrlcmd.com/#creator"
    },
    ...
  }
  </script>
  
  <!-- 6. FAQPage (with license & creator) -->
  <script type="application/ld+json">
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
  </script>
</head>
```

## Benefits

### 1. Maximum Rich Result Eligibility
- Organization panels in search
- Local business snippets
- Breadcrumb navigation in SERPs
- FAQ rich results
- Service listings

### 2. Entity Relationships
All schemas are connected via `@id` references:
- LocalBusiness → Organization (parent)
- Service → LocalBusiness (provider)
- WebPage → Organization (about)
- WebPage → BreadcrumbList (breadcrumb)
- All reference the same creator (Joel David Maldonado)

### 3. Location-Aware
- Automatic state extraction from city slugs
- City-specific areaServed
- Location-specific LocalBusiness for each page

### 4. Google Search Console Compliance
✅ No "Missing field 'license'" warnings (WebPage, FAQPage)  
✅ No "Missing field 'creator'" warnings (WebPage, FAQPage)  
✅ Complete Organization schema  
✅ LocalBusiness for every location  
✅ Breadcrumbs for navigation

## Files Modified

- `/lib/schema_builders.php` - NEW: Reusable schema builder functions
- `/pages/services/city.php` - Complete schema stack for location pages

## Verification

```bash
# Check all schemas present
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -c '@type'
# Should return: 8 (Organization, LocalBusiness, Service, BreadcrumbList, WebPage, FAQPage, Person in footer, Person in creator)

# Verify LocalBusiness
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -A5 '"@type":"LocalBusiness"'

# Verify BreadcrumbList
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep '"@type":"BreadcrumbList"'

# Verify creator in WebPage/FAQPage
curl -s https://nrlcmd.com/services/ai-consulting/san-francisco-ca/ | grep -o '"creator":{[^}]*}'
```

## Next Steps

1. Monitor Google Search Console for rich result eligibility
2. Check Search Console → Enhancements for:
   - Organization
   - Local Business
   - Breadcrumbs
   - FAQ
3. Verify rich snippets appear in search results (can take 7-14 days)
4. Consider adding:
   - Aggregate ratings (if you have reviews)
   - Geo coordinates for each city
   - Business hours
   - Images/logos for LocalBusiness

