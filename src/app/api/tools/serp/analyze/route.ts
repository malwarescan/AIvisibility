import { NextRequest, NextResponse } from 'next/server';
import { SERPAnalyzer, SERPFetcher } from '@/lib/core/serp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, country, options } = body;

    if (!query) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query is required',
          code: 'MISSING_QUERY'
        },
        { status: 400 }
      );
    }

    // Fetch SERP data
    const serpResults = await SERPFetcher.fetchSERP(query, country || 'us');
    
    if (serpResults.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No SERP results found',
          code: 'NO_RESULTS'
        },
        { status: 404 }
      );
    }

    // Analyze SERP using core library
    const analysis = SERPAnalyzer.analyzeSERP(serpResults, query);
    const patterns = SERPAnalyzer.extractSchemaPatterns(serpResults);

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        patterns,
        results: serpResults
      },
      timestamp: new Date().toISOString(),
      tool: 'serp',
      action: 'analyze'
    });

  } catch (error) {
    console.error('SERP Analysis API error:', error);
    
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
    message: 'SERP Analysis API',
    tool: 'serp',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/serp/analyze - Analyze SERP results for optimization opportunities'
    },
    parameters: {
      query: 'string (required) - Search query to analyze',
      country: 'string (optional) - Country code for SERP data',
      options: 'object (optional) - Analysis options'
    }
  });
} 