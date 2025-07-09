import { NextRequest, NextResponse } from 'next/server'
import { OpenAIService } from '@/lib/ai/OpenAIService'

export async function GET() {
  try {
    const aiService = new OpenAIService()
    
    // Test content analysis
    const contentResult = await aiService.analyzeContentQuality(
      'This is a test website about AI optimization and machine learning.',
      'https://test.com'
    )
    
    return NextResponse.json({
      success: true,
      contentAnalysis: contentResult,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
} 