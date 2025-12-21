<?php
require_once __DIR__.'/../config.php';

// Email sending function
function sendQuoteEmail($name, $email, $notes) {
    $to = NC_EMAIL;
    $subject = "New Quote Request from " . esc($name);
    
    // Create email template
    $message = "New Quote Request\n\n";
    $message .= "Name: " . esc($name) . "\n";
    $message .= "Email: " . esc($email) . "\n";
    $message .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n\n";
    
    if (!empty($notes)) {
        $message .= "Project Details:\n";
        $message .= esc($notes) . "\n\n";
    }
    
    $message .= "---\n";
    $message .= "This quote request was submitted through the Neural Command website.\n";
    $message .= "Please respond within 24 hours as promised.\n\n";
    $message .= "Website: " . NC_BASEURL . "\n";
    $message .= "Company: " . NC_NAME;
    
    // Email headers
    $headers = [
        'From: ' . NC_EMAIL_FROM,
        'Reply-To: ' . esc($email),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    // Send email
    $success = mail($to, $subject, $message, implode("\r\n", $headers));
    
    return $success;
}

// Handle the quote request and show success page
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the quote request
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $notes = trim($_POST['notes'] ?? '');
    
    if (!$name || !$email) {
        header('Location: /contact/?error=missing_fields');
        exit;
    }
    
    // Send email notification
    $emailSent = sendQuoteEmail($name, $email, $notes);
    
    // Store in session for display
    session_start();
    $_SESSION['quote_success'] = [
        'name' => $name,
        'email' => $email,
        'notes' => $notes,
        'timestamp' => gmdate('c'),
        'email_sent' => $emailSent
    ];
} else {
    // Redirect if not POST
    header('Location: /contact/');
    exit;
}
?>

<main class="container mx-auto px-4 py-10">
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-8">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold mb-4">Quote Request Received!</h1>
      <p class="text-lg text-gray-600 mb-6">
        Thank you for your interest in our services. We'll provide a detailed proposal within 24 hours.
      </p>
      
      <?php if (isset($_SESSION['quote_success']['email_sent']) && $_SESSION['quote_success']['email_sent']): ?>
      <div class="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-800 text-sm">✓ Email notification sent to our team</p>
      </div>
      <?php elseif (isset($_SESSION['quote_success']['email_sent']) && !$_SESSION['quote_success']['email_sent']): ?>
      <div class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-yellow-800 text-sm">⚠ Email notification failed, but your request was recorded</p>
      </div>
      <?php endif; ?>
    </div>
    
    <?php if (isset($_SESSION['quote_success'])): ?>
    <div class="bg-gray-50 p-6 rounded-lg mb-8 text-left">
      <h2 class="text-lg font-semibold mb-4">Request Details</h2>
      <div class="space-y-2 text-sm">
        <p><strong>Name:</strong> <?= esc($_SESSION['quote_success']['name']) ?></p>
        <p><strong>Email:</strong> <?= esc($_SESSION['quote_success']['email']) ?></p>
        <?php if ($_SESSION['quote_success']['notes']): ?>
        <p><strong>Project Details:</strong> <?= esc($_SESSION['quote_success']['notes']) ?></p>
        <?php endif; ?>
        <p><strong>Submitted:</strong> <?= date('F j, Y \a\t g:i A', strtotime($_SESSION['quote_success']['timestamp'])) ?></p>
      </div>
    </div>
    <?php endif; ?>
    
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">What happens next?</h2>
      <ul class="text-left space-y-2 text-gray-600">
        <li class="flex items-center">
          <span class="text-blue-500 mr-3">1</span>
          <span>We'll review your project requirements</span>
        </li>
        <li class="flex items-center">
          <span class="text-blue-500 mr-3">2</span>
          <span>Our team will prepare a customized proposal</span>
        </li>
        <li class="flex items-center">
          <span class="text-blue-500 mr-3">3</span>
          <span>You'll receive detailed pricing and timeline within 24 hours</span>
        </li>
      </ul>
    </div>
    
    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/services/" class="button secondary">View Our Services</a>
      <a href="/contact/" class="button secondary">Contact Us Again</a>
    </div>
  </div>
</main>

<?php
// Clear the session data after display
unset($_SESSION['quote_success']);
?>
