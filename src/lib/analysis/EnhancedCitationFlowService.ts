// Enhanced CitationFlow Service
// Implements citation decay modeling, quality normalization, and platform-citation reinforcement

import OpenAIService from '@/lib/ai/OpenAIService';

interface CitationData {
  url: string;
  platform: string;
  timestamp: number;
  initialImpact: number;
  currentImpact: number;
  velocity: number;
  halfLife: number;
  qualityScore: number;
  domainAuthority: number;
  entityMatch: number;
}

interface CitationDecayModel {
  initialImpact: number;
  currentImpact: number;
  halfLife: number;
  decayRate: number;
  velocity: number;
  prediction: number;
}

interface QualityNormalization {
  domainAuthority: number;
  entityMatch: number;
  normalizedImpact: number;
  qualityScore: number;
  trustSignals: number;
}

interface PlatformReinforcement {
  sourcePlatform: string;
  targetPlatform: string;
  reinforcementScore: number;
  crossPlatformWeight: number;
  predictedImpact: number;
}

interface EnhancedCitationFlowData {
  overall: {
    totalCitations: number;
    averageAuthority: number;
    citationVelocity: number;
    qualityScore: number;
    decayRate: number;
  };
  citationDecay: CitationDecayModel[];
  qualityNormalization: QualityNormalization[];
  platformReinforcement: PlatformReinforcement[];
  flowPredictions: Array<{
    platform: string;
    predictedCitations: number;
    confidence: number;
    reinforcementFactor: number;
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral' | 'decay' | 'reinforcement';
    message: string;
    impact: string;
    confidence: number;
  }>;
  decayMetrics: {
    averageHalfLife: number;
    decayVelocity: number;
    qualityRetention: number;
    crossPlatformReinforcement: number;
  };
}

export class EnhancedCitationFlowService {
  private aiService: OpenAIService;
  private citationHistory: CitationData[] = [];
  private decayModels: Map<string, CitationDecayModel> = new Map();
  private reinforcementMatrix: Map<string, Map<string, number>> = new Map();

  constructor() {
    this.aiService = new OpenAIService();
    this.initializeReinforcementMatrix();
  }

  // Initialize cross-platform reinforcement matrix
  private initializeReinforcementMatrix(): void {
    const platforms = ['chatgpt', 'claude', 'perplexity', 'googleAI'];
    
    platforms.forEach(sourcePlatform => {
      this.reinforcementMatrix.set(sourcePlatform, new Map());
      platforms.forEach(targetPlatform => {
        if (sourcePlatform !== targetPlatform) {
          // Initialize reinforcement scores based on platform relationships
          let reinforcementScore = 0.3; // Base reinforcement
          
          // Perplexity to ChatGPT has higher reinforcement
          if (sourcePlatform === 'perplexity' && targetPlatform === 'chatgpt') {
            reinforcementScore = 0.8;
          }
          
          // Claude to Perplexity has medium reinforcement
          if (sourcePlatform === 'claude' && targetPlatform === 'perplexity') {
            reinforcementScore = 0.6;
          }
          
          // Google AI to other platforms has moderate reinforcement
          if (sourcePlatform === 'googleAI') {
            reinforcementScore = 0.5;
          }
          
          this.reinforcementMatrix.get(sourcePlatform)!.set(targetPlatform, reinforcementScore);
        }
      });
    });
  }

  // Citation decay modeling with exponential decay
  private calculateCitationDecay(initialImpact: number, days: number, halfLife: number): number {
    const decayRate = Math.log(2) / halfLife; // Natural log of 2 divided by half-life
    return initialImpact * Math.exp(-decayRate * days);
  }

  // Calculate citation velocity over time
  private calculateCitationVelocity(citations: CitationData[]): number {
    if (citations.length < 2) return 0;
    
    const sortedCitations = citations.sort((a, b) => a.timestamp - b.timestamp);
    const timeSpan = sortedCitations[sortedCitations.length - 1].timestamp - sortedCitations[0].timestamp;
    const days = timeSpan / (1000 * 60 * 60 * 24);
    
    const totalImpact = sortedCitations.reduce((sum, citation) => sum + citation.currentImpact, 0);
    return totalImpact / days;
  }

  // Calculate citation half-life based on platform and content type
  private calculateHalfLife(platform: string, contentType: string): number {
    let baseHalfLife = 30; // Default 30 days
    
    // Platform-specific half-lives
    switch (platform) {
      case 'chatgpt':
        baseHalfLife = 45; // ChatGPT citations last longer
        break;
      case 'claude':
        baseHalfLife = 40; // Claude citations have medium longevity
        break;
      case 'perplexity':
        baseHalfLife = 25; // Perplexity citations decay faster
        break;
      case 'googleAI':
        baseHalfLife = 35; // Google AI citations have moderate longevity
        break;
    }
    
    // Content type adjustments
    switch (contentType) {
      case 'blog':
        baseHalfLife *= 1.2; // Blog posts last longer
        break;
      case 'product':
        baseHalfLife *= 0.8; // Product pages decay faster
        break;
      case 'landing':
        baseHalfLife *= 0.9; // Landing pages have medium longevity
        break;
      case 'resource':
        baseHalfLife *= 1.5; // Resource pages last longest
        break;
    }
    
    return Math.round(baseHalfLife);
  }

