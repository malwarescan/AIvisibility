<?php
declare(strict_types=1);
header('Content-Type: application/xml; charset=utf-8');

require_once __DIR__.'/../bootstrap/canonical.php';
require_once __DIR__.'/../lib/links.php';

$rows = [];
$csv = __DIR__.'/../data/matrix.csv';
if (is_file($csv)) {
    if (($h = fopen($csv, 'r')) !== false) {
        $header = fgetcsv($h);
        while (($r = fgetcsv($h)) !== false) {
            if ($header) {
                $rows[] = array_combine($header, $r);
            }
        }
        fclose($h);
    }
}

$items = [];
$nowIso = gmdate('c');

foreach ($rows as $row) {
    $service = $row['service'] ?? '';
    $city    = $row['city'] ?? '';
    if (!$service || !$city) continue;

    $loc = link_to_service_city($service, $city);
    $lastmod = !empty($row['lastmod']) ? date('c', strtotime($row['lastmod'])) : $nowIso;

    $ok = (strtolower($loc) === $loc)
        && str_ends_with($loc, '/')
        && (parse_url($loc, PHP_URL_QUERY) === null);

    if ($ok) {
        $items[] = [
            'loc' => $loc,
            'lastmod' => $lastmod,
            'changefreq' => 'weekly',
            'priority' => '0.8'
        ];
    }
}

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($items as $it): ?>
  <url>
    <loc><?= htmlspecialchars($it['loc'], ENT_XML1) ?></loc>
    <lastmod><?= htmlspecialchars($it['lastmod'], ENT_XML1) ?></lastmod>
    <changefreq><?= $it['changefreq'] ?></changefreq>
    <priority><?= $it['priority'] ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
