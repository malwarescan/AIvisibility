<?php
/**
 * OpenAI API Integration for AI Visibility Diagnostic
 * Layer 2: LLM interpretation with constrained prompt
 */

class OpenAIDiagnostic {
  
  private $apiKey;
  private $model;
  
  public function __construct(?string $apiKey = null, string $model = 'gpt-4o-mini') {
    $this->apiKey = $apiKey ?? getenv('OPENAI_API_KEY') ?? '';
    $this->model = $model;
  }
  
  /**
   * Generate diagnostic interpretation from deterministic signals
   * 
   * @param array $signals Deterministic analysis results
   * @return array LLM interpretation with narrative explanation
   */
  public function interpret(array $signals): array {
    if (empty($this->apiKey)) {
      return [
        'error' => 'OpenAI API key not configured',
        'fallback' => true
      ];
    }
    
    // Build constrained prompt
    $prompt = $this->buildPrompt($signals);
    
    // Call OpenAI API
    $response = $this->callAPI($prompt);
    
    if (isset($response['error'])) {
      return $response;
    }
    
    // Parse and structure response
    return $this->parseResponse($response, $signals);
  }
  
  /**
   * Build constrained system prompt
   */
  private function buildPrompt(array $signals): string {
    $systemPrompt = <<<'PROMPT'
You are an AI visibility analyst explaining how language models interpret web pages. Your role is to explain patterns and identify ambiguity, not to make guarantees or predictions.

CRITICAL RULES:
- Do NOT make SEO guarantees or ranking predictions
- Do NOT claim to know Google's algorithm
- Do NOT provide generic "best practices" filler
- Do NOT output scores or ratings
- DO explain how LLMs interpret information
- DO identify ambiguity or missing context
- DO describe citation likelihood based on signals
- DO reason about clarity, not prescribe solutions

Your output should be:
- Narrative and explanatory
- Diagnostic and educational
- Non-salesy and grounded
- Bounded by what can be inferred from the signals

Focus on:
1. How AI systems are likely interpreting this page
2. Where ambiguity exists
3. What is clearly understood
4. What is missing or conflicting
5. What cannot be inferred without deeper access
PROMPT;

    $userPrompt = $this->buildUserPrompt($signals);
    
    return json_encode([
      'model' => $this->model,
      'messages' => [
        [
          'role' => 'system',
          'content' => $systemPrompt
        ],
        [
          'role' => 'user',
          'content' => $userPrompt
        ]
      ],
      'temperature' => 0.7,
      'max_tokens' => 1000
    ]);
  }
  
  /**
   * Build user prompt from deterministic signals
   */
  private function buildUserPrompt(array $signals): string {
    $prompt = "Analyze this page's AI visibility signals:\n\n";
    
    $prompt .= "URL: {$signals['url']}\n";
    $prompt .= "Page Type: {$signals['page_type']}\n";
    $prompt .= "Page Role: {$signals['page_role_alignment']}\n\n";
    
    $prompt .= "Indexability:\n";
    $prompt .= "- Robots meta: " . ($signals['indexability']['robots_meta'] ?? 'not set') . "\n";
    $prompt .= "- Noindex: " . ($signals['indexability']['noindex'] ? 'yes' : 'no') . "\n\n";
    
    $prompt .= "Canonical:\n";
    $prompt .= "- Present: " . ($signals['canonical_status']['present'] ? 'yes' : 'no') . "\n";
    if ($signals['canonical_status']['url']) {
      $prompt .= "- URL: {$signals['canonical_status']['url']}\n";
      $prompt .= "- Self-referential: " . ($signals['canonical_status']['self_referential'] ? 'yes' : 'no') . "\n";
    }
    $prompt .= "\n";
    
    $prompt .= "Schema Types: " . implode(', ', $signals['schema_types'] ?: ['none']) . "\n";
    $prompt .= "Entity References: " . implode(', ', $signals['entity_references'] ?: ['none']) . "\n\n";
    
    $prompt .= "Content Structure:\n";
    $prompt .= "- Has H1: " . ($signals['content_structure']['has_h1'] ? 'yes' : 'no') . "\n";
    $prompt .= "- Content Length: {$signals['content_structure']['content_length']} characters\n";
    $prompt .= "- Paragraphs: {$signals['content_structure']['paragraph_count']}\n";
    $prompt .= "- Internal Links: {$signals['internal_link_depth']['internal_links']}\n";
    $prompt .= "- External Links: {$signals['internal_link_depth']['external_links']}\n\n";
    
    $prompt .= "Based on these deterministic signals, explain:\n";
    $prompt .= "1. How language models are likely interpreting this page\n";
    $prompt .= "2. Where ambiguity or missing context exists\n";
    $prompt .= "3. What is clearly understood about this page\n";
    $prompt .= "4. What cannot be inferred without deeper access\n";
    $prompt .= "5. Why this page may or may not be cited or referenced by AI systems\n\n";
    $prompt .= "Be specific, diagnostic, and educational. Avoid guarantees or scores.";
    
    return $prompt;
  }
  
  /**
   * Call OpenAI API
   */
  private function callAPI(string $payload): array {
    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => $payload,
      CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $this->apiKey
      ],
      CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
      return ['error' => 'CURL error: ' . $error];
    }
    
    if ($httpCode !== 200) {
      return ['error' => 'API error: HTTP ' . $httpCode . ' - ' . $response];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['choices'][0]['message']['content'])) {
      return ['error' => 'Invalid API response'];
    }
    
    return $data;
  }
  
  /**
   * Parse API response into structured format
   */
  private function parseResponse(array $apiResponse, array $signals): array {
    $content = $apiResponse['choices'][0]['message']['content'] ?? '';
    
    return [
      'interpretation' => $content,
      'signals' => $signals,
      'model' => $this->model,
      'timestamp' => gmdate('c')
    ];
  }
}

