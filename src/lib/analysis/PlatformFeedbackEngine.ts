// Feedback Loop for Agentic Refinement
// Handles learning from platform outcomes and adjusting weights based on performance

export interface FeedbackData {
  platform: string;
  url: string;
  timestamp: Date;
  beforeScore: number;
  afterScore: number;
  changes: OptimizationChange[];
  outcome: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface OptimizationChange {
  type: 'schema' | 'content' | 'technical' | 'aiOptimization';
  description: string;
  impact: number; // -1 to 1 scale
  applied: boolean;
}

export class PlatformFeedbackEngine {
  private feedbackHistory: FeedbackData[] = [];
  private platformWeights: Map<string, Record<string, number>> = new Map();
  private learningRate = 0.1; // 10% learning rate
  private minDataPoints = 5; // Minimum data points before adjusting weights

  /**
   * Record feedback from platform outcomes
   */
  recordFeedback(feedback: FeedbackData): void {
    this.feedbackHistory.push(feedback);
    this.analyzeFeedbackPatterns();
  }

  /**
   * Analyze feedback patterns to identify successful strategies
   */
  private analyzeFeedbackPatterns(): void {
    const platformGroups = this.groupFeedbackByPlatform();
    
    platformGroups.forEach((feedbacks, platform) => {
      if (feedbacks.length >= this.minDataPoints) {
        const successfulStrategies = this.identifySuccessfulStrategies(feedbacks);
        this.updatePlatformWeights(platform, successfulStrategies);
      }
    });
  }

  /**
   * Group feedback by platform for analysis
   */
  private groupFeedbackByPlatform(): Map<string, FeedbackData[]> {
    const groups = new Map<string, FeedbackData[]>();
    
    this.feedbackHistory.forEach(feedback => {
      if (!groups.has(feedback.platform)) {
        groups.set(feedback.platform, []);
      }
      groups.get(feedback.platform)!.push(feedback);
    });
    
    return groups;
  }

  /**
   * Identify strategies that consistently improve performance
   */
  private identifySuccessfulStrategies(feedbacks: FeedbackData[]): Record<string, number> {
    const strategyImpact: Record<string, number[]> = {};
    
    feedbacks.forEach(feedback => {
      feedback.changes.forEach(change => {
        if (!strategyImpact[change.type]) {
          strategyImpact[change.type] = [];
        }
        strategyImpact[change.type].push(change.impact);
      });
    });

    // Calculate average impact for each strategy
    const averageImpact: Record<string, number> = {};
    Object.entries(strategyImpact).forEach(([strategy, impacts]) => {
      const avgImpact = impacts.reduce((sum, impact) => sum + impact, 0) / impacts.length;
      averageImpact[strategy] = avgImpact;
    });

    return averageImpact;
  }

  /**
   * Update platform-specific weights based on feedback
   */
  private updatePlatformWeights(platform: string, successfulStrategies: Record<string, number>): void {
    const currentWeights = this.platformWeights.get(platform) || this.getDefaultWeights();
    const updatedWeights = { ...currentWeights };

    Object.entries(successfulStrategies).forEach(([strategy, impact]) => {
      if (impact > 0.1) { // Only adjust if impact is significantly positive
        const weightKey = this.mapStrategyToWeight(strategy);
        if (weightKey && updatedWeights[weightKey] !== undefined) {
          // Increase weight for successful strategies
          updatedWeights[weightKey] = Math.min(1, updatedWeights[weightKey] + (impact * this.learningRate));
          
          // Decrease other weights proportionally to maintain total weight
          this.rebalanceWeights(updatedWeights, weightKey, impact * this.learningRate);
        }
      }
    });

    this.platformWeights.set(platform, updatedWeights);
    console.log(`Updated weights for ${platform}:`, updatedWeights);
  }

  /**
   * Get enhanced platform factors with feedback learning
   */
  getEnhancedPlatformFactors(platform: string): Record<string, number> {
    const baseFactors = this.getBasePlatformFactors(platform);
    const learnedWeights = this.platformWeights.get(platform);
    
    if (learnedWeights) {
      // Apply learned weights to base factors
      return Object.entries(baseFactors).reduce((enhanced, [key, value]) => {
        const learnedWeight = learnedWeights[key] || 1;
        enhanced[key] = value * learnedWeight;
        return enhanced;
      }, {} as Record<string, number>);
    }
    
    return baseFactors;
  }

