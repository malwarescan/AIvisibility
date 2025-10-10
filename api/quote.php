<?php
declare(strict_types=1);

require_once __DIR__.'/../config.php';
require_once __DIR__.'/../lib/util.php';
require_once __DIR__.'/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed', 'code' => 'METHOD_NOT_ALLOWED']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON', 'code' => 'INVALID_JSON']);
    exit;
}

// Validate required fields
$required = ['name', 'email', 'service'];
foreach ($required as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field", 'code' => 'MISSING_FIELD']);
        exit;
    }
}

// Validate email format
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format', 'code' => 'INVALID_EMAIL']);
    exit;
}

// Validate service enum
$validServices = ['Agentic SEO', 'Schema Optimization', 'AI Visibility Audit', 'GEO'];
if (!in_array($input['service'], $validServices)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid service. Must be one of: ' . implode(', ', $validServices), 'code' => 'INVALID_SERVICE']);
    exit;
}

// Validate budget range if provided
if (isset($input['budgetRange'])) {
    $validBudgets = ['<5k', '5k-20k', '20k-50k', '>50k'];
    if (!in_array($input['budgetRange'], $validBudgets)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid budget range', 'code' => 'INVALID_BUDGET']);
        exit;
    }
}

// Validate notes length if provided
if (isset($input['notes']) && strlen($input['notes']) > 1000) {
    http_response_code(400);
    echo json_encode(['error' => 'Notes must be 1000 characters or less', 'code' => 'INVALID_NOTES']);
    exit;
}

// Generate ticket ID
$ticketId = 'QT-' . date('Ymd') . '-' . substr(md5($input['email'] . time()), 0, 8);

// Send quote request email
function sendQuoteRequestEmail($name, $email, $service, $budgetRange, $notes, $ticketId) {
    $subject = 'New Quote Request from ' . esc($name) . ' - ' . esc($service);
    
    $body = "New Quote Request\n\n";
    $body .= "Name: " . esc($name) . "\n";
    $body .= "Email: " . esc($email) . "\n";
    $body .= "Service: " . esc($service) . "\n";
    $body .= "Ticket ID: " . $ticketId . "\n";
    $body .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n\n";
    
    if (!empty($budgetRange)) {
        $body .= "Budget Range: " . esc($budgetRange) . "\n";
    }
    
    if (!empty($notes)) {
        $body .= "Project Details:\n" . esc($notes) . "\n\n";
    }
    
    $body .= "---\n";
    $body .= "This quote request was submitted through the Neural Command API.\n";
    $body .= "Please respond within 24 hours as promised.\n\n";
    $body .= "Website: " . NC_BASEURL . "\n";
    $body .= "Company: " . NC_NAME;
    
    // Try SMTP first, fallback to mail()
    if (!empty(NC_SMTP_HOST) && !empty(NC_SMTP_USER) && !empty(NC_SMTP_PASS)) {
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
            $mail->addReplyTo($email, $name);
            
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AltBody = $body;
            
            return $mail->send();
        } catch (Exception $e) {
            error_log('PHPMailer error: ' . $e->getMessage());
        }
    }
    
    // Fallback to mail() function
    $headers = [
        'From: ' . (NC_EMAIL_FROM ?: NC_EMAIL),
        'Reply-To: ' . esc($email),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    return mail(NC_EMAIL, $subject, $body, implode("\r\n", $headers));
}

$emailSent = sendQuoteRequestEmail(
    $input['name'],
    $input['email'],
    $input['service'],
    $input['budgetRange'] ?? null,
    $input['notes'] ?? null,
    $ticketId
);

$response = [
    'status' => 'received',
    'ticketId' => $ticketId,
    'slaHours' => 24,
    'emailSent' => $emailSent
];

http_response_code(200);
echo json_encode($response, JSON_UNESCAPED_SLASHES);
?>
