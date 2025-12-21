<?php
/**
 * Helper functions for generating role-aligned snippets
 * Use these in page files to ensure compliance
 */

require_once __DIR__.'/page_role_enforcement.php';

if (!function_exists('nc_snippet_conversion')) {
  /**
   * Generate conversion page snippets
   * 
   * @param string $service Service name (e.g., "ChatGPT SEO Services")
   * @param string|null $location Location (e.g., "New York" or "New York, NY")
   * @param string|null $outcome Outcome statement (e.g., "Get cited in ChatGPT")
   * @param string|null $who Target audience (e.g., "businesses", "healthcare practices")
   * @param string|null $proof Trust signal (e.g., "Trusted by 100+ companies")
   * @return array ['title' => string, 'description' => string]
   */
  function nc_snippet_conversion(
    string $service,
    ?string $location = null,
    ?string $outcome = null,
    ?string $who = null,
    ?string $proof = null
  ): array {
    $data = [
      'service' => $service,
      'location' => $location,
      'outcome' => $outcome ?? "Get cited in AI search results",
      'who' => $who ?? 'businesses',
      'proof' => $proof
    ];
    
    return [
      'title' => PageRoleEnforcement::generateTitle(PageRoleEnforcement::ROLE_CONVERSION, $data),
      'description' => PageRoleEnforcement::generateDescription(PageRoleEnforcement::ROLE_CONVERSION, $data)
    ];
  }
}

if (!function_exists('nc_snippet_authority')) {
  /**
   * Generate authority page snippets
   * 
   * @param string $topic Topic/insight title (e.g., "How AI Overviews Select Sources")
   * @param string|null $domain Domain context (e.g., "answer engine optimization")
   * @param string|null $takeaway Key takeaway
   * @return array ['title' => string, 'description' => string]
   */
  function nc_snippet_authority(
    string $topic,
    ?string $domain = null,
    ?string $takeaway = null
  ): array {
    $data = [
      'topic' => $topic,
      'domain' => $domain ?? 'AI visibility and citation behavior',
      'takeaway' => $takeaway
    ];
    
    return [
      'title' => PageRoleEnforcement::generateTitle(PageRoleEnforcement::ROLE_AUTHORITY, $data),
      'description' => PageRoleEnforcement::generateDescription(PageRoleEnforcement::ROLE_AUTHORITY, $data)
    ];
  }
}

if (!function_exists('nc_snippet_hybrid')) {
  /**
   * Generate hybrid page snippets
   * 
   * @param string $topic Authority topic
   * @param string|null $service Service implication
   * @return array ['title' => string, 'description' => string]
   */
  function nc_snippet_hybrid(
    string $topic,
    ?string $service = null
  ): array {
    $data = [
      'topic' => $topic,
      'service' => $service ?? 'AI visibility services'
    ];
    
    return [
      'title' => PageRoleEnforcement::generateTitle(PageRoleEnforcement::ROLE_HYBRID, $data),
      'description' => PageRoleEnforcement::generateDescription(PageRoleEnforcement::ROLE_HYBRID, $data)
    ];
  }
}

if (!function_exists('nc_set_snippet')) {
  /**
   * Set $ctx array with role-aligned snippets
   * 
   * @param string $role PageRoleEnforcement::ROLE_*
   * @param array $data Data for snippet generation
   * @return array $ctx array ready to use
   */
  function nc_set_snippet(string $role, array $data): array {
    $snippets = [
      'title' => PageRoleEnforcement::generateTitle($role, $data),
      'description' => PageRoleEnforcement::generateDescription($role, $data)
    ];
    
    return $snippets;
  }
}

