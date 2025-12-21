<?php
declare(strict_types=1);
require_once dirname(__DIR__, 3).'/bootstrap/canonical.php';

// Set breadcrumbs for the main template
$breadcrumbs = [
  ['label' => '홈', 'url' => Canonical::absolute('/')],
  ['label' => '인사이트', 'url' => Canonical::absolute('/insights/')],
  ['label' => 'GEO-16 프레임워크'],
];

// Set page context for the main template
$ctx = [
  'title' => 'AI 답변 엔진 인용 행동: GEO-16 프레임워크 설명 | Neural Command',
  'desc' => 'Neural Command, LLC가 구조화된 데이터, 시맨틱 HTML, 메타데이터 신선도를 통해 AI 인용 가능성을 개선하는 16개 기둥 모델인 GEO-16을 설명합니다.',
  'lang' => 'ko',
  'hreflang' => [
    ['hreflang' => 'en', 'href' => Canonical::absolute('/insights/geo-16-framework/')],
    ['hreflang' => 'ko', 'href' => Canonical::absolute('/insights/geo-16-framework/ko/')],
    ['hreflang' => 'x-default', 'href' => Canonical::absolute('/insights/geo-16-framework/')]
  ]
];

$published = '2025-10-11';
$modified = '2025-10-11';
$author_name = 'Neural Command, LLC';
$cover_img = '/assets/geo16-cover.webp';
?>

<main class="container mx-auto px-4 py-10">
  <div class="max-w-4xl mx-auto">
    <!-- Article Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">AI 답변 엔진 인용 행동: GEO-16 프레임워크 설명</h1>
      <p class="text-gray-600 mb-4">By <?= htmlspecialchars($author_name) ?> — Santa Monica, CA</p>
      <p class="text-sm text-gray-500 mb-6">
        게시일 <time datetime="<?= $published ?>"><?= date('Y년 m월 j일', strtotime($published)) ?></time> · 
        업데이트 <time datetime="<?= $modified ?>"><?= date('Y년 m월 j일', strtotime($modified)) ?></time>
      </p>
      
      <!-- Interactive GEO-16 Algorithm Visualization -->
      <div class="bg-gray-900 p-6 rounded-lg mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">대화형 GEO-16 프레임워크 알고리즘</h3>
        <div class="mermaid">
