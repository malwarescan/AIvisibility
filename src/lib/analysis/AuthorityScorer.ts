// Custom Authority Scoring Algorithm
import { WebsiteData } from '../crawler/WebCrawler'

export interface AuthorityScore {
  overall: number
  breakdown: {
    technical: number
    content: number
    aiOptimization: number
    backlinks: number
    freshness: number
    trust: number
  }
  weights: {
    technical: number
    content: number
    aiOptimization: number
    backlinks: number
    freshness: number
    trust: number
  }
  factors: string[]
}

export interface PlatformScore {
  score: number
  factors: string[]
}

export interface PlatformScores {
  chatgpt: PlatformScore
  claude: PlatformScore
  perplexity: PlatformScore
  googleAI: PlatformScore
}

export class AuthorityScorer {
  
  calculateOverallAuthority(websiteData: WebsiteData): AuthorityScore {
    const weights = {
      technical: 0.20,      // 20% - Core Web Vitals, performance
      content: 0.25,       // 25% - Quality, structure, readability  
      aiOptimization: 0.25, // 25% - AI-specific factors
      backlinks: 0.15,     // 15% - Link authority (custom analysis)
      freshness: 0.10,     // 10% - Content recency
      trust: 0.05          // 5% - Security, SSL, etc.
    }

    const scores = {
      technical: this.scoreTechnical(websiteData.technical),
      content: this.scoreContent(websiteData.content),
      aiOptimization: this.scoreAIFactors(websiteData.aiFactors),
      backlinks: this.scoreBacklinks(websiteData),
      freshness: this.scoreFreshness(websiteData.content),
      trust: this.scoreTrust(websiteData.security)
    }

    const weightedScore = Object.entries(scores).reduce((total, [key, score]) => {
      return total + (score * weights[key])
    }, 0)

    return {
      overall: Math.round(weightedScore),
      breakdown: scores,
      weights,
      factors: this.generateFactorAnalysis(scores, websiteData)
    }
  }

  scoreTechnical(technical: any): number {
    let score = 0
    const maxScore = 100

    // Core Web Vitals (40 points)
    const vitals = technical.coreWebVitals
    if (vitals.lcp && vitals.lcp < 2500) score += 15
    if (vitals.fid && vitals.fid < 100) score += 15
    if (vitals.cls && vitals.cls < 0.1) score += 10

    // Mobile optimization (20 points)
    if (technical.isMobileOptimized) score += 20

    // Image optimization (20 points)
    const images = technical.images
    if (images.total > 0) {
      const altRatio = images.withAlt / images.total
      const lazyRatio = images.lazyLoaded / images.total
      score += (altRatio * 10) + (lazyRatio * 10)
    }

    // Resource optimization (20 points)
    const resources = technical.resources
    if (resources.averageSize < 50000) score += 10 // Less than 50KB average
    if (resources.total < 20) score += 10 // Less than 20 resources

    return Math.min(maxScore, score)
  }

  scoreContent(content: any): number {
    let score = 0
    const maxScore = 100

    // Content length (25 points)
    if (content.wordCount >= 1000) score += 25
    else if (content.wordCount >= 500) score += 15
    else if (content.wordCount >= 200) score += 10

    // Readability (20 points)
    if (content.readabilityScore >= 70) score += 20
    else if (content.readabilityScore >= 50) score += 15
    else if (content.readabilityScore >= 30) score += 10

    // Structure (25 points)
    const headings = content.headingStructure
    if (headings.h1.length === 1) score += 10 // Single H1
    if (headings.h2.length >= 3) score += 10 // Multiple H2s
    if (headings.h3.length >= 2) score += 5 // Supporting H3s

    // Content quality (30 points)
    if (content.paragraphCount >= 10) score += 10
    if (content.listCount >= 2) score += 10
    if (content.imageCount >= 3) score += 10

    return Math.min(maxScore, score)
  }

  scoreAIFactors(aiFactors: any): number {
    let score = 0
    const maxScore = 100

    // Schema markup (30 points)
    if (aiFactors.schemaMarkup.count > 0) score += 30
    if (aiFactors.jsonLd.length > 0) score += 15
    
    // Content structure for AI (25 points)
    if (aiFactors.faqStructure.count > 0) score += 15
    if (aiFactors.tableData.count > 0) score += 10
    
    // Authority signals (25 points)
    score += Math.min(25, aiFactors.citations.count * 5)
    
    // Platform-specific optimization (20 points)
    const chatGPTScore = this.calculateChatGPTFactorScore(aiFactors.chatGPTFactors)
    const claudeScore = this.calculateClaudeFactorScore(aiFactors.claudeFactors)
    score += Math.min(10, chatGPTScore)
    score += Math.min(10, claudeScore)

    return Math.min(maxScore, score)
  }

