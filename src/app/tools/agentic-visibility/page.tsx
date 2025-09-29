'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ToolInput } from '@/components/ui/ToolInput';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { AgentAnalyzer, DomainPresence } from '@/lib/core/agents';

interface VisibilityAnalysis {
  domain: string;
  presence: DomainPresence;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
  recommendations: string[];
}

export default function AgenticVisibilityPage() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<VisibilityAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!domain) {
      setError('Please enter a domain');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Analyze domain presence across agents
      const presence = await AgentAnalyzer.analyzeDomainPresence(domain);
      
      // Generate insights
      const insights = generateInsights(presence);
      
      // Generate recommendations
      const recommendations = generateRecommendations(presence);

      setAnalysis({
        domain,
        presence,
        insights,
        recommendations
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateInsights = (presence: DomainPresence) => {
    const insights: Array<{ type: 'positive' | 'negative' | 'neutral'; message: string; impact: string }> = [];

    if (presence.presenceRate > 0.8) {
      insights.push({
        type: 'positive',
        message: 'Strong presence across AI agents',
        impact: 'High visibility potential'
      });
    } else if (presence.presenceRate < 0.4) {
      insights.push({
        type: 'negative',
        message: 'Low presence across AI agents',
        impact: 'Needs optimization'
      });
    }

    const topAgents = presence.agents.filter(a => a.presence).length;
    if (topAgents >= 3) {
      insights.push({
        type: 'positive',
        message: 'Present in multiple top agents',
        impact: 'Broad AI visibility'
      });
    }

    return insights;
  };

  const generateRecommendations = (presence: DomainPresence) => {
    const recommendations: string[] = [];

    if (presence.presenceRate < 0.6) {
      recommendations.push('Improve content quality for AI agent consumption');
      recommendations.push('Optimize for agent-specific capabilities');
      recommendations.push('Increase domain authority and trust signals');
    }

    if (presence.agents.some(a => !a.presence)) {
      recommendations.push('Focus on missing agent platforms');
      recommendations.push('Implement agent-specific content strategies');
    }

    recommendations.push('Monitor agent presence trends regularly');
    recommendations.push('Optimize content for conversational queries');

    return recommendations;
  };

  const getPresenceColor = (presence: boolean) => {
    return presence ? 'text-green-600' : 'text-red-600';
  };

  const getPresenceIcon = (presence: boolean) => {
    return presence ? '✓' : '✗';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agentic Visibility Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze your domain's presence across AI agents and optimize for maximum visibility
            in the AI-powered search landscape.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                             <ToolInput
                 type="text"
                 value={domain}
                 onChange={setDomain}
                 placeholder="Enter domain (e.g., example.com)"
                 label="Domain to Analyze"
                 onEnter={handleAnalyze}
                 disabled={isAnalyzing}
               />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !domain}
                className="w-full md:w-auto"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Visibility'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <div className="text-red-700">
              <strong>Error:</strong> {error}
            </div>
          </Card>
        )}

        {/* Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Summary Card */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {Math.round(analysis.presence.presenceRate * 100)}%
                  </div>
                  <div className="text-gray-600">Presence Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {analysis.presence.agents.filter(a => a.presence).length}
                  </div>
                  <div className="text-gray-600">Active Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {analysis.presence.totalAgents}
                  </div>
                  <div className="text-gray-600">Total Agents</div>
                </div>
              </div>
            </Card>

            {/* Agent Presence Details */}
            <Card>
              <h3 className="text-xl font-semibold mb-6">Agent Presence Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.presence.agents.map((agent) => (
                  <div
                    key={agent.agent}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {agent.agent}
                      </div>
                      <div className="text-sm text-gray-500">
                        {agent.platform}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${getPresenceColor(agent.presence)}`}>
                        {getPresenceIcon(agent.presence)}
                      </span>
                      {agent.presence && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Frequency: {agent.frequency}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last seen: {new Date(agent.lastSeen).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Agents */}
            {analysis.presence.topAgents.length > 0 && (
              <Card>
                <h3 className="text-xl font-semibold mb-4">Top Performing Agents</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.presence.topAgents.map((agent) => (
                    <ScoreBadge
                      key={agent}
                      score={agent}
                      type="status"
                      label={agent}
                      className="bg-green-100 text-green-800"
                    />
                  ))}
                </div>
              </Card>
            )}

            {/* Insights */}
            {analysis.insights.length > 0 && (
              <Card>
                <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
                <div className="space-y-3">
                  {analysis.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        insight.type === 'positive'
                          ? 'border-green-500 bg-green-50'
                          : insight.type === 'negative'
                          ? 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        {insight.message}
                      </div>
                      <div className="text-sm text-gray-600">
                        Impact: {insight.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <h3 className="text-xl font-semibold mb-4">Optimization Recommendations</h3>
              <div className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-700">{recommendation}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Information */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold mb-4">About Agentic Visibility</h3>
          <div className="text-gray-600 space-y-2">
            <p>
              The Agentic Visibility Scanner analyzes how well your domain performs across
              different AI agents like ChatGPT, Claude, Perplexity, and Google AI.
            </p>
            <p>
              High visibility across AI agents indicates strong content quality, authority,
              and relevance for AI-powered search and assistance.
            </p>
            <p>
              Use the insights and recommendations to optimize your content for maximum
              AI agent visibility and engagement.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 