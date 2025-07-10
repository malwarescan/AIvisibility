import { useState, useCallback } from 'react'

interface BatchProgress {
  totalUrls: number
  completedUrls: number
  currentUrl: string
  currentProgress: number
  errors: string[]
}

interface BatchResult {
  url: string
  success: boolean
  data?: any
  error?: string
  timestamp: Date
}

export function useBatchAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState<BatchProgress>({
    totalUrls: 0,
    completedUrls: 0,
    currentUrl: '',
    currentProgress: 0,
    errors: []
  })
  const [results, setResults] = useState<BatchResult[]>([])

  // Reuse the existing Authority analysis function
  const analyzeIndividualUrl = async (url: string): Promise<any> => {
    try {
      // This will reuse your EXISTING, WORKING analysis logic
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze website')
      }

      // Transform data using your existing logic (copy from Authority tool)
      return await generateRealAuthorityData(url, result.result?.analysis)
    } catch (error) {
      console.error(`🔥 Analysis error for ${url}:`, error)
      throw error
    }
  }

  // Copy your existing generateRealAuthorityData function here
  const generateRealAuthorityData = async (url: string, apiData: any) => {
    // TODO: Copy the EXACT function from your working Authority tool
    // This ensures we use the same working logic that fixes content scores
    
    // For now, placeholder that will be replaced with your working function
    return {
      url,
      overall: { score: 75, trend: 'up', status: 'good' },
      componentScores: { performance: 68, content: 55, seo: 64, technical: 75, backlink: 35 },
      platforms: [],
      recommendations: [],
      timestamp: new Date()
    }
  }

  const analyzeBatch = useCallback(async (urls: string[], options = { concurrent: 2 }) => {
    setIsAnalyzing(true)
    setResults([])
    setProgress({
      totalUrls: urls.length,
      completedUrls: 0,
      currentUrl: '',
      currentProgress: 0,
      errors: []
    })

    const batchResults: BatchResult[] = []
    const errors: string[] = []

    // Process URLs in batches to avoid overwhelming the API
    for (let i = 0; i < urls.length; i += options.concurrent) {
      const batch = urls.slice(i, i + options.concurrent)
      
      // Process each batch concurrently
      const batchPromises = batch.map(async (url) => {
        try {
          setProgress(prev => ({ ...prev, currentUrl: url }))
          
          const data = await analyzeIndividualUrl(url)
          
          return {
            url,
            success: true,
            data,
            timestamp: new Date()
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          errors.push(`${url}: ${errorMessage}`)
          
          return {
            url,
            success: false,
            error: errorMessage,
            timestamp: new Date()
          }
        }
      })

      // Wait for current batch to complete
      const batchResults_chunk = await Promise.all(batchPromises)
      batchResults.push(...batchResults_chunk)

      // Update progress
      setProgress(prev => ({
        ...prev,
        completedUrls: batchResults.length,
        currentProgress: Math.round((batchResults.length / urls.length) * 100),
        errors
      }))

      // Update results in real-time
      setResults([...batchResults])

      // Small delay between batches to be respectful to the API
      if (i + options.concurrent < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    setIsAnalyzing(false)
    return batchResults
  }, [])

  const reset = useCallback(() => {
    setIsAnalyzing(false)
    setResults([])
    setProgress({
      totalUrls: 0,
      completedUrls: 0,
      currentUrl: '',
      currentProgress: 0,
      errors: []
    })
  }, [])

  return {
    isAnalyzing,
    progress,
    results,
    analyzeBatch,
    reset
  }
} 