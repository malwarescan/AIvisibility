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
$required = ['name', 'email'];
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

// Validate name length
if (strlen($input['name']) < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Name must be at least 1 character', 'code' => 'INVALID_NAME']);
    exit;
}

// Validate notes length if provided
if (isset($input['notes']) && strlen($input['notes']) > 500) {
    http_response_code(400);
    echo json_encode(['error' => 'Notes must be 500 characters or less', 'code' => 'INVALID_NOTES']);
    exit;
}

// Validate preferred_time format if provided
if (isset($input['preferred_time'])) {
    $date = DateTime::createFromFormat('c', $input['preferred_time']);
    if (!$date || $date->format('c') !== $input['preferred_time']) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid date format. Use ISO 8601 format', 'code' => 'INVALID_DATE']);
        exit;
    }
}

// Generate booking ID
$bookingId = 'BK-' . date('Ymd') . '-' . substr(md5($input['email'] . time()), 0, 8);

// Send booking confirmation email
function sendBookingEmail($name, $email, $preferredTime, $notes, $bookingId) {
    $subject = 'New Consultation Booking Request from ' . esc($name);
    
    $body = "New Consultation Booking Request\n\n";
    $body .= "Name: " . esc($name) . "\n";
    $body .= "Email: " . esc($email) . "\n";
    $body .= "Booking ID: " . $bookingId . "\n";
    $body .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n\n";
    
    if (!empty($preferredTime)) {
        $body .= "Preferred Time: " . esc($preferredTime) . "\n";
    }
    
    if (!empty($notes)) {
        $body .= "Notes:\n" . esc($notes) . "\n\n";
    }
    
    $body .= "---\n";
    $body .= "This booking request was submitted through the Neural Command API.\n";
    $body .= "Please respond within 24 hours to confirm the consultation.\n\n";
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

$emailSent = sendBookingEmail(
    $input['name'],
    $input['email'],
    $input['preferred_time'] ?? null,
    $input['notes'] ?? null,
    $bookingId
);

$response = [
    'status' => 'confirmed',
    'bookingId' => $bookingId,
    'ical' => 'https://nrlcmd.com/api/calendar/' . $bookingId . '.ics',
    'emailSent' => $emailSent
];

http_response_code(200);
echo json_encode($response, JSON_UNESCAPED_SLASHES);
?>
