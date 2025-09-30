<?php
function esc($s){return htmlspecialchars($s, ENT_QUOTES,'UTF-8');}
function canonical($path = '/') {
    $host = $_SERVER['HTTP_HOST'] ?? null;
    if ($host) $host = strtolower($host);
    $allowed = defined('NC_ALLOWED_HOSTS') ? (array)NC_ALLOWED_HOSTS : [];
    $fallback = parse_url(NC_BASEURL, PHP_URL_HOST) ?: 'localhost';
    if (!$host || !in_array($host, $allowed, true)) {
        $host = $fallback;
    }
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $base = $scheme.'://'.$host;
    return rtrim($base, '/').$path;
}
function nowISO(){return gmdate('c');}

