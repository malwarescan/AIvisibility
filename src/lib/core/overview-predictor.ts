import { SchemaScoreTracker, SchemaScore } from '../analysis/SchemaScoreTracker';

export interface OverviewPrediction {
  probability: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
  competitors: Array<{
    domain: string;
    probability: number;
    factors: string[];
  }>;
  eligibility: {
    hasFAQ: boolean;
    hasSchema: boolean;
    hasAuthority: boolean;
    hasComprehensiveContent: boolean;
  };
  schemaOptimization?: {
    aiOptimizationScore: number;
    qualityScore: number;
    completenessScore: number;
    validationStatus: 'valid' | 'invalid' | 'unknown';
    platformScores: {
      chatgpt: number;
      claude: number;
      perplexity: number;
      google: number;
    };
    impact: number; // How much schema optimization affects overall probability
    recommendations: string[]; // Schema-specific optimization suggestions
    historicalTrend?: {
      trend: 'improving' | 'declining' | 'stable';
      changePercent: number;
      lastUpdated: string;
      scoreHistory: Array<{
        timestamp: string;
        aiOptimizationScore: number;
        qualityScore: number;
        completenessScore: number;
      }>;
    };
  };
}

export interface OverviewAnalysis {
  prediction: OverviewPrediction;
  serpAnalysis: any; // From SERP library
  schemaAnalysis: any; // From Schema library
  contentAnalysis: {
    wordCount: number;
    sections: string[];
    hasFAQ: boolean;
    hasHowTo: boolean;
    hasDefinitions: boolean;
  };
}

export class OverviewPredictor {
  private static schemaTracker = new SchemaScoreTracker();

  /**
   * Predict AI Overview potential for a given URL or query
   */
  static async predictOverview(
    url?: string,
    query?: string,
    options: {
      includeCompetitors?: boolean;
      includeContentAnalysis?: boolean;
      includeSchemaOptimization?: boolean;
    } = {}
  ): Promise<OverviewAnalysis> {
    const { 
      includeCompetitors = true, 
      includeContentAnalysis = true,
      includeSchemaOptimization = true 
    } = options;

    // Fetch Schema Optimizer data if URL is provided and integration is enabled
    let schemaOptimizerData = null;
    if (url && includeSchemaOptimization) {
      schemaOptimizerData = await this.fetchSchemaOptimizerData(url);
      
      // Log schema score for historical tracking
      if (schemaOptimizerData) {
        await this.logSchemaScoreForTracking(url, schemaOptimizerData);
      }
    }

    // Calculate base probability
    let baseProbability = this.calculateBaseProbability(url, query);
    
    // Apply Schema Optimizer impact if available
    let schemaImpact = 0;
    if (schemaOptimizerData) {
      schemaImpact = this.calculateSchemaImpact(schemaOptimizerData);
      baseProbability = Math.min(0.95, baseProbability + schemaImpact);
    }

    // Get historical trend data if available
    let historicalTrend = null;
    if (url) {
      historicalTrend = await this.schemaTracker.calculateTrend(url, 30);
    }

    const factors = this.identifyFactors(url, query);
    const recommendations = this.generateRecommendations(factors);

    // Add Schema Optimizer specific recommendations
    if (schemaOptimizerData) {
      if (schemaOptimizerData.aiOptimizationScore < 80) {
        recommendations.push('Improve schema AI optimization score for better AI Overview visibility');
      }
      if (schemaOptimizerData.qualityScore < 80) {
        recommendations.push('Enhance schema quality for improved AI consumption');
      }
      if (!schemaOptimizerData.validation?.isValid) {
        recommendations.push('Fix schema validation errors to ensure AI compatibility');
      }
    }

    // Add historical trend recommendations
    if (historicalTrend) {
      if (historicalTrend.trend === 'declining') {
        recommendations.push('Schema optimization is declining - review recent changes and implement improvements');
      } else if (historicalTrend.trend === 'improving') {
        recommendations.push('Schema optimization is improving - continue current optimization strategy');
      }
    }

    const prediction: OverviewPrediction = {
      probability: baseProbability,
      confidence: this.calculateConfidence(factors),
      factors,
      recommendations,
      competitors: includeCompetitors ? await this.analyzeCompetitors(query || '') : [],
      eligibility: {
        hasFAQ: factors.includes('FAQ content'),
        hasSchema: factors.includes('Schema markup'),
        hasAuthority: factors.includes('Authority signals'),
        hasComprehensiveContent: factors.includes('Comprehensive content')
      },
      schemaOptimization: schemaOptimizerData ? {
        aiOptimizationScore: schemaOptimizerData.aiOptimizationScore || 75,
        qualityScore: schemaOptimizerData.qualityScore || 75,
        completenessScore: schemaOptimizerData.completenessScore || 75,
        validationStatus: schemaOptimizerData.validation?.isValid ? 'valid' : 'invalid',
        platformScores: schemaOptimizerData.aiOptimization || {
          chatgpt: 75,
          claude: 75,
          perplexity: 75,
          google: 75
        },
        impact: schemaImpact,
        recommendations: schemaOptimizerData.recommendations || [],
        historicalTrend: historicalTrend ? {
          trend: historicalTrend.trend,
          changePercent: historicalTrend.changePercent,
          lastUpdated: historicalTrend.lastUpdated.toISOString(),
          scoreHistory: historicalTrend.scoreHistory.map(score => ({
            timestamp: score.timestamp.toISOString(),
            aiOptimizationScore: score.aiOptimizationScore,
            qualityScore: score.qualityScore,
            completenessScore: score.completenessScore
          }))
        } : undefined
      } : undefined
    };

    return {
      prediction,
      serpAnalysis: await this.analyzeSERP(query || ''),
      schemaAnalysis: url ? await this.analyzeSchema(url) : null,
      contentAnalysis: includeContentAnalysis ? this.analyzeContent(url || '') : null
    };
  }

