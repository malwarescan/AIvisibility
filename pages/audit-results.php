<?php
// AI Visibility Diagnostic Results Page - Three-Layer Architecture
$ctx['title'] = 'AI Visibility Diagnostic Results | Neural Command';
$ctx['desc'] = 'Diagnostic analysis of how AI systems interpret your page.';

// Get diagnostic results from session
session_start();
$results = $_SESSION['diagnostic_results'] ?? null;

if (!$results) {
    // Check for error
    if (isset($_SESSION['diagnostic_error'])) {
        $error = $_SESSION['diagnostic_error'];
        unset($_SESSION['diagnostic_error']);
    } else {
        header('Location: /resources/diagnostic/');
        exit;
    }
}

$url = $results['url'] ?? '';
$email = $results['email'] ?? '';
$signals = $results['signals'] ?? [];
$interpretation = $results['interpretation'] ?? [];
?>

<main class="container py-8">
  <?php if (isset($error)): ?>
    <div class="card mb-6">
      <h1 class="text-3xl mb-4">Analysis Error</h1>
      <p class="text-gray-700 mb-4">
        We couldn't analyze the page. <?= esc($error) ?>
      </p>
      <a href="/resources/diagnostic/" class="button button-primary">Try Again</a>
    </div>
  <?php else: ?>
    
    <!-- Human Framing: What This Is / Is Not -->
    <div class="card mb-6" style="max-width: 900px;">
      <h1 class="text-3xl mb-4">Diagnostic Results</h1>
      <p class="text-gray-700 mb-4">
        Here's what the systems are likely seeing when they interpret <strong><?= esc(parse_url($url, PHP_URL_HOST) . parse_url($url, PHP_URL_PATH)) ?></strong>.
      </p>
      <div class="p-4 bg-blue-50 border border-blue-200 rounded mb-4">
        <p class="text-sm text-blue-800">
          <strong>What this diagnostic can tell you:</strong> How language models interpret your content based on deterministic signals.<br>
          <strong>What this diagnostic cannot tell you:</strong> Whether you will rank, get guaranteed citations, or exact visibility scores.
        </p>
      </div>
    </div>

    <!-- Layer 1: Deterministic Signals -->
    <div class="card mb-6" style="max-width: 900px;">
      <h2 class="text-xl mb-4">Deterministic Signals</h2>
      <p class="text-sm text-gray-600 mb-4">These are real data points extracted from the page, not model opinions.</p>
      
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">Page Structure</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>Page Type:</strong> <?= esc($signals['page_type'] ?? 'unknown') ?></li>
            <li><strong>Page Role:</strong> <?= esc($signals['page_role_alignment'] ?? 'unknown') ?></li>
            <li><strong>Content Length:</strong> <?= number_format($signals['content_structure']['content_length'] ?? 0) ?> characters</li>
            <li><strong>Has H1:</strong> <?= ($signals['content_structure']['has_h1'] ?? false) ? 'Yes' : 'No' ?></li>
            <li><strong>Paragraphs:</strong> <?= $signals['content_structure']['paragraph_count'] ?? 0 ?></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">Indexability</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>Noindex:</strong> <?= ($signals['indexability']['noindex'] ?? false) ? 'Yes (page may not be indexed)' : 'No' ?></li>
            <li><strong>Canonical:</strong> <?= ($signals['canonical_status']['present'] ?? false) ? 'Yes' : 'No' ?></li>
            <?php if ($signals['canonical_status']['present'] ?? false): ?>
            <li><strong>Self-referential:</strong> <?= ($signals['canonical_status']['self_referential'] ?? false) ? 'Yes' : 'No' ?></li>
            <?php endif; ?>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">Schema & Entities</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>Schema Types:</strong> <?= !empty($signals['schema_types']) ? esc(implode(', ', $signals['schema_types'])) : 'None detected' ?></li>
            <li><strong>Entity References:</strong> <?= !empty($signals['entity_references']) ? esc(implode(', ', $signals['entity_references'])) : 'None detected' ?></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">Link Structure</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>Internal Links:</strong> <?= $signals['internal_link_depth']['internal_links'] ?? 0 ?></li>
            <li><strong>External Links:</strong> <?= $signals['internal_link_depth']['external_links'] ?? 0 ?></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Layer 2: AI Interpretation -->
    <?php if (!isset($interpretation['error']) && !isset($interpretation['fallback']) && !empty($interpretation['interpretation'])): ?>
    <div class="card mb-6" style="max-width: 900px;">
      <h2 class="text-xl mb-4">How AI Systems Are Likely Interpreting This Page</h2>
      <p class="text-sm text-gray-600 mb-4">
        This interpretation is based on the deterministic signals above. It explains patterns and identifies ambiguity, not guarantees.
      </p>
      <div class="p-4 bg-gray-50 rounded border">
        <div class="prose prose-sm max-w-none">
          <?= nl2br(esc($interpretation['interpretation'])) ?>
        </div>
      </div>
    </div>
    <?php elseif (isset($interpretation['error'])): ?>
    <div class="card mb-6" style="max-width: 900px;">
      <h2 class="text-xl mb-4">AI Interpretation</h2>
      <p class="text-sm text-gray-600 mb-4">
        AI interpretation is unavailable. The deterministic signals above still provide valuable diagnostic information.
      </p>
      <p class="text-xs text-gray-500"><?= esc($interpretation['error']) ?></p>
    </div>
    <?php endif; ?>

    <!-- Layer 3: Human Framing - What This Means -->
    <div class="card mb-6" style="max-width: 900px;">
      <h2 class="text-xl mb-4">What This Diagnostic Can and Cannot Tell You</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">This diagnostic explains:</h3>
          <ul class="list-disc text-sm text-gray-700 space-y-1 ml-5">
            <li>How language models parse the signals present on your page</li>
            <li>Where ambiguity or missing context exists</li>
            <li>What is clearly understood about your content</li>
            <li>What cannot be inferred without deeper access</li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">This diagnostic does not:</h3>
          <ul class="list-disc text-sm text-gray-700 space-y-1 ml-5">
            <li>Guarantee rankings or citations</li>
            <li>Predict what Google's algorithm will do</li>
            <li>Provide scores or ratings</li>
            <li>Replace human analysis of your specific context</li>
          </ul>
        </div>
        
        <p class="text-sm text-gray-600 mt-4">
          Understanding how AI systems interpret information is what separates working strategies from marketing claims. If you want to discuss how to improve your AI visibility based on these signals, start a conversation.
        </p>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="card" style="max-width: 900px;">
      <h2 class="text-xl mb-4">Next Steps</h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <button data-contact-trigger class="button button-primary text-center">Start a Conversation</button>
        <a href="/resources/diagnostic/" class="button button-secondary text-center">Analyze Another Page</a>
        <a href="/services/ai-search-optimization/" class="button button-secondary text-center">Learn About AI Search Optimization</a>
      </div>
    </div>

  <?php endif; ?>
  
  <?php
  // Clear session data after display
  unset($_SESSION['diagnostic_results']);
  unset($_SESSION['diagnostic_error']);
  ?>
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
