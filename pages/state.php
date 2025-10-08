<?php
declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';
require_once __DIR__.'/../lib/links.php';

$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services', 'url' => Canonical::absolute('/services/')],
];

global $SERVICES, $STATES;
$slug = Canonical::kebab($_GET['slug'] ?? '');
$stateKey = Canonical::kebab($_GET['state'] ?? '');
$svc = $SERVICES[$slug] ?? null;
$state = $STATES[$stateKey] ?? null;

if(!$svc || !$state){
  echo "<main class='container px-4 py-10'><h1>Service or state not found</h1></main>";
  return;
}

$ctx['title'] = $svc['name'] . ' in ' . $state['name'] . ' | Neural Command';
$ctx['desc'] = 'Become the default recommendation across ChatGPT, Google AI Overviews, Claude, and Perplexity in ' . $state['name'] . '.';

$breadcrumbs[] = ['label' => $svc['name'], 'url' => Canonical::absolute('/services/'.$slug.'/')];
$breadcrumbs[] = ['label' => $state['name']];

$cities = $state['cities'];
?>
<main class="container mx-auto px-4 py-10">
  <h1 class="font-mono text-2xl font-bold"><?= esc($svc['name']) ?> in <?= esc($state['name']) ?></h1>
  <p class="mt-2 max-w-3xl">
    Become the <strong>default recommendation</strong> across ChatGPT, Google AI Overviews, Claude, and Perplexity in <?= esc($state['name']) ?>.
    We implement <?= esc($svc['alts'][0] ?? strtolower($svc['name'])) ?>, entity cleanup, structured data, and authority placements LLMs actually cite.
  </p>

  <section class="mt-8">
    <h2 class="font-mono text-xl">Cities we serve</h2>
    <ul class="mt-2 grid md:grid-cols-2 gap-2">
      <?php foreach($cities as $city):
        $citySlug = Canonical::kebab($city.'-'.$state['abbr']);
      ?>
        <li><a class="row-link underline" href="<?= link_service_city($slug, $citySlug) ?>"><?= esc($svc['name']) ?> — <?= esc($city) ?>, <?= esc($state['abbr']) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <a class="button mt-4" href="<?= Canonical::absolute('/contact/') ?>">Start Your AI Visibility Audit</a>
</main>

<?php
// ItemList schema for crawl clarity
$itemList = ['@context'=>'https://schema.org','@type'=>'ItemList','itemListElement'=>[]];
$pos = 1;

foreach($SERVICES as $slug=>$svc){
  $itemList['itemListElement'][] = [
    '@type'=>'ListItem',
    'position'=>$pos++,
    'url'=>Canonical::absolute("/services/$slug/$stateKey/"),
    'name'=>$svc['name'].' — '.$stateName
  ];
  
  foreach($state['cities'] as $city){
    $ck = strtolower(str_replace(' ','-',$city));
    $itemList['itemListElement'][] = [
      '@type'=>'ListItem',
      'position'=>$pos++,
      'url'=>Canonical::absolute("/services/$slug/$ck-{$abbr}/"),
      'name'=>$svc['name']." — $city, {$abbr}"
    ];
  }
}

echo '<script type="application/ld+json">'.json_encode($itemList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>
