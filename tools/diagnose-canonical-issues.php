<?php
/**
 * CLI tool to diagnose canonical issues
 * Usage: php tools/diagnose-canonical-issues.php
 */

declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

$testUrls = [
    // Variations that should all canonicalize to the same URL
    '/Services/AI-Consulting/San-Francisco-CA/',  // Mixed case
    '/services/ai-consulting/san-francisco-ca',    // No trailing slash
    '/services/ai-consulting/san-francisco-ca/',   // Correct
    '/services//ai-consulting//san-francisco-ca/', // Double slashes
    '/services/ai-consulting/san-francisco-ca/?utm_source=test', // Query params
    '/SERVICES/AI-CONSULTING/SAN-FRANCISCO-CA/',   // All uppercase
];

echo "Canonical URL Normalization Test\n";
echo str_repeat("=", 60) . "\n\n";

foreach ($testUrls as $url) {
    $normalized = Canonical::normalizePath($url);
    $absolute = Canonical::absolute($url);
    
    echo "Input:      " . $url . "\n";
    echo "Normalized: " . $normalized . "\n";
    echo "Absolute:   " . $absolute . "\n";
    echo str_repeat("-", 60) . "\n";
}

echo "\nExpected: All should normalize to:\n";
echo "/services/ai-consulting/san-francisco-ca/\n";
echo "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/\n";

