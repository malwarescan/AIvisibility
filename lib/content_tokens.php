<?php
declare(strict_types=1);
require_once __DIR__.'/seeded.php';

function tokens_load(): array {
  $base = require __DIR__.'/../data/tokens/base.php';
  $svc  = require __DIR__.'/../data/tokens/services.php';
  $city = require __DIR__.'/../data/tokens/cities.php';
  return ['base'=>$base,'services'=>$svc,'cities'=>$city];
}

function tokens_merge(array $base, array $override): array {
  foreach ($override as $k=>$v) {
    if (is_array($v) && isset($base[$k]) && is_array($base[$k])) {
      $base[$k] = array_values(array_unique(array_merge($base[$k], $v)));
    } else {
      $base[$k] = $v;
    }
  }
  return $base;
}

function compose_content(string $service, string $city, string $canonical): array {
  $lib = tokens_load();
  $rng = seeded_rng($canonical);

  $svc = $lib['services'][$service] ?? [];
  $cty = $lib['cities'][$city] ?? [];

  // Merge service-specific tokens with base
  $merged = tokens_merge($lib['base'], $svc);
  
  $angles   = $merged['angles'] ?? [];
  $process  = $merged['process'] ?? [];
  $benefits = $merged['benefits'] ?? [];
  $proof    = $lib['base']['proof_points'] ?? [];
  $sent     = $lib['base']['sentences'] ?? [];
  $ctas     = $lib['base']['ctas'] ?? [];
  $localP   = $cty['local'] ?? ['Local demand requires crawl efficiency and clear value proof.'];
  $nearby   = $cty['nearbys'] ?? [];

  // Deterministically pick and shuffle
  $pickAngles   = array_slice(seeded_shuffle($angles, $rng), 0, 3);
  $pickProcess  = array_slice(seeded_shuffle($process, $rng), 0, 4);
  $pickBenefits = array_slice(seeded_shuffle($benefits, $rng), 0, 4);
  $pickProof    = array_slice(seeded_shuffle($proof, $rng), 0, 5);
  $pickSents    = array_slice(seeded_shuffle($sent, $rng), 0, 5);
  $pickLocal    = array_slice(seeded_shuffle($localP, $rng), 0, 2);
  $pickNearby   = array_slice($nearby, 0, 4);
  $pickCTA      = seeded_pick($ctas, $rng);

  $serviceDisplay = ucwords(str_replace('-', ' ', $service));
  $cityDisplay    = ucwords(str_replace('-', ' ', $city));

  // Assemble intro paragraph (150-200 words)
  $intro = sprintf(
    "%s in %s requires more than keywords and backlinks. We align entity-driven architecture, comprehensive structured data, and hub-based internal linking so your pages are both discoverable and worth indexing. %s %s",
    $serviceDisplay,
    $cityDisplay,
    $pickSents[0] ?? '',
    $pickSents[1] ?? ''
  );

  // Strategic angles paragraph
  $anglesP = sprintf(
    "Our strategic approach encompasses: %s. These angles differentiate us from traditional SEO agencies still focused on keyword density and link counting.",
    implode('; ', array_map(fn($a) => strtolower($a), $pickAngles))
  );

  // Outcomes paragraph
  $outcomes = sprintf(
    "Specific outcomes we optimize for include: %s. %s",
    implode('; ', array_map(fn($b) => strtolower($b), $pickBenefits)),
    $pickSents[2] ?? ''
  );

  // Local signals paragraph
  $locals = sprintf(
    "%s businesses face unique market dynamics. %s %s These local considerations inform every aspect of our implementation strategy.",
    $cityDisplay,
    $pickLocal[0] ?? '',
    $pickLocal[1] ?? ''
  );

  // Process section (ordered list)
  $procList = "<ol>\n";
  foreach ($pickProcess as $step) {
    $procList .= "  <li>".htmlspecialchars($step, ENT_QUOTES)."</li>\n";
  }
  $procList .= "</ol>\n";
  $procList .= "<p>".htmlspecialchars($pickSents[3] ?? 'Each phase includes measurable milestones and clear success criteria.', ENT_QUOTES)."</p>";

  // Proof section (unordered list)
  $proofList = "<ul>\n";
  foreach ($pickProof as $item) {
    $proofList .= "  <li>".htmlspecialchars($item, ENT_QUOTES)."</li>\n";
  }
  $proofList .= "</ul>\n";
  $proofList .= "<p>".htmlspecialchars($pickSents[4] ?? 'These technical foundations ensure Google and AI agents can efficiently discover, parse, and trust your content.', ENT_QUOTES)."</p>";

  // FAQ content for JSON-LD enrichment
  $faqLocal = sprintf(
    "%s We tailor schema markup, entity references, and hub linking to match your specific competitive landscape and buyer expectations.",
    $pickLocal[0] ?? 'Local market dynamics shape our implementation approach.'
  );

  return [
    'intro'      => $intro,
    'angles'     => $anglesP,
    'outcomes'   => $outcomes,
    'locals'     => $locals,
    'process'    => $procList,
    'proof'      => $proofList,
    'nearby'     => $pickNearby,
    'cta'        => $pickCTA,
    'faq_local'  => $faqLocal,
  ];
}

