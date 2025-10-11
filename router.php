<?php
// Router for PHP built-in server
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle static files
if ($uri !== '/' && file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false; // Let PHP server handle it
}

// Handle directories
if ($uri !== '/' && is_dir(__DIR__ . $uri)) {
    $indexFile = __DIR__ . $uri . '/index.php';
    if (file_exists($indexFile)) {
        require $indexFile;
        return true;
    }
}

// All other requests go to main index.php
require __DIR__ . '/index.php';
return true;