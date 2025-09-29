import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { ParsedSchema, SchemaAnalysis, SchemaExtractionResult } from '@/types/schema-reverse-engineer';

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
    let validatedUrl: string;
    try {
      const urlObj = new URL(url);
      validatedUrl = urlObj.toString();
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch page content
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(validatedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SchemaReverseEngineer/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract JSON-LD schemas
    const schemas: ParsedSchema[] = [];
    const extractionErrors: string[] = [];

    $('script[type="application/ld+json"]').each((index, element) => {
      try {
        const scriptContent = $(element).html();
        if (!scriptContent) return;

        const parsed = JSON.parse(scriptContent);
        
        // Handle both single objects and arrays
        const schemaObjects = Array.isArray(parsed) ? parsed : [parsed];
        
        schemaObjects.forEach((schemaObj, objIndex) => {
          if (schemaObj && typeof schemaObj === 'object' && schemaObj['@type']) {
            const schema: ParsedSchema = {
              type: schemaObj['@type'],
              properties: schemaObj,
              source: validatedUrl,
              path: `script[${index}].object[${objIndex}]`
            };

            // Extract nested schemas
            const nestedSchemas: ParsedSchema[] = [];
            extractNestedSchemas(schemaObj, nestedSchemas, `${schema.path}.nested`);
            schema.nested = nestedSchemas;

            schemas.push(schema);
          }
        });
      } catch (error) {
        extractionErrors.push(`Failed to parse JSON-LD script ${index}: ${error}`);
      }
    });

    // Also check for microdata (simplified extraction)
    $('[itemtype]').each((index, element) => {
      try {
        const itemtype = $(element).attr('itemtype');
        if (itemtype) {
          const schemaType = itemtype.split('/').pop() || 'Thing';
          const properties: Record<string, unknown> = {};
          
          $(element).find('[itemprop]').each((_, propElement) => {
            const propName = $(propElement).attr('itemprop');
            const propValue = $(propElement).text().trim();
            if (propName && propValue) {
              properties[propName] = propValue;
            }
          });

          if (Object.keys(properties).length > 0) {
            schemas.push({
              type: schemaType,
              properties: { '@type': schemaType, ...properties },
              source: validatedUrl,
              path: `microdata[${index}]`
            });
          }
        }
      } catch (error) {
        extractionErrors.push(`Failed to parse microdata ${index}: ${error}`);
      }
    });

    // Analyze schemas
    const analysis = analyzeSchemas(schemas);

    const result: SchemaExtractionResult = {
      schemas,
      analysis,
      rawHtml: html,
      extractionErrors
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Schema analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze schema' },
      { status: 500 }
    );
  }
}

function extractNestedSchemas(obj: Record<string, unknown>, nestedSchemas: ParsedSchema[], path: string) {
  if (!obj || typeof obj !== 'object') return;

  Object.entries(obj).forEach(([key, value]) => {
    if (key === '@type' && typeof value === 'string') {
      // This is a schema object
      const schema: ParsedSchema = {
        type: value,
        properties: obj,
        source: 'nested',
        path: path
      };
      nestedSchemas.push(schema);
    } else if (Array.isArray(value)) {
      // Check if array contains schema objects
      value.forEach((item, index) => {
        if (item && typeof item === 'object' && item['@type']) {
          extractNestedSchemas(item, nestedSchemas, `${path}.${key}[${index}]`);
        }
      });
    } else if (value && typeof value === 'object' && value && typeof value === 'object' && '@type' in value) {
      // Nested schema object
      extractNestedSchemas(value, nestedSchemas, `${path}.${key}`);
    }
  });
}

function analyzeSchemas(schemas: ParsedSchema[]): SchemaAnalysis {
  const schemaTypes = [...new Set(schemas.map(s => s.type))];
  const allProperties = new Set<string>();
  const richElements = new Set<string>();
  
  // Collect all properties and identify rich elements
  schemas.forEach(schema => {
    Object.keys(schema.properties).forEach(prop => {
      allProperties.add(prop);
      
      // Identify rich elements
      if (['image', 'images', 'photo', 'photos'].includes(prop.toLowerCase())) {
        richElements.add('Images');
      }
      if (['rating', 'review', 'reviews', 'aggregateRating'].includes(prop.toLowerCase())) {
        richElements.add('Ratings & Reviews');
      }
      if (['price', 'offers', 'priceRange'].includes(prop.toLowerCase())) {
        richElements.add('Pricing');
      }
      if (['address', 'location', 'geo', 'latitude', 'longitude'].includes(prop.toLowerCase())) {
        richElements.add('Location');
      }
      if (['phone', 'email', 'contactPoint'].includes(prop.toLowerCase())) {
        richElements.add('Contact Information');
      }
      if (['openingHours', 'hours', 'availability'].includes(prop.toLowerCase())) {
        richElements.add('Business Hours');
      }
    });
  });

  // Determine complexity
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (schemas.length > 5 || richElements.size > 3) {
    complexity = 'complex';
  } else if (schemas.length > 2 || richElements.size > 1) {
    complexity = 'moderate';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (richElements.size === 0) {
    recommendations.push('Consider adding image schema for better visual appeal');
  }
  if (!schemaTypes.includes('Organization') && !schemaTypes.includes('LocalBusiness')) {
    recommendations.push('Add Organization or LocalBusiness schema for better brand recognition');
  }
  if (!schemaTypes.includes('BreadcrumbList')) {
    recommendations.push('Include breadcrumb navigation schema for better site structure');
  }
  if (schemas.length < 2) {
    recommendations.push('Consider combining multiple schema types for comprehensive markup');
  }
  
  // Add AI Overview specific recommendations
  if (!schemaTypes.includes('HowTo') && !schemaTypes.includes('FAQPage')) {
    recommendations.push('Add HowTo schema for step-by-step instructions to improve AI Overview visibility');
    recommendations.push('Include FAQPage schema for common questions to appear in AI Overviews');
  }
  if (!schemaTypes.includes('Product') && !schemaTypes.includes('Service')) {
    recommendations.push('Consider Product or Service schema if you offer products/services');
  }
  if (!schemaTypes.includes('Review') && !schemaTypes.includes('AggregateRating')) {
    recommendations.push('Add Review or AggregateRating schema for social proof in search results');
  }
  
  // Add specific recommendations based on content type
  if (schemaTypes.includes('WebPage') && !schemaTypes.includes('HowTo') && !schemaTypes.includes('FAQPage')) {
    recommendations.push('Transform generic WebPage into HowTo or FAQPage for better AI Overview visibility');
  }

  return {
    totalSchemas: schemas.length,
    schemaTypes,
    commonProperties: Array.from(allProperties).slice(0, 10), // Top 10 properties
    richElements: Array.from(richElements),
    complexity,
    recommendations
  };
} 