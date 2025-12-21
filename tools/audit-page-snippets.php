<?php
/**
 * Audit tool: Check all pages for snippet alignment
 * 
 * Usage: php tools/audit-page-snippets.php
 */

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/page_role_enforcement.php';
require_once __DIR__.'/../lib/util.php';

// Scan all page files
$pagesDir = __DIR__.'/../pages';
$pages = [];

function scanPages($dir, $basePath = '') {
  $pages = [];
  $iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
  );
  
  foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
      $filePath = $file->getPathname();
      $relPath = str_replace($dir.'/', '', $filePath);
      
      // Convert file path to URL path
      $pagePath = '/'.str_replace('.php', '', str_replace(DIRECTORY_SEPARATOR, '/', $relPath)).'/';
      
      // Extract title and description
      $content = file_get_contents($filePath);
      $title = null;
      $desc = null;
      
      // Look for $ctx['title'] and $ctx['desc'] (handle both single and double quotes, and multi-line)
      if (preg_match("/\\\$ctx\s*\[\s*['\"]title['\"]\s*\]\s*=\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $title = $m[1];
      } elseif (preg_match("/\\\$ctx\s*\[\s*['\"]title['\"]\s*\]\s*=\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $title = $m[1];
      }
      
      if (preg_match("/\\\$ctx\s*\[\s*['\"]desc['\"]\s*\]\s*=\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $desc = $m[1];
      }
      
      // Also check for $pageTitle and $pageDesc variables
      if (!$title && preg_match("/\\\$pageTitle\s*=\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $title = $m[1];
      }
      if (!$desc && preg_match("/\\\$pageDesc\s*=\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $desc = $m[1];
      }
      
      if ($title && $desc) {
        $pages[] = [
          'path' => $pagePath,
          'file' => $filePath,
          'title' => $title,
          'description' => $desc
        ];
      }
    }
  }
  
  return $pages;
}

$pages = scanPages($pagesDir);

echo "=== PAGE SNIPPET AUDIT ===\n\n";
echo "Found " . count($pages) . " pages\n\n";

$issues = [];
$warnings = [];
$aligned = [];

foreach ($pages as $page) {
  $audit = PageRoleEnforcement::auditPage(
    $page['path'],
    $page['title'],
    $page['description']
  );
  
  if (!$audit['aligned']) {
    $issues[] = $audit;
  } else if (!empty($audit['warnings'])) {
    $warnings[] = $audit;
  } else {
    $aligned[] = $audit;
  }
}

// Report
echo "✅ ALIGNED: " . count($aligned) . " pages\n";
echo "⚠️  WARNINGS: " . count($warnings) . " pages\n";
echo "❌ ISSUES: " . count($issues) . " pages\n\n";

if (!empty($issues)) {
  echo "=== PAGES WITH ISSUES ===\n\n";
  foreach ($issues as $audit) {
    echo "Path: {$audit['path']}\n";
    echo "Role: {$audit['role']}\n";
    echo "Title: {$audit['title']['current']}\n";
    echo "Description: {$audit['description']['current']}\n";
    echo "Issues:\n";
    foreach ($audit['issues'] as $issue) {
      echo "  - $issue\n";
    }
    echo "\n";
  }
}

if (!empty($warnings)) {
  echo "=== PAGES WITH WARNINGS ===\n\n";
  foreach ($warnings as $audit) {
    echo "Path: {$audit['path']}\n";
    echo "Role: {$audit['role']}\n";
    echo "Warnings:\n";
    foreach ($audit['warnings'] as $warning) {
      echo "  - $warning\n";
    }
    echo "\n";
  }
}

echo "\n=== SUMMARY ===\n";
echo "Total pages: " . count($pages) . "\n";
echo "Aligned: " . count($aligned) . " (" . round(count($aligned) / count($pages) * 100) . "%)\n";
echo "Needs attention: " . (count($issues) + count($warnings)) . " (" . round((count($issues) + count($warnings)) / count($pages) * 100) . "%)\n";