  // Quality normalization by domain authority and entity match
  private calculateQualityNormalization(citation: CitationData): QualityNormalization {
    const domainAuthority = citation.domainAuthority;
    const entityMatch = citation.entityMatch;
    
    // Normalize impact by domain authority (0-100 scale)
    const authorityNormalization = Math.min(1.5, domainAuthority / 50);
    
    // Normalize by entity match in knowledge graph (0-100 scale)
    const entityNormalization = Math.min(1.3, entityMatch / 70);
    
    // Calculate normalized impact
    const normalizedImpact = citation.currentImpact * authorityNormalization * entityNormalization;
    
    // Calculate quality score
    const qualityScore = (domainAuthority * 0.6 + entityMatch * 0.4) / 100;
    
    // Calculate trust signals
    const trustSignals = Math.min(100, (domainAuthority + entityMatch) / 2);
    
    return {
      domainAuthority,
      entityMatch,
      normalizedImpact: Math.round(normalizedImpact),
      qualityScore: Math.round(qualityScore * 100) / 100,
      trustSignals: Math.round(trustSignals)
    };
  }

  // Platform-citation reinforcement calculation
  private calculatePlatformReinforcement(sourcePlatform: string, targetPlatform: string, citationImpact: number): PlatformReinforcement {
    const reinforcementScore = this.reinforcementMatrix.get(sourcePlatform)?.get(targetPlatform) || 0.3;
    
    // Calculate cross-platform weight based on reinforcement score
    const crossPlatformWeight = reinforcementScore * citationImpact / 100;
    
    // Predict impact on target platform
    const predictedImpact = citationImpact * (1 + reinforcementScore);
    
    return {
      sourcePlatform,
      targetPlatform,
      reinforcementScore: Math.round(reinforcementScore * 100) / 100,
      crossPlatformWeight: Math.round(crossPlatformWeight * 100) / 100,
      predictedImpact: Math.round(predictedImpact)
    };
  }

  // Update decay models with new citation data
  private updateDecayModels(citations: CitationData[]): void {
    citations.forEach(citation => {
      const key = `${citation.platform}_${citation.url}`;
      const existing = this.decayModels.get(key);
      
      const halfLife = this.calculateHalfLife(citation.platform, 'blog'); // Default to blog
      const currentImpact = this.calculateCitationDecay(
        citation.initialImpact,
        (Date.now() - citation.timestamp) / (1000 * 60 * 60 * 24),
        halfLife
      );
      
      const decayRate = Math.log(2) / halfLife;
      const velocity = this.calculateCitationVelocity([citation]);
      
      const newModel: CitationDecayModel = {
        initialImpact: citation.initialImpact,
        currentImpact: Math.round(currentImpact),
        halfLife,
        decayRate: Math.round(decayRate * 1000) / 1000,
        velocity: Math.round(velocity * 100) / 100,
        prediction: Math.round(currentImpact * 0.8) // Predict 20% further decay
      };
      
      this.decayModels.set(key, newModel);
    });
  }

  // Generate AI-powered insights
  private async generateInsights(citations: CitationData[], decayModels: CitationDecayModel[], reinforcements: PlatformReinforcement[]): Promise<any[]> {
    const insights = [];
    
    // Analyze decay patterns
    const averageHalfLife = decayModels.reduce((sum, model) => sum + model.halfLife, 0) / decayModels.length;
    if (averageHalfLife < 25) {
      insights.push({
        type: 'decay' as const,
        message: `Citations are decaying rapidly (${averageHalfLife.toFixed(1)} days half-life). Consider content refresh strategies.`,
        impact: 'High',
        confidence: 0.85
      });
    }
    
    // Analyze reinforcement patterns
    const strongReinforcements = reinforcements.filter(r => r.reinforcementScore > 0.6);
    if (strongReinforcements.length > 0) {
      insights.push({
        type: 'reinforcement' as const,
        message: `Strong cross-platform reinforcement detected (${strongReinforcements.length} high-impact connections).`,
        impact: 'Medium',
        confidence: 0.90
      });
    }
    
    // Use AI for advanced insights
    try {
      const aiInsights = await this.aiService.analyzeCitationFlowPatterns(citations, decayModels, reinforcements);
      insights.push(...aiInsights);
    } catch (error) {
      console.warn('AI insights generation failed:', error);
    }
    
    return insights;
  }

