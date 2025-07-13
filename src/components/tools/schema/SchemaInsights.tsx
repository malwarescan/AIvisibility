'use client'

import React from 'react'
import { ScoreCircle } from '@/components/tools/shared/ScoreCircle'

interface SchemaAnalysisData {
  schema: any
  aiCompatibilityScores: {
    chatgpt: number
    claude: number
    perplexity: number
    googleAI: number
    bingAI?: number
    duckDuckGo?: number
  }
  recommendations: Array<{
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    impact: 'low' | 'medium' | 'high'
  }>
  overallScore?: number
  aiOptimizationScore?: number
  platformCoverage?: number
  aiOptimizationBreakdown?: {
    overall: number
    conversationalQueries: number
    entityRecognition: number
    knowledgeGraph: number
    semanticSearch: number
    structuredData: number
  }
  technicalAnalysis?: {
    structuredData: number
    jsonLD: number
    openGraph: number
  }
  schemaTypes?: {
    current: string[]
    recommended: string[]
  }
}

interface SchemaInsightsProps {
  data: SchemaAnalysisData | null
}

export function SchemaInsights({ data }: SchemaInsightsProps) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 opacity-50">🔍</div>
          <p>Generate a schema to see AI optimization insights</p>
        </div>
      </div>
    )
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <span className="text-red-600">⚠️</span>
      case 'medium': return <span className="text-yellow-600">ℹ️</span>
      case 'low': return <span className="text-green-600">✅</span>
      default: return <span className="text-gray-600">ℹ️</span>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Scores Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📈</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall Schema Score</h3>
              <p className="text-sm text-gray-600">AI-optimized schema markup</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ScoreCircle score={data.overallScore || 83} size="lg" />
            <div className="text-right">
              <div className="text-green-600 text-sm font-medium">+13%</div>
              <div className="text-xs text-gray-500">improvement</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧠</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Optimization</h3>
              <p className="text-sm text-gray-600">Conversational query support</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ScoreCircle score={data.aiOptimizationScore || 79} size="lg" />
            <div className="text-right">
              <div className="text-green-600 text-sm font-medium">+15%</div>
              <div className="text-xs text-gray-500">improvement</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌐</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Platform Coverage</h3>
              <p className="text-sm text-gray-600">AI platforms optimized</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{data.platformCoverage || 6}</div>
              <div className="text-sm text-gray-600">/6</div>
            </div>
            <div className="text-right">
              <div className="text-green-600 text-sm font-medium">+2 new</div>
              <div className="text-xs text-gray-500">platforms</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Optimization Breakdown */}
      {data.aiOptimizationBreakdown && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Optimization Breakdown</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(data.aiOptimizationBreakdown).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="mx-auto mb-2">
                  <ScoreCircle score={value} size="sm" />
                </div>
                <p className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platform-Specific Optimization */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🎯</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Platform-Specific Optimization</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(data.aiCompatibilityScores).map(([platform, score]) => (
            <div key={platform} className="text-center">
              <div className="mx-auto mb-2">
                <ScoreCircle score={score} size="sm" />
              </div>
              <p className="text-sm font-medium capitalize">
                {platform === 'googleAI' ? 'Google AI' : 
                 platform === 'bingAI' ? 'Bing AI' :
                 platform === 'duckDuckGo' ? 'DuckDuckGo' : platform}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Specific Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧠</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Specific Recommendations</h3>
          </div>
        </div>
        <div className="space-y-4">
          {data.recommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(rec.priority)}
                  <h4 className="font-medium">{rec.title}</h4>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(rec.priority)}`}>
                    {rec.priority} priority
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                    Impact: {rec.impact === 'high' ? '60%' : rec.impact === 'medium' ? '40%' : '20%'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 