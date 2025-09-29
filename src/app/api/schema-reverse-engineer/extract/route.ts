import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface ExtractedSchema {
  type: string;
  properties: Record<string, any>;
  nested?: ExtractedSchema[];
  source: string;
  confidence?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to the page
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Extract JSON-LD scripts
    const schemas = await page.evaluate(() => {
      const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
      const extractedSchemas: ExtractedSchema[] = [];

      scriptTags.forEach((script, index) => {
        try {
          const content = script.textContent;
          if (!content) return;

          let parsed;
          
          // Handle both single objects and arrays
          if (content.trim().startsWith('[')) {
            parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
              parsed.forEach((item, itemIndex) => {
                if (item && typeof item === 'object') {
                  extractedSchemas.push({
                    type: item['@type'] || 'Unknown',
                    properties: item,
                    source: `script-${index}-item-${itemIndex}`,
                    confidence: 0.9
                  });
                }
              });
            }
          } else {
            parsed = JSON.parse(content);
            if (parsed && typeof parsed === 'object') {
              extractedSchemas.push({
                type: parsed['@type'] || 'Unknown',
                properties: parsed,
                source: `script-${index}`,
                confidence: 0.9
              });
            }
          }
        } catch (error) {
          console.error('Failed to parse JSON-LD script:', error);
        }
      });

      return extractedSchemas;
    });

    await browser.close();

    // Process and enhance schemas
    const processedSchemas = schemas.map(schema => {
      // Extract nested schemas
      const nested: ExtractedSchema[] = [];
      
      const extractNested = (obj: any, path: string = '') => {
        if (obj && typeof obj === 'object') {
          Object.entries(obj).forEach(([key, value]) => {
                         if (value && typeof value === 'object' && (value as any)['@type']) {
               nested.push({
                 type: (value as any)['@type'],
                 properties: value,
                 source: `${schema.source}-${path}-${key}`,
                 confidence: 0.8
               });
             } else if (Array.isArray(value)) {
               value.forEach((item, index) => {
                 if (item && typeof item === 'object' && (item as any)['@type']) {
                   nested.push({
                     type: (item as any)['@type'],
                     properties: item,
                     source: `${schema.source}-${path}-${key}-${index}`,
                     confidence: 0.8
                   });
                 }
               });
             }
          });
        }
      };

      extractNested(schema.properties);
      
      return {
        ...schema,
        nested: nested.length > 0 ? nested : undefined
      };
    });

    return NextResponse.json({
      success: true,
      schemas: processedSchemas,
      totalSchemas: processedSchemas.length,
      url
    });

  } catch (error) {
    console.error('Schema extraction error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to extract schema',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 