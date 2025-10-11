<?php
// insights/geo-16-framework/index.php

// --------- Page Vars ----------
$site_domain   = 'https://www.nrlcmd.com';
$path          = '/insights/geo-16-framework/';
$url           = $site_domain . $path;
$title         = 'AI Answer Engine Citation Behavior: The GEO-16 Framework Explained';
$desc          = 'Neural Command, LLC explains GEO-16 — a 16-pillar model that improves AI citation likelihood via structured data, semantic HTML, and metadata freshness.';
$cover_img     = $site_domain . '/assets/geo16-cover.webp'; // replace if different
$published     = '2025-10-11';
$modified      = '2025-10-11';
$author_name   = 'Neural Command, LLC';

// Business info (from your brief)
$org_name      = 'Neural Command, LLC';
$org_url       = 'https://www.nrlcmd.com';
$org_logo      = $site_domain . '/assets/logo.png'; // replace if different
$org_phone     = '+1 844-568-4624';
$org_phone_nat = '(844) 568-4624';
$org_linkedin  = 'https://www.linkedin.com/company/neural-command/';
$org_gkp       = 'https://g.co/kgs/EP6p5de';
$org_addr = [
  'streetAddress'   => '1639 11th St Suite 110-A',
  'addressLocality' => 'Santa Monica',
  'addressRegion'   => 'CA',
  'postalCode'      => '90404',
  'addressCountry'  => 'US'
];

