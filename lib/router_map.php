<?php

function resolve_route(string $uri): array {
    $path = parse_url($uri, PHP_URL_PATH) ?? '/';

    $result = [
        'page' => 'home',
        'slug' => null,
        'city' => null,
        'state' => null,
        'include' => null,
    ];

    switch (true) {
        case $path === '/':
            $result['page'] = 'home';
            break;
        case $path === '/about/':
            $result['page'] = 'about';
            break;
        case $path === '/services/':
            $result['page'] = 'services';
            break;
        case preg_match('/^\/services\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/', $path, $matches):
            $slug = $matches[1];
            $second = $matches[2];
            $statePatterns = ['california', 'texas', 'florida', 'new-york', 'washington', 'illinois', 'massachusetts', 'georgia', 'north-carolina', 'michigan', 'virginia', 'tennessee', 'arizona', 'colorado', 'oregon'];
            if (in_array($second, $statePatterns, true)) {
                $result['page'] = 'service-state';
                $result['state'] = $second;
            } else {
                $result['page'] = 'service-city';
                $result['city'] = $second;
            }
            $result['slug'] = $slug;
            break;
        case preg_match('/^\/services\/([a-z0-9-]+)\/?$/', $path, $matches):
            $result['page'] = 'service';
            $result['slug'] = $matches[1];
            break;
        case preg_match('/^\/states\/([a-z0-9-]+)\/?$/', $path, $matches):
            $result['page'] = 'state';
            $result['state'] = $matches[1];
            break;
        case preg_match('/^\/ai-consulting\/([a-z0-9-]+)\/?$/', $path, $matches):
            $result['page'] = 'city-service';
            $result['city'] = $matches[1];
            break;
        case $path === '/resources/diagnostic/':
            $result['page'] = 'resources/diagnostic';
            break;
        case $path === '/process-audit/':
            $result['include'] = __DIR__ . '/../pages/process-audit.php';
            break;
        case $path === '/audit-results/':
            $result['page'] = 'audit-results';
            break;
        case $path === '/contact/':
            $result['page'] = 'contact';
            break;
        case $path === '/process-contact/':
            $result['include'] = __DIR__ . '/../pages/process-contact.php';
            break;
        case $path === '/thanks/':
            $result['page'] = 'thanks';
            break;
        case $path === '/quote-thanks/':
            $result['page'] = 'quote-thanks';
            break;
        case $path === '/contact-confirmation/':
            $result['page'] = 'contact-confirmation';
            break;
        case $path === '/what-is-google-ai-mode/':
            $result['page'] = 'what-is-google-ai-mode';
            break;
        case $path === '/how-to-get-featured-in-ai-overviews/':
            $result['page'] = 'how-to-get-featured-in-ai-overviews';
            break;
        case $path === '/why-is-my-site-not-showing-in-ai-answers/':
            $result['page'] = 'why-is-my-site-not-showing-in-ai-answers';
            break;
        case $path === '/who-controls-which-sites-ai-picks/':
            $result['page'] = 'who-controls-which-sites-ai-picks';
            break;
        case $path === '/ai-seo-vs-traditional-seo/':
            $result['page'] = 'ai-seo-vs-traditional-seo';
            break;
        case $path === '/resources/':
            $result['page'] = 'resources';
            break;
        case $path === '/industries/saas/':
            $result['page'] = 'industries/saas';
            break;
        case $path === '/industries/healthcare/':
            $result['page'] = 'industries/healthcare';
            break;
        case $path === '/case-studies/crm-ai-visibility/':
            $result['page'] = 'case-studies/crm-ai-visibility';
            break;
        case $path === '/case-studies/healthcare-practice-ai-dominance/':
            $result['page'] = 'case-studies/healthcare-practice-ai-dominance';
            break;
        case $path === '/sitemap.xml':
            $result['include'] = __DIR__ . '/../sitemap.xml.php';
            break;
        case $path === '/agent.json':
            $result['include'] = __DIR__ . '/../agent.json';
            break;
        case $path === '/meta.json':
            $result['include'] = __DIR__ . '/../meta.json';
            break;
        case preg_match('/^\/api\/([a-z]+)\/?$/', $path, $matches):
            $apiFile = __DIR__ . '/../api/' . $matches[1] . '.php';
            if (file_exists($apiFile)) {
                $result['include'] = $apiFile;
            }
            break;
    }

    return $result;
}


