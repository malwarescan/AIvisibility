<?php
declare(strict_types=1);
header('Content-Type: text/plain; charset=utf-8');

$host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';

echo "User-agent: *\n";
echo "Disallow: /*?utm_*\n";
echo "Disallow: /*?ref=*\n";
echo "Disallow: /*?fbclid=*\n";
echo "Disallow: /*?gclid=*\n";
echo "Disallow: /*?msclkid=*\n";
echo "Disallow: /*?_hsmi=*\n";
echo "Disallow: /*?_hsenc=*\n";
echo "\n";
echo "Sitemap: https://$host/sitemap.xml\n";
