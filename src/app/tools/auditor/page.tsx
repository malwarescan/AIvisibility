'use client';

import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { ToolProgressModal } from '@/components/ui/ToolProgressModal'
import { AnalysisProgress } from '@/components/ui/AnalysisProgress'

// Step 1: Define data structures (safest first step)
interface AuditCheck {
  name: string
  status: 'pass' | 'fail' | 'warning'
  details: string
  impact: 'high' | 'medium' | 'low'
}

interface AuditResults {
  url: string
  score: number
  timestamp: Date
  checks: {
    technical: AuditCheck[]
    content: AuditCheck[]
    performance: AuditCheck[]
  }
}

// Step 2: Create audit logic (pure function - no side effects)
const performAudit = (url: string): AuditResults => {
  // Simulate audit checks - replace with real logic later
  const technicalChecks: AuditCheck[] = [
    {
      name: 'SSL Certificate',
      status: url.includes('https') ? 'pass' : 'fail',
      details: url.includes('https') ? 'Site uses HTTPS encryption' : 'Site should use HTTPS for security',
      impact: 'high'
    },
    {
      name: 'Mobile Responsiveness',
      status: 'pass',
      details: 'Site appears mobile-friendly',
      impact: 'medium'
    },
    {
      name: 'Page Speed',
      status: Math.random() > 0.5 ? 'pass' : 'warning',
      details: 'Page load time within acceptable range',
      impact: 'medium'
    }
  ]

  const contentChecks: AuditCheck[] = [
    {
      name: 'Meta Descriptions',
      status: 'warning',
      details: 'Some pages missing meta descriptions',
      impact: 'medium'
    },
    {
      name: 'Header Structure',
      status: 'pass',
      details: 'Proper H1-H6 hierarchy detected',
      impact: 'low'
    }
  ]

  const performanceChecks: AuditCheck[] = [
    {
      name: 'Core Web Vitals',
      status: 'pass',
      details: 'LCP, FID, and CLS within good thresholds',
      impact: 'high'
    }
  ]

  // Calculate score based on checks
  const allChecks = [...technicalChecks, ...contentChecks, ...performanceChecks]
  const passCount = allChecks.filter(check => check.status === 'pass').length
  const score = Math.round((passCount / allChecks.length) * 100)

  return {
    url,
    score,
    timestamp: new Date(),
    checks: {
      technical: technicalChecks,
      content: contentChecks,
      performance: performanceChecks
    }
  }
}

// Step 3: Status icon component (reusable)
const StatusIcon = ({ status }: { status: 'pass' | 'fail' | 'warning' }) => {
  switch (status) {
    case 'pass':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    case 'fail':
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    case 'warning':
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
  }
}

// Step 4: Results display component
const AuditResultsDisplay = ({ results }: { results: AuditResults }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const renderCheckSection = (title: string, checks: AuditCheck[]) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start space-x-3">
            <StatusIcon status={check.status} />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{check.name}</p>
              <p className="text-sm text-gray-600">{check.details}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                check.impact === 'high' ? 'bg-red-100 text-red-800' :
                check.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {check.impact} impact
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Audit Results</h2>
            <p className="text-gray-600 mt-1">for {results.url}</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(results.score)}`}>
              {results.score}
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>
        </div>
      </div>

      {/* Audit Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {renderCheckSection('Technical SEO', results.checks.technical)}
        {renderCheckSection('Content Optimization', results.checks.content)}
        {renderCheckSection('Performance', results.checks.performance)}
      </div>
    </div>
  )
}

// Step 5: Main component with safe state management
export default function AIReadinessAuditor() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<AuditResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progressState, setProgressState] = useState({
    currentStep: '',
    currentProgress: 0,
    totalSteps: 4,
    errors: [] as string[]
  })
  const [showProgress, setShowProgress] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    // Simple URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    setError(null)
    setIsLoading(true)
    setShowProgress(true)
    
    // Initialize progress state
    setProgressState({
      currentStep: 'Initializing audit...',
      currentProgress: 0,
      totalSteps: 4,
      errors: []
    })

    try {
      // Simulate audit progress with detailed steps
      setProgressState(prev => ({ ...prev, currentStep: 'Analyzing technical SEO...', currentProgress: 1 }))
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProgressState(prev => ({ ...prev, currentStep: 'Checking content optimization...', currentProgress: 2 }))
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProgressState(prev => ({ ...prev, currentStep: 'Evaluating performance metrics...', currentProgress: 3 }))
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProgressState(prev => ({ ...prev, currentStep: 'Finalizing audit results...', currentProgress: 4 }))
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const auditResults = performAudit(url)
      setResults(auditResults)
      setProgressState(prev => ({ ...prev, currentProgress: 0, currentStep: '' }))
    } catch (err) {
      setError('Failed to perform audit. Please try again.')
      setProgressState(prev => ({ ...prev, currentProgress: 0, currentStep: '', errors: [...prev.errors, 'Audit failed'] }))
    } finally {
      setIsLoading(false)
      setShowProgress(false)
    }
  }

  const resetAudit = () => {
    setResults(null)
    setUrl('')
    setError(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              AI-Readiness Auditor
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Analyze your website&apos;s readiness for AI search platforms
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      <AnalysisProgress 
        isVisible={showProgress}
        analysisUrl={url}
        onComplete={() => {
          setShowProgress(false);
        }}
      />

      {/* Tool Progress Modal */}
      <ToolProgressModal
        isVisible={isLoading}
        toolName="AI-Readiness Auditor"
        currentUrl={url}
        currentProgress={progressState.currentProgress}
        currentStep={progressState.currentStep}
        totalSteps={progressState.totalSteps}
        errors={progressState.errors}
      />

      {!results ? (
        /* Audit Form */
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Website Audit
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <ClockIcon className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Start Audit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Audit Results */
        <div>
          <div className="mb-6">
            <button
              onClick={resetAudit}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Run New Audit
            </button>
          </div>
          <AuditResultsDisplay results={results} />
        </div>
      )}
    </div>
  )
} 