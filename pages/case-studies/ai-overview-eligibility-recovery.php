<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';

$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Case Studies', 'url' => Canonical::absolute('/case-studies/')],
  ['label' => 'AI Overview Eligibility Recovery']
];

$ctx = [
  'title' => 'AI Overview Eligibility Recovery for a Content-Heavy Website | Neural Command',
  'desc' => 'Case study: AI overview eligibility recovery for a content-heavy website experiencing declining impressions as Google AI Overviews replaced traditional result layouts.'
];
?>

<main class="container py-8">
  <h1>AI Overview Eligibility Recovery for a Content-Heavy Website</h1>
  
  <section class="mb-3xl max-w-lg">
    <h2 class="text-2xl font-semibold mb-md">Problem</h2>
    <p class="mb-xl leading-relaxed">
      A content-heavy website experienced declining impressions as Google AI Overviews replaced traditional result layouts.
    </p>
    
    <h2 class="text-2xl font-semibold mb-md">Baseline</h2>
    <ul class="mb-xl pl-lg leading-loose">
      <li>Declining impressions across key pages</li>
      <li>Reduced visibility for non-brand queries</li>
      <li>No AI Overview presence</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mb-md">Actions Taken</h2>
    <ul class="mb-xl pl-lg leading-loose">
      <li>Audited AI Overview eligibility signals</li>
      <li>Identified structured data and semantic gaps</li>
      <li>Repaired canonical and indexing conflicts</li>
      <li>Re-aligned content structure for AI retrieval</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mb-md">Results</h2>
    <ul class="mb-xl pl-lg leading-loose">
      <li>Impressions increased across affected pages</li>
      <li>AI-driven visibility stabilized within weeks</li>
      <li>Eligible pages began appearing in AI summaries</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mb-md">Why This Matters</h2>
    <p class="mb-xl leading-relaxed">
      This demonstrates applied AI search optimization under real-world constraints.
    </p>
  </section>
</main>

