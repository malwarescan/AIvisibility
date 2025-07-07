'use client';

import React, { useState } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export default function AgentRankPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const agentRankMetrics = [
    {
      title: 'Prediction Accuracy',
      value: '94%',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'AI agent behavior prediction',
    },
    {
      title: 'Ranking Confidence',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'High confidence predictions',
    },
    {
      title: 'Platform Coverage',
      value: '20+',
      change: '+3',
      changeType: 'positive' as const,
      description: 'AI platforms monitored',
    },
    {
      title: 'Response Rate',
      value: '87%',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Prediction accuracy rate',
    },
  ];

  const agents = [
    { id: 'chatgpt', name: 'ChatGPT', rank: '1st', confidence: '96%' },
    { id: 'claude', name: 'Claude', rank: '2nd', confidence: '94%' },
    { id: 'perplexity', name: 'Perplexity', rank: '3rd', confidence: '92%' },
    { id: 'google-ai', name: 'Google AI', rank: '4th', confidence: '89%' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              AgentRank Simulator
            </h1>
            <p className="text-gray-600">
              Predict how AI agents will rank your content across 20+ platforms
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Simulating</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                AI Agent Behavior Prediction
              </h2>
              <p className="text-gray-600">
                Advanced simulation to predict how AI agents will rank and respond to your content
              </p>
            </div>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={agentRankMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Rankings */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Agent Rankings
          </h2>
          
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {agent.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">Predicted rank</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{agent.rank}</div>
                  <div className="text-sm text-purple-600 font-medium">{agent.confidence}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction Factors */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Prediction Factors
          </h2>
          
          <div className="space-y-4">
            {[
              { factor: 'Content Quality', weight: 'High', impact: '95%' },
              { factor: 'Authority Signals', weight: 'High', impact: '92%' },
              { factor: 'Citation Frequency', weight: 'Medium', impact: '88%' },
              { factor: 'Schema Markup', weight: 'Medium', impact: '85%' },
            ].map((factor) => (
              <div key={factor.factor} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    factor.weight === 'High' ? 'bg-purple-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{factor.factor}</h3>
                    <p className="text-sm text-gray-600">{factor.weight} weight</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{factor.impact}</div>
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
              Advanced Prediction Tools
            </h3>
            <p className="text-gray-600">
              Deep learning models to predict AI agent behavior and optimize content accordingly
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Predictions
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
              Run Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 