  // Main citation flow analysis method
  async analyzeCitationFlow(url: string, citationData: any): Promise<EnhancedCitationFlowData> {
    console.log('Starting enhanced citation flow analysis for:', url);
    
    // Process citation data
    const citations: CitationData[] = citationData.citations || [];
    this.citationHistory.push(...citations);
    
    // Update decay models
    this.updateDecayModels(citations);
    
    // Calculate quality normalization
    const qualityNormalizations = citations.map(citation => 
      this.calculateQualityNormalization(citation)
    );
    
    // Calculate platform reinforcement
    const platformReinforcements: PlatformReinforcement[] = [];
    citations.forEach(sourceCitation => {
      citations.forEach(targetCitation => {
        if (sourceCitation.platform !== targetCitation.platform) {
          const reinforcement = this.calculatePlatformReinforcement(
            sourceCitation.platform,
            targetCitation.platform,
            sourceCitation.currentImpact
          );
          platformReinforcements.push(reinforcement);
        }
      });
    });
    
    // Calculate overall metrics
    const totalCitations = citations.length;
    const averageAuthority = qualityNormalizations.reduce((sum, qn) => sum + qn.domainAuthority, 0) / qualityNormalizations.length;
    const citationVelocity = this.calculateCitationVelocity(citations);
    const qualityScore = qualityNormalizations.reduce((sum, qn) => sum + qn.qualityScore, 0) / qualityNormalizations.length;
    const decayRate = Array.from(this.decayModels.values()).reduce((sum, model) => sum + model.decayRate, 0) / this.decayModels.size;
    
    // Generate flow predictions with reinforcement
    const flowPredictions = ['chatgpt', 'claude', 'perplexity', 'googleAI'].map(platform => {
      const platformCitations = citations.filter(c => c.platform === platform);
      const baseCitations = platformCitations.length;
      
      // Calculate reinforcement factor
      const reinforcements = platformReinforcements.filter(r => r.targetPlatform === platform);
      const reinforcementFactor = reinforcements.reduce((sum, r) => sum + r.reinforcementScore, 0) / Math.max(1, reinforcements.length);
      
      const predictedCitations = Math.round(baseCitations * (1 + reinforcementFactor));
      const confidence = Math.min(1, 0.7 + reinforcementFactor * 0.3);
      
      return {
        platform,
        predictedCitations,
        confidence: Math.round(confidence * 100) / 100,
        reinforcementFactor: Math.round(reinforcementFactor * 100) / 100
      };
    });
    
    // Generate insights
    const insights = await this.generateInsights(citations, Array.from(this.decayModels.values()), platformReinforcements);
    
    // Calculate decay metrics
    const decayMetrics = {
      averageHalfLife: Array.from(this.decayModels.values()).reduce((sum, model) => sum + model.halfLife, 0) / this.decayModels.size,
      decayVelocity: Array.from(this.decayModels.values()).reduce((sum, model) => sum + model.velocity, 0) / this.decayModels.size,
      qualityRetention: qualityNormalizations.reduce((sum, qn) => sum + qn.qualityScore, 0) / qualityNormalizations.length,
      crossPlatformReinforcement: platformReinforcements.reduce((sum, r) => sum + r.reinforcementScore, 0) / platformReinforcements.length
    };
    
    const result: EnhancedCitationFlowData = {
      overall: {
        totalCitations,
        averageAuthority: Math.round(averageAuthority),
        citationVelocity: Math.round(citationVelocity * 100) / 100,
        qualityScore: Math.round(qualityScore * 100) / 100,
        decayRate: Math.round(decayRate * 1000) / 1000
      },
      citationDecay: Array.from(this.decayModels.values()),
      qualityNormalization: qualityNormalizations,
      platformReinforcement: platformReinforcements,
      flowPredictions,
      insights,
      decayMetrics
    };
    
    console.log('Enhanced CitationFlow Results:', {
      totalCitations: result.overall.totalCitations,
      averageHalfLife: decayMetrics.averageHalfLife,
      reinforcementFactor: decayMetrics.crossPlatformReinforcement,
      insights: insights.length
    });
    
    return result;
  }

  // Get citation decay for specific URL and platform
  getCitationDecay(url: string, platform: string): CitationDecayModel | null {
    const key = `${platform}_${url}`;
    return this.decayModels.get(key) || null;
  }

  // Get platform reinforcement score
  getPlatformReinforcement(sourcePlatform: string, targetPlatform: string): number {
    return this.reinforcementMatrix.get(sourcePlatform)?.get(targetPlatform) || 0.3;
  }

  // Calculate citation half-life for content type
  getCitationHalfLife(platform: string, contentType: string): number {
    return this.calculateHalfLife(platform, contentType);
  }

  // Get quality normalization for citation
  getQualityNormalization(citation: CitationData): QualityNormalization {
    return this.calculateQualityNormalization(citation);
  }
} 