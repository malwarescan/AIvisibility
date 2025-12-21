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
$required = ['domain', 'industry'];
foreach ($required as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field", 'code' => 'MISSING_FIELD']);
        exit;
    }
}

// Validate domain format
if (!filter_var($input['domain'], FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid domain format', 'code' => 'INVALID_DOMAIN']);
    exit;
}

// Validate depth if provided
if (isset($input['depth'])) {
    if (!is_int($input['depth']) || $input['depth'] < 1 || $input['depth'] > 3) {
        http_response_code(400);
        echo json_encode(['error' => 'Depth must be an integer between 1 and 3', 'code' => 'INVALID_DEPTH']);
        exit;
    }
} else {
    $input['depth'] = 1; // Default depth
}

// Generate audit ticket ID
$ticketId = 'AU-' . date('Ymd') . '-' . substr(md5($input['domain'] . time()), 0, 8);

// TODO: In production, queue actual audit job
// For now, return immediate response with sample data

$sampleIssues = [
    [
        'id' => 'schema_missing',
        'severity' => 'high',
        'message' => 'Missing JSON-LD schema markup',
        'fix' => 'Implement LocalBusiness and Service schemas'
    ],
    [
        'id' => 'canonical_issues',
        'severity' => 'medium',
        'message' => 'Canonical URL inconsistencies detected',
        'fix' => 'Standardize URLs with trailing slashes and HTTPS'
    ],
    [
        'id' => 'ai_visibility_low',
        'severity' => 'medium',
        'message' => 'Low AI Overview inclusion rate',
        'fix' => 'Optimize content for AI parsing and citation'
    ]
];

$response = [
    'status' => 'ok',
    'score' => 72.5,
    'issues' => $sampleIssues,
    'ticketId' => $ticketId,
    'resultUrl' => 'https://nrlcmd.com/audit-results/' . $ticketId
];

http_response_code(200);
echo json_encode($response, JSON_UNESCAPED_SLASHES);
?>
