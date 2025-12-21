<?php
/**
 * Deterministic AI Visibility Diagnostic Analyzer
 * Layer 1: Collects real data, not model opinion
 */

class DiagnosticAnalyzer {
  
  /**
   * Analyze a URL and return deterministic signals
   * 
   * @param string $url The URL to analyze
   * @return array Structured data for LLM interpretation
   */
  public static function analyze(string $url): array {
    // Normalize URL
    $url = self::normalizeUrl($url);
    
    // Fetch page content
    $content = self::fetchPage($url);
    if (!$content) {
      return [
        'error' => 'Could not fetch page content',
        'url' => $url
      ];
    }
    
    // Extract deterministic signals
    $signals = [
      'url' => $url,
      'page_type' => self::detectPageType($url, $content),
      'indexability' => self::checkIndexability($content),
      'canonical_status' => self::checkCanonical($content, $url),
      'schema_types' => self::extractSchemaTypes($content),
      'content_structure' => self::analyzeContentStructure($content),
      'entity_references' => self::extractEntityReferences($content),
      'internal_link_depth' => self::estimateLinkDepth($content),
      'page_role_alignment' => self::checkPageRole($url, $content),
      'timestamp' => gmdate('c')
    ];
    
    return $signals;
  }
  
  /**
   * Normalize URL (add protocol if missing, remove fragments)
   */
  private static function normalizeUrl(string $url): string {
    // Remove fragments
    $url = preg_replace('/#.*$/', '', $url);
    
    // Add protocol if missing
    if (!preg_match('/^https?:\/\//', $url)) {
      $url = 'https://' . ltrim($url, '/');
    }
    
    return rtrim($url, '/');
  }
  
