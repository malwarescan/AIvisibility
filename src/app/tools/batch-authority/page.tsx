"use client"

import React, { useState } from 'react'
import { Header } from '@/components/tools/shared/Header'
import { Sidebar } from '@/components/tools/shared/Sidebar'

export default function BatchAuthorityPage() {
  const [urls, setUrls] = useState<string[]>([''])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [batchResults, setBatchResults] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          tools={[
            { id: 'authority', name: 'Authority Monitor', href: '/tools/authority' },
            { id: 'batch-authority', name: 'Batch Authority', href: '/tools/batch-authority', active: true },
            { id: 'auditor', name: 'AI Auditor', href: '/tools/auditor' },
            { id: 'analytics', name: 'Analytics', href: '/tools/analytics' },
            { id: 'connect', name: 'AgentConnect', href: '/tools/connect' },
            { id: 'querymind', name: 'QueryMind', href: '/tools/querymind' },
            { id: 'agentrank', name: 'AgentRank', href: '/tools/agentrank' },
            { id: 'citationflow', name: 'CitationFlow', href: '/tools/citationflow' }
          ]}
          activeTool="batch-authority"
          onToolChange={(tool) => window.location.href = `/tools/${tool}`}
        />

        <div className="flex-1 overflow-hidden">
          <Header
            title="Batch Authority Analyzer"
            subtitle="Analyze multiple websites simultaneously for competitive authority insights"
          />

          <div className="p-6 space-y-6">
            {/* URL Input Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Website URLs to Analyze
              </h3>
              
              <div className="space-y-3">
                {urls.map((url, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const newUrls = [...urls]
                        newUrls[index] = e.target.value
                        setUrls(newUrls)
                      }}
                      placeholder={`Website URL ${index + 1} (e.g., https://example.com)`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {urls.length > 1 && (
                      <button
                        onClick={() => setUrls(urls.filter((_, i) => i !== index))}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setUrls([...urls, ''])}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                >
                  + Add Another URL
                </button>
                
                <button
                  onClick={() => {/* TODO: Implement batch analysis */}}
                  disabled={isAnalyzing || !urls.some(url => url.trim())}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze All URLs'}
                </button>
              </div>
            </div>

            {/* Results Section - Placeholder */}
            {batchResults && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Batch Analysis Results
                </h3>
                <p className="text-gray-600">Results will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 