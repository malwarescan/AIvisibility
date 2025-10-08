<?php
declare(strict_types=1);
/** Inputs: $service, $city from index.php router */
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../lib/links.php';
require_once __DIR__.'/../../lib/schema.php';
require_once __DIR__.'/../../lib/schema_builders.php';

$service = Canonical::kebab($service);
$city    = Canonical::kebab($city);
$path    = "/services/$service/$city/";
$canonical = Canonical::absoluteCanonical($path);

$serviceName = ucwords(str_replace('-', ' ', $service));
$cityName    = ucwords(str_replace('-', ' ', $city));

// Extract state abbreviation if present (e.g., "san-francisco-ca" -> "CA")
$stateAbbr = '';
if (preg_match('/^(.+)-([a-z]{2})$/', $city, $matches)) {
  $cityName = ucwords(str_replace('-', ' ', $matches[1]));
  $stateAbbr = strtoupper($matches[2]);
}

$pageTitle = "$serviceName in $cityName | Neural Command";
$pageDesc = "Professional $serviceName services in $cityName. Expert agentic SEO, AI visibility optimization, and schema implementation.";

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

// FAQPage
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
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDesc, ENT_QUOTES) ?>">
  <?php include __DIR__.'/../../partials/head.php'; ?>
  
  <!-- Organization (Neural Command, LLC) -->
  <script type="application/ld+json"><?= json_encode($organizationJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  
  <!-- LocalBusiness (for this location) -->
  <script type="application/ld+json"><?= json_encode($localBusinessJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  
  <!-- Service offering -->
  <script type="application/ld+json"><?= json_encode($serviceJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  
  <!-- BreadcrumbList -->
  <script type="application/ld+json"><?= json_encode($breadcrumbJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  
  <!-- WebPage (with license & creator via render_jsonld) -->
  <?= render_jsonld($webPageJson) ?>
  
  <!-- FAQPage (with license & creator via render_jsonld) -->
  <?= render_jsonld($faqJson) ?>
</head>
<body>
  <h1><?= htmlspecialchars($serviceName.' in '.$cityName, ENT_QUOTES) ?></h1>
  
  <section>
    <h2>Professional <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> for <?= htmlspecialchars($cityName, ENT_QUOTES) ?> Businesses</h2>
    <p>We deliver comprehensive <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> services to <?= htmlspecialchars($cityName, ENT_QUOTES) ?> organizations seeking to dominate AI recommendation channels. Our approach combines technical schema implementation, agentic SEO strategies, and crawl optimization to ensure your business becomes the default recommendation in ChatGPT, Google AI Mode, Claude, and Perplexity.</p>
    
    <p><?= htmlspecialchars($cityName, ENT_QUOTES) ?> businesses face unique market dynamics that require specialized AI visibility strategies. We understand the local competitive landscape and implement solutions tailored to your specific market conditions.</p>
  </section>
  
  <section>
    <h2>Why Choose Neural Command for <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>?</h2>
    <ul>
      <li><strong>Local Market Expertise:</strong> Deep understanding of <?= htmlspecialchars($cityName, ENT_QUOTES) ?> business environment and competitive dynamics</li>
      <li><strong>Programmatic Schema:</strong> Complete LocalBusiness, Service, and FAQ schema markup optimized for <?= htmlspecialchars($cityName, ENT_QUOTES) ?> search patterns</li>
      <li><strong>Canonical Rigor:</strong> HTTPS, lowercase URLs, and trailing slash consistency to prevent duplicate content issues</li>
      <li><strong>Hub-Linked Architecture:</strong> Shallow crawl paths ensure Google and AI systems can efficiently discover your content</li>
      <li><strong>Agentic SEO Playbook:</strong> Custom strategies that make AI systems trust and recommend your business first</li>
      <li><strong>Performance-First:</strong> Fast TTFB and optimized delivery for better crawl efficiency</li>
      <li><strong>Measurable Results:</strong> Track visibility improvements across Google, Bing, and LLM-based recommendation engines</li>
    </ul>
  </section>
  
  <section>
    <h2>Our <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> Services Include</h2>
    <p>When you work with Neural Command in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>, you get end-to-end implementation:</p>
    <ul>
      <li>Complete schema coverage (LocalBusiness + Service + Organization + FAQPage)</li>
      <li>AI training signals optimized for <?= htmlspecialchars($cityName, ENT_QUOTES) ?> market</li>
      <li>Authority building specific to your local competitive landscape</li>
      <li>Internal linking structure for maximum crawl efficiency</li>
      <li>JSON-LD implementation with license and creator attribution</li>
      <li>Canonical URL enforcement across all pages</li>
      <li>Sitemap optimization for efficient discovery</li>
      <li>Ongoing monitoring and optimization</li>
    </ul>
  </section>
  
  <section>
    <h2>Related Services in <?= htmlspecialchars($cityName, ENT_QUOTES) ?></h2>
    <p>Explore our other AI visibility services available in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>:</p>
    <ul>
      <?php 
      $relatedServices = ['agentic-seo', 'ai-consulting', 'schema-optimizer', 'chatgpt-seo', 'generative-engine-optimization'];
      foreach($relatedServices as $relService):
        if ($relService === $service) continue;
        $relUrl = link_service_city($relService, $city);
        $relName = ucwords(str_replace('-', ' ', $relService));
      ?>
      <li><a href="<?= htmlspecialchars($relUrl, ENT_QUOTES) ?>"><?= htmlspecialchars($relName.' in '.$cityName, ENT_QUOTES) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>
  
  <section>
    <h2>Serving <?= htmlspecialchars($cityName, ENT_QUOTES) ?> and Nearby Areas</h2>
    <p>In addition to <?= htmlspecialchars($cityName, ENT_QUOTES) ?>, we also serve businesses in surrounding cities with the same high-quality <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> services:</p>
    <ul>
      <?php 
      // Show a few related cities (simplified - you'd have a proper lookup)
      $nearbyCities = array_slice(array_keys($CITIES), 0, 5);
      foreach($nearbyCities as $nearbySlug):
        if ($nearbySlug === $city) continue;
        $nearbyData = $CITIES[$nearbySlug];
        $nearbyUrl = link_service_city($service, $nearbySlug);
      ?>
      <li><a href="<?= htmlspecialchars($nearbyUrl, ENT_QUOTES) ?>"><?= htmlspecialchars($serviceName.' in '.$nearbyData['name'], ENT_QUOTES) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>
  
  <section>
    <h2>Get Started with <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> in <?= htmlspecialchars($cityName, ENT_QUOTES) ?></h2>
    <p>Ready to dominate AI recommendation channels in <?= htmlspecialchars($cityName, ENT_QUOTES) ?>? Contact Neural Command today to discuss how our <?= htmlspecialchars($serviceName, ENT_QUOTES) ?> services can transform your AI visibility.</p>
    <p><strong>Phone:</strong> +1-844-568-4624<br>
    <strong>Email:</strong> hello@neuralcommandllc.com</p>
    <p><a href="<?= Canonical::absolute('/contact/') ?>">Contact Us</a> | <a href="<?= Canonical::absolute('/services/') ?>">All Services</a></p>
  </section>
</body>
</html>
