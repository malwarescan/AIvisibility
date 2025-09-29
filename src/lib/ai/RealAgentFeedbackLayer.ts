// Real Agent Feedback Layer (RAF Layer)
// Feeds real LLM outputs back into the scoring system for dynamic recalibration

import OpenAIService from './OpenAIService';

export interface RealAgentInteraction {
  platform: string;
  query: string;
  result: string;
  sourceUsed: boolean;
  sourceUrl?: string;
  citationStyle: 'inline' | 'footnote' | 'link' | 'none';
  snippetIncluded: boolean;
  answerUsagePattern: 'direct' | 'paraphrased' | 'referenced' | 'ignored';
  confidence: number;
  timestamp: Date;
  responseTime: number;
  tokenUsage: number;
}

export interface FeedbackMetrics {
  citationFrequency: number;
  snippetInclusionRate: number;
  answerUsageRate: number;
  confidenceDrift: number;
  responseTimeTrend: number;
  accuracyScore: number;
}

export interface RecalibrationWeights {
  citationWeight: number;
  snippetWeight: number;
  authorityWeight: number;
  freshnessWeight: number;
  structureWeight: number;
  lastUpdated: Date;
}

export class RealAgentFeedbackLayer {
  private interactions: RealAgentInteraction[] = [];
  private feedbackMetrics: Map<string, FeedbackMetrics> = new Map();
  private recalibrationWeights: RecalibrationWeights;
  private aiService: OpenAIService;

  constructor() {
    this.aiService = new OpenAIService();
    this.recalibrationWeights = {
      citationWeight: 0.25,
      snippetWeight: 0.20,
      authorityWeight: 0.30,
      freshnessWeight: 0.15,
      structureWeight: 0.10,
      lastUpdated: new Date()
    };
  }

  // Record a real agent interaction
  async recordInteraction(interaction: RealAgentInteraction): Promise<void> {
    this.interactions.push(interaction);
    
    // Update feedback metrics for the platform
    await this.updateFeedbackMetrics(interaction.platform);
    
    // Trigger recalibration if enough new data
    if (this.shouldRecalibrate(interaction.platform)) {
      await this.recalibrateWeights(interaction.platform);
    }
  }

  // Analyze real agent behavior patterns
  private async updateFeedbackMetrics(platform: string): Promise<void> {
    const platformInteractions = this.interactions.filter(i => i.platform === platform);
    
    if (platformInteractions.length < 5) return; // Need minimum data

    const recentInteractions = platformInteractions.slice(-20); // Last 20 interactions
    
    const metrics: FeedbackMetrics = {
      citationFrequency: this.calculateCitationFrequency(recentInteractions),
      snippetInclusionRate: this.calculateSnippetInclusionRate(recentInteractions),
      answerUsageRate: this.calculateAnswerUsageRate(recentInteractions),
      confidenceDrift: this.calculateConfidenceDrift(recentInteractions),
      responseTimeTrend: this.calculateResponseTimeTrend(recentInteractions),
      accuracyScore: await this.calculateAccuracyScore(recentInteractions)
    };

    this.feedbackMetrics.set(platform, metrics);
  }

  // Calculate citation frequency from real interactions
  private calculateCitationFrequency(interactions: RealAgentInteraction[]): number {
    const citedInteractions = interactions.filter(i => i.sourceUsed);
    return citedInteractions.length / interactions.length;
  }

  // Calculate snippet inclusion rate
  private calculateSnippetInclusionRate(interactions: RealAgentInteraction[]): number {
    const snippetInteractions = interactions.filter(i => i.snippetIncluded);
    return snippetInteractions.length / interactions.length;
  }

  // Calculate answer usage patterns
  private calculateAnswerUsageRate(interactions: RealAgentInteraction[]): number {
    const usedInteractions = interactions.filter(i => 
      i.answerUsagePattern === 'direct' || i.answerUsagePattern === 'paraphrased'
    );
    return usedInteractions.length / interactions.length;
  }

