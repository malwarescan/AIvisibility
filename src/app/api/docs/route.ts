import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'index.html';
  
  try {
    const filePath = path.join(process.cwd(), 'docs', 'web-pages', page);
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Documentation page not found', { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving documentation:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 