  scoreBacklinks(websiteData: WebsiteData): number {
    let score = 0
    const maxScore = 100

    // External link analysis (40 points)
    const externalLinks = websiteData.aiFactors.externalReferences
    if (externalLinks.count >= 10) score += 20
    else if (externalLinks.count >= 5) score += 15
    else if (externalLinks.count >= 2) score += 10

    // Domain diversity (30 points)
    const uniqueDomains = externalLinks.domains.length
    if (uniqueDomains >= 8) score += 30
    else if (uniqueDomains >= 5) score += 20
    else if (uniqueDomains >= 3) score += 15

    // Authority domain links (30 points)
    const authorityDomains = this.getAuthorityDomains()
    const authorityLinks = externalLinks.links.filter(link => 
      authorityDomains.some(domain => link.domain.includes(domain))
    ).length
    score += Math.min(30, authorityLinks * 5)

    return Math.min(maxScore, score)
  }

  scoreFreshness(content: any): number {
    let score = 0
    const maxScore = 100

    // Content freshness (60 points)
    if (content.contentFreshness.isRecent) score += 60
    else if (content.contentFreshness.datesFound > 0) score += 30

    // Author information (40 points)
    if (content.authorCredentials.hasAuthor) score += 40

    return Math.min(maxScore, score)
  }

  scoreTrust(security: any): number {
    let score = 0
    const maxScore = 100

    // HTTPS (40 points)
    if (security.hasHttps) score += 40

    // Security headers (30 points)
    if (security.hasCSP) score += 15
    if (security.hasHSTS) score += 15

    // Additional security (30 points)
    if (security.hasXFrameOptions) score += 15
    if (security.hasReferrerPolicy) score += 15

    return Math.min(maxScore, score)
  }

  // Generate AI platform-specific scores
  generatePlatformScores(authorityScore: AuthorityScore, websiteData: WebsiteData): PlatformScores {
    const base = authorityScore.overall

    return {
      chatgpt: {
        score: this.calculateChatGPTScore(base, websiteData),
        factors: ['Content structure', 'FAQ format', 'Clear answers', 'Step-by-step content']
      },
      claude: {
        score: this.calculateClaudeScore(base, websiteData),
        factors: ['Technical accuracy', 'Citations', 'Comprehensive content', 'Academic tone']
      },
      perplexity: {
        score: this.calculatePerplexityScore(base, websiteData),
        factors: ['Source quality', 'Fresh content', 'Fact verification', 'Multiple references']
      },
      googleAI: {
        score: this.calculateGoogleAIScore(base, websiteData),
        factors: ['E-A-T signals', 'Technical SEO', 'User experience', 'Core Web Vitals']
      }
    }
  }

  calculateChatGPTScore(baseScore: number, websiteData: WebsiteData): number {
    let score = baseScore
    const aiFactors = websiteData.aiFactors

    // ChatGPT-specific bonuses
    if (aiFactors.faqStructure.count > 0) score += 10
    if (aiFactors.chatGPTFactors.hasStructuredData) score += 8
    if (aiFactors.chatGPTFactors.hasCodeExamples) score += 7
    if (aiFactors.chatGPTFactors.hasStepByStep) score += 5
    if (aiFactors.chatGPTFactors.hasDefinitions) score += 5

    return Math.min(100, score)
  }

  calculateClaudeScore(baseScore: number, websiteData: WebsiteData): number {
    let score = baseScore
    const aiFactors = websiteData.aiFactors

    // Claude-specific bonuses
    if (aiFactors.citations.count > 0) score += 12
    if (aiFactors.claudeFactors.hasCitations) score += 10
    if (aiFactors.claudeFactors.hasAcademicTone) score += 8
    if (aiFactors.claudeFactors.hasDetailedExplanations) score += 7
    if (aiFactors.claudeFactors.hasTechnicalDepth) score += 8

    return Math.min(100, score)
  }

  calculatePerplexityScore(baseScore: number, websiteData: WebsiteData): number {
    let score = baseScore
    const aiFactors = websiteData.aiFactors

    // Perplexity-specific bonuses
    if (aiFactors.perplexityFactors.hasRecentData) score += 10
    if (aiFactors.externalReferences.count > 5) score += 8
    if (aiFactors.perplexityFactors.hasFactualContent) score += 7
    if (aiFactors.perplexityFactors.hasDataVisualization) score += 5
    if (aiFactors.perplexityFactors.hasExpertOpinion) score += 5

    return Math.min(100, score)
  }

