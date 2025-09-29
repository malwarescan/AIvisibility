// src/components/tools/shared/Sidebar.tsx - FIXED WITH SAFETY CHECK
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tool {
  id: string
  name: string
  href: string
  active?: boolean
  icon?: React.ReactNode
  isFlagship?: boolean
  isWorkflow?: boolean
  category?: string
}

interface SidebarProps {
  tools: Tool[]
  activeTool: string
  onToolChange: (tool: string) => void
}

export function Sidebar({ tools, activeTool, onToolChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // SAFETY CHECK: Handle undefined or empty tools
  if (!tools || !Array.isArray(tools)) {
    console.warn('Sidebar: tools prop is undefined or not an array')
    return null // or return a loading state
  }

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Default icons for tools
  const getDefaultIcon = (toolId: string) => {
    const icons: Record<string, React.ReactNode> = {
      'schema-reverse-engineer': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      'authority': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'agentic-visibility': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      'connect': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'flywheel': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
    return icons[toolId] || (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }

  const navigation = tools.map(tool => ({
    ...tool,
    current: tool.id === activeTool,
    icon: tool.icon || getDefaultIcon(tool.id)
  }))

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
      {/* Logo/Brand */}
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NC</span>
          </div>
          <div className="font-bold text-xl text-gray-900">
            Neural Command
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
              Agentic SEO Flywheel
            </div>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      onToolChange(item.id)
                      if (isMobile) {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className={`
                      group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 relative
                      ${item.current
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:shadow-sm'
                      }
                      ${isMobile ? 'text-base p-4 gap-x-4' : ''}
                    `}
                  >
                    <span className={`flex items-center ${isMobile ? 'text-xl' : ''}`}>
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.name}</span>
                        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                          {item.isFlagship && (
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap ${isMobile ? 'text-xs' : ''}`}>
                              Flagship
                            </span>
                          )}
                          {item.isWorkflow && (
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap ${isMobile ? 'text-xs' : ''}`}>
                              Workflow
                            </span>
                          )}
                          {item.current && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full ml-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Documentation Section */}
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
              Documentation
            </div>
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <Link
                  href="/docs/web-pages"
                  className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className={`flex items-center ${isMobile ? 'text-xl' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  <span className="truncate">User Documentation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/web-pages?page=authority-signal-monitor.html"
                  className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className={`flex items-center ${isMobile ? 'text-xl' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="truncate">Authority Monitor Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/web-pages?page=schema-reverse-engineer.html"
                  className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className={`flex items-center ${isMobile ? 'text-xl' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  <span className="truncate">Schema Optimizer Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/web-pages?page=batch-authority-analyzer.html"
                  className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className={`flex items-center ${isMobile ? 'text-xl' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <span className="truncate">Batch Analysis Guide</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Footer info */}
          <li className="mt-auto">
            <div className="text-xs text-gray-500 px-3">
              <div className="border-t border-gray-200 pt-4">
                <div className="font-medium text-gray-900 mb-1">Neural Command</div>
                <div>AI Authority Monitoring</div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile menu overlay */}
      <div className={`
        relative z-50 lg:hidden transition-opacity duration-300
        ${isMobileMenuOpen ? 'block' : 'hidden'}
      `}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile sidebar panel */}
        <div className="fixed inset-0 flex">
          <div className={`
            relative mr-16 flex w-full max-w-xs flex-1 transform transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            {/* Close button */}
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button 
                type="button" 
                className="-m-2.5 p-2.5 hover:bg-gray-900/20 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile sidebar content */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white shadow-xl ring-1 ring-white/10">
              <SidebarContent isMobile={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}

// Mobile menu button component (to be used in Header)
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden transition-colors"
      onClick={onClick}
    >
      <span className="sr-only">Open sidebar</span>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  )
}

// Hook for managing mobile menu state
export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
    toggleMobileMenu: () => setIsMobileMenuOpen(!isMobileMenuOpen)
  }
} 