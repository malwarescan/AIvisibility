import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface QueryIntent {
  type: 'navigational' | 'informational' | 'transactional' | 'conversational';
  confidence: number;
  reasoning: string;
  platformAlignment: Record<string, number>;
}

interface ConversationalRewrite {
  originalQuery: string;
  rewrittenQuery: string;
  intent: QueryIntent;
  platform: string;
  improvementScore: number;
  reasoning: string;
  conversationalStyle: 'educational' | 'actionable' | 'analytical' | 'exploratory';
}

interface IntentAnalysisDisplayProps {
  intentAnalysis: QueryIntent;
  conversationalRewrites: ConversationalRewrite[];
  platformIntentAlignment: Record<string, number>;
}

export function IntentAnalysisDisplay({ 
  intentAnalysis, 
  conversationalRewrites, 
  platformIntentAlignment 
}: IntentAnalysisDisplayProps) {
  const getIntentColor = (type: string) => {
    switch (type) {
      case 'navigational': return 'bg-blue-100 text-blue-800';
      case 'informational': return 'bg-green-100 text-green-800';
      case 'transactional': return 'bg-purple-100 text-purple-800';
      case 'conversational': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'educational': return 'bg-blue-50 border-blue-200';
      case 'actionable': return 'bg-green-50 border-green-200';
      case 'analytical': return 'bg-purple-50 border-purple-200';
      case 'exploratory': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intent Analysis */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Query Intent Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Intent Classification */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Intent Type</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntentColor(intentAnalysis.type)}`}>
                {intentAnalysis.type.charAt(0).toUpperCase() + intentAnalysis.type.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(intentAnalysis.confidence * 100)}%
                </span>
                <StatusIndicator 
                  status={intentAnalysis.confidence > 0.8 ? 'excellent' : intentAnalysis.confidence > 0.6 ? 'good' : 'average'} 
                  size="sm" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Reasoning</span>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {intentAnalysis.reasoning}
              </p>
            </div>
          </div>

          {/* Platform Alignment */}
          <div className="space-y-4">
            <span className="text-sm font-medium text-gray-700">Platform Alignment</span>
            <div className="space-y-3">
              {Object.entries(intentAnalysis.platformAlignment).map(([platform, score]) => (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{platform}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(score * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {Math.round(score * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversational Rewrites */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Conversational Rewrites
        </h3>
        
        <div className="space-y-4">
          {conversationalRewrites.map((rewrite, index) => (
            <div key={index} className={`p-4 rounded-xl border ${getStyleColor(rewrite.conversationalStyle)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border">
                    <span className="text-xs font-semibold text-gray-600">
                      {rewrite.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{rewrite.platform}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getIntentColor(rewrite.conversationalStyle)}`}>
                      {rewrite.conversationalStyle}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {Math.round(rewrite.improvementScore * 100)}% improvement
                  </span>
                  <StatusIndicator 
                    status={rewrite.improvementScore > 0.7 ? 'excellent' : rewrite.improvementScore > 0.5 ? 'good' : 'average'} 
                    size="sm" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500">Original:</span>
                  <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {rewrite.originalQuery}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500">Optimized:</span>
                  <span className="text-sm font-medium text-gray-900 bg-white px-2 py-1 rounded border">
                    {rewrite.rewrittenQuery}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mt-2">
                  {rewrite.reasoning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Intent Alignment */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Platform Intent Alignment
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(platformIntentAlignment).map(([platform, alignment]) => (
            <div key={platform} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border">
                <span className="text-sm font-semibold text-gray-600">
                  {platform.charAt(0)}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{platform}</h4>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round(alignment * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 w-8">
                  {Math.round(alignment * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 