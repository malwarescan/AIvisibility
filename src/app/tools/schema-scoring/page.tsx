'use client';

import React, { useState } from 'react';
import { validateSchema } from '@/lib/validateSchema';

interface SchemaScore {
  score: number;
  missingFields: string[];
  suggestions: string[];
}

interface SchemaAnalysis {
  valid: boolean;
  errors?: any[];
  score?: SchemaScore;
}

export default function SchemaScoringPage() {
  const [schemaInput, setSchemaInput] = useState('');
  const [analysis, setAnalysis] = useState<SchemaAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateSchemaScore = (schema: any): SchemaScore => {
    const score = {
      score: 0,
      missingFields: [] as string[],
      suggestions: [] as string[]
    };

    // Basic validation
    if (!schema['@context']) {
      score.missingFields.push('@context');
      score.suggestions.push('Add @context property (usually "https://schema.org")');
    }

    if (!schema['@type']) {
      score.missingFields.push('@type');
      score.suggestions.push('Add @type property to specify the schema type');
    }

    // Type-specific scoring
    const schemaType = schema['@type'];
    if (schemaType) {
      score.score += 20; // Base score for having a type

      // Product-specific fields
      if (schemaType === 'Product') {
        const productFields = ['name', 'description', 'image', 'offers', 'brand'];
        productFields.forEach(field => {
          if (!schema[field]) {
            score.missingFields.push(field);
            score.suggestions.push(`Add ${field} property for better Product schema`);
          } else {
            score.score += 15;
          }
        });
      }

      // Article-specific fields
      if (schemaType === 'Article') {
        const articleFields = ['headline', 'author', 'datePublished', 'publisher'];
        articleFields.forEach(field => {
          if (!schema[field]) {
            score.missingFields.push(field);
            score.suggestions.push(`Add ${field} property for better Article schema`);
          } else {
            score.score += 15;
          }
        });
      }

      // SoftwareApplication-specific fields
      if (schemaType === 'SoftwareApplication') {
        const softwareFields = ['name', 'operatingSystem', 'applicationCategory', 'offers'];
        softwareFields.forEach(field => {
          if (!schema[field]) {
            score.missingFields.push(field);
            score.suggestions.push(`Add ${field} property for better SoftwareApplication schema`);
          } else {
            score.score += 15;
          }
        });
      }
    }

    // Advanced features scoring
    if (schema.potentialAction) {
      score.score += 10;
      score.suggestions.push('Great! You have potentialAction - this helps with rich snippets');
    } else {
      score.suggestions.push('Consider adding potentialAction for better rich snippet eligibility');
    }

    if (schema.offers) {
      score.score += 10;
    }

    if (schema.aggregateRating) {
      score.score += 10;
      score.suggestions.push('Excellent! Aggregate ratings improve trust signals');
    }

    // Cap score at 100
    score.score = Math.min(score.score, 100);

    return score;
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    try {
      const parsedSchema = JSON.parse(schemaInput);
      const validation = validateSchema(parsedSchema);
      
      if (validation.valid) {
        const score = calculateSchemaScore(parsedSchema);
        setAnalysis({
          valid: true,
          score
        });
      } else {
        setAnalysis({
          valid: false,
          errors: validation.errors
        });
      }
    } catch (error) {
      setAnalysis({
        valid: false,
        errors: [{ message: 'Invalid JSON format' }]
      });
    }
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Schema Scoring & Suggestions
        </h1>
        <p className="text-gray-600">
          Analyze your JSON-LD schema, get a score, and receive actionable suggestions for improvement.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Enter Your JSON-LD Schema
        </h2>
        
        <div className="space-y-4">
          <textarea
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder='{"@context": "https://schema.org", "@type": "Product", "name": "Example Product"}'
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            disabled={isAnalyzing}
          />
          
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !schemaInput.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Schema'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Validation Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Validation Results
            </h2>
            
            {analysis.valid ? (
              <div className="flex items-center space-x-3 text-green-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <span className="font-medium">Schema is valid</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-red-700">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <span className="font-medium">Schema has validation errors</span>
                </div>
                <ul className="list-disc pl-6 text-sm text-red-600">
                  {analysis.errors?.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Scoring Results */}
          {analysis.valid && analysis.score && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Schema Score
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.score.score)}`}>
                    {analysis.score.score}/100
                  </div>
                  <div className="text-lg font-medium text-gray-700">
                    {getScoreLabel(analysis.score.score)}
                  </div>
                </div>

                {/* Missing Fields */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Missing Fields</h3>
                  {analysis.score.missingFields.length > 0 ? (
                    <ul className="space-y-2">
                      {analysis.score.missingFields.map((field, index) => (
                        <li key={index} className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
                          {field}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-600">No missing fields detected!</p>
                  )}
                </div>

                {/* Suggestions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Suggestions</h3>
                  <ul className="space-y-2">
                    {analysis.score.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 