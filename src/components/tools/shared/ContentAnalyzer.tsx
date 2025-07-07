import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface ContentAnalysis {
  section: string;
  score: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

interface ContentAnalyzerProps {
  analyses: ContentAnalysis[];
  title: string;
  showRecommendations?: boolean;
}

export const ContentAnalyzer: React.FC<ContentAnalyzerProps> = ({
  analyses,
  title,
  showRecommendations = true,
}) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  return (
    <AutoAnimatedElement animation="slideUp" delay={0.2}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>
        
        <div className="space-y-6">
          {analyses.map((analysis, index) => {
            const priorityConfig = getPriorityConfig(analysis.priority);
            
            return (
              <AutoAnimatedElement
                key={analysis.section}
                animation="slideUp"
                delay={0.1 * index}
              >
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-gray-900">{analysis.section}</h3>
                      <StatusIndicator status={analysis.status} size="sm" />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${priorityConfig.bg} ${priorityConfig.text}`}>
                        {analysis.priority} Priority
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {analysis.score}%
                      </div>
                    </div>
                  </div>

                  {showRecommendations && analysis.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
                      {analysis.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{rec}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AutoAnimatedElement>
            );
          })}
        </div>
      </div>
    </AutoAnimatedElement>
  );
}; 