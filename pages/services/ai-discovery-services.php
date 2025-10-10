<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'AI Discovery Services']
];

// Set page context for the main template
$ctx = [
  'title' => 'AI Discovery Services | Neural Command LLC',
  'desc' => 'Become the default recommendation. Our AI Discovery Services focus on entity registration, AI knowledge graph integration, and cross-LLM surface optimization for maximum AI visibility.'
];

// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'serviceType' => 'AI Discovery Services',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ],
    'hasOfferCatalog' => [
      '@type' => 'OfferCatalog',
      'name' => 'AI Discovery Packages',
      'itemListElement' => [
        [
          '@type' => 'Offer',
          'name' => 'Entity Registration + Optimization',
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
        'name' => 'What are AI Discovery Services?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AI Discovery Services optimize your brand\'s presence across AI knowledge graphs and recommendation systems. We focus on entity registration, cross-platform AI visibility, and becoming the default recommendation when users seek solutions in your domain.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How do AI agents choose what to recommend?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AI agents use complex algorithms that evaluate entity authority, trust signals, relevance scores, and knowledge graph connections. Our AI Discovery Services optimize for these recommendation factors by building comprehensive entity profiles and authority signals across multiple AI platforms.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'What are entity reputation signals?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Entity reputation signals are the factors AI systems use to evaluate your brand\'s credibility and expertise. These include structured data completeness, cross-platform mentions, authority citations, and knowledge graph integration depth. We optimize all these signals for maximum AI discovery.'
        ]
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
if (!isset($GLOBALS['serviceSchemas'])) {
  $GLOBALS['serviceSchemas'] = [];
}
$GLOBALS['serviceSchemas'] = array_merge($GLOBALS['serviceSchemas'], $serviceSchemas);
?>

<main class="container py-8">
  <h1>AI Discovery Services</h1>
  <p class="lead">Become the default recommendation.</p>

  <section class="intro">
    <h2>Why AI Discovery Matters</h2>
    <p>As AI systems become the primary interface for information discovery, being found by AI agents is just as important as being found by humans. Our AI Discovery Services ensure your brand becomes the default recommendation when users seek solutions in your domain.</p>
    
    <p>We focus on three critical areas: entity registration that establishes your presence in AI knowledge graphs, cross-LLM surface optimization that ensures visibility across multiple AI platforms, and trust graph integration that positions your brand as the authoritative source.</p>
  </section>

  <section class="technical-explanation">
    <h2>How We Optimize AI Discovery</h2>
    <p>AI Discovery operates through sophisticated entity recognition and recommendation algorithms. Our methodology addresses each component:</p>
    
    <ul>
      <li><strong>Entity registration:</strong> We establish comprehensive entity profiles across AI knowledge graphs, ensuring your brand is properly represented in AI training data and retrieval systems.</li>
      <li><strong>AI knowledge graph integration:</strong> We optimize your entity relationships and connections within AI knowledge graphs, increasing the likelihood of AI recommendations.</li>
      <li><strong>Cross-LLM surface optimization:</strong> We ensure consistent entity representation across ChatGPT, Claude, Gemini, and emerging AI platforms, maximizing discovery opportunities.</li>
    </ul>
    
    <p>This systematic approach transforms your brand from an unknown entity into the default recommendation for your expertise area.</p>
  </section>

  <section class="trust-graph">
    <h2>Trust Graph Optimization</h2>
    <p>AI systems rely heavily on trust graphs to determine recommendation quality. Our AI Discovery Services optimize your position within these graphs:</p>
    
    <ul>
      <li><strong>Authority signal amplification:</strong> We strengthen your authority signals across multiple platforms, creating a consistent trust profile that AI systems recognize.</li>
      <li><strong>Entity relationship mapping:</strong> We establish and optimize relationships with other authoritative entities in your domain, increasing your trust graph centrality.</li>
      <li><strong>Cross-platform consistency:</strong> We ensure your entity representation remains consistent across all AI platforms, building cumulative trust signals.</li>
      <li><strong>Recommendation pathway optimization:</strong> We optimize the pathways that lead AI systems to recommend your brand, increasing discovery frequency.</li>
    </ul>
  </section>

  <section class="use-cases">
    <h2>AI Discovery Success Stories</h2>
    <p>We've helped brands achieve measurable AI discovery improvements:</p>
    
    <ul>
      <li><strong>Software companies:</strong> Achieved default recommendation status in AI-generated software comparisons, driving significant user acquisition.</li>
      <li><strong>Professional services:</strong> Positioned as the go-to recommendation for specialized expertise, resulting in high-value client referrals.</li>
      <li><strong>E-commerce brands:</strong> Optimized for AI shopping assistants, becoming the default recommendation for specific product categories.</li>
      <li><strong>Educational institutions:</strong> Established authority in AI knowledge graphs, driving enrollment through AI recommendations.</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>What are AI Discovery Services?</h3>
      <p>AI Discovery Services optimize your brand's presence across AI knowledge graphs and recommendation systems. We focus on entity registration, cross-platform AI visibility, and becoming the default recommendation when users seek solutions in your domain.</p>
    </div>
    
    <div class="faq-item">
      <h3>How do AI agents choose what to recommend?</h3>
      <p>AI agents use complex algorithms that evaluate entity authority, trust signals, relevance scores, and knowledge graph connections. Our AI Discovery Services optimize for these recommendation factors by building comprehensive entity profiles and authority signals across multiple AI platforms.</p>
    </div>
    
    <div class="faq-item">
      <h3>What are entity reputation signals?</h3>
      <p>Entity reputation signals are the factors AI systems use to evaluate your brand's credibility and expertise. These include structured data completeness, cross-platform mentions, authority citations, and knowledge graph integration depth. We optimize all these signals for maximum AI discovery.</p>
    </div>
  </section>

  <section class="cta">
    <h2>Ready to Become the Default Recommendation?</h2>
    <p>Transform your brand's AI discovery potential. Our specialized methodology drives measurable improvements in AI recommendation frequency and quality.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/geo/') ?>">Learn about GEO →</a> | <a href="<?= Canonical::absolute('/services/ai-recommendation-consulting/') ?>">AI Recommendation Consulting →</a></p>
  </section>
</main>
