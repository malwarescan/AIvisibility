import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GOOGLE_API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Step 1: Search Google using Custom Search API
    const searchResults = await searchGoogle(query);
    
    // Step 2: Use OpenAI to analyze results and identify AI Overview winners
    const aiOverviewAnalysis = await analyzeForAIOverview(query, searchResults);
    
    // Step 3: Extract schema from identified winners
    const enrichedResults = await enrichWithSchemaData(aiOverviewAnalysis.sources);

    return NextResponse.json({
      success: true,
      query,
      aiOverview: aiOverviewAnalysis,
      sources: enrichedResults
    });

  } catch (error) {
    console.error('SERP Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze SERP results' },
      { status: 500 }
    );
  }
}

async function searchGoogle(query: string) {
  if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error('Google Custom Search API not configured');
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=10`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Google API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.items || [];
}

async function analyzeForAIOverview(query: string, searchResults: Array<{ title: string; link: string; snippet: string }>) {
  const resultsText = searchResults.map((item, index) => 
    `${index + 1}. ${item.title}\n   URL: ${item.link}\n   Snippet: ${item.snippet}\n`
  ).join('\n');

  const prompt = `
You are an AI Overview detection expert. Analyze these Google search results for the query "${query}" and identify which URLs are likely to be featured in AI Overviews.

Look for:
- How-to guides and tutorials
- FAQ pages
- Step-by-step instructions
- Comprehensive guides
- Pages with structured content that would be useful for AI Overviews

Search Results:
${resultsText}

Return a JSON object with:
{
  "aiOverviewType": "how-to|faq|guide|list",
  "sources": [
    {
      "url": "full_url",
      "title": "page_title", 
      "confidence": 0.9,
      "reason": "why this is likely in AI Overview"
    }
  ]
}

Only include sources with confidence > 0.7. Be selective - AI Overviews typically feature 1-3 high-quality sources.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  try {
    const analysis = JSON.parse(completion.choices[0].message.content || '{}');
    return analysis;
  } catch (error) {
    console.error('Failed to parse OpenAI response:', error);
    // Fallback: return top 2 results as potential AI Overview sources
    return {
      aiOverviewType: 'guide',
      sources: searchResults.slice(0, 2).map(item => ({
        url: item.link,
        title: item.title,
        confidence: 0.8,
        reason: 'Top search result - likely featured in AI Overview'
      }))
    };
  }
}

async function enrichWithSchemaData(sources: Array<{ url: string; title: string; confidence: number; reason: string }>) {
  const enriched = [];
  
  for (const source of sources) {
    try {
      // Extract schema from the URL
      const schemaResponse = await fetch('/api/schema-reverse-engineer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: source.url })
      });
      
      if (schemaResponse.ok) {
        const schemaData = await schemaResponse.json();
        if (schemaData.success && schemaData.result?.jsonLd) {
          source.schema = schemaData.result.jsonLd;
          source.schemaTypes = extractSchemaTypes(schemaData.result.jsonLd);
        }
      }
    } catch (error) {
      console.error(`Failed to extract schema from ${source.url}:`, error);
    }
    
    enriched.push(source);
  }
  
  return enriched;
}

function extractSchemaTypes(schema: Record<string, unknown>): string[] {
  const types = [];
  
  if (schema['@type']) {
    types.push(schema['@type'] as string);
  }
  
  // Check for nested schemas
  if (schema.mainEntity && Array.isArray(schema.mainEntity)) {
    schema.mainEntity.forEach((entity: Record<string, unknown>) => {
      if (entity['@type']) {
        types.push(entity['@type'] as string);
      }
    });
  }
  
  return [...new Set(types)]; // Remove duplicates
} 