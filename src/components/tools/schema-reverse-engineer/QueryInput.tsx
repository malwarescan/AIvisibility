'use client';

import React, { useState } from 'react';
import { Search, Clock, X } from 'lucide-react';

interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
  placeholder?: string;
  recentQueries?: string[];
}

export default function QueryInput({ onQuerySubmit, placeholder, recentQueries = [] }: QueryInputProps) {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuerySubmit(query.trim());
      setQuery('');
      setShowRecent(false);
    }
  };

  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
    onQuerySubmit(recentQuery);
    setShowRecent(false);
  };

  const handleClearRecent = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation();
    // This would typically update the parent's recent queries
    // For now, we'll just prevent the click from bubbling
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            placeholder={placeholder || "Enter your target search query..."}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Recent Queries Dropdown */}
      {showRecent && recentQueries.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Queries
            </div>
            {recentQueries.map((recentQuery, index) => (
              <div
                key={index}
                onClick={() => handleRecentClick(recentQuery)}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <span className="text-gray-700">{recentQuery}</span>
                <button
                  onClick={(e) => handleClearRecent(e, recentQuery)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example Queries */}
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Example queries:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'best coffee shops near me',
            'how to make pasta',
            'restaurants open now',
            'weather today',
            'movie showtimes'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(example);
                onQuerySubmit(example);
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 