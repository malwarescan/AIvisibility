import React from 'react';

export type ScoreType = 'percentage' | 'grade' | 'number' | 'status';
export type ScoreSize = 'sm' | 'md' | 'lg' | 'xl';

interface ScoreBadgeProps {
  score: number | string;
  type?: ScoreType;
  size?: ScoreSize;
  label?: string;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  type = 'percentage',
  size = 'md',
  label,
  showIcon = false,
  className = '',
  onClick,
  interactive = false,
}) => {
  // Convert score to number for calculations
  const numericScore = typeof score === 'string' ? parseFloat(score) : score;
  
  // Get color based on score
  const getScoreColor = (score: number): string => {
    if (type === 'status') {
      if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
      if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
      if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    if (type === 'grade') {
      if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
      if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
      if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    // Percentage and number types
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  // Get icon based on score
  const getScoreIcon = (score: number) => {
    if (score >= 80) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    if (score >= 60) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  };

  // Get size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      case 'xl':
        return 'px-5 py-2.5 text-lg';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  // Format score display
  const formatScore = (): string => {
    if (type === 'percentage') {
      return `${Math.round(numericScore)}%`;
    }
    if (type === 'grade') {
      if (numericScore >= 90) return 'A+';
      if (numericScore >= 80) return 'A';
      if (numericScore >= 70) return 'B+';
      if (numericScore >= 60) return 'B';
      if (numericScore >= 50) return 'C+';
      return 'C';
    }
    if (type === 'status') {
      if (numericScore >= 90) return 'Excellent';
      if (numericScore >= 70) return 'Good';
      if (numericScore >= 50) return 'Fair';
      return 'Poor';
    }
    return score.toString();
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-full border
    ${getScoreColor(numericScore)}
    ${getSizeClasses()}
    ${interactive ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {showIcon && getScoreIcon(numericScore)}
      <span className={showIcon ? 'ml-1' : ''}>
        {formatScore()}
      </span>
      {label && (
        <span className="ml-2 text-xs opacity-75">
          {label}
        </span>
      )}
    </div>
  );
};

// Predefined score badges for common use cases
export const PercentageBadge: React.FC<Omit<ScoreBadgeProps, 'type'>> = (props) => (
  <ScoreBadge {...props} type="percentage" />
);

export const GradeBadge: React.FC<Omit<ScoreBadgeProps, 'type'>> = (props) => (
  <ScoreBadge {...props} type="grade" />
);

export const StatusBadge: React.FC<Omit<ScoreBadgeProps, 'type'>> = (props) => (
  <ScoreBadge {...props} type="status" />
);

export default ScoreBadge; 