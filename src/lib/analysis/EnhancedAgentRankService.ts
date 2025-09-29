import { AgentRankService, AnalysisResult, PlatformPrediction, ContentData, OptimizationRecommendation } from './AgentRankService';
import OpenAIService from '../ai/OpenAIService';

export interface AgentPersona {
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

export interface BehavioralMemory {
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

export interface EnhancedPlatformPrediction extends PlatformPrediction {
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

export interface EnhancedAnalysisResult extends AnalysisResult {
  agentPersonas: AgentPersona[];
  behavioralMemories: BehavioralMemory[];
  personaInsights: {
    personaEffectiveness: Record<string, number>;
    adaptationTrends: Record<string, number>;
    consistencyScores: Record<string, number>;
  };
  predictions: EnhancedPlatformPrediction[];
}

export class EnhancedAgentRankService extends AgentRankService {
  private openAIService: OpenAIService;
  private agentPersonas: Map<string, AgentPersona> = new Map();
  private behavioralMemories: Map<string, BehavioralMemory[]> = new Map();
  private personaEffectiveness: Record<string, number> = {};

  constructor() {
    super();
    this.openAIService = new OpenAIService();
    this.initializeAgentPersonas();
  }

  private initializeAgentPersonas(): void {
    // ChatGPT Personas
    this.agentPersonas.set('chatgpt-web', {
      id: 'chatgpt-web',
      platform: 'ChatGPT',
      variant: 'Web Interface',
      configuration: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        contextWindow: 8192
      },
      behavior: {
        contentPreference: 0.8,
        authorityWeight: 0.7,
        citationWeight: 0.6,
        schemaWeight: 0.5,
        freshnessWeight: 0.8,
        lengthPreference: 0.6
      },
      personality: {
        analytical: 0.7,
        creative: 0.8,
        conservative: 0.4,
        experimental: 0.6
      }
    });

    this.agentPersonas.set('chatgpt-api', {
      id: 'chatgpt-api',
      platform: 'ChatGPT',
      variant: 'API Access',
      configuration: {
        model: 'gpt-4',
        temperature: 0.3,
        maxTokens: 8000,
        contextWindow: 8192
      },
      behavior: {
        contentPreference: 0.9,
        authorityWeight: 0.8,
        citationWeight: 0.7,
        schemaWeight: 0.6,
        freshnessWeight: 0.7,
        lengthPreference: 0.8
      },
      personality: {
        analytical: 0.8,
        creative: 0.6,
        conservative: 0.6,
        experimental: 0.4
      }
    });

    // Claude Personas
    this.agentPersonas.set('claude-web', {
      id: 'claude-web',
      platform: 'Claude',
      variant: 'Web Interface',
      configuration: {
        model: 'claude-3-sonnet',
        temperature: 0.5,
        maxTokens: 4000,
        contextWindow: 100000
      },
      behavior: {
        contentPreference: 0.9,
        authorityWeight: 0.8,
        citationWeight: 0.8,
        schemaWeight: 0.4,
        freshnessWeight: 0.6,
        lengthPreference: 0.9
      },
      personality: {
        analytical: 0.9,
        creative: 0.5,
        conservative: 0.7,
        experimental: 0.3
      }
    });

    this.agentPersonas.set('claude-api', {
      id: 'claude-api',
      platform: 'Claude',
      variant: 'API Access',
      configuration: {
        model: 'claude-3-opus',
        temperature: 0.2,
        maxTokens: 8000,
        contextWindow: 200000
      },
      behavior: {
        contentPreference: 0.95,
        authorityWeight: 0.9,
        citationWeight: 0.9,
        schemaWeight: 0.3,
        freshnessWeight: 0.5,
        lengthPreference: 0.95
      },
      personality: {
        analytical: 0.95,
        creative: 0.4,
        conservative: 0.8,
        experimental: 0.2
      }
    });

