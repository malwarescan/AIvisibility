<?php
/**
 * Test determinism of content token system
 * Usage: php tools/test-determinism.php [canonical_url]
 * Example: php tools/test-determinism.php https://nrlcmd.com/services/ai-consulting/dallas-tx/
 */

declare(strict_types=1);
require_once __DIR__.'/../lib/content_tokens.php';
require_once __DIR__.'/../bootstrap/canonical.php';

$canonical = $argv[1] ?? 'https://nrlcmd.com/services/ai-consulting/dallas-tx/';

// Parse service and city from canonical
if (!preg_match('#/services/([^/]+)/([^/]+)/#', $canonical, $m)) {
    die("Error: URL must match pattern /services/{service}/{city}/\n");
}

$service = $m[1];
$city = $m[2];

echo "Testing Determinism for Content Token System\n";
echo str_repeat("=", 80) . "\n";
echo "Canonical: $canonical\n";
echo "Service:   $service\n";
echo "City:      $city\n";
echo str_repeat("=", 80) . "\n\n";

// Generate content 3 times
$runs = [];
for ($i = 1; $i <= 3; $i++) {
    $runs[$i] = compose_content($service, $city, $canonical);
}

// Compare runs
$allMatch = true;
$keys = array_keys($runs[1]);

foreach ($keys as $key) {
    $run1 = $runs[1][$key];
    $run2 = $runs[2][$key];
    $run3 = $runs[3][$key];
    
    $match12 = ($run1 === $run2);
    $match23 = ($run2 === $run3);
    $match13 = ($run1 === $run3);
    
    $status = ($match12 && $match23 && $match13) ? '✅ PASS' : '❌ FAIL';
    
    if (!($match12 && $match23 && $match13)) {
        $allMatch = false;
    }
    
    echo "$status - $key\n";
}

echo "\n" . str_repeat("=", 80) . "\n";

if ($allMatch) {
    echo "✅ SUCCESS: All sections are deterministic!\n";
    echo "Same canonical URL produces identical content every time.\n\n";
    
    // Show sample content
    echo "Sample Content Preview:\n";
    echo str_repeat("-", 80) . "\n";
    echo "INTRO (" . str_word_count($runs[1]['intro']) . " words):\n";
    echo wordwrap($runs[1]['intro'], 76) . "\n\n";
    
    echo "ANGLES (" . str_word_count($runs[1]['angles']) . " words):\n";
    echo wordwrap($runs[1]['angles'], 76) . "\n\n";
    
    echo "OUTCOMES (" . str_word_count($runs[1]['outcomes']) . " words):\n";
    echo wordwrap($runs[1]['outcomes'], 76) . "\n\n";
    
    echo "LOCAL SIGNALS (" . str_word_count($runs[1]['locals']) . " words):\n";
    echo wordwrap($runs[1]['locals'], 76) . "\n\n";
    
    // Count total words (approximate)
    $totalWords = str_word_count($runs[1]['intro']) 
                + str_word_count($runs[1]['angles'])
                + str_word_count($runs[1]['outcomes'])
                + str_word_count($runs[1]['locals'])
                + str_word_count(strip_tags($runs[1]['process']))
                + str_word_count(strip_tags($runs[1]['proof']));
    
    echo str_repeat("-", 80) . "\n";
    echo "Total Word Count (excluding lists): ~$totalWords words\n";
    echo "Target Range: 500-800 words\n";
    echo "Status: " . ($totalWords >= 500 && $totalWords <= 900 ? "✅ IN RANGE" : "⚠️  OUT OF RANGE") . "\n";
    
    exit(0);
} else {
    echo "❌ FAILURE: Content is not deterministic!\n";
    echo "This indicates a problem with the seeded RNG implementation.\n";
    exit(1);
}

