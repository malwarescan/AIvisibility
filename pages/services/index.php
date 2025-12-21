<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

$canonical = Canonical::absolute('/services/');
$services = array_keys($SERVICES);

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services']
];

// Set page context for the main template
$ctx = [
  'title' => 'Services | Neural Command',
  'desc' => 'Browse all AI visibility and agentic SEO services from Neural Command. Available across major US cities.'
];
?>
<main class="container py-8">
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
</main>