    // Perplexity Personas
    this.agentPersonas.set('perplexity-web', {
      id: 'perplexity-web',
      platform: 'Perplexity',
      variant: 'Web Interface',
      configuration: {
        model: 'mixtral-8x7b',
        temperature: 0.6,
        maxTokens: 4000,
        contextWindow: 32768
      },
      behavior: {
        contentPreference: 0.7,
        authorityWeight: 0.6,
        citationWeight: 0.9,
        schemaWeight: 0.7,
        freshnessWeight: 0.9,
        lengthPreference: 0.5
      },
      personality: {
        analytical: 0.8,
        creative: 0.6,
        conservative: 0.5,
        experimental: 0.7
      }
    });

    // Google AI Personas
    this.agentPersonas.set('google-ai-web', {
      id: 'google-ai-web',
      platform: 'Google AI',
      variant: 'Web Interface',
      configuration: {
        model: 'gemini-pro',
        temperature: 0.4,
        maxTokens: 4000,
        contextWindow: 32768
      },
      behavior: {
        contentPreference: 0.8,
        authorityWeight: 0.9,
        citationWeight: 0.7,
        schemaWeight: 0.8,
        freshnessWeight: 0.8,
        lengthPreference: 0.7
      },
      personality: {
        analytical: 0.8,
        creative: 0.7,
        conservative: 0.6,
        experimental: 0.5
      }
    });
  }

