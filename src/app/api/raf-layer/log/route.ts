import { NextRequest, NextResponse } from 'next/server';
import { RealAgentFeedbackLayer } from '@/lib/ai/RealAgentFeedbackLayer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      platform, 
      query, 
      result, 
      sourceUsed, 
      sourceUrl, 
      citationFrequency, 
      snippetInclusion, 
      answerUsagePattern, 
      confidence, 
      responseTime, 
      tokenCount, 
      metadata 
    } = body;

    if (!platform || !query || !result) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: platform, query, result' 
        },
        { status: 400 }
      );
    }

    // Initialize RAF Layer
    const rafLayer = new RealAgentFeedbackLayer();

    // Log the interaction
    const interaction = await rafLayer.logInteraction({
      platform,
      query,
      result,
      sourceUsed: sourceUsed || false,
      sourceUrl,
      citationFrequency: citationFrequency || 0,
      snippetInclusion: snippetInclusion || false,
      answerUsagePattern: answerUsagePattern || 'none',
      confidence: confidence || 0.7,
      responseTime: responseTime || 2000,
      tokenCount: tokenCount || result.split(' ').length,
      metadata: metadata || {
        modelVersion: 'latest',
        temperature: 0.7,
        maxTokens: 2000
      }
    });

    return NextResponse.json({
      success: true,
      result: {
        interaction,
        totalInteractions: rafLayer.getInteractions().length,
        scoringWeights: rafLayer.getScoringWeights(),
        feedbackAnalyses: rafLayer.getFeedbackAnalyses()
      }
    });

  } catch (error) {
    console.error('RAF Layer logging error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'RAF Layer logging failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const runRegression = searchParams.get('regression') === 'true';

    const rafLayer = new RealAgentFeedbackLayer();
    const interactions = rafLayer.getInteractions();
    const feedbackAnalyses = rafLayer.getFeedbackAnalyses();
    const scoringWeights = rafLayer.getScoringWeights();

    // Filter interactions if platform specified
    const filteredInteractions = platform
      ? interactions.filter(i => i.platform === platform)
      : interactions;

    const result = {
      interactions: filteredInteractions,
      feedbackAnalyses,
      scoringWeights,
      totalInteractions: interactions.length,
      filteredCount: filteredInteractions.length
    };

    // Run regression analysis if requested
    if (runRegression && interactions.length >= 10) {
      try {
        const regressionResult = await rafLayer.runRegressionAnalysis();
        result.regressionResult = regressionResult;
      } catch (error) {
        result.regressionError = error instanceof Error ? error.message : 'Regression analysis failed';
      }
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Failed to get RAF Layer data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get RAF Layer data' 
      },
      { status: 500 }
    );
  }
} 