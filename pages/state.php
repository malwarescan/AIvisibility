<?php
// State hub page - lists every service and service×city in that state
global $STATES, $SERVICES;
$stateKey = $_GET['state'] ?? '';
$state = $STATES[$stateKey] ?? null;

$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Services', 'url' => canonical('/services/')],
];

if(!$state){ 
  echo "<main class='container px-4 py-10'><h1>State not found</h1></main>"; 
  return; 
}

$abbr = $state['abbr'];
$stateName = $state['name'];

if($state){
  $breadcrumbs[] = ['label' => 'States'];
  $breadcrumbs[] = ['label' => $state['name']];
}

// Set page context
$ctx['title'] = $stateName . ' AI Services | Neural Command';
$ctx['desc'] = 'Find AI default recommendation services across ' . $stateName . '. Get mentioned in ChatGPT, Claude, and AI Overviews.';
?>

<main class="container mx-auto px-4 py-10">
  <h1 class="font-mono text-2xl font-bold"><?= esc($stateName) ?> — AI Services</h1>
  <p class="text-sm text-muted mt-2">Find AI default recommendation services across <?= esc($stateName) ?>. Get mentioned in ChatGPT, Claude, and AI Overviews.</p>

  <?php foreach($SERVICES as $slug=>$svc): ?>
    <section class="mt-6 card">
      <h2 class="font-mono text-xl"><?= esc($svc['name']) ?> in <?= esc($stateName) ?></h2>
      <p class="text-gray-600 text-sm mt-2"><?= esc($svc['short']) ?></p>
      <ul class="mt-3 space-y-1">
        <li><a class="underline" href="/services/<?= esc($slug) ?>/<?= esc($stateKey) ?>/"><?= esc($svc['name']) ?> — statewide</a></li>
        <?php foreach($state['cities'] as $city): 
          $ck = strtolower(str_replace(' ','-',$city)); 
        ?>
          <li><a class="underline" href="/services/<?= esc($slug) ?>/<?= esc($ck.'-'.$abbr) ?>/"><?= esc($svc['name']) ?> — <?= esc($city) ?>, <?= esc($abbr) ?></a></li>
        <?php endforeach; ?>
      </ul>
      <div class="mt-4">
        <h3 class="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Related Services</h3>
        <ul class="grid md:grid-cols-2 gap-2 text-sm">
          <?php
            $relatedServices = array_filter($SERVICES, function($key) use ($slug){ return $key !== $slug; }, ARRAY_FILTER_USE_KEY);
            $rsCount = 0;
            foreach($relatedServices as $relSlug=>$relSvc){
              if ($rsCount >= 4) break;
              echo '<li><a class="underline" href="/services/'.esc($relSlug).'/'.esc($stateKey).'/">'.esc($relSvc['name']).' — '.esc($stateName).'</a></li>';
              $rsCount++;
            }
          ?>
        </ul>
      </div>
    </section>
  <?php endforeach; ?>

  <section class="mt-10 card">
    <h2 class="text-xl mb-4">Nearby States & Regions</h2>
    <ul class="grid md:grid-cols-2 gap-2">
      <?php
        $neighbors = array_filter($STATES, function($key) use ($stateKey){ return $key !== $stateKey; }, ARRAY_FILTER_USE_KEY);
        $counter = 0;
        foreach($neighbors as $neighborKey => $neighbor){
          if ($counter >= 6) break;
          echo '<li><a class="underline" href="/states/'.esc($neighborKey).'/">'.esc($neighbor['name']).'</a></li>';
          $counter++;
        }
      ?>
    </ul>
  </section>
</main>

<?php
// ItemList schema for crawl clarity
$itemList = ['@context'=>'https://schema.org','@type'=>'ItemList','itemListElement'=>[]];
$pos = 1;

foreach($SERVICES as $slug=>$svc){
  $itemList['itemListElement'][] = [
    '@type'=>'ListItem',
    'position'=>$pos++,
    'url'=>canonical("/services/$slug/$stateKey/"),
    'name'=>$svc['name'].' — '.$stateName
  ];
  
  foreach($state['cities'] as $city){
    $ck = strtolower(str_replace(' ','-',$city));
    $itemList['itemListElement'][] = [
      '@type'=>'ListItem',
      'position'=>$pos++,
      'url'=>canonical("/services/$slug/$ck-{$abbr}/"),
      'name'=>$svc['name']." — $city, {$abbr}"
    ];
  }
}

echo '<script type="application/ld+json">'.json_encode($itemList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>
