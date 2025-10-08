<?php
header('Content-Type: text/plain; charset=utf-8');
$host = $_SERVER['HTTP_HOST'] ?? 'nrlcmd.com';
echo <<<TXT
User-agent: *
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*
Disallow: /*?msclkid=*
Disallow: /*?_hsmi=*
Disallow: /*?_hsenc=*

Sitemap: https://$host/sitemap.xml
TXT;

