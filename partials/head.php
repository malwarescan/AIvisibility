<?php
declare(strict_types=1);
$reqPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$canonicalHref = Canonical::absolute($reqPath);
?>
<link rel="canonical" href="<?= htmlspecialchars($canonicalHref, ENT_QUOTES) ?>">
<meta name="robots" content="index,follow">

