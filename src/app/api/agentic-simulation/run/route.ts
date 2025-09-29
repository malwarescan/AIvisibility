import { NextRequest, NextResponse } from 'next/server';
import { AgenticSimulationService } from '@/lib/ai/AgenticSimulationService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, chainId = 'multi_agent_analysis' } = body;

    if (!url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL is required' 
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

    // Initialize agentic simulation service
    const simulationService = new AgenticSimulationService();
    
    // Run simulation
    console.log(`Running agentic simulation for ${url} with chain ${chainId}...`);
    const simulation = await simulationService.runSimulation(url, chainId);

    return NextResponse.json({
      success: true,
      result: {
        simulation,
        agentChain: simulationService.getAgentChains().find(chain => chain.id === chainId),
        executionTime: simulation.executionTime,
        agentResults: simulation.results.map(result => ({
          agentName: result.agentName,
          task: result.task,
          score: result.score,
          confidence: result.confidence,
          executionTime: result.executionTime,
          hasErrors: result.errors && result.errors.length > 0
        }))
      }
    });

  } catch (error) {
    console.error('Agentic simulation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Agentic simulation failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const simulationService = new AgenticSimulationService();
    const agentChains = simulationService.getAgentChains();
    const simulationResults = simulationService.getSimulationResults();

    return NextResponse.json({
      success: true,
      result: {
        agentChains,
        simulationResults,
        stats: {
          totalChains: agentChains.length,
          totalSimulations: simulationResults.length,
          completedSimulations: simulationResults.filter(s => s.status === 'completed').length,
          failedSimulations: simulationResults.filter(s => s.status === 'failed').length
        }
      }
    });

  } catch (error) {
    console.error('Failed to get agentic simulation data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get simulation data' 
      },
      { status: 500 }
    );
  }
} 