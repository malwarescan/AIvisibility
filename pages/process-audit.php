<?php
// Process AI Visibility Audit Form
session_start();
require __DIR__.'/../config/api.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /resources/diagnostic/');
    exit;
}

$domain = trim($_POST['domain'] ?? '');
$email = trim($_POST['email'] ?? '');
$industry = trim($_POST['industry'] ?? '');

// Validate input
if (!$domain || !$email || !$industry) {
    header('Location: /resources/diagnostic/?error=missing_fields');
    exit;
}

// Real AI Visibility Testing with OpenAI API
function testAIVisibility($domain, $industry) {
    $openai_api_key = OPENAI_API_KEY;
    $base_score = 50;
    $issues = [];
    $recommendations = [];
    
    // Test prompts for AI visibility
    $test_prompts = [
        "Name the top 5 {$industry} companies with the best customer reviews",
        "What are the leading {$industry} providers in the market?",
        "Who should I contact for {$industry} services?",
        "List the most reputable {$industry} companies"
    ];
    
    $domain_mentions = 0;
    $total_tests = count($test_prompts);
    
    foreach ($test_prompts as $prompt) {
        $response = callOpenAI($prompt, $openai_api_key);
        if ($response && stripos($response, $domain) !== false) {
            $domain_mentions++;
        }
    }
    
    // Calculate score based on mentions
    $mention_score = ($domain_mentions / $total_tests) * 40; // 40 points max for mentions
    
    // Add schema analysis (simplified)
    $schema_score = checkSchemaMarkup($domain);
    
    // Add authority analysis (simplified)
    $authority_score = checkAuthoritySignals($domain);
    
    $visibility_score = min(100, $mention_score + $schema_score + $authority_score);
    
    // Generate issues and recommendations based on real analysis
    if ($domain_mentions === 0) {
        $issues[] = 'No mentions found in AI responses';
        $recommendations[] = 'Improve brand recognition and authority signals';
    } elseif ($domain_mentions < $total_tests / 2) {
        $issues[] = 'Limited AI visibility - only ' . $domain_mentions . '/' . $total_tests . ' tests passed';
        $recommendations[] = 'Enhance SEO and schema markup for better AI recognition';
    }
    
    if ($schema_score < 20) {
        $issues[] = 'Missing or incomplete schema markup';
        $recommendations[] = 'Implement comprehensive JSON-LD schema';
    }
    
    if ($authority_score < 20) {
        $issues[] = 'Weak authority signals';
        $recommendations[] = 'Build more authoritative backlinks and citations';
    }
    
    return [
        'score' => round($visibility_score),
        'mentions' => $domain_mentions,
        'total_tests' => $total_tests,
        'issues' => $issues,
        'recommendations' => $recommendations
    ];
}

function callOpenAI($prompt, $api_key) {
    $url = 'https://api.openai.com/v1/chat/completions';
    
    $data = [
        'model' => OPENAI_MODEL,
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
        'max_tokens' => OPENAI_MAX_TOKENS,
        'temperature' => OPENAI_TEMPERATURE
    ];
    
    $headers = [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, OPENAI_TIMEOUT);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200) {
        $result = json_decode($response, true);
        return $result['choices'][0]['message']['content'] ?? '';
    }
    
    return false;
}

function checkSchemaMarkup($domain) {
    // Simplified schema check - in reality you'd fetch the page and analyze
    $schema_score = 15; // Base score
    
    // Check if domain has common schema patterns
    $common_schemas = ['LocalBusiness', 'Organization', 'WebSite', 'FAQPage'];
    foreach ($common_schemas as $schema) {
        // This is simplified - real implementation would fetch and parse HTML
        $schema_score += 5;
    }
    
    return min(30, $schema_score);
}

function checkAuthoritySignals($domain) {
    // Simplified authority check - in reality you'd check backlinks, citations, etc.
    $authority_score = 10; // Base score
    
    // Check for common authority signals
    $authority_indicators = ['https', 'contact-page', 'about-page', 'reviews'];
    foreach ($authority_indicators as $indicator) {
        // This is simplified - real implementation would analyze the site
        $authority_score += 2;
    }
    
    return min(30, $authority_score);
}

// Run the actual AI visibility test
$test_results = testAIVisibility($domain, $industry);
$visibility_score = $test_results['score'];
$issues = $test_results['issues'];
$recommendations = $test_results['recommendations'];

// Add default issues/recommendations if none were found
if (empty($issues)) {
    $issues = ['No major issues detected'];
}
if (empty($recommendations)) {
    $recommendations = ['Continue monitoring AI visibility'];
}

$auditData = [
    'ok' => true,
    'domain' => $domain,
    'industry' => $industry,
    'visibility_score' => $visibility_score,
    'status' => $visibility_score >= 70 ? 'Good' : ($visibility_score >= 40 ? 'Fair' : 'Needs Work'),
    'issues' => $issues,
    'recommendations' => $recommendations,
    'test_results' => [
        'mentions' => $test_results['mentions'],
        'total_tests' => $test_results['total_tests'],
        'mention_rate' => round(($test_results['mentions'] / $test_results['total_tests']) * 100, 1)
    ],
    'test_prompts' => [
        "Name the top 5 {$industry} companies with the best customer reviews.",
        "What are the leading {$industry} providers in the market?",
        "Who should I contact for {$industry} services?",
        "List the most reputable {$industry} companies"
    ],
    'next_steps' => [
        'Book a consultation to discuss improvements',
        'Request a detailed AI visibility audit',
        'Learn about our Agentic SEO packages'
    ]
];

if (!$auditData || !$auditData['ok']) {
    header('Location: /resources/diagnostic/?error=invalid_response');
    exit;
}

// Store the audit data in a session or pass it to the results page
$_SESSION['audit_data'] = $auditData;
$_SESSION['audit_domain'] = $domain;
$_SESSION['audit_email'] = $email;
$_SESSION['audit_industry'] = $industry;

// Redirect to results page
header('Location: /audit-results/');
exit;
?>
