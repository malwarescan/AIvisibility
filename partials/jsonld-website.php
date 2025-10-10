<?php
declare(strict_types=1);
?>
<script type="application/ld+json">
<?php
echo json_encode([
  "@context"=>"https://schema.org",
  "@type"=>"WebSite",
  "@id"=>"https://nrlcmd.com/#website",
  "url"=>"https://nrlcmd.com/",
  "name"=>"Neural Command, LLC",
  "alternateName"=>["Agentic SEO","ChatGPT Optimization","LLM Visibility","Generative Engine Optimization"],
  "potentialAction"=>[
    [
      "@type"=>"SearchAction",
      "target"=>"https://nrlcmd.com/?q={search_term_string}",
      "query-input"=>"required name=search_term_string"
    ],
    [
      "@type"=>"ReserveAction",
      "@id"=>"https://nrlcmd.com/#bookConsultAction",
      "name"=>"Book a consultation",
      "target"=>[
        "@type"=>"EntryPoint",
        "urlTemplate"=>"https://nrlcmd.com/api/book",
        "httpMethod"=>"POST",
        "encodingType"=>"application/json"
      ]
    ],
    [
      "@type"=>"QuoteAction",
      "@id"=>"https://nrlcmd.com/#requestQuoteAction",
      "name"=>"Request a project quote",
      "target"=>[
        "@type"=>"EntryPoint",
        "urlTemplate"=>"https://nrlcmd.com/api/quote",
        "httpMethod"=>"POST",
        "encodingType"=>"application/json"
      ]
    ],
    [
      "@type"=>"AssessAction",
      "@id"=>"https://nrlcmd.com/#visibilityAuditAction",
      "name"=>"AI visibility audit",
      "target"=>[
        "@type"=>"EntryPoint",
        "urlTemplate"=>"https://nrlcmd.com/api/audit",
        "httpMethod"=>"POST",
        "encodingType"=>"application/json"
      ]
    ]
  ]
], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
?>
</script>