flowchart TD
    A["시작<br/>페이지 입력"] --> B["메타데이터_검사<br/>• datePublished<br/>• dateModified<br/>• ETag<br/>• sitemap_lastmod"]
    A --> C["시맨틱_HTML_검사<br/>• single_h1<br/>• logical_h2_h3<br/>• descriptive_anchors<br/>• accessible_lists"]
    A --> D["구조화된_데이터_검사<br/>• valid_jsonld<br/>• matches_content<br/>• has_breadcrumbs<br/>• canonical_present"]
    
    B --> E["출처_검사<br/>• authoritative_refs<br/>• link_validation<br/>• trust_indicators"]
    C --> F["위험_관리_검사<br/>• content_quality<br/>• spam_signals<br/>• user_experience"]
    D --> G["RAG_적합성_검사<br/>• machine_readable<br/>• parsing_optimized<br/>• ai_friendly"]
    
    E --> H["GEO_점수_계산<br/>score = active_pillars / 16 * 100<br/>IF score >= 70 AND active_pillars >= 12"]
    F --> H
    G --> H
    
    H --> I["Brave Summary<br/>78% 인용률<br/>GEO: 0.727"]
    H --> J["Google AI Overviews<br/>72% 인용률<br/>GEO: 0.687"]
    H --> K["Perplexity<br/>45% 인용률<br/>GEO: 0.300"]
    
    classDef startNode fill:#00ff00,stroke:#333,stroke-width:2px,color:#000
    classDef checkNode fill:#0066cc,stroke:#333,stroke-width:2px,color:#fff
    classDef calcNode fill:#ffff00,stroke:#333,stroke-width:2px,color:#000
    classDef outputNode fill:#ff6600,stroke:#333,stroke-width:2px,color:#fff
    
    class A startNode
    class B,C,D,E,F,G checkNode
    class H calcNode
    class I,J,K outputNode
        </div>
        
        <!-- Node Details Panel -->
        <div id="node-details" class="mt-4">
          <div class="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 class="text-white font-semibold mb-2">위의 노드를 클릭하세요</h4>
            <p class="text-gray-300 text-sm">플로우차트에서 노드를 선택하여 GEO-16 프레임워크 알고리즘의 해당 단계에 대한 자세한 정보를 확인하세요.</p>
          </div>
        </div>
        
        <p class="text-gray-400 text-sm mt-2">노드를 클릭하여 알고리즘 흐름을 탐색하세요. 각 노드는 GEO-16 프레임워크의 검사를 나타냅니다.</p>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      <div class="bg-gray-50 border border-gray-200 p-8 rounded-lg mb-8">
        <p class="text-lg font-medium mb-0 leading-relaxed">
          <strong>요약.</strong> AI 답변 엔진은 파싱, 신뢰, 검증할 수 있는 페이지를 인용합니다. GEO-16 임계값(G≥0.70, ≥12 기둥 히트)을 충족하고, JSON-LD를 검증하며, 시맨틱 HTML을 강제하고, 실제 날짜로 신선도를 노출하고, 출처를 유지하세요. 온페이지 우수성과 획득 미디어를 결합하세요.
        </p>
      </div>

      <h2 id="era" class="text-2xl font-semibold mt-8 mb-4">새로운 가시성 시대</h2>
      <p class="mb-6">Google AI Overviews, Brave Summary, Perplexity와 같은 생성 엔진은 이제 답변을 종합하고 소수의 소스만 인용합니다. 순위가 아닌 인용이 새로운 배포입니다. 우리의 역할은 모델이 선택하는 신뢰할 수 있는 소스로 귀하의 페이지를 만드는 것입니다.</p>

      <h2 id="geo16" class="text-2xl font-semibold mt-8 mb-4">GEO-16 설명</h2>
      <p class="mb-6">GEO-16은 온페이지 품질을 인용 행동에 연결하는 16개 기둥 점수 모델입니다. 여섯 가지 원칙을 운영화합니다: 사람 중심 답변, 구조화된 데이터, 출처, 신선도, 위험 관리, RAG 적합성.</p>

      <h3 id="pillars" class="text-xl font-semibold mt-6 mb-4">최고 영향 기둥</h3>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2"><strong>메타데이터 및 신선도:</strong> 보이는 타임스탬프와 기계 판독 가능한 날짜 (datePublished, dateModified, ETag, 사이트맵).</li>
        <li class="mb-2"><strong>시맨틱 HTML:</strong> 단일 <code class="bg-gray-100 px-2 py-1 rounded">&lt;h1&gt;</code>, 논리적 <code class="bg-gray-100 px-2 py-1 rounded">&lt;h2&gt;</code>/<code class="bg-gray-100 px-2 py-1 rounded">&lt;h3&gt;</code>, 설명적 앵커, 접근 가능한 목록/테이블.</li>
        <li class="mb-2"><strong>구조화된 데이터:</strong> 보이는 콘텐츠와 일치하는 유효한 JSON-LD (Article/FAQPage/Product/LocalBusiness/Breadcrumb).</li>
      </ul>

      <h2 id="results" class="text-2xl font-semibold mt-8 mb-4">데이터가 보여주는 것</h2>
      <div class="overflow-x-auto mb-6">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-50">
              <th class="border border-gray-300 px-4 py-2 text-left">엔진</th>
              <th class="border border-gray-300 px-4 py-2 text-left">평균 GEO</th>
              <th class="border border-gray-300 px-4 py-2 text-left">인용률</th>
              <th class="border border-gray-300 px-4 py-2 text-left">평균 기둥 히트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Brave Summary</td>
              <td class="border border-gray-300 px-4 py-2">0.727</td>
              <td class="border border-gray-300 px-4 py-2">78%</td>
              <td class="border border-gray-300 px-4 py-2">11.6</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Google AI Overviews</td>
              <td class="border border-gray-300 px-4 py-2">0.687</td>
              <td class="border border-gray-300 px-4 py-2">72%</td>
              <td class="border border-gray-300 px-4 py-2">11.0</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Perplexity</td>
              <td class="border border-gray-300 px-4 py-2">0.300</td>
              <td class="border border-gray-300 px-4 py-2">45%</td>
              <td class="border border-gray-300 px-4 py-2">4.8</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mb-6"><strong>임계값:</strong> G ≥ 0.70 및 ≥ 12 기둥 히트는 크로스 엔진 인용의 강한 증가와 연관됩니다. 더 높은 GEO 점수로 인용 확률이 ~4.2배 증가합니다.</p>

      <h2 id="strategy" class="text-2xl font-semibold mt-8 mb-4">Neural Command에서 이를 구현하는 방법</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">템플릿당 자동화된 스키마 검증 및 주입 (Article, FAQPage, Breadcrumb, WebSite).</li>
        <li class="mb-2">시맨틱 계층 구조 린팅 및 내부 링크 진단.</li>
        <li class="mb-2">신선도 강제 — 보이는 타임스탬프, JSON-LD 날짜, 사이트맵 <code class="bg-gray-100 px-2 py-1 rounded">lastmod</code>.</li>
        <li class="mb-2">출처 검사 — 권위 있는 참조, 링크 부패 스윕, 정규 펜싱.</li>
      </ul>

      <h3 id="services" class="text-xl font-semibold mt-6 mb-4">관련 서비스</h3>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2"><a href="/services/generative-engine-optimization/" class="text-blue-600 hover:underline">생성 엔진 최적화 (GEO)</a></li>
        <li class="mb-2"><a href="/services/agentic-seo/" class="text-blue-600 hover:underline">에이전틱 SEO</a></li>
        <li class="mb-2"><a href="/services/schema-optimizer/" class="text-blue-600 hover:underline">스키마 최적화</a></li>
        <li class="mb-2"><a href="/services/ai-consulting/" class="text-blue-600 hover:underline">AI 발견 및 인용 전략</a></li>
      </ul>

      <h2 id="faq" class="text-2xl font-semibold mt-8 mb-4">자주 묻는 질문</h2>
      <dl class="space-y-4">
        <dt class="font-semibold">JSON-LD가 AI 인용으로의 직접 파이프라인인가요?</dt>
        <dd class="ml-4 mb-4">페이지를 해석하기 위해 답변 엔진이 의존하는 기계 인터페이스입니다. 유효하고 완전하며 보이는 콘텐츠와 일치해야 합니다. 그 자체로 인용을 보장하지는 않습니다. 획득된 권위와 온페이지 품질이 여전히 중요합니다.</dd>

        <dt class="font-semibold">최신성이 정말 중요한가요?</dt>
        <dd class="ml-4 mb-4">네. 보이는 날짜 + 기계 판독 가능한 <code class="bg-gray-100 px-2 py-1 rounded">dateModified</code> 및 사이트맵은 더 높은 인용 확률과 상관관계가 있는 신선도 신호에 기여합니다.</dd>

        <dt class="font-semibold">소셜 콘텐츠는 어떻나요?</dt>
        <dd class="ml-4 mb-4">소셜 플랫폼은 AI 답변에서 거의 인용되지 않습니다. 권위 있는 도메인의 획득 미디어와 잘 구조화된 소유 페이지가 인용 가능성 측면에서 소셜 게시물보다 성능이 우수합니다.</dd>
      </dl>
    </article>
  </div>
