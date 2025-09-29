import { NextRequest, NextResponse } from 'next/server';
import { SchemaAnalyzer } from '@/lib/core/schema';

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
    if (!schema['@type']) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid schema format - missing @type',
          code: 'INVALID_SCHEMA'
        },
        { status: 400 }
      );
    }

    // Analyze schema using core library
    const analysis = SchemaAnalyzer.analyze(schema);

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
      tool: 'schema',
      action: 'analyze'
    });

  } catch (error) {
    console.error('Schema Analysis API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Analysis failed',
        code: 'ANALYSIS_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Schema Analysis API',
    tool: 'schema',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/schema/analyze - Analyze JSON-LD schema for optimization'
    },
    parameters: {
      schema: 'object (required) - JSON-LD schema to analyze',
      options: 'object (optional) - Analysis options'
    }
  });
} 