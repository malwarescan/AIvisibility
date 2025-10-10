<?php
/** @var array $city */
/** @var int $seed */

$title = "AI Consulting in {$city['city']}" . ($city['region'] ? ", {$city['region']}" : "") . " | Neural Command";
$meta  = "Agentic SEO, schema optimization, and AI visibility for {$city['city']}. Book a consult or request a quote today.";
$h1    = "Agentic SEO & AI Consulting for {$city['city']}";
$intro = TokenEngine::intro($city['city'], (string)$city['region'], (string)$city['alt_service'], $seed, $city);
$faqs  = TokenEngine::faqs($city['city'], (string)$city['alt_service'], $seed, $city);
$url   = "https://nrlcmd.com/ai-consulting/{$city['slug']}/";

?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($title) ?></title>
  <meta name="description" content="<?= htmlspecialchars($meta) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="agent" href="/agent.json">
  <link rel="alternate" type="application/json" href="/.well-known/agent.json">
  <link rel="preconnect" href="https://nrlcmd.com" crossorigin>
  <link rel="dns-prefetch" href="//nrlcmd.com">

  <?php // Sitewide WebSite JSON-LD (emit once sitewide in your head partial); included here if standalone ?>
  <?php Schema::emit(Schema::website()); ?>

  <?php // Page-specific JSON-LD blocks ?>
  <?php Schema::emit(Schema::localBusiness($city)); ?>
  <?php Schema::emit(Schema::service($city)); ?>
  <?php Schema::emit(Schema::faq($url, $faqs)); ?>
  <?php Schema::emit(Schema::breadcrumb([
    "Home" => "https://nrlcmd.com/",
    "AI Consulting" => "https://nrlcmd.com/ai-consulting/",
    $city['city'] => $url
  ])); ?>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; color: #0b0b0c; }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 24px; }
    .hero { padding: 32px 0; }
    .cta { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
    .btn { border: 1px solid #0b0b0c; padding: 10px 14px; text-decoration: none; }
    .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; }
    .col-7 { grid-column: span 7; }
    .col-5 { grid-column: span 5; }
    @media (max-width: 900px){ .grid { display:block; } }
    ul.links { padding-left: 18px; }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <h1><?= htmlspecialchars($h1) ?></h1>
      <p><?= htmlspecialchars($intro) ?></p>
      <div class="cta">
        <a class="btn" href="/api/book"  aria-label="Book a consultation">Book consult</a>
        <a class="btn" href="/api/quote" aria-label="Request a quote">Request quote</a>
        <a class="btn" href="/api/audit" aria-label="Run AI visibility audit">Run audit</a>
      </div>
    </section>

    <section class="grid">
      <div class="col-7">
        <h2>Services for <?= htmlspecialchars($city['city']) ?></h2>
        <p>We deploy <?= htmlspecialchars($city['alt_service']) ?>, schema coverage, internal link scaffolds,
           and an agent manifest so AI systems can act on your pages for <?= htmlspecialchars($city['city']) ?>.</p>

        <h3>FAQs</h3>
        <dl>
          <?php foreach ($faqs as [$q,$a]): ?>
            <dt><strong><?= htmlspecialchars($q) ?></strong></dt>
            <dd><?= htmlspecialchars($a) ?></dd>
          <?php endforeach; ?>
        </dl>
      </div>
      <div class="col-5">
        <h3>Get in touch</h3>
        <p>Phone: <a href="tel:<?= htmlspecialchars($city['cta_phone']) ?>"><?= htmlspecialchars($city['cta_phone']) ?></a><br>
           Email: <a href="mailto:<?= htmlspecialchars($city['cta_email']) ?>"><?= htmlspecialchars($city['cta_email']) ?></a></p>

        <h3>Related links</h3>
        <ul class="links">
          <li><a href="/services/">All services</a></li>
          <li><a href="/resources/diagnostic/">AI Visibility Diagnostic</a></li>
          <li><a href="/agent.json">Agent manifest</a></li>
        </ul>
      </div>
    </section>
  </div>
</body>
</html>
