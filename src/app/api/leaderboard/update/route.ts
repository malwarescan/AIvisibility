import { NextRequest, NextResponse } from 'next/server';
import { AgentPerformanceLeaderboard } from '@/lib/ai/AgentPerformanceLeaderboard';
import { StructuredBehaviorReplay } from '@/lib/ai/StructuredBehaviorReplay';
import { PlatformWeightNormalizer } from '@/lib/ai/PlatformWeightNormalizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, title, config } = body;

    // Initialize systems
    const behaviorReplay = new StructuredBehaviorReplay();
    const weightNormalizer = new PlatformWeightNormalizer();
    const leaderboard = new AgentPerformanceLeaderboard(
      behaviorReplay,
      weightNormalizer,
      config
    );

    let result;

    if (url) {
      // Update specific page performance
      const pagePerformance = await leaderboard.updatePagePerformance(url, title);
      result = {
        pagePerformance,
        message: 'Page performance updated successfully'
      };
    } else {
      // Update entire leaderboard
      const leaderboardEntries = await leaderboard.updateLeaderboard();
      const metrics = leaderboard.getPerformanceMetrics();
      
      result = {
        leaderboard: leaderboardEntries,
        metrics,
        message: 'Leaderboard updated successfully'
      };
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Leaderboard update error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Leaderboard update failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const includeHistorical = searchParams.get('historical') === 'true';
    const daysBack = parseInt(searchParams.get('daysBack') || '7');

    // Initialize systems
    const behaviorReplay = new StructuredBehaviorReplay();
    const weightNormalizer = new PlatformWeightNormalizer();
    const leaderboard = new AgentPerformanceLeaderboard(
      behaviorReplay,
      weightNormalizer
    );

    let result;

    if (url) {
      // Get specific page performance
      const pagePerformance = leaderboard.getPagePerformance(url);
      if (!pagePerformance) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Page performance not found' 
          },
          { status: 404 }
        );
      }
      
      result = {
        pagePerformance,
        message: 'Page performance retrieved successfully'
      };
    } else {
      // Get current leaderboard and metrics
      const currentLeaderboard = leaderboard.getCurrentLeaderboard();
      const metrics = leaderboard.getPerformanceMetrics();
      
      result = {
        leaderboard: currentLeaderboard,
        metrics,
        message: 'Leaderboard data retrieved successfully'
      };

      // Include historical data if requested
      if (includeHistorical) {
        const historicalLeaderboard = leaderboard.getHistoricalLeaderboard(daysBack);
        result.historical = historicalLeaderboard;
      }
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Failed to get leaderboard data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get leaderboard data' 
      },
      { status: 500 }
    );
  }
} 