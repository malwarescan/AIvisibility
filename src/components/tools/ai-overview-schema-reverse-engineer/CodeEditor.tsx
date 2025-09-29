'use client'

import React, { useState, useEffect } from 'react';
import { Copy, Download, Check, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: 'json' | 'html';
  readOnly?: boolean;
}

export function CodeEditor({ code, onChange, language, readOnly = false }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (language === 'json') {
      validateJSON(code);
    }
  }, [code, language]);

  const validateJSON = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      setIsValid(true);
      setValidationError(null);
    } catch (error) {
      setIsValid(false);
      setValidationError(error instanceof Error ? error.message : 'Invalid JSON');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema.${language === 'json' ? 'json' : 'html'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatCode = () => {
    if (language === 'json') {
      try {
        const parsed = JSON.parse(code);
        const formatted = JSON.stringify(parsed, null, 2);
        onChange(formatted);
      } catch (error) {
        console.error('Failed to format JSON:', error);
      }
    }
  };

  const getLineCount = () => {
    return code.split('\n').length;
  };

  const getCharacterCount = () => {
    return code.length;
  };

  return (
    <div className="space-y-4">
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              {language.toUpperCase()}
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            {getLineCount()} lines, {getCharacterCount()} characters
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {language === 'json' && (
            <button
              onClick={formatCode}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Format
            </button>
          )}
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            <Download className="h-3 w-3" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Validation Error */}
      {!isValid && validationError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700">
            JSON Error: {validationError}
          </span>
        </div>
      )}

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          className={`
            w-full h-96 p-4 font-mono text-sm border rounded-lg resize-none
            ${readOnly 
              ? 'bg-gray-50 text-gray-700 cursor-default' 
              : 'bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }
            ${!isValid ? 'border-red-300 bg-red-50' : 'border-gray-300'}
          `}
          placeholder={language === 'json' 
            ? '{"@context": "https://schema.org", "@type": "Article", ...}'
            : '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article"\n}\n</script>'
          }
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            lineHeight: '1.5',
            tabSize: 2
          }}
        />
        
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r border-gray-200 text-xs text-gray-500 font-mono overflow-hidden">
          {code.split('\n').map((_, index) => (
            <div key={index} className="h-6 flex items-center justify-center">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Code Content with Line Numbers Offset */}
        <div className="absolute left-12 top-0 right-0 h-full pointer-events-none">
          <div className="p-4 font-mono text-sm text-transparent select-none">
            {code.split('\n').map((line, index) => (
              <div key={index} className="h-6 leading-6">
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>Language: {language.toUpperCase()}</span>
          <span>Encoding: UTF-8</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span>Line: {getLineCount()}</span>
          <span>Column: 1</span>
        </div>
      </div>

      {/* Syntax Highlighting Info */}
      {language === 'json' && (
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">JSON-LD Schema Structure</h4>
          <div className="text-xs text-blue-800 space-y-1">
            <div><strong>@context:</strong> Always "https://schema.org" for Schema.org markup</div>
            <div><strong>@type:</strong> The type of content (Article, Product, Recipe, etc.)</div>
            <div><strong>Required fields:</strong> Vary by schema type, but typically include title and description</div>
            <div><strong>Optional fields:</strong> Images, ratings, prices, dates, and other relevant properties</div>
          </div>
        </div>
      )}
    </div>
  );
} 