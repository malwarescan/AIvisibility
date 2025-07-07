'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function AgentConnectPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const connectMetrics = [
    {
      title: 'Active Integrations',
      value: '24/28',
      change: '+3',
      changeType: 'positive' as const,
      description: 'Connected platforms',
    },
    {
      title: 'API Success Rate',
      value: '98.7%',
      change: '+2.1%',
      changeType: 'positive' as const,
      description: 'Reliable connections',
    },
    {
      title: 'Data Sync',
      value: 'Real-time',
      change: '+15min',
      changeType: 'positive' as const,
      description: 'Update frequency',
    },
    {
      title: 'Automation Rules',
      value: '47',
      change: '+8',
      changeType: 'positive' as const,
      description: 'Active workflows',
    },
  ];

  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', status: 'connected', icon: 'C' },
    { id: 'claude', name: 'Claude', status: 'connected', icon: 'C' },
    { id: 'perplexity', name: 'Perplexity', status: 'connected', icon: 'P' },
    { id: 'google-ai', name: 'Google AI', status: 'connected', icon: 'G' },
    { id: 'bing-ai', name: 'Bing AI', status: 'connected', icon: 'B' },
    { id: 'anthropic', name: 'Anthropic', status: 'pending', icon: 'A' },
    { id: 'openai', name: 'OpenAI', status: 'connected', icon: 'O' },
    { id: 'cohere', name: 'Cohere', status: 'connected', icon: 'C' },
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              AgentConnect Hub
            </h1>
            <p className="text-gray-600">
              API integrations and automation for AI search optimization
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Connected</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Platform Integrations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{platform.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                  <StatusIndicator status={platform.status as any} size="sm" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isConnecting ? 'Connecting...' : 'Sync All Platforms'}
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Add Custom API
            </button>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={connectMetrics} />

      {showResults && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Sync Results
          </h2>
          
          <div className="space-y-4">
            {platforms.slice(0, 4).map((platform, index) => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{platform.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-600">Last sync: 2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIndicator status="excellent" size="sm" />
                  <span className="text-sm text-green-600 font-medium">Synced</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Sync Complete</h3>
            <p className="text-green-700">
              Successfully synchronized data from 24 platforms. All integrations are active and monitoring.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Automation & Workflows
            </h3>
            <p className="text-gray-600">
              Create custom rules and automated workflows for AI search optimization
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Rules
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Create Workflow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 