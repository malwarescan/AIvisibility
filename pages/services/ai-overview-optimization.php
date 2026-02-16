<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'AI Overview Optimization']
];

// Set page context for the main template
$ctx = [
  'title' => 'Google AI Overview Optimization | Neural Command LLC',
  'desc' => 'Neural Command LLC optimizes websites for eligibility and visibility inside Google AI Overviews.'
];

// Service-specific JSON-LD schemas (per Master Schema Matrix)
// Service pages: Service + BreadcrumbList + conditional FAQPage
// NO Offer, NO Review, NO OfferCatalog, NO Product
require_once __DIR__.'/../../lib/schema_enforcement.php';

$serviceSchemas = [
  SchemaEnforcement::generateService([
    '@id' => Canonical::absolute('/services/ai-overview-optimization/').'#service',
    'name' => 'Google AI Overview Optimization',
    'description' => 'Neural Command LLC optimizes websites for eligibility and visibility inside Google AI Overviews.',
    'serviceType' => 'AI Overview Optimization',
    'provider' => ['@id' => 'https://nrlcmd.com/#organization'],
    'areaServed' => [
      '@type' => 'AdministrativeArea',
      'name' => 'Global'
    ]
  ])
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<main class="container py-8">
  <section class="service-hero">
    <h1
</h1>
<p class="mb-md max-w-md leading-relaxed">
  <strong>AI Overview Optimization</strong> improves your eligibility and visibility inside Google AI Overviews by aligning page structure, entities, and verification signals that generative summaries pull from.
</p>
<section class="card-style mb-lg">
  <h2 class="text-xl font-semibold mb-sm">What you get</h2>
  <ul class="list-disc pl-lg text-muted">
    <li>Overview-eligibility structural upgrades (answer-first formatting)</li>
    <li>Entity reinforcement and definition blocks that survive chunking</li>
    <li>FAQ scaffolds that match common overview prompts</li>
    <li>Snippet + summary safety rails to reduce paraphrase drift</li>
  </ul>
</section>
<section class="card-style mb-lg">
  <h2 class="text-xl font-semibold mb-sm">FAQ</h2>
  <h3 class="text-lg font-semibold mb-xs">What makes a page eligible for AI Overviews?</h3>
  <p class="text-muted">Clear answers, strong entity context, consistent structured data, and content that can be verified and extracted reliably.</p>
  <h3 class="text-lg font-semibold mb-xs">Do you need new pages?</h3>
  <p class="text-muted">Sometimes. If you lack a dedicated citation surface for a query cluster, we create one.</p>
</section>
>Google AI Overview Optimization</h1>
    <p class="service-subtitle">
      Neural Command LLC optimizes websites for eligibility and visibility inside Google AI Overviews.
    </p>
  </section>
  
  <section class="intro mb-3xl">
    
    <p class="mb-lg max-w-md">
      <strong>Who it's for:</strong> For businesses whose content is not appearing in AI-generated answers despite strong historical rankings.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>What it fixes:</strong> We correct structural, semantic, and eligibility gaps that prevent your content from being selected for AI Overviews.
    </p>
    
    <p class="mb-xl max-w-md">
      <strong>Cost of inaction:</strong> Competitors become the source of AI answers while your content is ignored.
    </p>
    
    <p class="mb-xl">
      <a data-contact-trigger href="#" class="btn-primary-inline">Evaluate AI Overview Eligibility</a>
    </p>
  </section>

  <section class="service-cta">
    <h2>Ready to Improve AI Overview Eligibility?</h2>
    <p>Get started with an AI Overview eligibility assessment.</p>
    <p><a data-contact-trigger href="#" class="btn-primary-inline">Evaluate AI Overview Eligibility</a></p>
  </section>
</main>

