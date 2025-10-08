<?php
declare(strict_types=1);

require_once __DIR__.'/../bootstrap/config.php';

/**
 * Ensure "license" is present for CreativeWork descendants (WebPage, FAQPage, Article, HowTo, SoftwareApplication, etc.)
 * Do NOT add for types that are not CreativeWork descendants (Service, LocalBusiness, Organization).
 */
function schema_add_license(array $json): array {
  $creativeWorkTypes = [
    'CreativeWork','WebPage','Article','FAQPage','HowTo','SoftwareApplication',
    'CollectionPage','AboutPage','ItemPage','Blog','BlogPosting','TechArticle'
  ];
  
  $type = is_string($json['@type'] ?? null) ? $json['@type'] : null;
  
  if ($type && in_array($type, $creativeWorkTypes, true)) {
    $json['license'] = app_config('license_url', 'https://nrlcmd.com/legal/license/');
  }
  
  return $json;
}

/**
 * Add "creator" field for CreativeWork subtypes
 */
function schema_add_creator(array $json): array {
  $creativeWorkTypes = [
    'CreativeWork','WebPage','Article','FAQPage','HowTo','SoftwareApplication',
    'CollectionPage','AboutPage','ItemPage','Blog','BlogPosting','TechArticle'
  ];
  
  $type = is_string($json['@type'] ?? null) ? $json['@type'] : null;
  
  if ($type && in_array($type, $creativeWorkTypes, true)) {
    $json['creator'] = [
      '@type' => 'Person',
      'name'  => 'Joel David Maldonado',
      'url'   => 'https://nrlcmd.com/#creator'
    ];
  }
  
  return $json;
}

/**
 * Main merge + render function - applies license and creator to CreativeWork types
 */
function render_jsonld(array $json): string {
  $json = schema_add_license($json);
  $json = schema_add_creator($json);
  return '<script type="application/ld+json">'.json_encode($json, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
}

