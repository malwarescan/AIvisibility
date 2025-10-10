<?php
declare(strict_types=1);
require __DIR__.'/ai-consulting/lib/CityData.php';
header('Content-Type: application/xml; charset=utf-8');

$site = 'https://nrlcmd.com';
$data = new CityData(__DIR__.'/ai-consulting/cities.csv');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($data->all() as $row): 
  $loc = "{$site}/ai-consulting/{$row['slug']}/";
?>
  <url>
    <loc><?= htmlspecialchars($loc, ENT_XML1) ?></loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <lastmod><?= gmdate('c') ?></lastmod>
  </url>
<?php endforeach; ?>
</urlset>
