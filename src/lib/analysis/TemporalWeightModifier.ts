// Temporal Behavior Learning System
// Handles content age-based scoring adjustments and platform-specific recency sensitivity

export interface TemporalMetrics {
  platform: string;
  contentAge: number; // days
  lastUpdate: Date;
  performanceDelta: number;
  recencySensitivity: number; // 0-1 scale
  temporalWeight: number;
}

export class TemporalWeightModifier {
  private temporalData: Map<string, TemporalMetrics[]> = new Map();
  private platformRecencySensitivity: Record<string, number> = {
    'Perplexity': 0.9,    // Highly recency-sensitive
    'ChatGPT': 0.7,       // Moderately recency-sensitive
    'Claude': 0.5,        // Less recency-sensitive
    'Google AI': 0.8,     // Highly recency-sensitive
    'Bard': 0.6,          // Moderately recency-sensitive
    'Bing AI': 0.7,       // Moderately recency-sensitive
    'Anthropic Claude': 0.5, // Less recency-sensitive
    'OpenAI GPT-4': 0.7,  // Moderately recency-sensitive
    'Cohere': 0.8,        // Highly recency-sensitive
    'Hugging Face': 0.6   // Moderately recency-sensitive
  };

  /**
   * Adjust scores based on content recency and platform sensitivity
   */
  adjustForRecency(baseScore: number, contentAge: number, platform: string): number {
    const recencySensitivity = this.platformRecencySensitivity[platform] || 0.7;
    const maxDegradation = 0.3; // Maximum 30% degradation
    const degradationPeriod = 180; // 6 months
    
    // Calculate degradation factor
    const ageFactor = Math.min(contentAge / degradationPeriod, 1);
    const degradationFactor = ageFactor * maxDegradation * recencySensitivity;
    
    // Apply temporal adjustment
    const adjustedScore = baseScore * (1 - degradationFactor);
    
    // Log temporal adjustment for analysis
    this.logTemporalAdjustment(platform, contentAge, baseScore, adjustedScore, degradationFactor);
    
    return Math.max(adjustedScore, baseScore * 0.7); // Minimum 70% of original score
  }

  /**
   * Track performance deltas for content re-crawls
   */
  trackPerformanceDelta(url: string, platform: string, oldScore: number, newScore: number, contentAge: number): void {
    const delta = newScore - oldScore;
    const temporalMetrics: TemporalMetrics = {
      platform,
      contentAge,
      lastUpdate: new Date(),
      performanceDelta: delta,
      recencySensitivity: this.platformRecencySensitivity[platform],
      temporalWeight: this.calculateTemporalWeight(delta, contentAge, platform)
    };

    if (!this.temporalData.has(url)) {
      this.temporalData.set(url, []);
    }
    this.temporalData.get(url)!.push(temporalMetrics);
  }

  /**
   * Calculate temporal weight based on performance delta and content age
   */
  private calculateTemporalWeight(delta: number, contentAge: number, platform: string): number {
    const baseWeight = 1.0;
    const deltaMultiplier = delta > 0 ? 1.1 : 0.9; // Boost positive deltas
    const ageMultiplier = Math.max(0.8, 1 - (contentAge / 365)); // Age-based degradation
    
    return baseWeight * deltaMultiplier * ageMultiplier;
  }

  /**
   * Get platform-specific temporal adjustments
   */
  getPlatformTemporalAdjustment(platform: string, contentAge: number): number {
    const sensitivity = this.platformRecencySensitivity[platform];
    const ageFactor = Math.min(contentAge / 180, 1);
    return 1 - (ageFactor * 0.3 * sensitivity);
  }

  /**
   * Get temporal data for analysis
   */
  getTemporalData(url: string): TemporalMetrics[] {
    return this.temporalData.get(url) || [];
  }

  /**
   * Get platform recency sensitivity
   */
  getPlatformRecencySensitivity(platform: string): number {
    return this.platformRecencySensitivity[platform] || 0.7;
  }

  /**
   * Calculate content age from last modified date
   */
  calculateContentAge(lastModified: Date | string | null): number {
    if (!lastModified) return 0;
    
    const lastModifiedDate = typeof lastModified === 'string' ? new Date(lastModified) : lastModified;
    const now = new Date();
    return Math.floor((now.getTime() - lastModifiedDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Get all platform recency sensitivities
   */
  getAllPlatformRecencySensitivities(): Record<string, number> {
    return { ...this.platformRecencySensitivity };
  }

  /**
   * Update platform recency sensitivity (for learning)
   */
  updatePlatformRecencySensitivity(platform: string, newSensitivity: number): void {
    this.platformRecencySensitivity[platform] = Math.max(0, Math.min(1, newSensitivity));
  }

  private logTemporalAdjustment(platform: string, contentAge: number, baseScore: number, adjustedScore: number, degradationFactor: number): void {
    console.log(`🕒 Temporal Adjustment - Platform: ${platform}, Age: ${contentAge}d, Base: ${baseScore.toFixed(1)}, Adjusted: ${adjustedScore.toFixed(1)}, Degradation: ${(degradationFactor * 100).toFixed(1)}%`);
  }
} 