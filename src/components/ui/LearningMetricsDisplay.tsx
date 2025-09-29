// Learning Metrics Display Component
// Shows temporal learning and feedback insights

import React from 'react';

interface LearningMetrics {
  temporalAccuracy: number;
  feedbackEffectiveness: number;
  platformLearningRates: Record<string, number>;
  overallImprovement: number;
}

interface LearningMetricsDisplayProps {
  metrics: LearningMetrics;
  isVisible: boolean;
}

export const LearningMetricsDisplay: React.FC<LearningMetricsDisplayProps> = ({ metrics, isVisible }) => {
  if (!isVisible) return null;

  const getMetricColor = (value: number) => {
    if (value >= 0.8) return 'text-green-600';
    if (value >= 0.6) return 'text-blue-600';
    if (value >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricStatus = (value: number) => {
    if (value >= 0.8) return 'Excellent';
    if (value >= 0.6) return 'Good';
    if (value >= 0.4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">Analytics</span>
          AI Learning Insights
        </h3>
        <div className="text-sm text-gray-500">
          Real-time learning metrics
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temporal Learning Metrics */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center">
            <span className="mr-2">🕒</span>
            Temporal Learning
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accuracy</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.temporalAccuracy)}`}>
                  {(metrics.temporalAccuracy * 100).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">
                  {getMetricStatus(metrics.temporalAccuracy)}
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${metrics.temporalAccuracy * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Feedback Learning Metrics */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center">
                            <span className="mr-2">⟳</span>
            Feedback Learning
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Effectiveness</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.feedbackEffectiveness)}`}>
                  {(metrics.feedbackEffectiveness * 100).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">
                  {getMetricStatus(metrics.feedbackEffectiveness)}
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${metrics.feedbackEffectiveness * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Learning Rates */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📊</span>
          Platform Learning Rates
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(metrics.platformLearningRates).map(([platform, rate]) => (
            <div key={platform} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{platform}</div>
              <div className={`text-sm font-medium ${getMetricColor(rate)}`}>
                {(rate * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Improvement */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Overall Improvement</span>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${getMetricColor(metrics.overallImprovement)}`}>
              {metrics.overallImprovement > 0 ? '+' : ''}{(metrics.overallImprovement * 100).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">
              vs baseline
            </span>
          </div>
        </div>
      </div>

      {/* Learning Status */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center text-sm text-blue-800">
          <span className="mr-2">💡</span>
          <span>
            System is continuously learning from analysis patterns and user feedback to improve accuracy.
          </span>
        </div>
      </div>
    </div>
  );
}; 