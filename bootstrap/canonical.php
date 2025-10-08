<?php
declare(strict_types=1);

/**
 * Canonicalization utilities.
 */
final class Canonical
{
    /** keys to strip from query string */
    private const STRIP_KEYS = [
        'utm_source','utm_medium','utm_campaign','utm_term','utm_content',
        'ref','fbclid','gclid','msclkid','_hsmi','_hsenc'
    ];

    public static function isFileLike(string $path): bool {
        return (bool)preg_match('/\.[a-zA-Z0-9]{2,5}$/', $path);
    }

    public static function kebab(string $s): string {
        $s = preg_replace('/[ _]+/','-', $s);
        $s = preg_replace('/-+/', '-', $s);
        return strtolower($s ?? '');
    }

    public static function withTrailingSlash(string $path): string {
        if (self::isFileLike($path)) return $path;
        return rtrim($path, '/').'/';
    }

    public static function normalizePath(string $path): string {
        // collapse multiple slashes
        $path = preg_replace('#/+#','/', $path);
        // lowercase + kebab each segment
        $segments = array_filter(explode('/', $path), fn($p) => $p !== '');
        $segments = array_map(fn($p) => self::kebab($p), $segments);

        // Rule for /services/{service}/{city}/
        if (count($segments) >= 3 && $segments[0] === 'services') {
            $segments[1] = self::kebab($segments[1]);
            $segments[2] = self::kebab($segments[2]);
            // normalize state delimiter inside city if present (mesa_AZ → mesa-az)
            $segments[2] = preg_replace('/[_]+/','-', $segments[2]);
            $segments[2] = preg_replace('/-+/', '-', $segments[2]);
        }

        $normalized = '/'.implode('/', $segments);
        return self::withTrailingSlash($normalized);
    }

    public static function stripParams(array $query): array {
        $filtered = [];
        foreach ($query as $k => $v) {
            if (!in_array(strtolower((string)$k), self::STRIP_KEYS, true)) {
                $filtered[$k] = $v;
            }
        }
        return $filtered;
    }

    public static function buildUrl(string $scheme, string $host, string $path, array $query = []): string {
        $qs = http_build_query($query);
        return $scheme.'://'.$host.$path.($qs ? '?'.$qs : '');
    }

    public static function ensureCanonicalRedirect(): void {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host   = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
        $uri    = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
        $query  = $_GET ?? [];

        $normPath = self::normalizePath($uri);
        $normQuery = self::stripParams($query);

        // Force primary host (optional, uncomment if needed)
        // if (strtolower($host) !== 'nrlcmd.com') { $host = 'nrlcmd.com'; }

        $target = self::buildUrl('https', $host, $normPath, $normQuery);
        $current = self::buildUrl($scheme, $host, self::withTrailingSlash($uri), $query);

        if ($target !== $current) {
            header('Location: '.$target, true, 301);
            exit;
        }
    }

    public static function absoluteCanonical(string $path): string {
        $host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
        return 'https://'.$host.self::normalizePath($path);
    }
}

