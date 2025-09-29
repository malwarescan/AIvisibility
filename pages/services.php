<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Services'],
];
?>
<?php global $SERVICES; ?>
<main class="container py-8 services-index">
  <h1 class="text-3xl mb-6">Services</h1>
  <div class="grid lg:grid-cols-[2fr,1fr] gap-8">
    <div>
      <div class="grid md:grid-cols-2 gap-6 services-list">
        <?php foreach($SERVICES as $slug=>$svc): ?>
        <article class="services-list__card">
          <header>
            <h2><?= esc($svc['name']) ?></h2>
            <span class="services-list__code">/services/<?= esc($slug) ?>/</span>
          </header>
          <p><?= esc($svc['short']) ?></p>
          <a href="/services/<?= esc($slug) ?>/" class="services-list__link">Open file</a>
        </article>
        <?php endforeach; ?>
      </div>
      <section class="card mt-8">
        <h2 class="text-xl mb-4">Explore Service Categories</h2>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">AI Visibility</h3>
            <ul class="space-y-1">
              <li><a href="/services/agentic-seo/" class="underline">Agentic SEO & AI Overviews</a></li>
              <li><a href="/services/ai-search-optimization/" class="underline">AI Search Optimization</a></li>
              <li><a href="/services/answer-engine-optimization/" class="underline">Answer Engine Optimization</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">LLM Training Signals</h3>
            <ul class="space-y-1">
              <li><a href="/services/generative-engine-optimization/" class="underline">Generative Engine Optimization</a></li>
              <li><a href="/services/schema-optimizer/" class="underline">Schema Optimizer</a></li>
              <li><a href="/services/ai-discovery-services/" class="underline">AI Discovery Services</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Strategic Advisory</h3>
            <ul class="space-y-1">
              <li><a href="/services/ai-consulting/" class="underline">AI Consulting & Integration</a></li>
              <li><a href="/services/ai-recommendation-consulting/" class="underline">AI Recommendation Consulting</a></li>
              <li><a href="/services/chatgpt-seo/" class="underline">ChatGPT SEO Services</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <aside class="card h-fit">
      <h2 class="text-xl mb-4">Where to Start</h2>
      <ul class="space-y-3 text-sm">
        <li>
          <strong>Need visibility fast?</strong><br>
          <a href="/services/agentic-seo/" class="underline">Agentic SEO</a> plus <a href="/services/answer-engine-optimization/" class="underline">Answer Engine Optimization</a>.
        </li>
        <li>
          <strong>Fix your schema coverage?</strong><br>
          Combine <a href="/services/schema-optimizer/" class="underline">Schema Optimizer</a> with <a href="/services/ai-discovery-services/" class="underline">AI Discovery Services</a>.
        </li>
        <li>
          <strong>Need advisory support?</strong><br>
          Pair <a href="/services/ai-consulting/" class="underline">AI Consulting</a> with <a href="/services/ai-recommendation-consulting/" class="underline">AI Recommendation Consulting</a>.
        </li>
        <li>
          <strong>Going multi-location?</strong><br>
          Use <a href="/services/generative-engine-optimization/" class="underline">GEO</a> plus <a href="/services/agentic-seo/" class="underline">Agentic SEO</a> for programmatic coverage.
        </li>
      </ul>
      <div class="mt-6">
        <h3 class="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Recommended Resources</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/how-to-get-featured-in-ai-overviews/" class="underline">Get Featured in AI Overviews</a></li>
          <li><a href="/what-is-google-ai-mode/" class="underline">What is Google AI Mode?</a></li>
          <li><a href="/who-controls-which-sites-ai-picks/" class="underline">Who Controls AI Picks?</a></li>
          <li><a href="/resources/diagnostic/" class="underline">Run an AI Visibility Diagnostic</a></li>
        </ul>
      </div>
    </aside>
  </div>
</main>
<?php 
$itemList = [
  '@context'=>'https://schema.org',
  '@type'=>'ItemList',
  'itemListElement'=>[]
];
$pos=1;
foreach ($SERVICES as $slug=>$svc) {
  $itemList['itemListElement'][] = [
    '@type'=>'ListItem',
    'position'=>$pos++,
    'url'=>canonical('/services/'.$slug.'/'),
    'name'=>$svc['name']
  ];
}
echo '<script type="application/ld+json">'.json_encode($itemList, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';

echo '<script type="application/ld+json">'.json_encode(ld_faq([
  ['How do services get mentioned in ChatGPT?', 'By giving LLMs structured facts, trusted references, and explicit actions that agents can use confidently.'],
  ['Do you support regional SEO?', 'Yes — we deploy /ai-consulting/{city}/ pages with localized schema and CTAs.'],
]), JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>

