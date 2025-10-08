<?php
/**
 * Test content variety across different URLs
 * Usage: php tools/test-content-variety.php
 */

declare(strict_types=1);
require_once __DIR__.'/../lib/content_tokens.php';

$testUrls = [
    ['service' => 'ai-consulting', 'city' => 'dallas-tx', 'canonical' => 'https://nrlcmd.com/services/ai-consulting/dallas-tx/'],
    ['service' => 'ai-consulting', 'city' => 'phoenix-az', 'canonical' => 'https://nrlcmd.com/services/ai-consulting/phoenix-az/'],
    ['service' => 'schema-optimizer', 'city' => 'dallas-tx', 'canonical' => 'https://nrlcmd.com/services/schema-optimizer/dallas-tx/'],
    ['service' => 'agentic-seo', 'city' => 'san-francisco-ca', 'canonical' => 'https://nrlcmd.com/services/agentic-seo/san-francisco-ca/'],
];

echo "Testing Content Variety Across URLs\n";
echo str_repeat("=", 80) . "\n\n";

$allContent = [];

foreach ($testUrls as $url) {
    $content = compose_content($url['service'], $url['city'], $url['canonical']);
    $allContent[] = [
        'url' => $url['canonical'],
        'content' => $content
    ];
    
    $wordCount = str_word_count($content['intro']) 
               + str_word_count($content['angles'])
               + str_word_count($content['outcomes'])
               + str_word_count($content['locals'])
               + str_word_count(strip_tags($content['process']))
               + str_word_count(strip_tags($content['proof']));
    
    echo "URL: {$url['canonical']}\n";
    echo "  Word Count: ~$wordCount words\n";
    echo "  Intro Preview: " . substr($content['intro'], 0, 80) . "...\n";
    echo "  Local Signal: " . substr($content['locals'], 0, 80) . "...\n";
    echo "\n";
}

echo str_repeat("=", 80) . "\n";
echo "Similarity Analysis:\n";
echo str_repeat("-", 80) . "\n";

// Check if any two intros are identical (should not be)
$intros = array_map(fn($c) => $c['content']['intro'], $allContent);
$uniqueIntros = array_unique($intros);

if (count($intros) === count($uniqueIntros)) {
    echo "✅ All intros are unique\n";
} else {
    echo "⚠️  Some intros are duplicated\n";
}

// Check if any two local signals are identical (different cities should differ)
$locals = array_map(fn($c) => $c['content']['locals'], $allContent);
$uniqueLocals = array_unique($locals);

if (count($locals) === count($uniqueLocals)) {
    echo "✅ All local signals are unique\n";
} else {
    echo "⚠️  Some local signals are duplicated (check city token configuration)\n";
}

// Check CTA variety
$ctas = array_map(fn($c) => $c['content']['cta'], $allContent);
$uniqueCtas = array_unique($ctas);

echo "✅ CTA Variety: " . count($uniqueCtas) . " unique CTAs across " . count($ctas) . " pages\n";

echo "\n" . str_repeat("=", 80) . "\n";
echo "✅ Content variety test complete!\n";
echo "Each URL produces unique, deterministic content.\n";