  async analyzeContent(url: string): Promise<EnhancedAnalysisResult> {
    const startTime = Date.now();
    
    try {
      // Get base analysis from parent class
      const baseAnalysis = await super.analyzeContent(url);
      
      // Step 1: Load behavioral memories for this URL
      const behavioralMemories = await this.loadBehavioralMemories(url);
      
      // Step 2: Generate enhanced predictions with persona modeling
      const enhancedPredictions = await this.generateEnhancedPredictions(
        baseAnalysis.contentData, 
        baseAnalysis.predictions,
        behavioralMemories
      );
      
      // Step 3: Update behavioral memories
      await this.updateBehavioralMemories(url, enhancedPredictions);
      
      // Step 4: Calculate persona insights
      const personaInsights = this.calculatePersonaInsights(enhancedPredictions, behavioralMemories);
      
      const processingTime = Date.now() - startTime;
      
      return {
        ...baseAnalysis,
        agentPersonas: Array.from(this.agentPersonas.values()),
        behavioralMemories,
        personaInsights,
        predictions: enhancedPredictions,
        metadata: {
          ...baseAnalysis.metadata,
          processingTime
        }
      };
    } catch (error) {
      console.error('Enhanced AgentRank analysis failed:', error);
      throw new Error(`Enhanced analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async loadBehavioralMemories(url: string): Promise<BehavioralMemory[]> {
    const urlHash = this.generateContentHash({ url } as ContentData);
    const memories = this.behavioralMemories.get(urlHash) || [];
    
    // Filter recent memories (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return memories.filter(memory => 
      new Date(memory.timestamp) > thirtyDaysAgo
    );
  }

  private async generateEnhancedPredictions(
    contentData: ContentData, 
    basePredictions: PlatformPrediction[],
    behavioralMemories: BehavioralMemory[]
  ): Promise<EnhancedPlatformPrediction[]> {
    const enhancedPredictions: EnhancedPlatformPrediction[] = [];
    
    for (const basePrediction of basePredictions) {
      const personas = Array.from(this.agentPersonas.values())
        .filter(persona => persona.platform === basePrediction.platform);
      
      for (const persona of personas) {
        const memory = behavioralMemories.find(m => m.agentId === persona.id);
        const enhancedPrediction = await this.generatePersonaPrediction(
          contentData, 
          basePrediction, 
          persona, 
          memory
        );
        enhancedPredictions.push(enhancedPrediction);
      }
    }
    
    return enhancedPredictions;
  }

  private async generatePersonaPrediction(
    contentData: ContentData,
    basePrediction: PlatformPrediction,
    persona: AgentPersona,
    memory: BehavioralMemory | undefined
  ): Promise<EnhancedPlatformPrediction> {
    // Apply persona-specific adjustments
    const adjustedFactors = this.applyPersonaFactors(basePrediction.factors, persona);
    
    // Apply behavioral memory influence
    const memoryInfluence = memory ? this.calculateMemoryInfluence(memory, contentData) : 0;
    
    // Generate behavioral insights
    const behavioralInsights = this.generateBehavioralInsights(persona, memory, contentData);
    
    // Calculate confidence factors
    const confidenceFactors = this.calculateConfidenceFactors(persona, memory, contentData);
    
    // Adjust prediction based on persona and memory
    const adjustedRank = this.adjustRanking(basePrediction.predictedRank, persona, memory);
    const adjustedConfidence = this.adjustConfidence(basePrediction.confidenceScore, confidenceFactors);
    
    return {
      ...basePrediction,
      platform: `${persona.platform} (${persona.variant})`,
      predictedRank: adjustedRank,
      confidenceScore: adjustedConfidence,
      factors: adjustedFactors,
      agentPersona: persona,
      behavioralInsights,
      confidenceFactors
    };
  }

  private applyPersonaFactors(baseFactors: any, persona: AgentPersona): any {
    return {
      contentQuality: baseFactors.contentQuality * persona.behavior.contentPreference,
      authoritySignals: baseFactors.authoritySignals * persona.behavior.authorityWeight,
      citationFrequency: baseFactors.citationFrequency * persona.behavior.citationWeight,
      schemaMarkup: baseFactors.schemaMarkup * persona.behavior.schemaWeight
    };
  }

  private calculateMemoryInfluence(memory: BehavioralMemory, contentData: ContentData): number {
    let influence = 0;
    
    // Check if current content has elements that were previously ignored
    const ignoredElements = memory.behavior.ignoredElements;
    const hasIgnoredElements = ignoredElements.some(element => 
      contentData.content.toLowerCase().includes(element.toLowerCase())
    );
    
    if (hasIgnoredElements) {
      influence -= 0.2; // Negative influence for ignored elements
    }
    
    // Check if current content has elements that were previously preferred
    const preferredElements = memory.behavior.preferredElements;
    const hasPreferredElements = preferredElements.some(element => 
      contentData.content.toLowerCase().includes(element.toLowerCase())
    );
    
    if (hasPreferredElements) {
      influence += 0.3; // Positive influence for preferred elements
    }
    
    return Math.max(-0.5, Math.min(0.5, influence)); // Clamp between -0.5 and 0.5
  }

  private generateBehavioralInsights(
    persona: AgentPersona, 
    memory: BehavioralMemory | undefined, 
    contentData: ContentData
  ): any {
    const insights = {
      memoryInfluence: memory ? this.calculateMemoryInfluence(memory, contentData) : 0,
      adaptationScore: this.calculateAdaptationScore(persona, memory),
      consistencyScore: this.calculateConsistencyScore(persona, memory),
      predictedBehavior: this.predictBehavior(persona, contentData)
    };
    
    return insights;
  }

  private calculateAdaptationScore(persona: AgentPersona, memory: BehavioralMemory | undefined): number {
    if (!memory) return 0.5; // Neutral if no memory
    
    // Calculate how much the agent adapts based on personality
    const adaptationBase = persona.personality.experimental;
    const consistencyBase = persona.personality.conservative;
    
    return (adaptationBase * 0.7) + (consistencyBase * 0.3);
  }

  private calculateConsistencyScore(persona: AgentPersona, memory: BehavioralMemory | undefined): number {
    if (!memory) return 0.5; // Neutral if no memory
    
    return memory.performance.consistency * persona.personality.conservative;
  }

  private predictBehavior(persona: AgentPersona, contentData: ContentData): string[] {
    const behaviors: string[] = [];
    
    // Analyze content characteristics and predict behavior
    if (contentData.content.length > 5000 && persona.behavior.lengthPreference < 0.7) {
      behaviors.push('May truncate long content');
    }
    
    if (contentData.citations.length > 5 && persona.behavior.citationWeight > 0.7) {
      behaviors.push('Will emphasize citations');
    }
    
    if (contentData.schema.hasStructuredData && persona.behavior.schemaWeight < 0.5) {
      behaviors.push('May ignore structured data');
    }
    
    if (persona.personality.analytical > 0.8) {
      behaviors.push('Will analyze content critically');
    }
    
    if (persona.personality.creative > 0.7) {
      behaviors.push('May suggest creative improvements');
    }
    
    return behaviors;
  }

  private calculateConfidenceFactors(
    persona: AgentPersona, 
    memory: BehavioralMemory | undefined, 
    contentData: ContentData
  ): any {
    return {
      personaAlignment: this.calculatePersonaAlignment(persona, contentData),
      memoryConsistency: memory ? memory.performance.consistency : 0.5,
      modelConfiguration: this.calculateModelConfigurationScore(persona),
      contextRelevance: this.calculateContextRelevance(persona, contentData)
    };
  }

  private calculatePersonaAlignment(persona: AgentPersona, contentData: ContentData): number {
    let alignment = 0.5; // Base alignment
    
    // Content length alignment
    const contentLength = contentData.content.length;
    if (contentLength > 5000 && persona.behavior.lengthPreference > 0.7) {
      alignment += 0.2;
    } else if (contentLength < 1000 && persona.behavior.lengthPreference < 0.5) {
      alignment += 0.2;
    }
    
    // Citation alignment
    if (contentData.citations.length > 3 && persona.behavior.citationWeight > 0.7) {
      alignment += 0.2;
    }
    
    // Schema alignment
    if (contentData.schema.hasStructuredData && persona.behavior.schemaWeight > 0.6) {
      alignment += 0.1;
    }
    
    return Math.min(1.0, alignment);
  }

  private calculateModelConfigurationScore(persona: AgentPersona): number {
    let score = 0.5; // Base score
    
    // Temperature influence
    if (persona.configuration.temperature < 0.3) {
      score += 0.2; // More deterministic
    } else if (persona.configuration.temperature > 0.7) {
      score -= 0.1; // More variable
    }
    
    // Context window influence
    if (persona.configuration.contextWindow > 100000) {
      score += 0.1; // Better context handling
    }
    
    return Math.min(1.0, Math.max(0.0, score));
  }

  private calculateContextRelevance(persona: AgentPersona, contentData: ContentData): number {
    let relevance = 0.5; // Base relevance
    
    // Content type relevance
    if (contentData.content.includes('research') && persona.personality.analytical > 0.7) {
      relevance += 0.2;
    }
    
    if (contentData.content.includes('creative') && persona.personality.creative > 0.7) {
      relevance += 0.2;
    }
    
    return Math.min(1.0, relevance);
  }

  private adjustRanking(baseRank: number, persona: AgentPersona, memory: BehavioralMemory | undefined): number {
    let adjustment = 0;
    
    // Personality-based adjustments
    if (persona.personality.conservative > 0.7) {
      adjustment -= 0.5; // Conservative agents rank higher
    }
    
    if (persona.personality.experimental > 0.7) {
      adjustment += 0.5; // Experimental agents may rank lower
    }
    
    // Memory-based adjustments
    if (memory) {
      adjustment += memory.behavior.rankingFactors.overall || 0;
    }
    
    return Math.max(1, Math.min(10, baseRank + adjustment));
  }

  private adjustConfidence(baseConfidence: number, confidenceFactors: any): number {
    const weightedConfidence = (
      baseConfidence * 0.4 +
      confidenceFactors.personaAlignment * 0.2 +
      confidenceFactors.memoryConsistency * 0.2 +
      confidenceFactors.modelConfiguration * 0.1 +
      confidenceFactors.contextRelevance * 0.1
    );
    
    return Math.min(1.0, Math.max(0.0, weightedConfidence));
  }

  private async updateBehavioralMemories(url: string, predictions: EnhancedPlatformPrediction[]): Promise<void> {
    const urlHash = this.generateContentHash({ url } as ContentData);
    const timestamp = new Date().toISOString();
    
    for (const prediction of predictions) {
      const memory: BehavioralMemory = {
        url,
        agentId: prediction.agentPersona.id,
        timestamp,
        behavior: {
          ignoredElements: this.extractIgnoredElements(prediction),
          preferredElements: this.extractPreferredElements(prediction),
          rankingFactors: {
            overall: prediction.predictedRank <= 3 ? 0.2 : prediction.predictedRank <= 5 ? 0 : -0.2,
            contentQuality: prediction.factors.contentQuality,
            authoritySignals: prediction.factors.authoritySignals,
            citationFrequency: prediction.factors.citationFrequency,
            schemaMarkup: prediction.factors.schemaMarkup
          },
          responsePattern: this.determineResponsePattern(prediction)
        },
        performance: {
          accuracy: prediction.confidenceScore,
          consistency: prediction.behavioralInsights.consistencyScore,
          adaptation: prediction.behavioralInsights.adaptationScore
        }
      };
      
      const existingMemories = this.behavioralMemories.get(urlHash) || [];
      existingMemories.push(memory);
      this.behavioralMemories.set(urlHash, existingMemories);
    }
  }

  private extractIgnoredElements(prediction: EnhancedPlatformPrediction): string[] {
    const ignored: string[] = [];
    
    if (prediction.factors.schemaMarkup < 0.3) {
      ignored.push('structured data');
    }
    
    if (prediction.factors.citationFrequency < 0.4) {
      ignored.push('citations');
    }
    
    if (prediction.factors.authoritySignals < 0.5) {
      ignored.push('authority signals');
    }
    
    return ignored;
  }

  private extractPreferredElements(prediction: EnhancedPlatformPrediction): string[] {
    const preferred: string[] = [];
    
    if (prediction.factors.contentQuality > 0.8) {
      preferred.push('high-quality content');
    }
    
    if (prediction.factors.citationFrequency > 0.7) {
      preferred.push('well-cited content');
    }
    
    if (prediction.factors.authoritySignals > 0.7) {
      preferred.push('authoritative content');
    }
    
    return preferred;
  }

  private determineResponsePattern(prediction: EnhancedPlatformPrediction): string {
    if (prediction.predictedRank <= 2) {
      return 'highly_positive';
    } else if (prediction.predictedRank <= 4) {
      return 'positive';
    } else if (prediction.predictedRank <= 6) {
      return 'neutral';
    } else {
      return 'negative';
    }
  }

  private calculatePersonaInsights(
    predictions: EnhancedPlatformPrediction[], 
    memories: BehavioralMemory[]
  ): any {
    const insights = {
      personaEffectiveness: {} as Record<string, number>,
      adaptationTrends: {} as Record<string, number>,
      consistencyScores: {} as Record<string, number>
    };
    
    // Calculate effectiveness by platform
    const platformGroups = predictions.reduce((groups, pred) => {
      const platform = pred.agentPersona.platform;
      if (!groups[platform]) groups[platform] = [];
      groups[platform].push(pred);
      return groups;
    }, {} as Record<string, EnhancedPlatformPrediction[]>);
    
    Object.entries(platformGroups).forEach(([platform, preds]) => {
      const avgRank = preds.reduce((sum, p) => sum + p.predictedRank, 0) / preds.length;
      insights.personaEffectiveness[platform] = Math.max(0, (11 - avgRank) / 10);
      
      const avgAdaptation = preds.reduce((sum, p) => sum + p.behavioralInsights.adaptationScore, 0) / preds.length;
      insights.adaptationTrends[platform] = avgAdaptation;
      
      const avgConsistency = preds.reduce((sum, p) => sum + p.behavioralInsights.consistencyScore, 0) / preds.length;
      insights.consistencyScores[platform] = avgConsistency;
    });
    
    return insights;
  }

  // Public methods for accessing behavioral data
  getBehavioralMemories(url: string): BehavioralMemory[] {
    const urlHash = this.generateContentHash({ url } as ContentData);
    return this.behavioralMemories.get(urlHash) || [];
  }

  getPersonaEffectiveness(): Record<string, number> {
    return this.personaEffectiveness;
  }

  resetBehavioralMemories(): void {
    this.behavioralMemories.clear();
  }
} 