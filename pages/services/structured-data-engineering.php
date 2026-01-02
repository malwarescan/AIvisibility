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
  
  <section class="intro" style="margin-bottom: 3rem;">
    <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 2rem; max-width: 700px;">
      Neural Command LLC designs and implements structured data systems required for modern search eligibility.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>Who it's for:</strong> For businesses whose content is technically sound but invisible to AI-driven search features.
    </p>
    
    <p style="margin-bottom: 1.5rem; max-width: 700px;">
      <strong>What it fixes:</strong> We implement and validate structured data that enables indexing, rich results, and AI retrieval.
    </p>
    
    <p style="margin-bottom: 2rem; max-width: 700px;">
      <strong>Cost of inaction:</strong> Your content remains unreadable to machines that now control visibility.
    </p>
    
    <p style="margin-bottom: 2rem;">
      <a data-contact-trigger href="#" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary); color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 500;">Review Structured Data Eligibility</a>
    </p>
  </section>
</main>

