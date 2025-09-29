'use client';

import React from 'react';
import { SchemaOptimizerInsight } from '@/types/dashboard';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { ScoreBadge } from '@/components/ui/ScoreBadge';

interface SchemaOptimizerInsightProps {
  insight: SchemaOptimizerInsight;
}

export function SchemaOptimizerInsightDisplay({ insight }: SchemaOptimizerInsightProps) {
  const metadata = insight.metadata;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'poor';
  };

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metadata.aiOptimizationScore && (
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600">AI Optimization</h4>
              <StatusIndicator status={getScoreStatus(metadata.aiOptimizationScore)} size="sm" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metadata.aiOptimizationScore}%
            </div>
            <p className="text-xs text-gray-500">AI consumption score</p>
          </div>
        )}
        
        {metadata.qualityScore && (
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600">Quality Score</h4>
              <StatusIndicator status={getScoreStatus(metadata.qualityScore)} size="sm" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metadata.qualityScore}%
            </div>
            <p className="text-xs text-gray-500">Overall quality</p>
          </div>
        )}
        
        {metadata.completenessScore && (
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600">Completeness</h4>
              <StatusIndicator status={getScoreStatus(metadata.completenessScore)} size="sm" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metadata.completenessScore}%
            </div>
            <p className="text-xs text-gray-500">Field completeness</p>
          </div>
        )}
      </div>

      {/* AI Platform Scores */}
      {metadata.aiOptimization && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Platform Scores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-xl font-bold ${getScoreColor(metadata.aiOptimization.chatgptScore)}`}>
                {metadata.aiOptimization.chatgptScore}%
              </div>
              <p className="text-sm text-gray-600">ChatGPT</p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${getScoreColor(metadata.aiOptimization.claudeScore)}`}>
                {metadata.aiOptimization.claudeScore}%
              </div>
              <p className="text-sm text-gray-600">Claude</p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${getScoreColor(metadata.aiOptimization.perplexityScore)}`}>
                {metadata.aiOptimization.perplexityScore}%
              </div>
              <p className="text-sm text-gray-600">Perplexity</p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${getScoreColor(metadata.aiOptimization.googleScore)}`}>
                {metadata.aiOptimization.googleScore}%
              </div>
              <p className="text-sm text-gray-600">Google AI</p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Status */}
      {metadata.validation && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Status</h3>
          <div className="flex items-center space-x-3 mb-4">
            <StatusIndicator 
              status={metadata.validation.isValid ? 'excellent' : 'bad'} 
              size="md" 
            />
            <span className="text-lg font-medium">
              {metadata.validation.isValid ? 'Valid Schema' : 'Invalid Schema'}
            </span>
          </div>
          
          {metadata.validation.errors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-red-600 mb-2">Errors ({metadata.validation.errors.length})</h4>
              <ul className="space-y-1">
                {metadata.validation.errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-600">• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {metadata.validation.warnings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-yellow-600 mb-2">Warnings ({metadata.validation.warnings.length})</h4>
              <ul className="space-y-1">
                {metadata.validation.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-600">• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Improvements */}
      {metadata.improvements && metadata.improvements.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvements Made</h3>
          <div className="space-y-3">
            {metadata.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{improvement.field}</h4>
                  <p className="text-sm text-gray-600">{improvement.reason}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">+{improvement.impact}%</div>
                  <div className="text-xs text-gray-500">Impact</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {metadata.recommendations && metadata.recommendations.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {metadata.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-red-500' : 
                  rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{rec.description}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rec.implementation}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Expected impact: +{rec.expectedImpact}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode Information */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">🔧</span>
          <span className="text-sm font-medium text-blue-900">
            Analysis Mode: {metadata.mode.charAt(0).toUpperCase() + metadata.mode.slice(1)}
          </span>
        </div>
        {metadata.schemaType && (
          <p className="text-sm text-blue-700 mt-1">
            Schema Type: {metadata.schemaType}
          </p>
        )}
      </div>
    </div>
  );
} 