'use client'

import React, { useState } from 'react';
import { Sidebar } from '@/components/tools/shared/Sidebar';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTool, setActiveTool] = useState('authority')

  // Define the tools array
  const tools = [
    {
      id: 'authority',
      name: 'Authority Signal Monitor',
      href: '/tools/authority'
    },
    {
      id: 'batch-authority',
      name: 'Batch Authority Analyzer',
      href: '/tools/batch-authority'
    },
    {
      id: 'auditor',
      name: 'AI Content Auditor',
      href: '/tools/auditor'
    },
    {
      id: 'analytics',
      name: 'Performance Analytics',
      href: '/tools/analytics'
    },
    {
      id: 'connect',
      name: 'Agent Connect',
      href: '/tools/connect'
    },
    {
      id: 'querymind',
      name: 'QueryMind',
      href: '/tools/querymind'
    },
    {
      id: 'agentrank',
      name: 'AgentRank',
      href: '/tools/agentrank'
    },
    {
      id: 'citationflow',
      name: 'CitationFlow',
      href: '/tools/citationflow'
    }
  ]

  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        tools={tools}
        activeTool={activeTool}
        onToolChange={handleToolChange}
      />
      <main className="flex-1 p-4 lg:p-8 lg:pl-72">
        {children}
      </main>
    </div>
  )
} 