// Core Schema Library
// Shared across all tools for schema.org/JSON-LD analysis, validation, and optimization

export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  value?: any;
  score?: number;
  suggestions?: string[];
}

export interface SchemaObject {
  '@type': string;
  [key: string]: any;
}

export interface SchemaAnalysis {
  type: string;
  completeness: number;
  quality: number;
  missingFields: string[];
  suggestions: string[];
  eligibleForRichResults: boolean;
  issues: string[];
}

export class SchemaAnalyzer {
  /**
   * Analyze a schema object for completeness, quality, and eligibility
   */
  static analyze(schema: SchemaObject): SchemaAnalysis {
    const type = schema['@type'] || 'Unknown';
    const requiredFields = this.getRequiredFields(type);
    const presentFields = Object.keys(schema);
    const missingFields = requiredFields.filter(f => !presentFields.includes(f));
    const completeness = (presentFields.length - 1) / (requiredFields.length || 1); // -1 for @type
    const quality = this.calculateQuality(schema, requiredFields);
    const suggestions = this.generateSuggestions(type, missingFields);
    const eligibleForRichResults = this.checkRichResultEligibility(type, presentFields);
    const issues = this.detectIssues(schema);

    return {
      type,
      completeness: Math.round(completeness * 100),
      quality: Math.round(quality * 100),
      missingFields,
      suggestions,
      eligibleForRichResults,
      issues
    };
  }

  /**
   * Get required fields for a schema type (simplified, extend as needed)
   */
  static getRequiredFields(type: string): string[] {
    switch (type.toLowerCase()) {
      case 'article':
        return ['@type', 'headline', 'author', 'datePublished', 'image', 'publisher'];
      case 'faqpage':
        return ['@type', 'mainEntity'];
      case 'howto':
        return ['@type', 'name', 'step'];
      case 'product':
        return ['@type', 'name', 'image', 'description', 'sku', 'offers'];
      default:
        return ['@type'];
    }
  }

  /**
   * Calculate quality score based on field presence and value quality
   */
  static calculateQuality(schema: SchemaObject, requiredFields: string[]): number {
    let score = 0;
    requiredFields.forEach(field => {
      if (schema[field]) {
        score += 1;
        if (typeof schema[field] === 'string' && schema[field].length > 10) score += 0.5;
        if (Array.isArray(schema[field]) && schema[field].length > 0) score += 0.5;
      }
    });
    return score / (requiredFields.length * 1.5);
  }

  /**
   * Generate field-level suggestions for missing or weak fields
   */
  static generateSuggestions(type: string, missingFields: string[]): string[] {
    return missingFields.map(field => `Add or improve the '${field}' field for better ${type} schema performance.`);
  }

  /**
   * Check if schema is eligible for rich results (simplified)
   */
  static checkRichResultEligibility(type: string, presentFields: string[]): boolean {
    switch (type.toLowerCase()) {
      case 'article':
        return presentFields.includes('headline') && presentFields.includes('image');
      case 'faqpage':
        return presentFields.includes('mainEntity');
      case 'howto':
        return presentFields.includes('step');
      case 'product':
        return presentFields.includes('offers');
      default:
        return false;
    }
  }

  /**
   * Detect common schema issues
   */
  static detectIssues(schema: SchemaObject): string[] {
    const issues: string[] = [];
    if (!schema['@type']) issues.push('Missing @type property');
    if (schema['@type'] && typeof schema['@type'] !== 'string') issues.push('@type should be a string');
    // Add more issue detection as needed
    return issues;
  }
}

/**
 * Utility: Validate if an object is a valid schema.org object
 */
export function isValidSchemaObject(obj: any): obj is SchemaObject {
  return obj && typeof obj === 'object' && typeof obj['@type'] === 'string';
}

/**
 * Utility: Suggest improvements for a schema object
 */
export function suggestSchemaImprovements(schema: SchemaObject): string[] {
  const analysis = SchemaAnalyzer.analyze(schema);
  return analysis.suggestions;
} 