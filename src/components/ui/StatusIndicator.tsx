import React from 'react';

interface StatusIndicatorProps {
  status: 'excellent' | 'good' | 'average' | 'poor';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'excellent':
        return { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-100' };
      case 'good':
        return { color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-100' };
      case 'average':
        return { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-100' };
      case 'poor':
        return { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-100' };
      default:
        return { color: 'bg-gray-500', text: 'text-gray-700', bg: 'bg-gray-100' };
    }
  };

  const sizeConfig = {
    sm: { dot: 'w-2 h-2', text: 'text-xs', padding: 'px-2 py-1' },
    md: { dot: 'w-3 h-3', text: 'text-sm', padding: 'px-3 py-1' },
    lg: { dot: 'w-4 h-4', text: 'text-base', padding: 'px-4 py-2' },
  };

  const { color, text, bg } = getStatusConfig();
  const { dot, text: textSize, padding } = sizeConfig[size];

  if (label) {
    return (
      <div className={`inline-flex items-center space-x-2 ${padding} ${bg} rounded-full`}>
        <div className={`${dot} ${color} rounded-full`} />
        <span className={`font-medium ${text} ${textSize} capitalize`}>
          {label || status}
        </span>
      </div>
    );
  }

  return <div className={`${dot} ${color} rounded-full`} />;
}; 