<?php
// Process AI Visibility Audit Form - SIMPLE VERSION (NO APIs)
session_start();
require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /resources/diagnostic/');
    exit;
}

$domain = trim($_POST['domain'] ?? '');
$email = trim($_POST['email'] ?? '');
$industry = trim($_POST['industry'] ?? '');

// Validate input
if (!$domain || !$email || !$industry) {
    header('Location: /resources/diagnostic/?error=missing_fields');
    exit;
}

// Simple email function using PHP mail() - NO API KEYS NEEDED
function sendAuditRequest($domain, $email, $industry) {
    $to = NC_EMAIL; // hirejoelm@gmail.com
    $subject = '[AUDIT] AI Visibility Audit Request - ' . $domain;
    
    $body = "New AI Visibility Audit Request\n\n";
    $body .= "Domain: " . esc($domain) . "\n";
    $body .= "Email: " . esc($email) . "\n";
    $body .= "Industry: " . esc($industry) . "\n";
    $body .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n\n";
    $body .= "---\n";
    $body .= "This audit request was submitted through the Neural Command website.\n";
    $body .= "Website: " . NC_BASEURL . "\n";
    $body .= "Company: " . NC_NAME;
    
    $headers = [
        'From: ' . (NC_EMAIL_FROM ?: NC_EMAIL),
        'Reply-To: ' . esc($email),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    return mail($to, $subject, $body, implode("\r\n", $headers));
}

// Send email (simple PHP mail() - works without any API keys)
$emailSent = sendAuditRequest($domain, $email, $industry);

// Store in session for confirmation page
$_SESSION['audit_request'] = [
    'domain' => $domain,
    'email' => $email,
    'industry' => $industry,
    'email_sent' => $emailSent,
    'timestamp' => gmdate('c')
];

// Redirect to simple confirmation
header('Location: /audit-results/');
exit;
?>
