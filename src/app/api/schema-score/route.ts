import { NextRequest, NextResponse } from 'next/server';
import { SchemaScoreTracker } from '@/lib/analysis/SchemaScoreTracker';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL parameter is required',
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

    // Initialize Schema Score Tracker
    const schemaTracker = new SchemaScoreTracker();
    
    // Get the latest schema score for the URL
    const scoreHistory = await schemaTracker.getSchemaHistory(url, 1);
    const latestScore = scoreHistory[0];
    
    if (!latestScore) {
      // If no historical data exists, return a default response
      return NextResponse.json({
        success: true,
        data: {
          aiOptimizationScore: 75,
          qualityScore: 75,
          completenessScore: 75,
          validation: 'unknown',
          platformScores: {
            chatgpt: 75,
            claude: 75,
            perplexity: 75,
            google: 75
          },
          trend: {
            change: '0%',
            status: 'stable'
          },
          lastUpdated: new Date().toISOString(),
          message: 'No historical data available for this URL'
        }
      });
    }

    // Get trend data
    const trend = await schemaTracker.calculateTrend(url, 30);
    
    // Calculate trend change
    let trendChange = '0%';
    let trendStatus: 'improving' | 'declining' | 'stable' = 'stable';
    
    if (trend) {
      trendChange = `${trend.changePercent >= 0 ? '+' : ''}${trend.changePercent.toFixed(0)}%`;
      trendStatus = trend.trend;
    } else if (scoreHistory.length >= 2) {
      const recentScores = scoreHistory.slice(0, 2);
      const change = recentScores[0].aiOptimizationScore - recentScores[1].aiOptimizationScore;
      trendChange = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
      trendStatus = change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable';
    }

    // Get platform scores from the latest score
    const platformScores = latestScore.platformScores || {
      chatgpt: 75,
      claude: 75,
      perplexity: 75,
      google: 75
    };

    return NextResponse.json({
      success: true,
      data: {
        aiOptimizationScore: latestScore.aiOptimizationScore,
        qualityScore: latestScore.qualityScore,
        completenessScore: latestScore.completenessScore,
        validation: latestScore.validationStatus,
        platformScores,
        trend: {
          change: trendChange,
          status: trendStatus
        },
        lastUpdated: latestScore.timestamp.toISOString()
      }
    });

  } catch (error) {
    console.error('Schema Score API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to retrieve schema score',
        code: 'SCHEMA_SCORE_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({
    message: 'Schema Score API',
    endpoints: {
      GET: '/api/schema-score?url=<url> - Get latest schema optimization insights for a URL'
    },
    parameters: {
      url: 'string (required) - URL to get schema score for'
    },
    response: {
      aiOptimizationScore: 'number - AI optimization score (0-100)',
      qualityScore: 'number - Schema quality score (0-100)',
      completenessScore: 'number - Schema completeness score (0-100)',
      validation: 'string - Validation status (valid/invalid/unknown)',
      platformScores: 'object - Platform-specific scores',
      trend: 'object - Trend information with change and status',
      lastUpdated: 'string - ISO timestamp of last update'
    }
  });
} 