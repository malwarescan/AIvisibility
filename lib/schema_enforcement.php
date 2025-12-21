<?php
/**
 * MASTER SCHEMA MATRIX ENFORCEMENT
 * VERSION: 1.0
 * 
 * Enforces schema rules per page role to prevent signal dilution
 */

if (!class_exists('SchemaEnforcement')) {
  class SchemaEnforcement {
    // Prohibited schema types (never use these)
    const PROHIBITED_TYPES = [
      'Product',
      'Offer',
      'Review',
      'AggregateRating',
      'Event',
      'SoftwareApplication',
      'HowTo',
      'Course'
    ];
    
    // Allowed schema types by page role
    const ALLOWED_BY_ROLE = [
      'homepage' => ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'],
      'contact' => ['Organization', 'WebPage', 'ContactPoint', 'BreadcrumbList'],
      'service' => ['Organization', 'WebPage', 'Service', 'LocalBusiness', 'BreadcrumbList', 'FAQPage'],
      'authority' => ['Organization', 'WebPage', 'Article', 'BlogPosting', 'BreadcrumbList'],
      'hybrid' => ['Organization', 'WebPage', 'BreadcrumbList']
    ];
    
    /**
     * Determine page type from path
     */
    public static function getPageType(string $path): string {
      if ($path === '/' || $path === '') {
        return 'homepage';
      }
      
      if (strpos($path, '/contact') !== false) {
        return 'contact';
      }
      
      if (strpos($path, '/services/') !== false) {
        return 'service';
      }
      
      if (strpos($path, '/insights/') !== false || 
          strpos($path, '/resources/') !== false ||
          strpos($path, '/case-studies/') !== false) {
        return 'authority';
      }
      
      return 'hybrid';
    }
    
    /**
     * Validate schema graph against rules
     */
    public static function validateGraph(array $graph, string $pageType): array {
      $errors = [];
      $warnings = [];
      $allowed = self::ALLOWED_BY_ROLE[$pageType] ?? self::ALLOWED_BY_ROLE['hybrid'];
      
      foreach ($graph as $node) {
        if (!isset($node['@type'])) {
          continue;
        }
        
        $type = is_array($node['@type']) ? $node['@type'][0] : $node['@type'];
        
        // Check for prohibited types
        if (in_array($type, self::PROHIBITED_TYPES)) {
          $errors[] = "Prohibited schema type found: $type";
        }
        
        // Check if type is allowed for this page role
        if (!in_array($type, $allowed)) {
          $warnings[] = "Schema type '$type' not recommended for $pageType pages";
        }
        
        // Special rules
        if ($pageType === 'contact' && in_array($type, ['Service', 'FAQPage', 'Offer', 'Product'])) {
          $errors[] = "Contact page must not contain $type schema";
        }
        
        if ($pageType === 'homepage' && $type === 'Service') {
          $warnings[] = "Homepage should not contain Service schema (use Organization + WebSite only)";
        }
        
        if ($pageType === 'authority' && in_array($type, ['Service', 'Offer', 'Product'])) {
          $errors[] = "Authority pages must not contain commercial schema ($type)";
        }
      }
      
      return [
        'valid' => empty($errors),
        'errors' => $errors,
        'warnings' => $warnings,
        'allowed_types' => $allowed
      ];
    }
    
    /**
     * Clean schema graph - remove prohibited types
     */
    public static function cleanGraph(array $graph, string $pageType): array {
      $allowed = self::ALLOWED_BY_ROLE[$pageType] ?? self::ALLOWED_BY_ROLE['hybrid'];
      $cleaned = [];
      
      foreach ($graph as $node) {
        if (!isset($node['@type'])) {
          $cleaned[] = $node;
          continue;
        }
        
        $type = is_array($node['@type']) ? $node['@type'][0] : $node['@type'];
        
        // Remove prohibited types
        if (in_array($type, self::PROHIBITED_TYPES)) {
          continue;
        }
        
        // Remove types not allowed for this page role
        if (!in_array($type, $allowed)) {
          continue;
        }
        
        // Special cleaning rules
        if ($pageType === 'contact' && in_array($type, ['Service', 'FAQPage'])) {
          continue;
        }
        
        if ($pageType === 'homepage' && $type === 'Service') {
          continue;
        }
        
        if ($pageType === 'authority' && in_array($type, ['Service', 'Offer', 'Product'])) {
          continue;
        }
        
        // Clean nested prohibited types
        $node = self::cleanNode($node);
        
        $cleaned[] = $node;
      }
      
      return $cleaned;
    }
    
    /**
     * Recursively clean nested prohibited types
     */
    private static function cleanNode(array $node): array {
      $cleaned = [];
      
      foreach ($node as $key => $value) {
        // Remove prohibited nested objects
        if ($key === 'hasOfferCatalog' || $key === 'offers' || $key === 'review' || $key === 'makesOffer') {
          continue;
        }
        
        if (is_array($value)) {
          // Check if this is a nested schema object
          if (isset($value['@type'])) {
            $nestedType = is_array($value['@type']) ? $value['@type'][0] : $value['@type'];
            if (in_array($nestedType, self::PROHIBITED_TYPES)) {
              continue;
            }
          }
          
          // Recursively clean arrays
          $cleaned[$key] = self::cleanNode($value);
        } else {
          $cleaned[$key] = $value;
        }
      }
      
      return $cleaned;
    }
    
    /**
     * Generate ContactPoint schema for contact page
     */
    public static function generateContactPoint(string $email, string $phone, string $contactType = 'General'): array {
      return [
        '@type' => 'ContactPoint',
        'contactType' => $contactType,
        'email' => $email,
        'telephone' => $phone,
        'availableLanguage' => ['en', 'English']
      ];
    }
    
    /**
     * Generate clean Service schema (no Offer, no Review)
     */
    public static function generateService(array $data): array {
      $service = [
        '@type' => 'Service',
        'name' => $data['name'] ?? '',
        'description' => $data['description'] ?? '',
        'serviceType' => $data['serviceType'] ?? '',
        'provider' => $data['provider'] ?? ['@id' => 'https://nrlcmd.com/#org']
      ];
      
      if (!empty($data['areaServed'])) {
        $service['areaServed'] = $data['areaServed'];
      }
      
      if (!empty($data['@id'])) {
        $service['@id'] = $data['@id'];
      }
      
      // Explicitly DO NOT include:
      // - hasOfferCatalog
      // - offers
      // - review
      // - aggregateRating
      
      return $service;
    }
    
    /**
     * Generate clean LocalBusiness schema (no Offer, no Review)
     */
    public static function generateLocalBusiness(array $data): array {
      $localBusiness = [
        '@type' => 'LocalBusiness',
        'name' => $data['name'] ?? '',
        'url' => $data['url'] ?? '',
        'telephone' => $data['telephone'] ?? '',
        'parentOrganization' => $data['parentOrganization'] ?? ['@id' => 'https://nrlcmd.com/#org']
      ];
      
      if (!empty($data['@id'])) {
        $localBusiness['@id'] = $data['@id'];
      }
      
      if (!empty($data['image'])) {
        $localBusiness['image'] = $data['image'];
      }
      
      if (!empty($data['address'])) {
        $localBusiness['address'] = $data['address'];
      }
      
      if (!empty($data['areaServed'])) {
        $localBusiness['areaServed'] = $data['areaServed'];
      }
      
      // Explicitly DO NOT include:
      // - makesOffer
      // - offers
      // - review
      // - aggregateRating
      
      return $localBusiness;
    }
    
    /**
     * Count schema types in graph (for debugging)
     */
    public static function countTypes(array $graph): array {
      $counts = [];
      $nodes = $graph['@graph'] ?? [];
      foreach ($nodes as $n) {
        if (!is_array($n)) continue;
        $t = $n['@type'] ?? null;
        if (is_array($t)) {
          foreach ($t as $tt) {
            if (is_string($tt)) {
              $counts[$tt] = ($counts[$tt] ?? 0) + 1;
            }
          }
        } elseif (is_string($t)) {
          $counts[$t] = ($counts[$t] ?? 0) + 1;
        }
      }
      return $counts;
    }
  }
}

