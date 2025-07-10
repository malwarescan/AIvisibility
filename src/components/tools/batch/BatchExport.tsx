'use client'

import React, { useState } from 'react'

interface BatchExportProps {
  results: Array<{
    url: string
    success: boolean
    data?: any
    error?: string
    timestamp: Date
  }>
}

export function BatchExport({ results }: BatchExportProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')
  const [isExporting, setIsExporting] = useState(false)

  const successfulResults = results.filter(r => r.success && r.data)

  const exportToCSV = () => {
    const headers = [
      'URL',
      'Domain',
      'Overall Score',
      'Performance',
      'Content',
      'SEO',
      'Technical',
      'Backlinks',
      'Status',
      'Analyzed At'
    ]

    const rows = successfulResults.map(result => {
      const data = result.data
      const hostname = new URL(result.url).hostname
      
      return [
        result.url,
        hostname,
        data?.overall?.score || 0,
        data?.componentScores?.performance || 0,
        data?.componentScores?.content || 0,
        data?.componentScores?.seo || 0,
        data?.componentScores?.technical || 0,
        data?.componentScores?.backlink || 0,
        data?.overall?.status || 'Unknown',
        result.timestamp.toISOString()
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `batch-authority-analysis-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalAnalyzed: results.length,
      successfulAnalyses: successfulResults.length,
      summary: {
        averageOverallScore: Math.round(successfulResults.reduce((sum, r) => sum + (r.data?.overall?.score || 0), 0) / successfulResults.length),
        highestScore: Math.max(...successfulResults.map(r => r.data?.overall?.score || 0)),
        lowestScore: Math.min(...successfulResults.map(r => r.data?.overall?.score || 0))
      },
      results: successfulResults.map(result => ({
        url: result.url,
        domain: new URL(result.url).hostname,
        analysis: result.data,
        timestamp: result.timestamp.toISOString()
      }))
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `batch-authority-analysis-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      if (exportFormat === 'csv') {
        exportToCSV()
      } else {
        exportToJSON()
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  if (successfulResults.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Export Results
      </h3>
      
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="csv"
              checked={exportFormat === 'csv'}
              onChange={(e) => setExportFormat(e.target.value as 'csv')}
              className="mr-2"
            />
            CSV (Excel compatible)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="json"
              checked={exportFormat === 'json'}
              onChange={(e) => setExportFormat(e.target.value as 'json')}
              className="mr-2"
            />
            JSON (Complete data)
          </label>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isExporting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Export includes {successfulResults.length} successful analyses with complete authority scores and recommendations.</p>
      </div>
    </div>
  )
} 