<?php
require __DIR__.'/config.php';
require __DIR__.'/lib/util.php';
require __DIR__.'/lib/seo.php';

$page = $_GET['page'] ?? 'home';
$slug = $_GET['slug'] ?? null;
$city = $_GET['city'] ?? null;

// Default context
$ctx = [
  'title' => 'Neural Command — Agentic SEO & AI Visibility',
  'desc'  => 'The only platform that turns your website into LLM‑ready training signals and agentic actions. If you have a product or service, we get it mentioned in ChatGPT and AI.',
];

// Handle nested pages like resources/diagnostic
if (strpos($page, '/') !== false) {
    $pagePath = $page;
    $pageFile = __DIR__.'/pages/'.$pagePath.'.php';
} else {
    $valid = ['home','about','services','service','service-city','service-state','state','city-service','process-audit','audit-results','contact','contact-confirmation','thanks'];
    if (!in_array($page,$valid)) $page='home';
    $pageFile = __DIR__.'/pages/'.$page.'.php';
}

// Include page file first to set context (but capture output)
ob_start();
if (file_exists($pageFile)) {
    include $pageFile;
} else {
    include __DIR__.'/pages/home.php';
}
$pageContent = ob_get_clean();

// Capture breadcrumbs defined by page (if any)
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

// Output breadcrumbs (if provided) and page content
echo $breadcrumbsHtml;
echo $pageContent;

include __DIR__.'/templates/footer.php';

