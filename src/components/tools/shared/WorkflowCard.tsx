import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface WorkflowCardProps {
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'error';
  executions: number;
  lastRun: string;
  onToggle?: () => void;
  onEdit?: () => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  name,
  description,
  trigger,
  actions,
  status,
  executions,
  lastRun,
  onToggle,
  onEdit,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { status: 'excellent' as const, label: 'Active', color: 'bg-green-500' };
      case 'paused':
        return { status: 'average' as const, label: 'Paused', color: 'bg-yellow-500' };
      case 'error':
        return { status: 'poor' as const, label: 'Error', color: 'bg-red-500' };
      default:
        return { status: 'average' as const, label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <StatusIndicator status={statusConfig.status} label={statusConfig.label} size="sm" />
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium text-gray-900">{executions}</div>
          <div className="text-gray-500">executions</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Trigger:</h4>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2">{trigger}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Actions:</h4>
          <div className="space-y-1">
            {actions.map((action, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-gray-600">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Last run: {lastRun}
        </div>
        <div className="flex space-x-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                status === 'active'
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {status === 'active' ? 'Pause' : 'Activate'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 