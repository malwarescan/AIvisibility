#!/usr/bin/env php
<?php
/**
 * QA Test for Schema Enforcement
 */

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/schema_enforcement.php';
require_once __DIR__.'/../bootstrap/canonical.php';

echo "=== SCHEMA ENFORCEMENT QA TEST ===\n\n";

// Test 1: Schema Enforcement Class
echo "1. Testing SchemaEnforcement class...\n";
$testGraph = [
  ['@type' => 'Organization', 'name' => 'Test'],
  ['@type' => 'Service', 'name' => 'Test Service'],
  ['@type' => 'Offer', 'name' => 'Test Offer'], // Should be removed
  ['@type' => 'Review', 'name' => 'Test Review'], // Should be removed
];

$pageType = SchemaEnforcement::getPageType('/services/test/');
echo "   Page type: $pageType\n";

$cleaned = SchemaEnforcement::cleanGraph($testGraph, $pageType);
$types = array_map(function($item) { return $item['@type'] ?? 'unknown'; }, $cleaned);
echo "   Cleaned types: " . implode(', ', $types) . "\n";
echo "   ✓ Offer removed: " . (in_array('Offer', $types) ? 'FAIL' : 'PASS') . "\n";
echo "   ✓ Review removed: " . (in_array('Review', $types) ? 'FAIL' : 'PASS') . "\n\n";

// Test 2: Page Type Detection
echo "2. Testing page type detection...\n";
$tests = [
  '/' => 'homepage',
  '/contact/' => 'contact',
  '/services/test/' => 'service',
  '/insights/test/' => 'authority',
  '/about/' => 'hybrid',
];

foreach ($tests as $path => $expected) {
  $actual = SchemaEnforcement::getPageType($path);
  $status = $actual === $expected ? 'PASS' : 'FAIL';
  echo "   $path => $actual ($status)\n";
}
echo "\n";

// Test 3: ContactPoint Generation
echo "3. Testing ContactPoint generation...\n";
$contactPoint = SchemaEnforcement::generateContactPoint('test@example.com', '+1234567890', 'General');
echo "   Type: " . ($contactPoint['@type'] ?? 'missing') . "\n";
echo "   Email: " . ($contactPoint['email'] ?? 'missing') . "\n";
echo "   ✓ ContactPoint valid: " . (isset($contactPoint['@type']) && $contactPoint['@type'] === 'ContactPoint' ? 'PASS' : 'FAIL') . "\n\n";

// Test 4: Service Generation (no Offer/Review)
echo "4. Testing Service generation...\n";
$service = SchemaEnforcement::generateService([
  'name' => 'Test Service',
  'description' => 'Test Description',
  'serviceType' => 'Test Type',
  'provider' => ['@id' => 'https://nrlcmd.com/#org']
]);
echo "   Type: " . ($service['@type'] ?? 'missing') . "\n";
echo "   Has Offer: " . (isset($service['hasOfferCatalog']) || isset($service['offers']) ? 'YES (FAIL)' : 'NO (PASS)') . "\n";
echo "   Has Review: " . (isset($service['review']) ? 'YES (FAIL)' : 'NO (PASS)') . "\n\n";

// Test 5: Validation
echo "5. Testing validation...\n";
$homepageGraph = [
  ['@type' => 'Organization'],
  ['@type' => 'WebSite'],
  ['@type' => 'WebPage'],
  ['@type' => 'Service'], // Should warn
];
$validation = SchemaEnforcement::validateGraph($homepageGraph, 'homepage');
echo "   Errors: " . count($validation['errors']) . "\n";
echo "   Warnings: " . count($validation['warnings']) . "\n";
echo "   ✓ Validation working: " . (count($validation['warnings']) > 0 ? 'PASS' : 'FAIL') . "\n\n";

echo "=== QA TEST COMPLETE ===\n";

