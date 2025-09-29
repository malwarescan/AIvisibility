"use client";

import Link from 'next/link';
import { MetricCard } from '@/components/ui/MetricCard';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

const tools = [
  {
    id: 'agentrank',
    title: 'AgentRank',
    description: 'Simulate AI agent responses and optimize content for ChatGPT, Claude, and Perplexity',
    icon: 'AR',
    href: '/tools/agentrank'
  },
  {
    id: 'authority',
    title: 'Authority Signal Monitor',
    description: 'Monitor E-A-T signals and authority metrics across AI platforms',
    icon: 'AS',
    href: '/tools/authority'
  },
  {
    id: 'analytics',
    title: 'AI Analytics',
    description: 'Comprehensive analytics for AI search performance and trends',
    icon: 'AA',
    href: '/tools/analytics'
  },
  {
    id: 'citationflow',
    title: 'CitationFlow',
    description: 'Track citation patterns and authority flow across AI platforms',
    icon: 'CF',
    href: '/tools/citationflow'
  },
  {
    id: 'agentic-visibility',
    title: 'Agentic Visibility Scanner',
    description: 'Analyze domain presence across all AI agents and platforms',
    icon: 'AV',
    href: '/tools/agentic-visibility'
  },
  {
    id: 'schema-optimizer',
    title: 'Schema Optimizer',
    description: 'Optimize JSON-LD schema markup for rich results and AI consumption',
    icon: 'SO',
    href: '/tools/schema-optimizer'
  },
  {
    id: 'schema-reverse-engineer',
    title: 'Schema Reverse Engineer',
    description: 'Extract and analyze schema patterns from AI Overview results',
    icon: 'SR',
    href: '/tools/schema-reverse-engineer'
  },
  {
    id: 'schema-scoring',
    title: 'Schema Scoring',
    description: 'Score and validate JSON-LD schema markup for AI optimization',
    icon: 'SS',
    href: '/tools/schema-scoring'
  }
];

export default function ToolsPage() {


  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          AI Search Tools
        </h1>
                    <p className="text-gray-600">
              8 functional tools to optimize your content for AI search engines
            </p>
      </div>

      {/* Tools Grid - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <AutoAnimatedElement
            key={tool.id}
            animation="slideUp"
            delay={index * 0.1}
          >
            <Link href={tool.href}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-lg">
                      {tool.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Click to use →
                  </div>
                </div>
              </div>
            </Link>
          </AutoAnimatedElement>
        ))}
      </div>

      {/* Simple Quick Actions */}
      <AutoAnimatedElement animation="slideUp" delay={0.8}>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                View Dashboard
              </button>
            </Link>
            <Link href="/tools/agentrank">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                Start Analysis
              </button>
            </Link>
          </div>
        </div>
      </AutoAnimatedElement>
    </div>
  );
} 