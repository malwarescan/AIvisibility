// Enhanced Authority Scorer with Temporal Learning and Feedback
// Extends base AuthorityScorer with advanced learning capabilities

import { AuthorityScorer, AuthorityScore, PlatformScores } from './AuthorityScorer';
import { TemporalWeightModifier } from './TemporalWeightModifier';
import { PlatformFeedbackEngine, FeedbackData } from './PlatformFeedbackEngine';
import { WebsiteData } from '../crawler/WebCrawler';

export class EnhancedAuthorityScorer extends AuthorityScorer {
  private temporalModifier: TemporalWeightModifier;
  private feedbackEngine: PlatformFeedbackEngine;

  constructor() {
    super();
    this.temporalModifier = new TemporalWeightModifier();
    this.feedbackEngine = new PlatformFeedbackEngine();
  }

  /**
   * Calculate overall authority with temporal and feedback enhancements
   */
  calculateOverallAuthority(websiteData: WebsiteData): AuthorityScore {
    const baseScore = super.calculateOverallAuthority(websiteData);
    const contentAge = this.calculateContentAge(websiteData.content);
    
    // Apply temporal adjustments to overall score
    const temporalAdjustedScore = this.applyTemporalAdjustments(baseScore, contentAge);
    
    // Apply feedback enhancements
    const enhancedScore = this.applyFeedbackEnhancements(temporalAdjustedScore, contentAge);
    
    return enhancedScore;
  }

  /**
   * Calculate content age from last modified date
   */
  private calculateContentAge(content: any): number {
    const lastModified = content.lastModified || content.publishedDate || new Date();
    return this.temporalModifier.calculateContentAge(lastModified);
  }

  /**
   * Apply temporal adjustments to overall score
   */
  private applyTemporalAdjustments(baseScore: AuthorityScore, contentAge: number): AuthorityScore {
    // Apply temporal adjustment to overall score
    const temporalAdjustment = this.temporalModifier.getPlatformTemporalAdjustment('ChatGPT', contentAge); // Use ChatGPT as default
    const adjustedOverall = this.temporalModifier.adjustForRecency(baseScore.overall, contentAge, 'ChatGPT');
    
    return {
      ...baseScore,
      overall: Math.round(adjustedOverall),
      factors: [...baseScore.factors, `Temporal adjustment: ${(temporalAdjustment * 100).toFixed(1)}%`]
    };
  }

  /**
   * Apply feedback enhancements to scores
   */
  private applyFeedbackEnhancements(baseScore: AuthorityScore, contentAge: number): AuthorityScore {
    // Get enhanced factors for the primary platform (ChatGPT)
    const enhancedFactors = this.feedbackEngine.getEnhancedPlatformFactors('ChatGPT');
    
    // Calculate improvement based on enhanced factors
    const baseFactors = this.getBasePlatformFactors('ChatGPT');
    const factorImprovement = Object.entries(enhancedFactors).reduce((total, [key, enhancedValue]) => {
      const baseValue = baseFactors[key] || 0;
      return total + (enhancedValue - baseValue);
    }, 0);

    // Apply improvement to overall score
    const improvement = Math.min(0.2, Math.max(-0.1, factorImprovement)); // Cap improvement at ±20%
    const enhancedOverall = Math.round(baseScore.overall * (1 + improvement));

    return {
      ...baseScore,
      overall: Math.max(0, Math.min(100, enhancedOverall)),
      factors: [...baseScore.factors, `Feedback enhanced: ${(improvement * 100).toFixed(1)}%`]
    };
  }

  /**
   * Get base platform factors for comparison
   */
  private getBasePlatformFactors(platform: string): Record<string, number> {
    const factors: Record<string, Record<string, number>> = {
      'ChatGPT': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Claude': { contentQuality: 0.35, authority: 0.3, citations: 0.2, schema: 0.15 },
      'Perplexity': { contentQuality: 0.25, authority: 0.2, citations: 0.35, schema: 0.2 },
      'Google AI': { contentQuality: 0.2, authority: 0.3, citations: 0.2, schema: 0.3 }
    };
    return factors[platform] || factors['ChatGPT'];
  }

