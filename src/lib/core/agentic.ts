// Core Agentic Library
// Shared across all tools for AI agent simulation, scoring, and analysis

export interface AgentResult {
  agent: string;
  platform: string;
  score: number;
  confidence: number;
  trend?: number[];
  insights?: string[];
}

export interface AgenticAnalysis {
  overallScore: number;
  predictionAccuracy: number;
  platformCount: number;
  agentBreakdown: AgentResult[];
  trends: Array<{
    date: string;
    score: number;
    accuracy: number;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export class AgenticAnalyzer {
  /**
   * Analyze agent results for overall score, accuracy, and trends
   */
  static analyze(agents: AgentResult[]): AgenticAnalysis {
    const overallScore = Math.round(
      agents.reduce((sum, a) => sum + a.score, 0) / (agents.length || 1)
    );
    const predictionAccuracy = Math.round(
      agents.reduce((sum, a) => sum + a.confidence, 0) / (agents.length || 1) * 100
    );
    const platformCount = new Set(agents.map(a => a.platform)).size;
    const agentBreakdown = agents;
    const trends = this.generateTrends(agents);
    const insights = this.generateInsights(agents);

    return {
      overallScore,
      predictionAccuracy,
      platformCount,
      agentBreakdown,
      trends,
      insights
    };
  }

  /**
   * Generate 7-day trend data for agents
   */
  static generateTrends(agents: AgentResult[]): Array<{ date: string; score: number; accuracy: number }> {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString();
      const score = Math.round(
        agents.reduce((sum, a) => sum + (a.trend ? a.trend[i] || a.score : a.score), 0) / (agents.length || 1)
      );
      const accuracy = Math.round(
        agents.reduce((sum, a) => sum + a.confidence, 0) / (agents.length || 1) * 100
      );
      return { date, score, accuracy };
    });
  }

  /**
   * Generate insights based on agent performance
   */
  static generateInsights(agents: AgentResult[]): Array<{ type: 'positive' | 'negative' | 'neutral'; message: string; impact: string }> {
    const insights: Array<{ type: 'positive' | 'negative' | 'neutral'; message: string; impact: string }> = [];
    agents.forEach(agent => {
      if (agent.score > 90) {
        insights.push({ type: 'positive', message: `${agent.agent} is performing exceptionally well on ${agent.platform}`, impact: 'High' });
      } else if (agent.score < 70) {
        insights.push({ type: 'negative', message: `${agent.agent} is underperforming on ${agent.platform}`, impact: 'Medium' });
      } else {
        insights.push({ type: 'neutral', message: `${agent.agent} is stable on ${agent.platform}`, impact: 'Low' });
      }
    });
    return insights;
  }

  /**
   * Recommend actions based on agent analysis
   */
  static recommendActions(agents: AgentResult[]): string[] {
    const actions: string[] = [];
    agents.forEach(agent => {
      if (agent.score < 80) {
        actions.push(`Improve content targeting for ${agent.agent} on ${agent.platform}`);
      }
      if (agent.confidence < 0.8) {
        actions.push(`Increase confidence for ${agent.agent} by optimizing schema and authority signals.`);
      }
    });
    return actions;
  }
}

/**
 * Utility: Validate if an object is a valid AgentResult
 */
export function isValidAgentResult(obj: any): obj is AgentResult {
  return obj && typeof obj === 'object' && typeof obj.agent === 'string' && typeof obj.platform === 'string';
}

/**
 * Utility: Suggest improvements for agent performance
 */
export function suggestAgentImprovements(agents: AgentResult[]): string[] {
  return AgenticAnalyzer.recommendActions(agents);
} 