  calculateGoogleAIScore(baseScore: number, websiteData: WebsiteData): number {
    let score = baseScore
    const technical = websiteData.technical

    // Google AI-specific bonuses
    if (technical.coreWebVitals.lcp < 2500) score += 8
    if (technical.coreWebVitals.fid < 100) score += 8
    if (technical.coreWebVitals.cls < 0.1) score += 6
    if (technical.isMobileOptimized) score += 5
    if (websiteData.security.hasHttps) score += 5

    return Math.min(100, score)
  }

  calculateChatGPTFactorScore(factors: any): number {
    let score = 0
    if (factors.hasStructuredData) score += 3
    if (factors.hasFAQ) score += 3
    if (factors.hasCodeExamples) score += 2
    if (factors.hasStepByStep) score += 1
    if (factors.hasDefinitions) score += 1
    return score
  }

  calculateClaudeFactorScore(factors: any): number {
    let score = 0
    if (factors.hasCitations) score += 3
    if (factors.hasReferences) score += 3
    if (factors.hasAcademicTone) score += 2
    if (factors.hasDetailedExplanations) score += 1
    if (factors.hasTechnicalDepth) score += 1
    return score
  }

  generateFactorAnalysis(scores: any, websiteData: WebsiteData): string[] {
    const factors = []

    // Technical factors
    if (scores.technical >= 80) factors.push('Excellent technical performance')
    else if (scores.technical >= 60) factors.push('Good technical foundation')
    else factors.push('Technical improvements needed')

    // Content factors
    if (scores.content >= 80) factors.push('High-quality content structure')
    else if (scores.content >= 60) factors.push('Decent content quality')
    else factors.push('Content quality needs improvement')

    // AI optimization factors
    if (scores.aiOptimization >= 80) factors.push('Excellent AI optimization')
    else if (scores.aiOptimization >= 60) factors.push('Good AI compatibility')
    else factors.push('AI optimization opportunities')

    // Backlink factors
    if (scores.backlinks >= 80) factors.push('Strong external authority signals')
    else if (scores.backlinks >= 60) factors.push('Moderate external links')
    else factors.push('Limited external authority')

    // Freshness factors
    if (scores.freshness >= 80) factors.push('Recent and updated content')
    else if (scores.freshness >= 60) factors.push('Somewhat current content')
    else factors.push('Content may be outdated')

    // Trust factors
    if (scores.trust >= 80) factors.push('Strong security and trust signals')
    else if (scores.trust >= 60) factors.push('Basic security measures')
    else factors.push('Security improvements recommended')

    return factors
  }

  getAuthorityDomains(): string[] {
    return [
      'google.com', 'microsoft.com', 'apple.com', 'amazon.com',
      'facebook.com', 'twitter.com', 'linkedin.com', 'github.com',
      'stackoverflow.com', 'wikipedia.org', 'nytimes.com', 'bbc.com',
      'cnn.com', 'openai.com', 'anthropic.com', 'perplexity.ai',
      'arxiv.org', 'researchgate.net', 'scholar.google.com',
      'ieee.org', 'acm.org', 'springer.com', 'elsevier.com'
    ]
  }

  // Generate recommendations based on scores
  generateRecommendations(authorityScore: AuthorityScore, websiteData: WebsiteData): string[] {
    const recommendations = []
    const scores = authorityScore.breakdown

    // Technical recommendations
    if (scores.technical < 70) {
      recommendations.push('Improve Core Web Vitals for better performance')
      recommendations.push('Optimize images with proper alt tags and lazy loading')
      recommendations.push('Reduce resource loading time')
    }

    // Content recommendations
    if (scores.content < 70) {
      recommendations.push('Increase content length to at least 1000 words')
      recommendations.push('Improve heading structure with proper H1-H6 hierarchy')
      recommendations.push('Add more paragraphs and structured content')
    }

    // AI optimization recommendations
    if (scores.aiOptimization < 70) {
      recommendations.push('Add structured data markup (JSON-LD)')
      recommendations.push('Create FAQ sections for better AI understanding')
      recommendations.push('Include citations and references')
    }

    // Backlink recommendations
    if (scores.backlinks < 70) {
      recommendations.push('Build more external links to authoritative domains')
      recommendations.push('Increase link diversity across different domains')
      recommendations.push('Focus on quality over quantity for backlinks')
    }

    // Freshness recommendations
    if (scores.freshness < 70) {
      recommendations.push('Update content regularly with current information')
      recommendations.push('Add publication dates and author information')
      recommendations.push('Keep content relevant and timely')
    }

    // Trust recommendations
    if (scores.trust < 70) {
      recommendations.push('Ensure HTTPS is properly configured')
      recommendations.push('Add security headers (CSP, HSTS)')
      recommendations.push('Implement proper referrer policies')
    }

    return recommendations
  }
} 