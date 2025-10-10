<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';
require_once __DIR__.'/../../lib/links.php';

$service = $_GET['service'] ?? 'ai-consulting';
$service = Canonical::kebab($service);

// Check if we have a dedicated service page
$servicePageFile = __DIR__ . '/' . $service . '.php';
if (file_exists($servicePageFile)) {
    // Include the dedicated service page
    include $servicePageFile;
    return;
}

// Fallback to generic service hub for services without dedicated pages
$canonical = Canonical::absolute('/services/'.$service.'/');

// Get cities for this service (top cities as example)
$cities = array_keys($CITIES);

$serviceInfo = $SERVICES[$service] ?? ['name' => ucwords(str_replace('-', ' ', $service)), 'short' => 'Professional AI visibility services'];

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => $serviceInfo['name']]
];

// Set page context for the main template
$ctx = [
  'title' => $serviceInfo['name'] . ' — Cities | Neural Command',
  'desc' => $serviceInfo['name'] . ' available in major US cities. Click to view location-specific information.'
];
?>
<main class="container py-8">
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
</main>

