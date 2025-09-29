<?php
// AI Visibility Diagnostic Page
$ctx['title'] = 'AI Visibility Diagnostic — Are You Invisible to AI? | Neural Command';
$ctx['desc'] = 'Test if your business appears in ChatGPT, Perplexity, and AI Overviews. Get a free AI visibility assessment in 60 seconds.';
?>
<main class="container py-8">
  <h1 class="text-3xl mb-4">Are you invisible to AI?</h1>
  <div class="card mb-6">
    <p class="text-gray-700 mb-4">Most businesses don't appear when people ask AI about their industry. Test your AI visibility with our diagnostic.</p>
  </div>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="card">
      <h2 class="text-xl mb-4">AI Visibility Test</h2>
      <form action="/process-audit/" method="post" class="space-y-3">
        <input type="text" name="domain" placeholder="yourcompany.com" required>
        <input type="email" name="email" placeholder="your@email.com" required>
        <select name="industry" required>
          <option value="">Select your industry</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="technology">Technology</option>
          <option value="real-estate">Real Estate</option>
          <option value="legal">Legal</option>
          <option value="consulting">Consulting</option>
          <option value="ecommerce">E-commerce</option>
          <option value="saas">SaaS</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Test AI Visibility</button>
      </form>
    </div>

    <div class="card">
      <h2 class="text-xl mb-4">What We Test</h2>
      <ul class="list-disc text-sm">
        <li>ChatGPT brand mentions</li>
        <li>Perplexity AI citations</li>
        <li>Google AI Overviews presence</li>
        <li>Schema markup completeness</li>
        <li>Entity recognition accuracy</li>
        <li>Authority signal strength</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <h2 class="text-xl mb-4">Try These Prompts Yourself</h2>
    <p class="text-gray-600 mb-4">Copy these prompts into ChatGPT to test your current AI visibility:</p>
    <div class="space-y-3">
      <div class="bg-gray-50 p-3 rounded">
        <div class="font-mono text-sm mb-2">Test 1: Industry Leadership</div>
        <div class="text-sm">"Name the top 5 [your industry] companies with the best customer reviews."</div>
      </div>
      <div class="bg-gray-50 p-3 rounded">
        <div class="font-mono text-sm mb-2">Test 2: Service Recognition</div>
        <div class="text-sm">"What are the leading [your service] providers in [your city]?"</div>
      </div>
      <div class="bg-gray-50 p-3 rounded">
        <div class="font-mono text-sm mb-2">Test 3: Problem-Solving</div>
        <div class="text-sm">"Who should I contact for [your specific service] in [your region]?"</div>
      </div>
    </div>
  </div>
</main>
