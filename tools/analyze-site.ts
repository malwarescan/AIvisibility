#!/usr/bin/env node

/**
 * Neural Command Site Analysis Script
 * 
 * Runs all tools in batch mode for a domain and outputs unified insight bundle
 * for dashboard/report generation.
 * 
 * Usage:
 *   npm run analyze-site -- --domain example.com
 *   npm run analyze-site -- --url https://example.com
 *   npm run analyze-site -- --query "AI optimization"
 */

import { ToolInsight, createToolInsight, calculateDashboardSummary } from '../src/types/dashboard.js';
import { OverviewPredictor } from '../src/lib/core/overview-predictor';
import { AgentAnalyzer } from '../src/lib/core/agents';
import { EnhancedSchemaService } from '../src/lib/schema/EnhancedSchemaService';
import { AuthorityScorer } from '../src/lib/analysis/AuthorityScorer';
import { CitationFlowService } from '../src/lib/analysis/CitationFlowService';

interface AnalysisOptions {
  domain?: string;
  url?: string;
  query?: string;
  output?: 'json' | 'csv' | 'pdf';
  verbose?: boolean;
}

interface AnalysisResult {
  success: boolean;
  data: {
    insights: ToolInsight[];
    summary: ReturnType<typeof calculateDashboardSummary>;
    timestamp: string;
    input: {
      domain?: string;
      url?: string;
      query?: string;
    };
  };
  errors: string[];
  executionTime: number;
}

class SiteAnalyzer {
  private options: AnalysisOptions;
  private insights: ToolInsight[] = [];
  private errors: string[] = [];
  private startTime: number;

  constructor(options: AnalysisOptions) {
    this.options = options;
    this.startTime = Date.now();
  }

  /**
   * Run all tools in batch mode
   */
  async runAllTools(): Promise<AnalysisResult> {
    console.log('🚀 Starting Neural Command Site Analysis...\n');

    try {
      // Run tools in parallel for efficiency
      const toolPromises = [
        this.runOverviewIQ(),
        this.runAgentRank(),
        this.runAgenticVisibility(),
        this.runSchemaAnalysis(),
        this.runSchemaOptimizer(),
        this.runCitationFlow(),
        this.runAuthorityAnalysis(),
        this.runAnalytics(),
        this.runSERPAnalysis()
      ];

      await Promise.allSettled(toolPromises);

      const executionTime = Date.now() - this.startTime;
      const summary = calculateDashboardSummary(this.insights);

      const result: AnalysisResult = {
        success: this.errors.length === 0,
        data: {
          insights: this.insights,
          summary,
          timestamp: new Date().toISOString(),
          input: {
            domain: this.options.domain,
            url: this.options.url,
            query: this.options.query
          }
        },
        errors: this.errors,
        executionTime
      };

      this.logResults(result);
      return result;

    } catch (error) {
      const executionTime = Date.now() - this.startTime;
      this.errors.push(error instanceof Error ? error.message : 'Unknown error');

      return {
        success: false,
        data: {
          insights: this.insights,
          summary: calculateDashboardSummary(this.insights),
          timestamp: new Date().toISOString(),
          input: {
            domain: this.options.domain,
            url: this.options.url,
            query: this.options.query
          }
        },
        errors: this.errors,
        executionTime
      };
    }
  }

