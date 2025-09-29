import { NextRequest, NextResponse } from 'next/server';
import { EnhancedQueryMindService } from '@/lib/analysis/EnhancedQueryMindService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, url } = body;

    if (!query || !url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query and URL are required' 
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

    // Initialize Enhanced QueryMind service
    const queryMindService = new EnhancedQueryMindService();
    
    // Analyze query with enhanced features
    const analysis = await queryMindService.analyzeQuery(query, url);

    return NextResponse.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('Enhanced QueryMind API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Enhanced query analysis failed' 
      },
      { status: 500 }
    );
  }
} 