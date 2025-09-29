import OpenAIService from './OpenAIService';

export interface BehaviorLog {
  id: string;
  timestamp: Date;
  platform: 'chatgpt' | 'claude' | 'perplexity' | 'googleAI' | 'bing' | 'duckduckgo';
  url: string;
  query: string;
  response: string;
  reasoning: string;
  confidence: number;
  citationCount: number;
  answerInclusion: boolean;
  userFeedback?: number; // 1-5 scale
  metadata: {
    responseTime: number;
    tokenCount: number;
    modelVersion: string;
    temperature: number;
    maxTokens: number;
  };
}

export interface BehaviorPattern {
  id: string;
  patternType: 'citation_style' | 'reasoning_approach' | 'response_structure' | 'confidence_level';
  platform: string;
  frequency: number;
  examples: BehaviorLog[];
  confidence: number;
  lastObserved: Date;
}

export interface ReplaySession {
  id: string;
  url: string;
  platform: string;
  originalLogs: BehaviorLog[];
  replayedLogs: BehaviorLog[];
  patternMatches: BehaviorPattern[];
  accuracy: number;
  timestamp: Date;
}

export interface ReplayConfig {
  maxLogs: number;
  timeWindow: number; // days
  minConfidence: number;
  patternThreshold: number;
  includeMetadata: boolean;
}

export class StructuredBehaviorReplay {
  private openAIService: OpenAIService;
  private behaviorLogs: BehaviorLog[] = [];
  private behaviorPatterns: BehaviorPattern[] = [];
  private replaySessions: ReplaySession[] = [];

  constructor() {
    this.openAIService = new OpenAIService();
  }

  // Log a behavior from an AI platform
  async logBehavior(
    platform: string,
    url: string,
    query: string,
    response: string,
    metadata?: Partial<BehaviorLog['metadata']>
  ): Promise<BehaviorLog> {
    const behaviorLog: BehaviorLog = {
      id: `behavior_${platform}_${Date.now()}`,
      timestamp: new Date(),
      platform: platform as any,
      url,
      query,
      response,
      reasoning: await this.extractReasoning(response),
      confidence: await this.calculateConfidence(response),
      citationCount: this.countCitations(response),
      answerInclusion: this.detectAnswerInclusion(response),
      metadata: {
        responseTime: metadata?.responseTime || Math.random() * 5000 + 1000,
        tokenCount: response.split(' ').length,
        modelVersion: metadata?.modelVersion || 'latest',
        temperature: metadata?.temperature || 0.7,
        maxTokens: metadata?.maxTokens || 2000
      }
    };

    this.behaviorLogs.push(behaviorLog);
    await this.updateBehaviorPatterns(behaviorLog);
    
    return behaviorLog;
  }

  // Extract reasoning from AI response
  private async extractReasoning(response: string): Promise<string> {
    try {
      const prompt = `
Extract the reasoning process from this AI response:

Response: ${response}

Provide the reasoning in a structured format.
`;

      const result = await this.openAIService.analyzeForSpecificPlatform(
        prompt,
        'reasoning_extraction',
        'reasoning'
      );

      return result.substring(0, 500);
    } catch (error) {
      console.error('Failed to extract reasoning:', error);
      return 'Reasoning extraction failed';
    }
  }

  // Calculate confidence in the response
  private async calculateConfidence(response: string): Promise<number> {
    try {
      const prompt = `
Assess the confidence level of this AI response (0-1):

Response: ${response}

Consider:
- Factual accuracy
- Completeness
- Clarity
- Citation quality

Return only a number between 0 and 1.
`;

      const result = await this.openAIService.analyzeForSpecificPlatform(
        prompt,
        'confidence_assessment',
        'confidence'
      );

      const confidenceMatch = result.match(/(\d*\.?\d+)/);
      return confidenceMatch ? Math.min(1, Math.max(0, parseFloat(confidenceMatch[1]))) : 0.7;
    } catch (error) {
      console.error('Failed to calculate confidence:', error);
      return 0.7;
    }
  }

