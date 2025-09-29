import { NextRequest, NextResponse } from 'next/server';
import { AgentAnalyzer } from '@/lib/core/agents';
import { createToolInsight, ToolAnalysis } from '@/types/dashboard';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, options } = body;

    if (!domain) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Domain is required',
          code: 'MISSING_DOMAIN'
        },
        { status: 400 }
      );
    }

    // Validate domain format
    if (!domain.includes('.') || domain.length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid domain format',
          code: 'INVALID_DOMAIN'
        },
        { status: 400 }
      );
    }

    // Analyze domain presence across agents
    const presence = await AgentAnalyzer.analyzeDomainPresence(domain);

    // Generate insights
    const insights = [];
    if (presence.presenceRate > 0.8) {
      insights.push('Strong presence across AI agents');
      insights.push('High visibility potential');
    } else if (presence.presenceRate < 0.4) {
      insights.push('Low presence across AI agents');
      insights.push('Needs optimization');
    } else {
      insights.push('Moderate presence across AI agents');
      insights.push('Room for improvement');
    }

    const topAgents = presence.agents.filter(a => a.presence).length;
    if (topAgents >= 3) {
      insights.push('Present in multiple top agents');
    }

    // Generate recommendations
    const recommendations = [];
    if (presence.presenceRate < 0.6) {
      recommendations.push('Improve content quality for AI agent consumption');
      recommendations.push('Optimize for agent-specific capabilities');
      recommendations.push('Increase domain authority and trust signals');
    }

    if (presence.agents.some(a => !a.presence)) {
      recommendations.push('Focus on missing agent platforms');
      recommendations.push('Implement agent-specific content strategies');
    }

    recommendations.push('Monitor agent presence trends regularly');
    recommendations.push('Optimize content for conversational queries');

    // Create dashboard insight
    const insight = createToolInsight(
      'agentic-visibility',
      Math.round(presence.presenceRate * 100),
      insights,
      recommendations,
      {
        domain,
        presenceRate: presence.presenceRate,
        activeAgents: presence.agents.filter(a => a.presence).length,
        totalAgents: presence.totalAgents,
        topAgents: presence.topAgents,
        agentPresence: presence.agents.map(agent => ({
          agent: agent.agent,
          presence: agent.presence,
          frequency: agent.frequency
        }))
      }
    );

    const response: ToolAnalysis = {
      success: true,
      data: {
        insight,
        analysis: {
          presence,
          summary: {
            domain,
            presenceRate: presence.presenceRate,
            activeAgents: presence.agents.filter(a => a.presence).length,
            totalAgents: presence.totalAgents
          }
        }
      },
      timestamp: new Date().toISOString(),
      tool: 'agentic-visibility',
      action: 'analyze'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Agentic visibility analysis error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Agentic visibility analysis failed',
        code: 'ANALYSIS_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Agentic Visibility Analysis API',
    tool: 'agentic-visibility',
    action: 'analyze',
    endpoints: {
      POST: '/api/tools/agentic-visibility/analyze - Analyze domain presence across AI agents'
    },
    parameters: {
      domain: 'string (required) - Domain to analyze for agent presence',
      options: 'object (optional) - Analysis options'
    }
  });
} 