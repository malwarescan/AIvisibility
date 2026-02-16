<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'AI Search Optimization']
];

// Set page context for the main template
$ctx = [
  'title' => 'AI Search Optimization | Neural Command LLC',
  'desc' => 'Optimize for Google AI Mode, Bing Copilot, and Perplexity ranking logic. Our AI Search Optimization focuses on deterministic content token systems, crawl-clarity ranking, and structured embedding for maximum AI visibility.'
];

// Service-specific JSON-LD schemas (per Master Schema Matrix)
// Service pages: Service + BreadcrumbList + conditional FAQPage
// NO Offer, NO Review, NO OfferCatalog, NO Product
require_once __DIR__.'/../../lib/schema_enforcement.php';

$serviceSchemas = [
  SchemaEnforcement::generateService([
    '@id' => canonical('/services/ai-search-optimization/').'#service',
    'name' => 'AI Search Optimization',
    'description' => 'Optimize for Google AI Mode, Bing Copilot, and Perplexity ranking logic. Our AI Search Optimization focuses on deterministic content token systems, crawl-clarity ranking, and structured embedding for maximum AI visibility.',
    'serviceType' => 'AI Search Optimization',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ]
  ]),
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'How does AI Search Optimization differ from GEO?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AI Search Optimization focuses specifically on optimizing for AI-powered search interfaces like Google AI Mode, Bing Copilot, and Perplexity. While GEO optimizes for general AI language models, AI Search Optimization targets the specific ranking algorithms and retrieval systems used by AI search platforms.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'What is crawl clarity?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Crawl clarity refers to how easily AI systems can understand, parse, and extract meaningful information from your content. We optimize for crawl clarity by implementing deterministic content token systems, structured embedding, and semantic organization that AI search engines can efficiently process.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How do we appear in AI Overviews?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AI Overviews select content based on crawl clarity, authority signals, and semantic relevance. Our AI Search Optimization methodology ensures your content meets these criteria through structured data implementation, entity optimization, and crawl-clarity ranking improvements.'
        ]
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<main class="container py-8">
  <section class="service-hero">
    <h1
</h1>
<p class="mb-md max-w-md leading-relaxed">
  <strong>AI Search Optimization</strong> fixes crawlability, indexing, and authority signals so your site is selected and cited by AI-driven retrieval systems (ChatGPT, Google AI Overviews, Bing Copilot).
</p>
<section class="card-style mb-lg">
  <h2 class="text-xl font-semibold mb-sm">What you get</h2>
  <ul class="list-disc pl-lg text-muted">
    <li>Indexing + crawl diagnostics with prioritized fixes</li>
    <li>Entity and topical coverage improvements (what AI expects to see)</li>
    <li>Internal link architecture upgrades for retrieval</li>
    <li>Schema validation and eligibility cleanup</li>
  </ul>
</section>
<section class="card-style mb-lg">
  <h2 class="text-xl font-semibold mb-sm">FAQ</h2>
  <h3 class="text-lg font-semibold mb-xs">What problem does AI Search Optimization solve?</h3>
  <p class="text-muted">It prevents visibility loss when search engines switch from ranking pages to retrieving and citing sources inside AI answers.</p>
  <h3 class="text-lg font-semibold mb-xs">How do you measure results?</h3>
  <p class="text-muted">We track crawl/index status, query coverage, landing-page performance, and citation eligibility signals.</p>
