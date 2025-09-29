import { AgenticSimulationService } from './AgenticSimulationService';
import { RLHFSearchOptimizer } from './RLHFSearchOptimizer';

export interface PlatformWeight {
  platform: 'chatgpt' | 'claude' | 'perplexity' | 'googleAI' | 'bing' | 'duckduckgo';
  baseWeight: number;
  currentWeight: number;
  driftFactor: number;
  lastUpdated: Date;
  confidence: number;
}

export interface ToolWeightConfig {
  toolId: string;
  toolName: string;
  platformWeights: PlatformWeight[];
  normalizationFactor: number;
  lastNormalized: Date;
}

export interface NormalizationResult {
  toolId: string;
  originalWeights: PlatformWeight[];
  normalizedWeights: PlatformWeight[];
  driftCorrection: number;
  confidence: number;
  timestamp: Date;
}

export class PlatformWeightNormalizer {
  private toolConfigs: Map<string, ToolWeightConfig> = new Map();
  private normalizationHistory: NormalizationResult[] = [];
  private globalWeights: PlatformWeight[] = [];

  constructor() {
    this.initializeGlobalWeights();
    this.initializeToolConfigs();
  }

  // Initialize global platform weights
  private initializeGlobalWeights() {
    this.globalWeights = [
      {
        platform: 'chatgpt',
        baseWeight: 1.0,
        currentWeight: 1.0,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.95
      },
      {
        platform: 'claude',
        baseWeight: 1.0,
        currentWeight: 1.0,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.95
      },
      {
        platform: 'perplexity',
        baseWeight: 1.0,
        currentWeight: 1.0,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.90
      },
      {
        platform: 'googleAI',
        baseWeight: 1.0,
        currentWeight: 1.0,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.92
      },
      {
        platform: 'bing',
        baseWeight: 0.8,
        currentWeight: 0.8,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.85
      },
      {
        platform: 'duckduckgo',
        baseWeight: 0.7,
        currentWeight: 0.7,
        driftFactor: 0.0,
        lastUpdated: new Date(),
        confidence: 0.80
      }
    ];
  }

  // Initialize tool configurations
  private initializeToolConfigs() {
    const tools = [
      'analytics', 'authority', 'auditor', 'connect', 
      'citationflow', 'querymind', 'agentrank', 'schema'
    ];

    tools.forEach(toolId => {
      const toolConfig: ToolWeightConfig = {
        toolId,
        toolName: this.getToolDisplayName(toolId),
        platformWeights: this.globalWeights.map(w => ({ ...w })),
        normalizationFactor: 1.0,
        lastNormalized: new Date()
      };
      this.toolConfigs.set(toolId, toolConfig);
    });
  }

  private getToolDisplayName(toolId: string): string {
    const names: Record<string, string> = {
      'analytics': 'Analytics',
      'authority': 'Authority',
      'auditor': 'Auditor',
      'connect': 'Connect',
      'citationflow': 'CitationFlow',
      'querymind': 'QueryMind',
      'agentrank': 'AgentRank',
      'schema': 'Schema Optimizer'
    };
    return names[toolId] || toolId;
  }

  // Normalize platform weights for a specific tool
  async normalizeToolWeights(toolId: string): Promise<NormalizationResult> {
    const toolConfig = this.toolConfigs.get(toolId);
    if (!toolConfig) {
      throw new Error(`Tool configuration not found for ${toolId}`);
    }

    // Calculate drift factors
    const driftFactors = this.calculateDriftFactors(toolConfig.platformWeights);
    
    // Apply normalization
    const normalizedWeights = this.applyNormalization(toolConfig.platformWeights, driftFactors);
    
    // Update tool configuration
    toolConfig.platformWeights = normalizedWeights;
    toolConfig.normalizationFactor = this.calculateNormalizationFactor(normalizedWeights);
    toolConfig.lastNormalized = new Date();

    // Create normalization result
    const result: NormalizationResult = {
      toolId,
      originalWeights: toolConfig.platformWeights.map(w => ({ ...w })),
      normalizedWeights: normalizedWeights,
      driftCorrection: this.calculateDriftCorrection(driftFactors),
      confidence: this.calculateConfidence(normalizedWeights),
      timestamp: new Date()
    };

    this.normalizationHistory.push(result);
    return result;
  }

  // Calculate drift factors for platform weights
  private calculateDriftFactors(weights: PlatformWeight[]): Map<string, number> {
    const driftFactors = new Map<string, number>();
    
    weights.forEach(weight => {
      const globalWeight = this.globalWeights.find(gw => gw.platform === weight.platform);
      if (globalWeight) {
        const drift = Math.abs(weight.currentWeight - globalWeight.currentWeight);
        const driftFactor = drift / globalWeight.currentWeight;
        driftFactors.set(weight.platform, driftFactor);
        weight.driftFactor = driftFactor;
      }
    });

    return driftFactors;
  }

