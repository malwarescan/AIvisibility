import React, { useState } from 'react';
import { SchemaAnalysis } from '@/lib/core/schema';

interface SchemaCardProps {
  schema: any;
  analysis?: SchemaAnalysis;
  title?: string;
  subtitle?: string;
  onEdit?: (schema: any) => void;
  onValidate?: () => void;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const SchemaCard: React.FC<SchemaCardProps> = ({
  schema,
  analysis,
  title,
  subtitle,
  onEdit,
  onValidate,
  className = '',
  collapsible = true,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isJsonExpanded, setIsJsonExpanded] = useState(false);

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getQualityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const formatSchema = (schema: any) => {
    try {
      return JSON.stringify(schema, null, 2);
    } catch {
      return 'Invalid JSON';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
            {schema['@type'] && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {schema['@type']}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {analysis && (
              <div className="text-right">
                <div className={`text-sm font-medium px-2 py-1 rounded ${getQualityColor(analysis.quality)}`}>
                  {analysis.quality}% - {getQualityLabel(analysis.quality)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Completeness: {analysis.completeness}%
                </div>
              </div>
            )}
            
            {collapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-4">
          {/* Analysis Summary */}
          {analysis && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Analysis Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Quality Score:</span>
                  <span className="ml-2 font-medium">{analysis.quality}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Completeness:</span>
                  <span className="ml-2 font-medium">{analysis.completeness}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Rich Results:</span>
                  <span className="ml-2 font-medium">
                    {analysis.eligibleForRichResults ? 'Eligible' : 'Not Eligible'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Issues:</span>
                  <span className="ml-2 font-medium">{analysis.issues.length}</span>
                </div>
              </div>
              
              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysis.suggestions.slice(0, 3).map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Schema JSON */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Schema JSON</h4>
              <button
                onClick={() => setIsJsonExpanded(!isJsonExpanded)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isJsonExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div className={`bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto ${
              isJsonExpanded ? 'max-h-96 overflow-y-auto' : 'max-h-32 overflow-y-hidden'
            }`}>
              <pre>{formatSchema(schema)}</pre>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {onEdit && (
              <button
                onClick={() => onEdit(schema)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Schema
              </button>
            )}
            {onValidate && (
              <button
                onClick={onValidate}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Validate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaCard; 