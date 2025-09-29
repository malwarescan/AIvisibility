// src/app/api/start-worker/route.ts
import { NextResponse } from 'next/server'
import { startWorker } from '@/lib/queue/AnalysisQueue'

let worker: { close: () => void } | null = null

export async function POST() {
  try {
    if (worker) {
      return NextResponse.json({ 
        success: true, 
        message: 'Worker already running' 
      })
    }
    
    worker = startWorker()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Analysis worker started' 
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error starting worker'
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 })
  }
} 