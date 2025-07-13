"use client";

import { useState } from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { AppleTerminal } from '@/components/ui/AppleTerminal';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { MetricCard } from '@/components/ui/MetricCard';
import { 
  SchemaAnalysisResult, 
  SchemaRecommendation, 
  AIOptimizationScore,
  PlatformSchemaScores,
  TechnicalSchemaAnalysis 
} from '@/types/schema';

export default function SchemaOptimizerPage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SchemaAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const addTerminalLog = (message: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setTerminalLogs([]);

    addTerminalLog('Starting AI Search Schema Optimizer...');
    addTerminalLog(`Target URL: ${url}`);

    try {
      addTerminalLog('Initializing schema analysis...');
      
      const response = await fetch('/api/analyze-schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          options: {
            includeStructuredData: true,
            includeMicrodata: true,
            includeJSONLD: true,
            includeRDFa: true,
            includeOpenGraph: true,
            includeTwitterCards: true,
          }
        }),
      });

      addTerminalLog('Processing schema markup...');

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      addTerminalLog('Analyzing structured data...');
      addTerminalLog('Calculating AI optimization scores...');
      addTerminalLog('Generating recommendations...');
      addTerminalLog('Analysis completed successfully!');

      setAnalysisResult(data.result);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      setError(errorMessage);
      addTerminalLog(`Error: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'poor';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <AutoAnimatedElement animation="slideUp" intensity={1.2}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  AI Search Schema Optimizer
                </h1>
                <p className="text-gray-600">
                  Optimize structured data for AI search engines across 20+ platforms
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium">
                  AI-First SEO
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                  Real-time Analysis
                </div>
              </div>
            </div>

            {/* URL Input */}
            <div className="flex gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url.trim()}
                className="px-8 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Schema'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </AutoAnimatedElement>

        {/* Terminal Display */}
        <AutoAnimatedElement animation="slideUp" delay={0.2}>
          <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm ml-3">
                  Schema Analysis Terminal
                </span>
              </div>
              <div className="text-gray-400 text-xs">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="text-green-400 mb-4">
              <span className="text-yellow-400">$</span> neural-command schema-optimizer
            </div>
            
            <div className="text-blue-400 mb-4">
              Starting AI search schema optimization...
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {terminalLogs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex items-center space-x-2 text-yellow-400">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>
        </AutoAnimatedElement>

        {/* Analysis Results */}
        {analysisResult && (
          <>
            {/* Overall Score */}
            <AutoAnimatedElement animation="slideUp" delay={0.4}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Schema Analysis Results
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard
                    title="Overall Schema Score"
                    value={`${analysisResult.overallScore}/100`}
                    change={`${analysisResult.overallScore >= 80 ? '+' : ''}${analysisResult.overallScore - 70}%`}
                    changeType={analysisResult.overallScore >= 80 ? 'positive' : 'negative'}
                    description="AI-optimized schema markup"
                  />
                  
                  <MetricCard
                    title="AI Optimization"
                    value={`${analysisResult.aiOptimization.overall}/100`}
                    change="+15%"
                    changeType="positive"
                    description="Conversational query support"
                  />
                  
                  <MetricCard
                    title="Platform Coverage"
                    value={`${Object.keys(analysisResult.platformScores).length}/6`}
                    change="+2 new"
                    changeType="positive"
                    description="AI platforms optimized"
                  />
                </div>
              </div>
            </AutoAnimatedElement>

            {/* AI Optimization Scores */}
            <AutoAnimatedElement animation="slideUp" delay={0.6}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  AI Optimization Breakdown
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(analysisResult.aiOptimization).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(value)}`}>
                        {value}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <StatusIndicator status={getScoreStatus(value)} />
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Platform Scores */}
            <AutoAnimatedElement animation="slideUp" delay={0.8}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Platform-Specific Optimization
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(analysisResult.platformScores).map(([platform, score]) => (
                    <div key={platform} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className={`text-xl font-bold ${getScoreColor(score)}`}>
                        {score}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {platform.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Schema Types */}
            <AutoAnimatedElement animation="slideUp" delay={1.0}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Schema Type Analysis
                </h3>
                
                <div className="space-y-4">
                  {analysisResult.schemaTypes.map((schemaType, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-900">{schemaType.type}</h4>
                        <p className="text-sm text-gray-600">
                          Implementation: {schemaType.implementation}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(schemaType.score)}`}>
                          {schemaType.score}/100
                        </div>
                        <div className="text-sm text-gray-600">
                          AI Relevance: {schemaType.aiRelevance}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Recommendations */}
            <AutoAnimatedElement animation="slideUp" delay={1.2}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  AI-Specific Recommendations
                </h3>
                
                <div className="space-y-4">
                  {analysisResult.recommendations.map((recommendation, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 ${
                      recommendation.priority === 'high' ? 'bg-red-50 border-red-400' :
                      recommendation.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-blue-50 border-blue-400'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {recommendation.title}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {recommendation.description}
                          </p>
                          <div className="text-sm text-gray-500">
                            <strong>Implementation:</strong> {recommendation.implementation}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            recommendation.priority === 'high' ? 'bg-red-100 text-red-700' :
                            recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {recommendation.priority} priority
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            Impact: {recommendation.impact}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Technical Analysis */}
            <AutoAnimatedElement animation="slideUp" delay={1.4}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Technical Analysis
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {analysisResult.technicalAnalysis.structuredDataCount}
                    </div>
                    <div className="text-sm text-gray-600">Structured Data</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      {analysisResult.technicalAnalysis.jsonLdCount}
                    </div>
                    <div className="text-sm text-gray-600">JSON-LD</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {analysisResult.technicalAnalysis.openGraphCount}
                    </div>
                    <div className="text-sm text-gray-600">Open Graph</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">
                      {analysisResult.technicalAnalysis.performanceImpact}%
                    </div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                </div>
              </div>
            </AutoAnimatedElement>
          </>
        )}
      </div>
    </div>
  );
} 