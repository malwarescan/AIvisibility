<?php
function ld_localbusiness(){
  return [
    '@context'=>'https://schema.org',
    '@type'=>'LocalBusiness',
    'name'=>NC_NAME,
    'address'=>NC_ADDR,
    'telephone'=>NC_PHONE,
    'url'=>NC_BASEURL,
    'sameAs'=>[NC_LINKEDIN, NC_GKP],
    'potentialAction'=>[
      [
        '@type'=>'ContactAction',
        'target'=>canonical('/api/quote/'),
        'name'=>'Request a Quote'
      ],[
        '@type'=>'ReserveAction',
        'target'=>canonical('/contact/'),
        'name'=>'Book a Consultation'
      ]
    ]
  ];
}

function ld_website(){
  return [
    '@context'=>'https://schema.org',
    '@type'=>'WebSite',
    'name'=>NC_NAME,
    'url'=>NC_BASEURL,
    'potentialAction'=>[
      '@type'=>'SearchAction',
      'target'=>canonical('/?q={search_term_string}'),
      'query-input'=>'required name=search_term_string'
    ]
  ];
}

function ld_software(){
  return [
    '@context'=>'https://schema.org',
    '@type'=>'SoftwareApplication',
    'name'=>'Neural Command Agentic SEO Suite',
    'applicationCategory'=>'BusinessApplication',
    'operatingSystem'=>'Web',
    'offers'=>['@type'=>'Offer','price'=>'0','priceCurrency'=>'USD'],
  ];
}

function ld_breadcrumb($items){
  return [
    '@context'=>'https://schema.org',
    '@type'=>'BreadcrumbList',
    'itemListElement'=>array_map(function($it,$i){
      return [
        '@type'=>'ListItem','position'=>$i+1,
        'name'=>$it['name'],'item'=>$it['item']
      ];
    }, $items, array_keys($items))
  ];
}

// Build comprehensive page schema for any page type
function build_page_schema_jsonld(string $pageType, array $data = []): array {
  global $SERVICES, $CITIES, $PRICING;
  
  $currentUrl = canonical($_SERVER['REQUEST_URI']);
  
  // Default values
  $defaults = [
    'title' => 'Neural Command — Agentic SEO & AI Visibility',
    'headline' => 'Default Recommendation AI Services',
    'description' => 'Get your products, services, and brand cited by AI.',
    'serviceSlug' => 'agentic-seo',
    'cityKey' => null,
    'faqs' => []
  ];
  
  $data = array_merge($defaults, $data);
  
  // Build WebPage
  $webPageLD = [
    '@type' => 'WebPage',
    '@id' => $currentUrl.'#webpage',
    'url' => $currentUrl,
    'name' => $data['title'],
    'headline' => $data['headline'],
    'description' => $data['description'],
    'inLanguage' => 'en',
    'isPartOf' => ['@type'=>'WebSite','@id'=>NC_BASEURL.'#website','url'=>NC_BASEURL,'name'=>NC_NAME],
  ];
  
  // Build Service
  $serviceName = $SERVICES[$data['serviceSlug']]['name'] ?? $data['headline'];
  $serviceDescription = $SERVICES[$data['serviceSlug']]['short'] ?? $data['description'];
  
  if ($data['cityKey'] && isset($CITIES[$data['cityKey']])) {
    $cityName = $CITIES[$data['cityKey']]['name'];
    $serviceName = $serviceName . ' in ' . $cityName;
    $serviceDescription = $serviceDescription . ' for businesses in ' . $cityName . '.';
    $areaServed = ['@type'=>'City','name'=>$cityName];
  } else {
    $areaServed = ['@type'=>'Country','name'=>'United States'];
  }
  
  $serviceLD = [
    '@type' => 'Service',
    '@id' => $currentUrl.'#service',
    'name' => $serviceName,
    'serviceType' => 'AI brand visibility optimization',
    'description' => $serviceDescription,
    'provider' => [
      '@type' => 'Organization',
      'name' => NC_NAME,
      'url' => NC_BASEURL,
      'telephone' => NC_PHONE,
      'address' => NC_ADDR
    ],
    'areaServed' => $areaServed,
    'offers' => build_offers_jsonld($PRICING[$data['serviceSlug']] ?? [])
  ];
  
  // Build FAQ
  $faqLD = ['@context'=>'https://schema.org','@type'=>'FAQPage','mainEntity'=>[]];
  if (!empty($data['faqs'])) {
    $faqLD = build_faq_jsonld($data['faqs']);
  }
  $faqLD['@id'] = $currentUrl.'#faq';
  
  // Build Breadcrumb
  $breadcrumbItems = [
    ['name'=>'Home','item'=>canonical('/')],
    ['name'=>'Services','item'=>canonical('/services/')]
  ];
  
  if ($data['cityKey']) {
    $breadcrumbItems[] = ['name'=>$serviceName,'item'=>$currentUrl];
  } else {
    $breadcrumbItems[] = ['name'=>$serviceName,'item'=>$currentUrl];
  }
  
  $breadcrumbLD = build_breadcrumb_jsonld($breadcrumbItems);
  
  // Speakable
  $speakableLD = [
    '@type' => 'SpeakableSpecification',
    'cssSelector' => ['h1', 'section p']
  ];
  
  // Return @graph
  return [
    '@context' => 'https://schema.org',
    '@graph' => [
      $webPageLD,
      $serviceLD,
      $faqLD,
      array_merge($breadcrumbLD, ['@id'=>$currentUrl.'#breadcrumb']),
      $speakableLD
    ]
  ];
}

