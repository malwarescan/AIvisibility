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
  <h1>Google AI Overview Optimization</h1>
  
  <section class="intro" style="margin-bottom: 3rem;">
    <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 2rem; max-width: 700px;">
      Neural Command LLC optimizes websites for eligibility and visibility inside Google AI Overviews.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>Who it's for:</strong> For businesses whose content is not appearing in AI-generated answers despite strong historical rankings.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>What it fixes:</strong> We correct structural, semantic, and eligibility gaps that prevent your content from being selected for AI Overviews.
    </p>
    
    <p style="margin-bottom: 2rem; max-width: 700px;">
      <strong>Cost of inaction:</strong> Competitors become the source of AI answers while your content is ignored.
    </p>
    
    <p style="margin-bottom: 2rem;">
      <a data-contact-trigger href="#" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary); color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 500;">Evaluate AI Overview Eligibility</a>
    </p>
  </section>
</main>

