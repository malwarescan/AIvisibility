import { NextRequest, NextResponse } from 'next/server';
import { SchemaAnalyzer, isValidSchemaObject } from '@/lib/core/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schema, options } = body;

    if (!schema) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Schema is required',
          code: 'MISSING_SCHEMA'
        },
        { status: 400 }
      );
    }

    // Validate schema format
    if (!isValidSchemaObject(schema)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid schema format - must be a valid JSON-LD object with @type',
          code: 'INVALID_SCHEMA_FORMAT'
        },
        { status: 400 }
      );
    }

    // Analyze schema using core library
    const analysis = SchemaAnalyzer.analyze(schema);

    // Generate validation results
    const validation = {
      isValid: analysis.issues.length === 0,
      issues: analysis.issues,
      warnings: analysis.suggestions,
      score: analysis.quality,
      completeness: analysis.completeness,
      eligibleForRichResults: analysis.eligibleForRichResults,
      missingFields: analysis.missingFields,
      recommendations: analysis.suggestions
    };

    return NextResponse.json({
      success: true,
      data: {
        validation,
        analysis,
        schema: {
          type: schema['@type'],
          fields: Object.keys(schema).length,
          properties: Object.keys(schema)
        }
      },
      timestamp: new Date().toISOString(),
      tool: 'schema',
      action: 'validate'
    });

  } catch (error) {
    console.error('Schema validation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Schema validation failed',
        code: 'VALIDATION_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Schema Validation API',
    tool: 'schema',
    action: 'validate',
    endpoints: {
      POST: '/api/tools/schema/validate - Validate JSON-LD schema'
    },
    parameters: {
      schema: 'object (required) - JSON-LD schema to validate',
      options: 'object (optional) - Validation options'
    },
    validationChecks: [
      'Schema format validation',
      'Required fields check',
      'Rich result eligibility',
      'Quality scoring',
      'Completeness analysis'
    ]
  });
} 