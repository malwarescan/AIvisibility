import { NextRequest, NextResponse } from 'next/server'
import { schemaService } from '@/lib/schema/SchemaService'

export async function POST(request: NextRequest) {
  try {
    const { url, schemaType } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const result = await schemaService.generateAIOptimizedSchema(url, schemaType || 'Article')

    return NextResponse.json({
      success: true,
      result
    })
  } catch (error) {
    console.error('Schema analysis error:', error)
    return NextResponse.json(
      { error: 'Schema analysis failed' },
      { status: 500 }
    )
  }
} 