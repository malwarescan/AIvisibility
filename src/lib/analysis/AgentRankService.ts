export interface ContentData {
  url: string;
  title: string;
  content: string;
  metadata: {
    description?: string;
    keywords?: string;
    author?: string;
    publishedDate?: string;
  };
  links: Array<{
    url: string;
    text: string;
    isExternal: boolean;
  }>;
  citations: Array<{
    source: string;
    context: string;
    authority: number;
  }>;
  schema: {
    hasStructuredData: boolean;
    types: string[];
    properties: Record<string, any>;
  };
}

export interface PlatformPrediction {
  platform: string;
  predictedRank: number;
  confidenceScore: number;
  citationCount: number;
  authorityScore: number;
  factors: {
    contentQuality: number;
    authoritySignals: number;
    citationFrequency: number;
    schemaMarkup: number;
  };
}

export interface AnalysisResult {
  analysisId: string;
  url: string;
  contentData: ContentData;
  predictions: PlatformPrediction[];
  confidenceScores: {
    overall: number;
    byPlatform: Record<string, number>;
  };
  recommendations: OptimizationRecommendation[];
  metadata: {
    analysisTimestamp: string;
    processingTime: number;
    contentHash: string;
  };
}

export interface OptimizationRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  impact: number;
  action: string;
}

export class AgentRankService {
  private platforms = [
    'ChatGPT',
    'Claude',
    'Perplexity',
    'Google AI',
    'Bard',
    'Bing AI',
    'Anthropic Claude',
    'OpenAI GPT-4',
    'Cohere',
    'Hugging Face'
  ];

  constructor() {
    // No crawler initialization needed for now
  }

