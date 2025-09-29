import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAnalyticsService } from '@/lib/analysis/EnhancedAnalyticsService';

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

    // Initialize Enhanced Analytics service
    const analyticsService = new EnhancedAnalyticsService();
    
    // Analyze analytics with enhanced features
    const analysis = await analyticsService.analyzeAnalytics(url, options || {});

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
      tool: 'analytics',
      action: 'analyze'
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    
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
    message: 'Analytics Analysis API',
    tool: 'analytics',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/analytics/analyze - Analyze URL for AI search analytics'
    },
    parameters: {
      url: 'string (required) - URL to analyze',
      options: 'object (optional) - Analysis options'
    }
  });
} 