  /**
   * Generate enhanced platform scores with learning
   */
  generatePlatformScores(authorityScore: AuthorityScore, websiteData: WebsiteData): PlatformScores {
    const basePlatformScores = super.generatePlatformScores(authorityScore, websiteData);
    const contentAge = this.calculateContentAge(websiteData.content);
    
    // Apply temporal and feedback enhancements to each platform
    const enhancedScores: PlatformScores = {
      chatgpt: this.enhancePlatformScore(basePlatformScores.chatgpt, 'ChatGPT', contentAge),
      claude: this.enhancePlatformScore(basePlatformScores.claude, 'Claude', contentAge),
      perplexity: this.enhancePlatformScore(basePlatformScores.perplexity, 'Perplexity', contentAge),
      googleAI: this.enhancePlatformScore(basePlatformScores.googleAI, 'Google AI', contentAge)
    };
    
    return enhancedScores;
  }

  /**
   * Enhance individual platform score with temporal and feedback learning
   */
  private enhancePlatformScore(baseScore: any, platform: string, contentAge: number): any {
    // Apply temporal adjustment
    const temporalAdjustment = this.temporalModifier.getPlatformTemporalAdjustment(platform, contentAge);
    const temporalAdjustedScore = this.temporalModifier.adjustForRecency(baseScore.score, contentAge, platform);
    
    // Apply feedback enhancement
    const enhancedFactors = this.feedbackEngine.getEnhancedPlatformFactors(platform);
    const baseFactors = this.getBasePlatformFactors(platform);
    const factorImprovement = Object.entries(enhancedFactors).reduce((total, [key, enhancedValue]) => {
      const baseValue = baseFactors[key] || 0;
      return total + (enhancedValue - baseValue);
    }, 0);
    
    const improvement = Math.min(0.2, Math.max(-0.1, factorImprovement));
    const finalScore = Math.round(temporalAdjustedScore * (1 + improvement));
    
    return {
      score: Math.max(0, Math.min(100, finalScore)),
      factors: [
        ...baseScore.factors,
        `Temporal adjustment: ${(temporalAdjustment * 100).toFixed(1)}%`,
        `Feedback enhanced: ${(improvement * 100).toFixed(1)}%`
      ]
    };
  }

  /**
   * Record feedback for learning
   */
  recordFeedback(feedback: FeedbackData): void {
    this.feedbackEngine.recordFeedback(feedback);
  }

  /**
   * Get learning metrics
   */
  getLearningMetrics() {
    return this.feedbackEngine.getLearningMetrics();
  }

  /**
   * Get temporal data for analysis
   */
  getTemporalData(url: string) {
    return this.temporalModifier.getTemporalData(url);
  }

  /**
   * Get platform recency sensitivities
   */
  getPlatformRecencySensitivities() {
    return this.temporalModifier.getAllPlatformRecencySensitivities();
  }

  /**
   * Update platform recency sensitivity (for learning)
   */
  updatePlatformRecencySensitivity(platform: string, newSensitivity: number): void {
    this.temporalModifier.updatePlatformRecencySensitivity(platform, newSensitivity);
  }

  /**
   * Track performance delta for temporal learning
   */
  trackPerformanceDelta(url: string, platform: string, oldScore: number, newScore: number, contentAge: number): void {
    this.temporalModifier.trackPerformanceDelta(url, platform, oldScore, newScore, contentAge);
  }

  /**
   * Get enhanced platform factors with learning
   */
  getEnhancedPlatformFactors(platform: string): Record<string, number> {
    return this.feedbackEngine.getEnhancedPlatformFactors(platform);
  }

  /**
   * Reset learning for a platform (for testing)
   */
  resetPlatformLearning(platform: string): void {
    this.feedbackEngine.resetPlatformLearning(platform);
  }

  /**
   * Set learning rate
   */
  setLearningRate(rate: number): void {
    this.feedbackEngine.setLearningRate(rate);
  }

  /**
   * Set minimum data points for weight adjustment
   */
  setMinDataPoints(points: number): void {
    this.feedbackEngine.setMinDataPoints(points);
  }
} 