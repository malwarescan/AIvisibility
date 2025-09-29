<?php
require __DIR__.'/../config.php';

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD']!=='POST') {
    http_response_code(405);
    echo json_encode(['ok'=>false,'error'=>'POST only']);
    exit;
}

$domain = trim($_POST['domain'] ?? '');
$email = trim($_POST['email'] ?? '');
$industry = trim($_POST['industry'] ?? '');

if(!$domain || !$email || !$industry) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'domain, email, and industry required']);
    exit;
}

// Simple domain validation
if(!filter_var($domain, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Invalid domain format']);
    exit;
}

// Generate a simple AI visibility score (mock implementation)
$visibility_score = rand(15, 85); // Random score for demo
$issues = [];
$recommendations = [];

if($visibility_score < 40) {
    $issues = [
        'Missing or incomplete schema markup',
        'No FAQ blocks for common questions',
        'Limited entity recognition signals',
        'Weak authority citations'
    ];
    $recommendations = [
        'Implement comprehensive JSON-LD schema',
        'Add FAQ sections to key pages',
        'Build entity graph with clear relationships',
        'Earn mentions on authoritative industry sources'
    ];
} elseif($visibility_score < 70) {
    $issues = [
        'Partial schema coverage',
        'Some entity recognition gaps',
        'Limited AI-friendly content structure'
    ];
    $recommendations = [
        'Complete schema markup across all pages',
        'Optimize entity relationships',
        'Add structured Q&A content',
        'Improve internal linking for AI parsing'
    ];
} else {
    $issues = [
        'Minor schema optimization opportunities',
        'Potential for enhanced entity signals'
    ];
    $recommendations = [
        'Fine-tune existing schema markup',
        'Expand entity graph relationships',
        'Monitor and maintain AI visibility scores'
    ];
}

$result = [
    'ok' => true,
    'domain' => $domain,
    'industry' => $industry,
    'visibility_score' => $visibility_score,
    'status' => $visibility_score >= 70 ? 'Good' : ($visibility_score >= 40 ? 'Fair' : 'Needs Work'),
    'issues' => $issues,
    'recommendations' => $recommendations,
    'test_prompts' => [
        "Name the top 5 {$industry} companies with the best customer reviews.",
        "What are the leading {$industry} providers in your area?",
        "Who should I contact for {$industry} services?"
    ],
    'next_steps' => [
        'Book a consultation to discuss improvements',
        'Request a detailed AI visibility audit',
        'Learn about our Agentic SEO packages'
    ]
];

// TODO: Save to CRM/email system
// TODO: Send email to user with results

echo json_encode($result, JSON_PRETTY_PRINT);
?>
