<?php
declare(strict_types=1);
/** Inputs: $service, $city from index.php router */
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../lib/links.php';
require_once __DIR__.'/../../lib/schema.php';
require_once __DIR__.'/../../lib/schema_builders.php';
require_once __DIR__.'/../../lib/content_tokens.php';
require_once __DIR__.'/../../inc/seo.php'; // NC: Include SEO helpers

$service = Canonical::kebab($_GET['service'] ?? '');
$city    = Canonical::kebab($_GET['city'] ?? '');
$path    = "/services/$service/$city/";
$canonical = Canonical::absoluteCanonical($path);

// Generate deterministic content sections
$sections = compose_content($service, $city, $canonical);

$serviceName = ucwords(str_replace('-', ' ', $service));
$cityName    = ucwords(str_replace('-', ' ', $city));

// Extract state abbreviation if present (e.g., "san-francisco-ca" -> "CA")
$stateAbbr = '';
if (preg_match('/^(.+)-([a-z]{2})$/', $city, $matches)) {
  $cityName = ucwords(str_replace('-', ' ', $matches[1]));
  $stateAbbr = strtoupper($matches[2]);
}

// NC: City page meta for local SEO
$pageTitle = "$serviceName in $cityName | Neural Command";
$pageDesc = "$serviceName in $cityName: schema-first implementation, crawl clarity, and internal link architecture to enter and stay in Google's index and AI Overviews.";

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
  ['label' => $serviceName, 'url' => Canonical::absolute('/services/'.$service.'/')],
  ['label' => $cityName]
];

// Set page context for the main template
$ctx = [
  'title' => $pageTitle,
  'desc' => $pageDesc
];

// NC: Unified JSON-LD for city service pages
$currentUrl = nc_abs($_SERVER['REQUEST_URI'] ?? '/');

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
  'areaServed' => [ 
    ['@type'=>'City','name'=>$cityName],
    ['@type'=>'Country','name'=>'United States'] 
  ],
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

// Build comprehensive JSON-LD schemas
$organizationJson = build_organization_schema();
$localBusinessJson = build_local_business_schema($cityName, $stateAbbr, $canonical);
$serviceJson = build_service_schema($serviceName, $service, $cityName, $canonical);

// Breadcrumbs
$breadcrumbJson = build_breadcrumb_schema([
  ['name' => 'Home', 'url' => 'https://nrlcmd.com/'],
  ['name' => 'Services', 'url' => 'https://nrlcmd.com/services/'],
  ['name' => $serviceName, 'url' => 'https://nrlcmd.com/services/'.$service.'/'],
  ['name' => $cityName, 'url' => $canonical]
]);

// WebPage
$webPageJson = build_webpage_schema($canonical, $pageTitle, $pageDesc);

