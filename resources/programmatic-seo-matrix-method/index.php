<?php
// /resources/programmatic-seo-matrix-method/index.php

// Include required files
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../bootstrap/canonical.php';
require_once __DIR__ . '/../../bootstrap/config.php';
require_once __DIR__ . '/../../lib/util.php';
require_once __DIR__ . '/../../lib/seo.php';
require_once __DIR__ . '/../../lib/links.php';

// Set page context for template system
$ctx = [
  'title' => 'Programmatic SEO Matrix Method | Neural Command',
  'desc'  => 'A Google-style technical guide by Joel @ NRL CMD. Learn how the Programmatic SEO Matrix Method generates deterministic, large-scale, AI-ready web content with schema, canonical integrity, and agentic actions.',
];

// Set canonical URL
$canonical = 'https://nrlcmd.com/resources/programmatic-seo-matrix-method/';

// Set breadcrumbs
$breadcrumbs = [
  ['label' => 'Home', 'url' => 'https://nrlcmd.com/'],
  ['label' => 'Resources', 'url' => 'https://nrlcmd.com/resources/'],
  ['label' => 'Programmatic SEO Matrix Method'],
];

// Build JSON-LD (Article + HowTo). If your header template supports an $extra_head variable,
// you can move this into <head>. Otherwise, in-body is acceptable.
$articleJsonLd = [
  "@context" => "https://schema.org",
  "@type" => ["Article","HowTo"],
  "headline" => "Programmatic SEO Matrix Method",
  "author" => [
    "@type" => "Person",
    "name"  => "Joel",
    "affiliation" => [
      "@type" => "Organization",
      "name"  => "Neural Command LLC",
      "url"   => "https://nrlcmd.com"
    ]
  ],
  "publisher" => [
    "@type" => "Organization",
    "name"  => "Neural Command",
    "logo"  => [ "@type" => "ImageObject", "url" => "https://nrlcmd.com/logo.png" ]
  ],
  "mainEntityOfPage" => $canonical,
  "datePublished" => "2025-10-10",
  "dateModified"  => "2025-10-10",
  "description"   => $ctx['desc'],
  "step" => [
    ["@type"=>"HowToStep","name"=>"Define matrix dimensions","text"=>"Establish service, location, and token data sources."],
    ["@type"=>"HowToStep","name"=>"Seed deterministic content","text"=>"Use CRC32 or similar to generate reproducible content seeds."],
    ["@type"=>"HowToStep","name"=>"Assemble structured data","text"=>"Combine Organization, Service, LocalBusiness, and FAQ schemas per page."],
    ["@type"=>"HowToStep","name"=>"Validate and deploy","text"=>"Run Rich Results and indexing tests before release."]
  ]
];

// Include the site template system
include __DIR__ . '/../../templates/head.php';
include __DIR__ . '/../../templates/header.php';

// Output breadcrumbs
if (!empty($breadcrumbs)) {
  ob_start();
  include __DIR__ . '/../../templates/breadcrumbs.php';
  echo ob_get_clean();
}
?>

<script type="application/ld+json"><?php echo json_encode($articleJsonLd, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); ?></script>

