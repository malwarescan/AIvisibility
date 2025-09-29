'use client';

import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface CitationData {
  totalCitations: number;
  citationVelocity: number;
  authorityScore: number;
  platformBreakdown: Array<{
    platform: string;
    citations: number;
    growth: number;
    authority: number;
  }>;
  trends: Array<{
    date: string;
    citations: number;
    velocity: number;
  }>;
  opportunities: Array<{
    type: string;
    description: string;
    potential: number;
  }>;
}

export default function CitationFlowPage() {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [citationData, setCitationData] = useState<CitationData | null>(null);
  const [exporting, setExporting] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): CitationData => {
      const baseCitations = 5000 + Math.random() * 3000;
      const baseVelocity = 150 + Math.random() * 100;
      
      return {
        totalCitations: Math.round(baseCitations),
        citationVelocity: Math.round(baseVelocity),
        authorityScore: Math.round(85 + Math.random() * 15),
        platformBreakdown: [
          { platform: 'ChatGPT', citations: 2000 + Math.random() * 1000, growth: 25 + Math.random() * 15, authority: 90 + Math.random() * 10 },
          { platform: 'Claude', citations: 1500 + Math.random() * 800, growth: 18 + Math.random() * 12, authority: 85 + Math.random() * 10 },
          { platform: 'Perplexity', citations: 1000 + Math.random() * 600, growth: 30 + Math.random() * 20, authority: 80 + Math.random() * 10 },
          { platform: 'Google AI', citations: 500 + Math.random() * 300, growth: 40 + Math.random() * 25, authority: 88 + Math.random() * 10 },
        ],
        trends: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          citations: 4000 + Math.random() * 2000,
          velocity: 120 + Math.random() * 80,
        })),
        opportunities: [
          { type: 'High Impact', description: 'Increase ChatGPT citations by optimizing content structure', potential: 35 },
          { type: 'Medium Impact', description: 'Improve Claude visibility through technical content', potential: 25 },
          { type: 'Low Impact', description: 'Maintain Perplexity performance with current strategy', potential: 10 },
        ],
      };
    };

    setIsLoading(true);
    const timer = setTimeout(() => {
      setCitationData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(citationData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `citationflow-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 2000);
  };

  const citationMetrics = citationData ? [
    {
      title: 'Total Citations',
      value: citationData.totalCitations.toLocaleString(),
      change: `+${Math.round(Math.random() * 30)}%`,
      changeType: 'positive' as const,
      description: 'Across all AI platforms',
    },
    {
      title: 'Citation Velocity',
      value: `${citationData.citationVelocity}/day`,
      change: `+${Math.round(Math.random() * 20)}%`,
      changeType: 'positive' as const,
      description: 'Daily citation growth rate',
    },
    {
      title: 'Authority Score',
      value: `${citationData.authorityScore}%`,
      change: `+${Math.round(Math.random() * 5)}%`,
      changeType: 'positive' as const,
      description: 'Domain authority rating',
    },
    {
      title: 'Platform Coverage',
      value: '20+',
      change: `+${Math.round(Math.random() * 3)}`,
      changeType: 'positive' as const,
      description: 'AI platforms monitored',
    },
  ] : [];

  const getGrowthColor = (value: number) => {
    return value > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getOpportunityColor = (potential: number) => {
    if (potential >= 30) return 'text-green-600';
    if (potential >= 20) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
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
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Live Data</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">Chart</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Citation Velocity Optimization
                </h2>
                <p className="text-gray-600">
                  Track and optimize citation frequency across ChatGPT, Claude, Perplexity, and Google AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-gray-600">Loading citation data...</span>
          </div>
        </div>
      ) : (
        <>
          <AutoAnimatedElement animation="slideUp" delay={200}>
            <MetricsOverview metrics={citationMetrics} />
          </AutoAnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Citation Trends */}
            <AutoAnimatedElement animation="slideUp" delay={400}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Citation Trends
                </h2>
                
                <div className="space-y-4">
                  {citationData?.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{trend.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{trend.citations.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Citations</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{trend.velocity.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Velocity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Opportunities */}
            <AutoAnimatedElement animation="slideUp" delay={600}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Optimization Opportunities
                </h2>
                
                <div className="space-y-4">
                  {citationData?.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          opportunity.potential >= 30 ? 'bg-green-500' : opportunity.potential >= 20 ? 'bg-blue-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <h3 className="font-medium text-gray-900">{opportunity.type}</h3>
                          <p className="text-sm text-gray-600">{opportunity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getOpportunityColor(opportunity.potential)}`}>
                          {opportunity.potential}% Potential
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>
          </div>
        </>
      )}

      <AutoAnimatedElement animation="slideUp" delay={800}>
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
      </AutoAnimatedElement>
    </div>
  );
} 