'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/tools/shared/Sidebar';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [activeTool, setActiveTool] = useState('')

  // Define the tools array with Agentic SEO Flywheel structure
  const tools = [
    {
      id: 'ai-overview-schema-reverse-engineer',
      name: 'AI Overview Schema Reverse Engineer',
      href: '/tools/ai-overview-schema-reverse-engineer',
      isFlagship: true,
      category: 'discovery'
    },
    {
      id: 'schema-scoring',
      name: 'Schema Scoring & Validation',
      href: '/tools/schema-scoring',
      category: 'analysis'
    },
    {
      id: 'authority',
      name: 'Authority Signal Monitor',
      href: '/tools/authority',
      category: 'measurement'
    },
    {
      id: 'agentic-visibility',
      name: 'Agentic Visibility Scanner',
      href: '/tools/agentic-visibility',
      category: 'simulation'
    },
    {
      id: 'connect',
      name: 'Agentic API',
      href: '/tools/connect',
      category: 'scaling'
    },
    {
      id: 'flywheel',
      name: 'SEO Flywheel (Workflow Mode)',
      href: '/tools/flywheel',
      category: 'workflow',
      isWorkflow: true
    }
  ]

  // Determine active tool based on current pathname
  useEffect(() => {
    const currentTool = tools.find(tool => pathname === tool.href);
    if (currentTool) {
      setActiveTool(currentTool.id);
    } else if (pathname === '/tools') {
      // If we're on the main tools page, don't highlight any specific tool
      setActiveTool('');
    }
  }, [pathname, tools]);

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
      <main className="
        p-4                    /* Mobile: 16px padding all sides */
        sm:p-6                 /* Small screens: 24px padding */
        lg:p-8                 /* Desktop: 32px padding top/right/bottom */
        lg:pl-80               /* Desktop: 320px left padding (sidebar + gap) */
      ">
        {children}
      </main>
    </div>
  )
} 