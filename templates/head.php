<?php
require_once __DIR__.'/../lib/schema.php';
require_once __DIR__.'/../inc/seo.php'; // NC: Include SEO helpers

// Non-CreativeWork schemas (render directly)
$nonCreativeSchemas = [ ld_localbusiness(), ld_website() ];

// Add service-specific schemas if present
if (!empty($GLOBALS['serviceSchemas'])) {
  $nonCreativeSchemas = array_merge($nonCreativeSchemas, $GLOBALS['serviceSchemas']);
}

// CreativeWork schemas (use render_jsonld for license & creator)
$creativeSchemas = [ ld_software(), ld_agentic_dataset() ];

// Breadcrumbs (non-CreativeWork)
if (!empty($breadcrumbs ?? [])) {
  $breadcrumbItems = [];
  foreach ($breadcrumbs as $crumb) {
    if (!empty($crumb['label']) && !empty($crumb['url'])) {
      $breadcrumbItems[] = ['name' => $crumb['label'], 'item' => $crumb['url']];
    }
  }
  if ($breadcrumbItems) {
    $nonCreativeSchemas[] = build_breadcrumb_jsonld($breadcrumbItems);
  }
}
?>
<!doctype html>
<html lang="<?= !empty($ctx['lang']) ? esc($ctx['lang']) : 'en' ?>">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= esc($ctx['title']) ?></title>
  <meta name="description" content="<?= esc($ctx['desc']) ?>" />
  <?php 
  // Auto-generate hreflang if not provided
  if (empty($ctx['hreflang'])) {
    $ctx['hreflang'] = I18n::getHreflangData($_SERVER['REQUEST_URI']);
  }
  if (!empty($ctx['hreflang'])): ?>
    <?php foreach ($ctx['hreflang'] as $hreflang): ?>
      <link rel="alternate" hreflang="<?= esc($hreflang['hreflang']) ?>" href="<?= esc($hreflang['href']) ?>" />
    <?php endforeach; ?>
  <?php endif; ?>
  <?php include __DIR__.'/../partials/head.php'; ?>
  <link rel="preload" href="/assets/css/styles.css" as="style" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
<?php 
// Render non-CreativeWork schemas directly
foreach($nonCreativeSchemas as $ld): ?>
  <script type="application/ld+json"><?= json_encode($ld, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
<?php 
// Render CreativeWork schemas with license & creator
foreach($creativeSchemas as $schema): 
  echo render_jsonld($schema);
endforeach; 
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
