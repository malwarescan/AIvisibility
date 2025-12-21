<?php
// inc/seo.php  // NC: Shared SEO helpers

if (!function_exists('nc_base_url')) {
  function nc_base_url(): string {
    // Set once; do not infer from host to avoid mixed envs
    return 'https://nrlcmd.com';
  }
}

if (!function_exists('nc_abs')) {
  function nc_abs(string $path): string {
    if (stripos($path, 'http') === 0) return $path;
    return rtrim(nc_base_url(), '/') . '/' . ltrim($path, '/');
  }
}

if (!function_exists('nc_meta')) {
  function nc_meta(string $title, string $desc, ?string $canonical = null): void {
    $t = trim($title);
    $d = trim($desc);
    $c = $canonical ? nc_abs($canonical) : null;
    echo "<title>" . htmlspecialchars($t, ENT_QUOTES) . "</title>\n";
    echo '<meta name="description" content="' . htmlspecialchars($d, ENT_QUOTES) . '">' . "\n";
    if ($c) {
      echo '<link rel="canonical" href="' . htmlspecialchars($c, ENT_QUOTES) . '">' . "\n";
    }
  }
}

// nc_jsonld function now defined in lib/schema_utils.php with proper @graph wrapper
