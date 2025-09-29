<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Contact'],
];
?>
<main class="container mx-auto px-4 py-10">
  <h1 class="text-2xl font-bold">Contact Us</h1>
  <p class="mt-4 max-w-2xl">Ready to transform your website into LLM-ready training signals? Get in touch.</p>
  
  <div class="mt-8 grid md:grid-cols-2 gap-8">
    <div>
      <h2 class="text-lg font-semibold mb-4">Get Started</h2>
      <form action="/process-contact/" method="post" class="space-y-4">
        <input type="text" name="name" placeholder="Your name" required class="w-full p-3 border rounded">
        <input type="email" name="email" placeholder="Email" required class="w-full p-3 border rounded">
        <textarea name="notes" placeholder="Tell us about your project" class="w-full p-3 border rounded h-32"></textarea>
        <button type="submit" class="px-6 py-3 bg-black text-white border border-black">Request Quote</button>
      </form>
    </div>
    
    <div>
      <h2 class="text-lg font-semibold mb-4">Contact Information</h2>
      <div class="space-y-2 text-sm">
        <p><strong>Phone:</strong> <?= esc(NC_PHONE) ?> (<?= esc(NC_PHONE_NICE) ?>)</p>
        <p><strong>Address:</strong> <?= esc(NC_ADDR) ?></p>
        <p><strong>LinkedIn:</strong> <a href="<?= esc(NC_LINKEDIN) ?>" target="_blank">Company Page</a></p>
      </div>
    </div>
  </div>
</main>

