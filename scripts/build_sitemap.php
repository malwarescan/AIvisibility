<?php
// scripts/build_sitemap.php  // NC: Generates public/sitemap.xml with lastmod & priorities
require_once __DIR__ . '/../inc/seo.php';
require_once __DIR__ . '/../config.php';

$base = nc_base_url();

// Define routes (expand with your real list or load from DB/CMS)
$routes = [
  ['path' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
  ['path' => '/services/agentic-seo/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/generative-engine-optimization/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/chatgpt-seo/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/ai-discovery-services/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/ai-search-optimization/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/answer-engine-optimization/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/ai-recommendation-consulting/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/schema-optimizer/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/ai-consulting/', 'priority' => '0.8', 'changefreq' => 'daily'],
  ['path' => '/services/', 'priority' => '0.7', 'changefreq' => 'weekly'],
  ['path' => '/about/', 'priority' => '0.6', 'changefreq' => 'monthly'],
  ['path' => '/contact/', 'priority' => '0.7', 'changefreq' => 'monthly'],
  ['path' => '/resources/', 'priority' => '0.6', 'changefreq' => 'weekly'],
  ['path' => '/resources/llmo-optimization/', 'priority' => '0.7', 'changefreq' => 'weekly'],
  // NC: Add more service/city pages here
];

// Compute lastmod from file mtime where possible
function route_lastmod(string $path): string {
  $candidates = [
    $_SERVER['DOCUMENT_ROOT'] . rtrim($path, '/') . '/index.php',
    $_SERVER['DOCUMENT_ROOT'] . rtrim($path, '/'), // fallback
  ];
  foreach ($candidates as $file) {
    if (is_file($file)) {
      $t = filemtime($file);
      if ($t) return gmdate('c', $t);
    }
  }
  return gmdate('c'); // default now
}

$items = [];
foreach ($routes as $r) {
  $loc = $base . rtrim($r['path'], '/') . '/';
  if ($r['path'] === '/') $loc = $base . '/';
  $lastmod = route_lastmod($r['path']);
  $changefreq = $r['changefreq'] ?? 'weekly';
  $priority = $r['priority'] ?? '0.6';
  $items[] = "<url>\n<loc>{$loc}</loc>\n<lastmod>{$lastmod}</lastmod>\n<changefreq>{$changefreq}</changefreq>\n<priority>{$priority}</priority>\n</url>";
}

$xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" . implode("\n", $items) . "\n</urlset>\n";

$target = __DIR__ . '/../public/sitemap.xml';
file_put_contents($target, $xml);
echo "Wrote sitemap to {$target}\n";
