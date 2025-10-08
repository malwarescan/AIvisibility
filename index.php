<?php
declare(strict_types=1);

require __DIR__.'/config.php';
require __DIR__.'/bootstrap/canonical.php';
require __DIR__.'/bootstrap/config.php';
require __DIR__.'/lib/util.php';
require __DIR__.'/lib/seo.php';
require __DIR__.'/lib/links.php';

Canonical::guard();

// Send license link header for HTML pages
if (PHP_SAPI !== 'cli') {
  header('Link: <'.app_config('license_url').'>; rel="license"', false);
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$path = Canonical::normalizePath($path);

$_GET = [];

$setPage = function (string $page, array $extra = []): void {
    $_GET['page'] = $page;
    foreach ($extra as $k => $v) {
        $_GET[$k] = $v;
    }
};

switch (true) {
    case $path === '/':
        $setPage('home');
        break;
    case $path === '/about/':
        $setPage('about');
        break;
    case $path === '/services/':
        require __DIR__.'/pages/services/index.php';
        exit;
    case preg_match('#^/services/([^/]+)/([^/]+)/$#', $path, $m):
        $service = $m[1];
        $city = $m[2];
        require __DIR__.'/pages/services/city.php';
        exit;
    case preg_match('#^/services/([^/]+)/$#', $path, $m):
        $_GET['service'] = $m[1];
        require __DIR__.'/pages/services/service-hub.php';
        exit;
    case preg_match('#^/services/state/([a-z]{2})/$#', $path, $m):
        $_GET['state'] = $m[1];
        require __DIR__.'/pages/services/state-hub.php';
        exit;
    case preg_match('#^/city-service/([^/]+)/$#', $path, $m):
        $setPage('city-service', ['city' => $m[1]]);
        break;
    case $path === '/contact/':
        $setPage('contact');
        break;
    case $path === '/contact-confirmation/':
        $setPage('contact-confirmation');
        break;
    case $path === '/process-contact/':
        require __DIR__.'/pages/process-contact.php';
        exit;
    case $path === '/process-audit/':
        $setPage('process-audit');
        break;
    case $path === '/audit-results/':
        $setPage('audit-results');
        break;
    case $path === '/quote-thanks/':
        $setPage('quote-thanks');
        break;
    case $path === '/thanks/':
        $setPage('thanks');
        break;
    case $path === '/resources/':
        $setPage('resources');
        break;
    case $path === '/resources/diagnostic/':
        $setPage('resources/diagnostic');
        break;
    case $path === '/legal/license/':
        require __DIR__.'/pages/legal/license.php';
        exit;
    case preg_match('#^/industries/([^/]+)/$#', $path, $m):
        $setPage('industries/'.$m[1]);
        break;
    case preg_match('#^/case-studies/([^/]+)/$#', $path, $m):
        $setPage('case-studies/'.$m[1]);
        break;
    case $path === '/sitemap.xml':
        require __DIR__.'/public/sitemap.index.php';
        exit;
    case preg_match('#^/sitemaps/sitemap-(\d+)\.xml$#', $path, $m):
        $_GET['page'] = $m[1];
        require __DIR__.'/public/sitemap.page.php';
        exit;
    case $path === '/robots.txt':
        require __DIR__.'/public/robots.txt.php';
        exit;
    default:
        $trimmed = trim($path, '/');
        $setPage($trimmed !== '' ? $trimmed : 'home');
        break;
}

$page = $_GET['page'] ?? 'home';
$slug = $_GET['slug'] ?? null;
$city = $_GET['city'] ?? null;

$ctx = [
  'title' => 'Neural Command — Agentic SEO & AI Visibility',
  'desc'  => 'The only platform that turns your website into LLM‑ready training signals and agentic actions. If you have a product or service, we get it mentioned in ChatGPT and AI.',
];

if (strpos($page, '/') !== false) {
    $pagePath = $page;
    $pageFile = __DIR__.'/pages/'.$pagePath.'.php';
} else {
    $valid = ['home','about','services','service','service-city','service-state','state','city-service','process-audit','audit-results','contact','contact-confirmation','thanks','quote-thanks'];
    if (!in_array($page,$valid)) $page='home';
    $pageFile = __DIR__.'/pages/'.$page.'.php';
}

ob_start();
if (file_exists($pageFile)) {
    include $pageFile;
} else {
    include __DIR__.'/pages/home.php';
}
$pageContent = ob_get_clean();

$breadcrumbsData = $GLOBALS['breadcrumbs'] ?? [];
unset($GLOBALS['breadcrumbs']);

$breadcrumbsHtml = '';
if (!empty($breadcrumbsData)) {
    $breadcrumbs = $breadcrumbsData;
    ob_start();
    include __DIR__.'/templates/breadcrumbs.php';
    $breadcrumbsHtml = ob_get_clean();
}

include __DIR__.'/templates/head.php';
include __DIR__.'/templates/header.php';

echo $breadcrumbsHtml;
echo $pageContent;

include __DIR__.'/templates/footer.php';

