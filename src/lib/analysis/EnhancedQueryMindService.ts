import { QueryMindService, QueryAnalysis, OptimizedQuery, KeywordSuggestion, PerformancePrediction, QueryRecommendation } from './QueryMindService';
import OpenAIService from '../ai/OpenAIService';

export interface QueryIntent {
  type: 'navigational' | 'informational' | 'transactional' | 'conversational';
  confidence: number;
  reasoning: string;
  platformAlignment: Record<string, number>;
}

export interface ConversationalRewrite {
  originalQuery: string;
  rewrittenQuery: string;
  intent: QueryIntent;
  platform: string;
  improvementScore: number;
  reasoning: string;
  conversationalStyle: 'educational' | 'actionable' | 'analytical' | 'exploratory';
}

export interface EnhancedQueryAnalysis extends QueryAnalysis {
  intentAnalysis: QueryIntent;
  conversationalRewrites: ConversationalRewrite[];
  platformIntentAlignment: Record<string, number>;
  learningInsights: {
    intentPatterns: Record<string, number>;
    platformPreferences: Record<string, string[]>;
    optimizationTrends: Record<string, number>;
  };
}

export class EnhancedQueryMindService extends QueryMindService {
  private openAIService: OpenAIService;
  private intentPatterns: Record<string, number> = {};
  private platformPreferences: Record<string, string[]> = {};
  private optimizationTrends: Record<string, number> = {};

  constructor() {
    super();
    this.openAIService = new OpenAIService();
  }

  async analyzeQuery(query: string, url: string): Promise<EnhancedQueryAnalysis> {
    const startTime = Date.now();
    
    try {
      // Get base analysis from parent class
      const baseAnalysis = await super.analyzeQuery(query, url);
      
      // Step 1: Analyze query intent
      const intentAnalysis = await this.analyzeQueryIntent(query, url);
      
      // Step 2: Generate conversational rewrites
      const conversationalRewrites = await this.generateConversationalRewrites(query, intentAnalysis, url);
      
      // Step 3: Calculate platform intent alignment
      const platformIntentAlignment = this.calculatePlatformIntentAlignment(intentAnalysis);
      
      // Step 4: Update learning insights
      this.updateLearningInsights(intentAnalysis, conversationalRewrites);
      
      const processingTime = Date.now() - startTime;
      
      return {
        ...baseAnalysis,
        intentAnalysis,
        conversationalRewrites,
        platformIntentAlignment,
        learningInsights: {
          intentPatterns: this.intentPatterns,
          platformPreferences: this.platformPreferences,
          optimizationTrends: this.optimizationTrends
        },
        metadata: {
          ...baseAnalysis.metadata,
          processingTime
        }
      };
    } catch (error) {
      console.error('Enhanced QueryMind analysis failed:', error);
      throw new Error(`Enhanced query analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async analyzeQueryIntent(query: string, url: string): Promise<QueryIntent> {
    try {
      const prompt = `
Analyze the following search query and classify its intent:

Query: "${query}"
URL: ${url}

Classify the query into one of these categories:
1. Navigational - User wants to find a specific website or page
2. Informational - User wants to learn about a topic
3. Transactional - User wants to perform an action (buy, download, etc.)
4. Conversational - User wants to have a dialogue or get advice

Consider these factors:
- Query length and complexity
- Action words (buy, find, how, what, why, etc.)
- Specificity and context
- Platform context (AI search vs traditional search)

Provide your analysis in this JSON format:
{
  "type": "navigational|informational|transactional|conversational",
  "confidence": 0.0-1.0,
  "reasoning": "Detailed explanation of classification",
  "platformAlignment": {
    "ChatGPT": 0.0-1.0,
    "Claude": 0.0-1.0,
    "Perplexity": 0.0-1.0,
    "Google AI": 0.0-1.0
  }
}
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'query_intent_analysis', url);
      
      try {
        const intentData = JSON.parse(response);
        return {
          type: intentData.type,
          confidence: intentData.confidence,
          reasoning: intentData.reasoning,
          platformAlignment: intentData.platformAlignment
        };
      } catch (parseError) {
        console.error('Failed to parse intent analysis:', parseError);
        return this.fallbackIntentAnalysis(query);
      }
    } catch (error) {
      console.error('Intent analysis failed:', error);
      return this.fallbackIntentAnalysis(query);
    }
  }

