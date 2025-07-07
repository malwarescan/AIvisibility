'use client';

import React, { useState } from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { TimeRangeSelector } from '@/components/tools/shared/TimeRangeSelector';
import { ForecastChart } from '@/components/tools/shared/ForecastChart';
import { OpportunityCard } from '@/components/tools/shared/OpportunityCard';
import { ScoreCircle } from '@/components/tools/shared/ScoreCircle';
import { DashboardChart } from '@/components/ui/DashboardChart';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { 
  mockPredictionMetrics, 
  mockForecastData, 
  mockTrendOpportunities 
} from '@/lib/mockPhase4Data';

export default function QueryMindPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const predictionMetrics = [
    {
      title: 'Forecast Accuracy',
      value: '94%',
      change: '+8%',
      changeType: 'positive' as const,
      description: '6-month prediction accuracy',
    },
    {
      title: 'Trend Confidence',
      value: 'A+',
      change: '+2',
      changeType: 'positive' as const,
      description: 'High confidence predictions',
    },
    {
      title: 'Opportunities Found',
      value: '247',
      change: '+23',
      changeType: 'positive' as const,
      description: 'New trend opportunities',
    },
    {
      title: 'Prediction Horizon',
      value: '6-month',
      change: '+2 months',
      changeType: 'positive' as const,
      description: 'Extended forecasting range',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              QueryMind Prediction
            </h1>
            <p className="text-gray-600">
              6-month AI search trend forecasting and opportunity identification
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector
              selected={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Forecasting</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">↑</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Advanced AI Search Forecasting
              </h2>
              <p className="text-gray-600">
                Predict AI search trends 6 months ahead with 94% accuracy using machine learning models
              </p>
            </div>
          </div>
        </div>
      </div>

      <MetricsOverview metrics={predictionMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Forecast Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            AI Search Trend Forecast
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Search Volume Trends</h3>
                <p className="text-sm text-gray-600">6-month prediction with confidence intervals</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Predicted</span>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Actual</span>
              </div>
            </div>
            
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">+23%</div>
                <div className="text-sm text-gray-600">Predicted AI search growth</div>
                <div className="text-xs text-green-600 mt-1">94% confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Opportunities */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Emerging Opportunities
          </h2>
          
          <div className="space-y-4">
            {[
              { trend: 'Voice Search Optimization', growth: '+45%', confidence: 'High' },
              { trend: 'Visual Search Integration', growth: '+38%', confidence: 'High' },
              { trend: 'Conversational AI', growth: '+52%', confidence: 'Medium' },
              { trend: 'Multimodal Search', growth: '+41%', confidence: 'High' },
            ].map((opportunity) => (
              <div key={opportunity.trend} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {opportunity.trend.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{opportunity.trend}</h3>
                    <p className="text-sm text-gray-600">{opportunity.confidence} confidence</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{opportunity.growth}</div>
                  <StatusIndicator status="excellent" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Forecasting Tools
            </h3>
            <p className="text-gray-600">
              Machine learning models trained on 20+ AI platforms to predict search behavior trends
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              View Detailed Report
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
              Generate Forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 