<?php
$breadcrumbs = [
  ['label' => 'Home'],
];

// NC: Homepage meta for CTR lift on branded + AI intents
$ctx = [
  'title' => 'Neural Command — Agentic SEO, GEO & AI Overview Optimization',
  'desc' => 'Agentic SEO for 2025+: schema-first strategy to win Google AI Overviews, ChatGPT, Claude, and Perplexity. Crawl clarity, JSON-LD, and programmatic city coverage.'
];
?>
<main class="container py-8 home">
  <div class="home__panel">
    <p class="home__kicker" style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem;">AI Visibility and Search, Without the Guesswork</p>
    <h1 class="home__title" style="font-size: 1.75rem; line-height: 1.4; margin-bottom: 2rem; font-weight: 400;">
      A lot of people in AI and SEO sell ideas they don't fully understand.<br>
      We work with LLM visibility and search from concept to real application.
    </h1>
    <div class="home__cta-row">
      <a class="home__button" data-contact-trigger href="#">Book a Consultation</a>
      <a class="home__button home__button--secondary" href="/services/">Learn More</a>
    </div>
  </div>

  <!-- Featured Article Section -->
  <section class="home__featured-article">
    <div class="home__featured-content">
      <header>
        <span class="home__label">Featured Research</span>
        <span class="home__code">/insights/geo-16-framework</span>
      </header>
      <h2>AI Answer Engine Citation Behavior: The GEO-16 Framework Explained</h2>
      <p class="home__featured-desc">How to reach GEO ≥ 0.70 and earn cross-engine citations using structured data, semantic HTML, and freshness signals. A 16-pillar model that improves AI citation likelihood.</p>
      <a href="/insights/geo-16-framework/" class="home__button">Read the Research</a>
    </div>
  </section>

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
// Homepage schema: Organization + WebSite + WebPage only (per Master Schema Matrix)
// Service schema removed - homepage is not a conversion page
// FAQ schema removed - not needed for homepage per matrix rules
// All schema handled by unified @graph system in templates/head.php
?>

