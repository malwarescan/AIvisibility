<?php
declare(strict_types=1);
require_once dirname(__DIR__).'/bootstrap/canonical.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => I18n::t('nav.home'), 'url' => Canonical::absolute('/')],
];

// Set page context for the main template
$ctx = [
  'title' => I18n::t('meta.home.title'),
  'desc' => I18n::t('meta.home.desc'),
  'lang' => I18n::getCurrentLanguage()
];
?>

<main class="container mx-auto px-4 py-10">
  <div class="max-w-6xl mx-auto">
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        <?= I18n::t('home.hero.title') ?>
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        <?= I18n::t('home.hero.subtitle') ?>
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact/" class="btn btn-primary">
          <?= I18n::t('home.hero.cta') ?>
        </a>
        <a href="/resources/diagnostic/" class="btn btn-secondary">
          <?= I18n::t('common.free_audit') ?>
        </a>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-12"><?= I18n::t('nav.services') ?></h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4"><?= I18n::t('services.agentic_seo.title') ?></h3>
          <p class="text-gray-600 mb-4"><?= I18n::t('services.agentic_seo.desc') ?></p>
          <a href="/services/agentic-seo/" class="text-blue-600 hover:underline">
            <?= I18n::t('common.learn_more') ?>
          </a>
        </div>
        
        <div class="card">
          <h3 class="text-xl font-semibold mb-4"><?= I18n::t('services.ai_consulting.title') ?></h3>
          <p class="text-gray-600 mb-4"><?= I18n::t('services.ai_consulting.desc') ?></p>
          <a href="/services/ai-consulting/" class="text-blue-600 hover:underline">
            <?= I18n::t('common.learn_more') ?>
          </a>
        </div>
        
        <div class="card">
          <h3 class="text-xl font-semibold mb-4"><?= I18n::t('services.schema_optimizer.title') ?></h3>
          <p class="text-gray-600 mb-4"><?= I18n::t('services.schema_optimizer.desc') ?></p>
          <a href="/services/schema-optimizer/" class="text-blue-600 hover:underline">
            <?= I18n::t('common.learn_more') ?>
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Research -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-12">Featured Research</h2>
      <div class="max-w-4xl mx-auto">
        <article class="card">
          <div class="p-8">
            <h3 class="text-2xl font-semibold mb-4">
              <a href="/insights/geo-16-framework/" class="hover:text-blue-600">
                AI Answer Engine Citation Behavior: The GEO-16 Framework Explained
              </a>
            </h3>
            <p class="text-gray-600 mb-4">
              How to reach GEO ≥ 0.70 and earn cross-engine citations using structured data, semantic HTML, and freshness signals.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">October 11, 2025</span>
              <a href="/insights/geo-16-framework/" class="btn btn-primary">
                <?= I18n::t('common.read_more') ?>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</main>

<?php
// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'WebPage',
    '@id' => Canonical::absolute('/'),
    'url' => Canonical::absolute('/'),
    'name' => I18n::t('meta.home.title'),
    'description' => I18n::t('meta.home.desc'),
    'inLanguage' => I18n::getCurrentLanguage(),
    'isPartOf' => ['@id' => Canonical::absolute('/#website')],
    'about' => ['@id' => Canonical::absolute('/#organization')],
    'potentialAction' => [
      '@type' => 'Action',
      'name' => I18n::t('common.book_consultation'),
      'target' => Canonical::absolute('/contact/')
    ]
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'WebSite',
    '@id' => Canonical::absolute('/#website'),
    'url' => Canonical::absolute('/'),
    'name' => 'Neural Command, LLC',
    'publisher' => ['@id' => Canonical::absolute('/#organization')],
    'potentialAction' => [
      '@type' => 'SearchAction',
      'target' => Canonical::absolute('/search?q={search_term_string}'),
      'query-input' => 'required name=search_term_string'
    ]
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    '@id' => Canonical::absolute('/#organization'),
    'name' => 'Neural Command, LLC',
    'address' => [
      '@type' => 'PostalAddress',
      'streetAddress' => '1639 11th St Suite 110-A',
      'addressLocality' => 'Santa Monica',
      'addressRegion' => 'CA',
      'postalCode' => '90404',
      'addressCountry' => 'US'
    ],
    'telephone' => '+1-844-568-4624',
    'url' => Canonical::absolute('/'),
    'sameAs' => [
      'https://www.linkedin.com/company/neural-command/',
      'https://g.co/kgs/EP6p5de'
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>
