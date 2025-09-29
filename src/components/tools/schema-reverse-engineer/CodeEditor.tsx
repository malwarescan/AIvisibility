'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: 'json' | 'html';
  readOnly?: boolean;
}

export default function CodeEditor({ code, onChange, language, readOnly = false }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState(code);

  useEffect(() => {
    setFormattedCode(code);
  }, [code]);

  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(formattedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or environments without Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = formattedCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error('Fallback copy method failed');
        }
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Show user-friendly error message
      alert('Failed to copy to clipboard. Please manually select and copy the code.');
    }
  };

  const formatCode = (code: string) => {
    try {
      if (language === 'json') {
        return JSON.stringify(JSON.parse(code), null, 2);
      }
      return code;
    } catch {
      return code;
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setFormattedCode(newCode);
    onChange(newCode);
  };

  const handleFormat = () => {
    const formatted = formatCode(formattedCode);
    setFormattedCode(formatted);
    onChange(formatted);
  };

  const getLanguageClass = () => {
    return language === 'json' ? 'language-json' : 'language-html';
  };

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {language.toUpperCase()} Code
          </span>
          {!readOnly && (
            <button
              onClick={handleFormat}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Format
            </button>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative mt-0 flex rounded-b-lg border border-gray-200 bg-gray-900 overflow-hidden" style={{ maxHeight: '500px' }}>
        {/* Line Numbers */}
        <div className="flex-shrink-0 w-12 bg-gray-800 text-gray-400 text-xs font-mono py-4 px-2 select-none overflow-y-auto" style={{ maxHeight: '500px' }}>
          {formattedCode.split('\n').map((_, index) => (
            <div key={index} className="text-right leading-5">
              {index + 1}
            </div>
          ))}
        </div>
        {/* Code Display or Textarea */}
        {readOnly ? (
          <pre
            className="flex-1 min-w-0 max-h-96 overflow-y-auto bg-gray-900 text-white font-mono text-sm p-4 rounded-b-lg"
            style={{ whiteSpace: 'pre', margin: 0 }}
            tabIndex={0}
          >
            <code>{formattedCode}</code>
          </pre>
        ) : (
          <textarea
            value={formattedCode}
            onChange={handleCodeChange}
            className={`flex-1 min-w-0 h-full p-4 font-mono text-sm bg-gray-900 text-white border-0 resize-none focus:ring-0 focus:outline-none ${
              readOnly ? 'cursor-default' : 'cursor-text'
            }`}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              lineHeight: '1.5',
              tabSize: 2,
              maxHeight: '500px',
              overflowY: 'auto',
              whiteSpace: 'pre',
              color: '#fff',
              background: '#111827',
            }}
          />
        )}
      </div>
    </div>
  );
} 