  // Apply normalization to platform weights
  private applyNormalization(weights: PlatformWeight[], driftFactors: Map<string, number>): PlatformWeight[] {
    return weights.map(weight => {
      const driftFactor = driftFactors.get(weight.platform) || 0;
      const globalWeight = this.globalWeights.find(gw => gw.platform === weight.platform);
      
      if (globalWeight && driftFactor > 0.1) { // Only normalize if drift > 10%
        const correctionFactor = 1 - (driftFactor * 0.5); // Gradual correction
        const normalizedWeight = weight.currentWeight * correctionFactor;
        
        return {
          ...weight,
          currentWeight: Math.max(0.1, Math.min(2.0, normalizedWeight)), // Clamp between 0.1 and 2.0
          lastUpdated: new Date()
        };
      }
      
      return weight;
    });
  }

  // Calculate normalization factor
  private calculateNormalizationFactor(weights: PlatformWeight[]): number {
    const totalWeight = weights.reduce((sum, w) => sum + w.currentWeight, 0);
    const averageWeight = totalWeight / weights.length;
    return averageWeight;
  }

  // Calculate drift correction
  private calculateDriftCorrection(driftFactors: Map<string, number>): number {
    const totalDrift = Array.from(driftFactors.values()).reduce((sum, drift) => sum + drift, 0);
    return totalDrift / driftFactors.size;
  }

  // Calculate confidence in normalization
  private calculateConfidence(weights: PlatformWeight[]): number {
    const confidences = weights.map(w => w.confidence);
    return confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
  }

  // Update global weights based on performance data
  async updateGlobalWeights(performanceData: Array<{
    platform: string;
    performance: number;
    confidence: number;
  }>): Promise<void> {
    performanceData.forEach(data => {
      const globalWeight = this.globalWeights.find(w => w.platform === data.platform);
      if (globalWeight) {
        // Update weight based on performance
        const performanceFactor = data.performance / 100; // Normalize to 0-1
        const newWeight = globalWeight.baseWeight * (0.8 + performanceFactor * 0.4); // Scale between 0.8 and 1.2
        
        globalWeight.currentWeight = Math.max(0.5, Math.min(1.5, newWeight));
        globalWeight.confidence = data.confidence;
        globalWeight.lastUpdated = new Date();
      }
    });

    // Propagate changes to all tool configs
    this.propagateGlobalWeightChanges();
  }

  // Propagate global weight changes to all tools
  private propagateGlobalWeightChanges(): void {
    this.toolConfigs.forEach((toolConfig, toolId) => {
      toolConfig.platformWeights.forEach(weight => {
        const globalWeight = this.globalWeights.find(gw => gw.platform === weight.platform);
        if (globalWeight) {
          weight.currentWeight = globalWeight.currentWeight;
          weight.confidence = globalWeight.confidence;
          weight.lastUpdated = globalWeight.lastUpdated;
        }
      });
    });
  }

  // Get normalized weights for a tool
  getNormalizedWeights(toolId: string): PlatformWeight[] {
    const toolConfig = this.toolConfigs.get(toolId);
    return toolConfig ? toolConfig.platformWeights : [];
  }

  // Get all tool configurations
  getAllToolConfigs(): ToolWeightConfig[] {
    return Array.from(this.toolConfigs.values());
  }

  // Get normalization history
  getNormalizationHistory(): NormalizationResult[] {
    return this.normalizationHistory;
  }

  // Get global weights
  getGlobalWeights(): PlatformWeight[] {
    return this.globalWeights;
  }

  // Calculate tool-specific scoring with normalized weights
  calculateNormalizedScore(
    toolId: string, 
    platformScores: Record<string, number>
  ): number {
    const normalizedWeights = this.getNormalizedWeights(toolId);
    let totalScore = 0;
    let totalWeight = 0;

    normalizedWeights.forEach(weight => {
      const platformScore = platformScores[weight.platform] || 0;
      totalScore += platformScore * weight.currentWeight;
      totalWeight += weight.currentWeight;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  // Validate weight consistency across tools
  validateWeightConsistency(): {
    isConsistent: boolean;
    inconsistencies: Array<{
      toolId: string;
      platform: string;
      deviation: number;
    }>;
  } {
    const inconsistencies: Array<{
      toolId: string;
      platform: string;
      deviation: number;
    }> = [];

    this.toolConfigs.forEach((toolConfig, toolId) => {
      toolConfig.platformWeights.forEach(weight => {
        const globalWeight = this.globalWeights.find(gw => gw.platform === weight.platform);
        if (globalWeight) {
          const deviation = Math.abs(weight.currentWeight - globalWeight.currentWeight);
          if (deviation > 0.2) { // More than 20% deviation
            inconsistencies.push({
              toolId,
              platform: weight.platform,
              deviation
            });
          }
        }
      });
    });

    return {
      isConsistent: inconsistencies.length === 0,
      inconsistencies
    };
  }

  // Export weight configuration for external use
  exportWeightConfiguration(): {
    globalWeights: PlatformWeight[];
    toolConfigs: ToolWeightConfig[];
    lastUpdated: Date;
  } {
    return {
      globalWeights: this.globalWeights,
      toolConfigs: Array.from(this.toolConfigs.values()),
      lastUpdated: new Date()
    };
  }

  // Import weight configuration
  importWeightConfiguration(config: {
    globalWeights: PlatformWeight[];
    toolConfigs: ToolWeightConfig[];
  }): void {
    this.globalWeights = config.globalWeights;
    this.toolConfigs.clear();
    config.toolConfigs.forEach(toolConfig => {
      this.toolConfigs.set(toolConfig.toolId, toolConfig);
    });
  }
} 