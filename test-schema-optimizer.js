const fetch = require('node-fetch');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = '/api/schema-optimize';

// Real schema samples for testing
const TEST_SCHEMAS = {
  article: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Optimize Your Website for AI Search Engines",
    "description": "Learn the latest techniques for optimizing your website to appear in AI Overviews and improve your search visibility.",
    "author": {
      "@type": "Person",
      "name": "John Doe",
      "url": "https://example.com/author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SEO Experts Inc",
      "url": "https://example.com"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-01-20",
    "image": "https://example.com/images/ai-seo-guide.jpg",
    "url": "https://example.com/ai-seo-guide"
  },
  
  product: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI SEO Optimization Tool",
    "description": "Professional tool for optimizing websites for AI search engines and improving search visibility.",
    "brand": {
      "@type": "Brand",
      "name": "SEOPro"
    },
    "offers": {
      "@type": "Offer",
      "price": "99.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156"
    }
  },
  
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI SEO optimization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI SEO optimization is the process of optimizing your website content and structure to be more easily understood and ranked by AI-powered search engines like Google's AI Overviews."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Results typically appear within 2-4 weeks of implementing AI SEO optimizations, though this can vary depending on your website's authority and competition."
        }
      }
    ]
  }
};

// Test content for generation
const TEST_CONTENT = {
  article: "This comprehensive guide covers the latest AI SEO techniques including structured data optimization, content quality improvements, and technical SEO enhancements for better search engine visibility.",
  product: "Our advanced AI SEO tool provides automated analysis, optimization recommendations, and performance tracking to help you improve your website's search rankings and visibility.",
  howto: "Learn how to implement AI SEO optimization in 5 simple steps: 1) Analyze your current content, 2) Optimize structured data, 3) Improve content quality, 4) Enhance technical SEO, 5) Monitor and iterate."
};

// Test function to measure API performance
async function testAPI(mode, payload) {
  const startTime = Date.now();
  
  try {
    console.log(`\n🧪 Testing ${mode} mode...`);
    console.log(`📤 Payload:`, JSON.stringify(payload, null, 2));
    
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    console.log(`⏱️  Response time: ${latency}ms`);
    console.log(`📊 Status: ${response.status}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log(`❌ Error: ${data.error || 'Unknown error'}`);
      return { success: false, error: data.error, latency };
    }
    
    if (!data.success) {
      console.log(`❌ API Error: ${data.error || 'Unknown error'}`);
      return { success: false, error: data.error, latency };
    }
    
    console.log(`✅ Success! Mode: ${data.mode}`);
    console.log(`📦 Response structure:`, Object.keys(data.data || {}));
    
    return { 
      success: true, 
      data: data.data, 
      latency,
      responseSize: JSON.stringify(data).length
    };
    
  } catch (error) {
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    console.log(`❌ Network Error: ${error.message}`);
    return { success: false, error: error.message, latency };
  }
}

// Test analyze mode
async function testAnalyzeMode() {
  console.log('\n🔍 ===== TESTING ANALYZE MODE =====');
  
  const results = [];
  
  for (const [schemaName, schema] of Object.entries(TEST_SCHEMAS)) {
    console.log(`\n📋 Testing with ${schemaName} schema...`);
    
    const result = await testAPI('analyze', {
      mode: 'analyze',
      schema: JSON.stringify(schema)
    });
    
    results.push({ schemaName, ...result });
    
    if (result.success) {
      console.log(`📊 Analysis Results for ${schemaName}:`);
      console.log(`   - Quality Score: ${result.data.qualityScore}/100`);
      console.log(`   - Completeness Score: ${result.data.completenessScore}/100`);
      console.log(`   - AI Optimization Score: ${result.data.aiOptimizationScore}/100`);
      console.log(`   - Issues Found: ${result.data.issues?.length || 0}`);
      console.log(`   - Strengths: ${result.data.strengths?.length || 0}`);
      console.log(`   - Recommendations: ${result.data.recommendations?.length || 0}`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

// Test optimize mode
async function testOptimizeMode() {
  console.log('\n⚡ ===== TESTING OPTIMIZE MODE =====');
  
  const results = [];
  
  for (const [schemaName, schema] of Object.entries(TEST_SCHEMAS)) {
    console.log(`\n📋 Testing with ${schemaName} schema...`);
    
    const result = await testAPI('optimize', {
      mode: 'optimize',
      schema: JSON.stringify(schema)
    });
    
    results.push({ schemaName, ...result });
    
    if (result.success) {
      console.log(`📊 Optimization Results for ${schemaName}:`);
      console.log(`   - ChatGPT Score: ${result.data.aiOptimization?.chatgptScore}/100`);
      console.log(`   - Claude Score: ${result.data.aiOptimization?.claudeScore}/100`);
      console.log(`   - Perplexity Score: ${result.data.aiOptimization?.perplexityScore}/100`);
      console.log(`   - Google Score: ${result.data.aiOptimization?.googleScore}/100`);
      console.log(`   - Validation: ${result.data.validation?.isValid ? 'Valid' : 'Invalid'}`);
      console.log(`   - Improvements: ${result.data.improvements?.length || 0}`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

// Test generate mode
async function testGenerateMode() {
  console.log('\n🎯 ===== TESTING GENERATE MODE =====');
  
  const results = [];
  
  for (const [contentType, content] of Object.entries(TEST_CONTENT)) {
    console.log(`\n📋 Testing with ${contentType} content...`);
    
    const result = await testAPI('generate', {
      mode: 'generate',
      content: content,
      type: contentType.charAt(0).toUpperCase() + contentType.slice(1)
    });
    
    results.push({ contentType, ...result });
    
    if (result.success) {
      console.log(`📊 Generation Results for ${contentType}:`);
      console.log(`   - Schema Type: ${result.data.schemaType}`);
      console.log(`   - AI Consumption Score: ${result.data.optimization?.aiConsumptionScore}/100`);
      console.log(`   - SEO Score: ${result.data.optimization?.seoScore}/100`);
      console.log(`   - Rich Results Eligible: ${result.data.optimization?.richResultsEligibility ? 'Yes' : 'No'}`);
      console.log(`   - Fields Generated: ${result.data.fields?.length || 0}`);
      console.log(`   - Validation: ${result.data.validation?.isValid ? 'Valid' : 'Invalid'}`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

// Test error handling
async function testErrorHandling() {
  console.log('\n🚨 ===== TESTING ERROR HANDLING =====');
  
  const errorTests = [
    {
      name: 'Invalid mode',
      payload: { mode: 'invalid_mode' }
    },
    {
      name: 'Missing schema for analyze',
      payload: { mode: 'analyze' }
    },
    {
      name: 'Missing schema for optimize',
      payload: { mode: 'optimize' }
    },
    {
      name: 'Missing content for generate',
      payload: { mode: 'generate', type: 'Article' }
    },
    {
      name: 'Missing type for generate',
      payload: { mode: 'generate', content: 'Test content' }
    },
    {
      name: 'Invalid JSON schema',
      payload: { mode: 'analyze', schema: '{ invalid json }' }
    }
  ];
  
  const results = [];
  
  for (const test of errorTests) {
    console.log(`\n📋 Testing: ${test.name}`);
    
    const result = await testAPI('error', test.payload);
    results.push({ testName: test.name, ...result });
    
    if (!result.success) {
      console.log(`✅ Expected error handled correctly: ${result.error}`);
    } else {
      console.log(`⚠️  Unexpected success for error test`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Performance analysis
function analyzePerformance(results) {
  console.log('\n📈 ===== PERFORMANCE ANALYSIS =====');
  
  const successfulResults = results.filter(r => r.success);
  
  if (successfulResults.length === 0) {
    console.log('❌ No successful results to analyze');
    return;
  }
  
  const latencies = successfulResults.map(r => r.latency);
  const responseSizes = successfulResults.map(r => r.responseSize || 0);
  
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  
  const avgResponseSize = responseSizes.reduce((a, b) => a + b, 0) / responseSizes.length;
  const maxResponseSize = Math.max(...responseSizes);
  
  console.log(`📊 Performance Metrics:`);
  console.log(`   - Total Tests: ${results.length}`);
  console.log(`   - Successful: ${successfulResults.length}`);
  console.log(`   - Success Rate: ${((successfulResults.length / results.length) * 100).toFixed(1)}%`);
  console.log(`   - Average Latency: ${avgLatency.toFixed(0)}ms`);
  console.log(`   - Min Latency: ${minLatency}ms`);
  console.log(`   - Max Latency: ${maxLatency}ms`);
  console.log(`   - Average Response Size: ${(avgResponseSize / 1024).toFixed(1)}KB`);
  console.log(`   - Max Response Size: ${(maxResponseSize / 1024).toFixed(1)}KB`);
  
  // Check for potential rate limiting
  const slowResponses = latencies.filter(l => l > 10000);
  if (slowResponses.length > 0) {
    console.log(`⚠️  Rate Limiting Warning: ${slowResponses.length} responses took >10s`);
  }
  
  // Check for large responses
  const largeResponses = responseSizes.filter(s => s > 50000);
  if (largeResponses.length > 0) {
    console.log(`⚠️  Large Response Warning: ${largeResponses.length} responses >50KB`);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Schema Optimizer Tests...');
  console.log(`🌐 Testing against: ${BASE_URL}${API_ENDPOINT}`);
  
  const startTime = Date.now();
  
  try {
    // Test all modes
    const analyzeResults = await testAnalyzeMode();
    const optimizeResults = await testOptimizeMode();
    const generateResults = await testGenerateMode();
    const errorResults = await testErrorHandling();
    
    // Combine all results
    const allResults = [
      ...analyzeResults,
      ...optimizeResults,
      ...generateResults,
      ...errorResults
    ];
    
    // Analyze performance
    analyzePerformance(allResults);
    
    // Summary
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log('\n🎉 ===== TEST SUMMARY =====');
    console.log(`⏱️  Total Test Time: ${totalTime}ms`);
    console.log(`📊 Total Tests: ${allResults.length}`);
    console.log(`✅ Successful: ${allResults.filter(r => r.success).length}`);
    console.log(`❌ Failed: ${allResults.filter(r => !r.success).length}`);
    
    // Mode-specific results
    console.log('\n📋 Mode Results:');
    console.log(`   - Analyze: ${analyzeResults.filter(r => r.success).length}/${analyzeResults.length} successful`);
    console.log(`   - Optimize: ${optimizeResults.filter(r => r.success).length}/${optimizeResults.length} successful`);
    console.log(`   - Generate: ${generateResults.filter(r => r.success).length}/${generateResults.length} successful`);
    console.log(`   - Error Handling: ${errorResults.filter(r => !r.success).length}/${errorResults.length} correctly handled`);
    
  } catch (error) {
    console.error('❌ Test runner error:', error);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testAPI }; 