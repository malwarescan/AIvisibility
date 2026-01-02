<?php
// AI Visibility Diagnostic Page
$ctx['title'] = 'AI Visibility Diagnostic — How AI Systems Interpret Your Page | Neural Command';
$ctx['desc'] = 'Understand how language models interpret your content. Get a diagnostic analysis of your page\'s AI visibility signals, not a score or guarantee.';
?>
<main class="container py-8">
  <h1 class="text-3xl mb-4">How AI systems interpret your page</h1>
  
  <div class="card mb-6 max-w-lg">
    <p class="text-gray-700 mb-4">
      This diagnostic combines deterministic signals (schema, structure, indexability) with AI interpretation to explain how language models are likely understanding your content.
    </p>
    <p class="text-gray-600 text-sm mb-4">
      <strong>What this is:</strong> An educational analysis that explains patterns and identifies ambiguity.<br>
      <strong>What this is not:</strong> A ranking predictor, SEO guarantee, or black-box score.
    </p>
  </div>

  <div class="card mb-8 max-w-lg">
    <h2 class="text-xl mb-4">Run Diagnostic</h2>
    <form method="POST" action="/process-audit/" class="space-y-4">
      <div>
        <label for="url" class="block text-sm font-medium mb-2">Page URL</label>
        <input 
          type="url" 
          id="url" 
          name="url" 
          required 
          placeholder="https://example.com/page"
          class="w-full px-4 py-2 border border-gray-300 rounded"
          value="<?= esc($_GET['url'] ?? '') ?>"
        />
        <p class="text-xs text-gray-500 mt-1">Enter the full URL of the page you want to analyze</p>
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium mb-2">Your Email (optional)</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="you@example.com"
          class="w-full px-4 py-2 border border-gray-300 rounded"
          value="<?= esc($_GET['email'] ?? '') ?>"
        />
        <p class="text-xs text-gray-500 mt-1">We'll send the results to this address</p>
      </div>
      
      <button type="submit" class="button button-primary btn-primary-full">
        Analyze Page
      </button>
    </form>
  </div>

  <div class="card mb-8 max-w-lg">
    <h2 class="text-xl mb-4">What We Analyze</h2>
    <div class="space-y-4">
      <div>
        <h3 class="font-semibold mb-2">Deterministic Signals (Layer 1)</h3>
        <ul class="list-disc text-sm text-gray-700 space-y-1 ml-5">
          <li>URL structure and page type</li>
          <li>Indexability (robots, canonical)</li>
          <li>Schema types present</li>
          <li>Content structure (headings, length)</li>
          <li>Internal link depth</li>
          <li>Entity references</li>
          <li>Page role alignment</li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold mb-2">AI Interpretation (Layer 2)</h3>
        <ul class="list-disc text-sm text-gray-700 space-y-1 ml-5">
          <li>How language models likely interpret the page</li>
          <li>Where ambiguity or missing context exists</li>
          <li>What is clearly understood</li>
          <li>What cannot be inferred without deeper access</li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold mb-2">Human Framing (Layer 3)</h3>
        <p class="text-sm text-gray-700">
          Results are presented with context about what the diagnostic can and cannot tell you, aligned with our positioning around LLM visibility.
        </p>
      </div>
    </div>
  </div>

  <div class="card max-w-lg">
    <h2 class="text-xl mb-4">What This Diagnostic Cannot Tell You</h2>
    <ul class="list-disc text-sm text-gray-700 space-y-2 ml-5">
      <li>Whether you will rank in Google search results</li>
      <li>Guaranteed citations in ChatGPT or Perplexity</li>
      <li>Exact visibility scores or ratings</li>
      <li>What Google's algorithm will do</li>
      <li>Generic "best practices" without context</li>
    </ul>
    <p class="text-sm text-gray-600 mt-4">
      This tool explains how AI systems interpret information, not what they will do with it. That distinction is what separates working strategies from marketing claims.
    </p>
  </div>
</main>
