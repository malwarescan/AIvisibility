<?php
// AI Visibility Audit Results Page
$ctx['title'] = 'AI Visibility Audit Results | Neural Command';
$ctx['desc'] = 'Your AI visibility assessment results with actionable recommendations.';

// Get the audit data from session
session_start();
$data = $_SESSION['audit_data'] ?? null;
$domain = $_SESSION['audit_domain'] ?? '';
$email = $_SESSION['audit_email'] ?? '';
$industry = $_SESSION['audit_industry'] ?? '';

if (!$data) {
    header('Location: /resources/diagnostic/');
    exit;
}
?>

<main class="container py-8">
  <div class="card mb-6">
    <h1 class="text-3xl mb-4">AI Visibility Audit Results</h1>
    <p class="text-gray-700 mb-4">Here's your AI visibility assessment for <strong><?= esc($data['domain']) ?></strong> in the <strong><?= esc($data['industry']) ?></strong> industry.</p>
  </div>

  <!-- Score Section -->
  <div class="card mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl">AI Visibility Score</h2>
      <div class="text-4xl font-bold <?= $data['visibility_score'] >= 70 ? 'text-green-600' : ($data['visibility_score'] >= 40 ? 'text-yellow-600' : 'text-red-600') ?>">
        <?= esc($data['visibility_score']) ?>/100
      </div>
    </div>
    
    <?php if (isset($data['test_results'])): ?>
    <div class="mb-4 p-3 bg-gray-50 rounded">
      <h3 class="font-semibold mb-2">Test Results Summary</h3>
      <p class="text-sm text-gray-600">
        <strong><?= esc($data['test_results']['mentions']) ?></strong> out of <strong><?= esc($data['test_results']['total_tests']) ?></strong> AI tests found mentions of your domain
        <br>
        <strong><?= esc($data['test_results']['mention_rate']) ?>%</strong> mention rate across industry-related queries
      </p>
    </div>
    <?php endif; ?>
    
    <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
      <div class="h-4 rounded-full <?= $data['visibility_score'] >= 70 ? 'bg-green-500' : ($data['visibility_score'] >= 40 ? 'bg-yellow-500' : 'bg-red-500') ?>" 
           style="width: <?= esc($data['visibility_score']) ?>%"></div>
    </div>
    
    <div class="text-center">
      <span class="inline-block px-4 py-2 rounded-full text-sm font-semibold <?= $data['visibility_score'] >= 70 ? 'bg-green-100 text-green-800' : ($data['visibility_score'] >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') ?>">
        Status: <?= esc($data['status']) ?>
      </span>
    </div>
  </div>

  <div class="grid md:grid-cols-2 gap-6 mb-6">
    <!-- Issues Section -->
    <div class="card">
      <h2 class="text-xl mb-4">Issues Identified</h2>
      <ul class="space-y-2">
        <?php foreach($data['issues'] as $issue): ?>
        <li class="flex items-start">
          <span class="text-red-500 mr-2 mt-1">•</span>
          <span><?= esc($issue) ?></span>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <!-- Recommendations Section -->
    <div class="card">
      <h2 class="text-xl mb-4">Recommendations</h2>
      <ul class="space-y-2">
        <?php foreach($data['recommendations'] as $rec): ?>
        <li class="flex items-start">
          <span class="text-green-500 mr-2 mt-1">✓</span>
          <span><?= esc($rec) ?></span>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>

  <!-- Test Prompts Section -->
  <div class="card mb-6">
    <h2 class="text-xl mb-4">Test Your Current AI Visibility</h2>
    <p class="text-gray-600 mb-4">Try these prompts in ChatGPT to see how your business currently appears:</p>
    <div class="space-y-3">
      <?php foreach($data['test_prompts'] as $prompt): ?>
      <div class="bg-gray-50 p-3 rounded border">
        <div class="flex items-start justify-between">
          <div class="font-mono text-sm flex-1"><?= esc($prompt) ?></div>
          <button onclick="copyToClipboard('<?= esc($prompt, ENT_QUOTES) ?>')" class="ml-2 px-2 py-1 text-xs button secondary">
            Copy
          </button>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Next Steps Section -->
  <div class="card">
    <h2 class="text-xl mb-4">Next Steps</h2>
    <ul class="space-y-3">
      <?php foreach($data['next_steps'] as $step): ?>
      <li class="flex items-center">
        <span class="text-gray-500 mr-3">→</span>
        <span><?= esc($step) ?></span>
      </li>
      <?php endforeach; ?>
    </ul>
    
    <div class="mt-8 pt-6 border-t border-gray-200">
      <h3 class="text-lg font-semibold mb-6">Take Action</h3>
      <div class="flex flex-col sm:flex-row gap-6">
        <a href="/contact/" class="button secondary text-center">Book a Consultation</a>
        <a href="/services/agentic-seo/" class="button secondary text-center">Learn About Agentic SEO</a>
        <a href="/resources/diagnostic/" class="button secondary text-center">Run Another Audit</a>
      </div>
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
