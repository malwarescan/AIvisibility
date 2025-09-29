export interface ToolInsight {
  tool: string;
  score?: number;
  insights: string[];
  recommendations: string[];
  updatedAt: string;
  metadata?: {
    url?: string;
    query?: string;
    domain?: string;
    agent?: string;
    platform?: string;
    [key: string]: any;
  };
}

export interface DashboardData {
  insights: ToolInsight[];
  summary: {
    totalTools: number;
    averageScore: number;
    topPerformingTool: string;
    lastUpdated: string;
  };
  trends: Array<{
    date: string;
    averageScore: number;
    toolCount: number;
  }>;
}

export interface ToolAnalysis {
  success: boolean;
  data: {
    insight: ToolInsight;
    analysis?: any; // Tool-specific analysis data
  };
  timestamp: string;
  tool: string;
  action: string;
}

// Tool-specific insight types
export interface OverviewInsight extends ToolInsight {
  tool: 'overviewiq';
  score: number; // Probability percentage
  metadata: {
    url?: string;
    query?: string;
    probability: number;
    confidence: number;
    factors: string[];
    competitors: Array<{
      domain: string;
      probability: number;
    }>;
  };
}

export interface AgentRankInsight extends ToolInsight {
  tool: 'agentrank';
  score: number; // Average agent score
  metadata: {
    url?: string;
    query?: string;
    agent?: string;
    platform?: string;
    rankings: Array<{
      agent: string;
      score: number;
      ranking: number;
    }>;
    topAgent: string;
    averageScore: number;
  };
}

export interface AgenticVisibilityInsight extends ToolInsight {
  tool: 'agentic-visibility';
  score: number; // Presence rate percentage
  metadata: {
    domain: string;
    presenceRate: number;
    activeAgents: number;
    totalAgents: number;
    topAgents: string[];
    agentPresence: Array<{
      agent: string;
      presence: boolean;
      frequency: number;
    }>;
  };
}

export interface SchemaInsight extends ToolInsight {
  tool: 'schema';
  score: number; // Schema quality score
  metadata: {
    url?: string;
    schema?: any;
    type?: string;
    quality: number;
    completeness: number;
    eligibleForRichResults: boolean;
    issues: string[];
    missingFields: string[];
  };
}

export interface SchemaOptimizerInsight extends ToolInsight {
  tool: 'schema-optimizer';
  score: number; // AI optimization score
  metadata: {
    mode: 'analyze' | 'optimize' | 'generate';
    schema?: any;
    content?: string;
    schemaType?: string;
    qualityScore?: number;
    completenessScore?: number;
    aiOptimizationScore?: number;
    validation?: {
      isValid: boolean;
      errors: string[];
      warnings: string[];
    };
    improvements?: Array<{
      field: string;
      originalValue: any;
      optimizedValue: any;
      reason: string;
      impact: number;
    }>;
    aiOptimization?: {
      chatgptScore: number;
      claudeScore: number;
      perplexityScore: number;
      googleScore: number;
    };
    recommendations?: Array<{
      priority: 'high' | 'medium' | 'low';
      category: string;
      description: string;
      implementation: string;
      expectedImpact: number;
    }>;
  };
}

export interface CitationFlowInsight extends ToolInsight {
  tool: 'citationflow';
  score: number; // Citation flow score
  metadata: {
    url: string;
    citationFlow: number;
    authoritySignals: number;
    trustSignals: number;
    recommendations: string[];
  };
}

export interface AuthorityInsight extends ToolInsight {
  tool: 'authority';
  score: number; // Authority score
  metadata: {
    url: string;
    authorityScore: number;
    expertise: number;
    authoritativeness: number;
    trustworthiness: number;
    signals: Array<{
      type: string;
      score: number;
      description: string;
    }>;
  };
}

export interface AnalyticsInsight extends ToolInsight {
  tool: 'analytics';
  score: number; // Analytics score
  metadata: {
    url: string;
    searchVolume: number;
    competition: 'low' | 'medium' | 'high';
    trends: Array<{
      date: string;
      volume: number;
    }>;
    keywords: string[];
  };
}

export interface SERPInsight extends ToolInsight {
  tool: 'serp';
  score: number; // SERP optimization score
  metadata: {
    query: string;
    totalResults: number;
    hasRichResults: boolean;
    richResultTypes: string[];
    competition: 'low' | 'medium' | 'high';
    opportunities: string[];
  };
}

// Union type for all tool insights
export type AnyToolInsight = 
  | OverviewInsight 
  | AgentRankInsight 
  | AgenticVisibilityInsight 
  | SchemaInsight 
  | SchemaOptimizerInsight 
  | CitationFlowInsight 
  | AuthorityInsight 
  | AnalyticsInsight 
  | SERPInsight;

// Utility functions for dashboard integration
export function createToolInsight(
  tool: string,
  score: number,
  insights: string[],
  recommendations: string[],
  metadata?: any
): ToolInsight {
  return {
    tool,
    score,
    insights,
    recommendations,
    updatedAt: new Date().toISOString(),
    metadata
  };
}

export function validateToolInsight(insight: any): insight is ToolInsight {
  return (
    insight &&
    typeof insight.tool === 'string' &&
    (insight.score === undefined || typeof insight.score === 'number') &&
    Array.isArray(insight.insights) &&
    Array.isArray(insight.recommendations) &&
    typeof insight.updatedAt === 'string'
  );
}

export function calculateDashboardSummary(insights: ToolInsight[]): DashboardData['summary'] {
  const validScores = insights.filter(i => i.score !== undefined).map(i => i.score!);
  const averageScore = validScores.length > 0 
    ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
    : 0;

  const topPerformingTool = insights
    .filter(i => i.score !== undefined)
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0]?.tool || 'none';

  return {
    totalTools: insights.length,
    averageScore,
    topPerformingTool,
    lastUpdated: new Date().toISOString()
  };
} 