export interface URLData {
  id: string;
  url: string;
  query: string;
  status: 'pending' | 'analyzing' | 'success' | 'error';
  schemas?: ParsedSchema[];
  error?: string;
  analyzedAt?: Date;
}

export interface ParsedSchema {
  type: string;
  properties: Record<string, unknown>;
  nested?: ParsedSchema[];
  source: string;
  path?: string;
}

export interface SchemaNode {
  id: string;
  type: string;
  properties: Record<string, unknown>;
  children?: SchemaNode[];
  isExpanded?: boolean;
  path: string;
}

export interface SchemaAnalysis {
  totalSchemas: number;
  schemaTypes: string[];
  commonProperties: string[];
  richElements: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  recommendations: string[];
}

export interface GeneratedSchema {
  jsonLd: string;
  schemaTypes: string[];
  validation: ValidationResult;
  suggestions: string[];
  metadata: {
    sourceUrls: string[];
    generatedAt: Date;
    complexity: string;
    aiGenerated?: boolean;
    intentType?: string;
    targetQuery?: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export interface UserContent {
  title?: string;
  description?: string;
  images?: string[];
  ratings?: {
    value: number;
    count: number;
  };
  prices?: {
    currency: string;
    value: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  customFields?: Record<string, unknown>;
}

export interface SchemaExtractionResult {
  schemas: ParsedSchema[];
  analysis: SchemaAnalysis;
  rawHtml?: string;
  extractionErrors?: string[];
}

export interface SchemaGenerationOptions {
  mergeSimilarTypes: boolean;
  includeRichElements: boolean;
  enhanceWithAI: boolean;
  userContent?: UserContent;
  targetSchemaTypes?: string[];
} 