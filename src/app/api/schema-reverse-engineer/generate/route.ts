import { NextRequest, NextResponse } from 'next/server';

interface ParsedSchema {
  type: string;
  properties: Record<string, unknown>;
  nested?: ParsedSchema[];
  source: string;
  confidence?: number;
}

interface UserContent {
  title?: string;
  description?: string;
  images?: string[];
  ratings?: number;
  price?: string;
  availability?: string;
  author?: string;
  datePublished?: string;
  keywords?: string;
  [key: string]: unknown;
}

// interface GeneratedSchema { // Not currently used
//   jsonLd: string;
//   schemaTypes: string[];
//   validation: ValidationResult;
//   suggestions: string[];
// }

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { sourceSchemas, userContent, query } = await request.json();

    if (!sourceSchemas || !Array.isArray(sourceSchemas)) {
      return NextResponse.json(
        { error: 'Source schemas are required' },
        { status: 400 }
      );
    }

    if (!userContent || !userContent.title || !userContent.description) {
      return NextResponse.json(
        { error: 'User content with title and description is required' },
        { status: 400 }
      );
    }

    // Analyze source schemas to find patterns
    const schemaAnalysis = analyzeSchemas(sourceSchemas);
    
    // Generate optimized schema
    const generatedSchema = generateOptimizedSchema(schemaAnalysis, userContent, query);
    
    // Validate the generated schema
    const validation = validateSchema(generatedSchema);
    
    // Generate suggestions
    const suggestions = generateSuggestions(generatedSchema, userContent, schemaAnalysis);

    return NextResponse.json({
      success: true,
      jsonLd: generatedSchema,
      schemaTypes: Object.keys(schemaAnalysis.typePatterns),
      validation,
      suggestions
    });

  } catch (error) {
    console.error('Schema generation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate schema',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function analyzeSchemas(schemas: ParsedSchema[]) {
  const typePatterns: Record<string, { count: number; properties: Record<string, number>; required: Set<string> }> = {};
  const commonProperties: Record<string, number> = {};
  const richElements: string[] = [];

  schemas.forEach(schema => {
    // Analyze schema types
    if (!typePatterns[schema.type]) {
      typePatterns[schema.type] = {
        count: 0,
        properties: {},
        required: new Set<string>(),
        optional: new Set<string>()
      };
    }
    
    typePatterns[schema.type].count++;
    
    // Analyze properties
    Object.entries(schema.properties).forEach(([key]) => {
      if (!commonProperties[key]) {
        commonProperties[key] = 0;
      }
      commonProperties[key]++;
      
      // Track rich elements
      if (['image', 'images', 'rating', 'ratings', 'price', 'availability', 'review', 'reviews'].includes(key)) {
        if (!richElements.includes(key)) {
          richElements.push(key);
        }
      }
      
      // Track property frequency for this type
      if (!typePatterns[schema.type].properties[key]) {
        typePatterns[schema.type].properties[key] = 0;
      }
      typePatterns[schema.type].properties[key]++;
    });
  });

  return {
    typePatterns,
    commonProperties,
    richElements,
    totalSchemas: schemas.length
  };
}

function generateOptimizedSchema(analysis: Record<string, unknown>, userContent: UserContent, query: string) {
  // Find the most common schema type
  const mostCommonType = Object.entries(analysis.typePatterns)
    .sort(([,a]: { count: number }, [,b]: { count: number }) => b.count - a.count)[0][0];
  
  const typePattern = analysis.typePatterns[mostCommonType];
  
  // Start with the base schema structure
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": mostCommonType
  };

  // Add required properties based on schema type
  if (userContent.title) {
    schema.name = userContent.title;
  }
  
  if (userContent.description) {
    schema.description = userContent.description;
  }

  // Add images if available
  if (userContent.images && userContent.images.length > 0) {
    if (userContent.images.length === 1) {
      schema.image = userContent.images[0];
    } else {
      schema.image = userContent.images;
    }
  }

  // Add ratings if available
  if (userContent.ratings) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": userContent.ratings,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  // Add price if available
  if (userContent.price) {
    schema.offers = {
      "@type": "Offer",
      "price": userContent.price,
      "priceCurrency": "USD"
    };
    
    if (userContent.availability) {
      schema.offers.availability = `https://schema.org/${userContent.availability}`;
    }
  }

  // Add author if available
  if (userContent.author) {
    schema.author = {
      "@type": "Person",
      "name": userContent.author
    };
  }

  // Add date published if available
  if (userContent.datePublished) {
    schema.datePublished = userContent.datePublished;
  }

  // Add keywords if available
  if (userContent.keywords) {
    schema.keywords = userContent.keywords;
  }

  // Add URL if available (from query context)
  if (query) {
    schema.url = `https://example.com/search?q=${encodeURIComponent(query)}`;
  }

  // Add additional properties based on common patterns
  const additionalProps = getAdditionalProperties(typePattern, analysis.commonProperties);
  Object.assign(schema, additionalProps);

  return JSON.stringify(schema, null, 2);
}

function getAdditionalProperties(typePattern: { count: number; properties: Record<string, number> }, _commonProperties: Record<string, number>) {
  const additional: Record<string, unknown> = {};
  
  // Add properties that appear frequently in this schema type
  Object.entries(typePattern.properties)
    .filter(([, count]: number) => count > typePattern.count * 0.5) // Appears in more than 50% of schemas
    .forEach(([prop]: [string, number]) => {
      if (!additional[prop]) {
        // Add placeholder or default value based on property type
        switch (prop) {
          case 'url':
            additional[prop] = 'https://example.com';
            break;
          case 'mainEntityOfPage':
            additional[prop] = 'https://example.com';
            break;
          case 'publisher':
            additional[prop] = {
              "@type": "Organization",
              "name": "Your Organization"
            };
            break;
          default:
            // Skip properties that might conflict with user content
            break;
        }
      }
    });

  return additional;
}

function validateSchema(schemaJson: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  try {
    const schema = JSON.parse(schemaJson);
    
    // Basic validation
    if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
      result.errors.push('Missing or invalid @context');
      result.isValid = false;
    }
    
    if (!schema['@type']) {
      result.errors.push('Missing @type');
      result.isValid = false;
    }
    
    if (!schema.name && !schema.title) {
      result.warnings.push('Missing name or title property');
    }
    
    if (!schema.description) {
      result.warnings.push('Missing description property');
    }
    
    // Validate specific schema types
    if (schema['@type'] === 'Product') {
      if (!schema.offers) {
        result.warnings.push('Product schema should include offers');
      }
    }
    
    if (schema['@type'] === 'Article') {
      if (!schema.author) {
        result.warnings.push('Article schema should include author');
      }
      if (!schema.datePublished) {
        result.warnings.push('Article schema should include datePublished');
      }
    }
    
  } catch {
    result.isValid = false;
    result.errors.push('Invalid JSON format');
  }

  return result;
}

