<?php
session_start();

$breadcrumbs = [
  ['label' => 'Home', 'url' => canonical('/')],
  ['label' => 'Contact', 'url' => canonical('/contact/')],
  ['label' => 'Confirmation']
];

$ctx = [
  'title' => 'Message Received - Neural Command',
  'desc' => 'Thank you for contacting Neural Command. Our team will reach out within 24 hours to continue the conversation about AI visibility.',
];

$successData = $_SESSION['contact_success'] ?? null;
?>

<main class="container py-8">
  <div class="contact-confirmation">
    <div class="confirmation-header">
      <div class="success-icon">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1>Thanks for Reaching Out!</h1>
      <p class="lead">
        We received your message and will respond within 24 hours. Keep an eye on your inbox for next steps from the Neural Command team.
      </p>

      <div class="success-message">
        <p>Thanks! Our team has your request and will follow up shortly.</p>
      </div>
    </div>

    <?php if ($successData): ?>
    <div class="message-summary">
      <h2>Message Summary</h2>
      <div class="summary-details">
        <p><strong>Name:</strong> <?= esc($successData['name']) ?></p>
        <p><strong>Email:</strong> <?= esc($successData['email']) ?></p>
        <?php if (!empty($successData['notes'])): ?>
        <p><strong>Message:</strong> <?= esc($successData['notes']) ?></p>
        <?php endif; ?>
        <p><strong>Submitted:</strong> <?= date('F j, Y \a\t g:i A', strtotime($successData['timestamp'])) ?></p>
      </div>
    </div>
    <?php endif; ?>

    <div class="next-steps">
      <h2>Meanwhile, you can…</h2>
      <ul class="steps-list">
        <li>
          <span class="step-number">1</span>
          <span>Review our <a href="/services/">AI SEO services</a>.</span>
        </li>
        <li>
          <span class="step-number">2</span>
          <span>Run another <a href="/resources/diagnostic/">AI visibility diagnostic</a>.</span>
        </li>
        <li>
          <span class="step-number">3</span>
          <span>Read our latest <a href="/resources/">resources & case studies</a>.</span>
        </li>
      </ul>
    </div>

    <div class="confirmation-actions">
      <a href="/services/" class="button button--secondary">Explore Services</a>
      <a href="/contact/" class="button button--secondary">Send Another Message</a>
    </div>
  </div>
</main>

<?php unset($_SESSION['contact_success']); ?>
