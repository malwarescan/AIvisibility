// Core SERP Analysis Library
// Shared across all tools for SERP data processing and analysis

export interface SERPResult {
  title: string;
  url: string;
  snippet: string;
  position: number;
  featuredSnippet?: boolean;
  aiOverview?: boolean;
  knowledgeGraph?: boolean;
  richResults?: RichResult[];
  schema?: SchemaData;
}

export interface RichResult {
  type: 'faq' | 'howto' | 'recipe' | 'review' | 'video' | 'news' | 'local';
  title: string;
  content: string;
  url?: string;
}

export interface SchemaData {
  type: string;
  properties: Record<string, any>;
  quality: number;
  completeness: number;
}

export interface SERPAnalysis {
  query: string;
  results: SERPResult[];
  aiOverviewPresent: boolean;
  featuredSnippets: SERPResult[];
  knowledgeGraphs: SERPResult[];
  richResultsCount: number;
  schemaTypes: string[];
  averagePosition: number;
  competitionLevel: 'low' | 'medium' | 'high';
}

export class SERPAnalyzer {
  /**
   * Analyze SERP results for AI optimization opportunities
   */
  static analyzeSERP(results: SERPResult[], query: string): SERPAnalysis {
    const aiOverviewPresent = results.some(r => r.aiOverview);
    const featuredSnippets = results.filter(r => r.featuredSnippet);
    const knowledgeGraphs = results.filter(r => r.knowledgeGraph);
    const richResultsCount = results.reduce((count, r) => count + (Array.isArray(r.richResults) ? r.richResults.length : 0), 0);
    const schemaTypes = [...new Set(results.flatMap(r => r.schema ? [r.schema.type] : []))];
    const averagePosition = results.reduce((sum, r) => sum + r.position, 0) / results.length;
    
    const competitionLevel = this.calculateCompetitionLevel(results);

    return {
      query,
      results,
      aiOverviewPresent,
      featuredSnippets,
      knowledgeGraphs,
      richResultsCount,
      schemaTypes,
      averagePosition,
      competitionLevel
    };
  }

  /**
   * Calculate competition level based on SERP characteristics
   */
  private static calculateCompetitionLevel(results: SERPResult[]): 'low' | 'medium' | 'high' {
    const richResultsRatio = results.filter(r => Array.isArray(r.richResults) && r.richResults.length > 0).length / results.length;
    const featuredSnippetRatio = results.filter(r => r.featuredSnippet).length / results.length;
    const knowledgeGraphRatio = results.filter(r => r.knowledgeGraph).length / results.length;

    const competitionScore = (richResultsRatio * 0.4) + (featuredSnippetRatio * 0.3) + (knowledgeGraphRatio * 0.3);

    if (competitionScore > 0.6) return 'high';
    if (competitionScore > 0.3) return 'medium';
    return 'low';
  }

  /**
   * Extract schema patterns from SERP results
   */
  static extractSchemaPatterns(results: SERPResult[]): SchemaPattern[] {
    const patterns: SchemaPattern[] = [];
    const schemaGroups = new Map<string, SERPResult[]>();

    // Group results by schema type
    results.forEach(result => {
      if (result.schema) {
        const type = result.schema.type;
        if (!schemaGroups.has(type)) {
          schemaGroups.set(type, []);
        }
        schemaGroups.get(type)!.push(result);
      }
    });

    // Analyze patterns for each schema type
    schemaGroups.forEach((groupResults, schemaType) => {
      const pattern = this.analyzeSchemaPattern(groupResults, schemaType);
      patterns.push(pattern);
    });

    return patterns;
  }

  /**
   * Analyze schema pattern for a specific type
   */
  private static analyzeSchemaPattern(results: SERPResult[], schemaType: string): SchemaPattern {
    const avgQuality = results.reduce((sum, r) => sum + (r.schema?.quality || 0), 0) / results.length;
    const avgCompleteness = results.reduce((sum, r) => sum + (r.schema?.completeness || 0), 0) / results.length;
    const avgPosition = results.reduce((sum, r) => sum + r.position, 0) / results.length;

    return {
      type: schemaType,
      frequency: results.length,
      averageQuality: avgQuality,
      averageCompleteness: avgCompleteness,
      averagePosition: avgPosition,
      commonProperties: this.extractCommonProperties(results),
      successRate: this.calculateSuccessRate(results)
    };
  }

