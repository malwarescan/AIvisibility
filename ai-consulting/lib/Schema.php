<?php
// /ai-consulting/lib/Schema.php
declare(strict_types=1);

final class Schema {
  /** Echo a JSON-LD script tag */
  public static function emit(array $node): void {
    echo '<script type="application/ld+json">'.PHP_EOL;
    echo json_encode($node, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
    echo '</script>'.PHP_EOL;
  }

  public static function website(): array {
    return [
      "@context" => "https://schema.org",
      "@type" => "WebSite",
      "@id" => "https://nrlcmd.com/#website",
      "url" => "https://nrlcmd.com/",
      "name" => "Neural Command, LLC",
      "alternateName" => [
        "Agentic SEO","ChatGPT Optimization","LLM Visibility","Generative Engine Optimization"
      ],
      "potentialAction" => [
        [
          "@type" => "SearchAction",
          "target" => "https://nrlcmd.com/?q={search_term_string}",
          "query-input" => "required name=search_term_string"
        ],
        [
          "@type" => "ReserveAction",
          "@id" => "https://nrlcmd.com/#bookConsultAction",
          "name" => "Book a consultation",
          "target" => [
            "@type" => "EntryPoint",
            "urlTemplate" => "https://nrlcmd.com/api/book",
            "httpMethod" => "POST",
            "encodingType" => "application/json"
          ]
        ],
        [
          "@type" => "QuoteAction",
          "@id" => "https://nrlcmd.com/#requestQuoteAction",
          "name" => "Request a project quote",
          "target" => [
            "@type" => "EntryPoint",
            "urlTemplate" => "https://nrlcmd.com/api/quote",
            "httpMethod" => "POST",
            "encodingType" => "application/json"
          ]
        ],
        [
          "@type" => "AssessAction",
          "@id" => "https://nrlcmd.com/#visibilityAuditAction",
          "name" => "AI visibility audit",
          "target" => [
            "@type" => "EntryPoint",
            "urlTemplate" => "https://nrlcmd.com/api/audit",
            "httpMethod" => "POST",
            "encodingType" => "application/json"
          ]
        ]
      ]
    ];
  }

  public static function localBusiness(array $city): array {
    return [
      "@context" => "https://schema.org",
      "@type" => "LocalBusiness",
      "@id" => "https://nrlcmd.com/#org",
      "name" => "Neural Command, LLC",
      "url" => "https://nrlcmd.com/",
      "telephone" => "+1-844-568-4624",
      "address" => [
        "@type" => "PostalAddress",
        "streetAddress" => "1639 11th St Suite 110-A",
        "addressLocality" => "Santa Monica",
        "addressRegion" => "CA",
        "postalCode" => "90404",
        "addressCountry" => "US"
      ],
      "areaServed" => array_values(array_filter([$city['city'], $city['region'], $city['country']])),
      "sameAs" => ["https://www.linkedin.com/company/neural-command/"],
      "makesOffer" => [[
        "@type" => "Offer",
        "itemOffered" => [ "@type" => "Service", "name" => $city['alt_service'] ?: "Agentic SEO" ],
        "priceCurrency" => "USD"
      ]],
      "potentialAction" => [
        [ "@id" => "https://nrlcmd.com/#bookConsultAction" ],
        [ "@id" => "https://nrlcmd.com/#requestQuoteAction" ],
        [ "@id" => "https://nrlcmd.com/#visibilityAuditAction" ]
      ]
    ];
  }

  public static function service(array $city): array {
    $slug = $city['slug'];
    return [
      "@context" => "https://schema.org",
      "@type" => "Service",
      "@id" => "https://nrlcmd.com/ai-consulting/{$slug}/#service",
      "serviceType" => $city['alt_service'] ?: "Agentic SEO",
      "provider" => [ "@id" => "https://nrlcmd.com/#org" ],
      "areaServed" => array_values(array_filter([$city['city'], $city['region'], $city['country']])),
      "potentialAction" => [
        [ "@id" => "https://nrlcmd.com/#requestQuoteAction" ]
      ]
    ];
  }

  public static function faq(string $url, array $faqs): array {
    $main = [];
    foreach ($faqs as [$q, $a]) {
      $main[] = [
        "@type" => "Question",
        "name" => $q,
        "acceptedAnswer" => [ "@type" => "Answer", "text" => $a ]
      ];
    }
    return [
      "@context" => "https://schema.org",
      "@type" => "FAQPage",
      "@id" => "{$url}#faq",
      "mainEntity" => $main
    ];
  }

  public static function breadcrumb(array $crumbs): array {
    $items = [];
    $pos = 1;
    foreach ($crumbs as $name => $url) {
      $items[] = [
        "@type" => "ListItem",
        "position" => $pos++,
        "name" => $name,
        "item" => $url
      ];
    }
    return [
      "@context" => "https://schema.org",
      "@type" => "BreadcrumbList",
      "itemListElement" => $items
    ];
  }
}
