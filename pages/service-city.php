<?php
$slug = Canonical::kebab($_GET['slug'] ?? '');
$citySlug = Canonical::kebab($_GET['city'] ?? '');
$canonical = Canonical::absolute("/services/$slug/$citySlug/");
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= esc(ucwords(str_replace('-', ' ', $slug)).' – '.ucwords(str_replace('-', ' ', $citySlug))) ?></title>
  <?php include __DIR__.'/../partials/head.php'; ?>
</head>
<body>
  <h1><?= esc(ucwords(str_replace('-', ' ', $slug))) ?> — <?= esc(ucwords(str_replace('-', ' ', $citySlug))) ?></h1>
  <p>Canonical URL: <a href="<?= esc($canonical) ?>"><?= esc($canonical) ?></a></p>
</body>
</html>

