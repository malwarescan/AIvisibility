<?php
/**
 * CLI tool to diagnose canonical issues
 * Usage: php tools/diagnose-canonical-issues.php [base_url] [paths...]
 * Example: php tools/diagnose-canonical-issues.php https://nrlcmd.com /services/AI-Consulting/Dallas-TX /services//schema-optimizer//LONDON-UK?utm_source=x
 */

declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

array_shift($argv); // Remove script name
$base = array_shift($argv) ?? 'https://nrlcmd.com';

// If no paths provided, use default test cases
if (empty($argv)) {
    $argv = [
        '/Services/AI-Consulting/San-Francisco-CA/',
        '/services/ai-consulting/san-francisco-ca',
        '/services/ai-consulting/san-francisco-ca/',
        '/services//ai-consulting//san-francisco-ca/',
        '/services/ai-consulting/san-francisco-ca/?utm_source=test',
        '/SERVICES/AI-CONSULTING/SAN-FRANCISCO-CA/',
    ];
}

echo "Canonical URL Normalization Test\n";
echo str_repeat("=", 80) . "\n\n";

foreach ($argv as $path) {
    $url = str_starts_with($path, 'http') ? $path : rtrim($base,'/').'/'.ltrim($path,'/');
    
    // Test with curl
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_NOBODY => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HEADER => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5
    ]);
    
    $headers = curl_exec($ch);
    preg_match('/^HTTP\/[0-9.]+\s+(\d+)/m', $headers, $m);
    $code = $m[1] ?? '?';
    preg_match('/\nLocation:\s*(.*?)\r?\n/i', $headers, $m2);
    $location = trim($m2[1] ?? '');
    curl_close($ch);
    
    echo "Input:    " . $url . "\n";
    echo "Status:   HTTP " . $code . "\n";
    if ($location) {
        echo "Redirect: " . $location . "\n";
    }
    echo str_repeat("-", 80) . "\n";
}

echo "\nExpected Behavior:\n";
echo "- Mixed case URLs should 301 to lowercase\n";
echo "- URLs without trailing slash should 301 to add slash\n";
echo "- URLs with tracking params should 301 to strip params\n";
echo "- Final canonical should return HTTP 200\n";