  private fallbackIntentAnalysis(query: string): QueryIntent {
    const words = query.toLowerCase().split(/\s+/);
    
    // Simple rule-based fallback
    let type: QueryIntent['type'] = 'informational';
    let confidence = 0.6;
    const reasoning = 'Fallback analysis based on query patterns';
    
    if (words.some(word => ['buy', 'purchase', 'download', 'sign', 'register'].includes(word))) {
      type = 'transactional';
      confidence = 0.8;
    } else if (words.some(word => ['how', 'what', 'why', 'when', 'where'].includes(word))) {
      type = 'conversational';
      confidence = 0.7;
    } else if (words.some(word => ['find', 'locate', 'website', 'site'].includes(word))) {
      type = 'navigational';
      confidence = 0.7;
    }
    
    return {
      type,
      confidence,
      reasoning,
      platformAlignment: {
        'ChatGPT': 0.7,
        'Claude': 0.8,
        'Perplexity': 0.6,
        'Google AI': 0.7
      }
    };
  }

  private async generateConversationalRewrites(query: string, intent: QueryIntent, url: string): Promise<ConversationalRewrite[]> {
    const platforms = ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'];
    const rewrites: ConversationalRewrite[] = [];
    
    for (const platform of platforms) {
      try {
        const rewrite = await this.generatePlatformSpecificRewrite(query, intent, platform, url);
        rewrites.push(rewrite);
      } catch (error) {
        console.error(`Failed to generate rewrite for ${platform}:`, error);
        // Add fallback rewrite
        rewrites.push(this.generateFallbackRewrite(query, intent, platform));
      }
    }
    
    return rewrites;
  }

  private async generatePlatformSpecificRewrite(
    query: string, 
    intent: QueryIntent, 
    platform: string, 
    url: string
  ): Promise<ConversationalRewrite> {
    const prompt = `
Rewrite the following query for optimal performance on ${platform}:

Original Query: "${query}"
Intent Type: ${intent.type}
Confidence: ${intent.confidence}

Platform-specific guidelines:
- ChatGPT: Prefer actionable, step-by-step language
- Claude: Prefer educational, explanatory language
- Perplexity: Prefer analytical, research-focused language
- Google AI: Prefer clear, direct language

Consider the intent type:
- Navigational: Focus on finding specific resources
- Informational: Focus on learning and understanding
- Transactional: Focus on completing actions
- Conversational: Focus on dialogue and advice

Provide your response in this JSON format:
{
  "rewrittenQuery": "Optimized query for the platform",
  "improvementScore": 0.0-1.0,
  "reasoning": "Explanation of optimization",
  "conversationalStyle": "educational|actionable|analytical|exploratory"
}
`;

    const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'query_rewrite', url);
    
