<?php
declare(strict_types=1);
header('Content-Type: application/xml; charset=utf-8');
$host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
require_once __DIR__.'/../lib/links.php';
$rows=[];
$csv = __DIR__.'/../data/matrix.csv';
if (is_file($csv) && ($h=fopen($csv,'r'))) {
  $head=fgetcsv($h);
  while(($r=fgetcsv($h))!==false){ $rows[] = array_combine($head,$r); }
  fclose($h);
}
$per = 45000;
$total = count($rows);
$pages = max(1, (int)ceil($total/$per));
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"; ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php for($i=1;$i<=$pages;$i++): ?>
  <sitemap>
    <loc><?= htmlspecialchars('https://'.$host.'/sitemaps/sitemap-'.$i.'.xml', ENT_XML1) ?></loc>
    <lastmod><?= gmdate('c') ?></lastmod>
  </sitemap>
<?php endfor; ?>
</sitemapindex>