  /**
   * Calculate base probability for AI Overview
   */
  private static calculateBaseProbability(url?: string, query?: string): number {
    let probability = 0.3; // Base probability

    // URL-based factors
    if (url) {
      if (url.includes('how-to') || url.includes('guide')) probability += 0.2;
      if (url.includes('faq') || url.includes('questions')) probability += 0.15;
      if (url.includes('what-is') || url.includes('definition')) probability += 0.1;
    }

    // Query-based factors
    if (query) {
      const queryLower = query.toLowerCase();
      if (queryLower.includes('how to') || queryLower.includes('guide')) probability += 0.2;
      if (queryLower.includes('what is') || queryLower.includes('definition')) probability += 0.15;
      if (queryLower.includes('best') || queryLower.includes('top')) probability += 0.1;
    }

    return Math.min(probability, 0.95); // Cap at 95%
  }

  /**
   * Identify factors that contribute to AI Overview potential
   */
  private static identifyFactors(url?: string, query?: string): string[] {
    const factors: string[] = [];

    // Content type factors
    if (url?.includes('faq') || query?.toLowerCase().includes('faq')) {
      factors.push('FAQ content');
    }

    if (url?.includes('how-to') || query?.toLowerCase().includes('how to')) {
      factors.push('How-to content');
    }

    if (url?.includes('what-is') || query?.toLowerCase().includes('what is')) {
      factors.push('Definition content');
    }

    // Technical factors (simulated)
    factors.push('Schema markup');
    factors.push('Authority signals');
    factors.push('Comprehensive content');
    factors.push('User intent matching');

    return factors;
  }

