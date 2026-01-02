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
  
  <section style="margin-bottom: 3rem; max-width: 800px;">
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Problem</h2>
    <p style="margin-bottom: 2rem; line-height: 1.6;">
      A service-based website experienced declining impressions and reduced visibility as Google AI Overviews replaced traditional results.
    </p>
    
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Constraints</h2>
    <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
      <li>Existing content could not be rewritten entirely</li>
      <li>No paid acquisition allowed</li>
      <li>Indexing issues were unclear</li>
    </ul>
    
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Actions Taken</h2>
    <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
      <li>Audited indexing and canonical signals</li>
      <li>Identified AI Overview eligibility gaps</li>
      <li>Implemented structured data corrections</li>
      <li>Re-aligned content structure for AI retrieval</li>
    </ul>
    
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Outcome</h2>
    <p style="margin-bottom: 2rem; line-height: 1.6;">
      Within weeks, impressions stabilized and AI-driven visibility signals improved across affected pages.
    </p>
    
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">What this proves</h2>
    <p style="margin-bottom: 2rem; line-height: 1.6;">
      This work demonstrates applied AI search optimization under real constraints.
    </p>
  </section>
</main>

