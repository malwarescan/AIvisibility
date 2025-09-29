import { NextRequest, NextResponse } from 'next/server'
import { processAnalysis } from '@/lib/queue/AnalysisQueue'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    
    console.log(`Testing analysis for: ${url}`)
    
    // Test the analysis directly
    const result = await processAnalysis({ url })
    
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test analysis error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
} 