<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';
require_once __DIR__.'/../../lib/links.php';

$state = strtolower($_GET['state'] ?? 'tx');
$canonical = Canonical::absolute('/services/state/'.$state.'/');

// Get state info
$stateData = $STATES[$state] ?? ['name' => strtoupper($state), 'cities' => [], 'abbr' => strtoupper($state)];
$services = array_keys($SERVICES);

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => $stateData['name']]
];

// Set page context for the main template
$ctx = [
  'title' => 'Services in ' . $stateData['name'] . ' | Neural Command',
  'desc' => 'Neural Command AI visibility and agentic SEO services available across ' . $stateData['name'] . '.'
];
?>
<main class="container py-8">
  <h1>Neural Command Services in <?= htmlspecialchars($stateData['name'], ENT_QUOTES) ?></h1>
  <p>We provide AI visibility optimization and agentic SEO services to businesses across <?= htmlspecialchars($stateData['name'], ENT_QUOTES) ?>.</p>
  
  <?php foreach($services as $serviceSlug): 
    $serviceInfo = $SERVICES[$serviceSlug];
  ?>
  <h2><?= htmlspecialchars($serviceInfo['name'], ENT_QUOTES) ?></h2>
  <ul>
    <?php foreach($stateData['cities'] as $cityName): 
      $citySlug = Canonical::kebab($cityName).'-'.$stateData['abbr'];
      $url = link_service_city($serviceSlug, $citySlug);
    ?>
    <li>
      <a href="<?= htmlspecialchars($url, ENT_QUOTES) ?>">
        <?= htmlspecialchars($cityName.', '.$stateData['abbr'], ENT_QUOTES) ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
  <?php endforeach; ?>
  
  <p><a href="<?= Canonical::absolute('/services/') ?>">← All Services</a></p>
</main>

