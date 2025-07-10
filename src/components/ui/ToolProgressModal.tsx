'use client'

import React from 'react'

interface ToolProgressModalProps {
  isVisible: boolean
  toolName: string
  currentUrl: string
  currentProgress: number
  currentStep: string
  totalSteps: number
  errors: string[]
}

export function ToolProgressModal({ 
  isVisible, 
  toolName,
  currentUrl, 
  currentProgress,
  currentStep,
  totalSteps,
  errors 
}: ToolProgressModalProps) {
  if (!isVisible) return null

  const progressPercentage = Math.round((currentProgress / totalSteps) * 100)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {toolName} Analysis Progress
        </h3>
        <div className="text-sm text-gray-600">
          Step {currentProgress} of {totalSteps}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Current URL Analysis */}
      {currentUrl && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <div>
              <div className="text-sm font-medium text-blue-900">
                Currently analyzing:
              </div>
              <div className="text-sm text-blue-700 truncate">
                {currentUrl}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Step */}
      {currentStep && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <div>
              <div className="text-sm font-medium text-green-900">
                Current step:
              </div>
              <div className="text-sm text-green-700">
                {currentStep}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Steps */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { 
            step: 'Web Crawling', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
              </svg>
            )
          },
          { 
            step: 'AI Analysis', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
          },
          { 
            step: 'Score Calculation', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )
          },
          { 
            step: 'Results Processing', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )
          }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className={`mb-1 ${
              currentProgress > (index * 25) ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {item.icon}
            </div>
            <div className={`text-xs ${
              currentProgress > (index * 25) ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {item.step}
            </div>
          </div>
        ))}
      </div>

      {/* Errors Display */}
      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <h4 className="text-sm font-medium text-red-900 mb-2">
            Errors ({errors.length})
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-700">
                {error}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimated Time Remaining */}
      {currentProgress < totalSteps && currentProgress > 0 && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Estimated time remaining: {Math.ceil((totalSteps - currentProgress) * 15 / 60)} minutes
          </div>
        </div>
      )}
    </div>
  )
} 