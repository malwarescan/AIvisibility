'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function CitationFlowPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedContent, setSelectedContent] = useState('all');

  const citationMetrics = [
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

      <MetricsOverview metrics={citationMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Performance */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Content Performance
          </h2>
          
          <div className="space-y-4">
            {contentTypes.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {content.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{content.name}</h3>
                    <p className="text-sm text-gray-600">{content.citations} citations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{content.increase}</div>
                  <StatusIndicator status="excellent" size="sm" />
                </div>
              </div>
            ))}
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