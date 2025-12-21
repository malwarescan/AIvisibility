<?php
/**
 * GSC CTR + Intent Realignment Kernel
 * VERSION: 1.0
 * 
 * Enforces query intent → page role → snippet alignment
 */

if (!class_exists('PageRoleEnforcement')) {
  class PageRoleEnforcement {
    const ROLE_CONVERSION = 'conversion';
    const ROLE_AUTHORITY = 'authority';
    const ROLE_HYBRID = 'hybrid';
    
    /**
     * Determine page role from path and content
     */
    public static function classifyPage(string $path, ?array $hints = null): string {
      $hints = $hints ?? [];
      
      // Explicit override
      if (!empty($hints['role'])) {
        return $hints['role'];
      }
      
      // Path-based classification
      if (strpos($path, '/services/') !== false) {
        // Service pages are CONVERSION
        return self::ROLE_CONVERSION;
      }
      
      if (strpos($path, '/insights/') !== false || 
          strpos($path, '/case-studies/') !== false ||
          strpos($path, '/resources/') !== false ||
          strpos($path, '/how-to-') !== false ||
          strpos($path, '/what-is-') !== false) {
        // Educational/research pages are AUTHORITY
        return self::ROLE_AUTHORITY;
      }
      
      if (strpos($path, '/about/') !== false || 
          strpos($path, '/contact/') !== false) {
        // About/contact can be HYBRID (authority with service implication)
        return self::ROLE_HYBRID;
      }
      
      // Default: HYBRID (safe fallback)
      return self::ROLE_HYBRID;
    }
    
    /**
     * Generate meta title for role
     */
    public static function generateTitle(string $role, array $data): string {
      $service = $data['service'] ?? '';
      $location = $data['location'] ?? '';
      $outcome = $data['outcome'] ?? '';
      $topic = $data['topic'] ?? '';
      
      switch ($role) {
        case self::ROLE_CONVERSION:
          // MUST contain: Service + Outcome + Geography/Qualifier
          $parts = [];
          if ($service) $parts[] = $service;
          if ($outcome) $parts[] = $outcome;
          if ($location) $parts[] = "in $location";
          if (empty($parts)) $parts[] = "AI Visibility Services";
          $title = implode(' ', $parts) . ' | Neural Command';
          // Enforce: no concept-heavy language, no frameworks
          $title = self::stripAbstractLanguage($title);
          return $title;
          
        case self::ROLE_AUTHORITY:
          // MUST explicitly frame analysis/insight
          if ($topic) {
            return "$topic | Neural Command";
          }
          return "AI Visibility Insights | Neural Command";
          
        case self::ROLE_HYBRID:
          // Authority framing FIRST, service implication SECOND
          if ($topic) {
            return "$topic — AI Visibility Services | Neural Command";
          }
          return "AI Visibility Services | Neural Command";
          
        default:
          return "Neural Command — AI Visibility";
      }
    }
    
    /**
     * Generate meta description for role
     */
    public static function generateDescription(string $role, array $data): string {
      $service = $data['service'] ?? '';
      $location = $data['location'] ?? '';
      $outcome = $data['outcome'] ?? '';
      $topic = $data['topic'] ?? '';
      $who = $data['who'] ?? '';
      $proof = $data['proof'] ?? '';
      
      switch ($role) {
        case self::ROLE_CONVERSION:
          // MUST: Who it's for + What changes + Why trust
          $desc = [];
          if ($who) {
            $desc[] = "For $who";
          }
          if ($outcome) {
            $desc[] = $outcome;
          }
          if ($location) {
            $desc[] = "in $location";
          }
          if ($proof) {
            $desc[] = $proof;
          }
          if (empty($desc)) {
            $desc[] = "Get cited in ChatGPT, Google AI Overviews, and AI search results.";
          }
          return implode('. ', $desc) . '.';
          
        case self::ROLE_AUTHORITY:
          // MUST: Signal learning, not buying
          if ($topic) {
            return "Learn about $topic. Research and insights on AI visibility, citation behavior, and answer engine optimization.";
          }
          return "Research and insights on AI visibility, citation behavior, and answer engine optimization.";
          
        case self::ROLE_HYBRID:
          // Insight → implication → optional next step
          $desc = [];
          if ($topic) {
            $desc[] = "Understanding $topic";
          }
          $desc[] = "How it impacts AI visibility and search results";
          if ($service) {
            $desc[] = "Learn how our services can help";
          }
          return implode('. ', $desc) . '.';
          
        default:
          return "AI visibility services and insights.";
      }
    }
    
    /**
     * Strip abstract/framework language from titles
     */
    private static function stripAbstractLanguage(string $text): string {
      // Remove common abstract terms that don't sell
      $abstracts = [
        'framework',
        'methodology',
        'approach',
        'strategy',
        'paradigm',
        'philosophy'
      ];
      
      foreach ($abstracts as $term) {
        $text = preg_replace('/\b' . preg_quote($term, '/') . '\b/i', '', $text);
      }
      
      // Clean up extra spaces
      $text = preg_replace('/\s+/', ' ', $text);
      return trim($text);
    }
    
    /**
     * Validate title matches role requirements
     */
    public static function validateTitle(string $title, string $role): array {
      $errors = [];
      $warnings = [];
      
      // Check length (mobile-first: 50-60 chars ideal)
      $len = mb_strlen($title);
      if ($len > 70) {
        $warnings[] = "Title too long ($len chars). Mobile CTR drops after 60 chars.";
      }
      if ($len < 30) {
        $warnings[] = "Title too short ($len chars). May not convey enough context.";
      }
      
      // Role-specific checks
      if ($role === self::ROLE_CONVERSION) {
        // Must contain service/outcome signal
        if (!preg_match('/\b(service|optimization|consulting|audit|help|get|become)\b/i', $title)) {
          $errors[] = "Conversion title missing service/action signal";
        }
        
        // Must NOT contain abstract language
        if (preg_match('/\b(framework|methodology|approach|strategy|paradigm)\b/i', $title)) {
          $errors[] = "Conversion title contains abstract language (use concrete outcomes)";
        }
      }
      
      if ($role === self::ROLE_AUTHORITY) {
        // Must NOT contain service language
        if (preg_match('/\b(service|hire|get|buy|purchase|consulting)\b/i', $title)) {
          $warnings[] = "Authority title contains commercial language (may confuse intent)";
        }
      }
      
      return [
        'valid' => empty($errors),
        'errors' => $errors,
        'warnings' => $warnings
      ];
    }
    
    /**
     * Validate description matches role requirements
     */
    public static function validateDescription(string $desc, string $role): array {
      $errors = [];
      $warnings = [];
      
      // Check length (120-160 chars ideal)
      $len = mb_strlen($desc);
      if ($len > 180) {
        $warnings[] = "Description too long ($len chars). May be truncated in SERP.";
      }
      if ($len < 80) {
        $warnings[] = "Description too short ($len chars). May not convey enough value.";
      }
      
      // Role-specific checks
      if ($role === self::ROLE_CONVERSION) {
        // Must state who + what changes
        if (!preg_match('/\b(for|businesses|companies|organizations)\b/i', $desc)) {
          $warnings[] = "Conversion description missing 'who it's for'";
        }
        if (!preg_match('/\b(get|become|achieve|receive|deliver)\b/i', $desc)) {
          $warnings[] = "Conversion description missing outcome signal";
        }
      }
      
      if ($role === self::ROLE_AUTHORITY) {
        // Must signal learning
        if (!preg_match('/\b(learn|research|insight|analysis|understand|explore)\b/i', $desc)) {
          $warnings[] = "Authority description missing learning signal";
        }
        // Must NOT signal buying
        if (preg_match('/\b(hire|buy|purchase|get started|contact us)\b/i', $desc)) {
          $errors[] = "Authority description contains commercial CTA (should signal learning)";
        }
      }
      
      return [
        'valid' => empty($errors),
        'errors' => $errors,
        'warnings' => $warnings
      ];
    }
    
    /**
     * Audit a page's snippet alignment
     */
    public static function auditPage(string $path, string $title, string $description, ?string $explicitRole = null): array {
      $role = $explicitRole ?? self::classifyPage($path);
      
      $titleValidation = self::validateTitle($title, $role);
      $descValidation = self::validateDescription($description, $role);
      
      return [
        'path' => $path,
        'role' => $role,
        'title' => [
          'current' => $title,
          'validation' => $titleValidation
        ],
        'description' => [
          'current' => $description,
          'validation' => $descValidation
        ],
        'aligned' => $titleValidation['valid'] && $descValidation['valid'],
        'issues' => array_merge($titleValidation['errors'], $descValidation['errors']),
        'warnings' => array_merge($titleValidation['warnings'], $descValidation['warnings'])
      ];
    }
  }
}

