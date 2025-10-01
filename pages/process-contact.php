<?php
session_start();

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

require_once __DIR__.'/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function buildContactBody($name, $email, $notes) {
    $body = "New Contact Request\n\n";
    $body .= 'Name: '.esc($name)."\n";
    $body .= 'Email: '.esc($email)."\n";
    $body .= 'Submitted: '.date('F j, Y \a\t g:i A')."\n\n";
    if (!empty($notes)) {
        $body .= "Message:\n".esc($notes)."\n\n";
    }
    $body .= "---\n";
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

        $fromAddress = NC_EMAIL_FROM ?: NC_EMAIL;
        $mail->setFrom($fromAddress, NC_NAME);
        $mail->addAddress(NC_EMAIL);
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
        'From: '.(NC_EMAIL_FROM ?: NC_EMAIL),
        'Reply-To: '.esc($replyEmail),
        'X-Mailer: PHP/'.phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    return mail(NC_EMAIL, $subject, $body, implode("\r\n", $headers));
}

function sendContactEmail($name, $email, $notes) {
    $subject = 'New Contact Request from '.$name;
    $body = buildContactBody($name, $email, $notes);

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
$notes = trim($_POST['notes'] ?? '');

if (!$name || !$email) {
    header('Location: /contact/?error=missing_fields');
    exit;
}

$emailSent = sendContactEmail($name, $email, $notes);

$_SESSION['contact_success'] = [
    'name' => $name,
    'email' => $email,
    'notes' => $notes,
    'timestamp' => gmdate('c'),
    'email_sent' => $emailSent
];

header('Location: /contact-confirmation/');
exit;
