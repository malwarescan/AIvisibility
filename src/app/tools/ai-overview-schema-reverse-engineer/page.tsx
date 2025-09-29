'use client'

import React, { useState, useEffect } from 'react';
import { QueryInput } from '@/components/tools/ai-overview-schema-reverse-engineer/QueryInput';
import { URLManager } from '@/components/tools/ai-overview-schema-reverse-engineer/URLManager';
import { SchemaAnalysisDashboard } from '@/components/tools/ai-overview-schema-reverse-engineer/SchemaAnalysisDashboard';
import { SchemaGenerator } from '@/components/tools/ai-overview-schema-reverse-engineer/SchemaGenerator';
import { CodeEditor } from '@/components/tools/ai-overview-schema-reverse-engineer/CodeEditor';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import { CheckCircle, Circle, ArrowRight, Play, Target, Database, FileText, Download } from 'lucide-react';

// Types
interface URLData {
  id: string;
  url: string;
  query: string;
  status: 'pending' | 'analyzing' | 'success' | 'error';
  schemas?: ParsedSchema[];
  error?: string;
  analyzedAt?: Date;
}

interface ParsedSchema {
  type: string;
  properties: Record<string, any>;
  nested?: ParsedSchema[];
  source: string;
  confidence?: number;
}

interface SchemaAnalysis {
  totalSchemas: number;
  schemaTypes: string[];
  commonProperties: string[];
  richElements: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

interface GeneratedSchema {
  jsonLd: string;
  schemaTypes: string[];
  validation: ValidationResult;
  suggestions: string[];
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface UserContent {
  title?: string;
  description?: string;
  images?: string[];
  ratings?: number;
  price?: string;
  availability?: string;
  [key: string]: any;
}

type WorkflowStep = 'query' | 'urls' | 'analysis' | 'generation' | 'export';

export default function AIOverviewSchemaReverseEngineer() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('query');
  const [currentQuery, setCurrentQuery] = useState('');
  const [urls, setUrls] = useState<URLData[]>([]);
  const [analysis, setAnalysis] = useState<SchemaAnalysis | null>(null);
  const [generatedSchema, setGeneratedSchema] = useState<GeneratedSchema | null>(null);
  const [userContent, setUserContent] = useState<UserContent>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchemaNode, setSelectedSchemaNode] = useState<string | null>(null);

  // Load recent queries from localStorage
  useEffect(() => {
    const recentQueries = localStorage.getItem('ai-overview-recent-queries');
    if (recentQueries) {
      try {
        const parsed = JSON.parse(recentQueries);
        // We'll use this in the QueryInput component
      } catch (error) {
        console.error('Failed to parse recent queries:', error);
      }
    }
  }, []);

  // Auto-advance workflow steps
  useEffect(() => {
    if (currentQuery && currentStep === 'query') {
      setCurrentStep('urls');
    }
  }, [currentQuery, currentStep]);

  useEffect(() => {
    if (urls.some(url => url.status === 'success') && currentStep === 'urls') {
      setCurrentStep('analysis');
    }
  }, [urls, currentStep]);

  useEffect(() => {
    if (analysis && currentStep === 'analysis') {
      setCurrentStep('generation');
    }
  }, [analysis, currentStep]);

  const handleQuerySubmit = (query: string) => {
    setCurrentQuery(query);
    setError(null);
    
    // Save to recent queries
    const recentQueries = localStorage.getItem('ai-overview-recent-queries');
    let queries = recentQueries ? JSON.parse(recentQueries) : [];
    queries = [query, ...queries.filter((q: string) => q !== query)].slice(0, 10);
    localStorage.setItem('ai-overview-recent-queries', JSON.stringify(queries));
  };

  const handleAddUrl = async (url: string) => {
    const newUrl: URLData = {
      id: Date.now().toString(),
      url,
      query: currentQuery,
      status: 'pending'
    };

    setUrls(prev => [...prev, newUrl]);
    setError(null);

    // Start analysis with the new URL data
    await analyzeUrl(newUrl);
  };

  const handleRemoveUrl = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const analyzeUrl = async (urlData: URLData) => {
    // Set status to analyzing
    setUrls(prev => prev.map(url => 
      url.id === urlData.id ? { ...url, status: 'analyzing' } : url
    ));

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/schema-reverse-engineer/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlData.url }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to analyze URL: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check if URL still exists (user might have removed it)
      setUrls(prev => {
        const urlExists = prev.find(url => url.id === urlData.id);
        if (!urlExists) return prev;

        return prev.map(url => 
          url.id === urlData.id ? {
            ...url,
            status: 'success',
            schemas: data.schemas || [],
            analyzedAt: new Date()
          } : url
        );
      });

