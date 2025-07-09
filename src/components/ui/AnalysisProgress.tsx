'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface AnalysisStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  duration?: number
  insights?: string[]
}

interface AnalysisProgressProps {
  isVisible: boolean
  analysisUrl?: string
  onComplete?: () => void
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  isVisible, 
  analysisUrl,
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'crawl',
      title: 'Website Crawling & Data Extraction',
      description: 'Analyzing website structure, content, and technical factors using advanced web scraping',
      status: 'pending',
      insights: [
        'Extracting page content and meta data',
        'Analyzing technical performance metrics',
        'Identifying schema markup and structured data',
        'Measuring page load times and Core Web Vitals'
      ]
    },
    {
      id: 'content',
      title: 'AI Content Quality Analysis',
      description: 'Using GPT-4 to analyze content quality, readability, and AI search optimization potential',
      status: 'pending',
      insights: [
        'Calculating Flesch-Kincaid readability scores',
        'Assessing topical authority and expertise depth',
        'Evaluating content structure for AI consumption',
        'Measuring semantic richness and entity coverage'
      ]
    },
    {
      id: 'authority',
      title: 'E-A-T Authority Assessment',
      description: 'Comprehensive evaluation using Google\'s Expertise, Authoritativeness, Trustworthiness framework',
      status: 'pending',
      insights: [
        'Analyzing expertise signals and technical depth',
        'Evaluating brand authority and industry recognition',
        'Assessing trust signals and security factors',
        'Comparing against industry benchmarks'
      ]
    },
    {
      id: 'platforms',
      title: 'AI Platform Optimization Analysis',
      description: 'Platform-specific analysis for ChatGPT, Claude, Perplexity, and Google AI optimization',
      status: 'pending',
      insights: [
        'ChatGPT: Analyzing conversational query potential',
        'Claude: Evaluating technical accuracy and citations',
        'Perplexity: Assessing source quality and verification',
        'Google AI: Measuring E-A-T and user experience factors'
      ]
    },
    {
      id: 'recommendations',
      title: 'AI-Powered Recommendations',
      description: 'Generating specific, actionable recommendations based on comprehensive analysis',
      status: 'pending',
      insights: [
        'Identifying highest-impact optimization opportunities',
        'Creating platform-specific improvement strategies',
        'Prioritizing recommendations by effort vs. impact',
        'Generating implementation timelines and cost estimates'
      ]
    }
  ])

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  useEffect(() => {
    if (isVisible && analysisUrl) {
      runAnalysis()
    }
  }, [isVisible, analysisUrl])

  const runAnalysis = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      
      // Update step to running
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ))

      // Simulate analysis time (replace with real analysis)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000))

      // Update step to completed
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed', duration: Math.floor(Math.random() * 3) + 2 } : step
      ))
    }

    setTimeout(() => {
      onComplete?.()
    }, 500)
  }

  if (!isVisible) return null

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Analyzing Authority Signals
        </h2>
        <p className="text-gray-600">
          Comprehensive AI-powered analysis for <span className="font-medium text-blue-600">{analysisUrl}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Analysis Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Analysis Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className={`border rounded-xl p-6 transition-all duration-300 ${
            step.status === 'completed' ? 'border-green-200 bg-green-50' :
            step.status === 'running' ? 'border-blue-200 bg-blue-50' :
            step.status === 'error' ? 'border-red-200 bg-red-50' :
            'border-gray-200 bg-gray-50'
          }`}>
            
            <div className="flex items-start space-x-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {step.status === 'completed' ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                ) : step.status === 'running' ? (
                  <ArrowPathIcon className="w-6 h-6 text-blue-600 animate-spin" />
                ) : step.status === 'error' ? (
                  <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-semibold ${
                    step.status === 'completed' ? 'text-green-900' :
                    step.status === 'running' ? 'text-blue-900' :
                    step.status === 'error' ? 'text-red-900' :
                    'text-gray-700'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {step.duration && (
                    <span className="text-sm text-gray-500">
                      {step.duration}s
                    </span>
                  )}
                </div>

                <p className={`text-sm mb-4 ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'running' ? 'text-blue-700' :
                  'text-gray-600'
                }`}>
                  {step.description}
                </p>

                {/* Show insights for current/completed steps */}
                {(step.status === 'running' || step.status === 'completed') && step.insights && (
                  <div className="space-y-2">
                    {step.insights.map((insight, insightIndex) => (
                      <div key={insightIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <span className={`text-sm ${
                          step.status === 'completed' ? 'text-green-700' : 'text-blue-700'
                        }`}>
                          {insight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalysisProgress 