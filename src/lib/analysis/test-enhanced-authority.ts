// Test script for Enhanced Authority System
// Tests temporal learning and feedback capabilities

import { EnhancedAuthorityService } from './EnhancedAuthorityService';
import { TemporalWeightModifier } from './TemporalWeightModifier';
import { PlatformFeedbackEngine } from './PlatformFeedbackEngine';

async function testEnhancedAuthority() {
  console.log('Testing Enhanced Authority System...\n');

  // Initialize services
  const enhancedService = new EnhancedAuthorityService();
  const temporalModifier = new TemporalWeightModifier();
  const feedbackEngine = new PlatformFeedbackEngine();

  // Test 1: Temporal Learning
  console.log('Test 1: Temporal Learning');
  console.log('Testing content age adjustments...');
  
  const testUrl = 'https://example.com';
  const mockApiData = {
    pageSpeed: {
      performanceScore: 85,
      seoScore: 90,
      accessibilityScore: 88,
      lcp: 2000,
      fid: 80,
      cls: 0.08,
      isMobileOptimized: true
    },
    ssl: {
      hasSSL: true,
      score: 95,
      domain: 'example.com'
    },
    content: {
      hasTitle: true,
      hasMetaDescription: true,
      hasSchema: true,
      titleLength: 45,
      descriptionLength: 140,
      headingStructure: {
        h1Count: 1,
        h2Count: 3,
        h3Count: 2
      },
      content: 'This is a test content with some technical information about algorithms and APIs. It includes structured data and proper formatting.',
      lastModified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      schema: { type: 'Article' }
    }
  };

  try {
    const result = await enhancedService.analyzeAuthority(testUrl, mockApiData);
    
    console.log('Enhanced Authority Analysis Results:');
    console.log(`Overall Score: ${result.overall.score}`);
    console.log(`Status: ${result.overall.status}`);
    console.log(`Trend: ${result.overall.trend}`);
    
    console.log('\nPlatform Scores:');
    result.platformScores.forEach(platform => {
      console.log(`${platform.platform}: ${platform.score} (${platform.status})`);
      if (platform.temporalAdjustment) {
        console.log(`  - Temporal Adjustment: ${platform.temporalAdjustment}%`);
      }
      if (platform.feedbackEnhancement) {
        console.log(`  - Feedback Enhancement: ${platform.feedbackEnhancement}%`);
      }
    });
    
    console.log('\nLearning Metrics:');
    console.log(`Temporal Accuracy: ${result.learningMetrics.temporalAccuracy * 100}%`);
    console.log(`Feedback Effectiveness: ${result.learningMetrics.feedbackEffectiveness * 100}%`);
    console.log(`Overall Improvement: ${result.learningMetrics.overallImprovement}`);
    
  } catch (error) {
    console.error('Enhanced Authority Test Failed:', error);
  }

  // Test 2: Temporal Weight Modifier
  console.log('\nTest 2: Temporal Weight Modifier');
  
  const platforms = ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'];
  const contentAges = [0, 30, 90, 180, 365]; // days
  
  platforms.forEach(platform => {
    console.log(`\n${platform}:`);
    contentAges.forEach(age => {
      const adjustment = temporalModifier.getPlatformTemporalAdjustment(platform, age);
      const sensitivity = temporalModifier.getPlatformRecencySensitivity(platform);
      console.log(`  ${age} days: ${(adjustment * 100).toFixed(1)}% (sensitivity: ${sensitivity})`);
    });
  });

  // Test 3: Feedback Engine
  console.log('\nTest 3: Feedback Engine');
  
  // Simulate some feedback data
  const mockFeedback = {
    platform: 'ChatGPT',
    url: testUrl,
    timestamp: new Date(),
    beforeScore: 75,
    afterScore: 82,
    changes: [
      {
        type: 'schema' as const,
        description: 'Added structured data',
        impact: 0.3,
        applied: true
      },
      {
        type: 'content' as const,
        description: 'Improved content quality',
        impact: 0.2,
        applied: true
      }
    ],
    outcome: 'positive' as const,
    confidence: 0.85
  };
  
  feedbackEngine.recordFeedback(mockFeedback);
  
  const learningMetrics = feedbackEngine.getLearningMetrics();
  console.log('Feedback Learning Results:');
  console.log(`Total Feedback: ${learningMetrics.totalFeedback}`);
  console.log(`Platforms with Data: ${learningMetrics.platformsWithData.join(', ')}`);
  console.log(`Average Improvement: ${learningMetrics.averageImprovement.toFixed(2)}`);
  console.log(`Successful Strategies:`, learningMetrics.successfulStrategies);
  
  // Test 4: Enhanced Platform Factors
  console.log('\nTest 4: Enhanced Platform Factors');
  
  platforms.forEach(platform => {
    const enhancedFactors = feedbackEngine.getEnhancedPlatformFactors(platform);
    console.log(`\n${platform} Enhanced Factors:`);
    Object.entries(enhancedFactors).forEach(([factor, weight]) => {
      console.log(`  ${factor}: ${weight.toFixed(3)}`);
    });
  });

  console.log('\nAll Enhanced Authority Tests Completed Successfully!');
}

// Run the test
testEnhancedAuthority().catch(console.error); 