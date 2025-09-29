import { NextRequest, NextResponse } from 'next/server';
import OpenAIService from '@/lib/ai/OpenAIService';

const AGENTS = ['chatgpt', 'claude', 'perplexity', 'google'] as const;
// type Agent = typeof AGENTS[number]; // Not currently used

interface FieldRating {
  [agent: string]: number;
}

interface AgreementMatrix {
  [field: string]: string[];
}

interface RecommendedChange {
  field: string;
  action: 'add' | 'improve' | 'remove';
  reason: string;
  impact: number;
  affectedAgents: string[];
}

interface ConsensusResult {
  consensusScore: number;
  agreementMatrix: AgreementMatrix;
  fieldRatings: { [field: string]: FieldRating };
  recommendedChanges: RecommendedChange[];
  agentFeedback: {
    [agent: string]: {
      valuableFields: string[];
      missingFields: string[];
      summary: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schema } = body;

    if (!schema) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Schema is required',
          code: 'MISSING_SCHEMA'
        },
        { status: 400 }
      );
    }

    // Validate schema format
    let parsedSchema;
    try {
      parsedSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
    } catch {
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

    // Get feedback from all agents
    const agentFeedback = await getMultiAgentFeedback(openAIService, parsedSchema);
    
    // Analyze consensus and generate recommendations
    const consensusResult = await analyzeConsensus(parsedSchema, agentFeedback);

    return NextResponse.json({
      success: true,
      data: consensusResult
    });

  } catch (error) {
    console.error('Schema Consensus API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate consensus analysis',
        code: 'CONSENSUS_ANALYSIS_FAILED'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Schema Agent Consensus API',
    endpoints: {
      POST: '/api/schema-consensus - Get multi-agent consensus analysis for schema markup'
    },
    parameters: {
      schema: 'string (required) - JSON-LD schema markup'
    },
    response: {
      consensusScore: 'number - 0-100 score based on agreement across agents',
      agreementMatrix: 'object - Which agents find each field valuable',
      fieldRatings: 'object - Field ratings by each agent',
      recommendedChanges: 'array - Unified schema improvement recommendations',
      agentFeedback: 'object - Individual feedback from each agent'
    }
  });
}

/**
 * Get feedback from all AI agents
 */
async function getMultiAgentFeedback(openAIService: OpenAIService, schema: Record<string, unknown>): Promise<ConsensusResult['agentFeedback']> {
  const feedback: ConsensusResult['agentFeedback'] = {};
  
  // Get feedback from each agent in parallel
  const feedbackPromises = AGENTS.map(async (agent) => {
    try {
      const systemPrompt = createAgentSystemPrompt(agent);
      const query = `${systemPrompt}\n\nSchema to analyze:\n${JSON.stringify(schema, null, 2)}`;
      
      const agentResponse = await openAIService.simulateAgentResponse(
        query,
        agent as 'chatgpt' | 'claude' | 'perplexity' | 'google-ai'
      );
      
      const parsedFeedback = parseAgentFeedback(agentResponse.response, agent);
      feedback[agent] = parsedFeedback;
      
      return { agent, feedback: parsedFeedback };
    } catch (error) {
      console.error(`Error getting feedback from ${agent}:`, error);
      // Return fallback feedback
      feedback[agent] = {
        valuableFields: ['Error getting feedback'],
        missingFields: ['Error getting feedback'],
        summary: `Unable to get feedback from ${agent}. Please try again.`
      };
      return { agent, feedback: feedback[agent] };
    }
  });

  await Promise.all(feedbackPromises);
  return feedback;
}

/**
 * Analyze consensus across all agents
 */
async function analyzeConsensus(schema: Record<string, unknown>, agentFeedback: ConsensusResult['agentFeedback']): Promise<ConsensusResult> {
  // Extract all unique fields mentioned across agents
  const allFields = new Set<string>();
  Object.values(agentFeedback).forEach(feedback => {
    feedback.valuableFields.forEach(field => {
      const fieldName = extractFieldName(field);
      if (fieldName) allFields.add(fieldName);
    });
    feedback.missingFields.forEach(field => {
      const fieldName = extractFieldName(field);
      if (fieldName) allFields.add(fieldName);
    });
  });

  // Build field ratings matrix
  const fieldRatings: { [field: string]: FieldRating } = {};
  const agreementMatrix: AgreementMatrix = {};
  
  allFields.forEach(field => {
    fieldRatings[field] = {};
    agreementMatrix[field] = [];
    
    AGENTS.forEach(agent => {
      const feedback = agentFeedback[agent];
      const rating = calculateFieldRating(field, feedback);
      fieldRatings[field][agent] = rating;
      
      if (rating >= 70) {
        agreementMatrix[field].push(agent);
      }
    });
  });

  // Calculate consensus score
  const consensusScore = calculateConsensusScore(fieldRatings, agreementMatrix);
  
  // Generate recommended changes
  const recommendedChanges = generateRecommendedChanges(
    schema, 
    fieldRatings, 
    agreementMatrix, 
    agentFeedback
  );

  return {
    consensusScore,
    agreementMatrix,
    fieldRatings,
    recommendedChanges,
    agentFeedback
  };
}

