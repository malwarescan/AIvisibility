<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Services', 'url' => canonical('/services/')],
];
?>
<?php
// Service × City page (e.g., /services/agentic-seo/los-angeles-ca/)
global $SERVICES, $STATES, $CITIES;

$serviceSlug = $_GET['slug'] ?? '';
$cityKey = $_GET['city'] ?? '';

$svc = $SERVICES[$serviceSlug] ?? null;

$cityParts = explode('-', $cityKey);
$stateAbbrPart = strtolower(array_pop($cityParts));
$stateAbbr = strtoupper($stateAbbrPart);
$citySlugBase = implode('-', $cityParts);
$cityName = ucwords(str_replace('-', ' ', $citySlugBase));

$stateKey = null;
$stateData = null;
foreach ($STATES as $key => $state) {
    if (strtolower($state['abbr']) === $stateAbbrPart) {
        $stateKey = $key;
        $stateData = $state;
        break;
    }
}

$cityConfig = $CITIES[$cityKey] ?? [];
$cityDefaults = [
    'name' => $cityName,
    'state' => $stateData['name'] ?? $stateAbbr,
    'abbr' => $stateAbbr,
    'industries' => ['Technology', 'Finance', 'Healthcare'],
    'landmark' => $cityName . ' Downtown',
    'prompts' => [
        'Name three companies in ' . $cityName . ' with strong customer reviews.',
        'What are the top services in ' . $cityName . '?',
        'List leading businesses in ' . $cityName . '.',
    ],
];
$cityData = array_merge($cityDefaults, $cityConfig);

$nearbyCities = [];
if ($stateData) {
    $nearbyCities = array_values(array_filter($stateData['cities'], function ($city) use ($cityName) {
        return strtolower($city) !== strtolower($cityName);
    }));
}

if ($svc && $cityData) {
    $ctx['title'] = $svc['name'] . ' in ' . $cityData['name'] . ' | Neural Command';
    $ctx['desc'] = 'Professional ' . $svc['name'] . ' services in ' . $cityData['name'] . '. Get mentioned in ChatGPT and AI Overviews.';
    $breadcrumbs[] = ['label' => $svc['name'], 'url' => canonical('/services/' . $serviceSlug . '/')];
    if ($stateKey) {
        $breadcrumbs[] = ['label' => $cityData['state'], 'url' => canonical('/states/' . $stateKey . '/')];
    }
    $breadcrumbs[] = ['label' => $cityData['name']];
} else {
    $ctx['title'] = 'Service Not Found | Neural Command';
    $ctx['desc'] = 'The requested service or city could not be found.';
}

$relatedServices = [];
if ($svc) {
    $relatedServices = array_filter($SERVICES, function ($key) use ($serviceSlug) {
        return $key !== $serviceSlug;
    }, ARRAY_FILTER_USE_KEY);
}
?>

