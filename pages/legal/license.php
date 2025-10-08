<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';

$title = "Neural Command License | Terms of Use";
$canonical = Canonical::absolute('/legal/license/');

$licenseText = <<<HTML
<h1>Neural Command License</h1>
<p>This page describes the license governing the Neural Command Agentic Training Kit and related documentation, examples, and code snippets made available on this site.</p>
<ul>
  <li>Permitted use: evaluation, internal testing, and non-exclusive use within your organization.</li>
  <li>Restrictions: no resale, sublicensing, or public redistribution of proprietary code or datasets.</li>
  <li>Attribution: retain original notices; link back to this page for license reference.</li>
</ul>
<p>For commercial licensing or exceptions, contact: <a href="mailto:hello@neuralcommandllc.com">hello@neuralcommandllc.com</a></p>
HTML;

$webPageJson = [
  '@context' => 'https://schema.org',
  '@type' => 'WebPage',
  '@id' => $canonical.'#webpage',
  'url' => $canonical,
  'name' => $title,
  'mainEntityOfPage' => $canonical,
  'license' => $canonical
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($title, ENT_QUOTES) ?></title>
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">
  <script type="application/ld+json"><?= json_encode($webPageJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
</head>
<body>
  <?= $licenseText ?>
</body>
</html>