</main>

<?php
// Service-specific JSON-LD schemas
$serviceSchemas = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Article',
    'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => Canonical::absolute('/insights/geo-16-framework/ko/')],
    'headline' => 'AI 답변 엔진 인용 행동: GEO-16 프레임워크 설명',
    'description' => 'Neural Command, LLC가 구조화된 데이터, 시맨틱 HTML, 메타데이터 신선도를 통해 AI 인용 가능성을 개선하는 16개 기둥 모델인 GEO-16을 설명합니다.',
    'image' => [Canonical::absolute($cover_img)],
    'author' => ['@type' => 'Organization', 'name' => $author_name, 'url' => Canonical::absolute('/')],
    'publisher' => ['@type' => 'Organization', 'name' => 'Neural Command, LLC', 'logo' => ['@type' => 'ImageObject', 'url' => Canonical::absolute('/assets/logo.png')]],
    'datePublished' => $published,
    'dateModified' => $modified,
    'articleSection' => 'AI 검색 최적화',
    'keywords' => ['GEO-16 프레임워크', 'AI 답변 엔진', '에이전틱 SEO', '구조화된 데이터', 'AI 개요'],
    'inLanguage' => 'ko-KR'
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => [
      [
        '@type' => 'Question',
        'name' => 'GEO-16이란 무엇인가요?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'AI 답변 엔진이 페이지를 인용할지에 영향을 미치는 온페이지 신호를 측정하는 16개 기둥 프레임워크입니다: 시맨틱 HTML, 구조화된 데이터, 신선도 메타데이터, 출처, UX 등.']
      ],
      [
        '@type' => 'Question',
        'name' => 'AI 인용 확률을 개선하는 임계값은 무엇인가요?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => '최소 0.70의 GEO 점수와 12개 이상의 활성 기둥을 가진 페이지는 2025년 연구에서 ~78%의 크로스 엔진 인용률을 보였습니다.']
      ],
      [
        '@type' => 'Question',
        'name' => '가장 중요한 기둥은 무엇인가요?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => '메타데이터 및 신선도, 시맨틱 HTML, 구조화된 데이터가 인용 가능성과 가장 강한 상관관계를 보였습니다.']
      ],
      [
        '@type' => 'Question',
        'name' => '구조화된 데이터가 필요한가요?',
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => '검증된 JSON-LD는 AI 파서를 위한 직접 파이프라인입니다. 보이는 콘텐츠와 일치하고 정확한 날짜, 브레드크럼, 정규 신호를 포함해야 합니다.']
      ]
    ]
  ]
];

