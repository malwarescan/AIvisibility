<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';

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
  <p style="margin-bottom: 3rem; max-width: 700px; line-height: 1.6; color: var(--text-muted);">
    Neural Command LLC provides AI-focused SEO and answer engine optimization services for businesses affected by Google AI Overviews and modern search systems. Each service below addresses a specific visibility, indexing, or eligibility problem.
  </p>

  <div style="display: grid; gap: 2rem; margin-bottom: 3rem;">
    <article style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.375rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">AI Search Optimization</h2>
      <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">
        Fixes crawlability, indexing, and authority signals so your site remains visible as search systems shift to AI-driven retrieval.
      </p>
      <a href="<?= Canonical::absolute('/services/ai-search-optimization/') ?>" style="color: var(--primary); text-decoration: underline;">View service →</a>
    </article>

    <article style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.375rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">AI Overview Optimization</h2>
      <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">
        Improves eligibility and visibility inside Google AI Overviews and generative summaries.
      </p>
      <a href="<?= Canonical::absolute('/services/ai-overview-optimization/') ?>" style="color: var(--primary); text-decoration: underline;">View service →</a>
    </article>

    <article style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.375rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">Answer Engine Optimization</h2>
      <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">
        Positions your content to be selected by answer engines instead of buried beneath them.
      </p>
      <a href="<?= Canonical::absolute('/services/answer-engine-optimization/') ?>" style="color: var(--primary); text-decoration: underline;">View service →</a>
    </article>

    <article style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.375rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">Generative Engine Optimization</h2>
      <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">
        Aligns content and structure for retrieval by large language models and AI search agents.
      </p>
      <a href="<?= Canonical::absolute('/services/generative-engine-optimization/') ?>" style="color: var(--primary); text-decoration: underline;">View service →</a>
    </article>

    <article style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.375rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">Structured Data Engineering</h2>
      <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">
        Implements and validates structured data systems required for modern search eligibility.
      </p>
      <a href="<?= Canonical::absolute('/services/structured-data-engineering/') ?>" style="color: var(--primary); text-decoration: underline;">View service →</a>
    </article>
  </div>

  <div style="padding-top: 2rem; border-top: 1px solid var(--border);">
    <p style="margin-bottom: 1rem;">
      Not sure which service applies? <a data-contact-trigger href="#" style="color: var(--primary); text-decoration: underline;">Get an AI Search Visibility Assessment</a>.
    </p>
  </div>
</main>

