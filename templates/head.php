<?php
require_once __DIR__.'/../lib/schema_utils.php';

// --- Core IDs/URLs
$BASE = nc_base_url();
$PAGE = nc_page_url();
$LANG = nc_lang_for_url($PAGE);

$orgId      = nc_org_id();
$siteId     = nc_site_id();
$webpageId  = nc_id('#webpage');
$crumbId    = nc_id('#breadcrumb');

// --- Organization & Website
$graph = [
  [
    "@type" => "Organization",
    "@id"   => $orgId,
    "name"  => "Neural Command, LLC",
    "url"   => $BASE."/",
    "logo"  => [
      "@type" => "ImageObject",
      "@id"   => $orgId."#logo",
      "url"   => nc_logo_url()
    ],
    "telephone" => "+1-844-568-4624",
    "address" => [
      "@type" => "PostalAddress",
      "streetAddress"   => "1639 11th St Suite 110-A",
      "addressLocality" => "Santa Monica",
      "addressRegion"   => "CA",
      "postalCode"      => "90404",
      "addressCountry"  => "US"
    ],
    "sameAs" => [
      "https://www.linkedin.com/company/neural-command/",
      "https://g.co/kgs/EP6p5de"
    ]
  ],
  [
    "@type" => "WebSite",
    "@id"   => $siteId,
    "url"   => $BASE."/",
    "name"  => "Neural Command",
    "publisher" => [ "@id" => $orgId ]
    // Note: Sitelinks Search box no longer renders; ok to omit SearchAction.
  ],
  [
    "@type" => "WebPage",
    "@id"   => $webpageId,
    "url"   => $PAGE,
    "inLanguage" => $LANG,
    "isPartOf"   => [ "@id" => $siteId ],
    "about"      => [ "@id" => $orgId ],
    "breadcrumb" => [ "@id" => $crumbId ]
  ]
];

// --- BreadcrumbList: build from existing PHP breadcrumb array if available
// Expect $BREADCRUMBS like: [ ['name'=>'Home','url'=>'/'], ... ]
if (!isset($BREADCRUMBS) || !is_array($BREADCRUMBS) || empty($BREADCRUMBS)) {
  // Fallback: infer basic crumbs from URL
  $path = trim(parse_url($PAGE, PHP_URL_PATH), '/');
  $parts = $path === '' ? [] : explode('/', $path);
  $accum = '';
  $BREADCRUMBS = [['name' => 'Home', 'url' => $BASE.'/']];
  foreach ($parts as $p) {
    $accum .= '/'.$p;
    $BREADCRUMBS[] = ['name' => ucwords(str_replace('-', ' ', $p)), 'url' => $BASE.$accum.'/'];
  }
}
$itemListElement = [];
$pos = 1;
foreach ($BREADCRUMBS as $c) {
  $itemListElement[] = [
    "@type" => "ListItem",
    "position" => $pos++,
    "name" => $c['name'],
    "item" => $c['url']
  ];
}
$graph[] = [
  "@type" => "BreadcrumbList",
  "@id"   => $crumbId,
  "itemListElement" => $itemListElement
];

// --- Page-specific schemas appended by pages/* via $GLOBALS['schema_nodes']
$GLOBALS['schema_nodes'] = $GLOBALS['schema_nodes'] ?? [];

// Legacy support: migrate old keys to schema_nodes
if (!empty($GLOBALS['serviceSchemas']) && is_array($GLOBALS['serviceSchemas'])) {
  foreach ($GLOBALS['serviceSchemas'] as $node) {
    if (is_array($node) && !empty($node['@type'])) {
      $GLOBALS['schema_nodes'][] = $node;
    }
  }
}
if (!empty($GLOBALS['articleSchema']) && is_array($GLOBALS['articleSchema']) && !empty($GLOBALS['articleSchema']['@type'])) {
  $GLOBALS['schema_nodes'][] = $GLOBALS['articleSchema'];
}
if (!empty($GLOBALS['videoSchema']) && is_array($GLOBALS['videoSchema']) && !empty($GLOBALS['videoSchema']['@type'])) {
  $GLOBALS['schema_nodes'][] = $GLOBALS['videoSchema'];
}
if (!empty($GLOBALS['contactPointSchema']) && is_array($GLOBALS['contactPointSchema']) && !empty($GLOBALS['contactPointSchema']['@type'])) {
  $GLOBALS['schema_nodes'][] = $GLOBALS['contactPointSchema'];
}

// --- Merge page-provided schema nodes into graph (flat array)
foreach ($GLOBALS['schema_nodes'] as $node) {
  if (is_array($node) && !empty($node['@type'])) {
    $graph[] = $node;
  }
}

// --- Schema Enforcement (Master Schema Matrix)
require_once __DIR__.'/../lib/schema_enforcement.php';
$pageType = SchemaEnforcement::getPageType(parse_url($PAGE, PHP_URL_PATH) ?? '/');
$graph = SchemaEnforcement::cleanGraph($graph, $pageType);

// --- Convert to @graph structure for output
$graphStructure = [
  '@context' => 'https://schema.org',
  '@graph' => $graph
];
?>
<!doctype html>
<html lang="<?= !empty($ctx['lang']) ? esc($ctx['lang']) : 'en' ?>">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <title><?= esc($ctx['title']) ?></title>
  <meta name="description" content="<?= esc($ctx['desc']) ?>" />
<?php 
// Canonical + hreflang cluster
$canonical = $PAGE;
$alt_en = str_replace('/ko/', '/', $PAGE);
$alt_ko = str_contains($PAGE, '/ko/') ? $PAGE : rtrim($BASE.'/ko'.parse_url($PAGE, PHP_URL_PATH), '/').'/';
?>
<link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">
<link rel="alternate" hreflang="en" href="<?= htmlspecialchars($alt_en, ENT_QUOTES) ?>">
<link rel="alternate" hreflang="ko" href="<?= htmlspecialchars($alt_ko, ENT_QUOTES) ?>">
<link rel="alternate" hreflang="x-default" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">
  <?php include __DIR__.'/../partials/head.php'; ?>
         <link rel="preload" href="/assets/css/styles.css?v=<?= time() ?>" as="style" />
         <link rel="stylesheet" href="/assets/css/styles.css?v=<?= time() ?>" />
<?php 
// Emit one unified @graph
echo '<script type="application/ld+json">'.json_encode($graphStructure, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const nav = document.querySelector('.header .nav');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if (!nav || !toggle) return;
      toggle.addEventListener('click', function() {
        const open = nav.classList.contains('open');
        nav.classList.toggle('open', !open);
        toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  </script>
</head>
<body>
