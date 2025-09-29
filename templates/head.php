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
  <link rel="canonical" href="<?= esc(canonical($_SERVER['REQUEST_URI'])) ?>" />
  <link rel="preload" href="/assets/css/styles.css" as="style" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
<?php foreach($lds as $ld): ?>
  <script type="application/ld+json"><?= json_encode($ld, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
  <script>
    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
      const toggle = document.querySelector('.mobile-menu-toggle');
      const nav = document.querySelector('.header .nav');
      
      if (toggle && nav) {
        toggle.addEventListener('click', function() {
          const isOpen = nav.classList.contains('open');
          
          if (isOpen) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            nav.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
        
        // Close menu when clicking on a link
        nav.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  </script>
</head>
<body>

