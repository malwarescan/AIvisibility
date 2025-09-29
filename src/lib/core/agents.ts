export interface Agent {
  id: string;
  name: string;
  platform: string;
  capabilities: string[];
  version: string;
  lastUpdated: string;
}

export interface AgentQuery {
  query: string;
  agent: string;
  platform?: string;
  timestamp: string;
  response?: string;
  confidence?: number;
  sources?: Array<{
    url: string;
    title: string;
    relevance: number;
  }>;
}

export interface AgentRanking {
  agent: string;
  platform: string;
  score: number;
  confidence: number;
  factors: string[];
  ranking: number;
  trend: number[];
  lastUpdated: string;
}

export interface DomainPresence {
  domain: string;
  agents: Array<{
    agent: string;
    platform: string;
    presence: boolean;
    lastSeen: string;
    frequency: number;
  }>;
  totalAgents: number;
  presenceRate: number;
  topAgents: string[];
}

export interface AgenticAnalysis {
  rankings: AgentRanking[];
  domainPresence: DomainPresence[];
  trends: Array<{
    date: string;
    averageScore: number;
    topAgent: string;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export class AgentAnalyzer {
  private static agents: Agent[] = [
    {
      id: 'chatgpt-4',
      name: 'ChatGPT-4',
      platform: 'OpenAI',
      capabilities: ['text-generation', 'analysis', 'reasoning'],
      version: '4.0',
      lastUpdated: '2024-01-01'
    },
    {
      id: 'claude-3',
      name: 'Claude-3',
      platform: 'Anthropic',
      capabilities: ['text-generation', 'analysis', 'reasoning'],
      version: '3.0',
      lastUpdated: '2024-01-01'
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      platform: 'Perplexity AI',
      capabilities: ['search', 'analysis', 'synthesis'],
      version: '1.0',
      lastUpdated: '2024-01-01'
    },
    {
      id: 'google-ai',
      name: 'Google AI',
      platform: 'Google',
      capabilities: ['search', 'analysis', 'knowledge'],
      version: '1.0',
      lastUpdated: '2024-01-01'
    }
  ];

  /**
   * Simulate agent query and response
   */
  static async queryAgent(query: string, agentId: string, platform?: string): Promise<AgentQuery> {
    const agent = this.agents.find(a => a.id === agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    // Simulate response generation
    const response = this.generateSimulatedResponse(query, agent);
    const confidence = this.calculateConfidence(query, agent);
    const sources = this.generateSimulatedSources(query);

    return {
      query,
      agent: agentId,
      platform: platform || agent.platform,
      timestamp: new Date().toISOString(),
      response,
      confidence,
      sources
    };
  }

  /**
   * Rank agents based on query performance
   */
  static async rankAgents(query: string, domain?: string): Promise<AgentRanking[]> {
    const rankings: AgentRanking[] = [];

    for (const agent of this.agents) {
      const score = this.calculateAgentScore(query, agent, domain);
      const confidence = this.calculateConfidence(query, agent);
      const factors = this.identifyRankingFactors(query, agent);
      const trend = this.generateTrendData(agent.id);

      rankings.push({
        agent: agent.id,
        platform: agent.platform,
        score: Math.round(score * 100),
        confidence,
        factors,
        ranking: 0, // Will be set after sorting
        trend,
        lastUpdated: new Date().toISOString()
      });
    }

    // Sort by score and assign rankings
    rankings.sort((a, b) => b.score - a.score);
    rankings.forEach((ranking, index) => {
      ranking.ranking = index + 1;
    });

    return rankings;
  }

  /**
   * Analyze domain presence across agents
   */
  static async analyzeDomainPresence(domain: string): Promise<DomainPresence> {
    const agentPresence = this.agents.map(agent => ({
      agent: agent.id,
      platform: agent.platform,
      presence: this.simulateDomainPresence(domain, agent),
      lastSeen: this.simulateLastSeen(agent),
      frequency: this.simulateFrequency(domain, agent)
    }));

    const presentAgents = agentPresence.filter(ap => ap.presence);
    const presenceRate = presentAgents.length / this.agents.length;
    const topAgents = presentAgents
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 3)
      .map(ap => ap.agent);

    return {
      domain,
      agents: agentPresence,
      totalAgents: this.agents.length,
      presenceRate,
      topAgents
    };
  }

  /**
   * Get comprehensive agentic analysis
   */
  static async analyzeAgentic(query: string, domain?: string): Promise<AgenticAnalysis> {
    const rankings = await this.rankAgents(query, domain);
    const domainPresence = domain ? [await this.analyzeDomainPresence(domain)] : [];
    const trends = this.generateTrends(rankings);
    const insights = this.generateInsights(rankings, domainPresence);

    return {
      rankings,
      domainPresence,
      trends,
      insights
    };
  }

  /**
   * Get all available agents
   */
  static getAgents(): Agent[] {
    return [...this.agents];
  }

  /**
   * Get agent by ID
   */
  static getAgent(agentId: string): Agent | undefined {
    return this.agents.find(agent => agent.id === agentId);
  }

  /**
   * Validate agent ID
   */
  static isValidAgent(agentId: string): boolean {
    return this.agents.some(agent => agent.id === agentId);
  }

  /**
   * Get valid platforms
   */
  static getValidPlatforms(): string[] {
    return [...new Set(this.agents.map(agent => agent.platform))];
  }

  // Private helper methods

  private static generateSimulatedResponse(query: string, agent: Agent): string {
    const responses = {
      'chatgpt-4': `Based on my analysis, here's what I found about "${query}": [Simulated ChatGPT-4 response with comprehensive analysis and insights]`,
      'claude-3': `I've analyzed "${query}" and here are the key findings: [Simulated Claude-3 response with detailed reasoning and context]`,
      'perplexity': `After searching multiple sources about "${query}", here's what I discovered: [Simulated Perplexity response with source synthesis]`,
      'google-ai': `Based on my knowledge base about "${query}": [Simulated Google AI response with authoritative information]`
    };

    return responses[agent.id as keyof typeof responses] || `[Simulated response from ${agent.name}]`;
  }

  private static calculateConfidence(query: string, agent: Agent): number {
    // Simulate confidence based on agent capabilities and query complexity
    const baseConfidence = 0.7;
    const capabilityBonus = agent.capabilities.length * 0.05;
    const queryComplexity = query.length > 50 ? 0.1 : 0;
    
    return Math.min(baseConfidence + capabilityBonus + queryComplexity, 0.95);
  }

  private static generateSimulatedSources(query: string): Array<{ url: string; title: string; relevance: number }> {
    return [
      { url: 'https://example.com/source1', title: 'Primary Source on ' + query, relevance: 0.9 },
      { url: 'https://example.com/source2', title: 'Supporting Information', relevance: 0.7 },
      { url: 'https://example.com/source3', title: 'Additional Context', relevance: 0.6 }
    ];
  }

  private static calculateAgentScore(query: string, agent: Agent, domain?: string): number {
    let score = 0.5; // Base score

    // Agent-specific scoring
    switch (agent.id) {
      case 'chatgpt-4':
        score += 0.2; // High reasoning capability
        break;
      case 'claude-3':
        score += 0.18; // Strong analysis
        break;
      case 'perplexity':
        score += 0.15; // Good search synthesis
        break;
      case 'google-ai':
        score += 0.12; // Knowledge base
        break;
    }

    // Domain-specific adjustments
    if (domain) {
      score += 0.1; // Domain context bonus
    }

    // Query complexity bonus
    if (query.length > 30) {
      score += 0.05;
    }

    return Math.min(score, 1.0);
  }

  private static identifyRankingFactors(query: string, agent: Agent): string[] {
    const factors: string[] = [];

    factors.push(`${agent.name} capabilities`);
    factors.push('Query relevance');
    factors.push('Response quality');

    if (agent.capabilities.includes('reasoning')) {
      factors.push('Advanced reasoning');
    }

    if (agent.capabilities.includes('search')) {
      factors.push('Search synthesis');
    }

    return factors;
  }

  private static generateTrendData(agentId: string): number[] {
    // Generate 7 days of trend data
    return Array.from({ length: 7 }, () => Math.round(70 + Math.random() * 30));
  }

  private static simulateDomainPresence(domain: string, agent: Agent): boolean {
    // Simulate domain presence based on agent type
    const presenceRates = {
      'chatgpt-4': 0.85,
      'claude-3': 0.80,
      'perplexity': 0.90,
      'google-ai': 0.95
    };

    const rate = presenceRates[agent.id as keyof typeof presenceRates] || 0.5;
    return Math.random() < rate;
  }

  private static simulateLastSeen(agent: Agent): string {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  }

  private static simulateFrequency(domain: string, agent: Agent): number {
    // Simulate frequency of domain mentions
    return Math.floor(Math.random() * 100) + 1;
  }

  private static generateTrends(rankings: AgentRanking[]): Array<{ date: string; averageScore: number; topAgent: string }> {
    const trends = [];
    const topAgent = rankings[0]?.agent || 'unknown';
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        averageScore: Math.round(70 + Math.random() * 20),
        topAgent
      });
    }

