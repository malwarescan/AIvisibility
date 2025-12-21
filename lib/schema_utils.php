<?php
declare(strict_types=1);

/**
 * Schema utilities for unified JSON-LD @graph with stable @id IRIs
 */

if (!function_exists('nc_base_url')) {
  function nc_base_url(): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
    return $scheme.'://'.$host;
  }
}

if (!function_exists('nc_page_url')) {
  function nc_page_url(): string {
    // Use normalized path (consistent with Canonical::normalizePath)
    // This ensures canonical URLs match the actual served URLs after Canonical::guard() normalization
    // normalizePath removes trailing slashes (except root) to match the canonical standard
    require_once __DIR__.'/../bootstrap/canonical.php';
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
    $normalizedPath = Canonical::normalizePath($uri);
    return nc_base_url().$normalizedPath;
  }
}

if (!function_exists('nc_lang_for_url')) {
  function nc_lang_for_url(string $url): string {
    return (str_contains(parse_url($url, PHP_URL_PATH) ?? '', '/ko/')) ? 'ko' : 'en';
  }
}

if (!function_exists('nc_id')) {
  function nc_id(string $suffix): string {
    // Preserve fragment identifiers (they must start with #)
    // Append suffix as-is - don't strip # characters
    return nc_page_url().$suffix;
  }
}

if (!function_exists('nc_org_id')) {
  function nc_org_id(): string { 
    return nc_base_url().'/#org'; 
  }
}

if (!function_exists('nc_site_id')) {
  function nc_site_id(): string { 
    return nc_base_url().'/#website'; 
  }
}

if (!function_exists('nc_logo_url')) {
  function nc_logo_url(): string { 
    return nc_base_url().'/assets/logo.svg'; 
  }
}

if (!function_exists('nc_jsonld')) {
  function nc_jsonld(array $graph): string {
    return '<script type="application/ld+json">'.json_encode([
      '@context' => 'https://schema.org',
      '@graph'   => $graph
    ], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>';
  }
}
