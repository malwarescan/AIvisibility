<?php
declare(strict_types=1);
require_once dirname(__DIR__, 2).'/bootstrap/canonical.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Insights', 'url' => Canonical::absolute('/insights/')],
  ['label' => 'GEO-16 Framework'],
];

// Set page context for the main template
$ctx = [
  'title' => 'AI Answer Engine Citation Behavior: The GEO-16 Framework Explained | Neural Command',
  'desc' => 'Neural Command, LLC explains GEO-16 — a 16-pillar model that improves AI citation likelihood via structured data, semantic HTML, and metadata freshness.'
];

$published = '2025-10-11';
$modified = '2025-10-11';
$author_name = 'Neural Command, LLC';
$cover_img = '/assets/geo16-cover.webp';
?>

<main class="container mx-auto px-4 py-10">
  <div class="max-w-4xl mx-auto">
    <!-- Article Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">AI Answer Engine Citation Behavior: The GEO-16 Framework Explained</h1>
      <p class="text-gray-600 mb-4">By <?= htmlspecialchars($author_name) ?> — Santa Monica, CA</p>
      <p class="text-sm text-gray-500 mb-6">
        Published <time datetime="<?= $published ?>"><?= date('F j, Y', strtotime($published)) ?></time> · 
        Updated <time datetime="<?= $modified ?>"><?= date('F j, Y', strtotime($modified)) ?></time>
      </p>
      
      <!-- Interactive GEO-16 Algorithm Visualization -->
      <div class="bg-gray-900 p-6 rounded-lg mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">Interactive GEO-16 Algorithm</h3>
        <div id="geo16-algorithm" class="w-full h-96 border border-gray-600 rounded"></div>
        <p class="text-gray-400 text-sm mt-2">Click and drag to explore the algorithm flow. Each node represents a check in the GEO-16 framework.</p>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      <div class="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
        <p class="text-lg font-medium mb-0">
          <strong>TL;DR.</strong> AI answer engines cite pages they can parse, trust, and verify. Meet GEO-16 thresholds (G≥0.70, ≥12 pillar hits), validate JSON-LD, enforce semantic HTML, expose recency with real dates, and maintain provenance. Pair on-page excellence with earned media.
        </p>
      </div>

      <h2 id="era" class="text-2xl font-semibold mt-8 mb-4">The New Era of Visibility</h2>
      <p class="mb-6">Generative engines like Google AI Overviews, Brave Summary, and Perplexity now synthesize answers and attribute only a handful of sources. Citation — not rank — is the new distribution. Our job is to make your page the reliable source models select.</p>

      <h2 id="geo16" class="text-2xl font-semibold mt-8 mb-4">GEO-16, Explained</h2>
      <p class="mb-6">GEO-16 is a sixteen-pillar scoring model linking on-page quality to citation behavior. It operationalizes six principles: People-First Answers, Structured Data, Provenance, Freshness, Risk Management, and RAG Fit.</p>

      <h3 id="pillars" class="text-xl font-semibold mt-6 mb-4">Top-Impact Pillars</h3>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2"><strong>Metadata & Freshness:</strong> Visible timestamps and machine-readable dates (datePublished, dateModified, ETag, sitemaps).</li>
        <li class="mb-2"><strong>Semantic HTML:</strong> Single <code class="bg-gray-100 px-2 py-1 rounded">&lt;h1&gt;</code>, logical <code class="bg-gray-100 px-2 py-1 rounded">&lt;h2&gt;</code>/<code class="bg-gray-100 px-2 py-1 rounded">&lt;h3&gt;</code>, descriptive anchors, accessible lists/tables.</li>
        <li class="mb-2"><strong>Structured Data:</strong> Valid JSON-LD matching visible content (Article/FAQPage/Product/LocalBusiness/Breadcrumb).</li>
      </ul>

      <h2 id="results" class="text-2xl font-semibold mt-8 mb-4">What the Data Shows</h2>
      <div class="overflow-x-auto mb-6">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-50">
              <th class="border border-gray-300 px-4 py-2 text-left">Engine</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Mean GEO</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Citation Rate</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Avg. Pillar Hits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Brave Summary</td>
              <td class="border border-gray-300 px-4 py-2">0.727</td>
              <td class="border border-gray-300 px-4 py-2">78%</td>
              <td class="border border-gray-300 px-4 py-2">11.6</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Google AI Overviews</td>
              <td class="border border-gray-300 px-4 py-2">0.687</td>
              <td class="border border-gray-300 px-4 py-2">72%</td>
              <td class="border border-gray-300 px-4 py-2">11.0</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Perplexity</td>
              <td class="border border-gray-300 px-4 py-2">0.300</td>
              <td class="border border-gray-300 px-4 py-2">45%</td>
              <td class="border border-gray-300 px-4 py-2">4.8</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mb-6"><strong>Thresholds:</strong> G ≥ 0.70 and ≥ 12 pillar hits are associated with a strong jump in cross-engine citations. Odds of citation rise ~4.2x with higher GEO scores.</p>

      <h2 id="strategy" class="text-2xl font-semibold mt-8 mb-4">How We Implement This at Neural Command</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Automated schema validation and injection per template (Article, FAQPage, Breadcrumb, WebSite).</li>
        <li class="mb-2">Semantic hierarchy linting and internal link diagnostics.</li>
        <li class="mb-2">Freshness enforcement — visible timestamps, JSON-LD dates, sitemap <code class="bg-gray-100 px-2 py-1 rounded">lastmod</code>.</li>
        <li class="mb-2">Provenance checks — authoritative references, link-rot sweeps, canonical fencing.</li>
      </ul>

      <h3 id="services" class="text-xl font-semibold mt-6 mb-4">Related Services</h3>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2"><a href="/services/generative-engine-optimization/" class="text-blue-600 hover:underline">Generative Engine Optimization (GEO)</a></li>
        <li class="mb-2"><a href="/services/agentic-seo/" class="text-blue-600 hover:underline">Agentic SEO</a></li>
        <li class="mb-2"><a href="/services/schema-optimizer/" class="text-blue-600 hover:underline">Schema Optimization</a></li>
        <li class="mb-2"><a href="/services/ai-consulting/" class="text-blue-600 hover:underline">AI Discovery & Citation Strategy</a></li>
      </ul>

      <h2 id="faq" class="text-2xl font-semibold mt-8 mb-4">FAQ</h2>
      <dl class="space-y-4">
        <dt class="font-semibold">Is JSON-LD a direct pipeline to AI citations?</dt>
        <dd class="ml-4 mb-4">It's the machine interface answer engines rely on to interpret your page. It must be valid, complete, and aligned with visible content. It doesn't guarantee citations by itself; earned authority and on-page quality still matter.</dd>

        <dt class="font-semibold">Does recency really matter?</dt>
        <dd class="ml-4 mb-4">Yes. Visible dates + machine-readable <code class="bg-gray-100 px-2 py-1 rounded">dateModified</code> and sitemaps contribute to freshness signals that correlate with higher citation probability.</dd>

        <dt class="font-semibold">What about social content?</dt>
        <dd class="ml-4 mb-4">Social platforms are rarely cited in AI answers. Earned media on authoritative domains and well-structured owned pages outperform social posts for citation likelihood.</dd>
      </dl>
    </article>
  </div>