// Basic canonical safety
header('Content-Type: text/html; charset=utf-8');
// --------- HTML ----------
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($title) ?> | Neural Command, LLC</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars($desc) ?>">
  <link rel="canonical" href="<?= $url ?>">

  <!-- OpenGraph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="<?= htmlspecialchars($title) ?>">
  <meta property="og:description" content="<?= htmlspecialchars($desc) ?>">
  <meta property="og:url" content="<?= $url ?>">
  <meta property="og:image" content="<?= $cover_img ?>">
  <meta property="og:site_name" content="Neural Command, LLC">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= htmlspecialchars($title) ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($desc) ?>">
  <meta name="twitter:image" content="<?= $cover_img ?>">

  <!-- Minimal, non-intrusive styles (optional) -->
  <style>
    :root { --mx: clamp(16px, 3vw, 24px); --w: min(920px, 92vw); }
    body{font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,sans-serif;color:#141414;margin:0;background:#fff}
    header,main,footer{margin:0 auto;max-width:var(--w);padding:1.5rem var(--mx)}
    header h1{font-size:clamp(28px,4vw,40px);line-height:1.2;margin:0 0 .25rem}
    .sub{color:#555;margin:.25rem 0 1.25rem}
    h2{font-size:clamp(20px,2.8vw,28px);margin:2rem 0 .5rem}
    h3{font-size:clamp(18px,2.4vw,22px);margin:1.25rem 0 .5rem}
    p{margin:.75rem 0}
    ul,ol{padding-left:1.25rem}
    .tldr{background:#f6f7f8;border:1px solid #eaebed;padding:1rem;border-radius:8px}
    .meta{color:#666;font-size:.9rem}
    .table{width:100%;border-collapse:collapse;margin:1rem 0}
    .table th,.table td{border:1px solid #e6e7e9;padding:.6rem;text-align:left}
    .faq dt{font-weight:600;margin-top:1rem}
    .faq dd{margin:0 0 1rem 0}
    nav.breadcrumb{font-size:.9rem;color:#666;margin:.25rem 0 1rem}
    nav.breadcrumb a{color:#444;text-decoration:none}
    nav.breadcrumb span{margin:0 .35rem}
  </style>

  <!-- JSON-LD: WebSite with Sitelinks Search -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "url":"<?= $site_domain ?>/",
    "name":"Neural Command, LLC",
    "publisher":{"@type":"Organization","name":"Neural Command, LLC"},
    "potentialAction":{
      "@type":"SearchAction",
      "target":"<?= $site_domain ?>/search?q={search_term_string}",
      "query-input":"required name=search_term_string"
    }
  }
  </script>

  <!-- JSON-LD: Organization (LocalBusiness-flavored) -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"<?= $org_name ?>",
    "url":"<?= $org_url ?>",
    "logo":"<?= $org_logo ?>",
    "telephone":"<?= $org_phone ?>",
    "sameAs":["<?= $org_linkedin ?>","<?= $org_gkp ?>"],
    "address":{
      "@type":"PostalAddress",
      "streetAddress":"<?= $org_addr['streetAddress'] ?>",
      "addressLocality":"<?= $org_addr['addressLocality'] ?>",
      "addressRegion":"<?= $org_addr['addressRegion'] ?>",
      "postalCode":"<?= $org_addr['postalCode'] ?>",
      "addressCountry":"<?= $org_addr['addressCountry'] ?>"
    }
  }
  </script>

  <!-- JSON-LD: Breadcrumb -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"<?= $site_domain ?>/" },
      {"@type":"ListItem","position":2,"name":"Insights","item":"<?= $site_domain ?>/insights/" },
      {"@type":"ListItem","position":3,"name":"<?= htmlspecialchars($title) ?>","item":"<?= $url ?>" }
    ]
  }
  </script>

  <!-- JSON-LD: Article -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Article",
    "mainEntityOfPage":{"@type":"WebPage","@id":"<?= $url ?>"},
    "headline":"<?= htmlspecialchars($title) ?>",
    "description":"<?= htmlspecialchars($desc) ?>",
    "image":["<?= $cover_img ?>"],
    "author":{"@type":"Organization","name":"<?= $author_name ?>","url":"<?= $org_url ?>"},
    "publisher":{"@type":"Organization","name":"<?= $org_name ?>","logo":{"@type":"ImageObject","url":"<?= $org_logo ?>"}},
    "datePublished":"<?= $published ?>",
    "dateModified":"<?= $modified ?>",
    "articleSection":"AI Search Optimization",
    "keywords":["GEO-16 Framework","AI Answer Engine","Agentic SEO","Structured Data","AI Overviews"],
    "inLanguage":"en-US"
  }
  </script>

  <!-- JSON-LD: FAQPage (page-specific) -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {
        "@type":"Question",
        "name":"What is GEO-16?",
        "acceptedAnswer":{"@type":"Answer","text":"A 16-pillar framework that measures on-page signals affecting whether AI answer engines cite your page: semantic HTML, structured data, freshness metadata, provenance, UX, and more."}
      },
      {
        "@type":"Question",
        "name":"What threshold improves AI citation odds?",
        "acceptedAnswer":{"@type":"Answer","text":"Pages with a GEO score of at least 0.70 and 12 or more active pillars showed a ~78% cross-engine citation rate in the 2025 study."}
      },
      {
        "@type":"Question",
        "name":"Which pillars matter most?",
        "acceptedAnswer":{"@type":"Answer","text":"Metadata & Freshness, Semantic HTML, and Structured Data had the strongest correlation with citation likelihood."}
      },
      {
        "@type":"Question",
        "name":"Is structured data required?",
        "acceptedAnswer":{"@type":"Answer","text":"Validated JSON-LD is a direct pipeline for AI parsers. It must match visible content and include accurate dates, breadcrumbs, and canonical signals."}
      }
    ]
  }
  </script>
</head>
<body>

<header>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="<?= $site_domain ?>/">Home</a><span>/</span>
    <a href="<?= $site_domain ?>/insights/">Insights</a><span>/</span>
    <strong><?= htmlspecialchars($title) ?></strong>
  </nav>

  <h1><?= htmlspecialchars($title) ?></h1>
  <p class="sub">By <?= htmlspecialchars($author_name) ?> — Santa Monica, CA</p>
  <p class="meta">Published <time datetime="<?= $published ?>"><?= date('F j, Y', strtotime($published)) ?></time> · Updated <time datetime="<?= $modified ?>"><?= date('F j, Y', strtotime($modified)) ?></time></p>

  <?php if ($cover_img): ?>
    <figure style="margin:1rem 0">
      <img src="<?= $cover_img ?>" alt="GEO-16 Framework overview" style="width:100%;height:auto;border-radius:8px">
    </figure>
  <?php endif; ?>
</header>

