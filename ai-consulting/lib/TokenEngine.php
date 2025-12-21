<?php
// /ai-consulting/lib/TokenEngine.php
declare(strict_types=1);

final class TokenEngine {
  /** Deterministic filler based on slug */
  public static function seed(string $slug): int {
    return crc32($slug);
  }

  public static function pick(array $variants, int $seed): string {
    if (empty($variants)) return '';
    $idx = $seed % count($variants);
    return $variants[$idx];
  }

  public static function intro(string $city, string $region, string $service, int $seed, array $cityData = []): string {
    $painPoint = $cityData['pain_point'] ?? 'AI Overviews visibility';
    $tagline = $cityData['tagline'] ?? 'booked clients via AI search';
    
    $openers = [
      "Deploy AI that actually moves revenue in {$city}",
      "Operationalize Agentic SEO for faster wins in {$city}",
      "Turn {$city} searches into booked work with structured AI"
    ];
    $benefits = [
      "structured data coverage, agent-ready actions, and clean SSR",
      "JSON-LD completeness, query-aligned copy, and internal links that rank",
      "AEO-first templates, validated schema, and task-level endpoints"
    ];
    $closers = [
      "This is how teams in {$city} ship outcomes in weeks, not quarters.",
      "It's the shortest path to AI Overview eligibility in {$city}.",
      "Built to pass Rich Results and power agent handoffs by default."
    ];

    $intro = self::pick($openers, $seed) . " using {$service}. We solve {$painPoint} and implement " .
             self::pick($benefits, $seed + 1) . ". " . self::pick($closers, $seed + 2) . 
             " Our approach delivers {$tagline}.";

    return $intro;
  }

  /** 3–5 deterministic FAQs */
  public static function faqs(string $city, string $service, int $seed, array $cityData = []): array {
    $painPoint = $cityData['pain_point'] ?? 'AI Overviews visibility';
    $tagline = $cityData['tagline'] ?? 'booked clients via AI search';
    
    $q = [
      ["What is Agentic SEO in {$city}?", "It's the practice of making your site machine-actionable for AI systems in {$city} by exposing structured tasks (book, quote, audit), complete JSON-LD, and SSR content that agents can reliably parse and invoke."],
      ["How fast can we implement in {$city}?", "If your endpoints exist, most clients ship core schema, agent manifest, and city pages within one sprint. We stage, validate in Rich Results, and deploy incrementally by priority."],
      ["How is {$service} different from generic SEO?", "{$service} aligns page copy, internal links, and JSON-LD with agent-callable actions so AI systems can recommend and execute tasks, not just cite content."],
      ["Will this help Google AI Overviews?", "It makes your pages eligible by improving entity clarity, schema coverage, and task affordances. While inclusion isn't guaranteed, this is the architecture Overviews look for."],
      ["What KPIs improve first?", "Typically impressions for service+city terms, CTR via stronger titles/meta, and qualified leads driven by clear task CTAs tied to `book`, `quote`, and `audit`."],
      ["How do you address {$painPoint}?", "We tackle {$painPoint} through targeted schema implementation, content optimization, and technical fixes that directly impact your visibility in {$city}."],
      ["What outcomes can we expect?", "Our clients see measurable improvements in {$tagline}, with faster indexing, better rankings, and increased qualified traffic from AI-powered search."]
    ];
    // deterministically pick 3–5
    $count = 3 + ($seed % 3);
    shuffle($q);
    return array_slice($q, 0, $count);
  }
}
