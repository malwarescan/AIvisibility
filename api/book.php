<?php
header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']!=='POST') { 
  http_response_code(405); 
  echo json_encode(['ok'=>false,'error'=>'POST only']); 
  exit; 
}

$name = trim($_POST['name']??'');
$email= trim($_POST['email']??'');

if(!$name||!$email){ 
  http_response_code(400); 
  echo json_encode(['ok'=>false,'error'=>'name+email required']); 
  exit; 
}

// TODO: push to CRM / email system
// For now, just return success
echo json_encode([
  'ok'=>true,
  'message'=>'Consultation booked. We will reach out shortly.',
  'timestamp'=>gmdate('c')
]);
?>

