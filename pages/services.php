<?php
declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

$canonical = Canonical::absolute('/services/');

$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Services'],
];

$ctx = [
  'title' => 'AI Search Optimization Services for Businesses | Neural Command',
  'desc' => 'AI-focused SEO and answer engine optimization services for businesses affected by Google AI Overviews and modern search systems.'
];
?>
<main class="container py-8">
  <h1>AI Search Optimization Services for Businesses</h1>
  <p class="mb-3xl max-w-md leading-relaxed text-muted">
    Neural Command LLC provides AI-focused SEO and answer engine optimization services for businesses affected by Google AI Overviews and modern search systems. Each service below addresses a specific visibility, indexing, or eligibility problem.
  </p>

  <div class="grid gap-lg mb-3xl">
    <article class="card-style">
      <h2 class="text-xl font-semibold mb-sm">AI Search Optimization</h2>
      <p class="mb-md text-muted">
        Fixes crawlability, indexing, and authority signals so your site remains visible as search systems shift to AI-driven retrieval.
      </p>
      <a href="<?= Canonical::absolute('/services/ai-search-optimization/') ?>" class="text-accent">View service →</a>
    </article>

    <article class="card-style">
      <h2 class="text-xl font-semibold mb-sm">AI Overview Optimization</h2>
      <p class="mb-md text-muted">
        Improves eligibility and visibility inside Google AI Overviews and generative summaries.
      </p>
      <a href="<?= Canonical::absolute('/services/ai-overview-optimization/') ?>" class="text-accent">View service →</a>
    </article>

    <article class="card-style">
      <h2 class="text-xl font-semibold mb-sm">Answer Engine Optimization</h2>
      <p class="mb-md text-muted">
        Positions your content to be selected by answer engines instead of buried beneath them.
      </p>
      <a href="<?= Canonical::absolute('/services/answer-engine-optimization/') ?>" class="text-accent">View service →</a>
    </article>

    <article class="card-style">
      <h2 class="text-xl font-semibold mb-sm">Generative Engine Optimization</h2>
      <p class="mb-md text-muted">
        Aligns content and structure for retrieval by large language models and AI search agents.
      </p>
      <a href="<?= Canonical::absolute('/services/generative-engine-optimization/') ?>" class="text-accent">View service →</a>
    </article>

    <article class="card-style">
      <h2 class="text-xl font-semibold mb-sm">Structured Data Engineering</h2>
      <p class="mb-md text-muted">
        Implements and validates structured data systems required for modern search eligibility.
      </p>
      <a href="<?= Canonical::absolute('/services/structured-data-engineering/') ?>" class="text-accent">View service →</a>
    </article>
  </div>

  <div class="section-divider">
    <p class="mb-md">
      Not sure which service applies? <a data-contact-trigger href="#" class="text-accent">Get an AI Search Visibility Assessment</a>.
    </p>
  </div>
</main>

