<?php
require_once __DIR__.'/../config.php';

header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']!=='POST'){ 
  http_response_code(405); 
  echo json_encode(['ok'=>false,'error'=>'POST only']); 
  exit; 
}

$name = trim($_POST['name']??'');
$email = trim($_POST['email']??'');
$notes = trim($_POST['notes']??'');

if(!$name||!$email){ 
  http_response_code(400); 
  echo json_encode(['ok'=>false,'error'=>'name+email required']); 
  exit; 
}

// Send email notification
function sendQuoteEmailAPI($name, $email, $notes) {
    $to = NC_EMAIL;
    $subject = "New Quote Request from " . esc($name);
    
    $message = "New Quote Request (API)\n\n";
    $message .= "Name: " . esc($name) . "\n";
    $message .= "Email: " . esc($email) . "\n";
    $message .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n\n";
    
    if (!empty($notes)) {
        $message .= "Project Details:\n";
        $message .= esc($notes) . "\n\n";
    }
    
    $message .= "---\n";
    $message .= "This quote request was submitted via API.\n";
    $message .= "Website: " . NC_BASEURL . "\n";
    $message .= "Company: " . NC_NAME;
    
    $headers = [
        'From: ' . NC_EMAIL_FROM,
        'Reply-To: ' . esc($email),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

$emailSent = sendQuoteEmailAPI($name, $email, $notes);

// Return success with email status
echo json_encode([
  'ok'=>true,
  'message'=>'Quote request received. We will provide a detailed proposal within 24 hours.',
  'timestamp'=>gmdate('c'),
  'email_sent'=>$emailSent
]);
?>

