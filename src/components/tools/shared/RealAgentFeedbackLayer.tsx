'use client';

import React, { useState, useEffect } from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface RealAgentInteraction {
  platform: string;
  query: string;
  result: string;
  sourceUsed: boolean;
  sourceUrl?: string;
  citationStyle: 'inline' | 'footnote' | 'link' | 'none';
  snippetIncluded: boolean;
  answerUsagePattern: 'direct' | 'paraphrased' | 'referenced' | 'ignored';
  confidence: number;
  timestamp: Date;
  responseTime: number;
  tokenUsage: number;
}

interface FeedbackMetrics {
  citationFrequency: number;
  snippetInclusionRate: number;
  answerUsageRate: number;
  confidenceDrift: number;
  responseTimeTrend: number;
  accuracyScore: number;
}

interface RecalibrationWeights {
  citationWeight: number;
  snippetWeight: number;
  authorityWeight: number;
  freshnessWeight: number;
  structureWeight: number;
  lastUpdated: Date;
}

export function RealAgentFeedbackLayer() {
  const [interactions, setInteractions] = useState<RealAgentInteraction[]>([]);
  const [feedbackMetrics, setFeedbackMetrics] = useState<Map<string, FeedbackMetrics>>(new Map());
  const [recalibrationWeights, setRecalibrationWeights] = useState<RecalibrationWeights | null>(null);
  const [systemAdaptabilityScore, setSystemAdaptabilityScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  useEffect(() => {
    loadRAFData();
  }, []);

  const loadRAFData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/raf-layer/record');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setInteractions(data.data.interactions || []);
          setRecalibrationWeights(data.data.recalibrationWeights);
          setSystemAdaptabilityScore(data.data.systemAdaptabilityScore);
          
          // Convert feedback metrics to Map
          if (data.data.feedbackMetrics) {
            const metricsMap = new Map();
            Object.entries(data.data.feedbackMetrics).forEach(([platform, metrics]) => {
              metricsMap.set(platform, metrics);
            });
            setFeedbackMetrics(metricsMap);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load RAF data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateInteraction = async () => {
    const testQuery = "What is the best way to optimize content for AI search engines?";
    const testUrl = "https://example.com/ai-optimization";
    const platforms = ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

    try {
      const response = await fetch('/api/raf-layer/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: randomPlatform,
          query: testQuery,
          result: `Based on current best practices, the most effective way to optimize content for AI search engines involves...`,
          sourceUsed: Math.random() > 0.3,
          sourceUrl: testUrl,
          citationStyle: ['inline', 'footnote', 'link', 'none'][Math.floor(Math.random() * 4)],
          snippetIncluded: Math.random() > 0.4,
          answerUsagePattern: ['direct', 'paraphrased', 'referenced', 'ignored'][Math.floor(Math.random() * 4)],
          confidence: 0.7 + Math.random() * 0.3,
          responseTime: 1000 + Math.random() * 2000,
          tokenUsage: 100 + Math.random() * 500
        }),
      });

      if (response.ok) {
        await loadRAFData(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to simulate interaction:', error);
    }
  };

  const getFilteredInteractions = () => {
    if (selectedPlatform === 'all') {
      return interactions;
    }
    return interactions.filter(i => i.platform === selectedPlatform);
  };

  const getPlatforms = () => {
    return [...new Set(interactions.map(i => i.platform))];
  };

  const getCitationStyleColor = (style: string) => {
    switch (style) {
      case 'inline': return 'text-green-600';
      case 'footnote': return 'text-blue-600';
      case 'link': return 'text-purple-600';
      case 'none': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getUsagePatternColor = (pattern: string) => {
    switch (pattern) {
      case 'direct': return 'text-green-600';
      case 'paraphrased': return 'text-blue-600';
      case 'referenced': return 'text-yellow-600';
      case 'ignored': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Real Agent Feedback Layer (RAF)
              </h2>
              <p className="text-gray-600">
                Dynamic scoring recalibration based on real LLM interactions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {systemAdaptabilityScore.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">System Adaptability</div>
              </div>
              <button
                onClick={simulateInteraction}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Simulate Interaction'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-blue-600">Total Interactions</div>
              <div className="text-2xl font-bold text-blue-900">{interactions.length}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-sm font-medium text-green-600">Platforms Tracked</div>
              <div className="text-2xl font-bold text-green-900">{getPlatforms().length}</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-sm font-medium text-purple-600">Last Recalibration</div>
              <div className="text-sm font-bold text-purple-900">
                {recalibrationWeights?.lastUpdated.toLocaleString() || 'Never'}
              </div>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {/* Platform Filter */}
      <AutoAnimatedElement animation="slideUp" delay={0.1}>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Platform:</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Platforms</option>
              {getPlatforms().map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>
      </AutoAnimatedElement>

      {/* Recalibration Weights */}
      {recalibrationWeights && (
        <AutoAnimatedElement animation="slideUp" delay={0.2}>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Scoring Weights</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(recalibrationWeights.citationWeight * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Citation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(recalibrationWeights.snippetWeight * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Snippet</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {(recalibrationWeights.authorityWeight * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Authority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(recalibrationWeights.freshnessWeight * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Freshness</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {(recalibrationWeights.structureWeight * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Structure</div>
              </div>
            </div>
          </div>
        </AutoAnimatedElement>
      )}

      {/* Recent Interactions */}
      <AutoAnimatedElement animation="slideUp" delay={0.3}>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Agent Interactions</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {getFilteredInteractions().slice(-10).map((interaction, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {interaction.platform}
                    </span>
                    <span className="text-sm text-gray-500">
                      {interaction.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {(interaction.confidence * 100).toFixed(0)}% confidence
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-700">Query:</div>
                  <div className="text-sm text-gray-600">{interaction.query}</div>
                </div>
                
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-700">Result:</div>
                  <div className="text-sm text-gray-600">{interaction.result.substring(0, 150)}...</div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs">
                  <div className={`flex items-center space-x-1 ${interaction.sourceUsed ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>📎</span>
                    <span>{interaction.sourceUsed ? 'Source Used' : 'No Source'}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getCitationStyleColor(interaction.citationStyle)}`}>
                    <span>🔗</span>
                    <span>{interaction.citationStyle}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getUsagePatternColor(interaction.answerUsagePattern)}`}>
                    <span>📝</span>
                    <span>{interaction.answerUsagePattern}</span>
                  </div>
                  <div className="text-gray-500">
                    {interaction.responseTime}ms
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AutoAnimatedElement>

      {/* Feedback Metrics */}
      {feedbackMetrics.size > 0 && (
        <AutoAnimatedElement animation="slideUp" delay={0.4}>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Feedback Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(feedbackMetrics.entries()).map(([platform, metrics]) => (
                <div key={platform} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{platform}</h4>
                    <span className="text-sm text-gray-500">
                      {metrics.accuracyScore.toFixed(0)}% accuracy
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Citation Rate:</span>
                      <span className="font-medium">{(metrics.citationFrequency * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Snippet Rate:</span>
                      <span className="font-medium">{(metrics.snippetInclusionRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Usage Rate:</span>
                      <span className="font-medium">{(metrics.answerUsageRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Confidence Drift:</span>
                      <span className={`font-medium ${metrics.confidenceDrift > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metrics.confidenceDrift > 0 ? '+' : ''}{metrics.confidenceDrift.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AutoAnimatedElement>
      )}
    </div>
  );
} 