  /**
   * Extract common properties from schema results
   */
  private static extractCommonProperties(results: SERPResult[]): string[] {
    const propertyCounts = new Map<string, number>();
    
    results.forEach(result => {
      if (result.schema?.properties) {
        Object.keys(result.schema.properties).forEach(prop => {
          propertyCounts.set(prop, (propertyCounts.get(prop) || 0) + 1);
        });
      }
    });

    // Return properties that appear in more than 50% of results
    const threshold = results.length * 0.5;
    return Array.from(propertyCounts.entries())
      .filter(([_, count]) => count >= threshold)
      .map(([prop, _]) => prop)
      .sort();
  }

  /**
   * Calculate success rate based on position and rich results
   */
  private static calculateSuccessRate(results: SERPResult[]): number {
    const successfulResults = results.filter(r => 
      r.position <= 3 || r.featuredSnippet || (Array.isArray(r.richResults) && r.richResults.length > 0)
    );
    return successfulResults.length / results.length;
  }
}

export interface SchemaPattern {
  type: string;
  frequency: number;
  averageQuality: number;
  averageCompleteness: number;
  averagePosition: number;
  commonProperties: string[];
  successRate: number;
}

/**
 * SERP Data Fetcher - Handles SERP data retrieval
 */
export class SERPFetcher {
  /**
   * Fetch SERP data for a given query
   */
  static async fetchSERP(query: string, country: string = 'us'): Promise<SERPResult[]> {
    try {
      const response = await fetch('/api/serp/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, country }),
      });

      if (!response.ok) {
        throw new Error(`SERP fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('SERP fetch error:', error);
      return [];
    }
  }

  /**
   * Fetch SERP data for multiple queries
   */
  static async fetchMultipleSERPs(queries: string[], country: string = 'us'): Promise<Map<string, SERPResult[]>> {
    const results = new Map<string, SERPResult[]>();
    
    await Promise.all(
      queries.map(async (query) => {
        const serpResults = await this.fetchSERP(query, country);
        results.set(query, serpResults);
      })
    );

    return results;
  }
}

/**
 * SERP Optimization Recommendations
 */
export class SERPOptimizer {
  /**
   * Generate optimization recommendations based on SERP analysis
   */
  static generateRecommendations(analysis: SERPAnalysis): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // AI Overview opportunities
    if (!analysis.aiOverviewPresent) {
      recommendations.push({
        type: 'ai-overview',
        priority: 'high',
        title: 'Target AI Overview',
        description: 'No AI Overview present - opportunity to capture featured position',
        action: 'Implement comprehensive FAQ schema and conversational content',
        impact: 'high'
      });
    }

    // Rich results opportunities
    if (analysis.richResultsCount < 3) {
      recommendations.push({
        type: 'rich-results',
        priority: 'medium',
        title: 'Increase Rich Results',
        description: `Only ${analysis.richResultsCount} rich results present`,
        action: 'Implement FAQ, HowTo, and Review schemas',
        impact: 'medium'
      });
    }

    // Schema optimization
    if (analysis.schemaTypes.length < 2) {
      recommendations.push({
        type: 'schema',
        priority: 'medium',
        title: 'Diversify Schema Types',
        description: `Limited schema diversity (${analysis.schemaTypes.length} types)`,
        action: 'Implement multiple schema types based on content type',
        impact: 'medium'
      });
    }

    return recommendations;
  }
}

export interface OptimizationRecommendation {
  type: 'ai-overview' | 'rich-results' | 'schema' | 'content' | 'technical';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
  impact: 'low' | 'medium' | 'high';
}

export default {
  SERPAnalyzer,
  SERPFetcher,
  SERPOptimizer
}; 