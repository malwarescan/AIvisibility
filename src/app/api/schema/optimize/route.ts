import { NextRequest, NextResponse } from 'next/server';

// Schema validation types
interface SchemaError {
  path: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  fix?: {
    type: 'add' | 'modify' | 'remove';
    value?: any;
    description: string;
  };
}

interface SchemaValidationResult {
  isValid: boolean;
  errors: SchemaError[];
  warnings: SchemaError[];
  suggestions: SchemaError[];
  score: number;
}

interface SchemaOptimizationRequest {
  schema: any;
  url: string;
  goal?: string;
}

interface SchemaOptimizationResponse {
  success: boolean;
  optimizedSchema: any;
  validation: SchemaValidationResult;
  improvements: string[];
  error?: string;
}

// Common schema validation rules
const validationRules = {
  required: {
    Article: ['@type', 'headline', 'author', 'datePublished'],
    Organization: ['@type', 'name'],
    WebPage: ['@type', 'name', 'url'],
    Product: ['@type', 'name', 'description'],
    FAQPage: ['@type', 'mainEntity'],
    BreadcrumbList: ['@type', 'itemListElement']
  },
  recommended: {
    Article: ['description', 'image', 'publisher', 'dateModified'],
    Organization: ['url', 'logo', 'description'],
    WebPage: ['description', 'breadcrumb', 'mainEntity'],
    Product: ['image', 'brand', 'offers', 'aggregateRating'],
    FAQPage: ['description', 'publisher'],
    BreadcrumbList: ['name']
  },
  typeRestrictions: {
    author: ['Person', 'Organization'],
    publisher: ['Organization', 'Person'],
    mainEntity: ['Article', 'Product', 'FAQPage', 'WebPage'],
    breadcrumb: ['BreadcrumbList'],
    offers: ['Offer'],
    aggregateRating: ['AggregateRating']
  }
};

// Schema validation function
function validateSchema(schema: any, url: string): SchemaValidationResult {
  const errors: SchemaError[] = [];
  const warnings: SchemaError[] = [];
  const suggestions: SchemaError[] = [];
  let score = 100;

  // Basic structure validation
  if (!schema || typeof schema !== 'object') {
    errors.push({
      path: 'root',
      message: 'Schema must be a valid JSON object',
      severity: 'error'
    });
    return { isValid: false, errors, warnings, suggestions, score: 0 };
  }

  // Check for @context
  if (!schema['@context']) {
    errors.push({
      path: '@context',
      message: 'Missing @context property',
      severity: 'error',
      fix: {
        type: 'add',
        value: 'https://schema.org',
        description: 'Add schema.org context'
      }
    });
    score -= 20;
  } else if (schema['@context'] !== 'https://schema.org') {
    warnings.push({
      path: '@context',
      message: 'Consider using https://schema.org as context',
      severity: 'warning',
      fix: {
        type: 'modify',
        value: 'https://schema.org',
        description: 'Update to schema.org context'
      }
    });
    score -= 5;
  }

  // Check for @type
  if (!schema['@type']) {
    errors.push({
      path: '@type',
      message: 'Missing @type property',
      severity: 'error',
      fix: {
        type: 'add',
        value: 'WebPage',
        description: 'Add appropriate @type'
      }
    });
    score -= 25;
  } else {
    const schemaType = schema['@type'];
    
    // Validate required properties for the schema type
    const requiredProps = validationRules.required[schemaType as keyof typeof validationRules.required] || [];
    const recommendedProps = validationRules.recommended[schemaType as keyof typeof validationRules.recommended] || [];

    requiredProps.forEach(prop => {
      if (!schema[prop]) {
        errors.push({
          path: prop,
          message: `Missing required property: ${prop}`,
          severity: 'error',
          fix: {
            type: 'add',
            value: getDefaultValue(prop, schemaType),
            description: `Add ${prop} property`
          }
        });
        score -= 15;
      }
    });

    recommendedProps.forEach(prop => {
      if (!schema[prop]) {
        suggestions.push({
          path: prop,
          message: `Consider adding recommended property: ${prop}`,
          severity: 'info',
          fix: {
            type: 'add',
            value: getDefaultValue(prop, schemaType),
            description: `Add ${prop} for better SEO`
          }
        });
        score -= 5;
      }
    });

    // Validate property types
    Object.entries(schema).forEach(([key, value]) => {
      if (key.startsWith('@')) return; // Skip @context, @type, etc.

      const typeRestrictions = validationRules.typeRestrictions[key as keyof typeof validationRules.typeRestrictions];
      if (typeRestrictions && typeof value === 'object' && value['@type']) {
        if (!typeRestrictions.includes(value['@type'])) {
          warnings.push({
            path: key,
            message: `${key} should be of type: ${typeRestrictions.join(', ')}`,
            severity: 'warning',
            fix: {
              type: 'modify',
              description: `Update ${key} to use correct type`
            }
          });
          score -= 10;
        }
      }
    });
  }

  // Check for common issues
  if (schema.name && typeof schema.name === 'string' && schema.name.length > 60) {
    warnings.push({
      path: 'name',
      message: 'Name is too long (max 60 characters recommended)',
      severity: 'warning',
      fix: {
        type: 'modify',
        description: 'Shorten name to 60 characters or less'
      }
    });
    score -= 5;
  }

  if (schema.description && typeof schema.description === 'string' && schema.description.length > 160) {
    warnings.push({
      path: 'description',
      message: 'Description is too long (max 160 characters recommended)',
      severity: 'warning',
      fix: {
        type: 'modify',
        description: 'Shorten description to 160 characters or less'
      }
    });
    score -= 5;
  }

  // Check for missing URL
  if (!schema.url && schemaType !== 'Person' && schemaType !== 'Organization') {
    suggestions.push({
      path: 'url',
      message: 'Consider adding URL property',
      severity: 'info',
      fix: {
        type: 'add',
        value: url,
        description: 'Add URL property'
      }
    });
    score -= 5;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
    score: Math.max(0, score)
  };
}

