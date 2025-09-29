'use client';

import React from 'react';
import { Trash2, Play, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';
import { URLData } from '@/types/schema-reverse-engineer';

interface URLManagerProps {
  urls: URLData[];
  onAddUrl: (url: string) => void;
  onRemoveUrl: (id: string) => void;
  onAnalyzeUrl: (id: string) => void;
  isAnalyzing: boolean;
}

export default function URLManager({ urls, onAddUrl, onRemoveUrl, onAnalyzeUrl, isAnalyzing }: URLManagerProps) {
  const getStatusIcon = (status: URLData['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'analyzing':
        return <Play className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: URLData['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'analyzing':
        return 'Analyzing...';
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: URLData['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500';
      case 'analyzing':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  if (urls.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">No URLs added yet</p>
        <p className="text-sm">Add URLs from AI Overview results to start analyzing schema markup</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {urls.map((urlData) => (
        <div
          key={urlData.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getStatusIcon(urlData.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 truncate">
                  {extractDomain(urlData.url)}
                </span>
                <span className={`text-sm ${getStatusColor(urlData.status)}`}>
                  {getStatusText(urlData.status)}
                </span>
              </div>
              <div className="text-sm text-gray-500 truncate">
                {urlData.url}
              </div>
              {urlData.error && (
                <div className="text-sm text-red-600 mt-1">
                  {urlData.error}
                </div>
              )}
              {urlData.analyzedAt && urlData.status === 'success' && (
                <div className="text-xs text-gray-400 mt-1">
                  Analyzed: {urlData.analyzedAt.toLocaleString()}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {urlData.status === 'pending' && (
              <button
                onClick={() => onAnalyzeUrl(urlData.id)}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                Analyze
              </button>
            )}
            {urlData.status === 'success' && (
              <button
                onClick={() => onAnalyzeUrl(urlData.id)}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            )}
            {urlData.status === 'error' && (
              <button
                onClick={() => onAnalyzeUrl(urlData.id)}
                className="flex items-center gap-2 px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Retry
              </button>
            )}
            <button
              onClick={() => onRemoveUrl(urlData.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 