<style>
  /* Documentation page styles */
  .doc-page { max-width: 960px; margin: 0 auto; padding: 24px; line-height: 1.7; }
  .doc-page h1 { font-size: 2rem; margin: 0 0 12px; }
  .doc-page h2 { font-size: 1.5rem; margin-top: 28px; }
  .doc-page h3 { font-size: 1.2rem; margin-top: 22px; }
  .doc-page .lead { color:#222; font-size:1.1rem; }
  .doc-page .note { background:#f6f8fa; border:1px solid #e5e7eb; padding:12px 14px; border-radius:8px; }
  .doc-page pre, .doc-page code { background:#0a0a0a; color:#e5e5e5; padding:0.15rem 0.35rem; border-radius:6px; }
  .doc-page pre { padding:12px; overflow:auto; }
  .doc-page table { width:100%; border-collapse: collapse; margin: 12px 0; }
  .doc-page th, .doc-page td { border:1px solid #e5e7eb; padding:8px 10px; text-align:left; }
  .doc-page ul { margin-left: 1.2rem; }
</style>

<main class="doc-page" id="content">
  <h1>Programmatic SEO Matrix Method</h1>
  <p class="lead"><em>by Joel @ NRL CMD</em></p>

  <p class="lead">
    The Programmatic SEO Matrix Method is a deterministic framework for generating thousands of unique, schema-validated, and AI-interpretable webpages.
    It replaces ad-hoc content generation with a reproducible matrix that ensures every page is structurally valid, crawl-efficient, and LLM-readable.
  </p>

  <h2 id="overview">Overview</h2>
  <p>
    Built for modern search and agent ecosystems, the matrix method focuses on three principles:
    <strong>determinism</strong> (same inputs → same outputs), <strong>canonical purity</strong> (one URL per entity),
    and <strong>structured clarity</strong> (full JSON-LD coverage and agentic affordances).
  </p>

  <h2 id="why-matrix">Why use a matrix architecture</h2>
  <table>
    <thead><tr><th>Traditional</th><th>Matrix Method</th></tr></thead>
    <tbody>
      <tr><td>CMS-based manual pages</td><td>Data-driven, programmatic generation</td></tr>
      <tr><td>Randomized copy</td><td>Deterministic token seeding</td></tr>
      <tr><td>Duplication risk</td><td>Canonical per resource, strict normalization</td></tr>
      <tr><td>Hard to validate at scale</td><td>Schema-first design and CI checks</td></tr>
    </tbody>
  </table>

  <h2 id="components">Key components</h2>
  <h3>1) Matrix dimensions</h3>
  <p>Each page results from combining <strong>Service</strong> × <strong>City</strong> × <strong>Token Set</strong>.</p>
  <pre><code>/services/{service}/{city}/</code></pre>
  <p>Example: <code>/services/agentic-seo/austin-tx/</code></p>

  <h3>2) Deterministic token engine</h3>
  <p>The engine seeds content with a stable signature from the canonical URL, ensuring reproducible variety.</p>
  <pre><code class="language-php"><?php echo htmlspecialchars(
'function seeded_rng(string $key): \Random\Engine\Mt19937 {
  $seed = crc32($key) & 0x7fffffff;
  return new \Random\Engine\Mt19937($seed);
}'); ?></code></pre>

  <h3>3) Content composition pipeline</h3>
  <ol>
    <li>Intro (service + location + pain point)</li>
    <li>Strategic angles</li>
    <li>Expected outcomes</li>
    <li>Local signals</li>
    <li>Process overview</li>
    <li>Proof points</li>
    <li>FAQ section</li>
    <li>CTA block</li>
  </ol>

  <h3>4) Canonical &amp; crawl discipline</h3>
  <ul>
    <li>HTTPS enforced</li>
    <li>Lowercase, kebab-case slugs</li>
    <li>Tracking params stripped (<code>utm_*</code>, <code>gclid</code>)</li>
    <li>One canonical URL per page</li>
    <li>Dynamic sitemap shards (≤ 45,000 URLs)</li>
  </ul>

  <h3>5) Structured data</h3>
  <p>Each page emits JSON-LD for <em>Organization, LocalBusiness, Service, WebPage, BreadcrumbList, FAQPage</em>. Validate with Rich Results Test.</p>

  <h2 id="implementation">Implementation guide</h2>
  <h3>Step 1 — Define data sources</h3>
  <p>Create <code>/data/services.csv</code> and <code>/data/cities.csv</code> as the authoritative inputs.</p>

  <h3>Step 2 — Configure routing</h3>
  <pre><code class="language-apache">RewriteRule ^services/([^/]+)/([^/]+)/?$ services/index.php [L,QSA]</code></pre>

  <h3>Step 3 — Build the token engine</h3>
  <pre><code class="language-php"><?php echo htmlspecialchars(
'$seed = crc32($canonical);
$rng  = seeded_rng($canonical);
// deterministically choose angles/benefits/faq items
$angles   = seeded_pick($baseAngles, 3, $rng);
$benefits = seeded_pick($benefitPool, 3, $rng);'); ?></code></pre>

  <h3>Step 4 — Add schema templates</h3>
  <p>Embed JSON-LD per schema type and interlink via consistent <code>@id</code> values across pages.</p>

  <h3>Step 5 — Generate sitemaps</h3>
  <p>Auto-generate sitemaps; shard at 45k URLs; submit to Google Search Console.</p>

  <h2 id="validation">Validation &amp; testing</h2>
  <table>
    <thead><tr><th>Tool</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Rich Results Test</td><td>Validate schema</td></tr>
      <tr><td>URL Inspection</td><td>Verify canonical indexation</td></tr>
      <tr><td>PageSpeed Insights</td><td>SSR performance checks</td></tr>
      <tr><td>Robots.txt Tester</td><td>Crawlability verification</td></tr>
    </tbody>
  </table>

  <h2 id="example">Example output</h2>
  <p><strong>URL:</strong> https://nrlcmd.com/services/agentic-seo/austin-tx/</p>
  <pre><code class="language-html">&lt;h1&gt;Agentic SEO in Austin&lt;/h1&gt;
&lt;p&gt;Improving AI visibility in Austin requires more than backlinks.
Neural Command aligns structured data so agents interpret your brand contextually.&lt;/p&gt;</code></pre>

  <h2 id="troubleshooting">Troubleshooting</h2>
  <table>
    <thead><tr><th>Symptom</th><th>Fix</th></tr></thead>
    <tbody>
      <tr><td>Duplicate pages</td><td>Enforce canonical redirects</td></tr>
      <tr><td>Reused copy</td><td>Expand token libraries and reseed selections</td></tr>
      <tr><td>Schema errors</td><td>Validate JSON encoding; escape characters</td></tr>
      <tr><td>Slow render</td><td>Enable caching headers (ETag, Cache-Control)</td></tr>
    </tbody>
  </table>

  <h2 id="best-practices">Best practices</h2>
  <ul>
    <li>Maintain deterministic generation (no random drift).</li>
    <li>Audit token pools quarterly for diversity.</li>
    <li>Interlink hubs and city pages logically.</li>
    <li>Validate schema and sitemaps pre-deploy (CI step).</li>
  </ul>

  <h2 id="next-steps">Next steps</h2>
  <ol>
    <li>Extend matrix with industries or personas.</li>
    <li>Localize token sets for multilingual markets.</li>
    <li>Connect pages to live actions via <code>agent.json</code>.</li>
    <li>Monitor AI Overview visibility, iterate tokens.</li>
  </ol>

  <div class="note">
    <strong>Summary:</strong> The Programmatic SEO Matrix Method unites deterministic generation, structured data, and agentic affordances into a reproducible SEO architecture. It scales by data, not guesswork—producing pages that both search engines and AI systems can read and trust.
  </div>
</main>

<?php 
include __DIR__ . '/../../templates/footer.php'; 
?>
