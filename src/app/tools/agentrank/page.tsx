'use client';

import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface AgentRankData {
  overallScore: number;
  predictionAccuracy: number;
  platformCount: number;
  agentBreakdown: Array<{
    agent: string;
    score: number;
    confidence: number;
    platform: string;
  }>;
  trends: Array<{
    date: string;
    score: number;
    accuracy: number;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export default function AgentRankPage() {
  // const [selectedMetric, setSelectedMetric] = useState('all'); // Not currently used
  const [isLoading, setIsLoading] = useState(false);
  const [agentRankData, setAgentRankData] = useState<AgentRankData | null>(null);
  const [exporting, setExporting] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): AgentRankData => {
      return {
        overallScore: Math.round(85 + Math.random() * 15),
        predictionAccuracy: Math.round(92 + Math.random() * 8),
        platformCount: Math.round(20 + Math.random() * 5),
        agentBreakdown: [
          { agent: 'ChatGPT Agent', score: 90 + Math.random() * 10, confidence: 0.95, platform: 'ChatGPT' },
          { agent: 'Claude Agent', score: 85 + Math.random() * 10, confidence: 0.92, platform: 'Claude' },
          { agent: 'Perplexity Agent', score: 80 + Math.random() * 10, confidence: 0.88, platform: 'Perplexity' },
          { agent: 'Google AI Agent', score: 88 + Math.random() * 10, confidence: 0.90, platform: 'Google AI' },
        ],
        trends: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          score: 80 + Math.random() * 20,
          accuracy: 90 + Math.random() * 10,
        })),
        insights: [
          { type: 'positive' as const, message: 'ChatGPT agent ranking improved by 15%', impact: 'High' },
          { type: 'positive' as const, message: 'Prediction accuracy increased across platforms', impact: 'Medium' },
          { type: 'neutral' as const, message: 'Google AI agent performance stable', impact: 'Low' },
        ],
      };
    };

    setIsLoading(true);
    const timer = setTimeout(() => {
      setAgentRankData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(agentRankData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `agentrank-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 2000);
  };

  const agentRankMetrics = agentRankData ? [
    {
      title: 'Overall Agent Score',
      value: `${agentRankData.overallScore}%`,
      change: `+${Math.round(Math.random() * 10)}%`,
      changeType: 'positive' as const,
      description: 'Average across all agents',
    },
    {
      title: 'Prediction Accuracy',
      value: `${agentRankData.predictionAccuracy}%`,
      change: `+${Math.round(Math.random() * 5)}%`,
      changeType: 'positive' as const,
      description: 'AI ranking predictions',
    },
    {
      title: 'Platforms Monitored',
      value: agentRankData.platformCount.toString(),
      change: `+${Math.round(Math.random() * 2)}`,
      changeType: 'positive' as const,
      description: 'AI platforms tracked',
    },
    {
      title: 'Agent Confidence',
      value: '94%',
      change: `+${Math.round(Math.random() * 3)}%`,
      changeType: 'positive' as const,
      description: 'Average confidence score',
    },
  ] : [];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-blue-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
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
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Live Data</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">Target</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  AI Agent Ranking Prediction
                </h2>
                <p className="text-gray-600">
                  Simulate how AI agents across ChatGPT, Claude, Perplexity, and Google AI will rank your content
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="text-gray-600">Loading agent ranking data...</span>
          </div>
        </div>
      ) : (
        <>
          <AutoAnimatedElement animation="slideUp" delay={200}>
            <MetricsOverview metrics={agentRankMetrics} />
          </AutoAnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agent Breakdown */}
            <AutoAnimatedElement animation="slideUp" delay={400}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Agent Performance Breakdown
                </h2>
                
                <div className="space-y-4">
                  {agentRankData?.agentBreakdown.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">
                            {agent.platform.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{agent.agent}</h3>
                          <p className="text-sm text-gray-600">Score: <span className={getScoreColor(agent.score)}>{agent.score}%</span></p>
                          <p className="text-sm text-gray-600">Confidence: <span className={getConfidenceColor(agent.confidence)}>{Math.round(agent.confidence * 100)}%</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{agent.score}%</div>
                        <StatusIndicator 
                          status={agent.confidence > 0.8 ? 'excellent' : agent.confidence > 0.6 ? 'good' : 'average'} 
                          size="sm" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Trends */}
            <AutoAnimatedElement animation="slideUp" delay={600}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Performance Trends
                </h2>
                
                <div className="space-y-4">
                  {agentRankData?.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">Chart</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{trend.date}</h3>
                          <p className="text-sm text-gray-600">Score: <span className={getScoreColor(trend.score)}>{trend.score}%</span></p>
                          <p className="text-sm text-gray-600">Accuracy: <span className={getConfidenceColor(trend.accuracy)}>{Math.round(trend.accuracy)}%</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{trend.score}%</div>
                        <StatusIndicator 
                          status={trend.accuracy > 0.8 ? 'excellent' : trend.accuracy > 0.6 ? 'good' : 'average'} 
                          size="sm" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Insights */}
            <AutoAnimatedElement animation="slideUp" delay={800}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Insights
                </h2>
                
                <div className="space-y-4">
                  {agentRankData?.insights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">
                            💡
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{insight.message}</h3>
                          <p className="text-sm text-gray-600">Impact: <span className={insight.type === 'positive' ? 'text-green-600' : insight.type === 'negative' ? 'text-red-600' : 'text-blue-600'}>{insight.impact}</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusIndicator 
                          status={insight.type === 'positive' ? 'excellent' : insight.type === 'negative' ? 'bad' : 'neutral'} 
                          size="sm" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>
          </div>

          <AutoAnimatedElement animation="slideUp" delay={1000}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Enhanced Agent Behavior Insights
                  </h3>
                  <p className="text-gray-600">
                    AI-powered agent behavior prediction with {agentRankData?.agentBreakdown.length || 0} persona models and {agentRankData?.trends.length || 0} behavioral memories
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleExport} 
                    disabled={exporting || !agentRankData} 
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {exporting ? 'Exporting...' : 'Export Report'}
                  </button>
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    View All Predictions
                  </button>
                </div>
              </div>
            </div>
          </AutoAnimatedElement>
        </>
      )}
    </div>
  );
} 