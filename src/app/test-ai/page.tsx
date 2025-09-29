'use client'

import { useState } from 'react'
import { OpenAIService } from '@/lib/ai/OpenAIService'

export default function TestAIPage() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)

  const testAI = async () => {
    setLoading(true)
    try {
      const aiService = new OpenAIService()
      
      // Test content analysis
      const contentResult = await aiService.analyzeContentQuality(
        'This is a test website about AI optimization and machine learning.',
        'https://test.com'
      )
      
      setResult({
        contentAnalysis: contentResult,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Service Test</h1>
      
      <button 
        onClick={testAI}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? 'Testing...' : 'Test AI Service'}
      </button>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 