  /**
   * Fetch page content with error handling
   */
  private static function fetchPage(string $url): ?string {
    $context = stream_context_create([
      'http' => [
        'method' => 'GET',
        'header' => [
          'User-Agent: Neural Command Diagnostic Bot',
          'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        ],
        'timeout' => 10,
        'follow_location' => true,
        'max_redirects' => 3
      ]
    ]);
    
    $content = @file_get_contents($url, false, $context);
    
    if ($content === false) {
      return null;
    }
    
    return $content;
  }
  
  /**
   * Detect page type from URL and content
   */
  private static function detectPageType(string $url, string $content): string {
    $path = parse_url($url, PHP_URL_PATH) ?? '';
    
    // URL-based detection
    if (preg_match('#/services/#', $path)) return 'service';
    if (preg_match('#/insights/#', $path) || preg_match('#/blog/#', $path)) return 'article';
    if (preg_match('#/contact#', $path)) return 'contact';
    if (preg_match('#/about#', $path)) return 'about';
    if ($path === '/' || $path === '') return 'homepage';
    
    // Content-based detection (fallback)
    if (preg_match('/<article/i', $content)) return 'article';
    if (preg_match('/itemtype=["\']https:\/\/schema\.org\/(Service|Product)/i', $content)) return 'service';
    
    return 'unknown';
  }
  
  /**
   * Check indexability signals
   */
  private static function checkIndexability(string $content): array {
    $signals = [
      'robots_meta' => null,
      'x_robots_tag' => null,
      'noindex' => false,
      'nofollow' => false
    ];
    
    // Check meta robots
    if (preg_match('/<meta\s+name=["\']robots["\']\s+content=["\']([^"\']+)["\']/i', $content, $m)) {
      $signals['robots_meta'] = strtolower($m[1]);
      $signals['noindex'] = strpos($signals['robots_meta'], 'noindex') !== false;
      $signals['nofollow'] = strpos($signals['robots_meta'], 'nofollow') !== false;
    }
    
    // Check X-Robots-Tag header (would need headers, but we can check for common patterns)
    
    return $signals;
  }
  
  /**
   * Check canonical status
   */
  private static function checkCanonical(string $content, string $url): array {
    $canonical = [
      'present' => false,
      'url' => null,
      'self_referential' => false,
      'normalized' => false
    ];
    
    // Extract canonical URL
    if (preg_match('/<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']/i', $content, $m)) {
      $canonical['present'] = true;
      $canonical['url'] = $m[1];
      
      // Normalize for comparison
      $canonicalUrl = rtrim($m[1], '/');
      $currentUrl = rtrim(parse_url($url, PHP_URL_PATH) ?? '', '/');
      
      $canonical['self_referential'] = (
        $canonicalUrl === $url ||
        $canonicalUrl === parse_url($url, PHP_URL_SCHEME) . '://' . parse_url($url, PHP_URL_HOST) . $currentUrl
      );
    }
    
    return $canonical;
  }
  
  /**
   * Extract schema types from JSON-LD
   */
  private static function extractSchemaTypes(string $content): array {
    $types = [];
    
    // Find all JSON-LD scripts
    preg_match_all('/<script\s+type=["\']application\/ld\+json["\'][^>]*>(.*?)<\/script>/is', $content, $matches);
    
    foreach ($matches[1] ?? [] as $json) {
      $data = json_decode(trim($json), true);
      if (!$data) continue;
      
      // Handle @graph structure
      if (isset($data['@graph']) && is_array($data['@graph'])) {
        foreach ($data['@graph'] as $node) {
          if (isset($node['@type'])) {
            $type = is_array($node['@type']) ? $node['@type'][0] : $node['@type'];
            $types[] = $type;
          }
        }
      } else {
        // Single node
        if (isset($data['@type'])) {
          $type = is_array($data['@type']) ? $data['@type'][0] : $data['@type'];
          $types[] = $type;
        }
      }
    }
    
    return array_unique($types);
  }
  
  /**
   * Analyze content structure
   */
  private static function analyzeContentStructure(string $content): array {
    $structure = [
      'has_h1' => false,
      'h1_count' => 0,
      'heading_levels' => [],
      'content_length' => 0,
      'paragraph_count' => 0,
      'list_count' => 0
    ];
    
    // Extract text content (rough estimate)
    $text = strip_tags($content);
    $text = preg_replace('/\s+/', ' ', $text);
    $structure['content_length'] = strlen(trim($text));
    
    // Count headings
    for ($i = 1; $i <= 6; $i++) {
      preg_match_all("/<h{$i}[^>]*>/i", $content, $matches);
      $count = count($matches[0] ?? []);
      if ($count > 0) {
        $structure['heading_levels']["h{$i}"] = $count;
        if ($i === 1) {
          $structure['has_h1'] = true;
          $structure['h1_count'] = $count;
        }
      }
    }
    
    // Count paragraphs
    preg_match_all('/<p[^>]*>/i', $content, $matches);
    $structure['paragraph_count'] = count($matches[0] ?? []);
    
    // Count lists
    preg_match_all('/<(ul|ol)[^>]*>/i', $content, $matches);
    $structure['list_count'] = count($matches[0] ?? []);
    
    return $structure;
  }
  
  /**
   * Extract entity references (Organization, Person, etc.)
   */
  private static function extractEntityReferences(string $content): array {
    $entities = [];
    
    // Look for Organization schema
    if (preg_match('/"@type"\s*:\s*"Organization"/i', $content)) {
      $entities[] = 'Organization';
    }
    
    // Look for Person schema
    if (preg_match('/"@type"\s*:\s*"Person"/i', $content)) {
      $entities[] = 'Person';
    }
    
    // Look for LocalBusiness schema
    if (preg_match('/"@type"\s*:\s*"LocalBusiness"/i', $content)) {
      $entities[] = 'LocalBusiness';
    }
    
    return $entities;
  }
  
  /**
   * Estimate internal link depth (rough heuristic)
   */
  private static function estimateLinkDepth(string $content): array {
    // Count internal links (same domain)
    preg_match_all('/<a[^>]+href=["\']([^"\']+)["\'][^>]*>/i', $content, $matches);
    
    $internal = 0;
    $external = 0;
    
    foreach ($matches[1] ?? [] as $href) {
      if (preg_match('/^(https?:\/\/|\.\.?\/|\/)/', $href)) {
        if (preg_match('/^(https?:\/\/)/', $href)) {
          $external++;
        } else {
          $internal++;
        }
      }
    }
    
    return [
      'internal_links' => $internal,
      'external_links' => $external,
      'total_links' => $internal + $external
    ];
  }
  
  /**
   * Check page role alignment (AUTHORITY, CONVERSION, HYBRID)
   */
  private static function checkPageRole(string $url, string $content): string {
    $path = parse_url($url, PHP_URL_PATH) ?? '';
    
    // Service pages = CONVERSION
    if (preg_match('#/services/#', $path)) {
      return 'CONVERSION';
    }
    
    // Article/insight pages = AUTHORITY
    if (preg_match('#/(insights|blog|resources)/#', $path)) {
      return 'AUTHORITY';
    }
    
    // Homepage = HYBRID
    if ($path === '/' || $path === '') {
      return 'HYBRID';
    }
    
    // Contact/About = CONVERSION
    if (preg_match('#/(contact|about)#', $path)) {
      return 'CONVERSION';
    }
    
    return 'UNKNOWN';
  }
}

