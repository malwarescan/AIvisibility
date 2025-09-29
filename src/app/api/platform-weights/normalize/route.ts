import { NextRequest, NextResponse } from 'next/server';
import { PlatformWeightNormalizer } from '@/lib/ai/PlatformWeightNormalizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolId, performanceData } = body;

    // Initialize weight normalizer
    const normalizer = new PlatformWeightNormalizer();

    // Update global weights if performance data provided
    if (performanceData && Array.isArray(performanceData)) {
      await normalizer.updateGlobalWeights(performanceData);
    }

    // Normalize weights for specific tool or all tools
    const results: any[] = [];
    
    if (toolId) {
      // Normalize specific tool
      const result = await normalizer.normalizeToolWeights(toolId);
      results.push(result);
    } else {
      // Normalize all tools
      const toolConfigs = normalizer.getAllToolConfigs();
      for (const config of toolConfigs) {
        try {
          const result = await normalizer.normalizeToolWeights(config.toolId);
          results.push(result);
        } catch (error) {
          console.error(`Failed to normalize ${config.toolId}:`, error);
        }
      }
    }

    // Validate consistency
    const consistency = normalizer.validateWeightConsistency();

    return NextResponse.json({
      success: true,
      result: {
        normalizationResults: results,
        consistency,
        globalWeights: normalizer.getGlobalWeights(),
        toolConfigs: normalizer.getAllToolConfigs(),
        history: normalizer.getNormalizationHistory()
      }
    });

  } catch (error) {
    console.error('Weight normalization error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Weight normalization failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const normalizer = new PlatformWeightNormalizer();
    
    return NextResponse.json({
      success: true,
      result: {
        globalWeights: normalizer.getGlobalWeights(),
        toolConfigs: normalizer.getAllToolConfigs(),
        consistency: normalizer.validateWeightConsistency(),
        history: normalizer.getNormalizationHistory()
      }
    });

  } catch (error) {
    console.error('Failed to get weight data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get weight data' 
      },
      { status: 500 }
    );
  }
} 