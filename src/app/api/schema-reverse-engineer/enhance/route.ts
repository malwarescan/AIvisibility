import { NextRequest, NextResponse } from 'next/server';
import { generateEnhancedSchema } from '@/lib/schema/metaGenerator';

export async function POST(request: NextRequest) {
  try {
    const { url, targetQuery } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!targetQuery) {
      return NextResponse.json(
        { error: 'Target query is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let validatedUrl: string;
    try {
      const urlObj = new URL(url);
      validatedUrl = urlObj.toString();
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Generate enhanced schema with meta
    const result = await generateEnhancedSchema(validatedUrl, targetQuery);

    return NextResponse.json({
      success: true,
      title: result.title,
      description: result.description,
      enhancedSchema: result.enhancedSchema,
      metadata: {
        url: validatedUrl,
        targetQuery,
        generatedAt: new Date().toISOString(),
        model: 'gpt-4'
      }
    });

  } catch (error) {
    console.error('Enhanced schema generation error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'OpenAI rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Failed to fetch URL content. Please check the URL and try again.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate enhanced schema' },
      { status: 500 }
    );
  }
} 