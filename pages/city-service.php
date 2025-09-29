<?php global $CITIES, $STATES; $key = $_GET['city'] ?? ''; $cityData = $CITIES[$key] ?? null; ?>
<main class="container py-8">
  <?php if(!$cityData): ?>
  <div class="card">
    <h1 class="text-2xl">City not found</h1>
    <p class="text-gray-600">The requested city could not be found.</p>
  </div>
  <?php else: 
    $cityName = $cityData['name'];
    $industries = $cityData['industries'];
    $landmark = $cityData['landmark'];
    $prompts = $cityData['prompts'];
  ?>
  <h1 class="text-3xl mb-4">AI Consulting in <?= esc($cityName) ?></h1>
  <div class="card mb-6">
    <p class="text-gray-700 mb-4">Most businesses in <?= esc($cityName) ?> aren't cited by AI. We fix that.</p>
    <p class="text-gray-600">Implementation of agent‑ready websites and schema systems for startups and enterprises in <?= esc($cityName) ?>.</p>
    <a class="button button--primary mt-4" href="/contact/">Book Consultation</a>
  </div>
  
  <div class="grid md:grid-cols-2 gap-6 mb-6">
    <div class="card">
      <h2 class="text-xl mb-4">Local Industries</h2>
      <ul class="list-disc">
        <?php foreach($industries as $industry): ?>
        <li><?= esc($industry) ?> companies in <?= esc($cityName) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
    
    <div class="card">
      <h2 class="text-xl mb-4">Test Your AI Visibility</h2>
      <p class="text-gray-600 text-sm mb-3">Try these prompts in ChatGPT:</p>
      <div class="space-y-2">
        <?php foreach($prompts as $prompt): ?>
        <div class="bg-gray-50 p-2 rounded text-sm font-mono">
          <?= esc($prompt) ?>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
  
  <div class="card">
    <h2 class="text-xl mb-4">Regional Services</h2>
    <ul class="list-disc">
      <li>Agentic SEO optimization for <?= esc($cityName) ?> businesses</li>
      <li>Schema markup implementation for local visibility</li>
      <li>AI Overview optimization for regional searches</li>
      <li>Custom API endpoints for agent integrations</li>
      <li>Entity graph building for <?= esc($landmark) ?> area companies</li>
    </ul>
  </div>

  <?php if($stateData){
    $nearbyCityLinks = array_values(array_filter($stateData['cities'], function($city) use ($cityName){ return $city !== $cityName; }));
  ?>
  <section class="card mb-6">
    <h2 class="text-xl mb-4">Nearby Cities We Support</h2>
    <ul class="grid md:grid-cols-2 gap-4">
      <?php
        $count = 0;
        foreach($nearbyCityLinks as $nearbyCity){
          if ($count >= 6) break;
          $nearSlug = strtolower(str_replace(' ','-',$nearbyCity));
      ?>
      <li class="border border-gray-200 rounded-lg p-4 bg-white">
        <a class="underline font-semibold" href="/ai-consulting/<?= esc($nearSlug.'-'.$stateAbbr) ?>/">
          AI Consulting — <?= esc($nearbyCity) ?>, <?= esc($stateAbbr) ?>
        </a>
        <p class="text-sm text-gray-600 mt-2">
          AI consultation programs for <?= esc($nearbyCity) ?>, focusing on strategy, schema, and AI readiness diagnostics.
        </p>
      </li>
      <?php
          $count++;
        }
      ?>
    </ul>
  </section>
  <?php } ?>
  <?php endif; ?>
</main>
<?php if($cityData){ 
  // Use the new comprehensive schema function
  $schema = build_page_schema_jsonld('city-service', [
    'title' => 'AI Consulting in ' . $cityName . ' | Neural Command',
    'headline' => 'AI Consulting in ' . $cityName,
    'description' => 'Implementation of agent‑ready websites and schema systems for startups and enterprises in ' . $cityName . '.',
    'serviceSlug' => 'ai-consulting',
    'cityKey' => $key,
    'faqs' => [
      ['What do you implement?','Agentic endpoints (/agent.json, /meta.json), Q&A content, schema, and visibility monitoring.'],
      ['Do you support my industry?','Yes — we tailor prompts, citations, and examples to your niche in '.$cityName.'.']
    ]
  ]);
  
  echo '<script type="application/ld+json">'.json_encode($schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
} ?>

