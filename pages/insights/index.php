<?php
declare(strict_types=1);
require_once dirname(__DIR__, 2).'/bootstrap/canonical.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => 'Home', 'url' => Canonical::absolute('/')],
  ['label' => 'Insights'],
];

// Set page context for the main template
$ctx = [
  'title' => 'Insights — Neural Command, LLC',
  'desc' => 'Research and implementation guides on Agentic SEO, GEO-16, AI Overviews, and schema engineering.'
];

$posts = [
  [
    'title'       => 'AI Answer Engine Citation Behavior: The GEO-16 Framework Explained',
    'url'         => '/insights/geo-16-framework/',
    'description' => 'How to reach GEO ≥ 0.70 and earn cross-engine citations using structured data, semantic HTML, and freshness signals.',
    'image'       => '/assets/geo16-cover.webp',
    'date'        => '2025-10-11',
    'modified'    => '2025-10-11'
  ],
  // Add future posts here
];
?>

<main class="container mx-auto px-4 py-10">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Insights</h1>
    <p class="text-lg text-gray-700 mb-8">
      Technical briefs and deploy-ready guides on Agentic SEO and AI citation engineering.
    </p>
    
    <!-- Articles Grid -->
    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($posts as $p): ?>
        <article class="card">
          <?php if (!empty($p['image'])): ?>
            <a href="<?= $p['url'] ?>">
              <img src="<?= $p['image'] ?>" alt="<?= htmlspecialchars($p['title']) ?>" class="w-full h-48 object-cover">
            </a>
          <?php endif; ?>
          <div class="p-6">
            <h2 class="text-lg font-semibold mb-3">
              <a href="<?= $p['url'] ?>" class="hover:text-blue-600"><?= htmlspecialchars($p['title']) ?></a>
            </h2>
            <p class="text-gray-600 text-sm mb-3">
              <time datetime="<?= $p['date'] ?>"><?= date('F j, Y', strtotime($p['date'])) ?></time>
              <?php if ($p['modified'] && $p['modified'] !== $p['date']): ?>
                · Updated <time datetime="<?= $p['modified'] ?>"><?= date('F j, Y', strtotime($p['modified'])) ?></time>
              <?php endif; ?>
            </p>
            <p class="text-gray-700 text-sm"><?= htmlspecialchars($p['description']) ?></p>
          </div>
        </article>
      <?php endforeach; ?>
    </section>
  </div>
</main>

<?php
// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'CollectionPage',
    'name' => 'Insights',
    'url' => Canonical::absolute('/insights/'),
    'description' => 'Research and implementation guides on Agentic SEO, GEO-16, AI Overviews, and schema engineering.',
    'mainEntity' => [
      '@type' => 'ItemList',
      'itemListElement' => array_map(function($i, $p) {
        return [
          '@type' => 'ListItem',
          'position' => $i + 1,
          'url' => Canonical::absolute($p['url']),
          'name' => $p['title']
        ];
      }, array_keys($posts), $posts)
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>
