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
  <!-- SECTION 1: HERO (ABOVE THE FOLD) -->
  <section class="home__hero" style="margin-bottom: 4rem;">
    <h1 class="home__title" style="font-size: 1.75rem; line-height: 1.4; margin-bottom: 1.5rem; font-weight: 400; max-width: 800px;">
      AI SEO & Answer Engine Optimization for Businesses
    </h1>
    <p class="home__subhead" style="font-size: 1.125rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem; max-width: 700px;">
      Neural Command LLC provides AI search optimization services that help businesses stay visible in Google Search, AI Overviews, and answer engines.
    </p>
    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.5rem; max-width: 700px;">
      <strong>Who it's for:</strong> For companies that rely on organic search and are losing visibility as Google shifts toward AI-driven results.
    </p>
    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.5rem; max-width: 700px;">
      <strong>What it fixes:</strong> We fix indexing failures, AI Overview eligibility issues, structured data gaps, and authority signals that prevent your site from being surfaced by modern search systems.
    </p>
    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 700px;">
      <strong>Cost of inaction:</strong> If these issues aren't addressed, your content becomes invisible as search traffic moves from clicks to AI-generated answers.
    </p>
    <div class="home__cta-row" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <a class="home__button" data-contact-trigger href="#" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary); color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 500;">Get an AI Search Visibility Assessment</a>
    </div>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.5rem; max-width: 700px;">
      Technical review of indexing, eligibility, and AI visibility signals.
    </p>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0; max-width: 700px;">
      Based in the United States. Serving businesses worldwide.
    </p>
  </section>
</main>

<?php
// Homepage schema: Organization + WebSite + WebPage only (per Master Schema Matrix)
// Service schema removed - homepage is not a conversion page
// FAQ schema removed - not needed for homepage per matrix rules
// All schema handled by unified @graph system in templates/head.php
?>

