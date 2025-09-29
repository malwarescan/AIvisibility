<?php
require __DIR__.'/config.php';
require __DIR__.'/lib/util.php';
header('Content-Type: application/xml; charset=utf-8');

// Core pages
$urls = [
  '/', 
  '/about/', 
  '/services/', 
  '/contact/',
  '/resources/',
  '/resources/diagnostic/',
  '/quote-thanks/',
  '/thanks/',
  
  // Educational content pages
  '/what-is-google-ai-mode/',
  '/how-to-get-featured-in-ai-overviews/',
  '/why-is-my-site-not-showing-in-ai-answers/',
  '/who-controls-which-sites-ai-picks/',
  '/ai-seo-vs-traditional-seo/',
  
  // Industry pages
  '/industries/saas/',
  '/industries/healthcare/',
  
  // Case studies
  '/case-studies/crm-ai-visibility/',
  '/case-studies/healthcare-practice-ai-dominance/',
];

// Add all services
foreach(array_keys($SERVICES) as $s){ 
  $urls[] = '/services/'.$s.'/'; 
}

// Add all states
foreach(array_keys($STATES) as $sk){
  $urls[] = '/states/'.$sk.'/';
  
  // Add service×state combinations
  foreach(array_keys($SERVICES) as $s){ 
    $urls[] = '/services/'.$s.'/'.$sk.'/'; 
  }
  
  // Add service×city combinations for each state
  foreach($STATES[$sk]['cities'] as $city){
    $ck = strtolower(str_replace(' ','-',$city));
    $abbr = $STATES[$sk]['abbr'];
    foreach(array_keys($SERVICES) as $s){
      $urls[] = '/services/'.$s.'/'.$ck.'-'.$abbr.'/';
    }
  }
}

// Add service×city combinations for priority cities
foreach(array_keys($CITIES) as $c){
  foreach(array_keys($SERVICES) as $s){
    $urls[] = '/services/'.$s.'/'.$c.'/';
  }
}

// Add legacy city-service combinations
foreach(array_keys($CITIES) as $c){ 
  $urls[] = '/ai-consulting/'.$c.'/'; 
}

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
$now = gmdate('Y-m-d');
foreach($urls as $u){
  echo '<url>';
  echo '<loc>'.esc(canonical($u)).'</loc>';
  echo '<lastmod>'.$now.'</lastmod>';
  echo '<changefreq>weekly</changefreq>';
  echo '<priority>'.($u==='/'?'1.0':'0.7').'</priority>';
  echo '</url>';
}
echo '</urlset>';
?>

