import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const alertStyles = {
    success: {
      container: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      titleColor: 'text-green-900',
      messageColor: 'text-green-800'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500',
      titleColor: 'text-red-900',
      messageColor: 'text-red-800'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-900',
      messageColor: 'text-yellow-800'
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-900',
      messageColor: 'text-blue-800'
    }
  };

  const style = alertStyles[type];
  const Icon = style.icon;

  return (
    <div className={`border rounded-lg p-4 ${style.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${style.titleColor}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${style.messageColor}`}>
            {message}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${style.iconColor} hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-600`}
            >
              <span className="sr-only">Dismiss</span>
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 