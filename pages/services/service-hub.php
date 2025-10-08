<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';
require_once __DIR__.'/../../lib/links.php';

$service = $_GET['service'] ?? 'ai-consulting';
$service = Canonical::kebab($service);
$canonical = Canonical::absolute('/services/'.$service.'/');

// Get cities for this service (top cities as example)
$cities = array_keys($CITIES);

$serviceInfo = $SERVICES[$service] ?? ['name' => ucwords(str_replace('-', ' ', $service)), 'short' => 'Professional AI visibility services'];
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($serviceInfo['name'], ENT_QUOTES) ?> — Cities | Neural Command</title>
  <meta name="description" content="<?= htmlspecialchars($serviceInfo['name'], ENT_QUOTES) ?> available in major US cities. Click to view location-specific information.">
  <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">
  <meta name="robots" content="index,follow">
</head>
<body>
  <h1><?= htmlspecialchars($serviceInfo['name'], ENT_QUOTES) ?></h1>
  <p><?= htmlspecialchars($serviceInfo['short'], ENT_QUOTES) ?></p>
  
  <h2>Available in These Cities</h2>
  <ul>
    <?php foreach($cities as $citySlug): 
      $cityData = $CITIES[$citySlug];
      $url = link_service_city($service, $citySlug);
    ?>
    <li>
      <a href="<?= htmlspecialchars($url, ENT_QUOTES) ?>">
        <?= htmlspecialchars($serviceInfo['name'].' in '.$cityData['name'], ENT_QUOTES) ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
  
  <p><a href="<?= Canonical::absolute('/services/') ?>">← All Services</a></p>
</body>
</html>