  async analyzeContent(url: string): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    try {
      // Step 1: Crawl and extract content
      const contentData = await this.extractContentData(url);
      
      // Step 2: Analyze content structure
      const contentAnalysis = await this.analyzeContentStructure(contentData);
      
      // Step 3: Predict rankings for each platform
      const predictions = await this.predictRankings(contentData, contentAnalysis);
      
      // Step 4: Calculate confidence scores
      const confidenceScores = this.calculateConfidenceScores(predictions);
      
      // Step 5: Generate optimization recommendations
      const recommendations = this.generateRecommendations(contentData, predictions);
      
      const processingTime = Date.now() - startTime;
      
      return {
        analysisId: this.generateAnalysisId(),
        url,
        contentData,
        predictions,
        confidenceScores,
        recommendations,
        metadata: {
          analysisTimestamp: new Date().toISOString(),
          processingTime,
          contentHash: this.generateContentHash(contentData)
        }
      };
    } catch (error) {
      console.error('AgentRank analysis failed:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractContentData(url: string): Promise<ContentData> {
    // Simple content extraction for now
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Extract basic content
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
      
      // Extract links
      const linkMatches = html.match(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi) || [];
      const links = linkMatches.map((match: string) => {
        const hrefMatch = match.match(/href="([^"]*)"/);
        const textMatch = match.match(/>([^<]*)</);
        return {
          url: hrefMatch?.[1] || '',
          text: textMatch?.[1] || '',
          isExternal: !hrefMatch?.[1]?.startsWith(url) || false
        };
      });
      
      return {
        url,
        title: titleMatch?.[1] || '',
        content: html.substring(0, 10000), // First 10k chars for analysis
        metadata: {
          description: descriptionMatch?.[1] || '',
          keywords: '',
          author: '',
          publishedDate: ''
        },
        links: links.filter(link => link.url && link.url.startsWith('http')),
        citations: this.extractCitations(html.substring(0, 10000)),
        schema: this.extractSchemaData(html)
      };
    } catch (error) {
      console.error('Content extraction error:', error);
      return {
        url,
        title: '',
        content: '',
        metadata: { description: '', keywords: '', author: '', publishedDate: '' },
        links: [],
        citations: [],
        schema: { hasStructuredData: false, types: [], properties: {} }
      };
    }
  }

  private extractCitations(content: string): Array<{source: string; context: string; authority: number}> {
    const citations: Array<{source: string; context: string; authority: number}> = [];
    
    // Extract citation patterns
    const citationPatterns = [
      /\[([^\]]+)\]/g,  // [source]
      /\(([^)]+)\)/g,   // (source)
      /"([^"]+)"\s*\[([^\]]+)\]/g,  // "quote" [source]
    ];
    
    citationPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          citations.push({
            source: match.replace(/[\[\]()]/g, ''),
            context: match,
            authority: this.calculateAuthorityScore(match)
          });
        });
      }
    });
    
    return citations;
  }

  private extractSchemaData(html: string): {hasStructuredData: boolean; types: string[]; properties: Record<string, any>} {
    const schemaData = {
      hasStructuredData: false,
      types: [] as string[],
      properties: {} as Record<string, any>
    };
    
    // Extract JSON-LD structured data
    const jsonLdPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const jsonLdMatches = html.match(jsonLdPattern);
    
    if (jsonLdMatches) {
      schemaData.hasStructuredData = true;
      jsonLdMatches.forEach(match => {
        try {
          const jsonContent = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
          const parsed = JSON.parse(jsonContent);
          
          if (parsed['@type']) {
            schemaData.types.push(parsed['@type']);
          }
          
          Object.assign(schemaData.properties, parsed);
        } catch (e) {
          // Invalid JSON, skip
        }
      });
    }
    
    return schemaData;
  }

  private async analyzeContentStructure(contentData: ContentData) {
    const analysis = {
      wordCount: contentData.content.split(/\s+/).length,
      sentenceCount: contentData.content.split(/[.!?]+/).length,
      paragraphCount: contentData.content.split(/\n\s*\n/).length,
      linkDensity: contentData.links.length / Math.max(contentData.content.length / 1000, 1),
      citationDensity: contentData.citations.length / Math.max(contentData.content.length / 1000, 1),
      authorityScore: this.calculateOverallAuthorityScore(contentData),
      readabilityScore: this.calculateReadabilityScore(contentData.content),
      schemaScore: this.calculateSchemaScore(contentData.schema)
    };
    
    return analysis;
  }

  private async predictRankings(contentData: ContentData, analysis: any): Promise<PlatformPrediction[]> {
    const predictions: PlatformPrediction[] = [];
    
    for (const platform of this.platforms) {
      const prediction = await this.simulateAgentBehavior(platform, contentData, analysis);
      predictions.push(prediction);
    }
    
    // Sort by predicted rank
    return predictions.sort((a, b) => a.predictedRank - b.predictedRank);
  }

  private async simulateAgentBehavior(platform: string, contentData: ContentData, analysis: any): Promise<PlatformPrediction> {
    // Platform-specific prediction algorithms
    const platformFactors = this.getPlatformFactors(platform);
    
    const contentQuality = this.addVariation(this.calculateContentQuality(contentData, analysis));
    const authoritySignals = this.addVariation(this.calculateAuthoritySignals(contentData));
    const citationFrequency = this.addVariation(this.calculateCitationFrequency(contentData));
    const schemaMarkup = this.addVariation(this.calculateSchemaMarkupScore(contentData.schema));
    
    // Weighted scoring based on platform preferences
    const weightedScore = 
      contentQuality * platformFactors.contentQuality +
      authoritySignals * platformFactors.authority +
      citationFrequency * platformFactors.citations +
      schemaMarkup * platformFactors.schema;
    
    const predictedRank = Math.max(1, Math.min(10, Math.round(11 - weightedScore * 10)));
    const confidenceScore = this.addVariation(this.calculateConfidenceScore(analysis, platform), 0.05);
    const citationCount = contentData.citations.length;
    const authorityScore = this.addVariation(analysis.authorityScore, 0.1);
    
    return {
      platform,
      predictedRank,
      confidenceScore,
      citationCount,
      authorityScore,
      factors: {
        contentQuality,
        authoritySignals,
        citationFrequency,
        schemaMarkup
      }
    };
  }

  private getPlatformFactors(platform: string) {
    const factors: Record<string, {contentQuality: number; authority: number; citations: number; schema: number}> = {
      'ChatGPT': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Claude': { contentQuality: 0.35, authority: 0.3, citations: 0.2, schema: 0.15 },
      'Perplexity': { contentQuality: 0.25, authority: 0.2, citations: 0.35, schema: 0.2 },
      'Google AI': { contentQuality: 0.2, authority: 0.3, citations: 0.2, schema: 0.3 },
      'Bard': { contentQuality: 0.25, authority: 0.25, citations: 0.25, schema: 0.25 },
      'Bing AI': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Anthropic Claude': { contentQuality: 0.35, authority: 0.3, citations: 0.2, schema: 0.15 },
      'OpenAI GPT-4': { contentQuality: 0.3, authority: 0.25, citations: 0.25, schema: 0.2 },
      'Cohere': { contentQuality: 0.25, authority: 0.2, citations: 0.35, schema: 0.2 },
      'Hugging Face': { contentQuality: 0.2, authority: 0.2, citations: 0.3, schema: 0.3 }
    };
    
    return factors[platform] || factors['ChatGPT'];
  }

  private addVariation(baseScore: number, variation: number = 0.1): number {
    return Math.max(0, Math.min(1, baseScore + (Math.random() - 0.5) * variation));
  }

  private calculateContentQuality(contentData: ContentData, analysis: any): number {
    const wordCount = analysis.wordCount;
    const sentenceCount = analysis.sentenceCount;
    const readabilityScore = analysis.readabilityScore;
    
    // Quality factors
    const lengthScore = Math.min(wordCount / 500, 1); // Optimal around 500+ words
    const structureScore = sentenceCount > 10 ? 1 : sentenceCount / 10;
    const readabilityFactor = Math.max(0.3, Math.min(1, readabilityScore));
    
    return (lengthScore * 0.4 + structureScore * 0.3 + readabilityFactor * 0.3);
  }

  private calculateAuthoritySignals(contentData: ContentData): number {
    const externalLinks = contentData.links.filter(link => link.isExternal).length;
    const totalLinks = contentData.links.length;
    const citations = contentData.citations.length;
    
    const linkAuthority = totalLinks > 0 ? externalLinks / totalLinks : 0;
    const citationAuthority = Math.min(citations / 10, 1); // Cap at 10 citations
    
    return (linkAuthority * 0.6 + citationAuthority * 0.4);
  }

  private calculateCitationFrequency(contentData: ContentData): number {
    const citations = contentData.citations.length;
    const contentLength = contentData.content.length;
    
    return Math.min(citations / (contentLength / 1000), 1); // Citations per 1000 characters
  }

  private calculateSchemaMarkupScore(schema: any): number {
    if (!schema.hasStructuredData) return 0;
    
    let score = 0.3; // Base score for having structured data
    
    // Bonus for specific schema types
    const valuableTypes = ['Article', 'WebPage', 'Organization', 'Person', 'Product'];
    valuableTypes.forEach(type => {
      if (schema.types.includes(type)) score += 0.1;
    });
    
    return Math.min(score, 1);
  }

  private calculateConfidenceScore(analysis: any, platform: string): number {
    const baseConfidence = 0.7;
    
    // Factors that increase confidence
    const contentLengthFactor = Math.min(analysis.wordCount / 1000, 1) * 0.1;
    const authorityFactor = analysis.authorityScore * 0.1;
    const schemaFactor = analysis.schemaScore * 0.1;
    
    return Math.min(baseConfidence + contentLengthFactor + authorityFactor + schemaFactor, 0.95);
  }

  private calculateConfidenceScores(predictions: PlatformPrediction[]) {
    const overallConfidence = predictions.reduce((sum, p) => sum + p.confidenceScore, 0) / predictions.length;
    
    const byPlatform: Record<string, number> = {};
    predictions.forEach(p => {
      byPlatform[p.platform] = p.confidenceScore;
    });
    
    return {
      overall: overallConfidence,
      byPlatform
    };
  }

  private generateRecommendations(contentData: ContentData, predictions: PlatformPrediction[]): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    
    // Analyze prediction patterns
    const lowRankingPlatforms = predictions.filter(p => p.predictedRank > 5);
    const lowConfidencePlatforms = predictions.filter(p => p.confidenceScore < 0.7);
    
    // Content quality recommendations
    if (contentData.content.length < 1000) {
      recommendations.push({
        priority: 'high',
        category: 'Content Quality',
        description: 'Content is too short for optimal AI agent ranking',
        impact: 0.8,
        action: 'Expand content to at least 1000 words with detailed explanations'
      });
    }
    
    // Authority signal recommendations
    if (contentData.citations.length < 3) {
      recommendations.push({
        priority: 'medium',
        category: 'Authority Signals',
        description: 'Add more authoritative citations to improve ranking',
        impact: 0.6,
        action: 'Include 3-5 citations from reputable sources'
      });
    }
    
    // Schema markup recommendations
    if (!contentData.schema.hasStructuredData) {
      recommendations.push({
        priority: 'medium',
        category: 'Schema Markup',
        description: 'Add structured data markup for better AI understanding',
        impact: 0.5,
        action: 'Implement JSON-LD structured data for your content type'
      });
    }
    
    // Platform-specific recommendations
    lowRankingPlatforms.forEach(platform => {
      recommendations.push({
        priority: 'medium',
        category: 'Platform Optimization',
        description: `Optimize content specifically for ${platform}`,
        impact: 0.4,
        action: `Focus on ${platform}'s preferred content factors`
      });
    });
    
    return recommendations;
  }

  private calculateAuthorityScore(text: string): number {
    // Simple authority scoring based on domain patterns
    const authorityDomains = ['edu', 'gov', 'org', 'ac.uk', 'harvard.edu', 'stanford.edu'];
    const hasAuthorityDomain = authorityDomains.some(domain => text.toLowerCase().includes(domain));
    return hasAuthorityDomain ? 0.8 : 0.3;
  }

  private calculateOverallAuthorityScore(contentData: ContentData): number {
    const linkAuthority = contentData.links.length > 0 ? 
      contentData.links.filter(l => l.isExternal).length / contentData.links.length : 0;
    const citationAuthority = contentData.citations.length > 0 ? 
      contentData.citations.reduce((sum, c) => sum + c.authority, 0) / contentData.citations.length : 0;
    
    return (linkAuthority * 0.6 + citationAuthority * 0.4);
  }

  private calculateReadabilityScore(content: string): number {
    // Simplified Flesch Reading Ease calculation
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const syllables = content.toLowerCase().replace(/[^a-z]/g, '').length * 0.4; // Approximation
    
    if (sentences === 0 || words === 0) return 0.5;
    
    const fleschScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return Math.max(0, Math.min(1, fleschScore / 100));
  }

  private calculateSchemaScore(schema: any): number {
    if (!schema.hasStructuredData) return 0;
    return Math.min(schema.types.length * 0.2, 1);
  }

  private generateAnalysisId(): string {
    return `agentrank_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateContentHash(contentData: ContentData): string {
    const content = `${contentData.title}${contentData.content}`;
    return Buffer.from(content).toString('base64').substr(0, 16);
  }
} 