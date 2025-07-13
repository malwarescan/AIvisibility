'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AnalysisResult, PlatformPrediction } from '@/lib/analysis/AgentRankService';

export default function AgentRankPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/agentrank/analyze', {
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

  const agentRankMetrics = [
    {
      title: 'Prediction Accuracy',
      value: '94%',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'AI agent behavior prediction',
    },
    {
      title: 'Ranking Confidence',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'High confidence predictions',
    },
    {
      title: 'Platform Coverage',
      value: '20+',
      change: '+3',
      changeType: 'positive' as const,
      description: 'AI platforms monitored',
    },
    {
      title: 'Response Rate',
      value: '87%',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Prediction accuracy rate',
    },
  ];

  // Generate metrics from analysis result
  const getMetrics = () => {
    if (!analysisResult) return agentRankMetrics;

    const overallConfidence = Math.round(analysisResult.confidenceScores.overall * 100);
    const totalCitations = analysisResult.predictions.reduce((sum, p) => sum + p.citationCount, 0);
    const topPlatform = analysisResult.predictions[0]?.platform || 'N/A';
    
    // Calculate average rank (lower is better, so invert for percentage)
    const avgRank = analysisResult.predictions.reduce((sum, p) => sum + p.predictedRank, 0) / analysisResult.predictions.length;
    const rankScore = Math.max(0, Math.min(100, Math.round((11 - avgRank) * 10))); // Convert rank 1-10 to score 0-100
    
    // Calculate processing time
    const processingTime = analysisResult.metadata.processingTime;
    const timeScore = processingTime < 5000 ? 'Fast' : processingTime < 10000 ? 'Normal' : 'Slow';

    return [
      {
        title: 'Prediction Accuracy',
        value: `${overallConfidence}%`,
        change: '+8%',
        changeType: 'positive' as const,
        description: 'AI agent behavior prediction',
      },
      {
        title: 'Average Rank Score',
        value: `${rankScore}%`,
        change: '+2',
        changeType: 'positive' as const,
        description: 'Average ranking across platforms',
      },
      {
        title: 'Platform Coverage',
        value: `${analysisResult.predictions.length}`,
        change: '+3',
        changeType: 'positive' as const,
        description: 'AI platforms analyzed',
      },
      {
        title: 'Total Citations',
        value: totalCitations.toString(),
        change: '+12%',
        changeType: 'positive' as const,
        description: 'Citation frequency rate',
      },
    ];
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              AgentRank Simulator
            </h1>
            <p className="text-gray-600">
              Predict how AI agents will rank your content across 20+ platforms
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Simulating</span>
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <input
              type="url"
              placeholder="Enter URL to analyze..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAnalyze}
              disabled={!url.trim() || isAnalyzing}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                AI Agent Behavior Prediction
              </h2>
              <p className="text-gray-600">
                Advanced simulation to predict how AI agents will rank and respond to your content
              </p>
            </div>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={getMetrics()} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Rankings */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Agent Rankings
          </h2>
          
          <div className="space-y-4">
            {analysisResult ? (
              analysisResult.predictions.slice(0, 4).map((prediction) => (
                <div key={prediction.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {prediction.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{prediction.platform}</h3>
                      <p className="text-sm text-gray-600">Predicted rank</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{prediction.predictedRank}</div>
                    <div className="text-sm text-purple-600 font-medium">{Math.round(prediction.confidenceScore * 100)}%</div>
                  </div>
                </div>
              ))
            ) : (
              // Show placeholder when no analysis
              [
                { platform: 'ChatGPT', predictedRank: 1, confidenceScore: 0.96 },
                { platform: 'Claude', predictedRank: 2, confidenceScore: 0.94 },
                { platform: 'Perplexity', predictedRank: 3, confidenceScore: 0.92 },
                { platform: 'Google AI', predictedRank: 4, confidenceScore: 0.89 },
              ].map((prediction) => (
                <div key={prediction.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {prediction.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{prediction.platform}</h3>
                      <p className="text-sm text-gray-600">Predicted rank</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{prediction.predictedRank}</div>
                    <div className="text-sm text-purple-600 font-medium">{Math.round(prediction.confidenceScore * 100)}%</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Prediction Factors */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Prediction Factors
          </h2>
          
          <div className="space-y-4">
            {analysisResult ? (
              // Show real prediction factors from analysis
              analysisResult.predictions[0]?.factors ? (
                Object.entries(analysisResult.predictions[0].factors).map(([factor, value]) => {
                  const factorName = factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  const weight = value > 0.7 ? 'High' : value > 0.4 ? 'Medium' : 'Low';
                  const impact = `${Math.round(value * 100)}%`;
                  
                  return (
                    <div key={factor} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          weight === 'High' ? 'bg-purple-500' : weight === 'Medium' ? 'bg-blue-500' : 'bg-gray-400'
                        }`} />
                        <div>
                          <h3 className="font-medium text-gray-900">{factorName}</h3>
                          <p className="text-sm text-gray-600">{weight} weight</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{impact}</div>
                        <StatusIndicator status={value > 0.7 ? "excellent" : value > 0.4 ? "good" : "poor"} size="sm" />
                      </div>
                    </div>
                  );
                })
              ) : (
                // Fallback to static factors
                [
                  { factor: 'Content Quality', weight: 'High', impact: '95%' },
                  { factor: 'Authority Signals', weight: 'High', impact: '92%' },
                  { factor: 'Citation Frequency', weight: 'Medium', impact: '88%' },
                  { factor: 'Schema Markup', weight: 'Medium', impact: '85%' },
                ].map((factor) => (
                  <div key={factor.factor} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        factor.weight === 'High' ? 'bg-purple-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{factor.factor}</h3>
                        <p className="text-sm text-gray-600">{factor.weight} weight</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{factor.impact}</div>
                      <StatusIndicator status="excellent" size="sm" />
                    </div>
                  </div>
                ))
              )
            ) : (
              // Show placeholder when no analysis
              [
                { factor: 'Content Quality', weight: 'High', impact: '95%' },
                { factor: 'Authority Signals', weight: 'High', impact: '92%' },
                { factor: 'Citation Frequency', weight: 'Medium', impact: '88%' },
                { factor: 'Schema Markup', weight: 'Medium', impact: '85%' },
              ].map((factor) => (
                <div key={factor.factor} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      factor.weight === 'High' ? 'bg-purple-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{factor.factor}</h3>
                      <p className="text-sm text-gray-600">{factor.weight} weight</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{factor.impact}</div>
                    <StatusIndicator status="excellent" size="sm" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Analysis Details */}
      {analysisResult && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Analysis Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Content Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">URL:</span>
                  <span className="font-medium">{analysisResult.url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{analysisResult.contentData.title || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Content Length:</span>
                  <span className="font-medium">{analysisResult.contentData.content.length} characters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">External Links:</span>
                  <span className="font-medium">{analysisResult.contentData.links.filter(l => l.isExternal).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Citations:</span>
                  <span className="font-medium">{analysisResult.contentData.citations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Schema Markup:</span>
                  <span className="font-medium">{analysisResult.contentData.schema.hasStructuredData ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Processing Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Analysis ID:</span>
                  <span className="font-medium">{analysisResult.analysisId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium">{analysisResult.metadata.processingTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Analysis Date:</span>
                  <span className="font-medium">{new Date(analysisResult.metadata.analysisTimestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Confidence:</span>
                  <span className="font-medium">{Math.round(analysisResult.confidenceScores.overall * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platforms Analyzed:</span>
                  <span className="font-medium">{analysisResult.predictions.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Recommendations */}
      {analysisResult && analysisResult.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Optimization Recommendations
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
                    <p className="text-xs text-gray-500">{recommendation.action}</p>
                    <div className="mt-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
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
              Advanced Prediction Tools
            </h3>
            <p className="text-gray-600">
              Deep learning models to predict AI agent behavior and optimize content accordingly
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Predictions
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
              Run Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 