import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { ScoreCircle } from '@/components/tools/shared/ScoreCircle';

interface IntegrationCardProps {
  name: string;
  status: 'connected' | 'available' | 'error';
  type: string;
  usage: string;
  lastSync: string;
  features: string[];
  health: number;
  onConnect?: () => void;
  onConfigure?: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  status,
  type,
  usage,
  lastSync,
  features,
  health,
  onConnect,
  onConfigure,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return { status: 'excellent' as const, label: 'Connected', color: 'text-green-600' };
      case 'available':
        return { status: 'average' as const, label: 'Available', color: 'text-yellow-600' };
      case 'error':
        return { status: 'poor' as const, label: 'Error', color: 'text-red-600' };
      default:
        return { status: 'average' as const, label: 'Unknown', color: 'text-gray-600' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`p-6 rounded-xl border-2 transition-all ${
      status === 'connected' 
        ? 'border-green-200 bg-green-50' 
        : status === 'error'
        ? 'border-red-200 bg-red-50'
        : 'border-gray-200 bg-white hover:border-blue-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <StatusIndicator status={statusConfig.status} label={statusConfig.label} size="sm" />
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>{type}</span>
            <span>•</span>
            <span>Usage: {usage}</span>
            <span>•</span>
            <span>Last sync: {lastSync}</span>
          </div>
        </div>
        {status === 'connected' && (
          <div className="flex flex-col items-center">
            <ScoreCircle score={health} size="sm" />
            <span className="text-xs text-gray-500 mt-1">Health</span>
          </div>
        )}
      </div>

      {features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        {status === 'available' && onConnect && (
          <button
            onClick={onConnect}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Connect
          </button>
        )}
        {status === 'connected' && onConfigure && (
          <button
            onClick={onConfigure}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Configure
          </button>
        )}
        {status === 'error' && (
          <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded-lg font-medium hover:bg-red-700 transition-colors">
            Reconnect
          </button>
        )}
      </div>
    </div>
  );
}; 