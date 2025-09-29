'use client';

import React, { useState, useEffect } from 'react';
import { AppleCard } from '@/components/apple/AppleCard';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { ToolProgressModal } from '@/components/ui/ToolProgressModal';
import { Button } from '@/components/common/Button';
import { ToolInput } from '@/components/ui/ToolInput';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { DashboardData, ToolInsight, SchemaOptimizerInsight } from '@/types/dashboard';
import { SchemaOptimizerInsightDisplay } from '@/components/tools/shared/SchemaOptimizerInsight';
import { SchemaScoreCard } from '@/components/ui/SchemaScoreCard';

export default function DashboardPage() {
  const [domain, setDomain] = useState('');
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [progressState, setProgressState] = useState({
    currentStep: '',
    currentProgress: 0,
    totalSteps: 4,
    errors: [] as string[]
  });

  const handleAnalyze = async () => {
    if (!domain && !url && !query) {
      setError('Please provide at least one input (domain, URL, or query)');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowProgress(true);
    setProgressState({
      currentStep: 'Initializing analysis...',
      currentProgress: 1,
      totalSteps: 4,
      errors: []
    });

    try {
      const params = new URLSearchParams();
      if (domain) params.append('domain', domain);
      if (url) params.append('url', url);
      if (query) params.append('query', query);

      setProgressState(prev => ({
        ...prev,
        currentStep: 'Fetching tool insights...',
        currentProgress: 2
      }));

      const response = await fetch(`/api/dashboard?${params.toString()}`);
      const result = await response.json();

      setProgressState(prev => ({
        ...prev,
        currentStep: 'Processing results...',
        currentProgress: 3
      }));

      if (!result.success) {
        throw new Error(result.error || 'Dashboard analysis failed');
      }

      setProgressState(prev => ({
        ...prev,
        currentStep: 'Finalizing dashboard...',
        currentProgress: 4
      }));

      setDashboardData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setProgressState(prev => ({
        ...prev,
        errors: [err instanceof Error ? err.message : 'Analysis failed']
      }));
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowProgress(false), 1000);
    }
  };

  const getToolIcon = (tool: string) => {
    const icons: { [key: string]: string } = {
      'overviewiq': '🔍',
      'agentrank': '🤖',
      'agentic-visibility': '👁️',
      'schema': '📋',
      'schema-optimizer': '🔧',
      'citationflow': '📊',
      'authority': '🏆',
      'analytics': '📈',
      'serp': '🔎'
    };
    return icons[tool] || '⚙️';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'poor';
  };

  // Schema Score helper functions
  const getSchemaScoreValue = (insights: ToolInsight[]) => {
    const schemaInsight = insights.find(i => i.tool === 'schema-optimizer');
    if (schemaInsight && schemaInsight.score !== undefined) {
      return `${schemaInsight.score}%`;
    }
    return 'N/A';
  };

  const getSchemaScoreTrend = (insights: ToolInsight[]) => {
    const schemaInsight = insights.find(i => i.tool === 'schema-optimizer') as SchemaOptimizerInsight;
    if (schemaInsight?.metadata?.aiOptimization) {
      const scores = Object.values(schemaInsight.metadata.aiOptimization);
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const baseScore = schemaInsight.score || 75;
      const change = avgScore - baseScore;
      return `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
    }
    return '+0%';
  };

  const getSchemaScoreChangeType = (insights: ToolInsight[]) => {
    const schemaInsight = insights.find(i => i.tool === 'schema-optimizer') as SchemaOptimizerInsight;
    if (schemaInsight?.metadata?.aiOptimization) {
      const scores = Object.values(schemaInsight.metadata.aiOptimization);
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const baseScore = schemaInsight.score || 75;
      const change = avgScore - baseScore;
      return change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
    }
    return 'neutral';
  };

  const getSchemaScoreDescription = (insights: ToolInsight[]) => {
    const schemaInsight = insights.find(i => i.tool === 'schema-optimizer') as SchemaOptimizerInsight;
    if (schemaInsight?.metadata?.validation?.isValid) {
      return 'Valid schema markup';
    } else if (schemaInsight?.metadata?.validation?.isValid === false) {
      return 'Invalid schema markup';
    }
    return 'Schema optimization score';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Neural Command Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI search optimization insights from all tools in one unified view
          </p>
        </div>

        {/* Input Section */}
        <AutoAnimatedElement animation="slideUp">
          <AppleCard className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Analysis Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <ToolInput
                type="text"
                value={domain}
                onChange={setDomain}
                placeholder="Enter domain (e.g., example.com)"
                label="Domain"
                disabled={isLoading}
              />
              <ToolInput
                type="url"
                value={url}
                onChange={setUrl}
                placeholder="Enter URL (e.g., https://example.com)"
                label="URL"
                disabled={isLoading}
              />
              <ToolInput
                type="text"
                value={query}
                onChange={setQuery}
                placeholder="Enter search query"
                label="Query"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || (!domain && !url && !query)}
                className="px-8"
              >
                {isLoading ? 'Analyzing...' : 'Generate Dashboard'}
              </Button>
            </div>
          </AppleCard>
        </AutoAnimatedElement>

        {/* Error Display */}
        {error && (
          <AutoAnimatedElement animation="slideUp" delay={0.1}>
            <AppleCard className="mb-8 border-red-200 bg-red-50">
              <div className="text-red-700">
                <strong>Error:</strong> {error}
              </div>
            </AppleCard>
          </AutoAnimatedElement>
        )}

        {/* Progress Modal */}
        {showProgress && (
          <ToolProgressModal
            isVisible={showProgress}
            toolName="Neural Command Dashboard"
            currentUrl={url || domain || query || ''}
            currentProgress={progressState.currentProgress}
            currentStep={progressState.currentStep}
            totalSteps={progressState.totalSteps}
            errors={progressState.errors}
          />
        )}

        {/* Dashboard Results */}
        {dashboardData && (
          <div className="space-y-8">
            {/* Summary Section */}
            <AutoAnimatedElement animation="slideUp" delay={0.2}>
              <AppleCard>
                <h3 className="text-xl font-semibold mb-6">Dashboard Summary</h3>
                <MetricsOverview
                  metrics={[
                    {
                      title: 'Tools Analyzed',
                      value: dashboardData.summary.totalTools.toString(),
                      change: '',
                      changeType: 'neutral',
                      description: 'Total tools processed'
                    },
                    {
                      title: 'Average Score',
                      value: `${dashboardData.summary.averageScore}%`,
                      change: '',
                      changeType: 'positive',
                      description: 'Overall performance'
                    },
                    {
                      title: 'Schema Score',
                      value: getSchemaScoreValue(dashboardData.insights),
                      change: getSchemaScoreTrend(dashboardData.insights),
                      changeType: getSchemaScoreChangeType(dashboardData.insights),
                      description: getSchemaScoreDescription(dashboardData.insights)
                    },
                    {
                      title: 'Top Tool',
                      value: dashboardData.summary.topPerformingTool,
                      change: '',
                      changeType: 'positive',
                      description: 'Best performing tool'
                    }
                  ]}
                />
              </AppleCard>
            </AutoAnimatedElement>

            {/* Schema Score Section */}
            <AutoAnimatedElement animation="slideUp" delay={0.3}>
              <AppleCard>
                <h3 className="text-xl font-semibold mb-6">Schema Optimization Score</h3>
                {(() => {
                  const schemaInsight = dashboardData.insights.find(i => i.tool === 'schema-optimizer') as SchemaOptimizerInsight;
                  if (schemaInsight) {
                    const validation = schemaInsight.metadata?.validation?.isValid === true ? 'valid' : 
                                     schemaInsight.metadata?.validation?.isValid === false ? 'invalid' : 'unknown';
                    const trend = {
                      change: getSchemaScoreTrend(dashboardData.insights),
                      status: getSchemaScoreChangeType(dashboardData.insights) === 'positive' ? 'improving' : 
                             getSchemaScoreChangeType(dashboardData.insights) === 'negative' ? 'declining' : 'stable'
                    };
                    const platformScores = schemaInsight.metadata?.aiOptimization;
                    
                    return (
                      <SchemaScoreCard
                        score={schemaInsight.score || 75}
                        validation={validation}
                        trend={trend}
                        platformScores={platformScores}
                        lastUpdated={schemaInsight.updatedAt}
                      />
                    );
                  }
                  return (
                    <div className="text-center py-8 text-gray-500">
                      No schema optimization data available
                    </div>
                  );
                })()}
              </AppleCard>
            </AutoAnimatedElement>

            {/* Tool Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboardData.insights.map((insight, index) => (
                <AutoAnimatedElement key={index} animation="slideUp" delay={0.3 + index * 0.1}>
                  <AppleCard className="hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getToolIcon(insight.tool)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 capitalize">
                            {insight.tool.replace('-', ' ')}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Updated {new Date(insight.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {insight.score !== undefined && (
                        <ScoreBadge
                          score={insight.score}
                          type="percentage"
                          size="lg"
                          className={getScoreColor(insight.score)}
                        />
                      )}
                    </div>

                    {/* Schema Optimizer Detailed View */}
                    {insight.tool === 'schema-optimizer' && (
                      <SchemaOptimizerInsightDisplay insight={insight as SchemaOptimizerInsight} />
                    )}

                    {/* Standard Insights for other tools */}
                    {insight.tool !== 'schema-optimizer' && (
                      <>
                        {/* Insights */}
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Key Insights</h5>
                          <div className="space-y-1">
                            {insight.insights.slice(0, 3).map((insightText, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="text-sm text-gray-700">{insightText}</div>
                              </div>
                            ))}
                            {insight.insights.length > 3 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{insight.insights.length - 3} more insights
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Recommendations</h5>
                          <div className="space-y-1">
                            {insight.recommendations.slice(0, 2).map((rec, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="text-sm text-gray-700">{rec}</div>
                              </div>
                            ))}
                            {insight.recommendations.length > 2 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{insight.recommendations.length - 2} more recommendations
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </AppleCard>
                </AutoAnimatedElement>
              ))}
            </div>

            {/* Trends Section */}
            {dashboardData.trends.length > 0 && (
              <AutoAnimatedElement animation="slideUp" delay={0.4}>
                <AppleCard>
                  <h3 className="text-xl font-semibold mb-4">Performance Trends</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {dashboardData.trends.map((trend, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm text-gray-600 mb-1">
                          {new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          {trend.averageScore}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {trend.toolCount} tools
                        </div>
                      </div>
                    ))}
                  </div>
                </AppleCard>
              </AutoAnimatedElement>
            )}

            {/* Quick Actions */}
            <AutoAnimatedElement animation="slideUp" delay={0.5}>
              <AppleCard>
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => window.open('/tools/overviewiq', '_blank')}
                    className="w-full"
                  >
                    View OverviewIQ Details
                  </Button>
                  <Button
                    onClick={() => window.open('/tools/agentrank', '_blank')}
                    className="w-full"
                  >
                    View AgentRank Details
                  </Button>
                  <Button
                    onClick={() => window.open('/tools/agentic-visibility', '_blank')}
                    className="w-full"
                  >
                    View Visibility Details
                  </Button>
                  <Button
                    onClick={() => window.open('/tools/schema-optimizer', '_blank')}
                    className="w-full"
                  >
                    View Schema Optimizer
                  </Button>
                </div>
              </AppleCard>
            </AutoAnimatedElement>
          </div>
        )}

        {/* Information */}
        <AutoAnimatedElement animation="slideUp" delay={0.6}>
          <AppleCard className="mt-8">
            <h3 className="text-lg font-semibold mb-4">About the Dashboard</h3>
            <div className="text-gray-600 space-y-2">
              <p>
                The Neural Command Dashboard provides a unified view of AI search optimization
                insights from all available tools. Each tool contributes specific analysis
                and recommendations to help optimize your content for AI-powered search.
              </p>
              <p>
                The dashboard aggregates data from OverviewIQ, AgentRank, Agentic Visibility Scanner,
                Schema Optimizer, CitationFlow, Authority Analyzer, Analytics, and SERP Analysis tools.
              </p>
              <p>
                Use the insights and recommendations to improve your content's performance
                across all AI search platforms and agents.
              </p>
            </div>
          </AppleCard>
        </AutoAnimatedElement>
      </div>
    </div>
  );
} 