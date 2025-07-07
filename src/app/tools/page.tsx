"use client";

import Link from 'next/link';
import { MetricCard } from '@/components/ui/MetricCard';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

const tools = [
  {
    name: 'AgentRank Simulator',
    description: 'Predict how AI agents will rank your content across 20+ platforms',
    href: '/tools/agentrank',
    metric: '94%',
    metricLabel: 'Prediction Accuracy',
    status: 'excellent' as const
  },
  {
    name: 'CitationFlow Optimizer',
    description: 'Increase citation frequency and authority signals across AI platforms',
    href: '/tools/citationflow',
    metric: '300%',
    metricLabel: 'Citation Increase',
    status: 'excellent' as const
  },
  {
    name: 'AI Search Analytics',
    description: 'Track AI-specific metrics that traditional SEO tools ignore',
    href: '/tools/analytics',
    metric: 'Real-time',
    metricLabel: 'Performance Tracking',
    status: 'good' as const
  },
  {
    name: 'Authority Signal Monitor',
    description: 'Monitor and optimize authority signals across 20+ AI platforms',
    href: '/tools/authority',
    metric: 'A+',
    metricLabel: 'Authority Score',
    status: 'excellent' as const
  },
  {
    name: 'AI-Readiness Auditor',
    description: 'Technical optimization for AI search engines',
    href: '/tools/auditor',
    metric: 'Comprehensive',
    metricLabel: 'Technical Audit',
    status: 'good' as const
  },
  {
    name: 'QueryMind Prediction',
    description: '6-month forecasting for AI search trends and opportunities',
    href: '/tools/querymind',
    metric: '6-month',
    metricLabel: 'Forecasting',
    status: 'good' as const
  },
  {
    name: 'AgentConnect Hub',
    description: 'API integrations and automation for AI search optimization',
    href: '/tools/connect',
    metric: '20+',
    metricLabel: 'Integrations',
    status: 'average' as const
  }
];

export default function ToolsPage() {
  const overallMetrics = [
    {
      title: 'Active Tools',
      value: '7/7',
      change: '+2 this month',
      changeType: 'positive' as const,
      description: 'Complete platform ready',
    },
    {
      title: 'AI Platforms Monitored',
      value: '20+',
      change: '+3 new',
      changeType: 'positive' as const,
      description: 'Comprehensive coverage',
    },
    {
      title: 'Average Optimization',
      value: '91%',
      change: '+17%',
      changeType: 'positive' as const,
      description: 'Across all metrics',
    },
    {
      title: 'Daily Insights',
      value: '347',
      change: '+52',
      changeType: 'positive' as const,
      description: 'Actionable recommendations',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Neural Command Tools
            </h1>
            <p className="text-gray-600">
              Complete AI search intelligence platform with 7 specialized optimization tools
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
              Platform Complete
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium">
              Production Ready
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                All Neural Tools Are Active & Ready
              </h2>
              <p className="text-gray-600">
                Your complete AI search intelligence platform is operational across 20+ AI platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallMetrics.map((metric, index) => (
          <div key={metric.title} className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <div className="text-sm font-medium text-green-600">
                {metric.change}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
            </div>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Getting Started Guide */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Next Steps: Maximize Your AI Search Performance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Start with AgentRank</h3>
            <p className="text-gray-600 text-sm">
              Begin by analyzing your content with AgentRank Simulator to establish baseline AI visibility scores.
            </p>
          </div>
          
          <div className="p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Optimize & Monitor</h3>
            <p className="text-gray-600 text-sm">
              Use CitationFlow and AI-Readiness Auditor to optimize, then monitor progress with Analytics and Authority tools.
            </p>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Automate & Scale</h3>
            <p className="text-gray-600 text-sm">
              Set up QueryMind predictions and AgentConnect automation to scale your AI search optimization efforts.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <AutoAnimatedElement
            key={tool.name}
            animation="slideUp"
            delay={index * 0.1}
          >
            <Link href={tool.href}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tool.status === 'excellent' ? 'bg-green-100 text-green-700' :
                    tool.status === 'good' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {tool.status}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{tool.metric}</p>
                    <p className="text-xs text-gray-500">{tool.metricLabel}</p>
                  </div>
                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </div>
            </Link>
          </AutoAnimatedElement>
        ))}
      </div>

      {/* Quick Actions */}
      <AutoAnimatedElement animation="slideUp" delay={0.8}>
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 rounded-xl text-blue-700 font-medium hover:bg-blue-100 transition-colors">
              Run Full Analysis
            </button>
            <button className="p-4 bg-green-50 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors">
              Export Report
            </button>
            <button className="p-4 bg-purple-50 rounded-xl text-purple-700 font-medium hover:bg-purple-100 transition-colors">
              Schedule Audit
            </button>
          </div>
        </div>
      </AutoAnimatedElement>
    </div>
  );
} 