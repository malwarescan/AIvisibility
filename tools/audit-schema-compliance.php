#!/usr/bin/env php
<?php
/**
 * Schema Compliance Auditor
 * 
 * Audits all pages against the Master Schema Matrix rules
 */

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/schema_enforcement.php';
require_once __DIR__.'/../bootstrap/canonical.php';

// Get all PHP pages
function getAllPages(): array {
  $pages = [];
  $baseDir = __DIR__.'/../pages';
  
  $iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($baseDir)
  );
  
  foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
      $path = $file->getPathname();
      $relativePath = str_replace($baseDir.'/', '', $path);
      $pages[] = $relativePath;
    }
  }
  
  return $pages;
}

// Extract schema from a page (simulate rendering)
function extractSchemaFromPage(string $pagePath): array {
  // This is a simplified extraction - in reality, we'd need to render the page
  // For now, we'll check the file contents for schema patterns
  $fullPath = __DIR__.'/../pages/'.$pagePath;
  if (!file_exists($fullPath)) {
    return [];
  }
  
  $content = file_get_contents($fullPath);
  $schemas = [];
  
  // Look for serviceSchemas
  if (preg_match('/\$serviceSchemas\s*=\s*\[(.*?)\];/s', $content, $matches)) {
    // Try to extract @type values
    if (preg_match_all('/@type[\'"]?\s*=>\s*[\'"]([^\'"]+)[\'"]/', $matches[1], $typeMatches)) {
      foreach ($typeMatches[1] as $type) {
        $schemas[] = ['@type' => $type];
      }
    }
  }
  
  // Look for articleSchema
  if (preg_match('/\$articleSchema\s*=\s*\[(.*?)\];/s', $content, $matches)) {
    if (preg_match('/@type[\'"]?\s*=>\s*[\'"]([^\'"]+)[\'"]/', $matches[1], $typeMatch)) {
      $schemas[] = ['@type' => $typeMatch[1]];
    }
  }
  
  // Look for contactPointSchema
  if (preg_match('/contactPointSchema/', $content)) {
    $schemas[] = ['@type' => 'ContactPoint'];
  }
  
  // Check for prohibited patterns
  $prohibited = ['Offer', 'Review', 'AggregateRating', 'Product', 'Event', 'SoftwareApplication', 'HowTo', 'Course'];
  foreach ($prohibited as $type) {
    if (preg_match('/@type[\'"]?\s*=>\s*[\'"]'.$type.'[\'"]/', $content) ||
        preg_match('/hasOfferCatalog|offers|review/', $content)) {
      $schemas[] = ['@type' => $type, '_found_in_code' => true];
    }
  }
  
  return $schemas;
}

// Main audit
echo "Schema Compliance Audit\n";
echo str_repeat('=', 80)."\n\n";

$pages = getAllPages();
$issues = [];
$warnings = [];
$clean = [];

foreach ($pages as $page) {
  $urlPath = '/'.str_replace('.php', '/', $page);
  $urlPath = str_replace('index/', '', $urlPath);
  $urlPath = rtrim($urlPath, '/') ?: '/';
  
  $pageType = SchemaEnforcement::getPageType($urlPath);
  $schemas = extractSchemaFromPage($page);
  
  // Build a mock graph for validation
  $graph = [];
  foreach ($schemas as $schema) {
    $graph[] = $schema;
  }
  
  $validation = SchemaEnforcement::validateGraph($graph, $pageType);
  
  if (!empty($validation['errors'])) {
    $issues[] = [
      'page' => $page,
      'path' => $urlPath,
      'type' => $pageType,
      'errors' => $validation['errors'],
      'warnings' => $validation['warnings']
    ];
  } elseif (!empty($validation['warnings'])) {
    $warnings[] = [
      'page' => $page,
      'path' => $urlPath,
      'type' => $pageType,
      'warnings' => $validation['warnings']
    ];
  } else {
    $clean[] = [
      'page' => $page,
      'path' => $urlPath,
      'type' => $pageType
    ];
  }
}

// Report
echo "ISSUES FOUND: ".count($issues)."\n";
if (!empty($issues)) {
  echo str_repeat('-', 80)."\n";
  foreach ($issues as $issue) {
    echo "\nPAGE: {$issue['page']}\n";
    echo "PATH: {$issue['path']}\n";
    echo "TYPE: {$issue['type']}\n";
    echo "ERRORS:\n";
    foreach ($issue['errors'] as $error) {
      echo "  ❌ $error\n";
    }
    if (!empty($issue['warnings'])) {
      echo "WARNINGS:\n";
      foreach ($issue['warnings'] as $warning) {
        echo "  ⚠️  $warning\n";
      }
    }
  }
}

echo "\n\nWARNINGS: ".count($warnings)."\n";
if (!empty($warnings)) {
  echo str_repeat('-', 80)."\n";
  foreach ($warnings as $warning) {
    echo "\nPAGE: {$warning['page']}\n";
    echo "PATH: {$warning['path']}\n";
    echo "TYPE: {$warning['type']}\n";
    foreach ($warning['warnings'] as $w) {
      echo "  ⚠️  $w\n";
    }
  }
}

echo "\n\nCLEAN PAGES: ".count($clean)."\n";
if (count($clean) <= 10) {
  foreach ($clean as $c) {
    echo "  ✓ {$c['page']} ({$c['type']})\n";
  }
} else {
  echo "  (".count($clean)." pages are compliant)\n";
}

echo "\n".str_repeat('=', 80)."\n";
echo "SUMMARY:\n";
echo "  Total pages: ".count($pages)."\n";
echo "  Issues: ".count($issues)."\n";
echo "  Warnings: ".count($warnings)."\n";
echo "  Clean: ".count($clean)."\n";

if (!empty($issues)) {
  exit(1);
}