// Add service schemas to global array for template rendering
$GLOBALS['serviceSchemas'] = $serviceSchemas;
?>

<!-- CSS for interactive highlighting and responsiveness -->
<style>
.mermaid {
  width: 100%;
  height: auto;
  overflow: visible;
}
.mermaid svg {
  width: 100% !important;
  height: auto !important;
  max-width: 100% !important;
  overflow: visible !important;
}
.mermaid .node.highlighted {
  filter: brightness(1.3) drop-shadow(0 0 8px #00ff00);
  stroke-width: 4px !important;
  stroke: #00ff00 !important;
}
.mermaid .node {
  transition: all 0.3s ease;
  cursor: pointer;
}
.mermaid .node:hover {
  filter: brightness(1.1);
}
/* Responsive text sizing */
@media (max-width: 768px) {
  .mermaid svg {
    font-size: 12px !important;
  }
}
@media (max-width: 480px) {
  .mermaid svg {
    font-size: 10px !important;
  }
}
</style>

<!-- Mermaid.js for interactive flowchart -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  mermaid.initialize({ 
    startOnLoad: true,
    theme: 'dark',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    securityLevel: 'loose',
    maxTextSize: 50000,
    maxEdges: 1000
  });
  
  // Add interactivity after Mermaid renders
  setTimeout(function() {
    console.log('Adding interactivity to Mermaid flowchart...');
    
    // Try multiple selectors to find nodes
    const selectors = [
      '.mermaid .node',
      '.mermaid .nodeLabel',
      '.mermaid g.node',
      '.mermaid rect',
      '.mermaid .flowchart-label'
    ];
    
    let nodes = [];
    for (let selector of selectors) {
      nodes = document.querySelectorAll(selector);
      if (nodes.length > 0) {
        console.log(`Found ${nodes.length} nodes with selector: ${selector}`);
        break;
      }
    }
    
    const detailsDiv = document.getElementById('node-details');
    
    if (nodes.length === 0) {
      console.log('No nodes found, trying alternative approach...');
      // Try to find any clickable elements in the mermaid diagram
      const mermaidDiv = document.querySelector('.mermaid');
      if (mermaidDiv) {
        const allElements = mermaidDiv.querySelectorAll('*');
        console.log(`Found ${allElements.length} elements in mermaid diagram`);
        
        // Add click handler to the entire mermaid div
        mermaidDiv.addEventListener('click', function(e) {
          console.log('Mermaid diagram clicked');
          if (detailsDiv) {
            detailsDiv.innerHTML = `
              <div class="bg-gray-800 p-4 rounded border border-gray-600">
                <h4 class="text-white font-semibold mb-2">GEO-16 프레임워크</h4>
                <p class="text-gray-300 text-sm">AI 인용 최적화를 위한 16개 기둥 GEO 프레임워크를 보여주는 대화형 플로우차트입니다. 다이어그램의 어디든 클릭하여 탐색하세요.</p>
              </div>
            `;
          }
        });
      }
    } else {
      nodes.forEach((node, index) => {
        node.style.cursor = 'pointer';
        node.addEventListener('click', function() {
          console.log(`Node ${index} clicked`);
          const nodeId = this.id || `node-${index}`;
          const nodeText = this.textContent || this.querySelector('text')?.textContent || `Node ${index}`;
          
          // Remove previous highlights
          nodes.forEach(n => n.classList.remove('highlighted'));
          
          // Highlight clicked node
          this.classList.add('highlighted');
          
          // Show details
          if (detailsDiv) {
            detailsDiv.innerHTML = `
              <div class="bg-gray-800 p-4 rounded border border-gray-600">
                <h4 class="text-white font-semibold mb-2">${nodeText.split('<br/>')[0]}</h4>
                <p class="text-gray-300 text-sm">${getNodeDescription(nodeId)}</p>
              </div>
            `;
          }
        });
      });
    }
  }, 2000);
});

