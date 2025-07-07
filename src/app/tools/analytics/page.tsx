'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const analyticsMetrics = [
    {
      title: 'AI Search Visibility',
      value: '94%',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Across 20+ AI platforms',
    },
    {
      title: 'Citation Frequency',
      value: '2,847',
      change: '+23%',
      changeType: 'positive' as const,
      description: 'Total citations this month',
    },
    {
      title: 'Authority Score',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'Domain authority rating',
    },
    {
      title: 'Response Rate',
      value: '87%',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'AI platform responses',
    },
  ];

  const metrics = [
    { id: 'visibility', name: 'Search Visibility', value: '94%', trend: 'up' },
    { id: 'citations', name: 'Citation Count', value: '2,847', trend: 'up' },
    { id: 'authority', name: 'Authority Score', value: 'A+', trend: 'up' },
    { id: 'responses', name: 'Response Rate', value: '87%', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
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

      <MetricsOverview metrics={analyticsMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Performance Trends
          </h2>
          
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{metric.name}</h3>
                    <p className="text-sm text-gray-600">Last 7 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-green-600 font-medium">+12%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Platform Breakdown
          </h2>
          
          <div className="space-y-4">
            {[
              { platform: 'ChatGPT', visibility: '96%', citations: '1,247' },
              { platform: 'Claude', visibility: '92%', citations: '856' },
              { platform: 'Perplexity', visibility: '89%', citations: '543' },
              { platform: 'Google AI', visibility: '91%', citations: '201' },
            ].map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {platform.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{platform.platform}</h3>
                    <p className="text-sm text-gray-600">{platform.citations} citations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{platform.visibility}</div>
                  <StatusIndicator status="excellent" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Export Data
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 