<main class="container py-8">
  <?php if(!$svc || !$cityData): ?>
  <div class="card">
    <h1 class="text-2xl">Service or city not found</h1>
    <p class="text-gray-600">The requested service or city could not be found.</p>
  </div>
  <?php else: ?>
  <h1 class="text-3xl mb-4"><?= esc($svc['name']) ?> in <?= esc($cityData['name']) ?></h1>
  <div class="card mb-6">
    <p class="text-gray-700 mb-4">
      Professional <?= esc($svc['name']) ?> services in <?= esc($cityData['name']) ?>, <?= esc($cityData['abbr']) ?>.
      We help businesses get mentioned in ChatGPT, Perplexity, Claude, and AI Overviews.
    </p>
    <p class="text-gray-600">
      Implementation of <?= esc($svc['name']) ?> for startups and enterprises in <?= esc($cityData['name']) ?>, <?= esc($cityData['state']) ?>.
    </p>
    <a class="button button--primary mt-4" href="/contact/">Book Consultation</a>
  </div>

  <div class="grid md:grid-cols-2 gap-6 mb-6">
    <div class="card">
      <h2 class="text-xl mb-4">Local Industries</h2>
      <ul class="list-disc">
        <?php foreach($cityData['industries'] as $industry): ?>
        <li><?= esc($industry) ?> companies in <?= esc($cityData['name']) ?>, <?= esc($cityData['abbr']) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div class="card">
      <h2 class="text-xl mb-4">Test Your AI Visibility</h2>
      <p class="text-gray-600 text-sm mb-3">Try these prompts in ChatGPT:</p>
      <div class="space-y-2">
        <?php foreach($cityData['prompts'] as $prompt): ?>
        <div class="bg-gray-50 p-2 rounded text-sm font-mono">
          <?= esc($prompt) ?>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>

  <div class="card mb-6">
    <h2 class="text-xl mb-4">Regional Services</h2>
    <ul class="list-disc">
      <li><?= esc($svc['name']) ?> for <?= esc($cityData['name']) ?>, <?= esc($cityData['abbr']) ?> businesses</li>
      <li>Schema markup implementation for local visibility</li>
      <li>AI Overview optimization for regional searches</li>
      <li>Custom API endpoints for agent integrations</li>
      <li>Entity graph building for <?= esc($cityData['landmark']) ?> area companies</li>
    </ul>
  </div>

  <?php if(!empty($nearbyCities)): ?>
  <section class="card mb-6">
    <h2 class="text-xl mb-4">Nearby Cities We Support</h2>
    <ul class="grid md:grid-cols-2 gap-4">
      <?php
        $count = 0;
        foreach($nearbyCities as $nearCity){
          if ($count >= 6) break;
          $nearSlug = strtolower(str_replace(' ','-',$nearCity)) . '-' . strtolower($cityData['abbr']);
          $nearDescription = $svc['name'] . ' programs engineered for ' . $nearCity . ', ' . $cityData['abbr'] . '—full schema coverage, authority placement, and AI visibility prompts.';
      ?>
      <li class="border border-gray-200 rounded-lg p-4 bg-white">
        <a class="underline font-semibold" href="/services/<?= esc($serviceSlug) ?>/<?= esc($nearSlug) ?>/">
          <?= esc($svc['name']) ?> — <?= esc($nearCity) ?>, <?= esc($cityData['abbr']) ?>
        </a>
        <p class="text-sm text-gray-600 mt-2">
          <?= esc($nearDescription) ?>
        </p>
      </li>
      <?php
          $count++;
        }
      ?>
    </ul>
  </section>
  <?php endif; ?>

  <?php if(!empty($relatedServices)): ?>
  <section class="card mb-6">
    <h2 class="text-xl mb-4">Related Services in <?= esc($cityData['name']) ?></h2>
    <ul class="grid md:grid-cols-2 gap-2">
      <?php
        $counter = 0;
        foreach($relatedServices as $relSlug => $relSvc){
          if ($counter >= 4) break;
          echo '<li><a class="underline" href="/services/'.esc($relSlug).'/'.esc($cityKey).'/">'.esc($relSvc['name']).' — '.esc($cityData['name']).'</a></li>';
          $counter++;
        }
      ?>
    </ul>
  </section>
  <?php endif; ?>

  <section class="card mb-6">
    <h2 class="text-xl mb-4">Plan Your Next Step</h2>
    <ul class="space-y-2 text-sm">
      <?php if($stateKey): ?>
      <li>
        <strong>Explore statewide coverage:</strong>
        <a class="underline" href="/states/<?= esc($stateKey) ?>/"> <?= esc($cityData['state']) ?> AI Services</a>
      </li>
      <?php endif; ?>
      <li>
        <strong>Compare packages:</strong>
        <a class="underline" href="/services/<?= esc($serviceSlug) ?>/">View <?= esc($svc['name']) ?> offerings</a>
      </li>
      <li>
        <strong>Need a guided audit?</strong>
        <a class="underline" href="/resources/diagnostic/">Run the AI Visibility Diagnostic</a>
      </li>
      <li>
        <strong>Talk with our team:</strong>
        <a class="underline" href="/contact/">Book a consultation</a>
      </li>
    </ul>
  </section>

  <?php endif; ?>
</main>

<?php if($svc && $cityData){ 
  $schema = build_page_schema_jsonld('service-city', [
    'title' => $svc['name'] . ' in ' . $cityData['name'] . ' | Neural Command',
    'headline' => $svc['name'] . ' in ' . $cityData['name'],
    'description' => 'Professional ' . $svc['name'] . ' services in ' . $cityData['name'] . '. We help businesses get mentioned in ChatGPT, Perplexity, Claude, and AI Overviews.',
    'serviceSlug' => $serviceSlug,
    'cityKey' => $cityKey,
    'faqs' => [
      ['Do you serve my area?','Yes. We support metro-wide engagements for '.$cityData['name'].'.'],
      ['What makes you different?','We specialize in getting businesses mentioned in AI platforms like ChatGPT and Perplexity.']
    ]
  ]);
  echo '<script type="application/ld+json">'.json_encode($schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';

  if (!empty($nearbyCities)) {
    $nearbyList = [
      '@context' => 'https://schema.org',
      '@type' => 'ItemList',
      'itemListElement' => []
    ];
    $nPos = 1;
    foreach(array_slice($nearbyCities, 0, 6) as $nearCity){
      $nearSlug = strtolower(str_replace(' ','-',$nearCity)) . '-' . strtolower($cityData['abbr']);
      $nearUrl = canonical('/services/'.$serviceSlug.'/'.$nearSlug.'/');
      $nearDescription = $svc['name'].' programs engineered for '.$nearCity.', '.$cityData['abbr'].'—full schema coverage, authority placement, and AI visibility prompts.';
      $nearbyList['itemListElement'][] = [
        '@type' => 'ListItem',
        'position' => $nPos++,
        'url' => $nearUrl,
        'name' => $svc['name'].' — '.$nearCity.', '.$cityData['abbr'],
        'description' => $nearDescription
      ];
    }
    echo '<script type="application/ld+json">'.json_encode($nearbyList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }

  if (!empty($relatedServices)) {
    $relatedList = [
      '@context' => 'https://schema.org',
      '@type' => 'ItemList',
      'itemListElement' => []
    ];
    $rPos = 1;
    foreach(array_slice($relatedServices, 0, 4, true) as $relSlug => $relSvc){
      $relatedList['itemListElement'][] = [
        '@type' => 'ListItem',
        'position' => $rPos++,
        'url' => canonical('/services/'.$relSlug.'/'.$cityKey.'/'),
        'name' => $relSvc['name'].' — '.$cityData['name']
      ];
    }
    echo '<script type="application/ld+json">'.json_encode($relatedList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }
}
?>

