<?php
declare(strict_types=1);

/**
 * Reusable JSON-LD schema builders for consistent markup across the site
 */

/**
 * Neural Command Organization schema (global)
 */
function build_organization_schema(): array {
  return [
    '@context' => 'https://schema.org',
    '@type' => 'Organization',
    '@id' => 'https://nrlcmd.com/#organization',
    'name' => 'Neural Command, LLC',
    'legalName' => 'Neural Command, LLC',
    'url' => 'https://nrlcmd.com/',
    'logo' => 'https://nrlcmd.com/logo.png',
    'telephone' => '+1-844-568-4624',
    'email' => 'hello@neuralcommandllc.com',
    'address' => [
      '@type' => 'PostalAddress',
      'streetAddress' => '1639 11th St Suite 110-A',
      'addressLocality' => 'Santa Monica',
      'addressRegion' => 'CA',
      'postalCode' => '90404',
      'addressCountry' => 'US'
    ],
    'founder' => [
      '@type' => 'Person',
      '@id' => 'https://nrlcmd.com/#creator',
      'name' => 'Joel David Maldonado'
    ],
    'sameAs' => [
      'https://www.linkedin.com/company/neural-command/'
    ]
  ];
}

/**
 * LocalBusiness schema for location-specific pages
 */
function build_local_business_schema(string $cityName, string $stateAbbr = '', string $canonical = ''): array {
  $areaServed = $cityName;
  if ($stateAbbr) {
    $areaServed = "$cityName, $stateAbbr";
  }
  
  return [
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    '@id' => ($canonical ?: 'https://nrlcmd.com/').'#localbusiness',
    'name' => 'Neural Command, LLC - '.$areaServed,
    'parentOrganization' => [
      '@type' => 'Organization',
      '@id' => 'https://nrlcmd.com/#organization',
      'name' => 'Neural Command, LLC'
    ],
    'url' => $canonical ?: 'https://nrlcmd.com/',
    'telephone' => '+1-844-568-4624',
    'email' => 'hello@neuralcommandllc.com',
    'priceRange' => '$$$',
    'address' => [
      '@type' => 'PostalAddress',
      'streetAddress' => '1639 11th St Suite 110-A',
      'addressLocality' => 'Santa Monica',
      'addressRegion' => 'CA',
      'postalCode' => '90404',
      'addressCountry' => 'US'
    ],
    'areaServed' => [
      '@type' => 'City',
      'name' => $cityName,
      'containedInPlace' => $stateAbbr ? [
        '@type' => 'State',
        'name' => $stateAbbr
      ] : null
    ],
    'geo' => null  // Can be filled if you have lat/long for each city
  ];
}

/**
 * Service schema for service offerings
 */
function build_service_schema(string $serviceName, string $serviceSlug, string $cityName, string $canonical): array {
  return [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    '@id' => $canonical.'#service',
    'name' => $serviceName.' in '.$cityName,
    'serviceType' => $serviceName,
    'description' => "Professional $serviceName services in $cityName. We help businesses dominate AI recommendation channels with agentic SEO, schema optimization, and AI visibility.",
    'provider' => [
      '@type' => 'LocalBusiness',
      '@id' => $canonical.'#localbusiness'
    ],
    'areaServed' => [
      '@type' => 'City',
      'name' => $cityName
    ],
    'url' => $canonical,
    'category' => 'SEO Services',
    'offers' => [
      '@type' => 'Offer',
      'availability' => 'https://schema.org/InStock',
      'priceSpecification' => [
        '@type' => 'PriceSpecification',
        'priceCurrency' => 'USD',
        'price' => 'Contact for pricing'
      ]
    ]
  ];
}

/**
 * BreadcrumbList schema
 */
function build_breadcrumb_schema(array $items): array {
  $listItems = [];
  foreach ($items as $position => $item) {
    $listItems[] = [
      '@type' => 'ListItem',
      'position' => $position + 1,
      'name' => $item['name'],
      'item' => $item['url']
    ];
  }
  
  return [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => $listItems
  ];
}

/**
 * WebPage schema for location pages
 */
function build_webpage_schema(string $canonical, string $title, string $description): array {
  return [
    '@context' => 'https://schema.org',
    '@type' => 'WebPage',
    '@id' => $canonical.'#webpage',
    'url' => $canonical,
    'name' => $title,
    'description' => $description,
    'isPartOf' => [
      '@type' => 'WebSite',
      '@id' => 'https://nrlcmd.com/#website',
      'url' => 'https://nrlcmd.com/',
      'name' => 'Neural Command'
    ],
    'about' => [
      '@type' => 'Organization',
      '@id' => 'https://nrlcmd.com/#organization'
    ],
    'breadcrumb' => [
      '@type' => 'BreadcrumbList',
      '@id' => $canonical.'#breadcrumb'
    ]
  ];
}