  /**
   * Generate recommendations based on identified factors
   */
  private static generateRecommendations(factors: string[]): string[] {
    const recommendations: string[] = [];

    if (!factors.includes('FAQ content')) {
      recommendations.push('Add FAQ sections to address common questions');
    }

    if (!factors.includes('Schema markup')) {
      recommendations.push('Implement FAQ and HowTo schema markup');
    }

    if (!factors.includes('Comprehensive content')) {
      recommendations.push('Expand content to cover all aspects of the topic');
    }

    recommendations.push('Optimize for conversational queries');
    recommendations.push('Include step-by-step instructions where applicable');

    return recommendations;
  }

  /**
   * Calculate confidence level based on available factors
   */
  private static calculateConfidence(factors: string[]): number {
    const baseConfidence = 0.6;
    const factorBonus = factors.length * 0.05;
    return Math.min(baseConfidence + factorBonus, 0.95);
  }

  /**
   * Analyze competitors for the same query
   */
  private static async analyzeCompetitors(query: string): Promise<Array<{ domain: string; probability: number; factors: string[] }>> {
    // Simulate competitor analysis
    const competitors = [
      { domain: 'competitor1.com', probability: 0.68, factors: ['FAQ content', 'Schema markup'] },
      { domain: 'competitor2.com', probability: 0.72, factors: ['Comprehensive content', 'Authority signals'] },
      { domain: 'competitor3.com', probability: 0.65, factors: ['How-to content', 'User intent matching'] }
    ];

    return competitors;
  }

  /**
   * Analyze SERP for the query
   */
  private static async analyzeSERP(query: string): Promise<any> {
    // This would integrate with the SERP library
    return {
      totalResults: 1000000,
      hasRichResults: true,
      richResultTypes: ['FAQ', 'HowTo', 'Featured Snippet']
    };
  }

  /**
   * Analyze schema for the URL
   */
  private static async analyzeSchema(url: string): Promise<any> {
    // This would integrate with the Schema library
    return {
      hasFAQ: true,
      hasHowTo: false,
      hasArticle: true,
      schemaTypes: ['FAQPage', 'Article']
    };
  }

  /**
   * Analyze content structure
   */
  private static analyzeContent(url: string): any {
    // Simulate content analysis
    return {
      wordCount: 2500,
      sections: ['Introduction', 'FAQ', 'How-to', 'Conclusion'],
      hasFAQ: true,
      hasHowTo: true,
      hasDefinitions: true
    };
  }

