"use client"

import React, { useState } from 'react'
import { Header } from '@/components/tools/shared/Header'
import { Sidebar } from '@/components/tools/shared/Sidebar'
import { BatchUrlInput } from '@/components/tools/batch/BatchUrlInput'
import { BatchProgress } from '@/components/tools/batch/BatchProgress'
import { BatchComparisonTable } from '@/components/tools/batch/BatchComparisonTable'
import { BatchExport } from '@/components/tools/batch/BatchExport'
import { useBatchAnalysis } from '@/hooks/useBatchAnalysis'

export default function BatchAuthorityPage() {
  const [urls, setUrls] = useState<string[]>([''])
  const { isAnalyzing, progress, results, analyzeBatch, reset } = useBatchAnalysis()

  const handleAnalyze = async (validUrls: string[]) => {
    if (validUrls.length === 0) return
    
    try {
      await analyzeBatch(validUrls, { concurrent: 2 }) // Analyze 2 URLs at a time
    } catch (error) {
      console.error('Batch analysis error:', error)
      alert('Failed to complete batch analysis. Please try again.')
    }
  }

  const handleReset = () => {
    reset()
    setUrls([''])
  }

  const successfulResults = results.filter(r => r.success)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 overflow-hidden">
          <Header
            title="Batch Authority Analyzer"
            subtitle="Analyze multiple websites simultaneously for competitive authority insights"
            actions={
              results.length > 0 && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                >
                  New Analysis
                </button>
              )
            }
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
            {results.length > 0 && !isAnalyzing && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {results.length}
                    </div>
                    <div className="text-sm text-gray-600">Total URLs</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {successfulResults.length}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {successfulResults.length > 0 ? Math.round(
                        successfulResults.reduce((sum, r) => sum + (r.data?.overall?.score || 0), 0) / successfulResults.length
                      ) : 0}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Score</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {successfulResults.length > 0 ? Math.max(...successfulResults.map(r => r.data?.overall?.score || 0)) : 0}
                    </div>
                    <div className="text-sm text-gray-600">Top Score</div>
                  </div>
                </div>

                {/* Comparison Table */}
                <BatchComparisonTable results={results} />

                {/* Export Section */}
                <BatchExport results={results} />
              </>
            )}

            {/* Empty State */}
            {results.length === 0 && !isAnalyzing && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready for Batch Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Add multiple website URLs above and click "Analyze" to compare their authority signals.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Pro tip:</strong> Use the bulk import feature to quickly add multiple URLs at once.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 