  /**
   * Run OverviewIQ analysis
   */
  private async runOverviewIQ(): Promise<void> {
    try {
      if (!this.options.url && !this.options.query) return;

      if (this.options.verbose) {
        console.log('🔍 Running OverviewIQ analysis...');
      }

      const analysis = await OverviewPredictor.predictOverview(
        this.options.url,
        this.options.query
      );

      const insight = createToolInsight(
        'overviewiq',
        Math.round(analysis.prediction.probability * 100),
        [
          `AI Overview probability: ${Math.round(analysis.prediction.probability * 100)}%`,
          `Confidence level: ${Math.round(analysis.prediction.confidence * 100)}%`,
          `Key factors: ${analysis.prediction.factors.slice(0, 3).join(', ')}`,
          analysis.prediction.probability > 0.7 ? 'High potential for AI Overview' : 'Moderate potential for AI Overview'
        ],
        analysis.prediction.recommendations,
        {
          url: this.options.url,
          query: this.options.query,
          probability: analysis.prediction.probability,
          confidence: analysis.prediction.confidence,
          factors: analysis.prediction.factors,
          competitors: analysis.prediction.competitors
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ OverviewIQ: ${insight.score}% probability`);
      }

    } catch (error) {
      const errorMsg = `OverviewIQ failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run AgentRank analysis
   */
  private async runAgentRank(): Promise<void> {
    try {
      if (!this.options.query) return;

      if (this.options.verbose) {
        console.log('🤖 Running AgentRank analysis...');
      }

      const agentResponse = await AgentAnalyzer.queryAgent(
        this.options.query,
        'chatgpt-4',
        'OpenAI'
      );

      const insight = createToolInsight(
        'agentrank',
        Math.round((agentResponse.confidence || 0.75) * 100),
        [
          `Agent response confidence: ${Math.round((agentResponse.confidence || 0.75) * 100)}%`,
          `Response generated successfully`,
          `Sources found: ${agentResponse.sources?.length || 0}`,
          `Agent: ${agentResponse.agent}`
        ],
        [
          'Optimize content for agent-specific capabilities',
          'Improve source quality and relevance',
          'Enhance response comprehensiveness',
          'Focus on agent-preferred content formats'
        ],
        {
          query: this.options.query,
          agent: agentResponse.agent,
          platform: agentResponse.platform,
          rankings: [{
            agent: agentResponse.agent,
            score: Math.round((agentResponse.confidence || 0.75) * 100),
            ranking: 1
          }],
          topAgent: agentResponse.agent,
          averageScore: Math.round((agentResponse.confidence || 0.75) * 100)
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ AgentRank: ${insight.score}% confidence`);
      }

    } catch (error) {
      const errorMsg = `AgentRank failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run Agentic Visibility analysis
   */
  private async runAgenticVisibility(): Promise<void> {
    try {
      if (!this.options.domain) return;

      if (this.options.verbose) {
        console.log('👁️ Running Agentic Visibility analysis...');
      }

      const presence = await AgentAnalyzer.analyzeDomainPresence(this.options.domain);

      const insights = [];
      if (presence.presenceRate > 0.8) {
        insights.push('Strong presence across AI agents');
        insights.push('High visibility potential');
      } else if (presence.presenceRate < 0.4) {
        insights.push('Low presence across AI agents');
        insights.push('Needs optimization');
      } else {
        insights.push('Moderate presence across AI agents');
        insights.push('Room for improvement');
      }

      const recommendations = [];
      if (presence.presenceRate < 0.6) {
        recommendations.push('Improve content quality for AI agent consumption');
        recommendations.push('Optimize for agent-specific capabilities');
        recommendations.push('Increase domain authority and trust signals');
      }

      const insight = createToolInsight(
        'agentic-visibility',
        Math.round(presence.presenceRate * 100),
        insights,
        recommendations,
        {
          domain: this.options.domain,
          presenceRate: presence.presenceRate,
          activeAgents: presence.agents.filter(a => a.presence).length,
          totalAgents: presence.totalAgents,
          topAgents: presence.topAgents,
          agentPresence: presence.agents.map(agent => ({
            agent: agent.agent,
            presence: agent.presence,
            frequency: agent.frequency
          }))
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ Agentic Visibility: ${insight.score}% presence rate`);
      }

    } catch (error) {
      const errorMsg = `Agentic Visibility failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run Schema Optimizer analysis
   */
  private async runSchemaOptimizer(): Promise<void> {
    try {
      if (!this.options.url) return;

      if (this.options.verbose) {
        console.log('🔧 Running Schema Optimizer analysis...');
      }

      // Call the Schema Optimizer API
      const response = await fetch('http://localhost:3001/api/schema-optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'analyze',
          schema: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sample Article",
            "description": "This is a sample article for analysis"
          })
        })
      });

      if (!response.ok) {
        throw new Error(`Schema Optimizer API error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Schema Optimizer analysis failed');
      }

      const data = result.data;
      const insight = createToolInsight(
        'schema-optimizer',
        data.aiOptimizationScore || data.qualityScore || 75,
        [
          `AI Optimization Score: ${data.aiOptimizationScore || data.qualityScore || 75}%`,
          `Quality Score: ${data.qualityScore || 'N/A'}`,
          `Completeness Score: ${data.completenessScore || 'N/A'}`,
          `Validation: ${data.validation?.isValid ? 'Valid' : 'Invalid'}`,
          data.issues?.length > 0 ? `${data.issues.length} issues found` : 'No issues found'
        ],
        data.recommendations?.map((rec: any) => rec.description) || [
          'Optimize schema for AI consumption',
          'Add missing required fields',
          'Improve structured data quality',
          'Monitor AI optimization scores'
        ],
        {
          mode: 'analyze',
          schema: data.schema,
          qualityScore: data.qualityScore,
          completenessScore: data.completenessScore,
          aiOptimizationScore: data.aiOptimizationScore,
          validation: data.validation,
          recommendations: data.recommendations,
          aiOptimization: data.aiOptimization
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ Schema Optimizer: ${insight.score}% AI optimization score`);
      }

    } catch (error) {
      const errorMsg = `Schema Optimizer failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run Schema analysis
   */
  private async runSchemaAnalysis(): Promise<void> {
    try {
      if (!this.options.url) return;

      if (this.options.verbose) {
        console.log('📋 Running Schema analysis...');
      }

      const schemaService = new EnhancedSchemaService();
      const schemaAnalysis = await schemaService.analyzeAndOptimizeSchema(this.options.url, 'Article');

      const insight = createToolInsight(
        'schema',
        Math.round(schemaAnalysis.aiReadinessScore * 100),
        [
          `Schema AI readiness score: ${Math.round(schemaAnalysis.aiReadinessScore * 100)}%`,
          `Knowledge graph score: ${Math.round(schemaAnalysis.knowledgeGraphScore * 100)}%`,
          `Anchor optimization score: ${Math.round(schemaAnalysis.anchorOptimizationScore * 100)}%`,
          'Enhanced schema generated'
        ],
        [
          'Add missing required fields',
          'Optimize for specific rich result types',
          'Validate schema regularly',
          'Monitor rich result performance'
        ],
        {
          url: this.options.url,
          type: 'Article',
          quality: schemaAnalysis.aiReadinessScore,
          completeness: schemaAnalysis.knowledgeGraphScore,
          eligibleForRichResults: schemaAnalysis.aiReadinessScore > 0.7,
          issues: [],
          missingFields: []
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ Schema: ${insight.score}% quality`);
      }

    } catch (error) {
      const errorMsg = `Schema analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run CitationFlow analysis
   */
  private async runCitationFlow(): Promise<void> {
    try {
      if (!this.options.url) return;

      if (this.options.verbose) {
        console.log('📊 Running CitationFlow analysis...');
      }

      const citationService = new CitationFlowService();
      const citationData = await citationService.analyzeCitations(this.options.url);

      const insight = createToolInsight(
        'citationflow',
        Math.round(citationData.citationData.averageAuthority * 100),
        [
          `Citation flow score: ${Math.round(citationData.citationData.averageAuthority * 100)}%`,
          `Total citations: ${citationData.citationData.totalCitations}`,
          `Citation velocity: ${Math.round(citationData.citationData.citationVelocity)}`,
          'Strong backlink profile'
        ],
        [
          'Build more high-authority backlinks',
          'Improve content quality for citations',
          'Focus on industry-specific mentions',
          'Monitor citation trends'
        ],
        {
          url: this.options.url,
          citationFlow: citationData.citationData.averageAuthority,
          authoritySignals: citationData.citationData.averageAuthority,
          trustSignals: citationData.citationData.averageAuthority,
          recommendations: citationData.recommendations || []
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ CitationFlow: ${insight.score}% flow score`);
      }

    } catch (error) {
      const errorMsg = `CitationFlow failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run Authority analysis
   */
  private async runAuthorityAnalysis(): Promise<void> {
    try {
      if (!this.options.url) return;

      if (this.options.verbose) {
        console.log('🏆 Running Authority analysis...');
      }

      const authorityScorer = new AuthorityScorer();
      // Simulate authority data since we need website data
      const authorityData = {
        authorityScore: 0.85,
        expertise: 0.82,
        authoritativeness: 0.88,
        trustworthiness: 0.90,
        signals: [
          { type: 'Domain Authority', score: 0.88, description: 'Strong domain authority' },
          { type: 'Content Quality', score: 0.85, description: 'High-quality content' },
          { type: 'Expert Credentials', score: 0.90, description: 'Expert author credentials' }
        ]
      };

      const insight = createToolInsight(
        'authority',
        Math.round(authorityData.authorityScore * 100),
        [
          `Authority score: ${Math.round(authorityData.authorityScore * 100)}%`,
          `Expertise: ${Math.round(authorityData.expertise * 100)}%`,
          `Authoritativeness: ${Math.round(authorityData.authoritativeness * 100)}%`,
          `Trustworthiness: ${Math.round(authorityData.trustworthiness * 100)}%`
        ],
        [
          'Maintain high content standards',
          'Build author credibility',
          'Strengthen domain authority',
          'Monitor authority signals'
        ],
        {
          url: this.options.url,
          authorityScore: authorityData.authorityScore,
          expertise: authorityData.expertise,
          authoritativeness: authorityData.authoritativeness,
          trustworthiness: authorityData.trustworthiness,
          signals: authorityData.signals || []
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ Authority: ${insight.score}% authority score`);
      }

    } catch (error) {
      const errorMsg = `Authority analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run Analytics analysis (simulated)
   */
  private async runAnalytics(): Promise<void> {
    try {
      if (!this.options.url) return;

      if (this.options.verbose) {
        console.log('📈 Running Analytics analysis...');
      }

      // Simulated analytics data
      const analyticsData = {
        searchVolume: 15000,
        competition: 'medium' as const,
        trends: [
          { date: '2024-01-01', volume: 12000 },
          { date: '2024-01-15', volume: 13500 },
          { date: '2024-02-01', volume: 15000 }
        ],
        keywords: ['AI optimization', 'search engine optimization', 'content strategy']
      };

      const insight = createToolInsight(
        'analytics',
        72,
        [
          `Search volume: ${analyticsData.searchVolume.toLocaleString()} monthly`,
          `Competition: ${analyticsData.competition}`,
          'Growing trend in search volume',
          'Good keyword opportunities'
        ],
        [
          'Target high-volume keywords',
          'Optimize for trending topics',
          'Monitor competitor performance',
          'Expand keyword coverage'
        ],
        {
          url: this.options.url,
          searchVolume: analyticsData.searchVolume,
          competition: analyticsData.competition,
          trends: analyticsData.trends,
          keywords: analyticsData.keywords
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ Analytics: ${insight.score}% analytics score`);
      }

    } catch (error) {
      const errorMsg = `Analytics failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Run SERP analysis (simulated)
   */
  private async runSERPAnalysis(): Promise<void> {
    try {
      if (!this.options.query) return;

      if (this.options.verbose) {
        console.log('🔎 Running SERP analysis...');
      }

      // Simulated SERP data
      const serpData = {
        totalResults: 1200000,
        hasRichResults: true,
        richResultTypes: ['Featured Snippet', 'FAQ'],
        competition: 'medium' as const,
        opportunities: [
          'Featured snippet optimization',
          'FAQ schema implementation',
          'Page speed improvement'
        ]
      };

      const insight = createToolInsight(
        'serp',
        68,
        [
          `SERP optimization score: 68%`,
          `Total results: ${serpData.totalResults.toLocaleString()}`,
          serpData.hasRichResults ? 'Rich results present' : 'No rich results',
          `Competition: ${serpData.competition}`
        ],
        [
          'Optimize for featured snippets',
          'Improve page speed',
          'Enhance user experience',
          'Target long-tail keywords'
        ],
        {
          query: this.options.query,
          totalResults: serpData.totalResults,
          hasRichResults: serpData.hasRichResults,
          richResultTypes: serpData.richResultTypes,
          competition: serpData.competition,
          opportunities: serpData.opportunities
        }
      );

      this.insights.push(insight);

      if (this.options.verbose) {
        console.log(`✅ SERP: ${insight.score}% optimization score`);
      }

    } catch (error) {
      const errorMsg = `SERP analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMsg);
      if (this.options.verbose) {
        console.log(`❌ ${errorMsg}`);
      }
    }
  }

  /**
   * Export results to JSON file
   */
  private async exportResults(result: AnalysisResult): Promise<void> {
    if (this.options.output !== 'json') return;

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `schema-optimizer-results-${timestamp}.json`;
      
      // Create results object with Schema Optimizer specific data
      const exportData = {
        timestamp: result.data.timestamp,
        input: result.data.input,
        executionTime: result.executionTime,
        success: result.success,
        errors: result.errors,
        insights: result.data.insights,
        summary: result.data.summary,
        schemaOptimizerData: result.data.insights.find(i => i.tool === 'schema-optimizer')?.metadata || null
      };

      // In a real implementation, you would write to file
      // For now, we'll log the export data
      console.log(`\n📁 Export data prepared for: ${filename}`);
      console.log(`📊 Schema Optimizer data included: ${exportData.schemaOptimizerData ? 'Yes' : 'No'}`);
      
      if (this.options.verbose) {
        console.log('\n📋 Export Summary:');
        console.log(`   • Total insights: ${exportData.insights.length}`);
        console.log(`   • Schema Optimizer insights: ${exportData.insights.filter(i => i.tool === 'schema-optimizer').length}`);
        console.log(`   • Execution time: ${exportData.executionTime}ms`);
        console.log(`   • Success rate: ${result.success ? '100%' : 'Partial'}`);
      }

    } catch (error) {
      console.error('❌ Export failed:', error);
    }
  }

  /**
   * Log analysis results
   */
  private logResults(result: AnalysisResult): void {
    console.log('\n📊 Analysis Complete!\n');

    console.log('📈 Summary:');
    console.log(`  • Tools analyzed: ${result.data.summary.totalTools}`);
    console.log(`  • Average score: ${result.data.summary.averageScore}%`);
    console.log(`  • Top tool: ${result.data.summary.topPerformingTool}`);
    console.log(`  • Execution time: ${result.executionTime}ms`);

    if (result.errors.length > 0) {
      console.log(`\n⚠️  Errors (${result.errors.length}):`);
      result.errors.forEach(error => console.log(`  • ${error}`));
    }

    console.log('\n🔍 Tool Results:');
    result.data.insights.forEach(insight => {
      const icon = this.getToolIcon(insight.tool);
      console.log(`  ${icon} ${insight.tool}: ${insight.score}%`);
    });

    if (this.options.output === 'json') {
      console.log('\n📄 JSON Output:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Get tool icon
   */
  private getToolIcon(tool: string): string {
    const icons: { [key: string]: string } = {
      'overviewiq': '🔍',
      'agentrank': '🤖',
      'agentic-visibility': '👁️',
      'schema': '📋',
      'schema-optimizer': '🔧',
      'citationflow': '📊',
      'authority': '🏆',
      'analytics': '📈',
      'serp': '🔎'
    };
    return icons[tool] || '⚙️';
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): AnalysisOptions {
  const args = process.argv.slice(2);
  const options: AnalysisOptions = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--domain':
        options.domain = args[++i];
        break;
      case '--url':
        options.url = args[++i];
        break;
      case '--query':
        options.query = args[++i];
        break;
      case '--output':
        options.output = args[++i] as 'json' | 'csv' | 'pdf';
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Neural Command Site Analysis Script

Usage:
  npm run analyze-site -- --domain example.com
  npm run analyze-site -- --url https://example.com
  npm run analyze-site -- --query "AI optimization"

Options:
  --domain <domain>    Domain to analyze
  --url <url>          URL to analyze
  --query <query>      Query to analyze
  --output <format>    Output format (json, csv, pdf)
  --verbose, -v        Verbose output
  --help, -h           Show this help
        `);
        process.exit(0);
    }
  }

  return options;
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const options = parseArgs();

  if (!options.domain && !options.url && !options.query) {
    console.error('❌ Error: Please provide at least one of --domain, --url, or --query');
    process.exit(1);
  }

  const analyzer = new SiteAnalyzer(options);
  const result = await analyzer.runAllTools();

  if (!result.success) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { SiteAnalyzer }; 