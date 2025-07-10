"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  LinkIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const tools = [
  {
    name: 'Overview',
    href: '/tools',
    icon: HomeIcon,
    description: 'Tools dashboard',
    status: 'active'
  },
  {
    name: 'AgentRank Simulator',
    href: '/tools/agentrank',
    icon: CpuChipIcon,
    description: 'Predict AI agent behavior',
    status: 'active'
  },
  {
    name: 'AI Search Analytics',
    href: '/tools/analytics',
    icon: ChartBarIcon,
    description: 'Real-time performance tracking',
    status: 'active'
  },
  {
    name: 'CitationFlow Optimizer',
    href: '/tools/citationflow',
    icon: DocumentMagnifyingGlassIcon,
    description: 'Increase citation rate 300%',
    status: 'active'
  },
  {
    name: 'Authority Signal Monitor',
    href: '/tools/authority',
    icon: ShieldCheckIcon,
    description: 'Track domain authority',
    status: 'active'
  },
  {
    name: 'Batch Authority Analyzer',
    href: '/tools/batch-authority',
    icon: ShieldCheckIcon,
    description: 'Compare multiple domains',
    status: 'active'
  },
  {
    name: 'AI-Readiness Auditor',
    href: '/tools/auditor',
    icon: WrenchScrewdriverIcon,
    description: 'Technical SEO audit',
    status: 'active'
  },
  {
    name: 'QueryMind Prediction',
    href: '/tools/querymind',
    icon: SparklesIcon,
    description: '6-month trend forecasting',
    status: 'active'
  },
  {
    name: 'AgentConnect Hub',
    href: '/tools/connect',
    icon: LinkIcon,
    description: 'API integrations & automation',
    status: 'active'
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="font-medium">← Back to Home</span>
        </Link>
        
        <div className="flex items-center space-x-3 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Neural Tools</h2>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
            Complete
          </span>
        </div>
        
        <nav className="space-y-2">
          {tools.map((tool) => {
            const isActive = pathname === tool.href;
            
            return (
              <div key={tool.name} className="relative">
                <Link
                  href={tool.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tool.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{tool.name}</div>
                    <div className={`text-xs truncate ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {tool.description}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Completion Status */}
        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="font-medium text-green-900">Platform Complete</span>
          </div>
          <p className="text-sm text-green-700">
            All 8 AI search intelligence tools are active and ready.
          </p>
        </div>
      </div>
    </div>
  );
}; 