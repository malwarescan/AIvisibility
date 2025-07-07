import React from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  color?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  size = 'md',
  label,
  color,
}) => {
  const sizeConfig = {
    sm: { wrapper: 'w-16 h-16', text: 'text-xs', circle: 50 },
    md: { wrapper: 'w-24 h-24', text: 'text-sm', circle: 75 },
    lg: { wrapper: 'w-32 h-32', text: 'text-base', circle: 100 },
  };

  const config = sizeConfig[size];
  const radius = config.circle / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className={`${config.wrapper} relative flex items-center justify-center`}>
      <svg className="transform -rotate-90" width={config.circle} height={config.circle}>
        <circle
          cx={config.circle / 2}
          cy={config.circle / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx={config.circle / 2}
          cy={config.circle / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold text-gray-900 ${config.text}`}>{score}</span>
        {label && <span className={`text-gray-500 text-xs`}>{label}</span>}
      </div>
    </div>
  );
}; 