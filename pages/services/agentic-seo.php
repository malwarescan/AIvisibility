<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';
require_once __DIR__.'/../../inc/seo.php'; // NC: Include SEO helpers

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'Agentic SEO & AI Overview Optimization']
];

// NC: Lift CTR without layout changes
$ctx = [
  'title' => 'Agentic SEO — Optimize for Google AI Overviews & LLM Discovery | Neural Command',
  'desc' => 'Agentic SEO that LLMs can parse and trust. We implement Service + FAQ + LocalBusiness schema, crawl clarity, and programmatic coverage for measurable AI visibility.'
];

// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'serviceType' => 'Agentic SEO & AI Overview Optimization',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ],
    'hasOfferCatalog' => [
      '@type' => 'OfferCatalog',
      'name' => 'Agentic SEO Packages',
      'itemListElement' => [
        [
          '@type' => 'Offer',
          'name' => 'AI Overview Optimization',
          'priceCurrency' => 'USD',
          'availability' => 'https://schema.org/InStock'
        ]
      ]
    ],
    'review' => [
      '@type' => 'Review',
      'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
      'author' => ['@type' => 'Person', 'name' => 'Verified Client'],
      'reviewBody' => 'Neural Command\'s Agentic SEO services delivered exceptional results for our AI visibility goals. Their expertise in optimizing for AI agents and AI Overviews significantly improved our brand\'s presence in AI-generated content.',
      'itemReviewed' => [
        '@type' => 'Service',
        'name' => 'Agentic SEO & AI Overview Optimization'
      ]
    ]
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'What is Agentic SEO?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Agentic SEO optimizes for AI agent confidence and transparency. We focus on agentic confidence scoring, retrieval transparency, and multimodal entity coherence to ensure AI systems can confidently cite and reference your content in AI Overviews and other AI-powered responses.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How do AI Overviews decide what to show?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AI Overviews select content based on agentic confidence scoring, retrieval transparency, and multimodal entity coherence. Our Agentic SEO optimizes for these factors by ensuring your content demonstrates clear authority, comprehensive coverage, and trustworthy information architecture.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'What does Neural Command optimize for agentic readiness?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'We optimize for agentic readiness through confidence scoring improvements, retrieval transparency enhancements, and multimodal entity coherence. This includes structured data optimization, content architecture improvements, and authority signal amplification for maximum AI agent confidence.'
        ]
      ]
    ]
  ]
];

// NC: Unified JSON-LD (Service + FAQPage + LocalBusiness)
$currentUrl = nc_abs($_SERVER['REQUEST_URI'] ?? '/');
$serviceName = 'Agentic SEO & AI Overview Optimization';

$unifiedSchema = [
  '@context' => 'https://schema.org',
  '@type' => ['Service','FAQPage'],
  'name' => $serviceName,
  'alternateName' => ['Generative Engine Optimization','Agentic SEO','AI Overview Optimization','AI Search Optimization'],
  'serviceType' => $serviceName,
  'url' => $currentUrl,
  'description' => 'Schema-first implementation for AI discoverability across Google AI Overviews, ChatGPT, Claude, and Perplexity.',
  'provider' => [
    '@type' => 'Organization',
    'name' => 'Neural Command, LLC',
    'url' => nc_base_url(),
    'telephone' => '+1-844-568-4624',
    'address' => [
      '@type' => 'PostalAddress',
      'streetAddress' => '1639 11th St Suite 110-A',
      'addressLocality' => 'Santa Monica',
      'addressRegion' => 'CA',
      'postalCode' => '90404',
      'addressCountry' => 'US'
    ],
    'sameAs' => [
      'https://www.linkedin.com/company/neural-command',
      'https://g.co/kgs/EP6p5de'
    ]
  ],
  'areaServed' => [ ['@type'=>'Country','name'=>'United States'] ],
  'offers' => [
    '@type' => 'Offer',
    'priceCurrency' => 'USD',
    'price' => 'Custom',
    'availability' => 'https://schema.org/InStock',
    'url' => $currentUrl
  ],
  'potentialAction' => [
    '@type' => 'ContactAction',
    'target' => nc_abs('/contact/'),
    'name' => 'Request Consultation'
  ],
  'mainEntity' => [
    [
      '@type'=>'Question',
      'name'=>"Why is my page 'URL is not on Google'?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>'It usually means Google found the URL but has not indexed it yet due to thin/duplicate content, weak internal links, crawl budget limits, canonical issues, or soft 404s.']
    ],
    [
      '@type'=>'Question',
      'name'=>'How do I fix "Crawled — currently not indexed"?',
      'acceptedAnswer'=>['@type'=>'Answer','text'=>'Strengthen internal links from authoritative pages, add unique entity-rich content and FAQs, confirm 200 OK, add canonical, submit an updated sitemap, then request indexing once.']
    ],
    [
      '@type'=>'Question',
      'name'=>'What schema improves AI visibility?',
      'acceptedAnswer'=>['@type'=>'Answer','text'=>'Service + FAQPage + LocalBusiness with potentialAction. Ensure accurate serviceType, areaServed, provider identity, and consistent canonicals.']
    ]
  ]
];

