<?php
$breadcrumbs = [
  ['label' => 'Home'],
];
?>
<main class="container py-8 home">
  <div id="react-root" class="mb-8"></div>
  <div class="home__panel">
    <div class="home__badge">terminal mode</div>
    <h1 class="home__title">neuralCommand(get visible)</h1>
    <p class="home__lede">
      AI surfaces rave about crawl clarity. We build the file system they trust.
      Think cabinets, directories, static manifests—no cinematic scroll, just signal.
    </p>
    <div class="home__cta-row">
      <a class="home__button" href="/contact/">Book a Console Session</a>
      <a class="home__button home__button--secondary" href="/services/">View Service Manual</a>
    </div>
  </div>

  <section class="home__grid">
    <article class="home__card">
      <header>
        <span class="home__label">Service Stack</span>
        <span class="home__code">/services/agentic-seo</span>
      </header>
      <h2>Agentic SEO</h2>
      <p>Cite-worthy landing systems, prompt-regression scripts, AI Overview netting.</p>
      <a href="/services/agentic-seo/" class="home__link">Open dossier</a>
    </article>

    <article class="home__card">
      <header>
        <span class="home__label">Schema Desk</span>
        <span class="home__code">/services/schema-optimizer</span>
      </header>
      <h2>Schema Optimizer</h2>
      <p>Crosswalk validators, consensus diff reports, JSON-LD patch sets.</p>
      <a href="/services/schema-optimizer/" class="home__link">Open dossier</a>
    </article>

    <article class="home__card">
      <header>
        <span class="home__label">Consult Ops</span>
        <span class="home__code">/services/ai-consulting</span>
      </header>
      <h2>AI Consulting</h2>
      <p>Agent workflows, endpoint hardening, AI visibility regression suites.</p>
      <a href="/services/ai-consulting/" class="home__link">Open dossier</a>
    </article>
  </section>

  <section class="home__grid home__grid--wide">
    <article class="home__card">
      <header>
        <span class="home__label">Programs</span>
        <span class="home__code">/services/</span>
      </header>
      <p>Programmatic SEO matrices, state + city kit, service combinations.</p>
      <a href="/services/" class="home__link">Browse programs</a>
    </article>

    <article class="home__card">
      <header>
        <span class="home__label">Diagnostics</span>
        <span class="home__code">/resources/diagnostic/</span>
      </header>
      <p>AI visibility audit loop, prompt library, mention capture logs.</p>
      <a href="/resources/diagnostic/" class="home__link">Run diagnostic</a>
    </article>

    <article class="home__card">
      <header>
        <span class="home__label">Resources</span>
        <span class="home__code">/resources/</span>
      </header>
      <p>AI Mode primers, Overviews field notes, case studies, operator guides.</p>
      <a href="/resources/" class="home__link">Open library</a>
    </article>
  </section>
</main>

<?php
// HERO SCHEMA — Comprehensive JSON-LD for homepage
require_once __DIR__ . '/../lib/seo.php';

// Use pricing table for the main hero offer
$heroServiceSlug  = 'agentic-seo';
$heroServiceName  = 'Default Recommendation AI Services';
$heroDescription  = 'We make your business the default recommendation in ChatGPT, Google AI Overviews, Claude, and Perplexity—engineered to be cited, recommended, and chosen first.';
$heroOffers       = build_offers_jsonld($PRICING[$heroServiceSlug] ?? []);

// Short, snippet-ready FAQs (mirrored on page)
$heroFaq = [
  ['How do we become the default recommendation in ChatGPT?', 'We align entities, schema, and authoritative citations, then validate with prompt regression across ChatGPT, Claude, Perplexity, and AI Overviews.'],
  ['How fast can results appear?', 'On-site fixes are immediate; AI mentions improve as authority signals are crawled and incorporated—typically weeks for movement, months for durable dominance.'],
  ['What do you implement on our site?', 'Complete schema coverage, Q&A blocks, agent endpoints (/agent.json, /meta.json), regional pages, and authority placements LLMs actually cite.'],
];

// Page meta
$currentUrl = canonical($_SERVER['REQUEST_URI']);
$title      = 'Default Recommendation AI Services | ChatGPT & AI Overview Optimization';
$headline   = 'Be the Default Recommendation in ChatGPT, Google AI Overviews, Claude & Perplexity';
$desc       = 'Get your products, services, and brand cited by AI. We engineer your site so you are the trusted default across LLMs.';

// Build individual nodes
$webPageLD = [
  '@type'        => 'WebPage',
  '@id'          => $currentUrl.'#webpage',
  'url'          => $currentUrl,
  'name'         => $title,
  'headline'     => $headline,
  'description'  => $desc,
  'inLanguage'   => 'en',
  'isPartOf'     => ['@type'=>'WebSite','@id'=>NC_BASEURL.'#website','url'=>NC_BASEURL,'name'=>NC_NAME],
];

$serviceLD = [
  '@type'        => 'Service',
  '@id'          => $currentUrl.'#service',
  'name'         => $heroServiceName,
  'serviceType'  => 'AI brand visibility optimization',
  'description'  => $heroDescription,
  'provider'     => [
    '@type' => 'Organization',
    'name'  => NC_NAME,
    'url'   => NC_BASEURL,
    'telephone' => NC_PHONE,
    'address'   => NC_ADDR
  ],
  'areaServed'   => ['@type'=>'Country','name'=>'United States'],
  'offers'       => $heroOffers
];

$faqLD = build_faq_jsonld($heroFaq);
$faqLD['@id'] = $currentUrl.'#faq';

$breadcrumbLD = build_breadcrumb_jsonld([
  ['name'=>'Home','item'=>canonical('/')],
  ['name'=>'Services','item'=>canonical('/services/')],
  ['name'=>'Default Recommendation AI Services','item'=>$currentUrl],
]);

// Optional: speakable bits (helps voice/assistants)
$speakableLD = [
  '@type' => 'SpeakableSpecification',
  'cssSelector' => ['h1', 'section p']
];

// Emit a single @graph
$graph = [
  '@context' => 'https://schema.org',
  '@graph'   => [
    $webPageLD,
    $serviceLD,
    $faqLD,
    array_merge($breadcrumbLD, ['@id'=>$currentUrl.'#breadcrumb']),
    $speakableLD
  ]
];

echo '<script type="application/ld+json">'.json_encode($graph, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
?>

