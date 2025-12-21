<?php
// AI Visibility Audit Results Page - SIMPLE VERSION
$ctx['title'] = 'Audit Request Received | Neural Command';
$ctx['desc'] = 'Your AI visibility audit request has been received.';

// Get the audit request from session
session_start();
$request = $_SESSION['audit_request'] ?? null;

if (!$request) {
    header('Location: /resources/diagnostic/');
    exit;
}

$domain = $request['domain'] ?? '';
$email = $request['email'] ?? '';
$industry = $request['industry'] ?? '';
$emailSent = $request['email_sent'] ?? false;
?>

<main class="container py-8">
  <div class="card mb-6">
    <h1 class="text-3xl mb-4">Audit Request Received</h1>
    <p class="text-gray-700 mb-4">
      Thank you for requesting an AI visibility audit for <strong><?= esc($domain) ?></strong> in the <strong><?= esc($industry) ?></strong> industry.
    </p>
    
    <?php if ($emailSent): ?>
    <div class="p-4 bg-green-50 border border-green-200 rounded mb-4">
      <p class="text-green-800">✓ Your request has been sent successfully. We'll review it and get back to you soon.</p>
    </div>
    <?php else: ?>
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded mb-4">
      <p class="text-yellow-800">Note: Email delivery confirmation pending. Your request has been recorded.</p>
    </div>
    <?php endif; ?>
  </div>

  <div class="card mb-6">
    <h2 class="text-xl mb-4">What Happens Next</h2>
    <ul class="space-y-3">
      <li class="flex items-start">
        <span class="text-gray-500 mr-3 mt-1">1.</span>
        <span>We'll review your audit request and analyze <strong><?= esc($domain) ?></strong></span>
      </li>
      <li class="flex items-start">
        <span class="text-gray-500 mr-3 mt-1">2.</span>
        <span>We'll check your presence in ChatGPT, Perplexity, Google AI Overviews, and other AI systems</span>
      </li>
      <li class="flex items-start">
        <span class="text-gray-500 mr-3 mt-1">3.</span>
        <span>We'll send a detailed assessment to <strong><?= esc($email) ?></strong> with actionable recommendations</span>
      </li>
    </ul>
  </div>

  <div class="card mb-6">
    <h2 class="text-xl mb-4">Test Your Current AI Visibility</h2>
    <p class="text-gray-600 mb-4">While you wait, try these prompts in ChatGPT to see how your business currently appears:</p>
    <div class="space-y-3">
      <div class="bg-gray-50 p-3 rounded border">
        <div class="flex items-start justify-between">
          <div class="font-mono text-sm flex-1">"Name the top 5 <?= esc($industry) ?> companies with the best customer reviews."</div>
          <button onclick="copyToClipboard('Name the top 5 <?= esc($industry, ENT_QUOTES) ?> companies with the best customer reviews.')" class="ml-2 px-2 py-1 text-xs button secondary">
            Copy
          </button>
        </div>
      </div>
      <div class="bg-gray-50 p-3 rounded border">
        <div class="flex items-start justify-between">
          <div class="font-mono text-sm flex-1">"What are the leading <?= esc($industry) ?> providers in the market?"</div>
          <button onclick="copyToClipboard('What are the leading <?= esc($industry, ENT_QUOTES) ?> providers in the market?')" class="ml-2 px-2 py-1 text-xs button secondary">
            Copy
          </button>
        </div>
      </div>
      <div class="bg-gray-50 p-3 rounded border">
        <div class="flex items-start justify-between">
          <div class="font-mono text-sm flex-1">"Who should I contact for <?= esc($industry) ?> services?"</div>
          <button onclick="copyToClipboard('Who should I contact for <?= esc($industry, ENT_QUOTES) ?> services?')" class="ml-2 px-2 py-1 text-xs button secondary">
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2 class="text-xl mb-4">Next Steps</h2>
    <div class="flex flex-col sm:flex-row gap-4">
      <a href="/contact/" class="button button-primary text-center">Book a Consultation</a>
      <a href="/services/agentic-seo/" class="button button-secondary text-center">Learn About Agentic SEO</a>
      <a href="/resources/diagnostic/" class="button button-secondary text-center">Request Another Audit</a>
    </div>
  </div>
</main>

<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    // Simple feedback - you could add a toast notification here
    alert('Prompt copied to clipboard!');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
}
</script>
