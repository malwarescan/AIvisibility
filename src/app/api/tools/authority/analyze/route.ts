import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAuthorityService } from '@/lib/analysis/EnhancedAuthorityService';

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

    // Initialize Enhanced Authority service
    const authorityService = new EnhancedAuthorityService();
    
    // Analyze authority signals with enhanced features
    const analysis = await authorityService.analyzeAuthority(url, options || {});

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
      tool: 'authority',
      action: 'analyze'
    });

  } catch (error) {
    console.error('Authority API error:', error);
    
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
    message: 'Authority Signal Analysis API',
    tool: 'authority',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/authority/analyze - Analyze URL for authority signal optimization'
    },
    parameters: {
      url: 'string (required) - URL to analyze',
      options: 'object (optional) - Analysis options'
    }
  });
} 