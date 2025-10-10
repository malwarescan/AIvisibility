<?php
declare(strict_types=1);
header('Content-Type: application/xml; charset=utf-8');
require_once __DIR__.'/../bootstrap/canonical.php';
require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

$page = max(1, (int)($_GET['page'] ?? 1));

// Build canonical URL list
$urls = [];

// Core pages
$corePages = [
  '/', 
  '/about/', 
  '/services/', 
  '/contact/',
  '/resources/',
  '/resources/diagnostic/',
  '/resources/programmatic-seo-matrix-method/',
  '/resources/llmo-optimization/',
  '/quote-thanks/',
  '/thanks/',
  '/what-is-google-ai-mode/',
  '/how-to-get-featured-in-ai-overviews/',
  '/why-is-my-site-not-showing-in-ai-answers/',
  '/who-controls-which-sites-ai-picks/',
  '/ai-seo-vs-traditional-seo/',
  '/industries/saas/',
  '/industries/healthcare/',
  '/case-studies/crm-ai-visibility/',
  '/case-studies/healthcare-practice-ai-dominance/',
];

foreach ($corePages as $u) {
  $urls[] = ['loc' => Canonical::absolute($u), 'priority' => $u === '/' ? '1.0' : '0.7'];
}

// Add all services
foreach (array_keys($SERVICES) as $s) {
  $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'), 'priority' => '0.8'];
}

// Add all states
foreach (array_keys($STATES) as $sk) {
  $urls[] = ['loc' => Canonical::absolute('/states/'.$sk.'/'), 'priority' => '0.7'];
  
  // Add service×state combinations
  foreach (array_keys($SERVICES) as $s) {
    $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'.$sk.'/'), 'priority' => '0.8'];
  }
  
  // Add service×city combinations for each state
  foreach ($STATES[$sk]['cities'] as $city) {
    $ck = strtolower(str_replace(' ', '-', $city));
    $abbr = $STATES[$sk]['abbr'];
    foreach (array_keys($SERVICES) as $s) {
      $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'.$ck.'-'.$abbr.'/'), 'priority' => '0.8'];
    }
  }
}

// Add service×city combinations for priority cities
foreach (array_keys($CITIES) as $c) {
  foreach (array_keys($SERVICES) as $s) {
    $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'.$c.'/'), 'priority' => '0.8'];
  }
}

// Paginate (45,000 URLs per shard)
$perPage = 45000;
$start = ($page - 1) * $perPage;
$chunk = array_slice($urls, $start, $perPage);

// Output valid XML
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php
$now = gmdate('Y-m-d');
foreach ($chunk as $item):
  $loc = $item['loc'];
  // Sanity check: must be https (or http for localhost), lowercase, ends with slash (or file-like), no params
  $isValid = (
    (str_starts_with($loc, 'https://') || str_starts_with($loc, 'http://')) &&
    strtolower($loc) === $loc &&
    (str_ends_with($loc, '/') || Canonical::isFileLike($loc)) &&
    parse_url($loc, PHP_URL_QUERY) === null
  );
  if (!$isValid) continue;
?>
  <url>
    <loc><?= htmlspecialchars($loc, ENT_XML1) ?></loc>
    <lastmod><?= htmlspecialchars($now, ENT_XML1) ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority><?= htmlspecialchars($item['priority'], ENT_XML1) ?></priority>
  </url>
<?php endforeach; ?>
</urlset>

