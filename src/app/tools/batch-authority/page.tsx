"use client"

import React, { useState } from 'react'
import { Header } from '@/components/tools/shared/Header'
import { Sidebar } from '@/components/tools/shared/Sidebar'
import { BatchUrlInput } from '@/components/tools/batch/BatchUrlInput'
import { BatchProgress } from '@/components/tools/batch/BatchProgress'
import { useBatchAnalysis } from '@/hooks/useBatchAnalysis'

export default function BatchAuthorityPage() {
  const [urls, setUrls] = useState<string[]>([''])
  const { isAnalyzing, progress, results, analyzeBatch, reset } = useBatchAnalysis()

  const handleAnalyze = async (urlsToAnalyze: string[]) => {
    try {
      await analyzeBatch(urlsToAnalyze)
    } catch (error) {
      console.error('Batch analysis failed:', error)
    }
  }

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
          onToolChange={(tool: string) => window.location.href = `/tools/${tool}`}
        />

        <div className="flex-1 overflow-hidden">
          <Header
            title="Batch Authority Analyzer"
            subtitle="Analyze multiple websites simultaneously for competitive authority insights"
          />

          <div className="p-6 space-y-6">
            {/* URL Input Section */}
            <BatchUrlInput
              urls={urls}
              onChange={setUrls}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            {/* Progress Section */}
            <BatchProgress
              isVisible={isAnalyzing}
              totalUrls={progress.totalUrls}
              completedUrls={progress.completedUrls}
              currentUrl={progress.currentUrl}
              currentProgress={progress.currentProgress}
              errors={progress.errors}
            />

            {/* Results Section */}
            {results.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Batch Analysis Results
                </h3>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{result.url}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          result.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      {result.success ? (
                        <p className="text-sm text-gray-600">
                          Analysis completed successfully
                        </p>
                      ) : (
                        <p className="text-sm text-red-600">
                          Error: {result.error}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 