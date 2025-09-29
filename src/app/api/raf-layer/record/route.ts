import { NextRequest, NextResponse } from 'next/server';
import { RealAgentFeedbackLayer, RealAgentInteraction } from '@/lib/ai/RealAgentFeedbackLayer';

const rafLayer = new RealAgentFeedbackLayer();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, query, result, sourceUsed, sourceUrl, citationStyle, snippetIncluded, answerUsagePattern, confidence, responseTime, tokenUsage } = body;

    // Validate required fields
    if (!platform || !query || !result) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: platform, query, result' },
        { status: 400 }
      );
    }

    // Create interaction object
    const interaction: RealAgentInteraction = {
      platform,
      query,
      result,
      sourceUsed: sourceUsed || false,
      sourceUrl,
      citationStyle: citationStyle || 'none',
      snippetIncluded: snippetIncluded || false,
      answerUsagePattern: answerUsagePattern || 'ignored',
      confidence: confidence || 0.8,
      timestamp: new Date(),
      responseTime: responseTime || 1000,
      tokenUsage: tokenUsage || 200
    };

    // Record the interaction
    await rafLayer.recordInteraction(interaction);

    return NextResponse.json({
      success: true,
      message: 'Interaction recorded successfully',
      interactionId: interaction.timestamp.getTime(),
      feedbackMetrics: rafLayer.getFeedbackMetrics(platform),
      recalibrationWeights: rafLayer.getRecalibrationWeights()
    });

  } catch (error) {
    console.error('RAF Layer API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record interaction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');

    const data = {
      interactions: rafLayer.getInteractions(platform || undefined),
      feedbackMetrics: platform ? rafLayer.getFeedbackMetrics(platform) : null,
      recalibrationWeights: rafLayer.getRecalibrationWeights(),
      systemAdaptabilityScore: rafLayer.getSystemAdaptabilityScore(),
      exportData: rafLayer.exportFeedbackData()
    };

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('RAF Layer API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve RAF data' },
      { status: 500 }
    );
  }
} 