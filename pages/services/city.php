<?php
declare(strict_types=1);
/** Inputs: $service, $city from index.php router */
require_once __DIR__.'/../../bootstrap/canonical.php';
require_once __DIR__.'/../../lib/links.php';
require_once __DIR__.'/../../lib/schema.php';

$service = Canonical::kebab($service);
$city    = Canonical::kebab($city);
$path    = "/services/$service/$city/";
$canonical = Canonical::absoluteCanonical($path);

$business = [
  'name' => 'Neural Command, LLC',
  'url'  => 'https://nrlcmd.com/',
  'telephone' => '+1-844-568-4624',
  'address' => [
      '@type'=>'PostalAddress',
      'streetAddress'=>'1639 11th St Suite 110-A',
      'addressLocality'=>'Santa Monica',
      'addressRegion'=>'CA',
      'postalCode'=>'90404',
      'addressCountry'=>'US'
  ]
];

$serviceName = ucwords(str_replace('-', ' ', $service));
$cityName    = ucwords(str_replace('-', ' ', $city));

$serviceJson = [
  '@context'=>'https://schema.org',
  '@type'=>'Service',
  '@id'=> $canonical.'#service',
  'name'=> $serviceName.' in '.$cityName,
  'serviceType'=> $service,
  'provider'=> array_merge([
      '@type'=>'LocalBusiness',
      '@id'=>$business['url'].'#org',
      'name'=>$business['name'],
      'url'=>$business['url'],
      'telephone'=>$business['telephone'],
      'address'=>$business['address']
  ]),
  'areaServed'=> ['@type'=>'City','name'=>$cityName],
  'url'=> $canonical,
  'mainEntityOfPage'=> $canonical
];

$faqJson = [
  '@context'=>'https://schema.org',
  '@type'=>'FAQPage',
  '@id'=> $canonical.'#faq',
  'mainEntity'=> [
    [
      '@type'=>'Question',
      'name'=>"What does $serviceName include?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>"We deliver $service tailored to $cityName with full schema coverage, crawl clarity, and agentic SEO."]
    ],
    [
      '@type'=>'Question',
      'name'=>"Do you serve $cityName and nearby areas?",
      'acceptedAnswer'=>['@type'=>'Answer','text'=>"Yes. We serve $cityName and surrounding regions with rapid deployment and ongoing optimization."]
    ]
  ]
];

$orgJson = [
  '@context'=>'https://schema.org',
  '@type'=>'LocalBusiness',
  '@id'=> $business['url'].'#org',
  'name'=> $business['name'],
  'url'=> $business['url'],
  'telephone'=> $business['telephone'],
  'address'=> $business['address'],
  'areaServed'=> ['@type'=>'AdministrativeArea','name'=>'Global']
];
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($serviceName.' – '.$cityName.' | Neural Command', ENT_QUOTES) ?></title>
  <?php include __DIR__.'/../../partials/head.php'; ?>
  <script type="application/ld+json"><?= json_encode($orgJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  <script type="application/ld+json"><?= json_encode($serviceJson, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
  <?= render_jsonld($faqJson) ?>
</head>
<body>
  <h1><?= htmlspecialchars($serviceName.' in '.$cityName, ENT_QUOTES) ?></h1>
  <p>We help <?= htmlspecialchars($cityName, ENT_QUOTES) ?> organizations dominate AI recommendation channels for <?= htmlspecialchars($serviceName, ENT_QUOTES) ?>.</p>
  <p>Canonical URL: <a href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>"><?= htmlspecialchars($canonical, ENT_QUOTES) ?></a></p>
</body>
</html>