function ld_faq($qa){
  return [
    '@context'=>'https://schema.org','@type'=>'FAQPage',
    'mainEntity'=>array_map(function($pair){
      return [
        '@type'=>'Question','name'=>$pair[0],
        'acceptedAnswer'=>['@type'=>'Answer','text'=>$pair[1]]
      ];
    },$qa)
  ];
}

// Agentic Dataset to signal "training‑ready" assets for LLMs
function ld_agentic_dataset(){ 
  return [
    '@context'=>'https://schema.org',
    '@type'=>'Dataset',
    'name'=>'Neural Command Agentic Training Kit',
    'description'=>'Machine‑readable summaries, FAQs, and actions enabling LLMs/agents to reliably reference and act on Neural Command services.',
    'url'=>canonical('/agent.json'),
    'distribution'=>[
      ['@type'=>'DataDownload','encodingFormat'=>'application/json','contentUrl'=>canonical('/agent.json')],
      ['@type'=>'DataDownload','encodingFormat'=>'application/json','contentUrl'=>canonical('/meta.json')]
    ]
  ];
}

// Build Offer[] from $PRICING[service_slug]
function build_offers_jsonld(array $offers): array {
  $out = [];
  foreach ($offers as $o) {
    $row = ['@type'=>'Offer','priceCurrency'=>'USD'];
    if (isset($o['name'])) $row['name'] = $o['name'];
    if (isset($o['price'])) $row['price'] = (string)$o['price'];
    if (isset($o['minPrice']) || isset($o['maxPrice'])) {
      $row['priceSpecification'] = [
        '@type'=>'PriceSpecification',
        'priceCurrency'=>'USD'
      ];
      if (isset($o['minPrice'])) $row['priceSpecification']['minPrice'] = (string)$o['minPrice'];
      if (isset($o['maxPrice'])) $row['priceSpecification']['maxPrice'] = (string)$o['maxPrice'];
    }
    $row['availability'] = 'https://schema.org/InStock';
    // Optional, set a rolling validity to keep fresh:
    $row['priceValidUntil'] = date('Y-m-d', strtotime('+6 months'));
    $out[] = $row;
  }
  return $out;
}

// Build FAQPage JSON-LD from [['Q','A'], ...]
function build_faq_jsonld(array $qa): array {
  return [
    '@context'=>'https://schema.org',
    '@type'=>'FAQPage',
    'mainEntity'=>array_map(function($pair){
      return [
        '@type'=>'Question',
        'name'=>$pair[0],
        'acceptedAnswer'=>['@type'=>'Answer','text'=>$pair[1]]
      ];
    }, $qa)
  ];
}

// Breadcrumb
function build_breadcrumb_jsonld(array $items): array {
  return [
    '@context'=>'https://schema.org',
    '@type'=>'BreadcrumbList',
    'itemListElement'=>array_map(function($it,$i){
      return [
        '@type'=>'ListItem',
        'position'=>$i+1,
        'name'=>$it['name'],
        'item'=>$it['item']
      ];
    }, $items, array_keys($items))
  ];
}

// Service JSON-LD (works for both generic service page and city+service page)
function build_service_jsonld(string $serviceName, string $serviceType, array $offers, ?string $cityName=null): array {
  $ld = [
    '@context'=>'https://schema.org',
    '@type'=>'Service',
    'name'=>$serviceName,
    'serviceType'=>$serviceType,
    'provider'=>[
      '@type'=>'Organization',
      'name'=>NC_NAME,
      'url'=>NC_BASEURL,
      'telephone'=>NC_PHONE,
      'address'=>NC_ADDR
    ],
    'offers'=>$offers
  ];
  if ($cityName) {
    $ld['areaServed'] = ['@type'=>'City','name'=>$cityName];
    $ld['name'] = $serviceName.' — '.$cityName; // e.g., "Agentic SEO — New York, NY"
  } else {
    $ld['areaServed'] = ['@type'=>'Country','name'=>'United States'];
  }
  return $ld;
}

