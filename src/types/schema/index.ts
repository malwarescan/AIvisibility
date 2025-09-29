// AI Search Schema Optimizer Types

export interface SchemaAnalysisRequest {
  url: string
  content?: string
  options?: {
    includeStructuredData?: boolean
    includeMicrodata?: boolean
    includeJSONLD?: boolean
    includeRDFa?: boolean
    includeOpenGraph?: boolean
    includeTwitterCards?: boolean
  }
}

export interface SchemaAnalysisResult {
  url: string
  timestamp: Date
  overallScore: number
  schemaTypes: SchemaType[]
  recommendations: SchemaRecommendation[]
  aiOptimization: AIOptimizationScore
  platformScores: PlatformSchemaScores
  technicalAnalysis: TechnicalSchemaAnalysis
  extractedSchemas: StructuredDataMarkup[]
  schemaVersions?: SchemaVersion[]
  qualityScore?: SchemaQualityScore
  schemaDiff?: SchemaDiff
}

export interface SchemaType {
  type: string
  score: number
  implementation: 'present' | 'missing' | 'partial'
  properties: SchemaProperty[]
  aiRelevance: number
  recommendations: string[]
}

export interface SchemaProperty {
  name: string
  value: string
  required: boolean
  present: boolean
  aiOptimized: boolean
  score: number
}

export interface SchemaRecommendation {
  priority: 'high' | 'medium' | 'low'
  category: 'missing' | 'optimization' | 'enhancement' | 'ai-specific'
  title: string
  description: string
  implementation: string
  impact: number
  effort: 'low' | 'medium' | 'high'
}

export interface AIOptimizationScore {
  overall: number
  conversationalQueries: number
  entityRecognition: number
  knowledgeGraph: number
  semanticSearch: number
  structuredData: number
}

export interface PlatformSchemaScores {
  chatgpt: number
  claude: number
  perplexity: number
  googleAI: number
  bingAI: number
  duckDuckGo: number
}

export interface TechnicalSchemaAnalysis {
  structuredDataCount: number
  jsonLdCount: number
  microdataCount: number
  rdfaCount: number
  openGraphCount: number
  twitterCardsCount: number
  validationErrors: SchemaValidationError[]
  performanceImpact: number
}

export interface SchemaValidationError {
  type: 'syntax' | 'semantic' | 'missing' | 'invalid'
  message: string
  location: string
  severity: 'error' | 'warning' | 'info'
  fix: string
}

export interface SchemaOptimizationJob {
  url: string
  userId?: string
  priority?: 'low' | 'normal' | 'high'
  options?: SchemaAnalysisRequest['options']
}

export interface SchemaOptimizationResult {
  url: string
  userId?: string
  analysis: SchemaAnalysisResult
  status: 'completed' | 'failed' | 'processing'
  error?: string
}

// Schema Markup Types
export interface StructuredDataMarkup {
  type: 'json-ld' | 'microdata' | 'rdfa'
  content: string
  schemaType: string
  properties: Record<string, any>
  aiOptimized: boolean
}

export interface OpenGraphMarkup {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  siteName?: string
  aiOptimized: boolean
}

export interface TwitterCardMarkup {
  card?: string
  title?: string
  description?: string
  image?: string
  creator?: string
  site?: string
  aiOptimized: boolean
}

// AI-Specific Schema Types
export interface AISchemaEntity {
  name: string
  type: string
  properties: Record<string, any>
  relationships: string[]
  confidence: number
}

export interface ConversationalQuery {
  query: string
  intent: string
  entities: AISchemaEntity[]
  schemaMatch: number
  optimization: string[]
}

export interface KnowledgeGraphNode {
  entity: string
  type: string
  properties: Record<string, any>
  relationships: KnowledgeGraphRelationship[]
  aiRelevance: number
}

export interface KnowledgeGraphRelationship {
  source: string
  target: string
  type: string
  properties: Record<string, any>
}

// Schema Generation Types
export interface SchemaGenerationRequest {
  url: string
  content: string
  businessType: string
  targetAudience: string
  aiPlatforms: string[]
  schemaTypes: string[]
}

export interface GeneratedSchema {
  type: string
  markup: string
  properties: Record<string, any>
  aiOptimization: string[]
  implementation: string
  validation: SchemaValidationResult
}

export interface SchemaValidationResult {
  valid: boolean
  errors: SchemaValidationError[]
  warnings: SchemaValidationError[]
  score: number
}

// Real-time Analysis Types
export interface SchemaAnalysisProgress {
  jobId: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number
  currentStep: string
  estimatedTime: number
  result?: SchemaAnalysisResult
}

// Schema Reverse Engineer Types
export interface SchemaVersion {
  id: string
  timestamp: Date
  version: string
  schemas: StructuredDataMarkup[]
  changes: SchemaChange[]
  qualityScore: SchemaQualityScore
}

export interface SchemaQualityScore {
  overallScore: number
  keywordUsage: number
  intentMatch: number
  completeness: number
  llmReadability: number
  aiOptimization: number
  factors: {
    keywordDensity: number
    semanticRelevance: number
    structuralCompleteness: number
    conversationalFlow: number
    entityRecognition: number
  }
}

export interface SchemaDiff {
  previousVersion: string
  currentVersion: string
  changes: SchemaChange[]
  summary: {
    added: number
    removed: number
    modified: number
    total: number
  }
}

export interface SchemaChange {
  type: 'added' | 'removed' | 'modified'
  field: string
  description: string
  timestamp: Date
  impact: 'low' | 'medium' | 'high'
  details: {
    oldValue?: string
    newValue?: string
    schemaType?: string
    property?: string
  }
}

 