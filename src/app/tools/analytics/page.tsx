'use client';

import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface AnalyticsData {
  visibility: number;
  citations: number;
  authority: string;
  responseRate: number;
  platformBreakdown: Array<{
    platform: string;
    visibility: number;
    citations: number;
    growth: number;
  }>;
  trends: Array<{
    date: string;
    visibility: number;
    citations: number;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [exporting, setExporting] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): AnalyticsData => {
      const baseVisibility = 85 + Math.random() * 15;
      const baseCitations = 2000 + Math.random() * 1000;
      
      return {
        visibility: Math.round(baseVisibility),
        citations: Math.round(baseCitations),
        authority: ['A+', 'A', 'B+'][Math.floor(Math.random() * 3)],
        responseRate: Math.round(80 + Math.random() * 15),
        platformBreakdown: [
          { platform: 'ChatGPT', visibility: 90 + Math.random() * 10, citations: 1000 + Math.random() * 500, growth: 12 + Math.random() * 8 },
          { platform: 'Claude', visibility: 85 + Math.random() * 10, citations: 800 + Math.random() * 400, growth: 8 + Math.random() * 6 },
          { platform: 'Perplexity', visibility: 80 + Math.random() * 10, citations: 600 + Math.random() * 300, growth: 15 + Math.random() * 10 },
          { platform: 'Google AI', visibility: 88 + Math.random() * 10, citations: 400 + Math.random() * 200, growth: 20 + Math.random() * 15 },
        ],
        trends: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          visibility: 80 + Math.random() * 20,
          citations: 1500 + Math.random() * 1000,
        })),
        insights: [
          { type: 'positive' as const, message: 'ChatGPT visibility increased by 15%', impact: 'High' },
          { type: 'positive' as const, message: 'Citation frequency improved across all platforms', impact: 'Medium' },
          { type: 'neutral' as const, message: 'Google AI performance stable', impact: 'Low' },
        ],
      };
    };

    setIsLoading(true);
    const timer = setTimeout(() => {
      setAnalyticsData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 2000);
  };

  const analyticsMetrics = analyticsData ? [
    {
      title: 'AI Search Visibility',
      value: `${analyticsData.visibility}%`,
      change: `+${Math.round(Math.random() * 15)}%`,
      changeType: 'positive' as const,
      description: 'Across 20+ AI platforms',
    },
    {
      title: 'Citation Frequency',
      value: analyticsData.citations.toLocaleString(),
      change: `+${Math.round(Math.random() * 25)}%`,
      changeType: 'positive' as const,
      description: 'Total citations this month',
    },
    {
      title: 'Authority Score',
      value: analyticsData.authority,
      change: `+${Math.round(Math.random() * 3)}`,
      changeType: 'positive' as const,
      description: 'Domain authority rating',
    },
    {
      title: 'Response Rate',
      value: `${analyticsData.responseRate}%`,
      change: `+${Math.round(Math.random() * 10)}%`,
      changeType: 'positive' as const,
      description: 'AI platform responses',
    },
  ] : [];

  const getTrendColor = (value: number, threshold: number = 0) => {
    return value > threshold ? 'text-green-600' : 'text-red-600';
  };

  const getPerformanceStatus = (value: number) => {
    if (value >= 90) return 'excellent';
    if (value >= 80) return 'good';
    if (value >= 70) return 'average';
    return 'poor';
  };

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                AI Search Analytics
              </h1>
              <p className="text-gray-600">
                Real-time performance tracking for AI search optimization
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <TimeRangeSelector
                selected={timeRange}
                onChange={setTimeRange}
              />
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-600">Live Data</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">↑</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Real-Time AI Search Performance
                </h2>
                <p className="text-gray-600">
                  Track your content&rsquo;s performance across ChatGPT, Claude, Perplexity, and Google AI Overviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading analytics data...</span>
          </div>
        </div>
      ) : (
        <>
          <AutoAnimatedElement animation="slideUp" delay={200}>
            <MetricsOverview metrics={analyticsMetrics} />
          </AutoAnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Trends */}
            <AutoAnimatedElement animation="slideUp" delay={400}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Performance Trends
                </h2>
                
                <div className="space-y-4">
                  {analyticsData?.trends.slice(-4).map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <div>
                          <h3 className="font-medium text-gray-900">{trend.date}</h3>
                          <p className="text-sm text-gray-600">Daily performance</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{trend.visibility}%</div>
                        <div className={`text-sm font-medium ${getTrendColor(trend.visibility, 85)}`}>
                          {trend.visibility > 85 ? '+' : ''}{Math.round(trend.visibility - 85)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Platform Breakdown */}
            <AutoAnimatedElement animation="slideUp" delay={600}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Platform Breakdown
                </h2>
                
                <div className="space-y-4">
                  {analyticsData?.platformBreakdown.map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {platform.platform.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{platform.platform}</h3>
                          <p className="text-sm text-gray-600">{platform.citations.toLocaleString()} citations</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{platform.visibility}%</div>
                        <StatusIndicator status={getPerformanceStatus(platform.visibility)} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>
          </div>

          {/* AI Insights */}
          <AutoAnimatedElement animation="slideUp" delay={800}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                AI Performance Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyticsData?.insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${
                    insight.type === 'positive' ? 'bg-green-50 border-green-200' :
                    insight.type === 'negative' ? 'bg-red-50 border-red-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        insight.type === 'positive' ? 'text-green-700 bg-green-100' :
                        insight.type === 'negative' ? 'text-red-700 bg-red-100' :
                        'text-gray-700 bg-gray-100'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </AutoAnimatedElement>

          {/* Advanced Analytics & Reports */}
          <AutoAnimatedElement animation="slideUp" delay={1000}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Advanced Analytics & Reports
                  </h3>
                  <p className="text-gray-600">
                    Generate detailed reports and export data for further analysis
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleExport}
                    disabled={exporting}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {exporting ? 'Exporting...' : 'Export Data'}
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Generate Report
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