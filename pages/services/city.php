<?php
declare(strict_types=1);
/** Inputs: $service, $city from index.php router */
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../lib/links.php';
require_once __DIR__.'/../../lib/schema.php';
require_once __DIR__.'/../../lib/schema_builders.php';
require_once __DIR__.'/../../lib/content_tokens.php';
require_once __DIR__.'/../../inc/seo.php'; // NC: Include SEO helpers
require_once __DIR__.'/../../lib/schema_utils.php';

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

// NC: City service pages: LocalBusiness + Service coupling
$BASE = nc_base_url();
$PAGE = nc_page_url();
$orgId = nc_org_id();

// Ensure cityName and region are not empty strings
$cityName  = !empty($cityName) ? $cityName : null;     // e.g., "Austin"
$region    = !empty($stateAbbr) ? $stateAbbr : null;    // e.g., "TX"
$country   = 'US';
$svcName   = $serviceName ?? 'Agentic SEO';
$svcSlug   = $service ?? 'agentic-seo';

if (!empty($cityName) && !empty($region)) {
  require_once __DIR__.'/../../lib/schema_enforcement.php';
  
  $svcId = nc_id('#service');
  $lbId  = nc_id('#local');

  // Initialize schema_nodes array
  $GLOBALS['schema_nodes'] = $GLOBALS['schema_nodes'] ?? [];

  // Generate LocalBusiness schema using SchemaEnforcement helper
  $localBusinessSchema = SchemaEnforcement::generateLocalBusiness([
    '@id' => $lbId,
    'name' => "Neural Command — ".$cityName,
    'url' => $PAGE,
    'image' => $BASE."/assets/og/neural-command.jpg",
    'telephone' => "+1-844-568-4624",
    'parentOrganization' => [ "@id" => $orgId ],
    'address' => [
      "@type" => "PostalAddress",
      "streetAddress"   => "1639 11th St Suite 110-A",
      "addressLocality" => "Santa Monica",
      "addressRegion"   => "CA",
      "postalCode"      => "90404",
      "addressCountry"  => "US"
    ],
    'areaServed' => [
      "@type" => "City",
      "name"  => $cityName,
      "address" => [ "@type"=>"PostalAddress","addressRegion"=>$region,"addressCountry"=>$country ]
    ]
  ]);
  
  // Generate Service schema using SchemaEnforcement helper
  $serviceSchema = SchemaEnforcement::generateService([
    '@id' => $svcId,
    'name' => $svcName." (".$cityName.")",
    'serviceType' => $svcName,
    'provider' => [ "@id" => $lbId ],
    'areaServed' => [ [ "@type"=>"City", "name"=>$cityName ] ]
  ]);
  
  // Push schemas into schema_nodes (standardized contract)
  $GLOBALS['schema_nodes'][] = $localBusinessSchema;
  $GLOBALS['schema_nodes'][] = $serviceSchema;

  // Optional page-scoped FAQ (kept for AEO/LLM; SERP rich result restricted)
  if (!empty($SERVICE_FAQS[$svcSlug])) {
    $faqId = nc_id('#faq');
    $GLOBALS['serviceSchemas'][] = [
      "@type" => "FAQPage",
      "@id"   => $faqId,
      "mainEntity" => array_map(function($qa){
        $qid = nc_id('#q-'.preg_replace('/[^a-z0-9]+/','-', strtolower(substr($qa['q'],0,80))));
        return [
          "@type" => "Question",
          "@id"   => $qid,
          "name"  => $qa['q'],
          "acceptedAnswer" => [ "@type" => "Answer", "text" => $qa['a'] ]
        ];
      }, $SERVICE_FAQS[$svcSlug])
    ];
  }
}

// Schema now handled by unified @graph system above

// All schemas now handled by unified @graph system above
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
