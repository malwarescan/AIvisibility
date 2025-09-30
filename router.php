<?php
require __DIR__ . '/lib/router_map.php';

$uri = $_SERVER['REQUEST_URI'] ?? '/';

$path = parse_url($uri, PHP_URL_PATH) ?? '/';

if ($path !== '/' && file_exists(__DIR__ . $path) && !is_dir(__DIR__ . $path)) {
    return false;
}

$resolution = resolve_route($uri);

if (!empty($resolution['include'])) {
    include $resolution['include'];
    exit;
}

$_GET['page'] = $resolution['page'];
if (!empty($resolution['slug'])) {
    $_GET['slug'] = $resolution['slug'];
}
if (!empty($resolution['city'])) {
    $_GET['city'] = $resolution['city'];
}
if (!empty($resolution['state'])) {
    $_GET['state'] = $resolution['state'];
}

include __DIR__ . '/index.php';

