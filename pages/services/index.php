<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

$canonical = Canonical::absolute('/services/');
$services = array_keys($SERVICES);
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Services | Neural Command</title>
  <meta name="description" content="Browse all AI visibility and agentic SEO services from Neural Command. Available across major US cities.">
  <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">
  <meta name="robots" content="index,follow">
</head>
<body>
  <h1>Neural Command Services</h1>
  <p>Explore our complete suite of AI visibility, agentic SEO, and schema optimization services. Available in cities nationwide.</p>
  
  <h2>All Services</h2>
  <ul>
    <?php foreach($services as $slug): 
      $svc = $SERVICES[$slug];
      $url = Canonical::absolute('/services/'.$slug.'/');
    ?>
    <li>
      <a href="<?= htmlspecialchars($url, ENT_QUOTES) ?>">
        <strong><?= htmlspecialchars($svc['name'], ENT_QUOTES) ?></strong>
      </a>
      <br><?= htmlspecialchars($svc['short'], ENT_QUOTES) ?>
    </li>
    <?php endforeach; ?>
  </ul>
  
  <p><a href="<?= Canonical::absolute('/') ?>">← Back to Home</a></p>
</body>
</html>

