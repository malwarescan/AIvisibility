import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface SchemaScoreCardProps {
  score: number;
  validation: 'valid' | 'invalid' | 'unknown';
  trend: {
    change: string;
    status: 'improving' | 'declining' | 'stable';
  };
  platformScores?: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    google: number;
  };
  lastUpdated?: string;
}

export function SchemaScoreCard({ 
  score, 
  validation, 
  trend, 
  platformScores,
  lastUpdated 
}: SchemaScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getValidationIcon = (validation: string) => {
    switch (validation) {
      case 'valid':
        return '✅';
      case 'invalid':
        return '❌';
      default:
        return '❓';
    }
  };

  const getValidationColor = (validation: string) => {
    switch (validation) {
      case 'valid':
        return 'text-green-600';
      case 'invalid':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendColor = (status: string) => {
    switch (status) {
      case 'improving':
        return 'text-green-600 bg-green-50';
      case 'declining':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (status: string) => {
    switch (status) {
      case 'improving':
        return '↗️';
      case 'declining':
        return '↘️';
      default:
        return '→';
    }
  };

  return (
    <AutoAnimatedElement animation="slideUp" className="group">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <span className="text-xl">🔧</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Schema Score</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${getValidationColor(validation)}`}>
              {getValidationIcon(validation)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTrendColor(trend.status)}`}>
              {getTrendIcon(trend.status)} {trend.change}
            </span>
          </div>
        </div>
        
        {/* Main Score */}
        <div className="space-y-3">
          <div>
            <p className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </p>
            <p className="text-sm text-gray-500">
              AI Optimization Score
            </p>
          </div>

          {/* Platform Scores */}
          {platformScores && (
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="text-xs text-gray-500">ChatGPT</div>
                <div className="text-sm font-semibold text-gray-900">{platformScores.chatgpt}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Claude</div>
                <div className="text-sm font-semibold text-gray-900">{platformScores.claude}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Perplexity</div>
                <div className="text-sm font-semibold text-gray-900">{platformScores.perplexity}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Google</div>
                <div className="text-sm font-semibold text-gray-900">{platformScores.google}%</div>
              </div>
            </div>
          )}

          {/* Validation Status */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Status: <span className={`font-medium ${getValidationColor(validation)}`}>
                {validation.charAt(0).toUpperCase() + validation.slice(1)}
              </span>
            </span>
            {lastUpdated && (
              <span className="text-xs text-gray-400">
                {new Date(lastUpdated).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </AutoAnimatedElement>
  );
} 