    try {
      const rewriteData = JSON.parse(response);
      return {
        originalQuery: query,
        rewrittenQuery: rewriteData.rewrittenQuery,
        intent,
        platform,
        improvementScore: rewriteData.improvementScore,
        reasoning: rewriteData.reasoning,
        conversationalStyle: rewriteData.conversationalStyle
      };
    } catch (parseError) {
      console.error('Failed to parse rewrite:', parseError);
      return this.generateFallbackRewrite(query, intent, platform);
    }
  }

  private generateFallbackRewrite(query: string, intent: QueryIntent, platform: string): ConversationalRewrite {
    let rewrittenQuery = query;
    let conversationalStyle: ConversationalRewrite['conversationalStyle'] = 'educational';
    const reasoning = 'Fallback rewrite based on platform patterns';
    const improvementScore = 0.5;
    
    // Platform-specific fallback patterns
    switch (platform) {
      case 'ChatGPT':
        if (intent.type === 'informational') {
          rewrittenQuery = `Explain: ${query}`;
          conversationalStyle = 'actionable';
        }
        break;
      case 'Claude':
        if (intent.type === 'conversational') {
          rewrittenQuery = `Please help me understand: ${query}`;
          conversationalStyle = 'educational';
        }
        break;
      case 'Perplexity':
        if (intent.type === 'informational') {
          rewrittenQuery = `Research: ${query}`;
          conversationalStyle = 'analytical';
        }
        break;
      case 'Google AI':
        rewrittenQuery = query; // Keep original for Google AI
        conversationalStyle = 'exploratory';
        break;
    }
    
    return {
      originalQuery: query,
      rewrittenQuery,
      intent,
      platform,
      improvementScore,
      reasoning,
      conversationalStyle
    };
  }

  private calculatePlatformIntentAlignment(intent: QueryIntent): Record<string, number> {
    const alignment: Record<string, number> = {};
    
    // Calculate alignment scores based on intent type and platform characteristics
    Object.keys(intent.platformAlignment).forEach(platform => {
      const baseScore = intent.platformAlignment[platform];
      let alignmentScore = baseScore;
      
      // Adjust based on intent type and platform preferences
      switch (intent.type) {
        case 'informational':
          if (platform === 'Claude') alignmentScore *= 1.2;
          if (platform === 'ChatGPT') alignmentScore *= 1.1;
          break;
        case 'transactional':
          if (platform === 'ChatGPT') alignmentScore *= 1.2;
          if (platform === 'Perplexity') alignmentScore *= 1.1;
          break;
        case 'conversational':
          if (platform === 'Perplexity') alignmentScore *= 1.2;
          if (platform === 'Claude') alignmentScore *= 1.1;
          break;
        case 'navigational':
          if (platform === 'Google AI') alignmentScore *= 1.2;
          if (platform === 'ChatGPT') alignmentScore *= 1.1;
          break;
      }
      
      alignment[platform] = Math.min(alignmentScore, 1.0);
    });
    
    return alignment;
  }

  private updateLearningInsights(intent: QueryIntent, rewrites: ConversationalRewrite[]): void {
    // Update intent patterns
    this.intentPatterns[intent.type] = (this.intentPatterns[intent.type] || 0) + 1;
    
    // Update platform preferences
    rewrites.forEach(rewrite => {
      if (!this.platformPreferences[rewrite.platform]) {
        this.platformPreferences[rewrite.platform] = [];
      }
      this.platformPreferences[rewrite.platform].push(rewrite.conversationalStyle);
    });
    
    // Update optimization trends
    rewrites.forEach(rewrite => {
      const trendKey = `${rewrite.platform}_${rewrite.conversationalStyle}`;
      this.optimizationTrends[trendKey] = (this.optimizationTrends[trendKey] || 0) + rewrite.improvementScore;
    });
  }

  // Enhanced methods for intent-aware optimization
  async optimizeQueryForIntent(query: string, intent: QueryIntent, platform: string): Promise<OptimizedQuery> {
    // Create a basic optimization since we can't access the private method
    const optimizedQuery = this.applyIntentEnhancements(query, intent, platform);
    
    return {
      platform,
      optimizedQuery,
      improvementScore: 0.7 + (intent.confidence * 0.3),
      confidenceScore: intent.confidence,
      reasoning: `Enhanced for ${intent.type} intent with ${Math.round(intent.confidence * 100)}% confidence.`,
      expectedPerformance: {
        relevance: 0.8,
        precision: 0.7,
        recall: 0.6,
        clickThroughRate: 0.5
      }
    };
  }

  private applyIntentEnhancements(query: string, intent: QueryIntent, platform: string): string {
    let enhancedQuery = query;
    
    switch (intent.type) {
      case 'navigational':
        enhancedQuery = `Find: ${query}`;
        break;
      case 'informational':
        enhancedQuery = `Explain: ${query}`;
        break;
      case 'transactional':
        enhancedQuery = `Help me: ${query}`;
        break;
      case 'conversational':
        enhancedQuery = `Can you help me with: ${query}`;
        break;
    }
    
    return enhancedQuery;
  }

  // Method to get learning insights
  getLearningInsights() {
    return {
      intentPatterns: this.intentPatterns,
      platformPreferences: this.platformPreferences,
      optimizationTrends: this.optimizationTrends
    };
  }

  // Method to reset learning data
  resetLearningData(): void {
    this.intentPatterns = {};
    this.platformPreferences = {};
    this.optimizationTrends = {};
  }
} 