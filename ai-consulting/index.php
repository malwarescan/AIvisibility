<?php
// /ai-consulting/index.php
declare(strict_types=1);
require __DIR__.'/lib/CityData.php';
require __DIR__.'/lib/TokenEngine.php';
require __DIR__.'/lib/Schema.php';

$base = '/ai-consulting/';
$reqUri = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$path = rtrim($reqUri, '/').'/';

$citySlug = '';
if (strpos($path, $base) === 0) {
  $tail = substr($path, strlen($base)); // e.g., "london/"
  $parts = explode('/', trim($tail,'/'));
  $citySlug = $parts[0] ?? '';
}

$data = new CityData(__DIR__.'/cities.csv');

if ($citySlug === '') {
  // Optional: simple index listing
  header('Content-Type: text/html; charset=utf-8');
  echo "<!doctype html><html><head><meta charset='utf-8'><title>AI Consulting Cities | Neural Command</title></head><body><h1>AI Consulting: Cities</h1><ul>";
  foreach ($data->all() as $row) {
    $slug = htmlspecialchars($row['slug']);
    $name = htmlspecialchars($row['city']);
    echo "<li><a href=\"/ai-consulting/{$slug}/\">{$name}</a></li>";
  }
  echo "</ul></body></html>";
  exit;
}

$city = $data->getBySlug($citySlug);
if (!$city) {
  header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
  echo "<!doctype html><html><head><meta charset='utf-8'><title>Not Found</title></head><body><h1>City not found</h1></body></html>";
  exit;
}

$seed = TokenEngine::seed($citySlug);
$city['slug'] = $citySlug;

require __DIR__.'/templates/city.php';
