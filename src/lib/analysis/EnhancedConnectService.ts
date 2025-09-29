// Enhanced Connect Service
// Implements heartbeat interval tuning and cross-platform latency mapping

import OpenAIService from '@/lib/ai/OpenAIService';

interface PlatformHealth {
  platform: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  errorRate: number;
  lastCheck: number;
  degradationScore: number;
}

interface CrossPlatformLatencyMap {
  topology: Map<string, PlatformHealth>;
  criticalPaths: string[][];
  degradationAlerts: string[];
  recommendedActions: string[];
}

interface EnhancedConnectData {
  overall: {
    status: 'healthy' | 'degraded' | 'critical';
    score: number;
    trend: 'up' | 'down' | 'stable';
  };
  platformHealth: PlatformHealth[];
  latencyMap: CrossPlatformLatencyMap;
  heartbeatMetrics: {
    currentInterval: number;
    adaptiveInterval: number;
    errorRate: number;
    successRate: number;
  };
  recommendations: {
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    impact: string;
    estimatedTime: string;
  }[];
}

export class EnhancedConnectService {
  private aiService: OpenAIService;
  private platformHealth: Map<string, PlatformHealth> = new Map();
  private heartbeatIntervals: Map<string, number> = new Map();
  private degradationHistory: Map<string, number[]> = new Map();

  constructor() {
    this.aiService = new OpenAIService();
    this.initializePlatforms();
  }

  // Initialize platform health tracking
  private initializePlatforms(): void {
    const platforms = ['chatgpt', 'claude', 'perplexity', 'googleAI'];
    
    platforms.forEach(platform => {
      this.platformHealth.set(platform, {
        platform,
        status: 'healthy',
        latency: 100 + Math.random() * 200,
        errorRate: Math.random() * 0.1,
        lastCheck: Date.now(),
        degradationScore: 0
      });
      
      this.heartbeatIntervals.set(platform, 5000); // 5 seconds default
      this.degradationHistory.set(platform, []);
    });
  }

  // Adaptive heartbeat interval tuning
  private calculateAdaptiveInterval(platform: string, errorRate: number, latency: number): number {
    const baseInterval = 5000; // 5 seconds
    const maxInterval = 30000; // 30 seconds
    const minInterval = 1000; // 1 second
    
    // Adjust based on error rate
    let interval = baseInterval;
    if (errorRate > 0.05) {
      interval = Math.max(minInterval, interval * 0.5); // Tighten if high errors
    } else if (errorRate < 0.01) {
      interval = Math.min(maxInterval, interval * 1.5); // Loosen if low errors
    }
    
    // Adjust based on latency
    if (latency > 500) {
      interval = Math.max(minInterval, interval * 0.7); // Tighten if high latency
    } else if (latency < 100) {
      interval = Math.min(maxInterval, interval * 1.3); // Loosen if low latency
    }
    
    return Math.round(interval);
  }

  // Calculate degradation score for priority rerouting
  private calculateDegradationScore(platform: string): number {
    const health = this.platformHealth.get(platform);
    if (!health) return 0;
    
    const errorWeight = 0.4;
    const latencyWeight = 0.3;
    const historyWeight = 0.3;
    
    // Error rate component
    const errorScore = health.errorRate * 100;
    
    // Latency component (normalized to 0-100)
    const latencyScore = Math.min(100, (health.latency - 50) / 5);
    
    // Historical degradation component
    const history = this.degradationHistory.get(platform) || [];
    const recentDegradation = history.slice(-5).reduce((sum, val) => sum + val, 0) / 5;
    
    const degradationScore = (
      errorScore * errorWeight +
      latencyScore * latencyWeight +
      recentDegradation * historyWeight
    );
    
    return Math.min(100, Math.max(0, degradationScore));
  }

  // Update platform health status
  private updatePlatformHealth(platform: string, data: any): void {
    const currentHealth = this.platformHealth.get(platform);
    if (!currentHealth) return;
    
    // Update metrics
    currentHealth.latency = data.latency || currentHealth.latency;
    currentHealth.errorRate = data.errorRate || currentHealth.errorRate;
    currentHealth.lastCheck = Date.now();
    
    // Calculate degradation score
    currentHealth.degradationScore = this.calculateDegradationScore(platform);
    
    // Update status based on degradation score
    if (currentHealth.degradationScore > 70) {
      currentHealth.status = 'down';
    } else if (currentHealth.degradationScore > 30) {
      currentHealth.status = 'degraded';
    } else {
      currentHealth.status = 'healthy';
    }
    
    // Update adaptive heartbeat interval
    const newInterval = this.calculateAdaptiveInterval(
      platform, 
      currentHealth.errorRate, 
      currentHealth.latency
    );
    this.heartbeatIntervals.set(platform, newInterval);
    
    // Update degradation history
    const history = this.degradationHistory.get(platform) || [];
    history.push(currentHealth.degradationScore);
    if (history.length > 10) history.shift(); // Keep last 10 values
    this.degradationHistory.set(platform, history);
  }

