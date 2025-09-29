import { StructuredBehaviorReplay } from './StructuredBehaviorReplay';
import { PlatformWeightNormalizer } from './PlatformWeightNormalizer';

export interface PagePerformance {
  id: string;
  url: string;
  title: string;
  agentScores: AgentScore[];
  totalScore: number;
  rank: number;
  lastUpdated: Date;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
}

export interface AgentScore {
  agentId: string;
  agentName: string;
  platform: string;
  citationCount: number;
  answerInclusion: boolean;
  confidence: number;
  responseTime: number;
  score: number;
  weight: number;
  lastSeen: Date;
}

export interface LeaderboardEntry {
  rank: number;
  pagePerformance: PagePerformance;
  highlights: {
    topAgent: string;
    bestPlatform: string;
    citationLeader: boolean;
    answerInclusionLeader: boolean;
  };
}

export interface LeaderboardConfig {
  updateFrequency: 'hourly' | 'daily' | 'weekly';
  maxEntries: number;
  minScore: number;
  includeHistorical: boolean;
  weightFactors: {
    citationWeight: number;
    answerInclusionWeight: number;
    confidenceWeight: number;
    responseTimeWeight: number;
  };
}

export interface PerformanceMetrics {
  totalPages: number;
  averageScore: number;
  topPerformer: string;
  mostImproved: string;
  platformBreakdown: Record<string, number>;
  agentBreakdown: Record<string, number>;
}

export class AgentPerformanceLeaderboard {
  private behaviorReplay: StructuredBehaviorReplay;
  private weightNormalizer: PlatformWeightNormalizer;
  private pagePerformances: Map<string, PagePerformance> = new Map();
  private leaderboardHistory: LeaderboardEntry[][] = [];
  private config: LeaderboardConfig;

  constructor(
    behaviorReplay: StructuredBehaviorReplay,
    weightNormalizer: PlatformWeightNormalizer,
    config: LeaderboardConfig = {
      updateFrequency: 'daily',
      maxEntries: 100,
      minScore: 0,
      includeHistorical: true,
      weightFactors: {
        citationWeight: 0.3,
        answerInclusionWeight: 0.4,
        confidenceWeight: 0.2,
        responseTimeWeight: 0.1
      }
    }
  ) {
    this.behaviorReplay = behaviorReplay;
    this.weightNormalizer = weightNormalizer;
    this.config = config;
  }

  // Update page performance from behavior logs
  async updatePagePerformance(url: string, title?: string): Promise<PagePerformance> {
    const behaviorLogs = this.behaviorReplay.getBehaviorLogs().filter(log => log.url === url);
    
    if (behaviorLogs.length === 0) {
      throw new Error(`No behavior logs found for URL: ${url}`);
    }

    const agentScores = await this.calculateAgentScores(behaviorLogs);
    const totalScore = this.calculateTotalScore(agentScores);
    
    const existingPerformance = this.pagePerformances.get(url);
    const dailyChange = existingPerformance ? totalScore - existingPerformance.totalScore : 0;

    const pagePerformance: PagePerformance = {
      id: `page_${url.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`,
      url,
      title: title || this.extractTitle(behaviorLogs),
      agentScores,
      totalScore,
      rank: 0, // Will be set by updateLeaderboard
      lastUpdated: new Date(),
      dailyChange,
      weeklyChange: 0, // Will be calculated
      monthlyChange: 0  // Will be calculated
    };

    this.pagePerformances.set(url, pagePerformance);
    return pagePerformance;
  }

  // Calculate agent scores from behavior logs
  private async calculateAgentScores(behaviorLogs: any[]): Promise<AgentScore[]> {
    const agentScores: AgentScore[] = [];
    const agentGroups = this.groupLogsByAgent(behaviorLogs);

    for (const [agentId, logs] of agentGroups) {
      const agentName = this.getAgentDisplayName(agentId);
      const platform = logs[0]?.platform || 'unknown';
      
      // Calculate metrics
      const citationCount = this.calculateAverageCitations(logs);
      const answerInclusion = this.calculateAnswerInclusionRate(logs);
      const confidence = this.calculateAverageConfidence(logs);
      const responseTime = this.calculateAverageResponseTime(logs);
      
      // Get normalized weight
      const normalizedWeights = this.weightNormalizer.getNormalizedWeights(agentId);
      const weight = normalizedWeights.find(w => w.platform === platform)?.currentWeight || 1.0;
      
      // Calculate score
      const score = this.calculateAgentScore({
        citationCount,
        answerInclusion,
        confidence,
        responseTime,
        weight
      });

      const agentScore: AgentScore = {
        agentId,
        agentName,
        platform,
        citationCount,
        answerInclusion,
        confidence,
        responseTime,
        score,
        weight,
        lastSeen: new Date(Math.max(...logs.map(l => l.timestamp.getTime())))
      };

      agentScores.push(agentScore);
    }

    return agentScores;
  }