function getNodeDescription(nodeId) {
  const descriptions = {
    'A': 'GEO-16 알고리즘의 시작점입니다. 분석을 위한 페이지 데이터를 입력합니다.',
    'B': '게시 날짜, 수정 타임스탬프, ETag 헤더, 사이트맵 lastmod 값을 포함한 메타데이터 신선도 신호를 검사합니다.',
    'C': '단일 H1, 논리적 제목 계층, 설명적 앵커 텍스트, 접근 가능한 목록 구조를 포함한 시맨틱 HTML 구조를 검증합니다.',
    'D': '유효한 JSON-LD, 콘텐츠 일치, 브레드크럼 존재, 정규 태그를 포함한 구조화된 데이터 구현을 확인합니다.',
    'E': '권위 있는 참조, 링크 검증, 신뢰 지표를 포함한 콘텐츠 출처를 평가합니다.',
    'F': '콘텐츠 품질, 스팸 신호, 사용자 경험 지표를 포함한 위험 관리 요소를 평가합니다.',
    'G': '기계 가독성, 파싱 최적화, AI 친화적 포맷팅을 포함한 RAG(검색 증강 생성) 적합성을 검사합니다.',
    'H': '활성 기둥을 기반으로 최종 GEO 점수를 계산합니다. 임계값: 점수 ≥ 0.70 및 ≥ 12 기둥 히트로 높은 인용 가능성.',
    'I': 'GEO 점수 0.727로 78% 인용률을 보이는 Brave Summary 엔진 출력.',
    'J': 'GEO 점수 0.687로 72% 인용률을 보이는 Google AI Overviews 출력.',
    'K': 'GEO 점수 0.300으로 45% 인용률을 보이는 Perplexity 엔진 출력.'
  };
  return descriptions[nodeId] || 'GEO-16 프레임워크 알고리즘의 대화형 노드입니다. 이 단계는 AI 인용 최적화를 위한 16개 기둥 시스템의 일부입니다.';
}
</script>
