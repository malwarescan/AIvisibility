'use client'

import React, { useState } from 'react'

interface BatchUrlInputProps {
  urls: string[]
  onChange: (urls: string[]) => void
  onAnalyze: (urls: string[]) => void
  isAnalyzing: boolean
}

export function BatchUrlInput({ urls, onChange, onAnalyze, isAnalyzing }: BatchUrlInputProps) {
  const [importText, setImportText] = useState('')
  const [showImport, setShowImport] = useState(false)

  const addUrl = () => {
    onChange([...urls, ''])
  }

  const removeUrl = (index: number) => {
    onChange(urls.filter((_, i) => i !== index))
  }

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls]
    newUrls[index] = value
    onChange(newUrls)
  }

  const importUrls = () => {
    const importedUrls = importText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    onChange([...urls.filter(url => url.trim()), ...importedUrls])
    setImportText('')
    setShowImport(false)
  }

  const validUrls = urls.filter(url => {
    try {
      new URL(url.trim())
      return true
    } catch {
      return false
    }
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Website URLs to Analyze
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(!showImport)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            Bulk Import
          </button>
        </div>
      </div>

      {/* Bulk Import Section */}
      {showImport && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Import URLs (one per line)
          </label>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={importUrls}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Import URLs
            </button>
            <button
              onClick={() => setShowImport(false)}
              className="px-3 py-1 text-gray-600 text-sm rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* URL Input List */}
      <div className="space-y-3 mb-4">
        {urls.map((url, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder={`Website URL ${index + 1} (e.g., https://example.com)`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* URL Status Indicator */}
            <div className="w-4 h-4">
              {url.trim() && (
                <div className={`w-4 h-4 rounded-full ${
                  (() => {
                    try {
                      new URL(url.trim())
                      return 'bg-green-500'
                    } catch {
                      return 'bg-red-500'
                    }
                  })()
                }`} />
              )}
            </div>

            {urls.length > 1 && (
              <button
                onClick={() => removeUrl(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={addUrl}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
          >
            + Add URL
          </button>
          
          <button
            onClick={() => onChange([''])}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
          >
            Clear All
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {validUrls.length} valid URL{validUrls.length !== 1 ? 's' : ''}
          </span>
          
          <button
            onClick={() => onAnalyze(validUrls)}
            disabled={isAnalyzing || validUrls.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isAnalyzing && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isAnalyzing ? 'Analyzing...' : `Analyze ${validUrls.length} URL${validUrls.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
} 