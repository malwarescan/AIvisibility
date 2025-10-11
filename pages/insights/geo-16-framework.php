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
        <h3 class="text-xl font-semibold text-white mb-4">Interactive GEO-16 Framework Algorithm</h3>
        <div class="mermaid">
flowchart TD
    A[START<br/>Page Input] --> B[METADATA_CHECK<br/>• datePublished<br/>• dateModified<br/>• ETag<br/>• sitemap_lastmod]
    A --> C[SEMANTIC_HTML_CHECK<br/>• single_h1<br/>• logical_h2_h3<br/>• descriptive_anchors<br/>• accessible_lists]
    A --> D[STRUCTURED_DATA_CHECK<br/>• valid_jsonld<br/>• matches_content<br/>• has_breadcrumbs<br/>• canonical_present]
    
    B --> E[PROVENANCE_CHECK<br/>• authoritative_refs<br/>• link_validation<br/>• trust_indicators]
    C --> F[RISK_MANAGEMENT_CHECK<br/>• content_quality<br/>• spam_signals<br/>• user_experience]
    D --> G[RAG_FIT_CHECK<br/>• machine_readable<br/>• parsing_optimized<br/>• ai_friendly]
    
    E --> H[CALCULATE_GEO_SCORE<br/>score = active_pillars / 16 * 100<br/>IF score >= 70 AND active_pillars >= 12]
    F --> H
    G --> H
    
    H --> I[Brave Summary<br/>78% Citation Rate<br/>GEO: 0.727]
    H --> J[Google AI Overviews<br/>72% Citation Rate<br/>GEO: 0.687]
    H --> K[Perplexity<br/>45% Citation Rate<br/>GEO: 0.300]
    
    classDef startNode fill:#00ff00,stroke:#333,stroke-width:2px,color:#000
    classDef checkNode fill:#0066cc,stroke:#333,stroke-width:2px,color:#fff
    classDef calcNode fill:#ffff00,stroke:#333,stroke-width:2px,color:#000
    classDef outputNode fill:#ff6600,stroke:#333,stroke-width:2px,color:#fff
    
    class A startNode
    class B,C,D,E,F,G checkNode
    class H calcNode
    class I,J,K outputNode
        </div>
        
        <!-- Node Details Panel -->
        <div id="node-details" class="mt-4">
          <div class="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 class="text-white font-semibold mb-2">Click on any node above</h4>
            <p class="text-gray-300 text-sm">Select a node in the flowchart to see detailed information about that step in the GEO-16 framework algorithm.</p>
          </div>
        </div>
        
        <p class="text-gray-400 text-sm mt-2">Click on nodes to explore the algorithm flow. Each node represents a check in the GEO-16 framework.</p>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      <div class="bg-gray-50 border border-gray-200 p-8 rounded-lg mb-8">
        <p class="text-lg font-medium mb-0 leading-relaxed">
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

<!-- CSS for interactive highlighting -->
<style>
.mermaid .node.highlighted {
  filter: brightness(1.3) drop-shadow(0 0 8px #00ff00);
  stroke-width: 4px !important;
  stroke: #00ff00 !important;
}
.mermaid .node {
  transition: all 0.3s ease;
}
.mermaid .node:hover {
  filter: brightness(1.1);
  cursor: pointer;
}
</style>

<!-- Mermaid.js for interactive flowchart -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  mermaid.initialize({ 
    startOnLoad: true,
    theme: 'dark',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    },
    securityLevel: 'loose'
  });
  
  // Add interactivity after Mermaid renders
  setTimeout(function() {
    const nodes = document.querySelectorAll('.mermaid .node');
    const detailsDiv = document.getElementById('node-details');
    
    nodes.forEach(node => {
      node.style.cursor = 'pointer';
      node.addEventListener('click', function() {
        const nodeId = this.id;
        const nodeText = this.querySelector('text')?.textContent || '';
        
        // Remove previous highlights
        nodes.forEach(n => n.classList.remove('highlighted'));
        
        // Highlight clicked node
        this.classList.add('highlighted');
        
        // Show details
        if (detailsDiv) {
          detailsDiv.innerHTML = `
            <div class="bg-gray-800 p-4 rounded border border-gray-600">
              <h4 class="text-white font-semibold mb-2">${nodeText.split('<br/>')[0]}</h4>
              <p class="text-gray-300 text-sm">${getNodeDescription(nodeId)}</p>
            </div>
          `;
        }
      });
    });
  }, 1000);
});

function getNodeDescription(nodeId) {
  const descriptions = {
    'A': 'Starting point for the GEO-16 algorithm. Input page data for analysis.',
    'B': 'Checks for metadata freshness signals including publication dates, modification timestamps, ETag headers, and sitemap lastmod values.',
    'C': 'Validates semantic HTML structure including single H1, logical heading hierarchy, descriptive anchor text, and accessible list structures.',
    'D': 'Verifies structured data implementation including valid JSON-LD, content matching, breadcrumb presence, and canonical tags.',
    'E': 'Assesses content provenance including authoritative references, link validation, and trust indicators.',
    'F': 'Evaluates risk management factors including content quality, spam signals, and user experience metrics.',
    'G': 'Checks RAG (Retrieval-Augmented Generation) fit including machine readability, parsing optimization, and AI-friendly formatting.',
    'H': 'Calculates final GEO score based on active pillars. Threshold: score ≥ 0.70 and ≥ 12 pillar hits for high citation likelihood.',
    'I': 'Brave Summary engine output showing 78% citation rate with GEO score of 0.727.',
    'J': 'Google AI Overviews output showing 72% citation rate with GEO score of 0.687.',
    'K': 'Perplexity engine output showing 45% citation rate with GEO score of 0.300.'
  };
  return descriptions[nodeId] || 'Click on any node to see detailed information about this step in the GEO-16 framework.';
}
</script>

