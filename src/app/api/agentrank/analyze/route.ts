import { NextRequest, NextResponse } from 'next/server';
import { AgentRankService } from '@/lib/analysis/AgentRankService';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const agentRankService = new AgentRankService();
    const result = await agentRankService.analyzeContent(url);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('AgentRank analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
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