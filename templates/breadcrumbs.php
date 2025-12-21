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
  // Breadcrumb JSON-LD now handled by unified @graph system in templates/head.php
?>
<?php endif; ?>
