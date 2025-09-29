import { NextRequest, NextResponse } from 'next/server';
import { RLHFSearchOptimizer, RLHFTrainingConfig } from '@/lib/ai/RLHFSearchOptimizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, content, modelName, config } = body;

    if (!url || !content || !modelName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL, content, and modelName are required' 
        },
        { status: 400 }
      );
    }

    // Initialize RLHF optimizer
    const rlhfOptimizer = new RLHFSearchOptimizer();

    // Collect training data
    console.log('Collecting LLM results...');
    const llmResults = await rlhfOptimizer.collectLLMResults(url, content);
    
    console.log('Collecting agent picks...');
    const agentPicks = await rlhfOptimizer.collectAgentPicks(url);

    // Train reward model
    console.log('Training reward model...');
    const trainingConfig: RLHFTrainingConfig = config || {
      learningRate: 0.001,
      batchSize: 32,
      epochs: 10,
      rewardFunction: 'hybrid',
      humanFeedbackWeight: 0.4,
      agentFeedbackWeight: 0.3,
      llmFeedbackWeight: 0.3
    };

    const rewardModel = await rlhfOptimizer.trainRewardModel(modelName, trainingConfig);

    // Get training statistics
    const stats = rlhfOptimizer.getTrainingDataStats();

    return NextResponse.json({
      success: true,
      result: {
        rewardModel,
        trainingStats: {
          llmResultsCollected: llmResults.length,
          agentPicksCollected: agentPicks.length,
          totalHumanAnnotations: stats.totalHumanAnnotations,
          averageLLMScore: stats.averageLLMScore,
          averageAgentScore: stats.averageAgentScore
        },
        modelPerformance: rewardModel.performance
      }
    });

  } catch (error) {
    console.error('RLHF training error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'RLHF training failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const rlhfOptimizer = new RLHFSearchOptimizer();
    const rewardModels = rlhfOptimizer.getRewardModels();
    const stats = rlhfOptimizer.getTrainingDataStats();

    return NextResponse.json({
      success: true,
      result: {
        rewardModels,
        trainingStats: stats
      }
    });

  } catch (error) {
    console.error('Failed to get RLHF data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get RLHF data' 
      },
      { status: 500 }
    );
  }
} 