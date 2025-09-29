import { NextRequest, NextResponse } from 'next/server';
import { gradeSchemaCollection } from '@/lib/SchemaGradingAlgorithm';

export async function POST(req: NextRequest) {
  try {
    const { entries } = await req.json();
    if (!Array.isArray(entries)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = gradeSchemaCollection(entries);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 });
  }
} 