</section>
>AI Search Optimization for Businesses</h1>
    <p class="service-subtitle">
      Neural Command LLC provides AI search optimization services that help businesses maintain visibility as Google shifts from traditional rankings to AI-driven retrieval.
    </p>
  </section>
  
  <section class="intro mb-3xl">
    
    <p class="mb-lg max-w-md">
      <strong>Who it's for:</strong> For companies experiencing traffic loss, indexing issues, or declining visibility due to changes in Google Search behavior.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>What it fixes:</strong> We identify and fix crawl, indexing, canonical, and authority issues that prevent your site from being surfaced by modern search systems.
    </p>
    
    <p class="mb-xl max-w-md">
      <strong>Cost of inaction:</strong> Without intervention, search visibility continues to decay as AI systems replace traditional result layouts.
    </p>
    
    <p class="mb-xl">
      <a data-contact-trigger href="#" class="btn-primary-inline">Get an AI Search Assessment</a>
    </p>
  </section>

  <section class="service-section service-section--muted">
    <h2 class="service-section-title">How We Optimize for AI Search</h2>
    <p>AI search platforms use specialized algorithms that prioritize different factors than traditional search engines. Our methodology addresses these unique requirements:</p>
    
    <ul>
      <li><strong>Deterministic content token systems:</strong> We implement content structures that AI search engines can consistently parse and understand, ensuring reliable information extraction and ranking.</li>
      <li><strong>Crawl-clarity ranking:</strong> We optimize content organization and semantic structure to improve how AI systems process and rank your information.</li>
      <li><strong>Structured embedding:</strong> We implement semantic embedding strategies that align with how AI search platforms store and retrieve information.</li>
    </ul>
    
    <p>This specialized approach ensures your content performs optimally across all major AI search interfaces.</p>
  </section>

  <section class="service-section">
    <h2 class="service-section-title">Multi-Platform AI Search Optimization</h2>
    <p>Each AI search platform has unique characteristics that require specialized optimization:</p>
    
    <ul>
      <li><strong>Google AI Mode:</strong> Optimized for Google's AI Overview system, focusing on entity recognition, authority signals, and semantic relevance for AI-generated summaries.</li>
      <li><strong>Bing Copilot:</strong> Structured for Microsoft's AI search interface, emphasizing cross-platform authority and knowledge graph integration.</li>
      <li><strong>Perplexity:</strong> Optimized for Perplexity's source citation system, ensuring your content becomes a reliable reference for AI-generated answers.</li>
      <li><strong>Emerging platforms:</strong> Prepared for future AI search interfaces through flexible, platform-agnostic optimization strategies.</li>
    </ul>
  </section>

  <section class="service-section">
    <div class="service-proof">
      <h2 class="service-section-title">AI Search Optimization Success Stories</h2>
      <p>We've helped brands achieve measurable improvements across AI search platforms:</p>
      
      <ul>
      <li><strong>E-commerce brands:</strong> Achieved consistent AI Overview appearances for product categories, driving significant traffic through AI-generated summaries.</li>
      <li><strong>Professional services:</strong> Optimized for AI search citations, becoming the go-to reference for specialized expertise across multiple platforms.</li>
      <li><strong>Technology companies:</strong> Structured content for AI search algorithms, achieving featured placement in AI-generated technical comparisons.</li>
      <li><strong>Educational institutions:</strong> Optimized for AI search discovery, driving enrollment through AI-recommended educational content.</li>
      </ul>
    </div>
  </section>

  <section class="service-section">
    <h2 class="service-section-title">Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>How does AI Search Optimization differ from GEO?</h3>
      <p>AI Search Optimization focuses specifically on optimizing for AI-powered search interfaces like Google AI Mode, Bing Copilot, and Perplexity. While GEO optimizes for general AI language models, AI Search Optimization targets the specific ranking algorithms and retrieval systems used by AI search platforms.</p>
    </div>
    
    <div class="faq-item">
      <h3>What is crawl clarity?</h3>
      <p>Crawl clarity refers to how easily AI systems can understand, parse, and extract meaningful information from your content. We optimize for crawl clarity by implementing deterministic content token systems, structured embedding, and semantic organization that AI search engines can efficiently process.</p>
    </div>
    
    <div class="faq-item">
      <h3>How do we appear in AI Overviews?</h3>
      <p>AI Overviews select content based on crawl clarity, authority signals, and semantic relevance. Our AI Search Optimization methodology ensures your content meets these criteria through structured data implementation, entity optimization, and crawl-clarity ranking improvements.</p>
    </div>
  </section>

  <section class="service-cta">
    <h2>Ready to Dominate AI Search?</h2>
    <p>Transform your content's performance across AI search platforms. Our specialized methodology drives measurable improvements in AI search visibility and ranking.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/geo/') ?>">Learn about GEO →</a> | <a href="<?= Canonical::absolute('/services/aeo/') ?>">Answer Engine Optimization →</a></p>
  </section>
</main>
