'use client';

import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface QueryMindData {
  predictionAccuracy: number;
  forecastPeriod: number;
  trendConfidence: number;
  opportunityCount: number;
  predictions: Array<{
    category: string;
    probability: number;
    impact: string;
    timeframe: string;
  }>;
  trends: Array<{
    date: string;
    confidence: number;
    accuracy: number;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export default function QueryMindPage() {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [queryMindData, setQueryMindData] = useState<QueryMindData | null>(null);
  const [exporting, setExporting] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): QueryMindData => {
      return {
        predictionAccuracy: Math.round(88 + Math.random() * 12),
        forecastPeriod: 6,
        trendConfidence: Math.round(85 + Math.random() * 15),
        opportunityCount: Math.round(15 + Math.random() * 10),
        predictions: [
          { category: 'ChatGPT Queries', probability: 0.85, impact: 'High', timeframe: '3 months' },
          { category: 'Claude Interactions', probability: 0.78, impact: 'Medium', timeframe: '4 months' },
          { category: 'Perplexity Trends', probability: 0.92, impact: 'High', timeframe: '2 months' },
          { category: 'Google AI Evolution', probability: 0.70, impact: 'Medium', timeframe: '6 months' },
        ],
        trends: Array.from({ length: 6 }, (_, i) => ({
          date: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          confidence: 80 + Math.random() * 20,
          accuracy: 85 + Math.random() * 15,
        })),
        insights: [
          { type: 'positive' as const, message: 'Perplexity query patterns showing strong growth', impact: 'High' },
          { type: 'positive' as const, message: 'ChatGPT interaction predictions improved', impact: 'Medium' },
          { type: 'neutral' as const, message: 'Google AI trends stable for next quarter', impact: 'Low' },
        ],
      };
    };

    setIsLoading(true);
    const timer = setTimeout(() => {
      setQueryMindData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(queryMindData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `querymind-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 2000);
  };

  const queryMindMetrics = queryMindData ? [
    {
      title: 'Prediction Accuracy',
      value: `${queryMindData.predictionAccuracy}%`,
      change: `+${Math.round(Math.random() * 8)}%`,
      changeType: 'positive' as const,
      description: '6-month forecast accuracy',
    },
    {
      title: 'Trend Confidence',
      value: `${queryMindData.trendConfidence}%`,
      change: `+${Math.round(Math.random() * 5)}%`,
      changeType: 'positive' as const,
      description: 'AI trend prediction confidence',
    },
    {
      title: 'Opportunities Identified',
      value: queryMindData.opportunityCount.toString(),
      change: `+${Math.round(Math.random() * 3)}`,
      changeType: 'positive' as const,
      description: 'High-impact opportunities',
    },
    {
      title: 'Forecast Period',
      value: `${queryMindData.forecastPeriod} months`,
      change: 'Stable',
      changeType: 'neutral' as const,
      description: 'Prediction timeframe',
    },
  ] : [];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.9) return 'text-green-600';
    if (probability >= 0.8) return 'text-blue-600';
    if (probability >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                QueryMind Prediction
              </h1>
              <p className="text-gray-600">
                6-month forecasting for AI search trends and opportunities
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Live Data</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">Predict</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  6-Month AI Search Forecast
                </h2>
                <p className="text-gray-600">
                  Predict future trends across ChatGPT, Claude, Perplexity, and Google AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Loading prediction data...</span>
          </div>
        </div>
      ) : (
        <>
          <AutoAnimatedElement animation="slideUp" delay={200}>
            <MetricsOverview metrics={queryMindMetrics} />
          </AutoAnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Predictions */}
            <AutoAnimatedElement animation="slideUp" delay={400}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  AI Search Predictions
                </h2>
                
                <div className="space-y-4">
                  {queryMindData?.predictions.map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">
                            {prediction.category.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{prediction.category}</h3>
                          <p className="text-sm text-gray-600">
                            Probability: <span className={getProbabilityColor(prediction.probability)}>{Math.round(prediction.probability * 100)}%</span>
                          </p>
                          <p className="text-xs text-gray-500">Impact: <span className={getImpactColor(prediction.impact)}>{prediction.impact}</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Timeframe: {prediction.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Trends */}
            <AutoAnimatedElement animation="slideUp" delay={600}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  AI Search Trends
                </h2>
                
                <div className="space-y-4">
                  {queryMindData?.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {trend.date.split('/')[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{trend.date}</h3>
                          <p className="text-sm text-gray-600">
                            Confidence: <span className={getImpactColor(trend.confidence.toString())}>{Math.round(trend.confidence)}%</span>
                          </p>
                          <p className="text-xs text-gray-500">Accuracy: <span className={getImpactColor(trend.accuracy.toString())}>{Math.round(trend.accuracy)}%</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Timeframe: 1 month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Insights */}
            <AutoAnimatedElement animation="slideUp" delay={800}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Key Insights
                </h2>
                
                <div className="space-y-4">
                  {queryMindData?.insights.map((insight, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        {insight.type === 'positive' && (
                          <span className="text-green-600 text-lg">OK</span>
                        )}
                        {insight.type === 'negative' && (
                          <span className="text-red-600 text-lg">X</span>
                        )}
                        {insight.type === 'neutral' && (
                          <span className="text-gray-600 text-lg">•</span>
                        )}
                      </div>
                      <p className="text-gray-700">{insight.message}</p>
                      <p className="text-sm text-gray-600 mt-1">Impact: <span className={getImpactColor(insight.impact)}>{insight.impact}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>
          </div>
        </>
      )}
    </div>
  );
} 