  // Group logs by agent
  private groupLogsByAgent(logs: any[]): Map<string, any[]> {
    const groups = new Map<string, any[]>();
    
    logs.forEach(log => {
      const agentId = this.mapPlatformToAgent(log.platform);
      if (!groups.has(agentId)) {
        groups.set(agentId, []);
      }
      groups.get(agentId)!.push(log);
    });

    return groups;
  }

  // Map platform to agent ID
  private mapPlatformToAgent(platform: string): string {
    const mapping: Record<string, string> = {
      'chatgpt': 'analytics',
      'claude': 'authority',
      'perplexity': 'citationflow',
      'googleAI': 'querymind',
      'bing': 'auditor',
      'duckduckgo': 'connect'
    };
    return mapping[platform] || 'analytics';
  }

  // Get agent display name
  private getAgentDisplayName(agentId: string): string {
    const names: Record<string, string> = {
      'analytics': 'Analytics Agent',
      'authority': 'Authority Agent',
      'auditor': 'Auditor Agent',
      'connect': 'Connect Agent',
      'citationflow': 'CitationFlow Agent',
      'querymind': 'QueryMind Agent',
      'agentrank': 'AgentRank Agent',
      'schema': 'Schema Agent'
    };
    return names[agentId] || agentId;
  }

  // Calculate average citations
  private calculateAverageCitations(logs: any[]): number {
    const totalCitations = logs.reduce((sum, log) => sum + log.citationCount, 0);
    return totalCitations / logs.length;
  }

  // Calculate answer inclusion rate
  private calculateAnswerInclusionRate(logs: any[]): boolean {
    const includedCount = logs.filter(log => log.answerInclusion).length;
    return includedCount / logs.length > 0.5; // More than 50% inclusion
  }

  // Calculate average confidence
  private calculateAverageConfidence(logs: any[]): number {
    const totalConfidence = logs.reduce((sum, log) => sum + log.confidence, 0);
    return totalConfidence / logs.length;
  }

  // Calculate average response time
  private calculateAverageResponseTime(logs: any[]): number {
    const totalTime = logs.reduce((sum, log) => sum + log.metadata.responseTime, 0);
    return totalTime / logs.length;
  }

  // Calculate agent score
  private calculateAgentScore(metrics: {
    citationCount: number;
    answerInclusion: boolean;
    confidence: number;
    responseTime: number;
    weight: number;
  }): number {
    const { citationWeight, answerInclusionWeight, confidenceWeight, responseTimeWeight } = this.config.weightFactors;
    
    const citationScore = Math.min(100, metrics.citationCount * 10); // 10 points per citation, max 100
    const answerInclusionScore = metrics.answerInclusion ? 100 : 0;
    const confidenceScore = metrics.confidence * 100;
    const responseTimeScore = Math.max(0, 100 - (metrics.responseTime / 100)); // Faster = higher score
    
    const weightedScore = (
      citationScore * citationWeight +
      answerInclusionScore * answerInclusionWeight +
      confidenceScore * confidenceWeight +
      responseTimeScore * responseTimeWeight
    ) * metrics.weight;

    return Math.round(weightedScore);
  }

  // Calculate total score
  private calculateTotalScore(agentScores: AgentScore[]): number {
    if (agentScores.length === 0) return 0;
    
    const totalScore = agentScores.reduce((sum, agent) => sum + agent.score, 0);
    return Math.round(totalScore / agentScores.length);
  }

  // Extract title from behavior logs
  private extractTitle(logs: any[]): string {
    // Try to extract title from the first log's response
    const firstLog = logs[0];
    if (firstLog?.response) {
      const titleMatch = firstLog.response.match(/title[:\s]*([^\n]+)/i);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
    return 'Untitled Page';
  }

  // Update leaderboard
  async updateLeaderboard(): Promise<LeaderboardEntry[]> {
    // Update all page performances
    const urls = Array.from(new Set(
      this.behaviorReplay.getBehaviorLogs().map(log => log.url)
    ));

    for (const url of urls) {
      try {
        await this.updatePagePerformance(url);
      } catch (error) {
        console.error(`Failed to update performance for ${url}:`, error);
      }
    }

    // Sort by total score
    const sortedPerformances = Array.from(this.pagePerformances.values())
      .filter(performance => performance.totalScore >= this.config.minScore)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, this.config.maxEntries);

    // Update ranks
    sortedPerformances.forEach((performance, index) => {
      performance.rank = index + 1;
    });

    // Create leaderboard entries
    const leaderboard: LeaderboardEntry[] = sortedPerformances.map(performance => {
      const highlights = this.calculateHighlights(performance);
      
      return {
        rank: performance.rank,
        pagePerformance: performance,
        highlights
      };
    });

    // Store historical data
    if (this.config.includeHistorical) {
      this.leaderboardHistory.push(leaderboard);
      
      // Keep only recent history
      if (this.leaderboardHistory.length > 30) {
        this.leaderboardHistory.shift();
      }
    }

    return leaderboard;
  }

