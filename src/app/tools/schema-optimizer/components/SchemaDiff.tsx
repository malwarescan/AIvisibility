'use client';

import React, { useState, useEffect } from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface SchemaSnapshot {
  id: string;
  timestamp: string;
  url: string;
  schema: any;
  schemaType: string;
  version: string;
  metadata?: {
    totalProperties: number;
    faqCount?: number;
    reviewCount?: number;
    productCount?: number;
    articleCount?: number;
  };
}

interface DiffResult {
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  path: string;
  beforeValue?: any;
  afterValue?: any;
  changeDescription?: string;
}

interface SchemaDiffProps {
  currentSchema?: any;
  previousSchema?: any;
  currentUrl?: string;
  previousUrl?: string;
  onExport?: (type: 'before' | 'after' | 'diff') => void;
}

export default function SchemaDiff({ 
  currentSchema, 
  previousSchema, 
  currentUrl, 
  previousUrl,
  onExport 
}: SchemaDiffProps) {
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [selectedView, setSelectedView] = useState<'side-by-side' | 'unified' | 'summary'>('side-by-side');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<'all' | 'added' | 'removed' | 'modified'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [snapshots, setSnapshots] = useState<SchemaSnapshot[]>([]);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string>('');

  // Load snapshots from localStorage
  useEffect(() => {
    loadSnapshots();
  }, []);

  // Generate diff when schemas change
  useEffect(() => {
    if (currentSchema && previousSchema) {
      generateDiff(currentSchema, previousSchema);
    }
  }, [currentSchema, previousSchema]);

  const loadSnapshots = () => {
    try {
      const stored = localStorage.getItem('schema-snapshots');
      if (stored) {
        const snapshotsData = JSON.parse(stored);
        setSnapshots(snapshotsData);
        if (snapshotsData.length > 0) {
          setSelectedSnapshot(snapshotsData[snapshotsData.length - 1].id);
        }
      }
    } catch (error) {
      console.error('Failed to load snapshots:', error);
    }
  };

  const saveSnapshot = (schema: any, url: string) => {
    try {
      const snapshot: SchemaSnapshot = {
        id: `snapshot_${Date.now()}`,
        timestamp: new Date().toISOString(),
        url,
        schema,
        schemaType: schema['@type'] || 'Unknown',
        version: `v${snapshots.length + 1}`,
        metadata: extractMetadata(schema),
      };

      const updatedSnapshots = [...snapshots, snapshot];
      localStorage.setItem('schema-snapshots', JSON.stringify(updatedSnapshots));
      setSnapshots(updatedSnapshots);
      setSelectedSnapshot(snapshot.id);
    } catch (error) {
      console.error('Failed to save snapshot:', error);
    }
  };

  const extractMetadata = (schema: any): any => {
    const metadata: any = {
      totalProperties: Object.keys(schema).length,
    };

    // Count specific schema types
    if (schema.mainEntity && Array.isArray(schema.mainEntity)) {
      metadata.faqCount = schema.mainEntity.length;
    }
    if (schema.review && Array.isArray(schema.review)) {
      metadata.reviewCount = schema.review.length;
    }
    if (schema.offers && Array.isArray(schema.offers)) {
      metadata.productCount = schema.offers.length;
    }
    if (schema.articleBody) {
      metadata.articleCount = 1;
    }

    return metadata;
  };

  const generateDiff = (current: any, previous: any) => {
    setIsLoading(true);
    
    // Simulate diff generation
    setTimeout(() => {
      const results: DiffResult[] = [];
      
      // Compare top-level properties
      const allKeys = new Set([...Object.keys(current), ...Object.keys(previous)]);
      
      allKeys.forEach(key => {
        const currentValue = current[key];
        const previousValue = previous[key];
        
        if (currentValue === undefined && previousValue !== undefined) {
          results.push({
            type: 'removed',
            path: key,
            beforeValue: previousValue,
            changeDescription: `Removed ${key}`,
          });
        } else if (currentValue !== undefined && previousValue === undefined) {
          results.push({
            type: 'added',
            path: key,
            afterValue: currentValue,
            changeDescription: `Added ${key}`,
          });
        } else if (JSON.stringify(currentValue) !== JSON.stringify(previousValue)) {
          results.push({
            type: 'modified',
            path: key,
            beforeValue: previousValue,
            afterValue: currentValue,
            changeDescription: `Modified ${key}`,
          });
        } else {
          results.push({
            type: 'unchanged',
            path: key,
            beforeValue: previousValue,
            afterValue: currentValue,
          });
        }
      });

      // Add some mock specific changes for demonstration
      if (current.mainEntity && previous.mainEntity) {
        const currentFaqs = Array.isArray(current.mainEntity) ? current.mainEntity : [];
        const previousFaqs = Array.isArray(previous.mainEntity) ? previous.mainEntity : [];
        
        if (currentFaqs.length > previousFaqs.length) {
          results.push({
            type: 'added',
            path: 'mainEntity',
            afterValue: currentFaqs,
            changeDescription: `Added ${currentFaqs.length - previousFaqs.length} FAQ entries`,
          });
        }
      }

      if (current.description && previous.description && current.description !== previous.description) {
        results.push({
          type: 'modified',
          path: 'description',
          beforeValue: previous.description,
          afterValue: current.description,
          changeDescription: 'Updated meta description',
        });
      }

      setDiffResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const getDiffTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-100 text-green-800 border-green-200';
      case 'removed': return 'bg-red-100 text-red-800 border-red-200';
      case 'modified': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDiffTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return '+';
      case 'removed': return '-';
      case 'modified': return '~';
      default: return '=';
    }
  };

  const togglePathExpansion = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const filteredResults = diffResults.filter(result => 
    filterType === 'all' || result.type === filterType
  );

  const summaryStats = {
    added: diffResults.filter(r => r.type === 'added').length,
    removed: diffResults.filter(r => r.type === 'removed').length,
    modified: diffResults.filter(r => r.type === 'modified').length,
    unchanged: diffResults.filter(r => r.type === 'unchanged').length,
  };

  const handleExport = (type: 'before' | 'after' | 'diff') => {
    if (onExport) {
      onExport(type);
    } else {
      // Default export behavior
      let data: any;
      let filename: string;
      
      switch (type) {
        case 'before':
          data = previousSchema;
          filename = 'schema-before.json';
          break;
        case 'after':
          data = currentSchema;
          filename = 'schema-after.json';
          break;
        case 'diff':
          data = {
            summary: summaryStats,
            changes: filteredResults,
            timestamp: new Date().toISOString(),
          };
          filename = 'schema-diff.json';
          break;
      }
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const renderValue = (value: any, isExpanded: boolean) => {
    if (typeof value === 'object' && value !== null) {
      const stringified = JSON.stringify(value, null, 2);
      if (isExpanded) {
        return (
          <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
            {stringified}
          </pre>
        );
      } else {
        return (
          <span className="text-gray-600">
            {Array.isArray(value) ? `[${value.length} items]` : '{...}'}
          </span>
        );
      }
    }
    return <span className="text-gray-900">{String(value)}</span>;
  };

  const renderSideBySideDiff = () => (
    <div className="space-y-4">
      {filteredResults.map((result, index) => (
        <div
          key={`${result.path}-${index}`}
          className={`border rounded-lg p-4 ${getDiffTypeColor(result.type)}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold">
                {getDiffTypeIcon(result.type)}
              </span>
              <span className="font-medium">{result.path}</span>
              {result.changeDescription && (
                <span className="text-sm opacity-75">({result.changeDescription})</span>
              )}
            </div>
            <button
              onClick={() => togglePathExpansion(result.path)}
              className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
            >
              {expandedPaths.has(result.path) ? 'Collapse' : 'Expand'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Before</h4>
              <div className="bg-white rounded p-2 border">
                {result.beforeValue !== undefined ? (
                  renderValue(result.beforeValue, expandedPaths.has(result.path))
                ) : (
                  <span className="text-gray-400 italic">Not present</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">After</h4>
              <div className="bg-white rounded p-2 border">
                {result.afterValue !== undefined ? (
                  renderValue(result.afterValue, expandedPaths.has(result.path))
                ) : (
                  <span className="text-gray-400 italic">Not present</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUnifiedDiff = () => (
    <div className="space-y-2">
      {filteredResults.map((result, index) => (
        <div
          key={`${result.path}-${index}`}
          className={`border-l-4 pl-4 py-2 ${getDiffTypeColor(result.type)}`}
        >
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-sm font-bold">
              {getDiffTypeIcon(result.type)}
            </span>
            <span className="font-medium">{result.path}</span>
            {result.changeDescription && (
              <span className="text-sm opacity-75">({result.changeDescription})</span>
            )}
          </div>
          <div className="text-sm">
            {result.type === 'removed' && (
              <div className="bg-red-50 p-2 rounded">
                <span className="text-red-600">- {JSON.stringify(result.beforeValue)}</span>
              </div>
            )}
            {result.type === 'added' && (
              <div className="bg-green-50 p-2 rounded">
                <span className="text-green-600">+ {JSON.stringify(result.afterValue)}</span>
              </div>
            )}
            {result.type === 'modified' && (
              <div className="space-y-1">
                <div className="bg-red-50 p-2 rounded">
                  <span className="text-red-600">- {JSON.stringify(result.beforeValue)}</span>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <span className="text-green-600">+ {JSON.stringify(result.afterValue)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{summaryStats.added}</div>
          <div className="text-sm text-green-700">Added</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{summaryStats.removed}</div>
          <div className="text-sm text-red-700">Removed</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{summaryStats.modified}</div>
          <div className="text-sm text-yellow-700">Modified</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{summaryStats.unchanged}</div>
          <div className="text-sm text-gray-700">Unchanged</div>
        </div>
      </div>

      {/* Key Changes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Changes</h3>
        <div className="space-y-2">
          {filteredResults
            .filter(result => result.type !== 'unchanged')
            .slice(0, 10)
            .map((result, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded ${getDiffTypeColor(result.type)}`}
              >
                <span className="font-mono text-sm font-bold">
                  {getDiffTypeIcon(result.type)}
                </span>
                <span className="text-sm">{result.path}</span>
                {result.changeDescription && (
                  <span className="text-xs opacity-75">({result.changeDescription})</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Schema Diff Analysis
              </h2>
              <p className="text-gray-600">
                Compare schema versions and track changes over time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => saveSnapshot(currentSchema, currentUrl || '')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Save Snapshot
              </button>
            </div>
          </div>

          {/* Snapshot Selection */}
          {snapshots.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Compare with Snapshot</h3>
              <select
                value={selectedSnapshot}
                onChange={(e) => setSelectedSnapshot(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {snapshots.map((snapshot) => (
                  <option key={snapshot.id} value={snapshot.id}>
                    {snapshot.version} - {new Date(snapshot.timestamp).toLocaleString()} ({snapshot.url})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">View:</label>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="side-by-side">Side by Side</option>
                  <option value="unified">Unified</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Changes</option>
                  <option value="added">Added</option>
                  <option value="removed">Removed</option>
                  <option value="modified">Modified</option>
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('before')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
              >
                Export Before
              </button>
              <button
                onClick={() => handleExport('after')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
              >
                Export After
              </button>
              <button
                onClick={() => handleExport('diff')}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
              >
                Export Diff
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Generating diff...</span>
            </div>
          )}

          {/* Diff Content */}
          {!isLoading && (
            <div>
              {selectedView === 'side-by-side' && renderSideBySideDiff()}
              {selectedView === 'unified' && renderUnifiedDiff()}
              {selectedView === 'summary' && renderSummary()}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No differences found</p>
              <p className="text-sm mt-2">The schemas are identical or no changes match the current filter</p>
            </div>
          )}
        </div>
      </AutoAnimatedElement>
    </div>
  );
} 