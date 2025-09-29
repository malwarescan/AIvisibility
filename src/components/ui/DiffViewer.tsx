import React, { useState, useMemo } from 'react';

export type DiffViewMode = 'side-by-side' | 'unified' | 'inline';

interface DiffViewerProps {
  original: any;
  modified: any;
  mode?: DiffViewMode;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
  syntaxHighlight?: boolean;
  maxHeight?: string;
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  original,
  modified,
  mode = 'side-by-side',
  title,
  className = '',
  showLineNumbers = true,
  syntaxHighlight = true,
  maxHeight = '400px',
}) => {
  const [selectedMode, setSelectedMode] = useState<DiffViewMode>(mode);

  // Convert objects to strings for diffing
  const originalStr = useMemo(() => {
    try {
      return typeof original === 'string' ? original : JSON.stringify(original, null, 2);
    } catch {
      return String(original);
    }
  }, [original]);

  const modifiedStr = useMemo(() => {
    try {
      return typeof modified === 'string' ? modified : JSON.stringify(modified, null, 2);
    } catch {
      return String(modified);
    }
  }, [modified]);

  // Simple diff algorithm (for demonstration - in production, use a proper diff library)
  const generateDiff = (original: string, modified: string): DiffLine[] => {
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    const diff: DiffLine[] = [];
    
    const maxLength = Math.max(originalLines.length, modifiedLines.length);
    
    for (let i = 0; i < maxLength; i++) {
      const originalLine = originalLines[i] || '';
      const modifiedLine = modifiedLines[i] || '';
      
      if (originalLine === modifiedLine) {
        diff.push({
          type: 'unchanged',
          content: originalLine,
          lineNumber: i + 1
        });
      } else {
        if (originalLine) {
          diff.push({
            type: 'removed',
            content: originalLine,
            lineNumber: i + 1
          });
        }
        if (modifiedLine) {
          diff.push({
            type: 'added',
            content: modifiedLine,
            lineNumber: i + 1
          });
        }
      }
    }
    
    return diff;
  };

  const diffLines = useMemo(() => generateDiff(originalStr, modifiedStr), [originalStr, modifiedStr]);

  const getLineClass = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 border-l-4 border-green-400 text-green-800';
      case 'removed':
        return 'bg-red-50 border-l-4 border-red-400 text-red-800';
      case 'unchanged':
        return 'bg-white border-l-4 border-gray-200';
    }
  };

  const getLineIcon = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'removed':
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderSideBySide = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2 px-4 py-2 bg-gray-50 rounded-t-lg">
          Original
        </div>
        <div className="border rounded-b-lg overflow-hidden">
          {diffLines.map((line, index) => (
            <div key={`original-${index}`} className={`px-4 py-1 font-mono text-sm ${getLineClass(line.type)}`}>
              <div className="flex items-center">
                {showLineNumbers && (
                  <span className="text-gray-500 mr-3 w-8 text-right">
                    {line.lineNumber}
                  </span>
                )}
                {getLineIcon(line.type)}
                <span className="ml-2">{line.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2 px-4 py-2 bg-gray-50 rounded-t-lg">
          Modified
        </div>
        <div className="border rounded-b-lg overflow-hidden">
          {diffLines.map((line, index) => (
            <div key={`modified-${index}`} className={`px-4 py-1 font-mono text-sm ${getLineClass(line.type)}`}>
              <div className="flex items-center">
                {showLineNumbers && (
                  <span className="text-gray-500 mr-3 w-8 text-right">
                    {line.lineNumber}
                  </span>
                )}
                {getLineIcon(line.type)}
                <span className="ml-2">{line.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUnified = () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="text-sm font-medium text-gray-700 px-4 py-2 bg-gray-50 border-b">
        Unified Diff
      </div>
      <div className="max-h-96 overflow-y-auto">
        {diffLines.map((line, index) => (
          <div key={index} className={`px-4 py-1 font-mono text-sm ${getLineClass(line.type)}`}>
            <div className="flex items-center">
              {showLineNumbers && (
                <span className="text-gray-500 mr-3 w-8 text-right">
                  {line.lineNumber}
                </span>
              )}
              {getLineIcon(line.type)}
              <span className="ml-2">{line.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInline = () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="text-sm font-medium text-gray-700 px-4 py-2 bg-gray-50 border-b">
        Inline Diff
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <pre className="font-mono text-sm whitespace-pre-wrap">
          {diffLines.map((line, index) => (
            <div key={index} className={getLineClass(line.type)}>
              {line.content}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        
        {/* Mode Selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMode('side-by-side')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedMode === 'side-by-side'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setSelectedMode('unified')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedMode === 'unified'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unified
          </button>
          <button
            onClick={() => setSelectedMode('inline')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedMode === 'inline'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inline
          </button>
        </div>
      </div>

      {/* Diff Content */}
      <div style={{ maxHeight }}>
        {selectedMode === 'side-by-side' && renderSideBySide()}
        {selectedMode === 'unified' && renderUnified()}
        {selectedMode === 'inline' && renderInline()}
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-50 border-l-4 border-green-400 mr-2"></div>
          <span>Added</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-50 border-l-4 border-red-400 mr-2"></div>
          <span>Removed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border-l-4 border-gray-200 mr-2"></div>
          <span>Unchanged</span>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer; 