// Get default values for missing properties
function getDefaultValue(property: string, schemaType: string): any {
  const defaults: Record<string, any> = {
    name: 'Page Title',
    description: 'Page description',
    url: 'https://example.com',
    author: {
      '@type': 'Person',
      name: 'Author Name'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Organization Name'
    },
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    image: 'https://example.com/image.jpg',
    logo: 'https://example.com/logo.png'
  };

  return defaults[property] || '';
}

// Apply fixes to schema
function applyFixes(schema: any, fixes: SchemaError[]): any {
  const fixedSchema = JSON.parse(JSON.stringify(schema));

  fixes.forEach(fix => {
    if (fix.fix) {
      switch (fix.fix.type) {
        case 'add':
          if (fix.fix.value !== undefined) {
            fixedSchema[fix.path] = fix.fix.value;
          }
          break;
        case 'modify':
          if (fix.fix.value !== undefined) {
            fixedSchema[fix.path] = fix.fix.value;
          }
          break;
        case 'remove':
          delete fixedSchema[fix.path];
          break;
      }
    }
  });

  return fixedSchema;
}

// Optimize schema based on goal
function optimizeSchema(schema: any, goal: string, url: string): any {
  const optimized = JSON.parse(JSON.stringify(schema));

  switch (goal) {
    case 'chatgpt-browsing':
      // Optimize for ChatGPT browsing mode
      if (optimized['@type'] === 'Article') {
        optimized.dateModified = optimized.dateModified || new Date().toISOString().split('T')[0];
        optimized.publisher = optimized.publisher || {
          '@type': 'Organization',
          name: 'Your Organization'
        };
      }
      break;

    case 'claude-web':
      // Optimize for Claude web search
      if (!optimized.description) {
        optimized.description = 'Comprehensive information about this topic';
      }
      if (optimized['@type'] === 'Article') {
        optimized.articleSection = optimized.articleSection || 'General';
      }
      break;

    case 'perplexity-citation':
      // Optimize for Perplexity citations
      if (optimized['@type'] === 'Article') {
        optimized.author = optimized.author || {
          '@type': 'Person',
          name: 'Author Name',
          url: url
        };
        optimized.citation = optimized.citation || [];
      }
      break;

    case 'google-ai-overview':
      // Optimize for Google AI Overviews
      if (optimized['@type'] === 'Article') {
        optimized.mainEntityOfPage = optimized.mainEntityOfPage || {
          '@type': 'WebPage',
          '@id': url
        };
        optimized.publisher = optimized.publisher || {
          '@type': 'Organization',
          name: 'Your Organization',
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png'
          }
        };
      }
      break;

    case 'voice-search':
      // Optimize for voice search
      if (optimized['@type'] === 'FAQPage') {
        if (!Array.isArray(optimized.mainEntity)) {
          optimized.mainEntity = [];
        }
      }
      if (optimized['@type'] === 'Article') {
        optimized.speakable = optimized.speakable || {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', 'p']
        };
      }
      break;
  }

  return optimized;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: SchemaOptimizationRequest = await request.json();
    const { schema, url, goal } = body;

    if (!schema || !url) {
      return NextResponse.json({
        success: false,
        error: 'Schema and URL are required'
      });
    }

    // Validate the original schema
    const validation = validateSchema(schema, url);

    // Optimize schema based on goal
    const optimizedSchema = goal ? optimizeSchema(schema, goal, url) : schema;

    // Validate the optimized schema
    const optimizedValidation = validateSchema(optimizedSchema, url);

    // Generate improvements list
    const improvements: string[] = [];
    
    if (optimizedValidation.score > validation.score) {
      improvements.push(`Schema score improved from ${validation.score} to ${optimizedValidation.score}`);
    }
    
    if (goal) {
      improvements.push(`Optimized for ${goal.replace('-', ' ')}`);
    }

    if (optimizedValidation.errors.length < validation.errors.length) {
      improvements.push(`Fixed ${validation.errors.length - optimizedValidation.errors.length} errors`);
    }

    if (optimizedValidation.warnings.length < validation.warnings.length) {
      improvements.push(`Resolved ${validation.warnings.length - optimizedValidation.warnings.length} warnings`);
    }

    return NextResponse.json({
      success: true,
      optimizedSchema,
      validation: optimizedValidation,
      improvements,
      originalValidation: validation
    });

  } catch (error) {
    console.error('Schema optimization error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to optimize schema'
    });
  }
}

// GET endpoint for validation only
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const schemaParam = searchParams.get('schema');
    const urlParam = searchParams.get('url');

    if (!schemaParam || !urlParam) {
      return NextResponse.json({
        success: false,
        error: 'Schema and URL parameters are required'
      });
    }

    const schema = JSON.parse(schemaParam);
    const validation = validateSchema(schema, urlParam);

    return NextResponse.json({
      success: true,
      validation
    });

  } catch (error) {
    console.error('Schema validation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to validate schema'
    });
  }
} 