  // Calculate highlights for a page performance
  private calculateHighlights(performance: PagePerformance): {
    topAgent: string;
    bestPlatform: string;
    citationLeader: boolean;
    answerInclusionLeader: boolean;
  } {
    const topAgent = performance.agentScores.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    const platformScores = new Map<string, number>();
    performance.agentScores.forEach(agent => {
      const current = platformScores.get(agent.platform) || 0;
      platformScores.set(agent.platform, current + agent.score);
    });

    const bestPlatform = Array.from(platformScores.entries())
      .reduce((best, current) => current[1] > best[1] ? current : best)[0];

    // Check if this page is a citation leader
    const avgCitations = performance.agentScores.reduce((sum, agent) => sum + agent.citationCount, 0) / performance.agentScores.length;
    const citationLeader = avgCitations > 5; // More than 5 average citations

    // Check if this page is an answer inclusion leader
    const inclusionRate = performance.agentScores.filter(agent => agent.answerInclusion).length / performance.agentScores.length;
    const answerInclusionLeader = inclusionRate > 0.7; // More than 70% inclusion rate

    return {
      topAgent: topAgent.agentName,
      bestPlatform,
      citationLeader,
      answerInclusionLeader
    };
  }

  // Get current leaderboard
  getCurrentLeaderboard(): LeaderboardEntry[] {
    const sortedPerformances = Array.from(this.pagePerformances.values())
      .filter(performance => performance.totalScore >= this.config.minScore)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, this.config.maxEntries);

    return sortedPerformances.map(performance => ({
      rank: performance.rank,
      pagePerformance: performance,
      highlights: this.calculateHighlights(performance)
    }));
  }

  // Get historical leaderboard
  getHistoricalLeaderboard(daysBack: number = 7): LeaderboardEntry[][] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    
    return this.leaderboardHistory.filter(leaderboard => 
      leaderboard.some(entry => entry.pagePerformance.lastUpdated >= cutoffDate)
    );
  }

  // Get performance metrics
  getPerformanceMetrics(): PerformanceMetrics {
    const performances = Array.from(this.pagePerformances.values());
    
    if (performances.length === 0) {
      return {
        totalPages: 0,
        averageScore: 0,
        topPerformer: '',
        mostImproved: '',
        platformBreakdown: {},
        agentBreakdown: {}
      };
    }

    const totalPages = performances.length;
    const averageScore = performances.reduce((sum, p) => sum + p.totalScore, 0) / totalPages;
    const topPerformer = performances.sort((a, b) => b.totalScore - a.totalScore)[0]?.url || '';
    const mostImproved = performances.sort((a, b) => b.dailyChange - a.dailyChange)[0]?.url || '';

    // Platform breakdown
    const platformBreakdown: Record<string, number> = {};
    performances.forEach(performance => {
      performance.agentScores.forEach(agent => {
        platformBreakdown[agent.platform] = (platformBreakdown[agent.platform] || 0) + 1;
      });
    });

    // Agent breakdown
    const agentBreakdown: Record<string, number> = {};
    performances.forEach(performance => {
      performance.agentScores.forEach(agent => {
        agentBreakdown[agent.agentName] = (agentBreakdown[agent.agentName] || 0) + 1;
      });
    });

    return {
      totalPages,
      averageScore: Math.round(averageScore),
      topPerformer,
      mostImproved,
      platformBreakdown,
      agentBreakdown
    };
  }

  // Get page performance by URL
  getPagePerformance(url: string): PagePerformance | undefined {
    return this.pagePerformances.get(url);
  }

  // Get all page performances
  getAllPagePerformances(): PagePerformance[] {
    return Array.from(this.pagePerformances.values());
  }

  // Export leaderboard data
  exportLeaderboardData(): {
    leaderboard: LeaderboardEntry[];
    metrics: PerformanceMetrics;
    lastUpdated: Date;
  } {
    return {
      leaderboard: this.getCurrentLeaderboard(),
      metrics: this.getPerformanceMetrics(),
      lastUpdated: new Date()
    };
  }

  // Clear old data
  clearOldData(daysOld: number = 90): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Clear old page performances
    for (const [url, performance] of this.pagePerformances.entries()) {
      if (performance.lastUpdated < cutoffDate) {
        this.pagePerformances.delete(url);
      }
    }

    // Clear old leaderboard history
    this.leaderboardHistory = this.leaderboardHistory.filter(leaderboard => 
      leaderboard.some(entry => entry.pagePerformance.lastUpdated >= cutoffDate)
    );
  }
} 