<?php
session_start();

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';

function sendContactEmail($name, $email, $notes){
    $to = NC_EMAIL;
    $subject = 'New Contact Request from '.esc($name);
    $message = "New Contact Request\n\n";
    $message .= 'Name: '.esc($name)."\n";
    $message .= 'Email: '.esc($email)."\n";
    $message .= 'Submitted: '.date('F j, Y \a\t g:i A')."\n\n";
    if (!empty($notes)) {
        $message .= "Message:\n".esc($notes)."\n\n";
    }
    $message .= "---\n";
    $message .= 'This contact request was submitted through the Neural Command website.' ."\n";
    $message .= 'Website: '.NC_BASEURL."\n";
    $message .= 'Company: '.NC_NAME;

    $headers = [
        'From: '.NC_EMAIL_FROM,
        'Reply-To: '.esc($email),
        'X-Mailer: PHP/'.phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    return mail($to, $subject, $message, implode("\r\n", $headers));
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
