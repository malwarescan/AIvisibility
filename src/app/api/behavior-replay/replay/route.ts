import { NextRequest, NextResponse } from 'next/server';
import { StructuredBehaviorReplay } from '@/lib/ai/StructuredBehaviorReplay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, platform, config } = body;

    if (!url || !platform) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: url, platform' 
        },
        { status: 400 }
      );
    }

    // Initialize behavior replay system
    const behaviorReplay = new StructuredBehaviorReplay();

    // Replay behavior
    const replaySession = await behaviorReplay.replayBehavior(
      url,
      platform,
      config
    );

    return NextResponse.json({
      success: true,
      result: {
        replaySession,
        totalLogs: behaviorReplay.getBehaviorLogs().length,
        totalSessions: behaviorReplay.getReplaySessions().length
      }
    });

  } catch (error) {
    console.error('Behavior replay error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Behavior replay failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const platform = searchParams.get('platform');

    const behaviorReplay = new StructuredBehaviorReplay();
    const sessions = behaviorReplay.getReplaySessions();

    // Filter sessions if URL or platform specified
    let filteredSessions = sessions;
    if (url) {
      filteredSessions = filteredSessions.filter(session => session.url === url);
    }
    if (platform) {
      filteredSessions = filteredSessions.filter(session => session.platform === platform);
    }

    return NextResponse.json({
      success: true,
      result: {
        sessions: filteredSessions,
        totalSessions: sessions.length,
        filteredCount: filteredSessions.length
      }
    });

  } catch (error) {
    console.error('Failed to get replay data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get replay data' 
      },
      { status: 500 }
    );
  }
} 