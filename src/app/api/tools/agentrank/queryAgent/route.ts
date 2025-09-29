import { NextRequest, NextResponse } from 'next/server';
import { AgenticAnalyzer } from '@/lib/core/agentic';
import { createToolInsight, ToolAnalysis } from '@/types/dashboard';
import OpenAIService from '@/lib/ai/OpenAIService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, agent, platform, options } = body;

    if (!query) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query is required',
          code: 'MISSING_QUERY'
        },
        { status: 400 }
      );
    }

    if (!agent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Agent is required',
          code: 'MISSING_AGENT'
        },
        { status: 400 }
      );
    }

    // Validate agent and platform
    const validAgents = ['chatgpt', 'claude', 'perplexity', 'google-ai'];
    const validPlatforms = ['chatgpt', 'claude', 'perplexity', 'google-ai', 'bing', 'bard'];

    if (!validAgents.includes(agent)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid agent specified',
          code: 'INVALID_AGENT'
        },
        { status: 400 }
      );
    }

    if (platform && !validPlatforms.includes(platform)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid platform specified',
          code: 'INVALID_PLATFORM'
        },
        { status: 400 }
      );
    }

    // Initialize OpenAI service for real agent simulation
    const openAIService = new OpenAIService();
    
    // Simulate agent query response using real GPT-4
    const agentResponse = await openAIService.simulateAgentResponse(query, agent as 'chatgpt' | 'claude' | 'perplexity' | 'google-ai');
    
    // Calculate ranking based on score
    const ranking = Math.max(1, Math.min(10, Math.round(11 - (agentResponse.score / 10))));
    
    const enhancedAgentResponse = {
      agent,
      platform: platform || agent,
      query,
      response: agentResponse.response,
      confidence: agentResponse.confidence,
      responseTime: agentResponse.responseTime,
      tokens: agentResponse.tokens,
      ranking,
      sources: agentResponse.sources
    };

    // Generate agent analysis using core library
    const agentResult = {
      agent: enhancedAgentResponse.agent,
      platform: enhancedAgentResponse.platform,
      score: Math.round(enhancedAgentResponse.confidence * 100),
      confidence: enhancedAgentResponse.confidence,
      trend: Array.from({ length: 7 }, () => Math.round(70 + Math.random() * 30))
    };

    const analysis = AgenticAnalyzer.analyze([agentResult]);

    // Create dashboard insight
    const insight = createToolInsight(
      'agentrank',
      Math.round(enhancedAgentResponse.confidence * 100),
      [
        `Agent response confidence: ${Math.round(enhancedAgentResponse.confidence * 100)}%`,
        `Response time: ${enhancedAgentResponse.responseTime}ms`,
        `Sources found: ${enhancedAgentResponse.sources.length}`,
        `Agent ranking: #${enhancedAgentResponse.ranking}`
      ],
      [
        'Optimize content for agent-specific capabilities',
        'Improve source quality and relevance',
        'Enhance response comprehensiveness',
        'Focus on agent-preferred content formats'
      ],
      {
        url: null,
        query,
        agent: enhancedAgentResponse.agent,
        platform: enhancedAgentResponse.platform,
        rankings: [{
          agent: enhancedAgentResponse.agent,
          score: Math.round(enhancedAgentResponse.confidence * 100),
          ranking: enhancedAgentResponse.ranking
        }],
        topAgent: enhancedAgentResponse.agent,
        averageScore: Math.round(enhancedAgentResponse.confidence * 100)
      }
    );

    const response: ToolAnalysis = {
      success: true,
      data: {
        insight,
        analysis: {
          agentResponse: enhancedAgentResponse,
          analysis,
          metadata: {
            queryLength: query.length,
            responseLength: enhancedAgentResponse.response.length,
            processingTime: enhancedAgentResponse.responseTime
          }
        }
      },
      timestamp: new Date().toISOString(),
      tool: 'agentrank',
      action: 'queryAgent'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Agent query error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Agent query failed',
        code: 'QUERY_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Agent Query API',
    tool: 'agentrank',
    action: 'queryAgent',
    endpoints: {
      POST: '/api/tools/agentrank/queryAgent - Query specific AI agent'
    },
    parameters: {
      query: 'string (required) - Query to send to agent',
      agent: 'string (required) - Agent to query (chatgpt, claude, perplexity, google-ai)',
      platform: 'string (optional) - Platform context',
      options: 'object (optional) - Query options'
    },
    validAgents: ['chatgpt', 'claude', 'perplexity', 'google-ai'],
    validPlatforms: ['chatgpt', 'claude', 'perplexity', 'google-ai', 'bing', 'bard']
  });
} 