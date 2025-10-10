<?php
$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Contact'],
];

$ctx = [
  'title' => 'Contact Us - Neural Command',
  'desc' => 'Ready to transform your website into LLM-ready training signals? Get in touch with our AI visibility experts.',
];
?>
<main class="container py-8">
  <h1>Contact Us</h1>
  <p class="lead">Ready to transform your website into LLM-ready training signals? Get in touch.</p>
  
  <div class="contact-grid">
    <div class="contact-form-section">
      <h2>Get Started</h2>
      <form action="/process-contact/" method="post" class="contact-form">
        <div class="form-group">
          <input type="text" name="name" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <textarea name="notes" placeholder="Tell us about your project" rows="4"></textarea>
        </div>
        <button type="submit" class="button">Request Quote</button>
      </form>
    </div>
    
    <div class="contact-info-section">
      <h2>Contact Information</h2>
      <div class="contact-details">
        <p><strong>Phone:</strong> <?= esc(NC_PHONE) ?> (<?= esc(NC_PHONE_NICE) ?>)</p>
        <p><strong>Address:</strong> <?= esc(NC_ADDR) ?></p>
        <p><strong>LinkedIn:</strong> <a href="<?= esc(NC_LINKEDIN) ?>" target="_blank">Company Page</a></p>
      </div>
    </div>
  </div>
</main>

