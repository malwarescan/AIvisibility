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

// TODO: In production, save to database and send confirmation email
// For now, just return success response

$response = [
    'status' => 'received',
    'ticketId' => $ticketId,
    'slaHours' => 24
];

http_response_code(200);
echo json_encode($response, JSON_UNESCAPED_SLASHES);
?>
