'use client'

import React, { useState, useEffect } from 'react';
import { Search, History, Lightbulb, ArrowRight, Target } from 'lucide-react';

interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
  placeholder?: string;
  recentQueries?: string[];
}

export function QueryInput({ onQuerySubmit, placeholder, recentQueries = [] }: QueryInputProps) {
  const [query, setQuery] = useState('');
  const [localRecentQueries, setLocalRecentQueries] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const exampleQueries = [
    'best coffee makers 2024',
    'how to make sourdough bread',
    'top rated gaming laptops',
    'healthy dinner recipes',
    'best travel destinations',
    'home workout routines',
    'digital marketing strategies',
    'python programming tutorials'
  ];

  useEffect(() => {
    // Load recent queries from localStorage
    const stored = localStorage.getItem('ai-overview-recent-queries');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocalRecentQueries(parsed);
      } catch (error) {
        console.error('Failed to parse recent queries:', error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuerySubmit(query.trim());
      setQuery('');
      setShowRecent(false);
    }
  };

  const handleQueryClick = (selectedQuery: string) => {
    setQuery(selectedQuery);
    onQuerySubmit(selectedQuery);
    setShowRecent(false);
  };

  const clearRecentQueries = () => {
    localStorage.removeItem('ai-overview-recent-queries');
    setLocalRecentQueries([]);
  };

  const allRecentQueries = [...localRecentQueries, ...recentQueries].slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Main Search Input */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Target Search Query</span>
          </div>
          <p className="text-gray-500 text-sm">
            Enter the search term you want to optimize your content for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setShowRecent(true);
              }}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder || "e.g., 'best coffee makers 2024'"}
              className="w-full pl-12 pr-24 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <span>Analyze</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Recent Queries */}
      {showRecent && allRecentQueries.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <History className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-700">Recent Queries</span>
            </div>
            <button
              onClick={clearRecentQueries}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {allRecentQueries.map((recentQuery, index) => (
              <button
                key={index}
                onClick={() => handleQueryClick(recentQuery)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-colors"
              >
                {recentQuery}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Example Queries */}
      <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-blue-700">Example Queries</span>
        </div>
        <p className="text-sm text-blue-600 mb-4">
          Try these example queries to see how the tool works:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => handleQueryClick(example)}
              className="text-left px-4 py-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors text-sm border border-blue-200 hover:border-blue-300"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Query Tips */}
      <div className="bg-yellow-50 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="font-medium text-yellow-800 mb-3 flex items-center">
          <Lightbulb className="h-4 w-4 mr-2" />
          Query Optimization Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
          <div>
            <h5 className="font-medium mb-2">Best Practices</h5>
            <ul className="space-y-1">
              <li>• Use specific, descriptive queries</li>
              <li>• Include current year for time-sensitive topics</li>
              <li>• Use "best", "top", "how to" for better results</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">What to Avoid</h5>
            <ul className="space-y-1">
              <li>• Generic terms like "coffee" or "laptop"</li>
              <li>• Queries longer than 10 words</li>
              <li>• Brand names only (add descriptive terms)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps Preview */}
      <div className="bg-green-50 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="font-medium text-green-800 mb-3">What Happens Next?</h4>
        <div className="space-y-3 text-sm text-green-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              1
            </div>
            <div>
              <span className="font-medium">URL Collection:</span> You'll add URLs from Google AI Overview results
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              2
            </div>
            <div>
              <span className="font-medium">Schema Analysis:</span> We'll extract and analyze their schema markup
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              3
            </div>
            <div>
              <span className="font-medium">Optimized Schema:</span> Generate optimized schema for your content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 