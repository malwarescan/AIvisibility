<?php
declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

// Set 404 status (already set in index.php, but ensure it's set)
http_response_code(404);

// Set page context
$ctx = [
  'title' => '404 Not Found — Neural Command',
  'desc' => 'The requested page could not be found.'
];

// Set breadcrumbs
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => '404']
];
?>
<main class="container py-8">
  <h1>404 Not Found</h1>
  <p>The page you're looking for doesn't exist or has been moved.</p>
  <p>
    <a href="<?= Canonical::absolute('/') ?>">Return to homepage</a> | 
    <a href="<?= Canonical::absolute('/services/') ?>">Browse services</a> | 
    <a href="<?= Canonical::absolute('/contact/') ?>">Contact us</a>
  </p>
</main>

