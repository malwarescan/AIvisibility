<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../config.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => 'Structured Data Engineering']
];

// Set page context for the main template
$ctx = [
  'title' => 'Structured Data Engineering for Search Visibility | Neural Command LLC',
  'desc' => 'Neural Command LLC designs and implements structured data systems required for modern search eligibility.'
];

// Service-specific JSON-LD schemas (per Master Schema Matrix)
// Service pages: Service + BreadcrumbList + conditional FAQPage
// NO Offer, NO Review, NO OfferCatalog, NO Product
require_once __DIR__.'/../../lib/schema_enforcement.php';

$serviceSchemas = [
  SchemaEnforcement::generateService([
    '@id' => Canonical::absolute('/services/structured-data-engineering/').'#service',
    'name' => 'Structured Data Engineering for Search Visibility',
    'description' => 'Neural Command LLC designs and implements structured data systems required for modern search eligibility.',
    'serviceType' => 'Structured Data Engineering',
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
  <h1>Structured Data Engineering for Search Visibility</h1>
  
  <section class="intro mb-3xl">
    <p class="text-lg leading-relaxed mb-xl max-w-md">
      Neural Command LLC designs and implements structured data systems required for modern search eligibility.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>Who it's for:</strong> For businesses whose content is technically sound but invisible to AI-driven search features.
    </p>
    
    <p class="mb-lg max-w-md">
      <strong>What it fixes:</strong> We implement and validate structured data that enables indexing, rich results, and AI retrieval.
    </p>
    
    <p class="mb-xl max-w-md">
      <strong>Cost of inaction:</strong> Your content remains unreadable to machines that now control visibility.
    </p>
    
    <p class="mb-xl">
      <a data-contact-trigger href="#" class="btn-primary-inline">Review Structured Data Eligibility</a>
    </p>
  </section>
</main>

