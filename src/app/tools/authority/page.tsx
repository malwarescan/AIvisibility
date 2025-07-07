'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function AuthorityPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedSignal, setSelectedSignal] = useState('all');

  const authorityMetrics = [
    {
      title: 'Authority Score',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'Overall domain authority',
    },
    {
      title: 'Signal Strength',
      value: '94%',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'Authority signal strength',
    },
    {
      title: 'Trust Signals',
      value: '247',
      change: '+23',
      changeType: 'positive' as const,
      description: 'Active trust signals',
    },
    {
      title: 'Platform Coverage',
      value: '20+',
      change: '+3',
      changeType: 'positive' as const,
      description: 'AI platforms monitored',
    },
  ];

  const signals = [
    { id: 'backlinks', name: 'Backlink Quality', score: 'A+', strength: '96%' },
    { id: 'content', name: 'Content Authority', score: 'A+', strength: '94%' },
    { id: 'social', name: 'Social Signals', score: 'A', strength: '92%' },
    { id: 'technical', name: 'Technical SEO', score: 'A+', strength: '95%' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Authority Signal Monitor
            </h1>
            <p className="text-gray-600">
              Monitor and optimize authority signals across 20+ AI platforms
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Monitoring</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Authority Signal Optimization Active
              </h2>
              <p className="text-gray-600">
                Continuously monitoring and optimizing authority signals across all AI platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={authorityMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Authority Signals */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Authority Signals
          </h2>
          
          <div className="space-y-4">
            {signals.map((signal) => (
              <div key={signal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {signal.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{signal.name}</h3>
                    <p className="text-sm text-gray-600">Authority score</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{signal.score}</div>
                  <div className="text-sm text-green-600 font-medium">{signal.strength}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Monitoring */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Signal Monitoring
          </h2>
          
          <div className="space-y-4">
            {[
              { signal: 'Backlink Quality', status: 'Excellent', trend: 'up' },
              { signal: 'Content Authority', status: 'Excellent', trend: 'up' },
              { signal: 'Social Signals', status: 'Good', trend: 'up' },
              { signal: 'Technical SEO', status: 'Excellent', trend: 'up' },
            ].map((signal) => (
              <div key={signal.signal} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    signal.status === 'Excellent' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{signal.signal}</h3>
                    <p className="text-sm text-gray-600">{signal.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{signal.trend}</div>
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
              Authority Optimization Tools
            </h3>
            <p className="text-gray-600">
              Advanced tools to monitor and optimize authority signals across AI platforms
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Signals
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
              Optimize Authority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 