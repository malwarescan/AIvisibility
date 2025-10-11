// GEO-16 Framework Algorithm Visualization using Ripple.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Ripple.js
  const ripple = new Ripple({
    container: document.getElementById('geo16-algorithm'),
    width: 800,
    height: 600,
    theme: 'dark'
  });

  // Define the GEO-16 Framework algorithm nodes
  const nodes = [
    // Start node
    {
      id: 'start',
      x: 400,
      y: 50,
      type: 'circle',
      label: 'START\nPage Input',
      color: '#00ff00',
      size: 60
    },
    
    // Main checks
    {
      id: 'metadata',
      x: 200,
      y: 150,
      type: 'diamond',
      label: 'METADATA_CHECK()\n• datePublished\n• dateModified\n• ETag\n• sitemap_lastmod',
      color: '#0066cc',
      size: 80
    },
    
    {
      id: 'semantic',
      x: 400,
      y: 150,
      type: 'diamond',
      label: 'SEMANTIC_HTML_CHECK()\n• single_h1\n• logical_h2_h3\n• descriptive_anchors\n• accessible_lists',
      color: '#00cc66',
      size: 80
    },
    
    {
      id: 'structured',
      x: 600,
      y: 150,
      type: 'diamond',
      label: 'STRUCTURED_DATA_CHECK()\n• valid_jsonld\n• matches_content\n• has_breadcrumbs\n• canonical_present',
      color: '#cc0066',
      size: 80
    },
    
    {
      id: 'provenance',
      x: 200,
      y: 280,
      type: 'diamond',
      label: 'PROVENANCE_CHECK()\n• authoritative_refs\n• link_validation\n• trust_indicators',
      color: '#ff6600',
      size: 80
    },
    
    {
      id: 'risk',
      x: 400,
      y: 280,
      type: 'diamond',
      label: 'RISK_MANAGEMENT_CHECK()\n• content_quality\n• spam_signals\n• user_experience',
      color: '#ff0000',
      size: 80
    },
    
    {
      id: 'rag',
      x: 600,
      y: 280,
      type: 'diamond',
      label: 'RAG_FIT_CHECK()\n• machine_readable\n• parsing_optimized\n• ai_friendly',
      color: '#00cccc',
      size: 80
    },
    
    // Calculation node
    {
      id: 'calculate',
      x: 400,
      y: 400,
      type: 'rectangle',
      label: 'CALCULATE_GEO_SCORE()\nscore = (active_pillars / 16) * 100\nIF score >= 70 AND active_pillars >= 12:\n  RETURN "HIGH_CITATION_LIKELIHOOD"\nELSE IF score >= 50:\n  RETURN "MEDIUM_CITATION_LIKELIHOOD"\nELSE:\n  RETURN "LOW_CITATION_LIKELIHOOD"',
      color: '#ffff00',
      size: 100
    },
    
    // Output nodes
    {
      id: 'brave',
      x: 150,
      y: 520,
      type: 'rectangle',
      label: 'Brave Summary\n78% Citation Rate\nGEO: 0.727',
      color: '#00ff00',
      size: 70
    },
    
    {
      id: 'google',
      x: 400,
      y: 520,
      type: 'rectangle',
      label: 'Google AI Overviews\n72% Citation Rate\nGEO: 0.687',
      color: '#ffff00',
      size: 70
    },
    
    {
      id: 'perplexity',
      x: 650,
      y: 520,
      type: 'rectangle',
      label: 'Perplexity\n45% Citation Rate\nGEO: 0.300',
      color: '#ff6600',
      size: 70
    }
  ];

  // Define connections between nodes
  const edges = [
    // From start to main checks
    { from: 'start', to: 'metadata', label: '→' },
    { from: 'start', to: 'semantic', label: '→' },
    { from: 'start', to: 'structured', label: '→' },
    
    // From main checks to secondary checks
    { from: 'metadata', to: 'provenance', label: '→' },
    { from: 'semantic', to: 'risk', label: '→' },
    { from: 'structured', to: 'rag', label: '→' },
    
    // All checks lead to calculation
    { from: 'provenance', to: 'calculate', label: '→' },
    { from: 'risk', to: 'calculate', label: '→' },
    { from: 'rag', to: 'calculate', label: '→' },
    
    // Calculation leads to outputs
    { from: 'calculate', to: 'brave', label: 'HIGH' },
    { from: 'calculate', to: 'google', label: 'MEDIUM' },
    { from: 'calculate', to: 'perplexity', label: 'LOW' }
  ];

  // Add nodes to the visualization
  nodes.forEach(node => {
    ripple.addNode(node);
  });

  // Add edges to the visualization
  edges.forEach(edge => {
    ripple.addEdge(edge);
  });

  // Add threshold line
  ripple.addLine({
    x1: 100,
    y1: 350,
    x2: 700,
    y2: 350,
    color: '#ff0000',
    width: 2,
    label: 'GEO ≥ 0.70 Threshold'
  });

  // Add title
  ripple.addText({
    x: 400,
    y: 20,
    text: 'GEO-16 Framework Algorithm',
    color: '#ffffff',
    size: 24,
    weight: 'bold'
  });

  // Add subtitle
  ripple.addText({
    x: 400,
    y: 35,
    text: 'AI Answer Engine Citation Optimization',
    color: '#cccccc',
    size: 14
  });

  // Render the visualization
  ripple.render();
});
