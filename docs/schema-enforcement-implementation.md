# Schema Enforcement Implementation

## Overview

The Master Schema Matrix has been implemented with automatic enforcement to prevent signal dilution and schema violations.

## Components

### 1. Schema Enforcement Library (`lib/schema_enforcement.php`)

**Functions:**
- `getPageType($path)` - Determines page type (homepage, contact, service, authority, hybrid)
- `validateGraph($graph, $pageType)` - Validates schema graph against rules
- `cleanGraph($graph, $pageType)` - Removes prohibited types automatically
- `generateContactPoint()` - Generates clean ContactPoint schema
- `generateService()` - Generates clean Service schema (no Offer/Review)

**Prohibited Types (automatically removed):**
- Product
- Offer
- Review
- AggregateRating
- Event
- SoftwareApplication
- HowTo
- Course

### 2. Automatic Enforcement (`templates/head.php`)

All schema graphs are automatically cleaned before rendering:

```php
// Schema Enforcement (Master Schema Matrix)
require_once __DIR__.'/../lib/schema_enforcement.php';
$pageType = SchemaEnforcement::getPageType(parse_url($PAGE, PHP_URL_PATH) ?? '/');
$graph = SchemaEnforcement::cleanGraph($graph, $pageType);
```

This means:
- Prohibited types are removed automatically
- Pages are validated against their role
- No manual cleanup needed

### 3. Contact Page (`pages/contact.php`)

ContactPoint schema is added automatically:

```php
$contactPointSchema = SchemaEnforcement::generateContactPoint(
  NC_EMAIL,
  NC_PHONE,
  'General'
);
$GLOBALS['contactPointSchema'] = $contactPointSchema;
```

### 4. Service Pages

Service pages should use the clean generator:

```php
require_once __DIR__.'/../../lib/schema_enforcement.php';

$serviceSchemas = [
  SchemaEnforcement::generateService([
    '@id' => canonical('/services/example/').'#service',
    'name' => 'Service Name',
    'description' => 'Service description',
    'serviceType' => 'Service Type',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [...]
  ]),
  // FAQPage if needed
];
```

### 5. Audit Tool (`tools/audit-schema-compliance.php`)

Run to check all pages for compliance:

```bash
php tools/audit-schema-compliance.php
```

## What Changed

### Homepage
- ✅ Removed Service schema
- ✅ Removed FAQ schema
- ✅ Now only: Organization + WebSite + WebPage

### Contact Page
- ✅ Added ContactPoint schema
- ✅ No Service, FAQ, Offer, Product

### Service Pages
- ✅ Automatic removal of Offer, Review, OfferCatalog
- ✅ Clean Service schema only
- ✅ FAQPage allowed if decision-blocking

### All Pages
- ✅ Automatic enforcement at render time
- ✅ Prohibited types removed automatically
- ✅ Validation against page role

## Rules by Page Type

| Page Type | Allowed Schema Types |
|-----------|---------------------|
| Homepage | Organization, WebSite, WebPage, BreadcrumbList |
| Contact | Organization, WebPage, ContactPoint, BreadcrumbList |
| Service | Organization, WebPage, Service, BreadcrumbList, FAQPage |
| Authority | Organization, WebPage, Article, BlogPosting, BreadcrumbList |
| Hybrid | Organization, WebPage, BreadcrumbList |

## Testing

1. **Check homepage:** Visit `/` and inspect JSON-LD - should only have Organization, WebSite, WebPage
2. **Check contact:** Visit `/contact/` and inspect JSON-LD - should have ContactPoint
3. **Check service:** Visit any `/services/...` page - should have Service (no Offer/Review)
4. **Run audit:** `php tools/audit-schema-compliance.php`

## Future Updates

When adding new pages:
1. Determine page type (homepage, contact, service, authority, hybrid)
2. Use appropriate schema generator functions
3. Never add prohibited types manually
4. Run audit tool to verify compliance

The enforcement system will automatically clean any violations, but it's better to generate clean schema from the start.

