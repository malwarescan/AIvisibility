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

<main class="container mx-auto px-4 py-10">
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-8">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold mb-4">Thanks for Reaching Out!</h1>
      <p class="text-lg text-gray-600 mb-6">
        We received your message and will respond within 24 hours. Keep an eye on your inbox for next steps from the Neural Command team.
      </p>

      <?php if ($successData && $successData['email_sent']): ?>
      <div class="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-800 text-sm">✓ Email notification sent to our team.</p>
      </div>
      <?php elseif ($successData && !$successData['email_sent']): ?>
      <div class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-yellow-800 text-sm">⚠ Email notification failed, but your request was recorded.</p>
      </div>
      <?php endif; ?>
    </div>

    <?php if ($successData): ?>
    <div class="bg-gray-50 p-6 rounded-lg mb-8 text-left">
      <h2 class="text-lg font-semibold mb-4">Message Summary</h2>
      <div class="space-y-2 text-sm">
        <p><strong>Name:</strong> <?= esc($successData['name']) ?></p>
        <p><strong>Email:</strong> <?= esc($successData['email']) ?></p>
        <?php if (!empty($successData['notes'])): ?>
        <p><strong>Message:</strong> <?= esc($successData['notes']) ?></p>
        <?php endif; ?>
        <p><strong>Submitted:</strong> <?= date('F j, Y \a\t g:i A', strtotime($successData['timestamp'])) ?></p>
      </div>
    </div>
    <?php endif; ?>

    <div class="space-y-6">
      <h2 class="text-xl font-semibold">Meanwhile, you can…</h2>
      <ul class="text-left space-y-3 text-gray-600">
        <li class="flex items-start gap-3">
          <span class="text-blue-500 font-semibold">1</span>
          <span>Review our <a class="underline" href="/services/">AI SEO services</a>.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-blue-500 font-semibold">2</span>
          <span>Run another <a class="underline" href="/resources/diagnostic/">AI visibility diagnostic</a>.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-blue-500 font-semibold">3</span>
          <span>Read our latest <a class="underline" href="/resources/">resources & case studies</a>.</span>
        </li>
      </ul>
    </div>

    <div class="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
      <a href="/services/" class="button secondary button--static">Explore Services</a>
      <a href="/contact/" class="button secondary button--static">Send Another Message</a>
    </div>
  </div>
</main>

<?php unset($_SESSION['contact_success']); ?>
