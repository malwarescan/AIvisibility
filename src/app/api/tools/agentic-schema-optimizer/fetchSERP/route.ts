import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // In production, use SerpAPI or scraping here
  const { query } = await req.json();
  // Placeholder: return static URLs
  return Response.json({
    success: true,
    results: [
      'https://example.com/top-result-1',
      'https://example.com/top-result-2',
      'https://example.com/top-result-3',
    ],
  });
} 