/**
 * Extract field name from feedback text
 */
function extractFieldName(feedbackText: string): string | null {
  // Common patterns in feedback text
  const patterns = [
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s*[-:]/i,  // "fieldName - description"
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/i,    // "fieldName (description)"
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/i,     // "fieldName: description"
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s*$/i      // Just "fieldName"
  ];
  
  for (const pattern of patterns) {
    const match = feedbackText.match(pattern);
    if (match) {
      return match[1].toLowerCase();
    }
  }
  
  return null;
}

/**
 * Calculate rating for a specific field based on agent feedback
 */
function calculateFieldRating(field: string, feedback: { valuableFields: string[]; missingFields: string[]; rating: number }): number {
  const fieldLower = field.toLowerCase();
  
  // Check if field is in valuable fields
  const valuableMatch = feedback.valuableFields.find((f: string) => 
    f.toLowerCase().includes(fieldLower)
  );
  
  // Check if field is in missing fields
  const missingMatch = feedback.missingFields.find((f: string) => 
    f.toLowerCase().includes(fieldLower)
  );
  
  if (valuableMatch && !missingMatch) {
    return 90; // High rating for valuable fields
  } else if (valuableMatch && missingMatch) {
    return 60; // Medium rating if mentioned in both
  } else if (!valuableMatch && missingMatch) {
    return 20; // Low rating for missing fields
  } else {
    return 50; // Neutral rating if not mentioned
  }
}

/**
 * Calculate overall consensus score
 */
function calculateConsensusScore(fieldRatings: { [field: string]: FieldRating }, _agreementMatrix: AgreementMatrix): number {
  const fields = Object.keys(fieldRatings);
  if (fields.length === 0) return 0;
  
  let totalAgreement = 0;
  let totalFields = 0;
  
  fields.forEach(field => {
    const ratings = Object.values(fieldRatings[field]);
    const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    
    // Calculate agreement (how close ratings are to each other)
    const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - avgRating, 2), 0) / ratings.length;
    const agreement = Math.max(0, 100 - variance);
    
    totalAgreement += agreement;
    totalFields++;
  });
  
  return Math.round(totalAgreement / totalFields);
}

/**
 * Generate recommended changes based on consensus analysis
 */
function generateRecommendedChanges(
  schema: Record<string, unknown>,
  fieldRatings: { [field: string]: FieldRating },
  _agreementMatrix: AgreementMatrix,
  _agentFeedback: ConsensusResult['agentFeedback']
): RecommendedChange[] {
  const changes: RecommendedChange[] = [];
  const schemaFields = extractSchemaFields(schema);
  
  // Find fields that are missing or weak across multiple agents
  Object.entries(fieldRatings).forEach(([field, ratings]) => {
    const avgRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(ratings).length;
    const lowRatingAgents = Object.entries(ratings)
      .filter(([, rating]) => rating < 50)
      .map(([agent]) => agent);
    
    if (avgRating < 60 && lowRatingAgents.length >= 2) {
      const isInSchema = schemaFields.includes(field);
      
      changes.push({
        field,
        action: isInSchema ? 'improve' : 'add',
        reason: `Low rating across ${lowRatingAgents.length} agents: ${lowRatingAgents.join(', ')}`,
        impact: Math.round((60 - avgRating) * 2), // Higher impact for lower ratings
        affectedAgents: lowRatingAgents
      });
    }
  });
  
  // Sort by impact (highest first)
  changes.sort((a, b) => b.impact - a.impact);
  
  return changes.slice(0, 10); // Return top 10 recommendations
}

/**
 * Extract field names from schema
 */
function extractSchemaFields(schema: Record<string, unknown>): string[] {
  const fields: string[] = [];

  function extractFields(obj: Record<string, unknown>, prefix = '') {
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        if (key !== '@context' && key !== '@type' && key !== '@id') {
          const fieldName = prefix ? `${prefix}.${key}` : key;
          fields.push(fieldName);
          
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            extractFields(obj[key], fieldName);
          }
        }
      });
    }
  }
  
  extractFields(schema);
  return fields;
}

/**
 * Create agent-specific system prompt for consensus analysis
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

  return `You are ${config.name} (${config.description}) analyzing this schema markup for how it affects your response generation and ranking logic. Your focus is on ${config.focus}.

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
function parseAgentFeedback(response: string, agent: string): { agent: string; valuableFields: string[]; missingFields: string[]; summary: string } {
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