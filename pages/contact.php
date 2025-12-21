<?php
require_once __DIR__.'/../lib/schema_enforcement.php';
require_once __DIR__.'/../config.php';

$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Contact'],
];

$ctx = [
  'title' => 'Contact Neural Command',
  'desc' => 'Work with teams and founders who need clarity around AI visibility, search performance, and strategic execution.',
];

// Contact page schema: ContactPoint + Organization + WebPage (per Master Schema Matrix)
// NO Service, NO FAQ, NO Offer, NO Product
$contactPointSchema = SchemaEnforcement::generateContactPoint(
  NC_CONTACT_EMAIL,
  NC_PHONE,
  'General'
);
$contactPointSchema['@id'] = canonical('/contact/').'#contactpoint';

$GLOBALS['contactPointSchema'] = $contactPointSchema;
?>
<main class="container py-8">
  <h1>Contact Neural Command</h1>
  
  <div class="contact-intro" style="max-width: 700px; margin-bottom: 3rem;">
    <p class="lead">
      We work with teams and founders who need clarity around AI visibility, search performance, and strategic execution.
    </p>
    <p>
      If you're exploring fit, validating an approach, or deciding next steps, choose how you'd like to start the conversation below.
    </p>
  </div>

  <div class="contact-fit-section" style="max-width: 700px; margin-bottom: 3rem;">
    <h2>What this conversation is / is not</h2>
    
    <div style="margin-bottom: 2rem;">
      <h3>This is a good fit if you are:</h3>
      <ul>
        <li>Evaluating AI search visibility, SEO, or AI-driven discovery</li>
        <li>Comparing approaches or vendors</li>
        <li>Looking for a second opinion on strategy or direction</li>
        <li>Responsible for decisions or implementation</li>
      </ul>
    </div>
    
    <div>
      <h3>This may not be a fit if you are:</h3>
      <ul>
        <li>Looking for free tactical advice</li>
        <li>Requesting speculative estimates without context</li>
        <li>Not yet in a position to act or decide</li>
      </ul>
    </div>
  </div>

  <div class="contact-cta-section" style="max-width: 600px; margin-bottom: 3rem;">
    <div class="space-y-4">
      <button data-contact-trigger class="button button-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem;">
        Start Conversation
      </button>
      
      <button data-contact-trigger class="button button-secondary" style="width: 100%; padding: 1rem; font-size: 1.1rem; border: 1px solid var(--border);">
        Request an Audit
      </button>
    </div>
  </div>

  <div class="contact-next-steps" style="max-width: 700px; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border);">
    <h2>What happens next</h2>
    <p>
      When you reach out, your message goes directly to us.
    </p>
    <p>
      We'll respond by email or phone with next steps, or ask for clarification if needed. There's no automated follow-up and no obligation.
    </p>
  </div>
</main>

