<?php
$lds = [ ld_localbusiness(), ld_website(), ld_software(), ld_agentic_dataset() ];

if (!empty($breadcrumbs ?? [])) {
  $breadcrumbItems = [];
  foreach ($breadcrumbs as $crumb) {
    if (!empty($crumb['label']) && !empty($crumb['url'])) {
      $breadcrumbItems[] = ['name' => $crumb['label'], 'item' => $crumb['url']];
    }
  }
  if ($breadcrumbItems) {
    $lds[] = build_breadcrumb_jsonld($breadcrumbItems);
  }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= esc($ctx['title']) ?></title>
  <meta name="description" content="<?= esc($ctx['desc']) ?>" />
  <?php include __DIR__.'/../partials/head.php'; ?>
  <link rel="preload" href="/assets/css/styles.css" as="style" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
  <script defer src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script defer src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script defer src="/js/react-app.js"></script>
<?php foreach($lds as $ld): ?>
  <script type="application/ld+json"><?= json_encode($ld, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
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
