/**
 * SchemaScoreTracker - Historical tracking and analysis of schema optimization scores
 * Provides trend analysis, performance tracking, and insights for schema optimization
 */

export interface SchemaScore {
  url: string;
  timestamp: Date;
  aiOptimizationScore: number;
  qualityScore: number;
  completenessScore: number;
  validationStatus: 'valid' | 'invalid' | 'unknown';
  platformScores: Record<string, number>;
  impact: number;
  metadata?: {
    schemaTypes: string[];
    validationErrors?: string[];
    recommendations?: string[];
  };
}

export interface SchemaScoreTrend {
  url: string;
  trend: 'improving' | 'declining' | 'stable';
  changePercent: number;
  averageScore: number;
  scoreHistory: SchemaScore[];
  lastUpdated: Date;
  insights: string[];
}

export interface SchemaScoreSummary {
  totalScores: number;
  averageAiOptimization: number;
  averageQuality: number;
  averageCompleteness: number;
  validationRate: number;
  topImprovements: Array<{
    url: string;
    improvement: number;
    timeframe: string;
  }>;
  commonIssues: Array<{
    issue: string;
    frequency: number;
    impact: 'high' | 'medium' | 'low';
  }>;
}

export class SchemaScoreTracker {
  private scores: Map<string, SchemaScore[]> = new Map();
  private readonly maxHistoryPerUrl = 100; // Keep last 100 scores per URL

  /**
   * Log a new schema score for tracking
   */
  async logSchemaScore(score: SchemaScore): Promise<void> {
    const url = score.url;
    const urlScores = this.scores.get(url) || [];
    
    // Add new score to the beginning (most recent first)
    urlScores.unshift(score);
    
    // Keep only the most recent scores
    if (urlScores.length > this.maxHistoryPerUrl) {
      urlScores.splice(this.maxHistoryPerUrl);
    }
    
    this.scores.set(url, urlScores);
    
    console.log(`Schema score logged for ${url}: AI=${score.aiOptimizationScore}, Quality=${score.qualityScore}`);
  }

  /**
   * Get historical scores for a URL
   */
  async getSchemaHistory(url: string, limit: number = 30): Promise<SchemaScore[]> {
    const urlScores = this.scores.get(url) || [];
    return urlScores.slice(0, limit);
  }

  /**
   * Calculate trend for a URL based on historical data
   */
  async calculateTrend(url: string, days: number = 30): Promise<SchemaScoreTrend | null> {
    const urlScores = this.scores.get(url) || [];
    if (urlScores.length < 2) return null;

    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const recentScores = urlScores.filter(score => score.timestamp >= cutoffDate);
    
    if (recentScores.length < 2) return null;

    // Calculate trend
    const oldestScore = recentScores[recentScores.length - 1];
    const newestScore = recentScores[0];
    const avgScore = recentScores.reduce((sum, score) => sum + score.aiOptimizationScore, 0) / recentScores.length;
    
    const change = newestScore.aiOptimizationScore - oldestScore.aiOptimizationScore;
    const changePercent = (change / oldestScore.aiOptimizationScore) * 100;
    
    let trend: 'improving' | 'declining' | 'stable';
    if (changePercent > 5) trend = 'improving';
    else if (changePercent < -5) trend = 'declining';
    else trend = 'stable';

    // Generate insights
    const insights = this.generateInsights(recentScores, trend, changePercent);

    return {
      url,
      trend,
      changePercent: Math.round(changePercent * 100) / 100,
      averageScore: Math.round(avgScore * 100) / 100,
      scoreHistory: recentScores,
      lastUpdated: new Date(),
      insights
    };
  }

  /**
   * Get summary statistics across all tracked URLs
   */
  async getSummary(): Promise<SchemaScoreSummary> {
    const allScores = Array.from(this.scores.values()).flat();
    if (allScores.length === 0) {
      return {
        totalScores: 0,
        averageAiOptimization: 0,
        averageQuality: 0,
        averageCompleteness: 0,
        validationRate: 0,
        topImprovements: [],
        commonIssues: []
      };
    }

    const averageAiOptimization = allScores.reduce((sum, score) => sum + score.aiOptimizationScore, 0) / allScores.length;
    const averageQuality = allScores.reduce((sum, score) => sum + score.qualityScore, 0) / allScores.length;
    const averageCompleteness = allScores.reduce((sum, score) => sum + score.completenessScore, 0) / allScores.length;
    const validationRate = (allScores.filter(score => score.validationStatus === 'valid').length / allScores.length) * 100;

    // Calculate top improvements
    const improvements = await this.calculateTopImprovements();
    
    // Identify common issues
    const commonIssues = this.identifyCommonIssues(allScores);

    return {
      totalScores: allScores.length,
      averageAiOptimization: Math.round(averageAiOptimization * 100) / 100,
      averageQuality: Math.round(averageQuality * 100) / 100,
      averageCompleteness: Math.round(averageCompleteness * 100) / 100,
      validationRate: Math.round(validationRate * 100) / 100,
      topImprovements: improvements,
      commonIssues
    };
  }

