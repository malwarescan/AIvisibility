<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'Schema Optimizer & Reverse Engineer']
];

// Set page context for the main template
$ctx = [
  'title' => 'Schema Optimizer & Reverse Engineer | Neural Command LLC',
  'desc' => 'Optimize structured data for AI visibility. Our Schema Optimizer focuses on schema coverage audits, reverse-engineering competitors, and consensus checks through Entity Graph Builder and Schema Consensus Layer technologies.'
];

// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'serviceType' => 'Schema Optimizer & Reverse Engineer',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ],
    'hasOfferCatalog' => [
      '@type' => 'OfferCatalog',
      'name' => 'Schema Optimization Packages',
      'itemListElement' => [
        [
          '@type' => 'Offer',
          'name' => 'Schema Coverage Audit + Optimization',
          'priceCurrency' => 'USD',
          'availability' => 'https://schema.org/InStock'
        ]
      ]
    ],
    'review' => [
      '@type' => 'Review',
      'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
      'author' => ['@type' => 'Person', 'name' => 'Verified Client']
    ]
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'What schema types should every site include?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Every site should include Organization, WebSite, WebPage, and BreadcrumbList schemas as foundational elements. Additional schemas depend on content type: Service for service pages, FAQPage for Q&A content, LocalBusiness for location-based businesses, and Article for blog content.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How does schema affect AI visibility?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Schema markup directly affects AI visibility by providing structured context that AI systems can understand and trust. Comprehensive schema coverage improves entity recognition, authority scoring, and knowledge graph integration, making your content more likely to be cited by AI systems.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'Can we analyze competitors\' schema?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Yes, our Schema Optimizer includes reverse-engineering capabilities that analyze competitor schema implementations. We identify gaps, opportunities, and consensus patterns to ensure your schema strategy is comprehensive and competitive within your industry.'
        ]
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<main class="container py-8">
  <h1>Schema Optimizer & Reverse Engineer</h1>
  <p class="lead">Optimize structured data for AI visibility.</p>

  <section class="intro">
    <h2>Why Schema Optimization Matters</h2>
    <p>Structured data is the foundation of AI visibility and search engine understanding. Our Schema Optimizer ensures your structured data maximizes AI visibility across all platforms while providing comprehensive coverage audits and competitive intelligence.</p>
    
    <p>We focus on three critical areas: schema coverage audits that identify missing structured data opportunities, reverse-engineering competitors to understand their schema strategies, and consensus checks that ensure your structured data aligns with industry best practices.</p>
  </section>

  <section class="technical-explanation">
    <h2>How We Optimize Schema</h2>
    <p>Schema optimization requires a comprehensive approach that addresses both technical implementation and strategic positioning. Our methodology covers each component:</p>
    
    <ul>
      <li><strong>Schema coverage audits:</strong> We conduct comprehensive audits to identify missing schema types, optimization opportunities, and implementation gaps that affect AI visibility.</li>
      <li><strong>Reverse-engineering competitors:</strong> We analyze competitors' schema implementations to understand their structured data strategies and identify opportunities for competitive advantage.</li>
      <li><strong>Consensus checks:</strong> We verify that your schema implementation aligns with industry best practices and AI system requirements for maximum visibility.</li>
    </ul>
    
    <p>This systematic approach ensures your structured data provides maximum value for both AI systems and search engines.</p>
  </section>

  <section class="entity-graph-builder">
    <h2>Entity Graph Builder and Schema Consensus Layer</h2>
    <p>Our advanced schema optimization technologies provide comprehensive structured data solutions:</p>
    
    <ul>
      <li><strong>Entity Graph Builder:</strong> We create comprehensive entity graphs that establish clear relationships between your brand, services, and expertise areas, improving AI system understanding and citation frequency.</li>
      <li><strong>Schema Consensus Layer:</strong> We implement schema consensus layers that ensure your structured data aligns with AI system expectations and industry standards for maximum visibility.</li>
      <li><strong>Cross-platform optimization:</strong> We optimize schema for multiple AI platforms and search engines, ensuring consistent structured data representation across all interfaces.</li>
      <li><strong>Dynamic schema updates:</strong> We implement dynamic schema systems that automatically update structured data based on content changes and AI system requirements.</li>
    </ul>
  </section>

  <section class="use-cases">
    <h2>Schema Optimization Success Stories</h2>
    <p>We've helped brands achieve measurable improvements in AI visibility and search engine understanding:</p>
    
    <ul>
      <li><strong>E-commerce brands:</strong> Achieved consistent AI Overview appearances for product categories through comprehensive schema optimization and entity graph building.</li>
      <li><strong>Professional services:</strong> Optimized schema for AI citation systems, becoming the go-to reference for specialized expertise across multiple AI platforms.</li>
      <li><strong>Technology companies:</strong> Structured technical expertise for AI systems, achieving featured placement in AI-generated technical comparisons and explanations.</li>
      <li><strong>Educational institutions:</strong> Optimized schema for AI educational content, driving enrollment through AI-recommended learning resources and course information.</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>What schema types should every site include?</h3>
      <p>Every site should include core schema types: Organization, WebSite, WebPage, and BreadcrumbList. Additional schema types depend on your business type and content. We conduct comprehensive schema coverage audits to identify missing schema types and optimize existing structured data for maximum AI visibility and search engine understanding.</p>
    </div>
    
    <div class="faq-item">
      <h3>How does schema affect AI visibility?</h3>
      <p>Schema markup directly influences AI visibility by providing structured context that AI systems can easily parse and understand. Well-implemented schema improves entity recognition, knowledge graph integration, and AI citation frequency. Our Schema Optimizer ensures your structured data maximizes AI visibility across all platforms.</p>
    </div>
    
    <div class="faq-item">
      <h3>Can we analyze competitors' schema?</h3>
      <p>Yes, our Schema Reverse Engineer service analyzes competitors' schema implementations to identify optimization opportunities. We reverse-engineer their structured data strategies, identify gaps in your implementation, and develop comprehensive schema optimization plans that leverage competitive intelligence for maximum AI visibility.</p>
    </div>
  </section>

  <section class="cta">
    <h2>Ready to Optimize Your Schema?</h2>
    <p>Transform your structured data into a powerful AI visibility tool. Our Schema Optimizer drives measurable improvements in AI citation frequency and search engine understanding.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/geo/') ?>">Learn about GEO →</a> | <a href="<?= Canonical::absolute('/services/agentic-seo/') ?>">Agentic SEO →</a></p>
  </section>
</main>
