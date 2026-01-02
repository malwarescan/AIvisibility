<?php
declare(strict_types=1);
require_once __DIR__.'/../../bootstrap/canonical.php';

$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Case Studies', 'url' => Canonical::absolute('/case-studies/')],
  ['label' => 'AI Visibility Recovery']
];

$ctx = [
  'title' => 'AI Visibility Recovery for a Service-Based Website | Neural Command',
  'desc' => 'Case study: AI visibility recovery for a service-based website experiencing declining impressions as Google AI Overviews replaced traditional results.'
];
?>

<main class="container py-8">
  <h1>AI Visibility Recovery for a Service-Based Website</h1>
  
  <section class="mb-3xl max-w-lg">
    <h2 class="text-2xl font-semibold mb-md">Problem</h2>
    <p class="mb-xl leading-relaxed">
      A service-based website experienced declining impressions and reduced visibility as Google AI Overviews replaced traditional results.
    </p>
    
    <h2 class="text-2xl font-semibold mb-md">Constraints</h2>
    <ul class="mb-xl pl-lg leading-loose">
      <li>Existing content could not be rewritten entirely</li>
      <li>No paid acquisition allowed</li>
      <li>Indexing issues were unclear</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mb-md">Actions Taken</h2>
    <ul class="mb-xl pl-lg leading-loose">
      <li>Audited indexing and canonical signals</li>
      <li>Identified AI Overview eligibility gaps</li>
      <li>Implemented structured data corrections</li>
      <li>Re-aligned content structure for AI retrieval</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mb-md">Outcome</h2>
    <p class="mb-xl leading-relaxed">
      Within weeks, impressions stabilized and AI-driven visibility signals improved across affected pages.
    </p>
    
    <h2 class="text-2xl font-semibold mb-md">What this proves</h2>
    <p class="mb-xl leading-relaxed">
      This work demonstrates applied AI search optimization under real constraints.
    </p>
  </section>
</main>

