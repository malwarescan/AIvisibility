'use client'

import React, { useState } from 'react'
import { ScoreCircle } from '@/components/tools/shared/ScoreCircle'

interface BatchComparisonTableProps {
  results: Array<{
    url: string
    success: boolean
    data?: any
    error?: string
    timestamp: Date
  }>
}

export function BatchComparisonTable({ results }: BatchComparisonTableProps) {
  const [sortBy, setSortBy] = useState<'url' | 'overall' | 'performance' | 'content' | 'seo' | 'technical' | 'backlink'>('overall')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const successfulResults = results.filter(r => r.success && r.data)

  if (successfulResults.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparison Results
        </h3>
        <p className="text-gray-600">No results to display yet.</p>
      </div>
    )
  }

  // Sort results
  const sortedResults = [...successfulResults].sort((a, b) => {
    let aValue: number | string = 0
    let bValue: number | string = 0

    if (sortBy === 'url') {
      aValue = new URL(a.url).hostname
      bValue = new URL(b.url).hostname
    } else if (sortBy === 'overall') {
      aValue = a.data?.overall?.score || 0
      bValue = b.data?.overall?.score || 0
    } else {
      aValue = a.data?.componentScores?.[sortBy] || 0
      bValue = b.data?.componentScores?.[sortBy] || 0
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    } else {
      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    }
  })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const SortableHeader = ({ column, children }: { column: typeof sortBy, children: React.ReactNode }) => (
    <th 
      className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortBy === column && (
          <span className="text-gray-400">
            {sortOrder === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Authority Comparison Results
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Comparing {successfulResults.length} website{successfulResults.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader column="url">Website</SortableHeader>
              <SortableHeader column="overall">Overall</SortableHeader>
              <SortableHeader column="performance">Performance</SortableHeader>
              <SortableHeader column="content">Content</SortableHeader>
              <SortableHeader column="seo">SEO</SortableHeader>
              <SortableHeader column="technical">Technical</SortableHeader>
              <SortableHeader column="backlink">Backlinks</SortableHeader>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedResults.map((result, index) => {
              const data = result.data
              const hostname = new URL(result.url).hostname
              
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900 truncate max-w-48" title={hostname}>
                        {hostname}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-48" title={result.url}>
                        {result.url}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ScoreCircle 
                        score={data?.overall?.score || 0} 
                        size="sm"
                        color={data?.overall?.score >= 80 ? 'green' : data?.overall?.score >= 60 ? 'blue' : data?.overall?.score >= 40 ? 'yellow' : 'red'}
                      />
                      <span className="font-medium">
                        {data?.overall?.score || 0}
                      </span>
                    </div>
                  </td>
                  
                  {['performance', 'content', 'seo', 'technical', 'backlink'].map((metric) => (
                    <td key={metric} className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                        getScoreColor(data?.componentScores?.[metric] || 0)
                      }`}>
                        {data?.componentScores?.[metric] || 0}
                      </span>
                    </td>
                  ))}
                  
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      data?.overall?.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      data?.overall?.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      data?.overall?.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data?.overall?.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Average Overall', value: Math.round(successfulResults.reduce((sum, r) => sum + (r.data?.overall?.score || 0), 0) / successfulResults.length) },
            { label: 'Highest Score', value: Math.max(...successfulResults.map(r => r.data?.overall?.score || 0)) },
            { label: 'Lowest Score', value: Math.min(...successfulResults.map(r => r.data?.overall?.score || 0)) },
            { label: 'Total Analyzed', value: successfulResults.length },
            { label: 'Failed', value: results.length - successfulResults.length }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 