</main>

<?php
// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Article',
    'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => Canonical::absolute('/insights/geo-16-framework/')],
    'headline' => 'AI Answer Engine Citation Behavior: The GEO-16 Framework Explained',
    'description' => 'Neural Command, LLC explains GEO-16 — a 16-pillar model that improves AI citation likelihood via structured data, semantic HTML, and metadata freshness.',
    'image' => [Canonical::absolute($cover_img)],
    'author' => ['@type' => 'Organization', 'name' => $author_name, 'url' => Canonical::absolute('/')],
    'publisher' => ['@type' => 'Organization', 'name' => 'Neural Command, LLC', 'logo' => ['@type' => 'ImageObject', 'url' => Canonical::absolute('/assets/logo.png')]],
    'datePublished' => $published,
    'dateModified' => $modified,
    'articleSection' => 'AI Search Optimization',
    'keywords' => ['GEO-16 Framework', 'AI Answer Engine', 'Agentic SEO', 'Structured Data', 'AI Overviews'],
    'inLanguage' => 'en-US'
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'What is GEO-16?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'A 16-pillar framework that measures on-page signals affecting whether AI answer engines cite your page: semantic HTML, structured data, freshness metadata, provenance, UX, and more.']
      ],
      [
        '@type' => 'Question',
        'name' => 'What threshold improves AI citation odds?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Pages with a GEO score of at least 0.70 and 12 or more active pillars showed a ~78% cross-engine citation rate in the 2025 study.']
      ],
      [
        '@type' => 'Question',
        'name' => 'Which pillars matter most?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Metadata & Freshness, Semantic HTML, and Structured Data had the strongest correlation with citation likelihood.']
      ],
      [
        '@type' => 'Question',
        'name' => 'Is structured data required?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Validated JSON-LD is a direct pipeline for AI parsers. It must match visible content and include accurate dates, breadcrumbs, and canonical signals.']
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<!-- Ripple.js for algorithm visualization -->
<script src="https://unpkg.com/ripple.js@latest/dist/ripple.min.js"></script>
<script src="/assets/js/geo16-algorithm.js"></script>
