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
  <h1>AI Search Optimization for Businesses</h1>
  
  <section class="intro" style="margin-bottom: 3rem;">
    <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 2rem; max-width: 700px;">
      Neural Command LLC provides AI search optimization services that help businesses maintain visibility as Google shifts from traditional rankings to AI-driven retrieval.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>Who it's for:</strong> For companies experiencing traffic loss, indexing issues, or declining visibility due to changes in Google Search behavior.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>What it fixes:</strong> We identify and fix crawl, indexing, canonical, and authority issues that prevent your site from being surfaced by modern search systems.
    </p>
    
    <p style="margin-bottom: 2rem; max-width: 700px;">
      <strong>Cost of inaction:</strong> Without intervention, search visibility continues to decay as AI systems replace traditional result layouts.
    </p>
    
    <p style="margin-bottom: 2rem;">
      <a data-contact-trigger href="#" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary); color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 500;">Get an AI Search Assessment</a>
    </p>
  </section>

  <section class="technical-explanation">
    <h2>How We Optimize for AI Search</h2>
    <p>AI search platforms use specialized algorithms that prioritize different factors than traditional search engines. Our methodology addresses these unique requirements:</p>
    
    <ul>
      <li><strong>Deterministic content token systems:</strong> We implement content structures that AI search engines can consistently parse and understand, ensuring reliable information extraction and ranking.</li>
      <li><strong>Crawl-clarity ranking:</strong> We optimize content organization and semantic structure to improve how AI systems process and rank your information.</li>
      <li><strong>Structured embedding:</strong> We implement semantic embedding strategies that align with how AI search platforms store and retrieve information.</li>
    </ul>
    
    <p>This specialized approach ensures your content performs optimally across all major AI search interfaces.</p>
  </section>

  <section class="platform-optimization">
    <h2>Multi-Platform AI Search Optimization</h2>
    <p>Each AI search platform has unique characteristics that require specialized optimization:</p>
    
    <ul>
      <li><strong>Google AI Mode:</strong> Optimized for Google's AI Overview system, focusing on entity recognition, authority signals, and semantic relevance for AI-generated summaries.</li>
      <li><strong>Bing Copilot:</strong> Structured for Microsoft's AI search interface, emphasizing cross-platform authority and knowledge graph integration.</li>
      <li><strong>Perplexity:</strong> Optimized for Perplexity's source citation system, ensuring your content becomes a reliable reference for AI-generated answers.</li>
      <li><strong>Emerging platforms:</strong> Prepared for future AI search interfaces through flexible, platform-agnostic optimization strategies.</li>
    </ul>
  </section>

  <section class="use-cases">
    <h2>AI Search Optimization Success Stories</h2>
    <p>We've helped brands achieve measurable improvements across AI search platforms:</p>
    
    <ul>
      <li><strong>E-commerce brands:</strong> Achieved consistent AI Overview appearances for product categories, driving significant traffic through AI-generated summaries.</li>
      <li><strong>Professional services:</strong> Optimized for AI search citations, becoming the go-to reference for specialized expertise across multiple platforms.</li>
      <li><strong>Technology companies:</strong> Structured content for AI search algorithms, achieving featured placement in AI-generated technical comparisons.</li>
      <li><strong>Educational institutions:</strong> Optimized for AI search discovery, driving enrollment through AI-recommended educational content.</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    
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

  <section class="cta">
    <h2>Ready to Dominate AI Search?</h2>
    <p>Transform your content's performance across AI search platforms. Our specialized methodology drives measurable improvements in AI search visibility and ranking.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/geo/') ?>">Learn about GEO →</a> | <a href="<?= Canonical::absolute('/services/aeo/') ?>">Answer Engine Optimization →</a></p>
  </section>
</main>
