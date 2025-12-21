<?php
/**
 * CLI: php tools/audit-links.php /path
 */
$root = $argv[1] ?? __DIR__.'/..';
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
$bad = [];
foreach ($rii as $file) {
  if ($file->isDir()) continue;
  $path = $file->getPathname();
  if (preg_match('/\.(php|html?|md|txt|twig|blade\.php|vue|jsx?|tsx?)$/i', $path) !== 1) continue;
  $c = @file_get_contents($path);
  if ($c === false) continue;
  $hits = [];
  if (preg_match_all('#href=[\'\"]http://nrlcmd\.com/[^\'\"]+[\'\"]#i', $c, $m)) {
    $hits['http_links'] = count($m[0]);
  }
  if (preg_match_all('#href=[\'\"]/services/[^\'\"]+[A-Z][^\'\"]*[\'\"]#', $c, $m)) {
    $hits['mixed_case_service_links'] = count($m[0]);
  }
  if ($hits) $bad[$path] = $hits;
}

foreach ($bad as $file => $issues) {
  echo $file, "\n";
  foreach ($issues as $k => $n) {
    echo "  - $k: $n\n";
  }
}
exit(count($bad) > 0 ? 1 : 0);
