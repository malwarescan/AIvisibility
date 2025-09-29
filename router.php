<?php
// Simple router for PHP built-in server
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle static files
if (file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false; // Serve the file directly
}

// Route to index.php with page parameter
$page = 'home';
$slug = null;
$city = null;
$state = null;

switch ($uri) {
    case '/':
        $page = 'home';
        break;
    case '/about/':
        $page = 'about';
        break;
    case '/services/':
        $page = 'services';
        break;
    case preg_match('/^\/services\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/', $uri, $matches) ? true : false:
        // Check if second parameter is a state or city
        $slug = $matches[1];
        $secondParam = $matches[2];
        
        // Common state patterns (without hyphens)
        $statePatterns = ['california', 'texas', 'florida', 'new-york', 'washington', 'illinois', 'massachusetts', 'georgia', 'north-carolina', 'michigan', 'virginia', 'tennessee', 'arizona', 'colorado', 'oregon'];
        
        // If it's a state key, treat as service-state
        if (in_array($secondParam, $statePatterns)) {
            $page = 'service-state';
            $state = $secondParam;
        } else {
            // Otherwise treat as service-city
            $page = 'service-city';
            $city = $secondParam;
        }
        break;
    case preg_match('/^\/services\/([a-z0-9-]+)\/?$/', $uri, $matches) ? true : false:
        $page = 'service';
        $slug = $matches[1];
        break;
    case preg_match('/^\/states\/([a-z0-9-]+)\/?$/', $uri, $matches) ? true : false:
        $page = 'state';
        $state = $matches[1];
        break;
    case preg_match('/^\/ai-consulting\/([a-z0-9-]+)\/?$/', $uri, $matches) ? true : false:
        $page = 'city-service';
        $city = $matches[1];
        break;
    case '/resources/diagnostic/':
        $page = 'resources/diagnostic';
        break;
    case '/process-audit/':
        include __DIR__ . '/pages/process-audit.php';
        exit;
    case '/audit-results/':
        $page = 'audit-results';
        break;
    case '/contact/':
        $page = 'contact';
        break;
    case '/process-contact/':
        include __DIR__ . '/pages/process-contact.php';
        exit;
    case '/thanks/':
        $page = 'thanks';
        break;
    case '/quote-thanks/':
        $page = 'quote-thanks';
        break;
    case '/contact-confirmation/':
        $page = 'contact-confirmation';
        break;
    case '/what-is-google-ai-mode/':
        $page = 'what-is-google-ai-mode';
        break;
    case '/how-to-get-featured-in-ai-overviews/':
        $page = 'how-to-get-featured-in-ai-overviews';
        break;
    case '/why-is-my-site-not-showing-in-ai-answers/':
        $page = 'why-is-my-site-not-showing-in-ai-answers';
        break;
    case '/who-controls-which-sites-ai-picks/':
        $page = 'who-controls-which-sites-ai-picks';
        break;
    case '/ai-seo-vs-traditional-seo/':
        $page = 'ai-seo-vs-traditional-seo';
        break;
    case '/resources/':
        $page = 'resources';
        break;
    case '/industries/saas/':
        $page = 'industries/saas';
        break;
    case '/industries/healthcare/':
        $page = 'industries/healthcare';
        break;
    case '/case-studies/crm-ai-visibility/':
        $page = 'case-studies/crm-ai-visibility';
        break;
    case '/case-studies/healthcare-practice-ai-dominance/':
        $page = 'case-studies/healthcare-practice-ai-dominance';
        break;
    case '/sitemap.xml':
        include __DIR__ . '/sitemap.xml.php';
        exit;
    case '/agent.json':
        include __DIR__ . '/agent.json';
        exit;
    case '/meta.json':
        include __DIR__ . '/meta.json';
        exit;
    case preg_match('/^\/api\/([a-z]+)\/?$/', $uri, $matches) ? true : false:
        $api = $matches[1];
        if (file_exists(__DIR__ . "/api/$api.php")) {
            include __DIR__ . "/api/$api.php";
            exit;
        }
        break;
}

// Set parameters for index.php
$_GET['page'] = $page;
if ($slug) $_GET['slug'] = $slug;
if ($city) $_GET['city'] = $city;
if ($state) $_GET['state'] = $state;

// Include index.php
include __DIR__ . '/index.php';
?>
