'use client'

import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, CheckCircle, AlertCircle, Loader2, Copy, Globe, Search } from 'lucide-react';

interface URLData {
  id: string;
  url: string;
  query: string;
  status: 'pending' | 'analyzing' | 'success' | 'error';
  schemas?: any[];
  error?: string;
  analyzedAt?: Date;
}

interface URLManagerProps {
  urls: URLData[];
  onAddUrl: (url: string) => void;
  onRemoveUrl: (id: string) => void;
  onAnalyzeUrl: (urlData: URLData) => void;
  currentQuery: string;
}

export function URLManager({ urls, onAddUrl, onRemoveUrl, onAnalyzeUrl, currentQuery }: URLManagerProps) {
  const [newUrl, setNewUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim()) {
      setIsAdding(true);
      onAddUrl(newUrl.trim());
      setNewUrl('');
      setIsAdding(false);
    }
  };

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const getStatusIcon = (status: URLData['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'analyzing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusText = (status: URLData['status']) => {
    switch (status) {
      case 'success':
        return 'Analysis Complete';
      case 'error':
        return 'Analysis Failed';
      case 'analyzing':
        return 'Analyzing...';
      default:
        return 'Pending';
    }
  };

  const getStatusColor = (status: URLData['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'analyzing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const successfulUrls = urls.filter(url => url.status === 'success');
  const analyzingUrls = urls.filter(url => url.status === 'analyzing');
  const errorUrls = urls.filter(url => url.status === 'error');

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Search className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">How to Find AI Overview URLs</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>1. Go to Google and search for: <strong>"{currentQuery}"</strong></p>
              <p>2. Look for the AI Overview section (usually at the top)</p>
              <p>3. Copy URLs from the sources listed in the AI Overview</p>
              <p>4. Paste them below to analyze their schema markup</p>
            </div>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-blue-500" />
          Add AI Overview URLs
        </h3>
        
        <form onSubmit={handleAddUrl} className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/page-with-schema"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isAdding}
              />
            </div>
            <button
              type="submit"
              disabled={!newUrl.trim() || isAdding}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isAdding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add URL</span>
                </>
              )}
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>💡 Tip: Add 3-5 URLs from different sources for best results</p>
          </div>
        </form>
      </div>

      {/* URL List */}
      {urls.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">URLs ({urls.length})</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600">{successfulUrls.length} Complete</span>
              </div>
              {analyzingUrls.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  <span className="text-blue-600">{analyzingUrls.length} Analyzing</span>
                </div>
              )}
              {errorUrls.length > 0 && (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">{errorUrls.length} Failed</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {urls.map((urlData) => (
              <div
                key={urlData.id}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(urlData.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(urlData.status)}`}>
                        {getStatusText(urlData.status)}
                      </span>
                      {urlData.analyzedAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(urlData.analyzedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a
                        href={urlData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate"
                      >
                        {urlData.url}
                      </a>
                    </div>

                    {urlData.status === 'success' && urlData.schemas && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📊 {urlData.schemas.length} schemas found</span>
                        <span>🎯 Query: {urlData.query}</span>
                      </div>
                    )}

                    {urlData.status === 'error' && urlData.error && (
                      <div className="text-sm text-red-600 bg-red-50 p-2 rounded mt-2">
                        Error: {urlData.error}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleCopyUrl(urlData.url)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a
                      href={urlData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Open URL"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {urlData.status === 'error' && (
                      <button
                        onClick={() => onAnalyzeUrl(urlData)}
                        className="p-2 text-orange-400 hover:text-orange-600 transition-colors"
                        title="Retry Analysis"
                      >
                        <Loader2 className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveUrl(urlData.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove URL"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      {urls.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-medium text-gray-900 mb-4">Analysis Progress</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total URLs</span>
              <span className="font-medium">{urls.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Successfully Analyzed</span>
              <span className="font-medium text-green-600">{successfulUrls.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Currently Analyzing</span>
              <span className="font-medium text-blue-600">{analyzingUrls.length}</span>
            </div>
            {errorUrls.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Failed Analysis</span>
                <span className="font-medium text-red-600">{errorUrls.length}</span>
              </div>
            )}
            
            {successfulUrls.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    Ready for schema analysis! {successfulUrls.length} URL{successfulUrls.length > 1 ? 's' : ''} analyzed successfully.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {urls.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs Added Yet</h3>
          <p className="text-gray-600 mb-6">
            Add URLs from Google AI Overview results to start analyzing their schema markup
          </p>
          <div className="bg-blue-50 rounded-xl p-4 max-w-md mx-auto">
            <h4 className="font-medium text-blue-900 mb-2">Quick Start</h4>
            <ol className="text-sm text-blue-800 space-y-1 text-left">
              <li>1. Search Google for "{currentQuery}"</li>
              <li>2. Find the AI Overview section</li>
              <li>3. Copy URLs from the sources</li>
              <li>4. Paste them in the input above</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
} 