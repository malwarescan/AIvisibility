'use client';

import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function TestComponentsPage() {
  const testMetrics = [
    {
      title: 'Test Metric 1',
      value: '100%',
      change: '+5%',
      changeType: 'positive' as const,
      description: 'Test description 1',
    },
    {
      title: 'Test Metric 2',
      value: '85%',
      change: '-2%',
      changeType: 'negative' as const,
      description: 'Test description 2',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Component Import Test</h1>
      
      <div className="space-y-6">
        {/* Test AutoAnimatedElement */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AutoAnimatedElement Test</h2>
          <AutoAnimatedElement animation="slideUp">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              If you see this blue box with animation, AutoAnimatedElement works!
            </div>
          </AutoAnimatedElement>
        </div>

        {/* Test StatusIndicator */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">StatusIndicator Test</h2>
          <div className="space-y-2">
            <StatusIndicator status="excellent" label="Excellent Status" />
            <StatusIndicator status="good" label="Good Status" />
            <StatusIndicator status="average" label="Average Status" />
          </div>
        </div>

        {/* Test TimeRangeSelector */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">TimeRangeSelector Test</h2>
          <TimeRangeSelector 
            selected="7d" 
            onChange={(range) => alert(`Selected: ${range}`)} 
          />
        </div>

        {/* Test MetricsOverview */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">MetricsOverview Test</h2>
          <MetricsOverview metrics={testMetrics} />
        </div>
      </div>
    </div>
  );
} 