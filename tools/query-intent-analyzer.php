#!/usr/bin/env php
<?php
/**
 * Query Intent Analyzer
 * 
 * Analyzes GSC query data and suggests page roles and content strategy
 */

require_once __DIR__.'/../lib/page_role_enforcement.php';

// Load query data (from CSV)
function loadQueries(string $csvPath): array {
  $queries = [];
  if (!file_exists($csvPath)) {
    return $queries;
  }
  
  $handle = fopen($csvPath, 'r');
  $header = fgetcsv($handle); // Skip header
  
  while (($row = fgetcsv($handle)) !== false) {
    if (count($row) >= 4) {
      $queries[] = [
        'query' => $row[0],
        'clicks' => (int)$row[1],
        'impressions' => (int)$row[2],
        'ctr' => floatval(str_replace('%', '', $row[3])),
        'position' => floatval($row[4] ?? 0)
      ];
    }
  }
  
  fclose($handle);
  return $queries;
}

// Classify query intent
function classifyIntent(string $query): string {
  $query = strtolower($query);
  
  // Conceptual / Exploratory
  if (preg_match('/\b(what|how|why|when|where|explain|understand|learn|about)\b/', $query) ||
      preg_match('/\b(definition|meaning|concept|overview|introduction)\b/', $query) ||
      preg_match('/\b(ai seo|llm visibility|generative engine|neural)\b/', $query) && 
      !preg_match('/\b(service|agency|consulting|company|firm)\b/', $query)) {
    return 'CONCEPTUAL';
  }
  
  // Comparative / Evaluative
  if (preg_match('/\b(vs|versus|compared|difference|better|best|which|should)\b/', $query) ||
      preg_match('/\b(when.*makes sense|common mistakes|pitfalls|problems)\b/', $query)) {
    return 'EVALUATIVE';
  }
  
  // Transactional
  if (preg_match('/\b(service|agency|consulting|company|firm|hire|buy|get|need)\b/', $query) ||
      preg_match('/\b(near me|in|for|at)\b/', $query)) {
    return 'TRANSACTIONAL';
  }
  
  return 'UNKNOWN';
}

// Suggest page role
function suggestPageRole(string $intent): string {
  switch ($intent) {
    case 'CONCEPTUAL':
      return 'AUTHORITY';
    case 'EVALUATIVE':
      return 'HYBRID';
    case 'TRANSACTIONAL':
      return 'CONVERSION';
    default:
      return 'HYBRID';
  }
}

// Main analysis
echo "=== QUERY INTENT ANALYSIS ===\n\n";

$csvPath = __DIR__.'/../data/queries.csv';
if (!file_exists($csvPath)) {
  echo "Query CSV not found. Expected: $csvPath\n";
  echo "Create it from GSC export: Queries.csv\n";
  exit(1);
}

$queries = loadQueries($csvPath);

if (empty($queries)) {
  echo "No queries found in CSV.\n";
  exit(1);
}

// Analyze each query
$intentBuckets = [
  'CONCEPTUAL' => [],
  'EVALUATIVE' => [],
  'TRANSACTIONAL' => [],
  'UNKNOWN' => []
];

$lowCTR = [];
$highImpressions = [];

foreach ($queries as $q) {
  $intent = classifyIntent($q['query']);
  $intentBuckets[$intent][] = $q;
  
  // Flag low CTR queries
  if ($q['impressions'] >= 5 && $q['ctr'] < 1.0) {
    $lowCTR[] = $q;
  }
  
  // Flag high impression queries
  if ($q['impressions'] >= 10) {
    $highImpressions[] = $q;
  }
}

// Report
echo "QUERY INTENT DISTRIBUTION:\n";
echo str_repeat('-', 60)."\n";
foreach ($intentBuckets as $intent => $bucket) {
  $count = count($bucket);
  $totalImpressions = array_sum(array_column($bucket, 'impressions'));
  $totalClicks = array_sum(array_column($bucket, 'clicks'));
  $avgCTR = $totalImpressions > 0 ? ($totalClicks / $totalImpressions * 100) : 0;
  
  echo "$intent: $count queries, $totalImpressions impressions, $totalClicks clicks, ".number_format($avgCTR, 2)."% CTR\n";
}
echo "\n";

// Priority queries for concept anchors
echo "PRIORITY: CONCEPTUAL QUERIES (Build Authority Pages):\n";
echo str_repeat('-', 60)."\n";
$conceptual = $intentBuckets['CONCEPTUAL'];
usort($conceptual, function($a, $b) {
  return $b['impressions'] <=> $a['impressions'];
});

foreach (array_slice($conceptual, 0, 10) as $q) {
  echo "  • \"{$q['query']}\" - {$q['impressions']} impressions, {$q['ctr']}% CTR, pos {$q['position']}\n";
}
echo "\n";

// Low CTR opportunities
echo "LOW CTR OPPORTUNITIES (Improve Snippets):\n";
echo str_repeat('-', 60)."\n";
usort($lowCTR, function($a, $b) {
  return $b['impressions'] <=> $a['impressions'];
});

foreach (array_slice($lowCTR, 0, 10) as $q) {
  $intent = classifyIntent($q['query']);
  $role = suggestPageRole($intent);
  echo "  • \"{$q['query']}\" - {$q['impressions']} impressions, {$q['ctr']}% CTR\n";
  echo "    Intent: $intent → Page Role: $role\n";
  echo "    Action: Update title/description to match query intent\n";
}
echo "\n";

// High impression queries
echo "HIGH IMPRESSION QUERIES (Focus Here):\n";
echo str_repeat('-', 60)."\n";
usort($highImpressions, function($a, $b) {
  return $b['impressions'] <=> $a['impressions'];
});

foreach (array_slice($highImpressions, 0, 10) as $q) {
  $intent = classifyIntent($q['query']);
  $role = suggestPageRole($intent);
  echo "  • \"{$q['query']}\" - {$q['impressions']} impressions, {$q['ctr']}% CTR, pos {$q['position']}\n";
  echo "    Intent: $intent → Page Role: $role\n";
}
echo "\n";

echo "=== ANALYSIS COMPLETE ===\n";

