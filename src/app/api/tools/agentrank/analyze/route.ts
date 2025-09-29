import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAgentRankService } from '@/lib/analysis/EnhancedAgentRankService';

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

    // Initialize Enhanced AgentRank service
    const agentRankService = new EnhancedAgentRankService();
    
    // Analyze content with enhanced features
    const analysis = await agentRankService.analyzeContent(url);

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
      tool: 'agentrank',
      action: 'analyze'
    });

  } catch (error) {
    console.error('AgentRank API error:', error);
    
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
    message: 'AgentRank Analysis API',
    tool: 'agentrank',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/agentrank/analyze - Analyze URL for AI agent predictions'
    },
    parameters: {
      url: 'string (required) - URL to analyze',
      options: 'object (optional) - Analysis options'
    }
  });
} 