  // Build cross-platform latency topology
  private buildLatencyTopology(): CrossPlatformLatencyMap {
    const topology = new Map<string, PlatformHealth>();
    const criticalPaths: string[][] = [];
    const degradationAlerts: string[] = [];
    const recommendedActions: string[] = [];
    
    // Build topology from platform health
    this.platformHealth.forEach((health, platform) => {
      topology.set(platform, health);
      
      // Identify critical paths (platforms that affect multiple others)
      if (health.status === 'degraded' || health.status === 'down') {
        criticalPaths.push([platform, 'critical']);
        degradationAlerts.push(`${platform} is experiencing issues (${health.degradationScore.toFixed(1)}% degradation)`);
      }
    });
    
    // Check for cross-platform degradation patterns
    const degradedPlatforms = Array.from(this.platformHealth.values())
      .filter(h => h.status === 'degraded' || h.status === 'down');
    
    if (degradedPlatforms.length >= 2) {
      const platforms = degradedPlatforms.map(h => h.platform);
      criticalPaths.push([...platforms, 'cross-platform']);
      degradationAlerts.push(`Multiple platforms (${platforms.join(', ')}) are degraded simultaneously`);
      recommendedActions.push('Implement failover routing to healthy platforms');
    }
    
    // Generate recommendations based on topology
    if (degradedPlatforms.length > 0) {
      const healthyPlatforms = Array.from(this.platformHealth.values())
        .filter(h => h.status === 'healthy');
      
      if (healthyPlatforms.length > 0) {
        recommendedActions.push(`Route traffic to healthy platforms: ${healthyPlatforms.map(h => h.platform).join(', ')}`);
      }
      
      recommendedActions.push('Monitor degradation patterns and adjust routing accordingly');
    }
    
    return {
      topology,
      criticalPaths,
      degradationAlerts,
      recommendedActions
    };
  }

  // Generate AI-powered recommendations
  private async generateRecommendations(latencyMap: CrossPlatformLatencyMap): Promise<any[]> {
    const recommendations = [];
    
    try {
      // Use AI to analyze connectivity patterns
      const aiRecommendations = await this.aiService.analyzeConnectivityIssues(latencyMap);
      recommendations.push(...aiRecommendations);
    } catch (error) {
      console.warn('AI recommendations generation failed:', error);
    }
    
    // Add system-generated recommendations
    latencyMap.degradationAlerts.forEach(alert => {
      recommendations.push({
        priority: 'critical' as const,
        action: `Address ${alert}`,
        impact: 'High',
        estimatedTime: 'Immediate'
      });
    });
    
    latencyMap.recommendedActions.forEach(action => {
      recommendations.push({
        priority: 'high' as const,
        action,
        impact: 'Medium',
        estimatedTime: '1-2 hours'
      });
    });
    
    return recommendations;
  }

  // Main connect analysis method
  async analyzeConnectivity(url: string, platformData: any): Promise<EnhancedConnectData> {
    console.log('Starting enhanced connectivity analysis for:', url);
    
    // Update platform health with new data
    Object.entries(platformData).forEach(([platform, data]: [string, any]) => {
      this.updatePlatformHealth(platform, data);
    });
    
    // Build latency topology
    const latencyMap = this.buildLatencyTopology();
    
    // Calculate overall health score
    const platformHealthArray = Array.from(this.platformHealth.values());
    const overallScore = 100 - (platformHealthArray.reduce((sum, h) => sum + h.degradationScore, 0) / platformHealthArray.length);
    
    // Determine overall status
    const degradedCount = platformHealthArray.filter(h => h.status === 'degraded' || h.status === 'down').length;
    let overallStatus: 'healthy' | 'degraded' | 'critical';
    
    if (degradedCount === 0) {
      overallStatus = 'healthy';
    } else if (degradedCount <= 2) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'critical';
    }
    
    // Calculate heartbeat metrics
    const currentInterval = Array.from(this.heartbeatIntervals.values()).reduce((sum, val) => sum + val, 0) / this.heartbeatIntervals.size;
    const adaptiveInterval = currentInterval;
    const errorRate = platformHealthArray.reduce((sum, h) => sum + h.errorRate, 0) / platformHealthArray.length;
    const successRate = 1 - errorRate;
    
    // Generate recommendations
    const recommendations = await this.generateRecommendations(latencyMap);
    
    const result: EnhancedConnectData = {
      overall: {
        status: overallStatus,
        score: Math.round(overallScore),
        trend: overallScore > 80 ? 'up' : overallScore > 60 ? 'stable' : 'down'
      },
      platformHealth: platformHealthArray,
      latencyMap,
      heartbeatMetrics: {
        currentInterval: Math.round(currentInterval),
        adaptiveInterval: Math.round(adaptiveInterval),
        errorRate: Math.round(errorRate * 100) / 100,
        successRate: Math.round(successRate * 100) / 100
      },
      recommendations
    };
    
    console.log('Enhanced Connect Results:', {
      overallStatus: result.overall.status,
      overallScore: result.overall.score,
      degradedPlatforms: degradedCount,
      recommendations: recommendations.length
    });
    
    return result;
  }

  // Get platform health for specific platform
  getPlatformHealth(platform: string): PlatformHealth | null {
    return this.platformHealth.get(platform) || null;
  }

  // Get current heartbeat interval for platform
  getHeartbeatInterval(platform: string): number {
    return this.heartbeatIntervals.get(platform) || 5000;
  }

  // Get degradation history for platform
  getDegradationHistory(platform: string): number[] {
    return this.degradationHistory.get(platform) || [];
  }

  // Force platform health update
  forceHealthUpdate(platform: string, healthData: any): void {
    this.updatePlatformHealth(platform, healthData);
  }
} 