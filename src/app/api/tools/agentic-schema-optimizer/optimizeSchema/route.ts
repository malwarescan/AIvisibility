import { NextRequest, NextResponse } from 'next/server';
import { create } from 'jsondiffpatch';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { competitorSchema, userSchema, options } = body;

    if (!competitorSchema || !userSchema) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Both competitorSchema and userSchema are required',
          code: 'MISSING_SCHEMAS'
        },
        { status: 400 }
      );
    }

    // Validate schema format
    if (!competitorSchema['@type'] || !userSchema['@type']) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid schema format - missing @type',
          code: 'INVALID_SCHEMA_FORMAT'
        },
        { status: 400 }
      );
    }

    // Generate diff and merge schemas
    const diffpatch = create();
    const diff = diffpatch.diff(competitorSchema, userSchema);
    
    // Merge: userSchema takes precedence, but fill missing fields from competitorSchema
    const mergedSchema = { ...competitorSchema, ...userSchema };

    // Calculate optimization metrics
    const originalFields = Object.keys(userSchema).length;
    const optimizedFields = Object.keys(mergedSchema).length;
    const improvement = ((optimizedFields - originalFields) / originalFields) * 100;

    return NextResponse.json({
      success: true,
      data: {
        diff,
        mergedSchema,
        optimization: {
          originalFields,
          optimizedFields,
          improvement: Math.round(improvement * 100) / 100,
          newFields: optimizedFields - originalFields
        }
      },
      timestamp: new Date().toISOString(),
      tool: 'agentic-schema-optimizer',
      action: 'optimizeSchema'
    });

  } catch (error) {
    console.error('Schema optimization error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Schema optimization failed',
        code: 'OPTIMIZATION_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Schema Optimization API',
    tool: 'agentic-schema-optimizer',
    action: 'optimizeSchema',
    endpoints: {
      POST: '/api/tools/agentic-schema-optimizer/optimizeSchema - Optimize schema using competitor analysis'
    },
    parameters: {
      competitorSchema: 'object (required) - Competitor schema to analyze',
      userSchema: 'object (required) - User schema to optimize',
      options: 'object (optional) - Optimization options'
    }
  });
} 