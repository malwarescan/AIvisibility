import { NextRequest, NextResponse } from 'next/server';
import { EnhancedCitationFlowService } from '@/lib/analysis/EnhancedCitationFlowService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, options } = body;

    if (!url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL is required',
          code: 'MISSING_URL'
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid URL format',
          code: 'INVALID_URL'
        },
        { status: 400 }
      );
    }

    // Initialize Enhanced CitationFlow service
    const citationFlowService = new EnhancedCitationFlowService();
    
    // Analyze citation flow with enhanced features
    const analysis = await citationFlowService.analyzeCitationFlow(url, options || {});

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
      tool: 'citationflow',
      action: 'analyze'
    });

  } catch (error) {
    console.error('CitationFlow API error:', error);
    
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
    message: 'CitationFlow Analysis API',
    tool: 'citationflow',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/citationflow/analyze - Analyze URL for citation flow optimization'
    },
    parameters: {
      url: 'string (required) - URL to analyze',
      options: 'object (optional) - Analysis options'
    }
  });
} 