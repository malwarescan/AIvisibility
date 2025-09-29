import { NextRequest, NextResponse } from 'next/server';
import { OverviewPredictor } from '@/lib/core/overview-predictor';
import { createToolInsight, ToolAnalysis } from '@/types/dashboard';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, url, options } = body;

    if (!query && !url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either query or url is required',
          code: 'MISSING_INPUT'
        },
        { status: 400 }
      );
    }

    // Validate URL format if provided
    if (url) {
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
    }

    // Use the OverviewPredictor to get real analysis
    const analysis = await OverviewPredictor.predictOverview(url, query, options);
    const prediction = analysis.prediction;

    // Create dashboard insight
    const insight = createToolInsight(
      'overviewiq',
      Math.round(prediction.probability * 100),
      [
        `AI Overview probability: ${Math.round(prediction.probability * 100)}%`,
        `Confidence level: ${Math.round(prediction.confidence * 100)}%`,
        `Key factors: ${prediction.factors.slice(0, 3).join(', ')}`,
        prediction.probability > 0.7 ? 'High potential for AI Overview' : 'Moderate potential for AI Overview'
      ],
      prediction.recommendations,
      {
        url,
        query: query || 'Generated from URL',
        probability: prediction.probability,
        confidence: prediction.confidence,
        factors: prediction.factors,
        competitors: prediction.competitors
      }
    );

    const response: ToolAnalysis = {
      success: true,
      data: {
        insight,
        analysis: {
          prediction,
          serpAnalysis: analysis.serpAnalysis,
          schemaAnalysis: analysis.schemaAnalysis,
          contentAnalysis: analysis.contentAnalysis
        }
      },
      timestamp: new Date().toISOString(),
      tool: 'overviewiq',
      action: 'predictOverview'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Overview prediction error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Overview prediction failed',
        code: 'PREDICTION_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Overview Prediction API',
    tool: 'overviewiq',
    action: 'predictOverview',
    endpoints: {
      POST: '/api/tools/overviewiq/predictOverview - Predict AI Overview eligibility'
    },
    parameters: {
      query: 'string (optional) - Search query to analyze',
      url: 'string (optional) - URL to analyze for overview potential',
      options: 'object (optional) - Prediction options'
    }
  });
} 