'use client';

import React from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

export default function TestComponentsPage() {
  const testMetrics = [
    {
      title: 'Test Metric 1',
      value: '85%',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Test description 1',
    },
    {
      title: 'Test Metric 2',
      value: '1,234',
      change: '+5%',
      changeType: 'positive' as const,
      description: 'Test description 2',
    },
    {
      title: 'Test Metric 3',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'Test description 3',
    },
    {
      title: 'Test Metric 4',
      value: '92%',
      change: '-3%',
      changeType: 'negative' as const,
      description: 'Test description 4',
    },
  ];

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Component Test Page
          </h1>
          <p className="text-gray-600">
            Test various components and their functionality
          </p>
        </div>
      </AutoAnimatedElement>

      {/* Test MetricsOverview */}
      <AutoAnimatedElement animation="slideUp" delay={200}>
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">MetricsOverview Test</h2>
          <MetricsOverview metrics={testMetrics} />
        </div>
      </AutoAnimatedElement>

      {/* Test StatusIndicator */}
      <AutoAnimatedElement animation="slideUp" delay={400}>
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">StatusIndicator Test</h2>
          <div className="space-y-4">
            <StatusIndicator status="success" message="Test success message" />
            <StatusIndicator status="error" message="Test error message" />
            <StatusIndicator status="warning" message="Test warning message" />
            <StatusIndicator status="info" message="Test info message" />
          </div>
        </div>
      </AutoAnimatedElement>

      {/* Test AutoAnimatedElement */}
      <AutoAnimatedElement animation="slideUp" delay={600}>
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AutoAnimatedElement Test</h2>
          <div className="space-y-4">
            <AutoAnimatedElement animation="fadeIn" delay={0}>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700">Fade In Animation</p>
              </div>
            </AutoAnimatedElement>
            
            <AutoAnimatedElement animation="slideUp" delay={200}>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700">Slide Up Animation</p>
              </div>
            </AutoAnimatedElement>
            
            <AutoAnimatedElement animation="scale" delay={400}>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-700">Scale Animation</p>
              </div>
            </AutoAnimatedElement>
          </div>
        </div>
      </AutoAnimatedElement>
    </div>
  );
} 