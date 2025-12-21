# Fix: Missing Service + LocalBusiness Schema on City Service Pages

## Problem

Service and LocalBusiness schemas were not appearing in the JSON-LD output for city service pages, even though:
- Condition logic was correct (cityName and region were set)
- Schemas were being generated
- Schemas were allowed by enforcement rules

## Root Cause

The graph assembly pipeline had multiple issues:

1. **Incorrect graph structure**: `cleanGraph` expects a flat array, but we were building a `@graph` structure
2. **Wrong output function**: Still using `nc_jsonld($graph)` instead of the new `$graphStructure`
3. **Inconsistent schema node contract**: Pages were using `$GLOBALS['serviceSchemas']` instead of standardized `$GLOBALS['schema_nodes']`

## Solution

### 1. Standardized Schema Node Contract

All pages now push schema nodes into `$GLOBALS['schema_nodes']` as a flat array:

```php
$GLOBALS['schema_nodes'] = $GLOBALS['schema_nodes'] ?? [];
$GLOBALS['schema_nodes'][] = $serviceSchema;
$GLOBALS['schema_nodes'][] = $localBusinessSchema;
```

### 2. Fixed Graph Assembly Order

In `templates/head.php`:
1. Build base graph nodes (Organization, WebPage, BreadcrumbList)
2. Merge page-provided nodes from `$GLOBALS['schema_nodes']`
3. Run `SchemaEnforcement::cleanGraph($graph, $pageType)` on flat array
4. Convert to `@graph` structure for output
5. Output JSON-LD directly (not using `nc_jsonld`)

### 3. Updated City Service Pages

Updated `pages/services/city.php` to:
- Use `SchemaEnforcement::generateService()` and `SchemaEnforcement::generateLocalBusiness()`
- Push schemas into `$GLOBALS['schema_nodes']` instead of `$GLOBALS['serviceSchemas']`
- Remove all prohibited types (Offer, hasOfferCatalog, makesOffer)

### 4. Added Helper Functions

- `SchemaEnforcement::generateLocalBusiness()` - Generates clean LocalBusiness schema
- `SchemaEnforcement::countTypes()` - Debug helper to count schema types

## Files Modified

1. `templates/head.php` - Fixed graph assembly and output
2. `pages/services/city.php` - Updated to use standardized contract
3. `lib/schema_enforcement.php` - Added `generateLocalBusiness()` and `countTypes()`

## Testing

```bash
# Test schema types in output
curl -sL "http://localhost:8000/services/ai-recommendation-consulting/worcester-ma" | \
  python3 -c "import sys, re, json; data=sys.stdin.read(); m=re.search(r'<script type=\"application/ld\+json\">(.+?)</script>', data, re.DOTALL); graph=json.loads(m.group(1)) if m else {}; nodes=graph.get('@graph', []); types=[n.get('@type') for n in nodes if isinstance(n, dict) and '@type' in n]; print('\\n'.join(sorted(set(types))))"

# Expected output should include:
# - BreadcrumbList
# - LocalBusiness
# - Organization
# - Service
# - WebPage
```

## Acceptance Criteria

✅ Service schema appears in JSON-LD output  
✅ LocalBusiness schema appears in JSON-LD output (if valid)  
✅ No prohibited types (Offer, Product, Review, etc.)  
✅ Schemas pass through cleanGraph correctly  
✅ Debug logs show schemas in PRE CLEAN and POST CLEAN  

## Next Steps

1. Remove temporary debug logging after QA
2. Update other service pages to use `$GLOBALS['schema_nodes']`
3. Consider deprecating old `$GLOBALS['serviceSchemas']` key