      // Update analysis
      updateAnalysis();
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Check if URL still exists before updating
      setUrls(prev => {
        const urlExists = prev.find(url => url.id === urlData.id);
        if (!urlExists) return prev;

        return prev.map(url => 
          url.id === urlData.id ? {
            ...url,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          } : url
        );
      });
      
      setError(error instanceof Error ? error.message : 'Failed to analyze URL');
    }
  };

  const updateAnalysis = () => {
    const allSchemas = urls
      .filter(url => url.status === 'success' && url.schemas)
      .flatMap(url => url.schemas!);

    if (allSchemas.length === 0) {
      setAnalysis(null);
      return;
    }

    const schemaTypes = [...new Set(allSchemas.map(s => s.type))];
    const allProperties = allSchemas.flatMap(s => Object.keys(s.properties));
    const commonProperties = allProperties
      .filter((prop, index, arr) => arr.indexOf(prop) !== index)
      .filter((prop, index, arr) => arr.indexOf(prop) === index);

    const richElements = allProperties.filter(prop => 
      ['image', 'images', 'rating', 'ratings', 'price', 'availability', 'review', 'reviews'].includes(prop)
    );

    const complexity = allSchemas.length > 5 ? 'complex' : 
                     allSchemas.length > 2 ? 'moderate' : 'simple';

    setAnalysis({
      totalSchemas: allSchemas.length,
      schemaTypes,
      commonProperties,
      richElements,
      complexity
    });
  };

  const handleGenerateSchema = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const allSchemas = urls
        .filter(url => url.status === 'success' && url.schemas)
        .flatMap(url => url.schemas!);

      const response = await fetch('/api/schema-reverse-engineer/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceSchemas: allSchemas,
          userContent,
          query: currentQuery
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate schema: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedSchema(data);
      setCurrentStep('export');
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate schema');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchemaValidation = async (schema: string) => {
    try {
      const response = await fetch('/api/schema-reverse-engineer/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema })
      });

      if (!response.ok) {
        throw new Error(`Validation failed: ${response.statusText}`);
      }

      const validation = await response.json();
      
      if (generatedSchema) {
        setGeneratedSchema({
          ...generatedSchema,
          validation
        });
      }
    } catch (error) {
      console.error('Validation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to validate schema');
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setError('Failed to copy to clipboard');
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStepStatus = (step: WorkflowStep) => {
    switch (step) {
      case 'query':
        return currentQuery ? 'completed' : 'current';
      case 'urls':
        if (!currentQuery) return 'disabled';
        return urls.some(url => url.status === 'success') ? 'completed' : 'current';
      case 'analysis':
        if (!urls.some(url => url.status === 'success')) return 'disabled';
        return analysis ? 'completed' : 'current';
      case 'generation':
        if (!analysis) return 'disabled';
        return generatedSchema ? 'completed' : 'current';
      case 'export':
        if (!generatedSchema) return 'disabled';
        return 'current';
      default:
        return 'disabled';
    }
  };

  const renderWorkflowProgress = () => {
    const steps = [
      { id: 'query', label: 'Enter Query', icon: Target },
      { id: 'urls', label: 'Add URLs', icon: Database },
      { id: 'analysis', label: 'Analyze Schemas', icon: FileText },
      { id: 'generation', label: 'Generate Schema', icon: Play },
      { id: 'export', label: 'Export & Implement', icon: Download }
    ];

    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow Progress</h2>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id as WorkflowStep);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                    ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                      status === 'current' ? 'bg-blue-500 border-blue-500 text-white' :
                      'bg-gray-100 border-gray-300 text-gray-400'}
                  `}>
                    {status === 'completed' ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`
                    text-xs font-medium mt-2 text-center
                    ${status === 'completed' ? 'text-green-600' :
                      status === 'current' ? 'text-blue-600' :
                      'text-gray-400'}
                  `}>
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div className={`
                    w-16 h-0.5 mx-4
                    ${status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              AI Overview Schema Reverse Engineer
            </h1>
            <p className="text-gray-600">
              Extract, analyze, and replicate winning schema markup from AI Overview results
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium">
              Step-by-Step Workflow
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
              Production Ready
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Progress */}
      {renderWorkflowProgress()}

      {/* Error Display */}
      {error && (
        <Alert type="error" title="Error" message={error} />
      )}

      {/* Debug Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2">Debug Info</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>Current Step: {currentStep}</p>
            <p>URLs Count: {urls.length}</p>
            <p>Analyzing: {urls.filter(u => u.status === 'analyzing').length}</p>
            <p>Success: {urls.filter(u => u.status === 'success').length}</p>
            <p>Errors: {urls.filter(u => u.status === 'error').length}</p>
            <p>Analysis: {analysis ? 'Complete' : 'Pending'}</p>
          </div>
        </div>
      )}

      {/* Step 1: Query Input */}
      <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 ${
        currentStep === 'query' ? 'ring-2 ring-blue-500' : ''
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentQuery ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {currentQuery ? <CheckCircle className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Step 1: Enter Your Target Query</h2>
            <p className="text-gray-600">What search term do you want to optimize for?</p>
          </div>
        </div>
        <QueryInput
          onQuerySubmit={handleQuerySubmit}
          placeholder="Enter your target search query (e.g., 'best coffee makers 2024')"
          recentQueries={[]}
        />
      </div>

      {/* Step 2: URL Management */}
      {currentQuery && (
        <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 ${
          currentStep === 'urls' ? 'ring-2 ring-blue-500' : ''
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              urls.some(url => url.status === 'success') ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {urls.some(url => url.status === 'success') ? <CheckCircle className="h-5 w-5" /> : <Database className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Step 2: Add AI Overview URLs</h2>
              <p className="text-gray-600">Add URLs from Google AI Overview results to analyze their schema</p>
            </div>
          </div>
          <URLManager
            urls={urls}
            onAddUrl={handleAddUrl}
            onRemoveUrl={handleRemoveUrl}
            onAnalyzeUrl={analyzeUrl}
            currentQuery={currentQuery}
          />
        </div>
      )}

      {/* Step 3: Schema Analysis */}
      {urls.some(url => url.status === 'success') && (
        <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 ${
          currentStep === 'analysis' ? 'ring-2 ring-blue-500' : ''
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              analysis ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {analysis ? <CheckCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Step 3: Schema Analysis</h2>
              <p className="text-gray-600">Review extracted schemas and identify winning patterns</p>
            </div>
          </div>
          {analysis && (
            <SchemaAnalysisDashboard
              analysis={analysis}
              urls={urls}
              onNodeSelect={setSelectedSchemaNode}
              selectedNode={selectedSchemaNode}
            />
          )}
        </div>
      )}

      {/* Step 4: Schema Generation */}
      {analysis && (
        <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 ${
          currentStep === 'generation' ? 'ring-2 ring-blue-500' : ''
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generatedSchema ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {generatedSchema ? <CheckCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Step 4: Generate Optimized Schema</h2>
              <p className="text-gray-600">Input your content and generate optimized JSON-LD schema</p>
            </div>
          </div>
          <SchemaGenerator
            sourceSchemas={urls
              .filter(url => url.status === 'success' && url.schemas)
              .flatMap(url => url.schemas!)}
            userContent={userContent}
            onUserContentChange={setUserContent}
            onSchemaGenerated={handleGenerateSchema}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Step 5: Export & Implementation */}
      {generatedSchema && (
        <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 ${
          currentStep === 'export' ? 'ring-2 ring-blue-500' : ''
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Step 5: Export & Implement</h2>
              <p className="text-gray-600">Copy, download, and implement your optimized schema</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <CodeEditor
              code={generatedSchema.jsonLd}
              onChange={() => {}}
              language="json"
              readOnly={true}
            />
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleCopyToClipboard(generatedSchema.jsonLd)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Copy to Clipboard</span>
              </button>
              <button
                onClick={() => handleDownload(generatedSchema.jsonLd, 'optimized-schema.json')}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download JSON</span>
              </button>
              <button
                onClick={() => handleSchemaValidation(generatedSchema.jsonLd)}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span>Validate Schema</span>
              </button>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <span>Test in Google</span>
              </a>
            </div>
            
            {/* Validation Results */}
            {generatedSchema.validation && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Validation Results</h3>
                {generatedSchema.validation.isValid ? (
                  <div className="text-green-600">✓ Schema is valid</div>
                ) : (
                  <div className="text-red-600">✗ Schema has errors</div>
                )}
                {generatedSchema.validation.errors.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-medium text-red-600">Errors:</h4>
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {generatedSchema.validation.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {generatedSchema.validation.warnings.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-medium text-yellow-600">Warnings:</h4>
                    <ul className="list-disc list-inside text-sm text-yellow-600">
                      {generatedSchema.validation.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Implementation Guide */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Implementation Guide</h3>
              <div className="space-y-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">1. Add to Your HTML</h4>
                  <p>Add the generated JSON-LD schema to your webpage's &lt;head&gt; section:</p>
                  <pre className="bg-white p-3 rounded mt-2 text-xs overflow-x-auto">
{`<script type="application/ld+json">
${generatedSchema.jsonLd}
</script>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">2. Test Your Implementation</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use Google's Rich Results Test to validate your schema</li>
                    <li>Check for any validation errors or warnings</li>
                    <li>Ensure all required properties are present</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">3. Monitor Performance</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Track your content's appearance in AI Overviews</li>
                    <li>Monitor click-through rates and engagement</li>
                    <li>Update schema as needed based on performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 