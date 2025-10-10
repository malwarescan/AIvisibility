<?php
declare(strict_types=1);
header('Content-Type: application/xml; charset=utf-8');
$host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
require_once __DIR__.'/../bootstrap/canonical.php';
require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

// Calculate total URLs using same logic as sitemap.page.php
$urls = [];

// Core pages
$corePages = [
  '/', 
  '/about', 
  '/services', 
  '/contact',
  '/resources',
  '/resources/diagnostic',
  '/resources/programmatic-seo-matrix-method',
  '/resources/llmo-optimization',
  '/quote-thanks',
  '/thanks',
  '/what-is-google-ai-mode',
  '/how-to-get-featured-in-ai-overviews',
  '/why-is-my-site-not-showing-in-ai-answers',
  '/who-controls-which-sites-ai-picks',
  '/ai-seo-vs-traditional-seo',
  '/industries/saas',
  '/industries/healthcare',
  '/case-studies/crm-ai-visibility',
  '/case-studies/healthcare-practice-ai-dominance',
];

foreach ($corePages as $u) {
  $urls[] = ['loc' => Canonical::absolute($u), 'priority' => $u === '/' ? '1.0' : '0.7'];
}

// Add all services
foreach (array_keys($SERVICES) as $s) {
  $urls[] = ['loc' => Canonical::absolute('/services/'.$s), 'priority' => '0.8'];
}

// Add all states
foreach (array_keys($STATES) as $sk) {
  $urls[] = ['loc' => Canonical::absolute('/states/'.$sk), 'priority' => '0.7'];
  
  // Add service×state combinations
  foreach (array_keys($SERVICES) as $s) {
    $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'.$sk), 'priority' => '0.8'];
  }
  
  // Add service×city combinations for each state
  foreach ($STATES[$sk]['cities'] as $city) {
    $ck = strtolower(str_replace(' ', '-', $city));
    $abbr = $STATES[$sk]['abbr'];
    foreach (array_keys($SERVICES) as $s) {
      $urls[] = ['loc' => Canonical::absolute('/services/'.$s.'/'.$ck.'-'.$abbr), 'priority' => '0.8'];
    }
  }
}

$per = 45000;
$total = count($urls);
$pages = max(1, (int)ceil($total/$per));
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"; ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php for($i=1;$i<=$pages;$i++): ?>
  <sitemap>
    <loc><?= htmlspecialchars('https://'.$host.'/sitemaps/sitemap-'.$i.'.xml', ENT_XML1) ?></loc>
    <lastmod><?= gmdate('c') ?></lastmod>
  </sitemap>
<?php endfor; ?>
</sitemapindex>
