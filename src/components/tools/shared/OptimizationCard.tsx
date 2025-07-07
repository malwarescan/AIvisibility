import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface OptimizationCardProps {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  category: string;
  onImplement?: () => void;
}

export const OptimizationCard: React.FC<OptimizationCardProps> = ({
  title,
  description,
  impact,
  difficulty,
  timeEstimate,
  category,
  onImplement,
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              {category}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <div className={`px-2 py-1 rounded-full font-medium ${getImpactColor(impact)}`}>
            {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
          </div>
          <div className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
          <span className="text-gray-500">{timeEstimate}</span>
        </div>
        
        {onImplement && (
          <button
            onClick={onImplement}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Implement
          </button>
        )}
      </div>
    </div>
  );
}; 