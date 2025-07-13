'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { CitationAnalysis } from '@/lib/analysis/CitationFlowService';

export default function CitationFlowPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedContent, setSelectedContent] = useState('all');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CitationAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/citationflow/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisResult(data.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Default metrics for when no analysis is available
  const defaultMetrics = [
    {
      title: 'Citation Increase',
      value: '300%',
      change: '+45%',
      changeType: 'positive' as const,
      description: 'Average citation boost',
    },
    {
      title: 'Authority Signals',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'Domain authority rating',
    },
    {
      title: 'Content Reach',
      value: '2.4M',
      change: '+180%',
      changeType: 'positive' as const,
      description: 'AI platform visibility',
    },
    {
      title: 'Citation Quality',
      value: '94%',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'High-quality citations',
    },
  ];

  // Generate metrics from analysis result
  const getMetrics = () => {
    if (!analysisResult) return defaultMetrics;

    const totalCitations = analysisResult.citationData.totalCitations;
    const averageAuthority = Math.round(analysisResult.citationData.averageAuthority * 100);
    const citationVelocity = Math.round(analysisResult.citationData.citationVelocity * 100);
    const topPlatform = analysisResult.flowPredictions[0]?.platform || 'N/A';

    return [
      {
        title: 'Total Citations',
        value: totalCitations.toString(),
        change: '+45%',
        changeType: 'positive' as const,
        description: 'Citations detected',
      },
      {
        title: 'Average Authority',
        value: `${averageAuthority}%`,
        change: '+2',
        changeType: 'positive' as const,
        description: 'Citation authority score',
      },
      {
        title: 'Citation Velocity',
        value: `${citationVelocity}%`,
        change: '+180%',
        changeType: 'positive' as const,
        description: 'Citations per 1000 words',
      },
      {
        title: 'Top Platform',
        value: topPlatform,
        change: '+12%',
        changeType: 'positive' as const,
        description: 'Best citation flow',
      },
    ];
  };

  const contentTypes = [
    { id: 'blog', name: 'Blog Posts', citations: '1,247', increase: '+320%' },
    { id: 'product', name: 'Product Pages', citations: '856', increase: '+280%' },
    { id: 'landing', name: 'Landing Pages', citations: '543', increase: '+250%' },
    { id: 'resource', name: 'Resource Pages', citations: '201', increase: '+190%' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              CitationFlow Optimizer
            </h1>
            <p className="text-gray-600">
              Increase citation frequency and authority signals across AI platforms
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Optimizing</span>
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <input
              type="url"
              placeholder="Enter URL to analyze citation flow..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleAnalyze}
              disabled={!url.trim() || isAnalyzing}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">↑</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Citation Optimization Active
              </h2>
              <p className="text-gray-600">
                Automatically optimizing your content for maximum citation frequency across 20+ AI platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={getMetrics()} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Citation Flow Predictions */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Citation Flow Predictions
          </h2>
          
          <div className="space-y-4">
            {analysisResult ? (
              analysisResult.flowPredictions.slice(0, 4).map((prediction) => (
                <div key={prediction.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">
                        {prediction.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{prediction.platform}</h3>
                      <p className="text-sm text-gray-600">{prediction.predictedCitations} predicted citations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{Math.round(prediction.predictedAuthority * 100)}%</div>
                    <div className="text-sm text-green-600 font-medium">{Math.round(prediction.confidenceScore * 100)}% confidence</div>
                  </div>
                </div>
              ))
            ) : (
              // Show placeholder when no analysis
              [
                { platform: 'ChatGPT', predictedCitations: 12, predictedAuthority: 0.85, confidenceScore: 0.92 },
                { platform: 'Claude', predictedCitations: 10, predictedAuthority: 0.82, confidenceScore: 0.89 },
                { platform: 'Perplexity', predictedCitations: 15, predictedAuthority: 0.88, confidenceScore: 0.94 },
                { platform: 'Google AI', predictedCitations: 8, predictedAuthority: 0.78, confidenceScore: 0.86 },
              ].map((prediction) => (
                <div key={prediction.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">
                        {prediction.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{prediction.platform}</h3>
                      <p className="text-sm text-gray-600">{prediction.predictedCitations} predicted citations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{Math.round(prediction.predictedAuthority * 100)}%</div>
                    <div className="text-sm text-green-600 font-medium">{Math.round(prediction.confidenceScore * 100)}% confidence</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Optimization Strategies
          </h2>
          
          <div className="space-y-4">
            {[
              { strategy: 'Schema Markup', impact: 'High', status: 'Active' },
              { strategy: 'Content Structure', impact: 'High', status: 'Active' },
              { strategy: 'Authority Signals', impact: 'Medium', status: 'Active' },
              { strategy: 'Citation Optimization', impact: 'High', status: 'Active' },
            ].map((strategy) => (
              <div key={strategy.strategy} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    strategy.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{strategy.strategy}</h3>
                    <p className="text-sm text-gray-600">{strategy.impact} impact</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{strategy.status}</div>
                  <StatusIndicator status="excellent" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citation Recommendations */}
      {analysisResult && analysisResult.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Citation Optimization Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisResult.recommendations.map((recommendation, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    recommendation.priority === 'high' ? 'bg-red-500' : 
                    recommendation.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{recommendation.category}</h3>
                    <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{recommendation.action}</p>
                    <p className="text-xs text-green-600 font-medium">{recommendation.expectedOutcome}</p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {Math.round(recommendation.impact * 100)}% impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Citation Optimization Tools
            </h3>
            <p className="text-gray-600">
              Advanced tools to maximize your content&rsquo;s citation potential across AI platforms
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Strategies
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
              Optimize Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 