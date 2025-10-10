<?php
declare(strict_types=1);

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

// TODO: In production, save to database and send confirmation email
// For now, just return success response

$response = [
    'status' => 'confirmed',
    'bookingId' => $bookingId,
    'ical' => 'https://nrlcmd.com/api/calendar/' . $bookingId . '.ics'
];

http_response_code(200);
echo json_encode($response, JSON_UNESCAPED_SLASHES);
?>