<main>
  <section class="tldr" aria-label="Key takeaways">
    <strong>TL;DR.</strong> AI answer engines cite pages they can parse, trust, and verify. Meet GEO-16 thresholds (G≥0.70, ≥12 pillar hits), validate JSON-LD, enforce semantic HTML, expose recency with real dates, and maintain provenance. Pair on-page excellence with earned media.
  </section>

  <h2 id="era">The New Era of Visibility</h2>
  <p>Generative engines like Google AI Overviews, Brave Summary, and Perplexity now synthesize answers and attribute only a handful of sources. Citation — not rank — is the new distribution. Our job is to make your page the reliable source models select.</p>

  <h2 id="geo16">GEO-16, Explained</h2>
  <p>GEO-16 is a sixteen-pillar scoring model linking on-page quality to citation behavior. It operationalizes six principles: People-First Answers, Structured Data, Provenance, Freshness, Risk Management, and RAG Fit.</p>

  <h3 id="pillars">Top-Impact Pillars</h3>
  <ul>
    <li><strong>Metadata & Freshness:</strong> Visible timestamps and machine-readable dates (datePublished, dateModified, ETag, sitemaps).</li>
    <li><strong>Semantic HTML:</strong> Single <code>&lt;h1&gt;</code>, logical <code>&lt;h2&gt;</code>/<code>&lt;h3&gt;</code>, descriptive anchors, accessible lists/tables.</li>
    <li><strong>Structured Data:</strong> Valid JSON-LD matching visible content (Article/FAQPage/Product/LocalBusiness/Breadcrumb).</li>
  </ul>

  <h2 id="results">What the Data Shows</h2>
  <table class="table" aria-describedby="results">
    <thead><tr><th>Engine</th><th>Mean GEO</th><th>Citation Rate</th><th>Avg. Pillar Hits</th></tr></thead>
    <tbody>
      <tr><td>Brave Summary</td><td>0.727</td><td>78%</td><td>11.6</td></tr>
      <tr><td>Google AI Overviews</td><td>0.687</td><td>72%</td><td>11.0</td></tr>
      <tr><td>Perplexity</td><td>0.300</td><td>45%</td><td>4.8</td></tr>
    </tbody>
  </table>
  <p><strong>Thresholds:</strong> G ≥ 0.70 and ≥ 12 pillar hits are associated with a strong jump in cross-engine citations. Odds of citation rise ~4.2x with higher GEO scores.</p>

  <h2 id="strategy">How We Implement This at Neural Command</h2>
  <ul>
    <li>Automated schema validation and injection per template (Article, FAQPage, Breadcrumb, WebSite).</li>
    <li>Semantic hierarchy linting and internal link diagnostics.</li>
    <li>Freshness enforcement — visible timestamps, JSON-LD dates, sitemap <code>lastmod</code>.</li>
    <li>Provenance checks — authoritative references, link-rot sweeps, canonical fencing.</li>
  </ul>

  <h3 id="services">Related Services</h3>
  <ul>
    <li><a href="<?= $site_domain ?>/services/generative-engine-optimization/">Generative Engine Optimization (GEO)</a></li>
    <li><a href="<?= $site_domain ?>/services/agentic-seo/">Agentic SEO</a></li>
    <li><a href="<?= $site_domain ?>/services/schema-optimization/">Schema Optimization</a></li>
    <li><a href="<?= $site_domain ?>/services/ai-citation-optimization/">AI Discovery & Citation Strategy</a></li>
  </ul>

  <h2 id="faq">FAQ</h2>
  <dl class="faq">
    <dt>Is JSON-LD a direct pipeline to AI citations?</dt>
    <dd>It's the machine interface answer engines rely on to interpret your page. It must be valid, complete, and aligned with visible content. It doesn't guarantee citations by itself; earned authority and on-page quality still matter.</dd>

    <dt>Does recency really matter?</dt>
    <dd>Yes. Visible dates + machine-readable <code>dateModified</code> and sitemaps contribute to freshness signals that correlate with higher citation probability.</dd>

    <dt>What about social content?</dt>
    <dd>Social platforms are rarely cited in AI answers. Earned media on authoritative domains and well-structured owned pages outperform social posts for citation likelihood.</dd>
  </dl>
</main>

<footer>
  <hr>
  <p><strong><?= $org_name ?></strong> — <?= $org_addr['streetAddress'] ?>, <?= $org_addr['addressLocality'] ?>, <?= $org_addr['addressRegion'] ?> <?= $org_addr['postalCode'] ?> · <?= $org_phone_nat ?></p>
</footer>

</body>
</html>