function generateSuggestions(schemaJson: string, userContent: UserContent, analysis: Record<string, unknown>): string[] {
  const suggestions: string[] = [];
  const schema = JSON.parse(schemaJson);
  
  // Content-based suggestions
  if (userContent.description && userContent.description.length < 150) {
    suggestions.push('Consider expanding your description to 150+ characters for better SEO');
  }
  
  if (!userContent.images || userContent.images.length === 0) {
    suggestions.push('Add high-quality images to improve visual appeal in search results');
  }
  
  if (!userContent.ratings) {
    suggestions.push('Include ratings and reviews to enhance rich snippet eligibility');
  }
  
  // Schema-specific suggestions
  if (schema['@type'] === 'Product' && !userContent.price) {
    suggestions.push('Add pricing information to trigger product rich snippets');
  }
  
  if (schema['@type'] === 'Article' && !userContent.author) {
    suggestions.push('Include author information for better article schema');
  }
  
  // Rich element suggestions
  const missingRichElements = analysis.richElements.filter((element: string) => {
    return !schema[element] && !schema[element.replace(/s$/, '')]; // Handle singular/plural
  });
  
  if (missingRichElements.length > 0) {
    suggestions.push(`Consider adding: ${missingRichElements.slice(0, 3).join(', ')}`);
  }
  
  // Performance suggestions
  if (Object.keys(schema).length < 10) {
    suggestions.push('Consider adding more properties to make your schema more comprehensive');
  }
  
  return suggestions.slice(0, 5); // Limit to 5 suggestions
} 