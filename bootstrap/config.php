<?php
declare(strict_types=1);

/**
 * App config loader with memoization
 */
function app_config(string $key, $default=null) {
  static $cfg;
  if (!$cfg) {
    $cfg = require __DIR__ . '/../config/app.php';
  }
  return $cfg[$key] ?? $default;
}

