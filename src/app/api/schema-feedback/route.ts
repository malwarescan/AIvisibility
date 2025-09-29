import { NextRequest, NextResponse } from 'next/server';
import OpenAIService from '@/lib/ai/OpenAIService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schema, agent } = body;

    if (!schema || !agent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Schema and agent are required',
          code: 'MISSING_PARAMETERS'
        },
        { status: 400 }
      );
    }

    // Validate agent type
    const validAgents = ['chatgpt', 'claude', 'perplexity', 'google'];
    if (!validAgents.includes(agent)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid agent. Must be one of: chatgpt, claude, perplexity, google',
          code: 'INVALID_AGENT'
        },
        { status: 400 }
      );
    }

    // Validate schema format
    let parsedSchema;
    try {
      parsedSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON-LD schema format',
          code: 'INVALID_SCHEMA'
        },
        { status: 400 }
      );
    }

    // Initialize OpenAI service
    const openAIService = new OpenAIService();

    // Create agent-specific system prompt
    const systemPrompt = createAgentSystemPrompt(agent);

    // Create the query with system prompt and schema
    const query = `${systemPrompt}\n\nSchema to analyze:\n${JSON.stringify(parsedSchema, null, 2)}`;

    // Simulate agent response
    const agentResponse = await openAIService.simulateAgentResponse(
      query,
      agent as 'chatgpt' | 'claude' | 'perplexity' | 'google-ai'
    );

    // Parse the structured response
    const feedback = parseAgentFeedback(agentResponse.response, agent);

    return NextResponse.json({
      success: true,
      data: feedback
    });

  } catch (error) {
    console.error('Schema Feedback API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate agent feedback',
        code: 'AGENT_FEEDBACK_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Schema Agent Feedback API',
    endpoints: {
      POST: '/api/schema-feedback - Get AI agent feedback on schema markup'
    },
    parameters: {
      schema: 'string (required) - JSON-LD schema markup',
      agent: 'string (required) - AI agent (chatgpt, claude, perplexity, google)'
    },
    response: {
      agent: 'string - The AI agent that provided feedback',
      valuableFields: 'array - Fields most valuable to agent ranking',
      missingFields: 'array - Missing or weak fields for agent understanding',
      summary: 'string - Natural language summary of agent interpretation'
    }
  });
}

/**
 * Create agent-specific system prompt for schema feedback
 */
function createAgentSystemPrompt(agent: string): string {
  const agentConfigs = {
    chatgpt: {
      name: 'ChatGPT',
      description: 'OpenAI\'s conversational AI assistant',
      focus: 'conversational responses, user intent understanding, and comprehensive explanations'
    },
    claude: {
      name: 'Claude',
      description: 'Anthropic\'s AI assistant',
      focus: 'detailed analysis, safety considerations, and thorough explanations'
    },
    perplexity: {
      name: 'Perplexity',
      description: 'AI-powered search engine',
      focus: 'search relevance, source credibility, and real-time information synthesis'
    },
    google: {
      name: 'Google AI',
      description: 'Google\'s AI search and overview system',
      focus: 'search result ranking, featured snippets, and knowledge graph integration'
    }
  };

  const config = agentConfigs[agent as keyof typeof agentConfigs];

  return `You are ${config.name} (${config.description}) simulating how this schema markup would affect your response generation and ranking logic. Your focus is on ${config.focus}.

Analyze the provided JSON-LD schema markup and provide structured feedback in the following JSON format:

{
  "valuableFields": [
    "field1 - brief explanation of why this field is valuable to your ranking",
    "field2 - brief explanation of why this field is valuable to your ranking"
  ],
  "missingFields": [
    "missing_field1 - explanation of what's missing and why it would help",
    "missing_field2 - explanation of what's missing and why it would help"
  ],
  "summary": "A 1-paragraph natural language summary of how you would interpret this entity and use it in your responses. Focus on how the schema helps or hinders your understanding and ranking decisions."
}

Guidelines:
1. Focus on fields that directly impact your ability to provide accurate, helpful responses
2. Consider how the schema affects your ranking and relevance decisions
3. Identify gaps that would improve your understanding of the entity
4. Provide specific, actionable feedback that would help optimize the schema for your platform
5. Keep explanations concise but informative

Respond only with valid JSON in the exact format specified above.`;
}

/**
 * Parse agent feedback from OpenAI response
 */
function parseAgentFeedback(response: string, agent: string): any {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        agent,
        valuableFields: parsed.valuableFields || [],
        missingFields: parsed.missingFields || [],
        summary: parsed.summary || 'No summary provided'
      };
    }

    // Fallback: parse manually if JSON extraction fails
    const lines = response.split('\n');
    const valuableFields: string[] = [];
    const missingFields: string[] = [];
    let summary = '';

    let currentSection = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().includes('valuable') || trimmed.toLowerCase().includes('helpful')) {
        currentSection = 'valuable';
      } else if (trimmed.toLowerCase().includes('missing') || trimmed.toLowerCase().includes('weak')) {
        currentSection = 'missing';
      } else if (trimmed.toLowerCase().includes('summary') || trimmed.toLowerCase().includes('interpret')) {
        currentSection = 'summary';
      } else if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        const field = trimmed.substring(1).trim();
        if (currentSection === 'valuable') {
          valuableFields.push(field);
        } else if (currentSection === 'missing') {
          missingFields.push(field);
        }
      } else if (currentSection === 'summary' && trimmed.length > 0) {
        summary += trimmed + ' ';
      }
    }

    return {
      agent,
      valuableFields: valuableFields.length > 0 ? valuableFields : ['No specific valuable fields identified'],
      missingFields: missingFields.length > 0 ? missingFields : ['No specific missing fields identified'],
      summary: summary.trim() || 'No summary provided'
    };

  } catch (error) {
    console.error('Error parsing agent feedback:', error);
    
    // Return fallback response
    return {
      agent,
      valuableFields: ['Error parsing response - please try again'],
      missingFields: ['Error parsing response - please try again'],
      summary: 'Unable to parse agent feedback. Please check your schema format and try again.'
    };
  }
} 