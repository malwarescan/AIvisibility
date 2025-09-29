'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Play, Download, Copy, ExternalLink, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';
import QueryInput from '@/components/tools/schema-reverse-engineer/QueryInput';
import URLManager from '@/components/tools/schema-reverse-engineer/URLManager';
import SchemaTree from '@/components/tools/schema-reverse-engineer/SchemaTree';
import SchemaGenerator from '@/components/tools/schema-reverse-engineer/SchemaGenerator';
import CodeEditor from '@/components/tools/schema-reverse-engineer/CodeEditor';
import { URLData, ParsedSchema, SchemaAnalysis, GeneratedSchema } from '@/types/schema-reverse-engineer';

export default function SchemaReverseEngineerPage() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [urls, setUrls] = useState<URLData[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [analyzedSchemas, setAnalyzedSchemas] = useState<ParsedSchema[]>([]);
  const [schemaAnalysis, setSchemaAnalysis] = useState<SchemaAnalysis | null>(null);
  const [generatedSchema, setGeneratedSchema] = useState<GeneratedSchema | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  // Load recent queries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('schema-reverse-engineer-queries');
    if (saved) {
      setRecentQueries(JSON.parse(saved));
    }
  }, []);

  // Save recent queries to localStorage
  const saveQuery = (query: string) => {
    const updated = [query, ...recentQueries.filter(q => q !== query)].slice(0, 10);
    setRecentQueries(updated);
    localStorage.setItem('schema-reverse-engineer-queries', JSON.stringify(updated));
  };

  const handleQuerySubmit = (query: string) => {
    setCurrentQuery(query);
    saveQuery(query);
    // Show success message
    alert(`Search query "${query}" has been saved! Now add URLs from AI Overview results to analyze their schema markup.`);
  };

  const handleAddUrl = (url: string) => {
    const newUrl: URLData = {
      id: Date.now().toString(),
      url,
      query: currentQuery,
      status: 'pending',
      analyzedAt: new Date()
    };
    setUrls(prev => [...prev, newUrl]);
  };

  const handleRemoveUrl = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
    if (selectedUrl === id) {
      setSelectedUrl(null);
    }
  };

  const handleAnalyzeUrl = async (id: string) => {
    const urlData = urls.find(url => url.id === id);
    if (!urlData) return;

    setIsAnalyzing(true);
    
    // Update status to analyzing
    setUrls(prev => prev.map(url => 
      url.id === id ? { ...url, status: 'analyzing' } : url
    ));

    try {
      const response = await fetch('/api/schema-reverse-engineer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlData.url })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      
      // Update URL with results
      setUrls(prev => prev.map(url => 
        url.id === id ? { 
          ...url, 
          status: 'success', 
          schemas: data.schemas,
          analyzedAt: new Date()
        } : url
      ));

      // Update analyzed schemas
      setAnalyzedSchemas(data.schemas);
      setSchemaAnalysis(data.analysis);
      setSelectedUrl(id);

    } catch (error) {
      console.error('Analysis failed:', error);
      setUrls(prev => prev.map(url => 
        url.id === id ? { 
          ...url, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Analysis failed'
        } : url
      ));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSchemaGenerated = (schema: GeneratedSchema) => {
    setGeneratedSchema(schema);
  };

  const handleCopyToClipboard = async () => {
    if (generatedSchema) {
      try {
        // Try modern Clipboard API first
        if (
          typeof navigator !== 'undefined' &&
          navigator.clipboard &&
          typeof navigator.clipboard.writeText === 'function'
        ) {
          await navigator.clipboard.writeText(generatedSchema.jsonLd);
          alert('Schema copied to clipboard!');
        } else {
          // Fallback for older browsers or environments without Clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = generatedSchema.jsonLd;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (successful) {
            alert('Schema copied to clipboard!');
          } else {
            alert('Failed to copy to clipboard. Please manually copy the schema from the code editor.');
          }
        }
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        alert('Failed to copy to clipboard. Please manually copy the schema from the code editor.');
      }
    }
  };

  const handleDownloadSchema = () => {
    if (generatedSchema) {
      const blob = new Blob([generatedSchema.jsonLd], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `schema-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleValidateSchema = () => {
    if (generatedSchema) {
      const encodedSchema = encodeURIComponent(generatedSchema.jsonLd);
      window.open(`https://search.google.com/test/rich-results?url=${encodedSchema}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Overview Schema Reverse Engineer
          </h1>
          <p className="text-lg text-gray-600">
            Extract, analyze, and replicate winning schema markup from AI Overview results
          </p>
        </div>

        {/* Search Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <QueryInput
            onQuerySubmit={handleQuerySubmit}
            placeholder="Enter your target search query (e.g., 'best coffee shops near me')"
            recentQueries={recentQueries}
          />
          
          {currentQuery && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-900">
                  Current Query: "{currentQuery}"
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Now add URLs from AI Overview results for this query to analyze their schema markup.
              </p>
            </div>
          )}
        </div>

        {/* URL Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">URL Management</h2>
            <button
              onClick={() => {
                const url = prompt('Enter URL from AI Overview:');
                if (url) handleAddUrl(url);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add URL
            </button>
          </div>
          
          {urls.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs added yet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add URLs from AI Overview results to start analyzing schema markup
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h4 className="font-medium text-gray-900 mb-2">How to use:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Search for your target query in Google</li>
                    <li>2. Look for AI Overview results</li>
                    <li>3. Copy URLs from the AI Overview cards</li>
                    <li>4. Paste them here to analyze their schema</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
          
          <URLManager
            urls={urls}
            onAddUrl={handleAddUrl}
            onRemoveUrl={handleRemoveUrl}
            onAnalyzeUrl={handleAnalyzeUrl}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Analysis Dashboard */}
        {analyzedSchemas.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Schema Tree View */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Structure</h3>
              <SchemaTree
                schemas={analyzedSchemas}
                onNodeSelect={(node: any) => console.log('Selected node:', node)}
              />
            </div>

            {/* Properties Panel */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
              {schemaAnalysis && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{schemaAnalysis.totalSchemas}</div>
                      <div className="text-sm text-blue-600">Total Schemas</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{schemaAnalysis.schemaTypes.length}</div>
                      <div className="text-sm text-green-600">Schema Types</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Schema Types Found</h4>
                    <div className="flex flex-wrap gap-2">
                      {schemaAnalysis.schemaTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Rich Elements</h4>
                    <div className="flex flex-wrap gap-2">
                      {schemaAnalysis.richElements.map((element, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Complexity</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      schemaAnalysis.complexity === 'simple' ? 'bg-green-100 text-green-700' :
                      schemaAnalysis.complexity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {schemaAnalysis.complexity.charAt(0).toUpperCase() + schemaAnalysis.complexity.slice(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Unified Schema Generator */}
        {analyzedSchemas.length > 0 && (
          <div className="mb-6">
            <SchemaGenerator targetQuery={currentQuery} />
          </div>
        )}

        {/* Generated Schema Section */}
        {generatedSchema && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Schema</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownloadSchema}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handleValidateSchema}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Validate
                </button>
              </div>
            </div>
            
            <CodeEditor
              code={generatedSchema.jsonLd}
              onChange={() => {}}
              language="json"
              readOnly={true}
            />

            {generatedSchema.suggestions.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Enhancement Suggestions</h4>
                <ul className="space-y-1">
                  {generatedSchema.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 