<?php
$breadcrumbs = [
  ['label' => 'Home'],
];

// Homepage meta - classifier-compliant commercial language
$ctx = [
  'title' => 'AI SEO & Answer Engine Optimization for Businesses | Neural Command',
  'desc' => 'AI SEO and answer engine optimization services that help businesses stay visible in Google Search, AI Overviews, and answer engines.'
];
?>
<main class="container py-8 home">
  <!-- ZONE 1: PRIMARY CLASSIFICATION -->
  <section class="home-hero">
    <h1>AI SEO & Answer Engine Optimization for Businesses</h1>
    <p class="home-subtitle">
      Neural Command LLC provides AI search optimization services that help businesses stay visible in Google Search, AI Overviews, and answer engines.
    </p>
  </section>

  <!-- ZONE 3: CREDIBILITY / AUTHORITY -->
  <section class="home-section">
    <p class="text-base leading-relaxed text-muted mb-lg max-w-md">
      <strong>Who it's for:</strong> For companies that rely on organic search and are losing visibility as Google shifts toward AI-driven results.
    </p>
    <p class="text-base leading-relaxed text-muted mb-lg max-w-md">
      <strong>What it fixes:</strong> We fix indexing failures, AI Overview eligibility issues, structured data gaps, and authority signals that prevent your site from being surfaced by modern search systems.
    </p>
    <p class="text-base leading-relaxed text-muted mb-lg max-w-md">
      <strong>Cost of inaction:</strong> If these issues aren't addressed, your content becomes invisible as search traffic moves from clicks to AI-generated answers.
    </p>
    <p class="text-sm text-muted max-w-md m-0">
      Based in the United States. Serving businesses worldwide.
    </p>
  </section>

  <!-- ZONE 4: PRIMARY ACTION -->
  <section class="home-cta">
    <a class="btn-primary-inline" data-contact-trigger href="#">Get an AI Search Visibility Assessment</a>
    <p class="text-sm text-muted mt-md mb-0">
      Technical review of indexing, eligibility, and AI visibility signals.
    </p>
  </section>
</main>

<?php
// Homepage schema: Organization + WebSite + WebPage only (per Master Schema Matrix)
// Service schema removed - homepage is not a conversion page
// FAQ schema removed - not needed for homepage per matrix rules
// All schema handled by unified @graph system in templates/head.php
?>

