import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAgentRankService } from '@/lib/analysis/EnhancedAgentRankService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL is required' 
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
          error: 'Invalid URL format' 
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
      data: analysis
    });

  } catch (error) {
    console.error('Enhanced AgentRank API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Enhanced analysis failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AgentRank Analysis API',
    endpoints: {
      POST: '/api/agentrank/analyze - Analyze URL for AI agent predictions'
    }
  });
} 