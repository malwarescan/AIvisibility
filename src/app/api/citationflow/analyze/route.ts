import { NextRequest, NextResponse } from 'next/server';
import { CitationFlowService } from '@/lib/analysis/CitationFlowService';

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

    const citationFlowService = new CitationFlowService();
    const result = await citationFlowService.analyzeCitations(url);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('CitationFlow analysis error:', error);
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
    message: 'CitationFlow Analysis API',
    endpoints: {
      POST: '/api/citationflow/analyze - Analyze URL for citation flow predictions'
    }
  });
} 