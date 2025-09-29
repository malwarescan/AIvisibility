import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface AgentPersona {
  id: string;
  platform: string;
  variant: string;
  configuration: {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt?: string;
    contextWindow: number;
  };
  behavior: {
    contentPreference: number;
    authorityWeight: number;
    citationWeight: number;
    schemaWeight: number;
    freshnessWeight: number;
    lengthPreference: number;
  };
  personality: {
    analytical: number;
    creative: number;
    conservative: number;
    experimental: number;
  };
}

interface BehavioralMemory {
  url: string;
  agentId: string;
  timestamp: string;
  behavior: {
    ignoredElements: string[];
    preferredElements: string[];
    rankingFactors: Record<string, number>;
    responsePattern: string;
  };
  performance: {
    accuracy: number;
    consistency: number;
    adaptation: number;
  };
}

interface EnhancedPlatformPrediction {
  platform: string;
  predictedRank: number;
  confidenceScore: number;
  citationCount: number;
  authorityScore: number;
  factors: {
    contentQuality: number;
    authoritySignals: number;
    citationFrequency: number;
    schemaMarkup: number;
  };
  agentPersona: AgentPersona;
  behavioralInsights: {
    memoryInfluence: number;
    adaptationScore: number;
    consistencyScore: number;
    predictedBehavior: string[];
  };
  confidenceFactors: {
    personaAlignment: number;
    memoryConsistency: number;
    modelConfiguration: number;
    contextRelevance: number;
  };
}

interface AgentPersonaDisplayProps {
  agentPersonas: AgentPersona[];
  behavioralMemories: BehavioralMemory[];
  predictions: EnhancedPlatformPrediction[];
  personaInsights: {
    personaEffectiveness: Record<string, number>;
    adaptationTrends: Record<string, number>;
    consistencyScores: Record<string, number>;
  };
}

export function AgentPersonaDisplay({ 
  agentPersonas, 
  behavioralMemories, 
  predictions,
  personaInsights 
}: AgentPersonaDisplayProps) {
  const getPersonalityColor = (trait: string) => {
    switch (trait) {
      case 'analytical': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      case 'conservative': return 'bg-green-100 text-green-800';
      case 'experimental': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBehaviorColor = (weight: number) => {
    if (weight > 0.8) return 'bg-green-100 text-green-800';
    if (weight > 0.6) return 'bg-blue-100 text-blue-800';
    if (weight > 0.4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getResponsePatternColor = (pattern: string) => {
    switch (pattern) {
      case 'highly_positive': return 'bg-green-100 text-green-800';
      case 'positive': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Personas Overview */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Agent Personas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentPersonas.map((persona) => (
            <div key={persona.id} className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{persona.platform}</h4>
                  <p className="text-sm text-gray-600">{persona.variant}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{persona.configuration.model}</span>
                </div>
              </div>
              
              {/* Configuration */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Temperature:</span>
                  <span className="font-medium">{persona.configuration.temperature}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Max Tokens:</span>
                  <span className="font-medium">{persona.configuration.maxTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Context:</span>
                  <span className="font-medium">{persona.configuration.contextWindow.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Personality Traits */}
              <div className="space-y-1 mb-3">
                <span className="text-xs font-medium text-gray-700">Personality:</span>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(persona.personality).map(([trait, value]) => (
                    <span 
                      key={trait}
                      className={`text-xs px-2 py-1 rounded-full ${getPersonalityColor(trait)}`}
                    >
                      {trait}: {Math.round(value * 100)}%
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Behavior Weights */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-700">Behavior:</span>
                <div className="space-y-1">
                  {Object.entries(persona.behavior).map(([behavior, weight]) => (
                    <div key={behavior} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 capitalize">
                        {behavior.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getBehaviorColor(weight)}`}>
                        {Math.round(weight * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Predictions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Enhanced Predictions
        </h3>
        
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {prediction.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{prediction.platform}</h4>
                    <p className="text-sm text-gray-600">{prediction.agentPersona.variant}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">#{prediction.predictedRank}</div>
                  <div className="text-sm text-purple-600 font-medium">
                    {Math.round(prediction.confidenceScore * 100)}% confidence
                  </div>
                </div>
              </div>
              
              {/* Behavioral Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs font-medium text-gray-700">Behavioral Insights:</span>
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Memory Influence:</span>
                      <span className="font-medium">
                        {Math.round(prediction.behavioralInsights.memoryInfluence * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Adaptation Score:</span>
                      <span className="font-medium">
                        {Math.round(prediction.behavioralInsights.adaptationScore * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Consistency Score:</span>
                      <span className="font-medium">
                        {Math.round(prediction.behavioralInsights.consistencyScore * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-gray-700">Confidence Factors:</span>
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Persona Alignment:</span>
                      <span className="font-medium">
                        {Math.round(prediction.confidenceFactors.personaAlignment * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Memory Consistency:</span>
                      <span className="font-medium">
                        {Math.round(prediction.confidenceFactors.memoryConsistency * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Model Config:</span>
                      <span className="font-medium">
                        {Math.round(prediction.confidenceFactors.modelConfiguration * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Predicted Behavior */}
              {prediction.behavioralInsights.predictedBehavior.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-700">Predicted Behavior:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {prediction.behavioralInsights.predictedBehavior.map((behavior, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                      >
                        {behavior}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Memories */}
      {behavioralMemories.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Behavioral Memories
          </h3>
          
          <div className="space-y-3">
            {behavioralMemories.slice(0, 5).map((memory, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{memory.agentId}</h4>
                    <p className="text-xs text-gray-600">
                      {new Date(memory.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getResponsePatternColor(memory.behavior.responsePattern)}`}>
                      {memory.behavior.responsePattern.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs font-medium text-gray-700">Performance:</span>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium">{Math.round(memory.performance.accuracy * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Consistency:</span>
                        <span className="font-medium">{Math.round(memory.performance.consistency * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Adaptation:</span>
                        <span className="font-medium">{Math.round(memory.performance.adaptation * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-700">Behavior:</span>
                    <div className="space-y-1 mt-1">
                      {memory.behavior.ignoredElements.length > 0 && (
                        <div className="text-xs">
                          <span className="text-gray-600">Ignored:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {memory.behavior.ignoredElements.map((element, idx) => (
                              <span key={idx} className="text-xs px-1 py-0.5 bg-red-100 text-red-800 rounded">
                                {element}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {memory.behavior.preferredElements.length > 0 && (
                        <div className="text-xs">
                          <span className="text-gray-600">Preferred:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {memory.behavior.preferredElements.map((element, idx) => (
                              <span key={idx} className="text-xs px-1 py-0.5 bg-green-100 text-green-800 rounded">
                                {element}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Persona Insights */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Persona Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Effectiveness</h4>
            <div className="space-y-2">
              {Object.entries(personaInsights.personaEffectiveness).map(([platform, effectiveness]) => (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{platform}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(effectiveness * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900 w-8">
                      {Math.round(effectiveness * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Adaptation Trends</h4>
            <div className="space-y-2">
              {Object.entries(personaInsights.adaptationTrends).map(([platform, adaptation]) => (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{platform}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(adaptation * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900 w-8">
                      {Math.round(adaptation * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Consistency Scores</h4>
            <div className="space-y-2">
              {Object.entries(personaInsights.consistencyScores).map(([platform, consistency]) => (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{platform}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(consistency * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900 w-8">
                      {Math.round(consistency * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 