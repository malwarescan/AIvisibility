<?php
// /insights/index.php — Lightweight Insights listing with schema
$site   = 'https://www.nrlcmd.com';
$org    = 'Neural Command, LLC';
$title  = 'Insights — Neural Command, LLC';
$desc   = 'Research and implementation guides on Agentic SEO, GEO-16, AI Overviews, and schema engineering.';

$posts = [
  [
    'title'       => 'AI Answer Engine Citation Behavior: The GEO-16 Framework Explained',
    'url'         => $site . '/insights/geo-16-framework/',
    'description' => 'How to reach GEO ≥ 0.70 and earn cross-engine citations using structured data, semantic HTML, and freshness signals.',
    'image'       => $site . '/assets/geo16-cover.webp',
    'date'        => '2025-10-11',
    'modified'    => '2025-10-11'
  ],
  // Add future posts here
];

header('Content-Type: text/html; charset=utf-8');
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($title) ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars($desc) ?>">
  <link rel="canonical" href="<?= $site ?>/insights/">

  <style>
    :root { --mx: clamp(16px,3vw,24px); --w: min(980px, 94vw); }
    body{font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,sans-serif;color:#141414;margin:0;background:#fff}
    header,main,footer{margin:0 auto;max-width:var(--w);padding:1.5rem var(--mx)}
    h1{font-size:clamp(28px,4vw,40px);line-height:1.2;margin:0 0 .5rem}
    .grid{display:grid;grid-template-columns:1fr;gap:1rem}
    @media(min-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}
    .card{border:1px solid #e6e7e9;border-radius:12px;overflow:hidden}
    .card img{width:100%;height:auto;display:block}
    .card .b{padding:1rem}
    .card h2{font-size:1.1rem;margin:0 0 .4rem}
    .meta{color:#666;font-size:.9rem}
    nav.breadcrumb{font-size:.9rem;color:#666;margin:.25rem 0 1rem}
    nav.breadcrumb a{color:#444;text-decoration:none}
    nav.breadcrumb span{margin:0 .35rem}
  </style>

  <!-- JSON-LD: WebPage (CollectionPage) + ItemList + Breadcrumb + WebSite + Organization -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "name":"Insights",
    "url":"<?= $site ?>/insights/",
    "description":"<?= htmlspecialchars($desc) ?>",
    "mainEntity":{
      "@type":"ItemList",
      "itemListElement":[
        <?php foreach ($posts as $i => $p): ?>
        {
          "@type":"ListItem",
          "position": <?= $i+1 ?>,
          "url": "<?= $p['url'] ?>",
          "name": "<?= htmlspecialchars($p['title']) ?>"
        }<?= $i+1 < count($posts) ? ',' : '' ?>

        <?php endforeach; ?>
      ]
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"<?= $site ?>/" },
      {"@type":"ListItem","position":2,"name":"Insights","item":"<?= $site ?>/insights/" }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"<?= $org ?>",
    "url":"<?= $site ?>/",
    "logo":"<?= $site ?>/assets/logo.png",
    "sameAs":[
      "https://www.linkedin.com/company/neural-command/",
      "https://g.co/kgs/EP6p5de"
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "url":"<?= $site ?>/",
    "name":"<?= $org ?>",
    "potentialAction":{
      "@type":"SearchAction",
      "target":"<?= $site ?>/search?q={search_term_string}",
      "query-input":"required name=search_term_string"
    }
  }
  </script>
</head>
<body>
<header>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="<?= $site ?>/">Home</a><span>/</span>
    <strong>Insights</strong>
  </nav>
  <h1>Insights</h1>
  <p class="meta">Technical briefs and deploy-ready guides on Agentic SEO and AI citation engineering.</p>
</header>

<main>
  <section class="grid" aria-label="Articles">
    <?php foreach ($posts as $p): ?>
      <article class="card">
        <?php if (!empty($p['image'])): ?>
          <a href="<?= $p['url'] ?>"><img src="<?= $p['image'] ?>" alt=""></a>
        <?php endif; ?>
        <div class="b">
          <h2><a href="<?= $p['url'] ?>" style="text-decoration:none;color:inherit"><?= htmlspecialchars($p['title']) ?></a></h2>
          <p class="meta">
            <time datetime="<?= $p['date'] ?>"><?= date('F j, Y', strtotime($p['date'])) ?></time>
            <?php if ($p['modified'] && $p['modified'] !== $p['date']): ?>
              · Updated <time datetime="<?= $p['modified'] ?>"><?= date('F j, Y', strtotime($p['modified'])) ?></time>
            <?php endif; ?>
          </p>
          <p><?= htmlspecialchars($p['description']) ?></p>
        </div>
      </article>
    <?php endforeach; ?>
  </section>
</main>

<footer>
  <hr>
  <p><strong><?= $org ?></strong> — 1639 11th St Suite 110-A, Santa Monica, CA 90404 · +1 844-568-4624</p>
</footer>
</body>
</html>
