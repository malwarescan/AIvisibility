<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Services', 'url' => canonical('/services/')],
];
?>
<?php
// Service × State page (e.g., /services/agentic-seo/california/)
global $SERVICES, $STATES, $PRICING, $SERVICE_FAQS;
$slug = $_GET['slug'] ?? ''; 
$stateKey = $_GET['state'] ?? '';
$svc = $SERVICES[$slug] ?? null; 
$state = $STATES[$stateKey] ?? null;

if(!$svc || !$state){ 
  echo "<main class='container px-4 py-10'><h1>Service or state not found</h1></main>"; 
  return; 
}

$abbr = $state['abbr']; 
$stateName = $state['name'];
$alts = $svc['alts'] ?? [];

// Set page context
$ctx['title'] = $svc['name'] . ' in ' . $stateName . ' | Neural Command';
$ctx['desc'] = 'Become the default recommendation across ChatGPT, Google AI Overviews, Claude, and Perplexity in ' . $stateName . '.';
?>
<?php
if($svc && $state){
  $breadcrumbs[] = ['label' => $svc['name'], 'url' => canonical('/services/'.$slug.'/')];
  $breadcrumbs[] = ['label' => $stateName];
}
?>

<main class="container mx-auto px-4 py-10">
  <h1 class="font-mono text-2xl font-bold"><?= esc($svc['name']) ?> in <?= esc($stateName) ?></h1>
  <p class="mt-2 max-w-3xl">
    Become the <strong>default recommendation</strong> across ChatGPT, Google AI Overviews, Claude, and Perplexity in <?= esc($stateName) ?>.
    We implement <?= esc(implode(', ', $alts)) ?>, entity cleanup, structured data, and authority placements LLMs actually cite.
  </p>
  
  <ul class="mt-4 list-disc ml-6">
    <li>Statewide coverage: <?= esc($stateName) ?> (<?= esc($abbr) ?>)</li>
    <li>GEO/AEO content patterns: FAQ, How-To, Q&A blocks</li>
    <li>Agent endpoints: <code>/agent.json</code>, <code>/meta.json</code></li>
  </ul>
  
  <a class="button mt-4" href="/contact/">Start Your AI Visibility Audit</a>

  <section class="mt-8">
    <h2 class="font-mono text-xl">Cities we serve</h2>
    <ul class="mt-2 grid md:grid-cols-2 gap-2">
      <?php foreach($state['cities'] as $city): 
        $ck = strtolower(str_replace(' ','-',$city)); 
      ?>
        <li><a class="row-link underline" href="/services/<?= esc($slug) ?>/<?= esc($ck.'-'.$abbr) ?>/"><?= esc($svc['name']) ?> — <?= esc($city) ?>, <?= esc($abbr) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </section>
  <section class="mt-8 card">
    <h2 class="text-xl mb-4">Nearby States & Regions</h2>
    <ul class="list-disc">
      <?php
        $nearbyStates = array_filter($STATES, function($key) use ($stateKey){ return $key !== $stateKey; }, ARRAY_FILTER_USE_KEY);
        $counter = 0;
        foreach($nearbyStates as $nearKey => $nearState){
          if ($counter >= 6) break;
          echo '<li><a class="underline" href="/services/'.esc($slug).'/'.esc($nearKey).'/">'.esc($svc['name']).' — '.esc($nearState['name']).'</a></li>';
          $counter++;
        }
      ?>
    </ul>
  </section>
</main>

<?php
require_once __DIR__.'/../lib/seo.php';

// Use the comprehensive schema function
$schema = build_page_schema_jsonld('service-state', [
  'title' => $svc['name'] . ' in ' . $stateName . ' | Neural Command',
  'headline' => $svc['name'] . ' in ' . $stateName,
  'description' => 'Become the default recommendation across ChatGPT, Google AI Overviews, Claude, and Perplexity in ' . $stateName . '.',
  'serviceSlug' => $slug,
  'stateKey' => $stateKey,
  'faqs' => $svc['faqs'] ?? []
]);

// Override areaServed to be State instead of City
$schema['@graph'][1]['areaServed'] = ['@type'=>'State','name'=>$stateName,'addressRegion'=>$abbr];

echo '<script type="application/ld+json">'.json_encode($schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>
