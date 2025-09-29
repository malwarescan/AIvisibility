<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Services', 'url' => canonical('/services/')],
];
?>
<?php global $SERVICES, $CITIES; $slug = $_GET['slug'] ?? ''; $svc = $SERVICES[$slug] ?? null; ?>
<?php if($svc){
  $breadcrumbs[] = ['label' => $svc['name']];
}
?>
<main class="container py-8">
  <?php if(!$svc): ?>
  <div class="card">
    <h1 class="text-2xl">Service not found</h1>
    <p class="text-gray-600">The requested service could not be found.</p>
  </div>
  <?php else: ?>
  <h1 class="text-3xl mb-4"><?= esc($svc['name']) ?></h1>
  <div class="card mb-6">
    <p class="text-gray-700"><?= esc($svc['short']) ?></p>
  </div>
  
  <?php if(!empty($svc['packages'])): ?>
  <div class="card mb-6">
    <h2 class="text-xl mb-4">Packages & Pricing</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <?php foreach($svc['packages'] as $pkg): ?>
      <div class="border border-gray-200 p-4 rounded">
        <h3 class="font-semibold text-gray-900 mb-2"><?= esc($pkg['name']) ?></h3>
        <div class="text-2xl font-bold text-blue-700 mb-2">
          $<?= number_format($pkg['price']) ?>
          <?php if(isset($pkg['range'])): ?>
            <span class="text-sm font-normal"><?= esc($pkg['range']) ?></span>
          <?php endif; ?>
          <span class="text-sm font-normal text-gray-600">/<?= esc($pkg['period']) ?></span>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>
  
  <?php if(!empty($svc['faqs'])): ?>
  <div class="card">
    <h2 class="text-xl mb-4">Frequently Asked Questions</h2>
    <div class="space-y-4">
      <?php foreach($svc['faqs'] as $faq): ?>
      <div>
        <h3 class="font-semibold text-gray-900"><?= esc($faq[0]) ?></h3>
        <p class="text-gray-600 text-sm"><?= esc($faq[1]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>

  <?php
    $relatedServices = array_filter($SERVICES, function($key) use ($slug){ return $key !== $slug; }, ARRAY_FILTER_USE_KEY);
    if (!empty($relatedServices)):
  ?>
  <section class="card mt-8">
    <h2 class="text-xl mb-4">Related Services</h2>
    <div class="grid md:grid-cols-2 gap-4 text-sm">
      <?php foreach(array_slice($relatedServices, 0, 4, true) as $relatedSlug=>$relatedSvc): ?>
      <div>
        <h3 class="font-semibold text-gray-900 mb-1"><?= esc($relatedSvc['name']) ?></h3>
        <p class="text-gray-600 mb-2">
          <?= esc($relatedSvc['short']) ?>
        </p>
        <a href="/services/<?= esc($relatedSlug) ?>/" class="underline">View <?= esc($relatedSvc['name']) ?></a>
      </div>
      <?php endforeach; ?>
    </div>
  </section>
  <?php endif; ?>

  <?php
    $relatedCities = array_keys($CITIES);
    if (!empty($relatedCities)):
  ?>
  <section class="card mt-8">
    <h2 class="text-xl mb-4">Featured Locations</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-sm">
      <?php
        $count = 0;
        foreach ($relatedCities as $cityKey) {
          if ($count >= 6) break;
          $cityData = $CITIES[$cityKey];
          echo '<li class="border border-gray-200 rounded-lg p-4 bg-white">';
          echo '<a class="underline font-semibold" href="/services/'.esc($slug).'/'.esc($cityKey).'/">'.esc($svc['name']).' — '.esc($cityData['name']).'</a>';
          echo '<p class="text-gray-600 mt-2">'.esc($svc['short']).'</p>';
          echo '</li>';
          $count++;
        }
      ?>
    </ul>
  </section>
  <?php endif; ?>
  <?php endif; ?>
</main>
<?php if($svc){
  $schema = build_page_schema_jsonld('service', [
    'title' => $svc['name'] . ' | Neural Command',
    'headline' => $svc['name'],
    'description' => $svc['short'],
    'serviceSlug' => $slug,
    'faqs' => $svc['faqs'] ?? []
  ]);
  echo '<script type="application/ld+json">'.json_encode($schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';

  if (!empty($relatedServices)) {
    $relatedList = [
      '@context' => 'https://schema.org',
      '@type' => 'ItemList',
      'itemListElement' => []
    ];
    $pos = 1;
    foreach(array_slice($relatedServices, 0, 4, true) as $relatedSlug=>$relatedSvc){
      $relatedList['itemListElement'][] = [
        '@type' => 'ListItem',
        'position' => $pos++,
        'url' => canonical('/services/'.$relatedSlug.'/'),
        'name' => $relatedSvc['name']
      ];
    }
    echo '<script type="application/ld+json">'.json_encode($relatedList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }

  if (!empty($relatedCities)) {
    $cityList = [
      '@context' => 'https://schema.org',
      '@type' => 'ItemList',
      'itemListElement' => []
    ];
    $posCity = 1;
    foreach(array_slice($relatedCities, 0, 6) as $cityKey){
      $cityList['itemListElement'][] = [
        '@type' => 'ListItem',
        'position' => $posCity++,
        'url' => canonical('/services/'.$slug.'/'.$cityKey.'/'),
        'name' => $svc['name'].' — '.$CITIES[$cityKey]['name'],
        'description' => $svc['short']
      ];
    }
    echo '<script type="application/ld+json">'.json_encode($cityList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }
}
?>

