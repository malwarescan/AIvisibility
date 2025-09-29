import { NextRequest, NextResponse } from 'next/server';
import OpenAIService from '@/lib/ai/OpenAIService';

// Type definitions for request and response
interface SchemaOptimizerRequest {
  mode: 'analyze' | 'optimize' | 'generate';
  schema?: string;
  content?: string;
  type?: string;
}

interface AnalysisResult {
  qualityScore: number;
  completenessScore: number;
  aiOptimizationScore: number;
  issues: Array<{
    type: 'error' | 'warning' | 'suggestion';
    field: string;
    message: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  strengths: string[];
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    implementation: string;
    expectedImpact: number;
  }>;
}

interface OptimizedSchemaResult {
  optimizedSchema: string;
  improvements: Array<{
    field: string;
    originalValue: unknown;
    optimizedValue: unknown;
    reason: string;
    impact: number;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  aiOptimization: {
    chatgptScore: number;
    claudeScore: number;
    perplexityScore: number;
    googleScore: number;
  };
}

interface GeneratedSchemaResult {
  generatedSchema: string;
  schemaType: string;
  fields: Array<{
    field: string;
    value: unknown;
    importance: 'required' | 'recommended' | 'optional';
    description: string;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  optimization: {
    richResultsEligibility: boolean;
    aiConsumptionScore: number;
    seoScore: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SchemaOptimizerRequest = await request.json();
    const { mode, schema, content, type } = body;

    // Validate required fields based on mode
    if (!mode) {
      return NextResponse.json({
        success: false,
        error: 'Mode is required. Must be "analyze", "optimize", or "generate"'
      }, { status: 400 });
    }

    // Initialize OpenAI service
    const openAIService = new OpenAIService();

    console.log(`Schema Optimizer API called with mode: ${mode}`);

    // Route to appropriate method based on mode
    switch (mode) {
      case 'analyze':
        if (!schema) {
          return NextResponse.json({
            success: false,
            error: 'Schema is required for analysis mode'
          }, { status: 400 });
        }
        return await handleAnalyze(openAIService, schema);

      case 'optimize':
        if (!schema) {
          return NextResponse.json({
            success: false,
            error: 'Schema is required for optimization mode'
          }, { status: 400 });
        }
        return await handleOptimize(openAIService, schema);

      case 'generate':
        if (!content || !type) {
          return NextResponse.json({
            success: false,
            error: 'Content and type are required for generation mode'
          }, { status: 400 });
        }
        return await handleGenerate(openAIService, content, type);

      default:
        return NextResponse.json({
          success: false,
          error: `Invalid mode: ${mode}. Must be "analyze", "optimize", or "generate"`
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Schema Optimizer API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process schema optimization request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function handleAnalyze(openAIService: OpenAIService, schema: string): Promise<NextResponse> {
  try {
    console.log('Starting schema analysis...');
    
    const analysisResult: AnalysisResult = await openAIService.analyzeSchema(schema);
    
    console.log('Schema analysis completed successfully');
    
    return NextResponse.json({
      success: true,
      data: analysisResult,
      mode: 'analyze'
    });

  } catch (error) {
    console.error('Schema Analysis Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze schema',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function handleOptimize(openAIService: OpenAIService, schema: string): Promise<NextResponse> {
  try {
    console.log('Starting schema optimization...');
    
    const optimizationResult: OptimizedSchemaResult = await openAIService.optimizeSchema(schema);
    
    console.log('Schema optimization completed successfully');
    
    return NextResponse.json({
      success: true,
      data: optimizationResult,
      mode: 'optimize'
    });

  } catch (error) {
    console.error('Schema Optimization Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to optimize schema',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function handleGenerate(openAIService: OpenAIService, content: string, type: string): Promise<NextResponse> {
  try {
    console.log(`Starting schema generation for type: ${type}...`);
    
    const generationResult: GeneratedSchemaResult = await openAIService.generateSchema(content, type);
    
    console.log('Schema generation completed successfully');
    
    return NextResponse.json({
      success: true,
      data: generationResult,
      mode: 'generate'
    });

  } catch (error) {
    console.error('Schema Generation Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate schema',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 