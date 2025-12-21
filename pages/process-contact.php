<?php
session_start();

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

require_once __DIR__.'/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function buildContactBody($name, $email, $notes, $context = '', $intent = '', $leadScore = 0, $pathDepth = 1, $schemaTypes = [], $pageUrl = '', $referrer = '') {
    $body = "New Contact Request\n\n";
    $body .= 'Name: '.esc($name)."\n";
    $body .= 'Email: '.esc($email)."\n";
    $body .= 'Submitted: '.date('F j, Y \a\t g:i A')."\n\n";
    
    if (!empty($notes)) {
        $body .= "Message:\n".esc($notes)."\n\n";
    }
    
    // Enhanced fields for routing/scoring
    if (!empty($intent)) {
        $body .= "Intent: ".esc($intent)."\n";
    }
    if (!empty($context)) {
        $body .= "Context: ".esc($context)."\n";
    }
    if ($leadScore > 0) {
        $body .= "Lead Score: ".esc($leadScore)."\n";
    }
    if ($pathDepth > 0) {
        $body .= "Path Depth: ".esc($pathDepth)."\n";
    }
    if (!empty($schemaTypes)) {
        $body .= "Schema Types: ".esc(implode(', ', $schemaTypes))."\n";
    }
    if (!empty($pageUrl)) {
        $body .= "Page URL: ".esc($pageUrl)."\n";
    }
    if (!empty($referrer)) {
        $body .= "Referrer: ".esc($referrer)."\n";
    }
    
    $body .= "\n---\n";
    $body .= 'This contact request was submitted through the Neural Command website.' ."\n";
    $body .= 'Website: '.NC_BASEURL."\n";
    $body .= 'Company: '.NC_NAME;
    return $body;
}

function sendViaSMTP($subject, $body, $replyName, $replyEmail) {
    if (empty(NC_SMTP_HOST) || empty(NC_SMTP_USER) || empty(NC_SMTP_PASS)) {
        return false;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = NC_SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = NC_SMTP_USER;
        $mail->Password = NC_SMTP_PASS;
        $mail->Port = (int)NC_SMTP_PORT;

        if (NC_SMTP_SECURE === 'none') {
            $mail->SMTPSecure = false;
            $mail->SMTPAutoTLS = false;
        } else {
            $mail->SMTPSecure = NC_SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        }

        $fromAddress = NC_EMAIL_FROM ?: NC_CONTACT_EMAIL;
        $mail->setFrom($fromAddress, NC_NAME);
        $mail->addAddress(NC_CONTACT_EMAIL);
        if (!empty($replyEmail)) {
            $mail->addReplyTo($replyEmail, $replyName);
        }

        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = $body;

        return $mail->send();
    } catch (Exception $e) {
        error_log('PHPMailer error: '.$e->getMessage());
        return false;
    }
}

function sendViaMailFunction($subject, $body, $replyEmail) {
    $headers = [
        'From: '.(NC_EMAIL_FROM ?: NC_CONTACT_EMAIL),
        'Reply-To: '.esc($replyEmail),
        'X-Mailer: PHP/'.phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    return mail(NC_CONTACT_EMAIL, $subject, $body, implode("\r\n", $headers));
}

function sendContactEmail($name, $email, $notes, $context = '', $intent = '', $leadScore = 0, $pathDepth = 1, $schemaTypes = [], $pageUrl = '', $referrer = '') {
    $subjectPrefix = !empty($intent) ? '['.strtoupper($intent).']' : '';
    $contextPrefix = !empty($context) ? ' ['.$context.']' : '';
    $scorePrefix = $leadScore > 0 ? ' Score '.$leadScore.' —' : '';
    $subject = trim($subjectPrefix.$contextPrefix.$scorePrefix.' New Contact Request from '.$name);
    
    $body = buildContactBody($name, $email, $notes, $context, $intent, $leadScore, $pathDepth, $schemaTypes, $pageUrl, $referrer);

    if (sendViaSMTP($subject, $body, $name, $email)) {
        return true;
    }

    return sendViaMailFunction($subject, $body, $email);
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact/');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? trim($_POST['notes'] ?? ''));

if (!$name || !$email) {
    header('Location: /contact/?error=missing_fields');
    exit;
}

// Enhanced fields for routing/scoring
$context = trim($_POST['context'] ?? '');
$intent = trim($_POST['intent'] ?? 'sales');
$schemaTypesStr = trim($_POST['schema_types'] ?? '');
$pathDepth = (int)($_POST['path_depth'] ?? 1);
$leadScore = (int)($_POST['lead_score'] ?? 0);
$pagePath = trim($_POST['page_path'] ?? '');
$pageUrl = trim($_POST['page_url'] ?? '');
$referrer = trim($_POST['referrer'] ?? '');

$schemaTypes = !empty($schemaTypesStr) ? array_filter(array_map('trim', explode(',', $schemaTypesStr))) : [];

// Send email with enhanced context
$emailSent = sendContactEmail(
    $name, 
    $email, 
    $message, 
    $context, 
    $intent, 
    $leadScore, 
    $pathDepth, 
    $schemaTypes, 
    $pageUrl, 
    $referrer
);

$_SESSION['contact_success'] = [
    'name' => $name,
    'email' => $email,
    'notes' => $message,
    'timestamp' => gmdate('c'),
    'email_sent' => $emailSent,
    'intent' => $intent,
    'lead_score' => $leadScore,
];

header('Location: /contact-confirmation/');
exit;
