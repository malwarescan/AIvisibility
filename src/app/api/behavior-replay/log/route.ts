import { NextRequest, NextResponse } from 'next/server';
import { StructuredBehaviorReplay } from '@/lib/ai/StructuredBehaviorReplay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, query, response, metadata } = body;

    if (!platform || !url || !query || !response) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: platform, url, query, response' 
        },
        { status: 400 }
      );
    }

    // Initialize behavior replay system
    const behaviorReplay = new StructuredBehaviorReplay();

    // Log the behavior
    const behaviorLog = await behaviorReplay.logBehavior(
      platform,
      url,
      query,
      response,
      metadata
    );

    return NextResponse.json({
      success: true,
      result: {
        behaviorLog,
        totalLogs: behaviorReplay.getBehaviorLogs().length
      }
    });

  } catch (error) {
    console.error('Behavior logging error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Behavior logging failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const url = searchParams.get('url');

    const behaviorReplay = new StructuredBehaviorReplay();
    const logs = behaviorReplay.getBehaviorLogs();

    // Filter logs if platform or URL specified
    let filteredLogs = logs;
    if (platform) {
      filteredLogs = filteredLogs.filter(log => log.platform === platform);
    }
    if (url) {
      filteredLogs = filteredLogs.filter(log => log.url === url);
    }

    return NextResponse.json({
      success: true,
      result: {
        logs: filteredLogs,
        totalLogs: logs.length,
        filteredCount: filteredLogs.length
      }
    });

  } catch (error) {
    console.error('Failed to get behavior data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get behavior data' 
      },
      { status: 500 }
    );
  }
} 