  // Calculate confidence drift over time
  private calculateConfidenceDrift(interactions: RealAgentInteraction[]): number {
    if (interactions.length < 2) return 0;
    
    const sortedInteractions = interactions.sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    const firstHalf = sortedInteractions.slice(0, Math.floor(sortedInteractions.length / 2));
    const secondHalf = sortedInteractions.slice(Math.floor(sortedInteractions.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, i) => sum + i.confidence, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, i) => sum + i.confidence, 0) / secondHalf.length;
    
    return secondAvg - firstAvg;
  }

  // Calculate response time trends
  private calculateResponseTimeTrend(interactions: RealAgentInteraction[]): number {
    if (interactions.length < 2) return 0;
    
    const sortedInteractions = interactions.sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    const firstHalf = sortedInteractions.slice(0, Math.floor(sortedInteractions.length / 2));
    const secondHalf = sortedInteractions.slice(Math.floor(sortedInteractions.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, i) => sum + i.responseTime, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, i) => sum + i.responseTime, 0) / secondHalf.length;
    
    return (secondAvg - firstAvg) / firstAvg; // Percentage change
  }

  // Use AI to calculate accuracy score
  private async calculateAccuracyScore(interactions: RealAgentInteraction[]): Promise<number> {
    try {
      const sampleInteractions = interactions.slice(-5); // Last 5 interactions
      const analysisPrompt = `
        Analyze these real agent interactions and rate their accuracy (0-100):
        ${sampleInteractions.map(i => `
          Platform: ${i.platform}
          Query: ${i.query}
          Result: ${i.result.substring(0, 200)}...
          Source Used: ${i.sourceUsed}
          Citation Style: ${i.citationStyle}
          Answer Usage: ${i.answerUsagePattern}
        `).join('\n')}
        
        Rate the overall accuracy of these interactions (0-100):
      `;
      
      const response = await this.aiService.analyzeText(analysisPrompt);
      const accuracyMatch = response.match(/(\d+)/);
      return accuracyMatch ? parseInt(accuracyMatch[1]) : 75;
    } catch (error) {
      console.warn('Accuracy calculation failed:', error);
      return 75; // Default fallback
    }
  }

  // Determine if recalibration is needed
  private shouldRecalibrate(platform: string): boolean {
    const platformInteractions = this.interactions.filter(i => i.platform === platform);
    const lastRecalibration = this.recalibrationWeights.lastUpdated;
    const hoursSinceLastUpdate = (Date.now() - lastRecalibration.getTime()) / (1000 * 60 * 60);
    
    return platformInteractions.length >= 10 && hoursSinceLastUpdate >= 1; // Recalibrate every hour with 10+ interactions
  }

  // Recalibrate scoring weights based on real feedback
  private async recalibrateWeights(platform: string): Promise<void> {
    const metrics = this.feedbackMetrics.get(platform);
    if (!metrics) return;

    try {
      const recalibrationPrompt = `
        Based on these real agent feedback metrics, suggest optimal scoring weights:
        
        Citation Frequency: ${(metrics.citationFrequency * 100).toFixed(1)}%
        Snippet Inclusion Rate: ${(metrics.snippetInclusionRate * 100).toFixed(1)}%
        Answer Usage Rate: ${(metrics.answerUsageRate * 100).toFixed(1)}%
        Confidence Drift: ${metrics.confidenceDrift.toFixed(3)}
        Response Time Trend: ${(metrics.responseTimeTrend * 100).toFixed(1)}%
        Accuracy Score: ${metrics.accuracyScore}/100
        
        Current weights:
        - Citation Weight: ${this.recalibrationWeights.citationWeight}
        - Snippet Weight: ${this.recalibrationWeights.snippetWeight}
        - Authority Weight: ${this.recalibrationWeights.authorityWeight}
        - Freshness Weight: ${this.recalibrationWeights.freshnessWeight}
        - Structure Weight: ${this.recalibrationWeights.structureWeight}
        
        Suggest new weights (0.0-1.0, must sum to 1.0) as JSON:
        {
          "citationWeight": 0.25,
          "snippetWeight": 0.20,
          "authorityWeight": 0.30,
          "freshnessWeight": 0.15,
          "structureWeight": 0.10
        }
      `;
      
      const response = await this.aiService.analyzeText(recalibrationPrompt);
      const weightsMatch = response.match(/\{[\s\S]*\}/);
      
      if (weightsMatch) {
        const newWeights = JSON.parse(weightsMatch[0]);
        this.recalibrationWeights = {
          ...newWeights,
          lastUpdated: new Date()
        };
        
        console.log('RAF Layer: Weights recalibrated based on real feedback');
      }
    } catch (error) {
      console.warn('RAF Layer: Recalibration failed:', error);
    }
  }

  // Get current recalibration weights
  getRecalibrationWeights(): RecalibrationWeights {
    return { ...this.recalibrationWeights };
  }

  // Get feedback metrics for a platform
  getFeedbackMetrics(platform: string): FeedbackMetrics | null {
    return this.feedbackMetrics.get(platform) || null;
  }

  // Get all recorded interactions
  getInteractions(platform?: string): RealAgentInteraction[] {
    if (platform) {
      return this.interactions.filter(i => i.platform === platform);
    }
    return [...this.interactions];
  }

  // Simulate a real agent interaction for testing
  async simulateInteraction(platform: string, query: string, url: string): Promise<RealAgentInteraction> {
    try {
      // Simulate AI response using the actual AI service
      const response = await this.aiService.analyzeText(`Query: ${query}\n\nRespond as if you're ${platform} answering this question:`);
      
      const interaction: RealAgentInteraction = {
        platform,
        query,
        result: response,
        sourceUsed: Math.random() > 0.3, // 70% chance of using source
        sourceUrl: Math.random() > 0.3 ? url : undefined,
        citationStyle: ['inline', 'footnote', 'link', 'none'][Math.floor(Math.random() * 4)] as any,
        snippetIncluded: Math.random() > 0.4, // 60% chance of including snippet
        answerUsagePattern: ['direct', 'paraphrased', 'referenced', 'ignored'][Math.floor(Math.random() * 4)] as any,
        confidence: 0.7 + Math.random() * 0.3, // 70-100% confidence
        timestamp: new Date(),
        responseTime: 1000 + Math.random() * 2000, // 1-3 seconds
        tokenUsage: 100 + Math.random() * 500 // 100-600 tokens
      };
      
      await this.recordInteraction(interaction);
      return interaction;
    } catch (error) {
      console.error('RAF Layer: Simulation failed:', error);
      throw error;
    }
  }

  // Get system adaptability score
  getSystemAdaptabilityScore(): number {
    const totalInteractions = this.interactions.length;
    const recentInteractions = this.interactions.filter(i => 
      Date.now() - i.timestamp.getTime() < 24 * 60 * 60 * 1000 // Last 24 hours
    );
    
    if (totalInteractions === 0) return 0;
    
    const adaptabilityFactors = [
      recentInteractions.length / Math.max(totalInteractions, 1), // Recent activity
      this.recalibrationWeights.lastUpdated.getTime() > Date.now() - 60 * 60 * 1000 ? 1 : 0.5, // Recent recalibration
      this.feedbackMetrics.size / 4, // Platform coverage (max 4 platforms)
    ];
    
    return adaptabilityFactors.reduce((sum, factor) => sum + factor, 0) / adaptabilityFactors.length * 100;
  }

  // Export feedback data for analysis
  exportFeedbackData(): any {
    return {
      interactions: this.interactions,
      feedbackMetrics: Object.fromEntries(this.feedbackMetrics),
      recalibrationWeights: this.recalibrationWeights,
      systemAdaptabilityScore: this.getSystemAdaptabilityScore(),
      totalInteractions: this.interactions.length,
      platforms: [...new Set(this.interactions.map(i => i.platform))]
    };
  }
} 