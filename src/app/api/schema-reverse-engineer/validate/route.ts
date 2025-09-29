import { NextRequest, NextResponse } from 'next/server';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  schemaType?: string;
  propertyCount?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { schema } = await request.json();

    if (!schema) {
      return NextResponse.json(
        { error: 'Schema is required' },
        { status: 400 }
      );
    }

    // Validate the schema
    const validation = validateSchema(schema);

    return NextResponse.json({
      success: true,
      ...validation
    });

  } catch (error) {
    console.error('Schema validation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to validate schema',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function validateSchema(schemaJson: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  try {
    const schema = JSON.parse(schemaJson);
    
    // Basic JSON-LD validation
    if (!schema['@context']) {
      result.errors.push('Missing @context property');
      result.isValid = false;
    } else if (schema['@context'] !== 'https://schema.org') {
      result.warnings.push('@context should be "https://schema.org" for Schema.org markup');
    }
    
    if (!schema['@type']) {
      result.errors.push('Missing @type property');
      result.isValid = false;
    } else {
      result.schemaType = schema['@type'];
    }
    
    // Count properties
    result.propertyCount = Object.keys(schema).length;
    
    // Validate specific schema types
    validateSchemaType(schema, result);
    
    // Validate property values
    validatePropertyValues(schema, result);
    
    // Check for common issues
    checkCommonIssues(schema, result);
    
  } catch (error) {
    result.isValid = false;
    result.errors.push('Invalid JSON format');
  }

  return result;
}

function validateSchemaType(schema: any, result: ValidationResult) {
  const schemaType = schema['@type'];
  
  switch (schemaType) {
    case 'Article':
      validateArticleSchema(schema, result);
      break;
    case 'Product':
      validateProductSchema(schema, result);
      break;
    case 'Recipe':
      validateRecipeSchema(schema, result);
      break;
    case 'Organization':
      validateOrganizationSchema(schema, result);
      break;
    case 'Person':
      validatePersonSchema(schema, result);
      break;
    case 'WebPage':
      validateWebPageSchema(schema, result);
      break;
    default:
      // Generic validation for unknown types
      validateGenericSchema(schema, result);
  }
}

function validateArticleSchema(schema: any, result: ValidationResult) {
  if (!schema.headline && !schema.name && !schema.title) {
    result.warnings.push('Article should include headline, name, or title');
  }
  
  if (!schema.description) {
    result.warnings.push('Article should include description');
  }
  
  if (!schema.author) {
    result.warnings.push('Article should include author information');
  }
  
  if (!schema.datePublished) {
    result.warnings.push('Article should include datePublished');
  }
  
  if (schema.author && typeof schema.author === 'object' && !schema.author['@type']) {
    result.warnings.push('Author should include @type property');
  }
}

function validateProductSchema(schema: any, result: ValidationResult) {
  if (!schema.name && !schema.title) {
    result.warnings.push('Product should include name or title');
  }
  
  if (!schema.description) {
    result.warnings.push('Product should include description');
  }
  
  if (!schema.offers) {
    result.warnings.push('Product should include offers information');
  } else {
    if (typeof schema.offers === 'object' && !schema.offers['@type']) {
      result.warnings.push('Offers should include @type property');
    }
  }
  
  if (!schema.image) {
    result.warnings.push('Product should include image');
  }
}

function validateRecipeSchema(schema: any, result: ValidationResult) {
  if (!schema.name && !schema.title) {
    result.warnings.push('Recipe should include name or title');
  }
  
  if (!schema.description) {
    result.warnings.push('Recipe should include description');
  }
  
  if (!schema.recipeIngredient) {
    result.warnings.push('Recipe should include recipeIngredient');
  }
  
  if (!schema.recipeInstructions) {
    result.warnings.push('Recipe should include recipeInstructions');
  }
}

function validateOrganizationSchema(schema: any, result: ValidationResult) {
  if (!schema.name) {
    result.warnings.push('Organization should include name');
  }
  
  if (!schema.url) {
    result.warnings.push('Organization should include url');
  }
}

function validatePersonSchema(schema: any, result: ValidationResult) {
  if (!schema.name) {
    result.warnings.push('Person should include name');
  }
  
  if (!schema.url) {
    result.warnings.push('Person should include url');
  }
}

function validateWebPageSchema(schema: any, result: ValidationResult) {
  if (!schema.name && !schema.title) {
    result.warnings.push('WebPage should include name or title');
  }
  
  if (!schema.description) {
    result.warnings.push('WebPage should include description');
  }
  
  if (!schema.url) {
    result.warnings.push('WebPage should include url');
  }
}

function validateGenericSchema(schema: any, result: ValidationResult) {
  if (!schema.name && !schema.title) {
    result.warnings.push('Schema should include name or title');
  }
  
  if (!schema.description) {
    result.warnings.push('Schema should include description');
  }
}

function validatePropertyValues(schema: any, result: ValidationResult) {
  // Validate URLs
  const urlProperties = ['url', 'image', 'logo', 'sameAs'];
  urlProperties.forEach(prop => {
    if (schema[prop]) {
      if (typeof schema[prop] === 'string') {
        try {
          new URL(schema[prop]);
        } catch {
          result.warnings.push(`${prop} should be a valid URL`);
        }
      } else if (Array.isArray(schema[prop])) {
        schema[prop].forEach((url: string, index: number) => {
          try {
            new URL(url);
          } catch {
            result.warnings.push(`${prop}[${index}] should be a valid URL`);
          }
        });
      }
    }
  });
  
  // Validate dates
  const dateProperties = ['datePublished', 'dateModified', 'dateCreated'];
  dateProperties.forEach(prop => {
    if (schema[prop]) {
      const date = new Date(schema[prop]);
      if (isNaN(date.getTime())) {
        result.warnings.push(`${prop} should be a valid date`);
      }
    }
  });
  
  // Validate ratings
  if (schema.aggregateRating) {
    const rating = schema.aggregateRating;
    if (rating.ratingValue && (rating.ratingValue < 0 || rating.ratingValue > 5)) {
      result.warnings.push('ratingValue should be between 0 and 5');
    }
  }
}

function checkCommonIssues(schema: Record<string, unknown>, result: ValidationResult) {
  // Check for missing required properties based on schema type
  // const schemaType = schema['@type']; // Not currently used
  
  // Check for potential duplicate properties
  if (schema.name && schema.title) {
    result.warnings.push('Both name and title are present - consider using only one');
  }
  
  // Check for proper nesting
  if (schema.author && typeof schema.author === 'object' && !schema.author['@type']) {
    result.warnings.push('Nested objects should include @type property');
  }
  
  // Check for array properties that should be objects
  if (schema.author && Array.isArray(schema.author)) {
    result.warnings.push('Author should be an object, not an array');
  }
  
  // Check for missing @type in nested objects
  const nestedObjects = ['author', 'publisher', 'offers', 'aggregateRating'];
  nestedObjects.forEach(prop => {
    if (schema[prop] && typeof schema[prop] === 'object' && !Array.isArray(schema[prop])) {
      if (!schema[prop]['@type']) {
        result.warnings.push(`${prop} should include @type property`);
      }
    }
  });
  
  // Check for proper currency format
  if (schema.offers && schema.offers.priceCurrency) {
    if (typeof schema.offers.priceCurrency !== 'string' || schema.offers.priceCurrency.length !== 3) {
      result.warnings.push('priceCurrency should be a 3-letter ISO currency code');
    }
  }
} 