<?php if (!empty($breadcrumbs) && is_array($breadcrumbs) && count($breadcrumbs) > 1): ?>
<nav class="breadcrumb container" aria-label="Breadcrumb">
  <ol>
    <?php foreach ($breadcrumbs as $index => $crumb): ?>
      <?php
        $isLast = $index === array_key_last($breadcrumbs);
        $name = esc($crumb['label'] ?? ($crumb['name'] ?? ''));
        $url = $crumb['url'] ?? ($crumb['item'] ?? null);
      ?>
      <li>
        <?php if ($url && !$isLast): ?>
          <a href="<?= esc($url) ?>"><?= $name ?></a>
        <?php else: ?>
          <span aria-current="page"><?= $name ?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>
<?php
  // Emit breadcrumb JSON-LD for consistency
  if (!function_exists('build_breadcrumb_jsonld')) {
    require_once __DIR__.'/../lib/seo.php';
  }
  $ldItems = [];
  foreach ($breadcrumbs as $crumb) {
    if (!empty($crumb['label']) && !empty($crumb['url'])) {
      $ldItems[] = ['name' => $crumb['label'], 'item' => $crumb['url']];
    }
  }
  if ($ldItems) {
    $breadcrumbJson = build_breadcrumb_jsonld($ldItems);
    echo '<script type="application/ld+json">'.json_encode($breadcrumbJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }
?>
<?php endif; ?>
