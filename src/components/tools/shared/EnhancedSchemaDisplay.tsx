import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface KnowledgeGraphEntity {
  qid: string;
  label: string;
  description: string;
  aliases: string[];
  properties: Record<string, any>;
  edgeCount: number;
  authorityScore: number;
}

interface ContextualAnchor {
  id: string;
  text: string;
  section: string;
  schemaType: string;
  relevanceScore: number;
  aiReadinessScore: number;
  suggestedSchema: any;
}

interface ConversationalReadinessIndex {
  overallScore: number;
  hallucinationRisk: number;
  completenessScore: number;
  contextualityScore: number;
  factualityScore: number;
  reasoning: string;
  improvementSuggestions: string[];
}

interface EnhancedSchemaDisplayProps {
  knowledgeGraphEntities: KnowledgeGraphEntity[];
  contextualAnchors: ContextualAnchor[];
  conversationalReadiness: ConversationalReadinessIndex;
  knowledgeGraphScore: number;
  anchorOptimizationScore: number;
  aiReadinessScore: number;
}

export function EnhancedSchemaDisplay({ 
  knowledgeGraphEntities, 
  contextualAnchors, 
  conversationalReadiness,
  knowledgeGraphScore,
  anchorOptimizationScore,
  aiReadinessScore
}: EnhancedSchemaDisplayProps) {
  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600';
    if (risk < 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Knowledge Graph Analysis */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Knowledge Graph Edge Density
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Knowledge Graph Score</span>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getScoreColor(knowledgeGraphScore)}`}>
                  {knowledgeGraphScore}/100
                </span>
                <StatusIndicator 
                  status={knowledgeGraphScore > 80 ? 'excellent' : knowledgeGraphScore > 60 ? 'good' : 'poor'} 
                  size="sm" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Entities Found</span>
              <span className="text-lg font-bold text-gray-900">{knowledgeGraphEntities.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Edge Count</span>
              <span className="text-lg font-bold text-gray-900">
                {knowledgeGraphEntities.reduce((sum, entity) => sum + entity.edgeCount, 0)}
              </span>
            </div>
          </div>

          {/* Entity List */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-700">Knowledge Graph Entities</span>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {knowledgeGraphEntities.slice(0, 5).map((entity, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{entity.label}</h4>
                    <span className="text-xs text-gray-500">{entity.qid}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{entity.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Edges: {entity.edgeCount}</span>
                    <span className="text-gray-500">Authority: {Math.round(entity.authorityScore * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Anchor Analysis */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contextual Anchor Insertion
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Anchor Optimization Score</span>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getScoreColor(anchorOptimizationScore)}`}>
                  {anchorOptimizationScore}/100
                </span>
                <StatusIndicator 
                  status={anchorOptimizationScore > 80 ? 'excellent' : anchorOptimizationScore > 60 ? 'good' : 'poor'} 
                  size="sm" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Anchors Generated</span>
              <span className="text-lg font-bold text-gray-900">{contextualAnchors.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Avg AI Readiness</span>
              <span className="text-lg font-bold text-gray-900">
                {Math.round(contextualAnchors.reduce((sum, anchor) => sum + anchor.aiReadinessScore, 0) / Math.max(contextualAnchors.length, 1))}%
              </span>
            </div>
          </div>

          {/* Anchor List */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-700">Contextual Anchors</span>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {contextualAnchors.slice(0, 5).map((anchor, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{anchor.section}</h4>
                    <span className="text-xs text-gray-500">{anchor.schemaType}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{anchor.text}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Relevance: {Math.round(anchor.relevanceScore * 100)}%</span>
                    <span className="text-gray-500">AI Ready: {Math.round(anchor.aiReadinessScore)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversational Readiness Index */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Conversational Readiness Index
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Readiness Score</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getScoreColor(conversationalReadiness.overallScore)}`}>
                  {conversationalReadiness.overallScore}/100
                </span>
                <StatusIndicator 
                  status={conversationalReadiness.overallScore > 80 ? 'excellent' : conversationalReadiness.overallScore > 60 ? 'good' : 'poor'} 
                  size="sm" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Completeness Score</span>
                <span className={`text-lg font-bold ${getScoreColor(conversationalReadiness.completenessScore)}`}>
                  {conversationalReadiness.completenessScore}/100
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Contextuality Score</span>
                <span className={`text-lg font-bold ${getScoreColor(conversationalReadiness.contextualityScore)}`}>
                  {conversationalReadiness.contextualityScore}/100
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Factuality Score</span>
                <span className={`text-lg font-bold ${getScoreColor(conversationalReadiness.factualityScore)}`}>
                  {conversationalReadiness.factualityScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Hallucination Risk</span>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getRiskColor(conversationalReadiness.hallucinationRisk)}`}>
                  {conversationalReadiness.hallucinationRisk}/100
                </span>
                <StatusIndicator 
                  status={conversationalReadiness.hallucinationRisk < 20 ? 'excellent' : conversationalReadiness.hallucinationRisk < 40 ? 'good' : 'poor'} 
                  size="sm" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700">Reasoning</span>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {conversationalReadiness.reasoning}
              </p>
            </div>
            
            {conversationalReadiness.improvementSuggestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Improvement Suggestions</span>
                <div className="space-y-1">
                  {conversationalReadiness.improvementSuggestions.slice(0, 3).map((suggestion, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                      • {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Readiness Summary */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          AI Readiness Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(knowledgeGraphScore)}`}>
              {knowledgeGraphScore}
            </div>
            <div className="text-sm text-gray-600">Knowledge Graph</div>
            <div className="text-xs text-gray-500">Edge density score</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(anchorOptimizationScore)}`}>
              {anchorOptimizationScore}
            </div>
            <div className="text-sm text-gray-600">Anchor Optimization</div>
            <div className="text-xs text-gray-500">Contextual linking</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(aiReadinessScore)}`}>
              {aiReadinessScore}
            </div>
            <div className="text-sm text-gray-600">Conversational Readiness</div>
            <div className="text-xs text-gray-500">AI response quality</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">AI Integration Ready</span>
          </div>
          <p className="text-sm text-gray-600">
            This schema is optimized for AI platforms with {knowledgeGraphEntities.length} knowledge graph entities, 
            {contextualAnchors.length} contextual anchors, and a {conversationalReadiness.overallScore}% conversational readiness score.
          </p>
        </div>
      </div>
    </div>
  );
} 