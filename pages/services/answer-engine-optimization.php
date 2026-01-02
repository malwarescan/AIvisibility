<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'Answer Engine Optimization']
];

// Set page context for the main template
$ctx = [
  'title' => 'Answer Engine Optimization (AEO) | Neural Command LLC',
  'desc' => 'Make your content answer-eligible. Our AEO services focus on answer eligibility, knowledge snippet preparation, and FAQ schema chaining for trustworthy compression and LLM summarization.'
];

// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'serviceType' => 'Answer Engine Optimization',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ],
    'hasOfferCatalog' => [
      '@type' => 'OfferCatalog',
      'name' => 'AEO Packages',
      'itemListElement' => [
        [
          '@type' => 'Offer',
          'name' => 'Answer Eligibility Optimization',
          'priceCurrency' => 'USD',
          'availability' => 'https://schema.org/InStock'
        ]
      ]
    ],
    'review' => [
      '@type' => 'Review',
      'reviewRating' => ['@type' => 'Rating', 'ratingValue' => '5', 'bestRating' => '5'],
      'author' => ['@type' => 'Person', 'name' => 'Verified Client'],
      'reviewBody' => 'Neural Command\'s AEO services made our content answer-eligible across AI platforms. Their expertise in answer eligibility, knowledge snippet preparation, and FAQ schema chaining significantly improved our AI-generated content visibility.',
      'itemReviewed' => [
        '@type' => 'Service',
        'name' => 'Answer Engine Optimization'
      ]
    ]
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'What is Answer Engine Optimization?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Answer Engine Optimization (AEO) makes your content eligible for direct AI responses and answer engines. We optimize for answer eligibility through knowledge snippet preparation, FAQ schema chaining, and trustworthy compression for LLM summarization.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How does AEO relate to featured snippets?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'AEO extends beyond traditional featured snippets to optimize for AI-powered answer engines. While featured snippets target Google\'s search results, AEO optimizes for AI Overviews, ChatGPT responses, and other AI systems that provide direct answers.'
        ]
      ],
      [
        '@type' => 'Question',
        'name' => 'How do we make content answer-eligible?',
        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'We make content answer-eligible by structuring information for AI consumption, implementing comprehensive FAQ schemas, optimizing for knowledge snippet extraction, and ensuring trustworthy compression that AI systems can confidently summarize and cite.'
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
    <h1>Answer Engine Optimization Services</h1>
    <p class="service-subtitle">
      Neural Command LLC provides answer engine optimization services that help businesses remain visible as search shifts from clicks to answers.
    </p>
  </section>
  
  <section class="intro mb-3xl">
    
    <p class="mb-lg max-w-md">
      <strong>Who it's for:</strong> For organizations whose customers now receive answers directly from search engines instead of visiting websites.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>What it fixes:</strong> We restructure content and signals so your site is chosen as the answer source.
    </p>
    
    <p class="mb-xl max-w-md">
      <strong>Cost of inaction:</strong> Your brand disappears from customer decision paths even when demand still exists.
    </p>
    
    <p class="mb-xl">
      <a data-contact-trigger href="#" class="btn-primary-inline">Assess Answer Engine Visibility</a>
    </p>
  </section>

  <section class="service-section service-section--muted">
    <h2 class="service-section-title">How We Implement AEO</h2>
    <p>AEO requires a fundamental shift from keyword-focused content to answer-focused architecture. Our methodology addresses this transformation:</p>
    
    <ul>
      <li><strong>Answer eligibility optimization:</strong> We restructure content to be easily parsed and summarized by AI systems, ensuring your expertise becomes the go-to source for specific questions.</li>
      <li><strong>Knowledge snippet preparation:</strong> We create content structures that AI systems can efficiently extract and reference, making your information the default answer source.</li>
      <li><strong>FAQ schema chaining:</strong> We implement comprehensive FAQ structures that create answer frameworks for AI systems to reference and build upon.</li>
    </ul>
    
    <p>This approach transforms your content from search-optimized to answer-optimized, ensuring AI systems naturally reference your expertise.</p>
  </section>

  <section class="service-section">
    <h2 class="service-section-title">Trustworthy Compression for LLM Summarization</h2>
    <p>AI systems excel at compressing and summarizing information, but they need trustworthy sources to reference. Our AEO methodology optimizes for this compression process:</p>
    
    <ul>
      <li><strong>Semantic clarity:</strong> We structure content with clear semantic boundaries that AI systems can easily parse and summarize.</li>
      <li><strong>Authority signals:</strong> We implement authority indicators that help AI systems identify your content as a trustworthy source for summarization.</li>
      <li><strong>Answer frameworks:</strong> We create answer templates that AI systems can use as reference points for generating responses.</li>
      <li><strong>Citation readiness:</strong> We optimize content for AI citation systems, ensuring your brand gets proper attribution when AI systems reference your expertise.</li>
    </ul>
  </section>

  <section class="service-section">
    <div class="service-proof">
      <h2 class="service-section-title">AEO Success Stories</h2>
      <p>We've helped brands achieve measurable improvements in AI answer eligibility:</p>
      
      <ul>
      <li><strong>Healthcare providers:</strong> Achieved consistent AI citations for medical advice, becoming the go-to source for AI-generated health information.</li>
      <li><strong>Legal firms:</strong> Optimized for AI legal research tools, achieving featured placement in AI-generated legal guidance.</li>
      <li><strong>Technology companies:</strong> Structured technical expertise for AI systems, becoming the default reference for implementation guidance.</li>
      <li><strong>Educational institutions:</strong> Optimized for AI educational content, driving enrollment through AI-recommended learning resources.</li>
      </ul>
    </div>
  </section>

  <section class="service-section">
    <h2 class="service-section-title">Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3>What is AEO?</h3>
      <p>Answer Engine Optimization (AEO) is the practice of structuring content to be easily summarized and cited by AI systems. Unlike traditional SEO that targets search rankings, AEO focuses on making content answer-eligible through knowledge snippet preparation, FAQ schema chaining, and trustworthy compression for LLM summarization.</p>
    </div>
    
    <div class="faq-item">
      <h3>How does AEO relate to featured snippets?</h3>
      <p>AEO builds upon featured snippet optimization but extends it to AI systems. While featured snippets target Google's answer boxes, AEO optimizes for AI language models, ChatGPT citations, and AI Overviews. The goal is to become the source that AI systems naturally reference when generating answers.</p>
    </div>
    
    <div class="faq-item">
      <h3>How do we make content answer-eligible?</h3>
      <p>We make content answer-eligible through structured data implementation, semantic organization, and answer-focused content architecture. This includes FAQ schema chaining, knowledge snippet preparation, and trustworthy compression that allows AI systems to easily extract and summarize your expertise.</p>
    </div>
  </section>

  <section class="service-cta">
    <h2>Ready to Make Your Content Answer-Eligible?</h2>
    <p>Transform your content into the source that AI systems naturally reference. Our AEO methodology drives measurable improvements in AI answer eligibility and citation frequency.</p>
    <p><a href="<?= Canonical::absolute('/resources/diagnostic/') ?>" class="btn btn-primary">Run AI Visibility Diagnostic</a></p>
    <p><a href="<?= Canonical::absolute('/services/ai-search-optimization/') ?>">Learn about AI Search Optimization →</a> | <a href="<?= Canonical::absolute('/services/schema-optimizer/') ?>">Schema Optimization →</a></p>
  </section>
</main>
