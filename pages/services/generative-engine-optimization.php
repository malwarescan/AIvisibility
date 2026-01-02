<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'Generative Engine Optimization']
];

// Set page context for the main template
// NC: Lift CTR without layout changes
$ctx = [
  'title' => 'Generative Engine Optimization (GEO) — Train LLMs About Your Brand | Neural Command',
  'desc' => 'GEO that LLMs can parse and trust. We implement entity-centric content modeling, JSON-LD propagation networks, and AI Overview readiness scoring for measurable AI visibility.'
];

// Service-specific JSON-LD schemas (per Master Schema Matrix)
// Service pages: Service + BreadcrumbList + conditional FAQPage
// NO Offer, NO Review, NO OfferCatalog, NO Product
require_once __DIR__.'/../../lib/schema_enforcement.php';

$serviceSchemas = [
  SchemaEnforcement::generateService([
    '@id' => canonical('/services/generative-engine-optimization/').'#service',
    'name' => 'Generative Engine Optimization',
    'description' => 'GEO that LLMs can parse and trust. We implement entity-centric content modeling, JSON-LD propagation networks, and AI Overview readiness scoring for measurable AI visibility.',
    'serviceType' => 'Generative Engine Optimization',
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
        'name' => 'What is Generative Engine Optimization?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'GEO is the practice of optimizing content and structured data for AI language models like ChatGPT, Claude, and Gemini. Unlike traditional SEO that targets search engines, GEO teaches AI systems about your entity\'s context, relationships, and expertise through structured data and entity-centric content modeling.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How does GEO differ from traditional SEO?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Traditional SEO focuses on keyword rankings and search engine algorithms. GEO optimizes for AI model training, entity recognition, and knowledge graph integration. While SEO targets Google\'s search results, GEO targets AI responses, recommendations, and citations across multiple AI platforms.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'Can GEO improve my visibility in ChatGPT?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Yes. GEO strategies directly influence how ChatGPT and other AI models understand and reference your brand. Through entity-centric content modeling, JSON-LD propagation networks, and AI Overview readiness scoring, we increase the likelihood of AI citations and recommendations.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'What metrics define GEO success?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'GEO success is measured through AI citation frequency, entity recognition accuracy, knowledge graph integration depth, and recommendation engine inclusion. We track AI Overview appearances, ChatGPT citations, and cross-platform AI references to demonstrate ROI.'
        ]
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<main class="container py-8">
  <h1>Generative Engine Optimization (GEO)</h1>
  
  <section class="intro mb-3xl">
    <p class="text-lg leading-relaxed mb-xl max-w-md">
      Neural Command LLC provides generative engine optimization services for visibility in AI-driven search and retrieval systems.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>Who it's for:</strong> For companies operating in markets where AI systems summarize, synthesize, or replace traditional search results.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>What it fixes:</strong> We align content, structure, and data so generative systems can retrieve and trust your information.
    </p>
    
    <p class="mb-xl max-w-md">
      <strong>Cost of inaction:</strong> AI systems summarize your market using competitor content instead of yours.
    </p>
    
    <p class="mb-xl">
      <a data-contact-trigger href="#" class="btn-primary-inline">Evaluate Generative Search Readiness</a>
    </p>
  </section>

  <section class="technical-explanation">
    <h2>How Neural Command Implements GEO</h2>
    <p>Our GEO approach operates on three foundational pillars that mirror how AI models actually learn and retrieve information:</p>
    
    <ul>
      <li><strong>Entity-centric content modeling:</strong> We restructure your content architecture around core entities rather than keywords, creating semantic clusters that AI models can easily parse and understand.</li>
      <li><strong>JSON-LD propagation networks:</strong> We implement comprehensive structured data that creates explicit relationships between your entities, services, and expertise areas, feeding directly into AI training pipelines.</li>
      <li><strong>AI Overview readiness scoring:</strong> We optimize content for AI summarization and citation, ensuring your expertise surfaces when AI models generate responses about your domain.</li>
    </ul>
    
    <p>This isn't about gaming algorithms—it's about becoming the definitive source that AI models naturally reference when users ask questions in your domain.</p>
  </section>

  <section class="use-cases">
    <h2>Real-World GEO Applications</h2>
    <p>We've implemented GEO strategies across industries with measurable AI visibility improvements:</p>
    
    <ul>
      <li><strong>Healthcare practices:</strong> Positioned as authoritative sources for medical AI responses, resulting in 340% increase in AI citations for specialized procedures.</li>
      <li><strong>SaaS platforms:</strong> Optimized for AI recommendation engines, achieving featured placement in AI-generated software comparisons.</li>
      <li><strong>Legal firms:</strong> Structured expertise for AI legal research tools, becoming the go-to reference for specific practice areas.</li>
      <li><strong>E-commerce brands:</strong> Optimized product entities for AI shopping assistants, driving direct AI-to-purchase conversions.</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>What is Generative Engine Optimization?</h3>
      <p>GEO is the practice of optimizing content and structured data for AI language models like ChatGPT, Claude, and Gemini. Unlike traditional SEO that targets search engines, GEO teaches AI systems about your entity's context, relationships, and expertise through structured data and entity-centric content modeling.</p>
    </div>
    
    <div class="faq-item">
      <h3>How does GEO differ from traditional SEO?</h3>
      <p>Traditional SEO focuses on keyword rankings and search engine algorithms. GEO optimizes for AI model training, entity recognition, and knowledge graph integration. While SEO targets Google's search results, GEO targets AI responses, recommendations, and citations across multiple AI platforms.</p>
    </div>
    
    <div class="faq-item">
      <h3>Can GEO improve my visibility in ChatGPT?</h3>
      <p>Yes. GEO strategies directly influence how ChatGPT and other AI models understand and reference your brand. Through entity-centric content modeling, JSON-LD propagation networks, and AI Overview readiness scoring, we increase the likelihood of AI citations and recommendations.</p>
    </div>
    
    <div class="faq-item">
      <h3>What metrics define GEO success?</h3>
      <p>GEO success is measured through AI citation frequency, entity recognition accuracy, knowledge graph integration depth, and recommendation engine inclusion. We track AI Overview appearances, ChatGPT citations, and cross-platform AI references to demonstrate ROI.</p>
    </div>
  </section>

  <section class="cta">
    <h2>Ready to Train the AI Engines?</h2>
    <p>Our GEO methodology transforms how AI models understand and reference your brand. Let's optimize your entity presence across the AI ecosystem.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/agentic-seo/') ?>">Learn about Agentic SEO →</a> | <a href="<?= Canonical::absolute('/services/schema-optimizer/') ?>">Schema Optimization →</a></p>
  </section>
</main>
