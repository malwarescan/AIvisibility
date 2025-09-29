// src/app/api/analyze-website/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { AnalysisQueueManager, processAnalysis } from '@/lib/queue/AnalysisQueue'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
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

    console.log(`Processing analysis for: ${url}`)

    // Process analysis directly to avoid queue issues
    const result = await processAnalysis({
      url,
      userId: 'demo', // Replace with real user ID
      priority: 'normal',
      options: {
        includeScreenshots: false,
        includePerformance: true,
        includeAIFactors: true
      }
    })
    
    // Return completed result
    return NextResponse.json({
      success: true,
      jobId: 'direct',
      message: 'Analysis completed successfully',
      status: 'completed',
      result
    })

  } catch (error) {
    console.error('Failed to queue analysis:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to queue analysis' 
      },
      { status: 500 }
    )
  }
}

// Progress tracking endpoint
export async function GET(request: NextRequest) {
  try {
    const jobId = request.nextUrl.searchParams.get('jobId')
    
    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      )
    }

    const jobStatus = await AnalysisQueueManager.getJobStatus(jobId)
    
    if (jobStatus.status === 'not_found') {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      jobId,
      status: jobStatus.status,
      progress: jobStatus.progress,
      result: jobStatus.result,
      timestamp: jobStatus.timestamp,
      processedOn: jobStatus.processedOn
    })

  } catch (error) {
    console.error('Failed to get job status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get job status' 
      },
      { status: 500 }
    )
  }
} 