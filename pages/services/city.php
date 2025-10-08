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
  <p>We help <?= htmlspecialchars($cityName, ENT_QUOTES) ?> organizations dominate AI recommendation channels for <?= htmlspecialchars($serviceName, ENT_QUOTES) ?>.</p>
  <p>Canonical URL: <a href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>"><?= htmlspecialchars($canonical, ENT_QUOTES) ?></a></p>
</body>
</html>
