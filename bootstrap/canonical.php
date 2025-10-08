<?php
declare(strict_types=1);

final class Canonical {
  private const STRIP = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','ref','fbclid','gclid','msclkid','_hsmi','_hsenc'];

  public static function isFileLike(string $p): bool { return (bool)preg_match('/\.[a-z0-9]{2,5}$/i',$p); }
  public static function kebab(string $s): string {
    $s = preg_replace('/[ _]+/','-',$s);
    $s = preg_replace('/-+/','-',$s);
    return strtolower($s ?? '');
  }
  public static function withSlash(string $p): string { return self::isFileLike($p) ? $p : rtrim($p,'/').'/'; }
  public static function normalizePath(string $p): string {
    $p = preg_replace('#/+#','/',$p);
    $parts = array_filter(explode('/',$p), fn($x)=>$x!=='');
    $parts = array_values($parts); // Re-index after filter
    $parts = array_map(fn($x)=>self::kebab($x), $parts);
    if (count($parts)>=3 && isset($parts[0],$parts[1],$parts[2]) && $parts[0]==='services') {
      $parts[1]=self::kebab($parts[1]);
      $parts[2]=self::kebab(str_replace('_','-',$parts[2]));
    }
    return self::withSlash('/'.implode('/',$parts));
  }
  public static function strip(array $q): array {
    $out=[]; foreach($q as $k=>$v){ if(!in_array(strtolower((string)$k), self::STRIP, true)) $out[$k]=$v; } return $out;
  }
  public static function absolute(string $path): string {
    $host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
    return 'https://'.$host.self::normalizePath($path);
  }
  public static function absoluteCanonical(string $path): string {
    return self::absolute($path);
  }
  public static function guard(): void {
    // Use X-Forwarded-Proto if behind proxy (Railway), otherwise check HTTPS
    $forwardedProto = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
    if ($forwardedProto) {
      $scheme = $forwardedProto;
    } else {
      $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') ? 'https':'http';
    }
    
    $host   = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
    $uri    = parse_url($_SERVER['REQUEST_URI']??'/', PHP_URL_PATH) ?? '/';
    $q      = $_GET ?? [];
    
    $target = 'https://'.$host.self::normalizePath($uri);
    $qsNorm = http_build_query(self::strip($q));
    if ($qsNorm) $target .= '?'.$qsNorm;
    $current = $scheme.'://'.$host.self::withSlash($uri);
    $qsNow   = $_SERVER['QUERY_STRING']??'';
    if ($qsNow) $current .= '?'.$qsNow;
    if ($target !== $current) { header('Location: '.$target, true, 301); exit; }
  }
}