// Add unified schema to global array for template rendering
$GLOBALS['serviceSchemas'] = [$unifiedSchema];
?>
<main class="container py-8">
  <h1>Agentic SEO & AI Overview Optimization</h1>
  <p class="lead">Optimize for AI agent confidence and transparency.</p>

  <section class="intro">
    <h2>Why Agentic SEO Matters</h2>
    <p>AI agents are becoming the primary interface for information discovery, making agentic SEO crucial for brand visibility and authority. Our Agentic SEO services ensure your content becomes the preferred source for AI agents and AI Overviews.</p>
    
    <p>We focus on three critical areas: agentic confidence scoring that increases AI agent trust in your content, retrieval transparency that makes your information easily accessible to AI systems, and multimodal entity coherence that ensures consistent representation across AI platforms.</p>
  </section>

  <section class="technical-explanation">
    <h2>How We Implement Agentic SEO</h2>
    <p>Agentic SEO requires a fundamental shift from human-focused optimization to AI agent-focused optimization. Our methodology addresses this transformation:</p>
    
    <ul>
      <li><strong>Agentic confidence scoring:</strong> We optimize content structure and authority signals to increase AI agent confidence in your content, ensuring your expertise becomes the go-to source for specific queries.</li>
      <li><strong>Retrieval transparency:</strong> We implement content architectures that make information easily retrievable and understandable by AI agents, improving your visibility in AI Overviews.</li>
      <li><strong>Multimodal entity coherence:</strong> We ensure consistent entity representation across text, images, and structured data, creating comprehensive entity profiles that AI agents can confidently reference.</li>
    </ul>
    
    <p>This approach transforms your content from human-optimized to agent-optimized, ensuring AI agents naturally reference your expertise.</p>
  </section>

  <section class="ai-overview-optimization">
    <h2>AI Overview Optimization Strategy</h2>
    <p>AI Overviews represent the future of information discovery, and our agentic SEO methodology optimizes for this critical interface:</p>
    
    <ul>
      <li><strong>Confidence signal amplification:</strong> We implement signals that demonstrate your content's reliability and authority, increasing AI agent confidence in your recommendations.</li>
      <li><strong>Retrieval pathway optimization:</strong> We optimize the pathways that AI agents use to retrieve and summarize your content, ensuring maximum visibility in AI Overviews.</li>
      <li><strong>Entity coherence enhancement:</strong> We ensure your entity representation remains consistent across all content types, building comprehensive authority profiles that AI agents recognize.</li>
      <li><strong>Citation readiness optimization:</strong> We structure content for AI citation systems, ensuring your brand gets proper attribution when AI agents reference your expertise.</li>
    </ul>
  </section>

  <section class="use-cases">
    <h2>Agentic SEO Success Stories</h2>
    <p>We've helped brands achieve measurable improvements in AI agent visibility and AI Overview appearances:</p>
    
    <ul>
      <li><strong>Healthcare providers:</strong> Achieved consistent AI Overview appearances for medical expertise, becoming the go-to source for AI-generated health information.</li>
      <li><strong>Legal firms:</strong> Optimized for AI legal research tools, achieving featured placement in AI-generated legal guidance and case summaries.</li>
      <li><strong>Technology companies:</strong> Structured technical expertise for AI agents, becoming the default reference for implementation guidance and technical explanations.</li>
      <li><strong>Educational institutions:</strong> Optimized for AI educational content, driving enrollment through AI-recommended learning resources and course summaries.</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>What is Agentic SEO?</h3>
      <p>Agentic SEO is the practice of optimizing content and structured data for AI agents and autonomous systems. Unlike traditional SEO that targets human users, Agentic SEO optimizes for AI agent confidence, retrieval transparency, and multimodal entity coherence to ensure maximum visibility in AI Overviews and AI-generated content.</p>
    </div>
    
    <div class="faq-item">
      <h3>How do AI Overviews decide what to show?</h3>
      <p>AI Overviews use sophisticated algorithms that evaluate agentic confidence scoring, retrieval transparency, and multimodal entity coherence. They prioritize content that demonstrates clear authority signals, semantic clarity, and trustworthy information architecture that AI agents can confidently reference and summarize.</p>
    </div>
    
    <div class="faq-item">
      <h3>What does Neural Command optimize for agentic readiness?</h3>
      <p>We optimize for agentic readiness through confidence scoring optimization, retrieval transparency enhancement, and multimodal entity coherence. This includes structured data implementation, semantic organization, and authority signal amplification that ensures AI agents can confidently reference and summarize your expertise.</p>
    </div>
  </section>

  <section class="cta">
    <h2>Ready to Optimize for AI Agents?</h2>
    <p>Transform your content into the source that AI agents confidently reference. Our Agentic SEO methodology drives measurable improvements in AI Overview visibility and AI agent citations.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/geo/') ?>">Learn about GEO →</a> | <a href="<?= Canonical::absolute('/services/schema-optimizer/') ?>">Schema Optimization →</a></p>
  </section>
</main>
