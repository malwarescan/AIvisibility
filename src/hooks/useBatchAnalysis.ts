import { useState, useCallback } from 'react'
import OpenAIService from '@/lib/ai/OpenAIService'

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

  // === BEGIN: Copied from Authority tool ===
  const generateRealAuthorityData = async (url: string, apiData: any) => {
    const { pageSpeed, ssl, content } = apiData
    const domain = ssl.domain || new URL(url).hostname
    const aiService = new OpenAIService()
    const contentAnalysis = await aiService.analyzeContentQuality(content.content || '', url)
    const authorityAnalysis = await aiService.analyzeAuthoritySignals(apiData, url)
    const seoAnalysis = await aiService.analyzeSEOForAI(apiData, url)
    const aiRecommendations = await aiService.generateAIRecommendations(apiData, url)
    const aiPrediction = await aiService.predictAISearchPerformance(apiData, url)
    const performanceScore = pageSpeed.performanceScore
    const seoScore = pageSpeed.seoScore
    const accessibilityScore = pageSpeed.accessibilityScore
    const contentScore = Math.round(contentAnalysis.readability)
    const technicalScore = Math.round((ssl.score + accessibilityScore) / 2)
    const backlinkScore = getRealisticBacklinkScore(domain)
    const overallScore = Math.round(authorityAnalysis.overallAuthority)
    const componentScores = {
      performance: performanceScore,
      content: contentScore,
      seo: seoScore,
      technical: technicalScore,
      backlink: backlinkScore
    }
    const getAIStatus = (score: number) => {
      if (score >= 90) return 'excellent'
      if (score >= 75) return 'good'  
      if (score >= 60) return 'warning'
      return 'poor'
    }
    const status = getAIStatus(overallScore)
    const trendData: any[] = []
    return {
      overall: {
        id: 'authority-overall',
        score: overallScore,
        trend: overallScore > 70 ? 'up' : overallScore > 50 ? 'stable' : 'down',
        change: Math.floor(Math.random() * 6) - 3,
        changePercent: Math.floor(Math.random() * 8),
        status,
        color: status === 'excellent' ? '#10b981' : status === 'good' ? '#3b82f6' : status === 'warning' ? '#f59e0b' : '#ef4444',
        description: `AI-powered authority analysis for ${domain}: ${authorityAnalysis.expertiseLevel} level with ${aiPrediction.confidence}% confidence`,
        lastUpdated: new Date(apiData.analyzedAt)
      },
      platforms: generateRealPlatformScores(url, overallScore, apiData, 0),
      signalGroups: generateCompleteSignalGroups(apiData, componentScores),
      recommendations: aiRecommendations,
      aiAnalysis: {
        content: contentAnalysis,
        authority: authorityAnalysis,
        seo: seoAnalysis,
        prediction: aiPrediction
      },
      trend: {
        direction: overallScore > 70 ? 'up' : overallScore > 50 ? 'stable' : 'down',
        velocity: 0.02 + (Math.random() * 0.06),
        acceleration: 0.005 + (Math.random() * 0.015),
        volatility: 3 + Math.floor(Math.random() * 8),
        confidence: aiPrediction.confidence,
        prediction: {
          nextValue: aiPrediction.score,
          confidence: aiPrediction.confidence,
          timeframe: '30 days',
          factors: aiPrediction.factors
        },
        data: trendData
      },
      componentScores,
      rawData: apiData
    }
  }

  const getRealisticBacklinkScore = (domain: string): number => {
    const domainScores: Record<string, number> = {
      'google.com': 95,
      'microsoft.com': 92,
      'apple.com': 90,
      'amazon.com': 88,
      'facebook.com': 85,
      'twitter.com': 82,
      'linkedin.com': 80,
      'github.com': 78,
      'stackoverflow.com': 75,
      'wikipedia.org': 85,
      'nytimes.com': 82,
      'bbc.com': 80,
      'cnn.com': 75,
      'openai.com': 70,
      'anthropic.com': 65,
      'neuralcommandllc.com': 35,
    }
    if (domainScores[domain]) {
      return domainScores[domain]
    }
    for (const [key, score] of Object.entries(domainScores)) {
      if (domain.includes(key)) {
        return score
      }
    }
    const hash = domain.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    return 20 + (hash % 25)
  }

  const generateCompleteSignalGroups = (apiData: any, componentScores: any) => {
    const { pageSpeed, ssl, content } = apiData
    return [
      {
        category: 'technical',
        signals: [
          {
            id: 'ssl-certificate',
            name: 'SSL Certificate', 
            category: 'technical',
            strength: ssl.score,
            status: ssl.hasSSL ? 'good' : 'critical',
            description: ssl.recommendation,
            trend: 'stable',
            impact: 'high',
            priority: ssl.hasSSL ? 'low' : 'critical',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          },
          {
            id: 'page-speed',
            name: 'Page Speed',
            category: 'technical',
            strength: pageSpeed.performanceScore,
            status: (pageSpeed.performanceScore > 75 ? 'good' : pageSpeed.performanceScore > 50 ? 'warning' : 'poor'),
            description: `Performance score: ${pageSpeed.performanceScore}%. Load time: ${(pageSpeed.loadTime / 1000).toFixed(1)}s`,
            trend: 'stable',
            impact: 'high',
            priority: pageSpeed.performanceScore < 60 ? 'high' : 'medium',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          },
          {
            id: 'core-web-vitals',
            name: 'Core Web Vitals',
            category: 'technical',
            strength: Math.round((pageSpeed.coreWebVitals.lcp < 2500 ? 80 : 40) * 0.5 + (pageSpeed.coreWebVitals.cls < 0.1 ? 80 : 40) * 0.5),
            status: (pageSpeed.coreWebVitals.lcp < 2500 && pageSpeed.coreWebVitals.cls < 0.1) ? 'good' : 'warning',
            description: `LCP: ${(pageSpeed.coreWebVitals.lcp / 1000).toFixed(1)}s, CLS: ${pageSpeed.coreWebVitals.cls.toFixed(2)}`,
            trend: 'stable',
            impact: 'high',
            priority: 'medium',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          }
        ],
        overallStrength: componentScores.technical,
        status: componentScores.technical > 75 ? 'good' : 'warning',
        description: `Technical performance: ${componentScores.technical}%`,
        priority: 'high'
      },
      {
        category: 'content',
        signals: [
          {
            id: 'title-optimization',
            name: 'Title Tag',
            category: 'content',
            strength: content.hasTitle && content.titleLength >= 30 && content.titleLength <= 60 ? 90 : content.hasTitle ? 60 : 0,
            status: (content.hasTitle && content.titleLength >= 30 && content.titleLength <= 60) ? 'good' : content.hasTitle ? 'warning' : 'poor',
            description: content.hasTitle ? `"${content.title}" (${content.titleLength} chars)` : 'Missing title tag',
            trend: 'stable',
            impact: 'high',
            priority: content.hasTitle ? 'low' : 'critical',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          },
          {
            id: 'meta-description',
            name: 'Meta Description',
            category: 'content',
            strength: content.hasMetaDescription && content.descriptionLength >= 120 && content.descriptionLength <= 160 ? 90 : content.hasMetaDescription ? 60 : 0,
            status: (content.hasMetaDescription && content.descriptionLength >= 120 && content.descriptionLength <= 160) ? 'good' : content.hasMetaDescription ? 'warning' : 'poor',
            description: content.hasMetaDescription ? `"${content.description}" (${content.descriptionLength} chars)` : 'Missing meta description',
            trend: 'stable',
            impact: 'medium',
            priority: content.hasMetaDescription ? 'low' : 'high',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          },
          {
            id: 'heading-structure',
            name: 'Heading Structure',
            category: 'content',
            strength: content.headingStructure?.h1Count === 1 && content.headingStructure?.h2Count > 0 ? 90 : 60,
            status: content.headingStructure?.h1Count === 1 && content.headingStructure?.h2Count > 0 ? 'good' : 'warning',
            description: `H1: ${content.headingStructure?.h1Count || 0}, H2: ${content.headingStructure?.h2Count || 0}`,
            trend: 'stable',
            impact: 'medium',
            priority: 'medium',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          }
        ],
        overallStrength: componentScores.content,
        status: componentScores.content > 75 ? 'good' : 'warning',
        description: `Content quality: ${componentScores.content}%`,
        priority: 'high'
      },
      {
        category: 'seo',
        signals: [
          {
            id: 'seo-score',
            name: 'SEO Score',
            category: 'seo',
            strength: componentScores.seo,
            status: componentScores.seo > 75 ? 'good' : 'warning',
            description: `SEO score: ${componentScores.seo}%`,
            trend: 'stable',
            impact: 'high',
            priority: 'high',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          }
        ],
        overallStrength: componentScores.seo,
        status: componentScores.seo > 75 ? 'good' : 'warning',
        description: `SEO performance: ${componentScores.seo}%`,
        priority: 'high'
      },
      {
        category: 'backlink',
        signals: [
          {
            id: 'backlink-score',
            name: 'Backlink Score',
            category: 'backlink',
            strength: componentScores.backlink,
            status: componentScores.backlink > 60 ? 'good' : 'warning',
            description: `Backlink score: ${componentScores.backlink}%`,
            trend: 'stable',
            impact: 'medium',
            priority: 'medium',
            recommendations: [],
            lastUpdated: new Date(apiData.analyzedAt)
          }
        ],
        overallStrength: componentScores.backlink,
        status: componentScores.backlink > 60 ? 'good' : 'warning',
        description: `Backlink authority: ${componentScores.backlink}%`,
        priority: 'medium'
      }
    ]
  }
  // === END: Copied from Authority tool ===

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