  /**
   * Export historical data for analysis
   */
  async exportData(url?: string): Promise<SchemaScore[] | Record<string, SchemaScore[]>> {
    if (url) {
      return this.scores.get(url) || [];
    }
    
    const exportData: Record<string, SchemaScore[]> = {};
    for (const [url, scores] of this.scores.entries()) {
      exportData[url] = scores;
    }
    return exportData;
  }

  /**
   * Clear old data to manage memory
   */
  async clearOldData(daysToKeep: number = 90): Promise<void> {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    
    for (const [url, scores] of this.scores.entries()) {
      const filteredScores = scores.filter(score => score.timestamp >= cutoffDate);
      this.scores.set(url, filteredScores);
    }
    
    console.log(`Cleared schema scores older than ${daysToKeep} days`);
  }

  /**
   * Generate insights based on score history
   */
  private generateInsights(scores: SchemaScore[], trend: string, changePercent: number): string[] {
    const insights: string[] = [];
    
    if (trend === 'improving') {
      insights.push(`Schema optimization improving by ${Math.abs(changePercent).toFixed(1)}%`);
    } else if (trend === 'declining') {
      insights.push(`Schema optimization declining by ${Math.abs(changePercent).toFixed(1)}% - attention needed`);
    } else {
      insights.push('Schema optimization stable - consider improvements for better AI visibility');
    }

    const avgScore = scores.reduce((sum, score) => sum + score.aiOptimizationScore, 0) / scores.length;
    if (avgScore < 70) {
      insights.push('Average AI optimization score is low - significant improvements needed');
    } else if (avgScore < 85) {
      insights.push('AI optimization score has room for improvement');
    } else {
      insights.push('Excellent AI optimization score - maintain current standards');
    }

    const validationRate = (scores.filter(score => score.validationStatus === 'valid').length / scores.length) * 100;
    if (validationRate < 90) {
      insights.push(`Schema validation rate is ${validationRate.toFixed(1)}% - fix validation errors`);
    }

    return insights;
  }

  /**
   * Calculate top improvements across all URLs
   */
  private async calculateTopImprovements(): Promise<Array<{ url: string; improvement: number; timeframe: string }>> {
    const improvements: Array<{ url: string; improvement: number; timeframe: string }> = [];
    
    for (const [url, scores] of this.scores.entries()) {
      if (scores.length < 2) continue;
      
      const oldestScore = scores[scores.length - 1];
      const newestScore = scores[0];
      const improvement = newestScore.aiOptimizationScore - oldestScore.aiOptimizationScore;
      
      if (improvement > 0) {
        const daysDiff = Math.ceil((newestScore.timestamp.getTime() - oldestScore.timestamp.getTime()) / (1000 * 60 * 60 * 24));
        improvements.push({
          url,
          improvement: Math.round(improvement * 100) / 100,
          timeframe: `${daysDiff} days`
        });
      }
    }
    
    return improvements
      .sort((a, b) => b.improvement - a.improvement)
      .slice(0, 5);
  }

  /**
   * Identify common issues across all scores
   */
  private identifyCommonIssues(scores: SchemaScore[]): Array<{ issue: string; frequency: number; impact: 'high' | 'medium' | 'low' }> {
    const issues: Record<string, number> = {};
    
    scores.forEach(score => {
      if (score.aiOptimizationScore < 70) issues['Low AI Optimization'] = (issues['Low AI Optimization'] || 0) + 1;
      if (score.qualityScore < 70) issues['Low Quality Score'] = (issues['Low Quality Score'] || 0) + 1;
      if (score.completenessScore < 70) issues['Low Completeness'] = (issues['Low Completeness'] || 0) + 1;
      if (score.validationStatus !== 'valid') issues['Validation Errors'] = (issues['Validation Errors'] || 0) + 1;
    });
    
    return Object.entries(issues)
      .map(([issue, count]) => {
        const frequency = Math.round((count / scores.length) * 100);
        const impact: 'high' | 'medium' | 'low' = count > scores.length * 0.3 ? 'high' : count > scores.length * 0.1 ? 'medium' : 'low';
        return { issue, frequency, impact };
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
  }
} 