  // Count citations in response
  private countCitations(response: string): number {
    const citationPatterns = [
      /\[[^\]]+\]/g,           // [citation]
      /\([^)]+\)/g,            // (citation)
      /https?:\/\/[^\s]+/g,    // URLs
      /"([^"]+)"/g,            // Quoted sources
      /according to [^,\.]+/gi, // "according to" patterns
      /source: [^,\.]+/gi       // "source:" patterns
    ];

    let totalCitations = 0;
    citationPatterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches) {
        totalCitations += matches.length;
      }
    });

    return totalCitations;
  }

  // Detect if response includes a direct answer
  private detectAnswerInclusion(response: string): boolean {
    const answerIndicators = [
      /the answer is/i,
      /here's what/i,
      /based on/i,
      /i found/i,
      /according to/i,
      /the result is/i,
      /this shows/i
    ];

    return answerIndicators.some(pattern => pattern.test(response));
  }

  // Update behavior patterns based on new log
  private async updateBehaviorPatterns(log: BehaviorLog): Promise<void> {
    // Citation style pattern
    await this.updateCitationStylePattern(log);
    
    // Reasoning approach pattern
    await this.updateReasoningApproachPattern(log);
    
    // Response structure pattern
    await this.updateResponseStructurePattern(log);
    
    // Confidence level pattern
    await this.updateConfidencePattern(log);
  }

  // Update citation style patterns
  private async updateCitationStylePattern(log: BehaviorLog): Promise<void> {
    const citationStyle = this.analyzeCitationStyle(log.response);
    const existingPattern = this.behaviorPatterns.find(
      p => p.patternType === 'citation_style' && p.platform === log.platform
    );

    if (existingPattern) {
      existingPattern.frequency += 1;
      existingPattern.examples.push(log);
      existingPattern.lastObserved = new Date();
    } else {
      const newPattern: BehaviorPattern = {
        id: `pattern_citation_${log.platform}_${Date.now()}`,
        patternType: 'citation_style',
        platform: log.platform,
        frequency: 1,
        examples: [log],
        confidence: log.confidence,
        lastObserved: new Date()
      };
      this.behaviorPatterns.push(newPattern);
    }
  }

  // Analyze citation style in response
  private analyzeCitationStyle(response: string): string {
    if (response.match(/\[[^\]]+\]/g)) return 'bracket_citations';
    if (response.match(/\([^)]+\)/g)) return 'parenthetical_citations';
    if (response.match(/https?:\/\/[^\s]+/g)) return 'url_citations';
    if (response.match(/"([^"]+)"/g)) return 'quoted_sources';
    return 'no_citations';
  }

  // Update reasoning approach patterns
  private async updateReasoningApproachPattern(log: BehaviorLog): Promise<void> {
    const reasoningApproach = this.analyzeReasoningApproach(log.reasoning);
    const existingPattern = this.behaviorPatterns.find(
      p => p.patternType === 'reasoning_approach' && p.platform === log.platform
    );

    if (existingPattern) {
      existingPattern.frequency += 1;
      existingPattern.examples.push(log);
      existingPattern.lastObserved = new Date();
    } else {
      const newPattern: BehaviorPattern = {
        id: `pattern_reasoning_${log.platform}_${Date.now()}`,
        patternType: 'reasoning_approach',
        platform: log.platform,
        frequency: 1,
        examples: [log],
        confidence: log.confidence,
        lastObserved: new Date()
      };
      this.behaviorPatterns.push(newPattern);
    }
  }

  // Analyze reasoning approach
  private analyzeReasoningApproach(reasoning: string): string {
    if (reasoning.includes('step by step')) return 'step_by_step';
    if (reasoning.includes('first, then')) return 'sequential';
    if (reasoning.includes('on the other hand')) return 'comparative';
    if (reasoning.includes('because')) return 'causal';
    return 'general';
  }

  // Update response structure patterns
  private async updateResponseStructurePattern(log: BehaviorLog): Promise<void> {
    const responseStructure = this.analyzeResponseStructure(log.response);
    const existingPattern = this.behaviorPatterns.find(
      p => p.patternType === 'response_structure' && p.platform === log.platform
    );

    if (existingPattern) {
      existingPattern.frequency += 1;
      existingPattern.examples.push(log);
      existingPattern.lastObserved = new Date();
    } else {
      const newPattern: BehaviorPattern = {
        id: `pattern_structure_${log.platform}_${Date.now()}`,
        patternType: 'response_structure',
        platform: log.platform,
        frequency: 1,
        examples: [log],
        confidence: log.confidence,
        lastObserved: new Date()
      };
      this.behaviorPatterns.push(newPattern);
    }
  }

  // Analyze response structure
  private analyzeResponseStructure(response: string): string {
    const paragraphs = response.split('\n\n').length;
    const sentences = response.split(/[.!?]+/).length;
    const wordCount = response.split(' ').length;

    if (paragraphs > 3) return 'detailed_paragraphs';
    if (sentences > 10) return 'long_sentences';
    if (wordCount > 200) return 'comprehensive';
    if (wordCount < 50) return 'concise';
    return 'standard';
  }

  // Update confidence patterns
  private async updateConfidencePattern(log: BehaviorLog): Promise<void> {
    const confidenceLevel = this.analyzeConfidenceLevel(log.confidence);
    const existingPattern = this.behaviorPatterns.find(
      p => p.patternType === 'confidence_level' && p.platform === log.platform
    );

    if (existingPattern) {
      existingPattern.frequency += 1;
      existingPattern.examples.push(log);
      existingPattern.lastObserved = new Date();
    } else {
      const newPattern: BehaviorPattern = {
        id: `pattern_confidence_${log.platform}_${Date.now()}`,
        patternType: 'confidence_level',
        platform: log.platform,
        frequency: 1,
        examples: [log],
        confidence: log.confidence,
        lastObserved: new Date()
      };
      this.behaviorPatterns.push(newPattern);
    }
  }

  // Analyze confidence level
  private analyzeConfidenceLevel(confidence: number): string {
    if (confidence > 0.8) return 'high_confidence';
    if (confidence > 0.6) return 'medium_confidence';
    if (confidence > 0.4) return 'low_confidence';
    return 'very_low_confidence';
  }

  // Replay behavior patterns for a URL
  async replayBehavior(
    url: string,
    platform: string,
    config: ReplayConfig = {
      maxLogs: 10,
      timeWindow: 30,
      minConfidence: 0.6,
      patternThreshold: 0.5,
      includeMetadata: true
    }
  ): Promise<ReplaySession> {
    // Get relevant logs
    const relevantLogs = this.getRelevantLogs(url, platform, config);
    
    // Get behavior patterns
    const patterns = this.getBehaviorPatterns(platform, config);
    
    // Generate replayed logs
    const replayedLogs = await this.generateReplayedLogs(relevantLogs, patterns, config);
    
    // Calculate accuracy
    const accuracy = this.calculateReplayAccuracy(relevantLogs, replayedLogs);
    
    // Create replay session
    const session: ReplaySession = {
      id: `replay_${platform}_${Date.now()}`,
      url,
      platform,
      originalLogs: relevantLogs,
      replayedLogs,
      patternMatches: patterns,
      accuracy,
      timestamp: new Date()
    };

    this.replaySessions.push(session);
    return session;
  }

  // Get relevant logs for replay
  private getRelevantLogs(url: string, platform: string, config: ReplayConfig): BehaviorLog[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.timeWindow);

    return this.behaviorLogs
      .filter(log => 
        log.platform === platform &&
        log.url === url &&
        log.timestamp >= cutoffDate &&
        log.confidence >= config.minConfidence
      )
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, config.maxLogs);
  }

  // Get behavior patterns for platform 
  private getBehaviorPatterns(platform: string, config: ReplayConfig): BehaviorPattern[] {
    return this.behaviorPatterns
      .filter(pattern => 
        pattern.platform === platform &&
        pattern.frequency >= config.patternThreshold &&
        pattern.confidence >= config.minConfidence
      )
      .sort((a, b) => b.frequency - a.frequency);
  }

  // Generate replayed logs based on patterns
  private async generateReplayedLogs(
    originalLogs: BehaviorLog[],
    patterns: BehaviorPattern[],
    config: ReplayConfig
  ): Promise<BehaviorLog[]> {
    const replayedLogs: BehaviorLog[] = [];

    for (const log of originalLogs) {
      const replayedLog: BehaviorLog = {
        ...log,
        id: `replayed_${log.id}`,
        timestamp: new Date(),
        response: await this.generateReplayedResponse(log, patterns),
        reasoning: await this.generateReplayedReasoning(log, patterns),
        confidence: this.calculateReplayedConfidence(log, patterns),
        citationCount: this.calculateReplayedCitations(log, patterns),
        answerInclusion: this.calculateReplayedAnswerInclusion(log, patterns),
        metadata: config.includeMetadata ? log.metadata : {
          responseTime: log.metadata.responseTime,
          tokenCount: log.metadata.tokenCount,
          modelVersion: log.metadata.modelVersion,
          temperature: log.metadata.temperature,
          maxTokens: log.metadata.maxTokens
        }
      };

      replayedLogs.push(replayedLog);
    }

    return replayedLogs;
  }

  // Generate replayed response
  private async generateReplayedResponse(log: BehaviorLog, patterns: BehaviorPattern[]): Promise<string> {
    const structurePattern = patterns.find(p => p.patternType === 'response_structure');
    const citationPattern = patterns.find(p => p.patternType === 'citation_style');

    let response = log.response;

    // Apply structure pattern
    if (structurePattern) {
      response = this.applyStructurePattern(response, structurePattern);
    }

    // Apply citation pattern
    if (citationPattern) {
      response = this.applyCitationPattern(response, citationPattern);
    }

    return response;
  }

  // Apply structure pattern to response
  private applyStructurePattern(response: string, pattern: BehaviorPattern): string {
    const structure = this.analyzeResponseStructure(response);
    const targetStructure = this.analyzeResponseStructure(pattern.examples[0]?.response || response);

    if (structure !== targetStructure) {
      // Modify response structure based on pattern
      if (targetStructure === 'detailed_paragraphs') {
        return response.split('.').map(s => s.trim()).filter(s => s).join('.\n\n');
      } else if (targetStructure === 'concise') {
        return response.split('.')[0] + '.';
      }
    }

    return response;
  }

  // Apply citation pattern to response
  private applyCitationPattern(response: string, pattern: BehaviorPattern): string {
    const citationStyle = this.analyzeCitationStyle(response);
    const targetStyle = this.analyzeCitationStyle(pattern.examples[0]?.response || response);

    if (citationStyle !== targetStyle) {
      // Modify citation style based on pattern
      if (targetStyle === 'bracket_citations') {
        return response.replace(/\(([^)]+)\)/g, '[$1]');
      } else if (targetStyle === 'parenthetical_citations') {
        return response.replace(/\[([^\]]+)\]/g, '($1)');
      }
    }

    return response;
  }

  // Generate replayed reasoning
  private async generateReplayedReasoning(log: BehaviorLog, patterns: BehaviorPattern[]): Promise<string> {
    const reasoningPattern = patterns.find(p => p.patternType === 'reasoning_approach');
    
    if (reasoningPattern) {
      const approach = this.analyzeReasoningApproach(log.reasoning);
      const targetApproach = this.analyzeReasoningApproach(reasoningPattern.examples[0]?.reasoning || log.reasoning);
      
      if (approach !== targetApproach) {
        return this.applyReasoningApproach(log.reasoning, targetApproach);
      }
    }
    
    return log.reasoning;
  }

  // Apply reasoning approach
  private applyReasoningApproach(reasoning: string, targetApproach: string): string {
    switch (targetApproach) {
      case 'step_by_step':
        return `Step by step analysis: ${reasoning}`;
      case 'sequential':
        return `First, ${reasoning}. Then, we can conclude.`;
      case 'comparative':
        return `On one hand, ${reasoning}. On the other hand, we must consider alternatives.`;
      case 'causal':
        return `This is because ${reasoning}.`;
      default:
        return reasoning;
    }
  }

  // Calculate replayed confidence
  private calculateReplayedConfidence(log: BehaviorLog, patterns: BehaviorPattern[]): number {
    const confidencePattern = patterns.find(p => p.patternType === 'confidence_level');
    
    if (confidencePattern) {
      const level = this.analyzeConfidenceLevel(log.confidence);
      const targetLevel = this.analyzeConfidenceLevel(confidencePattern.examples[0]?.confidence || log.confidence);
      
      if (level !== targetLevel) {
        switch (targetLevel) {
          case 'high_confidence':
            return Math.min(1, log.confidence * 1.2);
          case 'medium_confidence':
            return Math.max(0.4, Math.min(0.8, log.confidence));
          case 'low_confidence':
            return Math.max(0.2, log.confidence * 0.8);
          default:
            return log.confidence;
        }
      }
    }
    
    return log.confidence;
  }

  // Calculate replayed citations
  private calculateReplayedCitations(log: BehaviorLog, patterns: BehaviorPattern[]): number {
    const citationPattern = patterns.find(p => p.patternType === 'citation_style');
    
    if (citationPattern) {
      const style = this.analyzeCitationStyle(log.response);
      const targetStyle = this.analyzeCitationStyle(citationPattern.examples[0]?.response || log.response);
      
      if (style !== targetStyle) {
        // Adjust citation count based on pattern
        const avgCitations = citationPattern.examples.reduce((sum, ex) => sum + ex.citationCount, 0) / citationPattern.examples.length;
        return Math.round(avgCitations);
      }
    }
    
    return log.citationCount;
  }

  // Calculate replayed answer inclusion
  private calculateReplayedAnswerInclusion(log: BehaviorLog, patterns: BehaviorPattern[]): boolean {
    // Use pattern to determine answer inclusion probability
    const inclusionRate = patterns.reduce((sum, pattern) => {
      const included = pattern.examples.filter(ex => ex.answerInclusion).length;
      return sum + (included / pattern.examples.length);
    }, 0) / Math.max(patterns.length, 1);

    return Math.random() < inclusionRate;
  }

  // Calculate replay accuracy
  private calculateReplayAccuracy(originalLogs: BehaviorLog[], replayedLogs: BehaviorLog[]): number {
    if (originalLogs.length === 0) return 0;

    let totalAccuracy = 0;
    for (let i = 0; i < originalLogs.length && i < replayedLogs.length; i++) {
      const original = originalLogs[i];
      const replayed = replayedLogs[i];
      
      // Compare various metrics
      const confidenceDiff = Math.abs(original.confidence - replayed.confidence);
      const citationDiff = Math.abs(original.citationCount - replayed.citationCount);
      const answerInclusionMatch = original.answerInclusion === replayed.answerInclusion ? 1 : 0;
      
      const accuracy = (1 - confidenceDiff) * 0.4 + (1 - citationDiff / 10) * 0.3 + answerInclusionMatch * 0.3;
      totalAccuracy += accuracy;
    }

    return totalAccuracy / Math.min(originalLogs.length, replayedLogs.length);
  }

  // Get behavior logs
  getBehaviorLogs(): BehaviorLog[] {
    return this.behaviorLogs;
  }
  // Get behavior patterns
  private getAllBehaviorPatterns(): BehaviorPattern[] {
    return this.behaviorPatterns;
  }

  // Get replay sessions
  getReplaySessions(): ReplaySession[] {
    return this.replaySessions;
  }

  // Clear old data
  clearOldData(daysOld: number = 90): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    this.behaviorLogs = this.behaviorLogs.filter(log => log.timestamp >= cutoffDate);
    this.behaviorPatterns = this.behaviorPatterns.filter(pattern => pattern.lastObserved >= cutoffDate);
    this.replaySessions = this.replaySessions.filter(session => session.timestamp >= cutoffDate);
  }
} 