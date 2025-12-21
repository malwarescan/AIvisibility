<?php
/** @var array $city */
/** @var int $seed */

$title = "AI Consulting in {$city['city']}" . ($city['region'] ? ", {$city['region']}" : "") . " | Neural Command";
$meta  = "Agentic SEO, schema optimization, and AI visibility for {$city['city']}. Book a consult or request a quote today.";
$h1    = "Agentic SEO & AI Consulting for {$city['city']}";
$intro = TokenEngine::intro($city['city'], (string)$city['region'], (string)$city['alt_service'], $seed, $city);
$faqs  = TokenEngine::faqs($city['city'], (string)$city['alt_service'], $seed, $city);
$url   = "https://nrlcmd.com/ai-consulting/{$city['slug']}/";

// Output content for main template
echo '<main class="container py-8">';
echo '<h1>' . htmlspecialchars($h1) . '</h1>';
echo '<div class="intro">' . $intro . '</div>';
echo '<div class="faqs">' . $faqs . '</div>';
echo '</main>';