  /**
   * Map strategy types to weight keys
   */
  private mapStrategyToWeight(strategy: string): string | null {
    const mapping: Record<string, string> = {
      'schema': 'schema',
      'content': 'contentQuality',
      'technical': 'technical',
      'aiOptimization': 'aiOptimization'
    };
    return mapping[strategy] || null;
  }

  /**
   * Rebalance weights to maintain total weight
   */
  private rebalanceWeights(weights: Record<string, number>, increasedKey: string, increaseAmount: number): void {
    const otherKeys = Object.keys(weights).filter(key => key !== increasedKey);
    const decreasePerKey = increaseAmount / otherKeys.length;
    
    otherKeys.forEach(key => {
      weights[key] = Math.max(0.1, weights[key] - decreasePerKey);
    });
  }

  /**
   * Get default platform weights
   */
  private getDefaultWeights(): Record<string, number> {
    return {
      contentQuality: 0.3,
      authority: 0.25,
      citations: 0.25,
      schema: 0.2
    };
  }

  /**
   * Get base platform factors (original algorithm)
   */
  private getBasePlatformFactors(platform: string): Record<string, number> {
    const factors: Record<string, Record<string, number>> = {
      'ChatGPT': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Claude': { contentQuality: 0.35, authority: 0.3, citations: 0.2, schema: 0.15 },
      'Perplexity': { contentQuality: 0.25, authority: 0.2, citations: 0.35, schema: 0.2 },
      'Google AI': { contentQuality: 0.2, authority: 0.3, citations: 0.2, schema: 0.3 },
      'Bard': { contentQuality: 0.25, authority: 0.25, citations: 0.25, schema: 0.25 },
      'Bing AI': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Anthropic Claude': { contentQuality: 0.35, authority: 0.3, citations: 0.2, schema: 0.15 },
      'OpenAI GPT-4': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Cohere': { contentQuality: 0.25, authority: 0.2, citations: 0.35, schema: 0.2 },
      'Hugging Face': { contentQuality: 0.2, authority: 0.2, citations: 0.2, schema: 0.4 }
    };
    return factors[platform] || factors['ChatGPT'];
  }

  /**
   * Get feedback history for analysis
   */
  getFeedbackHistory(platform?: string): FeedbackData[] {
    if (platform) {
      return this.feedbackHistory.filter(feedback => feedback.platform === platform);
    }
    return [...this.feedbackHistory];
  }

  /**
   * Get platform weights for analysis
   */
  getPlatformWeights(platform: string): Record<string, number> {
    return this.platformWeights.get(platform) || this.getDefaultWeights();
  }

  /**
   * Get learning metrics
   */
  getLearningMetrics(): {
    totalFeedback: number;
    platformsWithData: string[];
    averageImprovement: number;
    successfulStrategies: Record<string, number>;
  } {
    const totalFeedback = this.feedbackHistory.length;
    const platformsWithData = [...new Set(this.feedbackHistory.map(f => f.platform))];
    
    const improvements = this.feedbackHistory
      .filter(f => f.outcome === 'positive')
      .map(f => f.afterScore - f.beforeScore);
    
    const averageImprovement = improvements.length > 0 
      ? improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length 
      : 0;

    const successfulStrategies = this.identifySuccessfulStrategies(this.feedbackHistory);

    return {
      totalFeedback,
      platformsWithData,
      averageImprovement,
      successfulStrategies
    };
  }

  /**
   * Reset learning for a platform (for testing)
   */
  resetPlatformLearning(platform: string): void {
    this.platformWeights.delete(platform);
    this.feedbackHistory = this.feedbackHistory.filter(f => f.platform !== platform);
  }

  /**
   * Update learning rate
   */
  setLearningRate(rate: number): void {
    this.learningRate = Math.max(0.01, Math.min(0.5, rate));
  }

  /**
   * Set minimum data points for weight adjustment
   */
  setMinDataPoints(points: number): void {
    this.minDataPoints = Math.max(1, points);
  }
} 