    return trends;
  }

  private static generateInsights(rankings: AgentRanking[], domainPresence: DomainPresence[]): Array<{ type: 'positive' | 'negative' | 'neutral'; message: string; impact: string }> {
    const insights: Array<{ type: 'positive' | 'negative' | 'neutral'; message: string; impact: string }> = [];

    if (rankings.length > 0) {
      const topScore = rankings[0].score;
      if (topScore > 80) {
        insights.push({
          type: 'positive' as const,
          message: 'High agent performance detected',
          impact: 'Excellent visibility potential'
        });
      } else if (topScore < 60) {
        insights.push({
          type: 'negative' as const,
          message: 'Low agent performance detected',
          impact: 'Needs optimization'
        });
      }
    }

    if (domainPresence.length > 0) {
      const presence = domainPresence[0];
      if (presence.presenceRate > 0.8) {
        insights.push({
          type: 'positive' as const,
          message: 'Strong domain presence across agents',
          impact: 'High visibility potential'
        });
      }
    }

    return insights;
  }
}

export function isValidAgentQuery(obj: any): obj is AgentQuery {
  return (
    obj &&
    typeof obj.query === 'string' &&
    typeof obj.agent === 'string' &&
    typeof obj.timestamp === 'string'
  );
}

export function isValidAgentRanking(obj: any): obj is AgentRanking {
  return (
    obj &&
    typeof obj.agent === 'string' &&
    typeof obj.score === 'number' &&
    typeof obj.confidence === 'number' &&
    Array.isArray(obj.factors)
  );
}

export function suggestAgentImprovements(rankings: AgentRanking[]): string[] {
  const improvements: string[] = [];

  if (rankings.length === 0) return improvements;

  const averageScore = rankings.reduce((sum, r) => sum + r.score, 0) / rankings.length;

  if (averageScore < 70) {
    improvements.push('Focus on improving content quality for AI agents');
    improvements.push('Optimize for agent-specific capabilities');
  }

  if (rankings[0].score < 80) {
    improvements.push('Enhance top-performing agent optimization');
    improvements.push('Implement agent-specific content strategies');
  }

  return improvements;
} 