// FAQPage (enriched with token content)
$faqJson = [
  '@context'=>'https://schema.org',
  '@type'=>'FAQPage',
  '@id'=> $canonical.'#faq',
  'mainEntity'=> [
    [
      '@type'=>'Question',
      'name'=>"What does $serviceName include?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>"We deliver $serviceName tailored to $cityName with full schema coverage, crawl clarity, and agentic SEO."]
    ],
    [
      '@type'=>'Question',
      'name'=>"How is $serviceName adapted for $cityName?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>$sections['faq_local']]
    ],
    [
      '@type'=>'Question',
      'name'=>"Do you serve $cityName and nearby areas?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>"Yes. We serve $cityName and surrounding regions with rapid deployment and ongoing optimization."]
    ],
    [
      '@type'=>'Question',
      'name'=>"How quickly can we see results?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>"Technical improvements are immediate. AI visibility typically improves within 2-4 weeks as search engines re-crawl and incorporate changes."]
    ]
  ]
];
?>
<main class="container py-8">
  <h1><?= htmlspecialchars("$serviceName in $cityName", ENT_QUOTES) ?></h1>
  <?php
  // NC: Micro-intro with local entity. Do not wrap in new containers.
  if (!empty($cityName) && !empty($serviceName)) {
    echo '<p>We implement ' . htmlspecialchars($serviceName, ENT_QUOTES) . ' for organizations in ' . htmlspecialchars($cityName, ENT_QUOTES) . ', focusing on crawl clarity, JSON-LD coverage, and AI Overview eligibility.</p>';
  }
  ?>
  
  <!-- Intro Section: Deterministic, unique per URL -->
  <section class="intro">
    <p><?= htmlspecialchars($sections['intro'], ENT_QUOTES) ?></p>
  </section>
  
  <!-- Strategic Angles -->
  <section class="angles">
    <h2>Our Strategic Approach</h2>
    <p><?= htmlspecialchars($sections['angles'], ENT_QUOTES) ?></p>
  </section>
  
  <!-- Expected Outcomes -->
  <section class="outcomes">
    <h2>What You Should Expect</h2>
    <p><?= htmlspecialchars($sections['outcomes'], ENT_QUOTES) ?></p>
  </section>
  
  <!-- Local Context -->
  <section class="local-signals">
    <h2>Local Context for <?= htmlspecialchars($cityName, ENT_QUOTES) ?></h2>
    <p><?= htmlspecialchars($sections['locals'], ENT_QUOTES) ?></p>
  </section>
  
  <!-- Execution Process -->
  <section class="process">
    <h2>How We Execute</h2>
    <?= $sections['process'] ?>
  </section>
  
  <!-- Proof Points -->
  <section class="proof">
    <h2>Technical Foundation We Deliver</h2>
    <?= $sections['proof'] ?>
  </section>
  
  <!-- Related Services -->
  <section class="related-services">
    <h2>Related Services in <?= htmlspecialchars($cityName, ENT_QUOTES) ?></h2>
    <p>Explore our complementary AI visibility services available in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>:</p>
    <ul>
      <?php 
      $relatedServices = ['agentic-seo', 'ai-consulting', 'schema-optimizer', 'chatgpt-seo', 'generative-engine-optimization', 'ai-discovery-services'];
      $count = 0;
      foreach($relatedServices as $relService):
        if ($relService === $service || $count >= 5) continue;
        $relUrl = link_service_city($relService, $city);
        $relName = ucwords(str_replace('-', ' ', $relService));
        $count++;
      ?>
      <li><a href="<?= htmlspecialchars($relUrl, ENT_QUOTES) ?>"><?= htmlspecialchars($relName.' in '.$cityName, ENT_QUOTES) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>
  
  <!-- Nearby Cities (from token system) -->
  <?php if (!empty($sections['nearby'])): ?>
  <section class="nearby-cities">
    <h2>Serving <?= htmlspecialchars($cityName, ENT_QUOTES) ?> and Nearby Areas</h2>
    <p>We also provide <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> to businesses in these nearby cities:</p>
    <ul>
      <?php foreach ($sections['nearby'] as $nearbySlug): 
        $nearbyUrl = link_service_city($service, $nearbySlug);
        $nearbyDisplay = ucwords(str_replace('-', ' ', $nearbySlug));
      ?>
      <li><a href="<?= htmlspecialchars($nearbyUrl, ENT_QUOTES) ?>"><?= htmlspecialchars($serviceName.' in '.$nearbyDisplay, ENT_QUOTES) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>
  <?php endif; ?>
  
  <!-- CTA Section -->
  <section class="cta">
    <h2>Next Step: <?= htmlspecialchars($sections['cta'], ENT_QUOTES) ?></h2>
    <p>Ready to transform your AI visibility in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>? Contact Neural Command to discuss how our <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> services can deliver measurable results.</p>
    <p>
      <strong>Phone:</strong> <a href="tel:+18445684624">+1-844-568-4624</a><br>
      <strong>Email:</strong> <a href="mailto:hello@nrlcmd.com">hello@nrlcmd.com</a>
    </p>
    <p>
      <a href="<?= htmlspecialchars(Canonical::absolute('/contact/'), ENT_QUOTES) ?>">Contact Us</a> | 
      <a href="<?= htmlspecialchars(Canonical::absolute('/services/'), ENT_QUOTES) ?>">View All Services</a> |
      <a href="<?= htmlspecialchars(link_service_hub($service), ENT_QUOTES) ?>">More <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> Cities</a>
    </p>
    <?php
    // NC: Two nearby city links for crawl clustering, plain inline text.
    $nearby = $nearby ?? []; // e.g., ['orlando-fl','tampa-fl']
    if (!empty($nearby) && !empty($service)) {
      $links = [];
      foreach ($nearby as $slug) {
        $links[] = '<a href="' . nc_abs('/services/' . $service . '/' . $slug . '/') . '">' . ucwords(str_replace('-', ' ', $slug)) . '</a>';
      }
      if ($links) {
        echo '<p>Also see: ' . implode(' and ', $links) . '.</p>';
      }
    }
    ?>
    </section>
</main>
