<?php
declare(strict_types=1);
$reqPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$canonicalHref = Canonical::absolute($reqPath);
?>
<link rel="canonical" href="<?= htmlspecialchars($canonicalHref, ENT_QUOTES) ?>">
<meta name="robots" content="index,follow,max-image-preview:large">

<!-- Agent discovery -->
<link rel="agent" href="/agent.json">
<link rel="alternate" type="application/json" href="/.well-known/agent.json">

<!-- Performance hints -->
<link rel="preconnect" href="https://nrlcmd.com" crossorigin>
<link rel="dns-prefetch" href="//nrlcmd.com">

<?php include __DIR__ . '/jsonld-website.php'; ?>

