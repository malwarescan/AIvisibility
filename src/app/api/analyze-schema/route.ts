import { NextRequest, NextResponse } from 'next/server'
import { SchemaAnalyzer } from '@/lib/schema/SchemaAnalyzer'
import { SchemaAnalysisRequest } from '@/types/schema'

export async function POST(request: NextRequest) {
  try {
    const { url, content, options } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    console.log(`🔍 Processing schema analysis for: ${url}`)

    // Initialize schema analyzer
    const schemaAnalyzer = new SchemaAnalyzer()
    
    // Create analysis request
    const analysisRequest: SchemaAnalysisRequest = {
      url,
      content,
      options: {
        includeStructuredData: true,
        includeMicrodata: true,
        includeJSONLD: true,
        includeRDFa: true,
        includeOpenGraph: true,
        includeTwitterCards: true,
        ...options
      }
    }

    // Process schema analysis
    const result = await schemaAnalyzer.analyzeSchema(analysisRequest)
    
    return NextResponse.json({
      success: true,
      message: 'Schema analysis completed successfully',
      result
    })

  } catch (error) {
    console.error('Schema analysis failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to analyze schema' 
      },
      { status: 500 }
    )
  }
}

// Get schema analysis status
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url')
    
    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // For now, return a simple status
    // In the future, this could integrate with the queue system
    return NextResponse.json({
      success: true,
      status: 'completed',
      message: 'Schema analysis status retrieved'
    })

  } catch (error) {
    console.error('Failed to get schema analysis status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get status' 
      },
      { status: 500 }
    )
  }
} 