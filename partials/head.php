<?php
declare(strict_types=1);
$reqPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$canonicalHref = Canonical::absolute($reqPath);

// Determine robots meta based on URL parameters
// Only consider user-facing parameters, not internal routing parameters
$internalParams = ['service', 'city', 'state', 'page', 'slug'];
$userParams = array_diff_key($_GET, array_flip($internalParams));
$hasParams = !empty($userParams);
$robotsContent = $hasParams ? 'noindex,follow' : 'index,follow,max-image-preview:large';
?>
<link rel="canonical" href="<?= htmlspecialchars($canonicalHref, ENT_QUOTES) ?>">
<meta name="robots" content="<?= $robotsContent ?>">

<!-- Agent discovery -->
<link rel="agent" href="/agent.json">
<link rel="alternate" type="application/json" href="/.well-known/agent.json">

<!-- Performance hints -->
<link rel="preconnect" href="https://nrlcmd.com" crossorigin>
<link rel="dns-prefetch" href="//nrlcmd.com">

<?php include __DIR__ . '/jsonld-website.php'; ?>