  /**
   * Fetch Schema Optimizer data for a URL
   */
  private static async fetchSchemaOptimizerData(url: string): Promise<any> {
    try {
      const response = await fetch('/api/schema-optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'analyze',
          url: url,
          options: { 
            includeHistorical: true,
            includePlatformScores: true,
            includeValidation: true
          }
        })
      });

      if (!response.ok) {
        console.warn('Schema Optimizer API not available, using fallback data');
        return null;
      }

      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.warn('Schema Optimizer integration failed:', error);
      return null;
    }
  }

  /**
   * Log schema score for historical tracking
   */
  private static async logSchemaScoreForTracking(url: string, schemaData: any): Promise<void> {
    try {
      const score: SchemaScore = {
        url,
        timestamp: new Date(),
        aiOptimizationScore: schemaData.aiOptimizationScore || 75,
        qualityScore: schemaData.qualityScore || 75,
        completenessScore: schemaData.completenessScore || 75,
        validationStatus: schemaData.validation?.isValid ? 'valid' : 'invalid',
        platformScores: schemaData.aiOptimization || {
          chatgpt: 75,
          claude: 75,
          perplexity: 75,
          google: 75
        },
        impact: this.calculateSchemaImpact(schemaData),
        metadata: {
          schemaTypes: schemaData.schemaTypes || [],
          validationErrors: schemaData.validation?.errors || [],
          recommendations: schemaData.recommendations || []
        }
      };

      await this.schemaTracker.logSchemaScore(score);
    } catch (error) {
      console.warn('Failed to log schema score for tracking:', error);
    }
  }

  /**
   * Calculate schema optimization impact on AI Overview probability
   */
  private static calculateSchemaImpact(schemaData: any): number {
    if (!schemaData) return 0;

    const aiOptimizationScore = schemaData.aiOptimizationScore || 75;
    const qualityScore = schemaData.qualityScore || 75;
    const completenessScore = schemaData.completenessScore || 75;
    const validation = schemaData.validation?.isValid ? 1 : 0;
    
    // Get platform-specific scores
    const platformScores = schemaData.aiOptimization || {};
    const avgPlatformScore = Object.values(platformScores).reduce((sum: number, score: any) => sum + (score || 75), 0) / Math.max(1, Object.keys(platformScores).length);
    
    // Calculate historical trend impact if available
    const historicalBoost = this.calculateHistoricalBoost(schemaData.historicalData);
    
    // Enhanced weighted impact calculation (0-0.35 range, max 35% boost)
    const baseImpact = (
      (aiOptimizationScore * 0.35) +    // AI optimization is most important
      (qualityScore * 0.25) +           // Quality matters for AI consumption
      (completenessScore * 0.20) +      // Completeness helps AI understanding
      (avgPlatformScore * 0.15) +       // Platform-specific optimization
      (validation * 0.05)               // Valid schema is required
    ) / 100 * 0.35; // Scale to 0-0.35 range
    
    // Add historical trend boost
    const totalImpact = Math.min(0.35, Math.max(0, baseImpact + historicalBoost));
    
    return totalImpact;
  }

  /**
   * Calculate historical trend boost based on schema optimization history
   */
  private static calculateHistoricalBoost(historicalData: any): number {
    if (!historicalData || !historicalData.trend) return 0;
    
    const trend = historicalData.trend;
    const changePercent = historicalData.changePercent || 0;
    
    // Positive trend boost (max 0.05 or 5%)
    if (trend === 'improving' && changePercent > 0) {
      return Math.min(0.05, changePercent / 100 * 0.1);
    }
    
    // Negative trend penalty (max -0.03 or -3%)
    if (trend === 'declining' && changePercent < 0) {
      return Math.max(-0.03, changePercent / 100 * 0.05);
    }
    
    return 0; // Stable trend
  }

  /**
   * Get required factors for AI Overview eligibility
   */
  static getRequiredFactors(): string[] {
    return [
      'FAQ content',
      'Schema markup',
      'Authority signals',
      'Comprehensive content',
      'User intent matching'
    ];
  }

  /**
   * Validate if content meets AI Overview requirements
   */
  static validateEligibility(factors: string[]): {
    eligible: boolean;
    missingFactors: string[];
    score: number;
  } {
    const requiredFactors = this.getRequiredFactors();
    const missingFactors = requiredFactors.filter(factor => !factors.includes(factor));
    const score = ((requiredFactors.length - missingFactors.length) / requiredFactors.length) * 100;

    return {
      eligible: missingFactors.length === 0,
      missingFactors,
      score: Math.round(score)
    };
  }
}

export function isValidOverviewPrediction(obj: any): obj is OverviewPrediction {
  return (
    obj &&
    typeof obj.probability === 'number' &&
    typeof obj.confidence === 'number' &&
    Array.isArray(obj.factors) &&
    Array.isArray(obj.recommendations) &&
    obj.eligibility &&
    typeof obj.eligibility.hasFAQ === 'boolean'
  );
}

export function suggestOverviewImprovements(prediction: OverviewPrediction): string[] {
  const improvements: string[] = [];

  if (prediction.probability < 0.7) {
    improvements.push('Focus on FAQ content creation');
    improvements.push('Implement comprehensive schema markup');
  }

  if (prediction.confidence < 0.8) {
    improvements.push('Gather more data points for analysis');
    improvements.push('Improve content comprehensiveness');
  }

  if (prediction.factors.length < 4) {
    improvements.push('Add missing content types (FAQ, How-to, Definitions)');
  }

  return improvements;
} 