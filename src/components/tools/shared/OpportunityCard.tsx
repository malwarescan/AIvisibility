import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface OpportunityCardProps {
  trend: string;
  growth: string;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  description: string;
  onExplore?: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  trend,
  growth,
  timeframe,
  difficulty,
  impact,
  confidence,
  description,
  onExplore,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactStatus = (impact: string) => {
    switch (impact) {
      case 'high': return 'excellent' as const;
      case 'medium': return 'good' as const;
      case 'low': return 'average' as const;
      default: return 'average' as const;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{trend}</h3>
            <StatusIndicator status={getImpactStatus(impact)} size="sm" />
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{growth}</div>
          <div className="text-xs text-gray-500">growth potential</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <div className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
          <span className="text-gray-500">{timeframe}</span>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500">Confidence:</span>
            <span className="font-medium text-gray-900">{confidence}%</span>
          </div>
        </div>
        
        {onExplore && (
          <button
            onClick={onExplore}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explore
          </button>
        )}
      </div>
    </div>
  );
}; 