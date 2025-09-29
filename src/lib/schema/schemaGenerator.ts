import OpenAI from "openai";
import { readFileSync } from "fs";
import { JSONSchema7 } from "json-schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OPTIMIZATION_PROMPT_TEMPLATE = `
You are an expert in semantic search optimization and schema.org implementation for AI Overviews and rich search results.

1. Analyze the following competitor schema: \n[SCHEMA_INPUT]
2. Classify it by type (FAQPage, HowTo, WebPage, Product, etc.)
3. Evaluate the schema's:
   - Keyword quality
   - AI-readability
   - Structural completeness
   - Rich snippet features
   - Support for transactional or informational user intent
4. Compare this schema against the goal of ranking for: "[USER'S TARGET SEARCH QUERY]"
5. Based on this analysis, generate a fully optimized JSON-LD schema block that includes ALL of the following improvements:

REQUIRED ELEMENTS:
- WebPage as top-level container
- Publisher/Organization with name, URL, and logo
- HowTo with detailed steps including estimatedTime and tool properties
- FAQPage with natural language questions starting with Yes/No or direct responses
- BreadcrumbList for navigation context
- PotentialAction for enhanced AI triggers
- SpeakableSpecification for voice search optimization

STEP IMPROVEMENTS:
- Each HowToStep must include: name, text, estimatedTime, and tool
- Steps should be clear, sequential, and voice-readable
- Include specific time estimates (PT2M, PT5M, etc.)
- Add relevant tools/supplies for each step

FAQ IMPROVEMENTS:
- Questions should start with Yes/No or brief direct responses
- Use natural phrasing like "To transfer a domain..."
- Answers should be comprehensive but concise
- Focus on common user concerns and questions

TRUST SIGNALS:
- Include publisher organization with proper branding
- Add logo and contact information
- Include breadcrumb navigation for site structure
- Add potential actions for direct user engagement

VOICE OPTIMIZATION:
- All text should be natural and voice-search friendly
- Use conversational language
- Include speakable specifications
- Optimize for Google Assistant and other voice platforms

Final output must be:
- A single copy-paste \`<script type="application/ld+json">\` block
- Formatted, valid, and wrapped in a single code block
- Include ALL the improvements mentioned above
`;

export async function generateOptimizedSchema(
  extractedSchema: Record<string, any>,
  targetQuery: string
): Promise<string> {
  const prompt = OPTIMIZATION_PROMPT_TEMPLATE
    .replace("[SCHEMA_INPUT]", JSON.stringify(extractedSchema, null, 2))
    .replace("[USER'S TARGET SEARCH QUERY]", targetQuery);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a structured data expert helping websites dominate AI search engines.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
  });

  const result = completion.choices?.[0]?.message?.content ?? "";
  return result.trim();
}

// Enhanced schema generation with multiple intent types
export async function generateIntentSpecificSchema(
  extractedSchema: Record<string, any>,
  targetQuery: string,
  intentType: 'informational' | 'transactional' | 'navigational' = 'informational'
): Promise<string> {
  const intentPrompts = {
    informational: `
Focus on educational content, how-to guides, and comprehensive explanations.
Include: FAQPage, HowTo, Article, WebPage with detailed content sections.
Optimize for: "how to", "what is", "why", "guide", "tutorial" queries.
`,
    transactional: `
Focus on product information, pricing, reviews, and purchase decisions.
Include: Product, Offer, Review, Organization, BreadcrumbList.
Optimize for: "buy", "price", "review", "compare", "best" queries.
`,
    navigational: `
Focus on brand recognition, company information, and direct navigation.
Include: Organization, WebPage, BreadcrumbList, SiteNavigationElement.
Optimize for: brand names, company names, direct website queries.
`
  };

  const intentPrompt = intentPrompts[intentType];
  
  const enhancedPrompt = OPTIMIZATION_PROMPT_TEMPLATE
    .replace("[SCHEMA_INPUT]", JSON.stringify(extractedSchema, null, 2))
    .replace("[USER'S TARGET SEARCH QUERY]", targetQuery)
    .replace("6. Ensure all names", `6. Intent Type: ${intentType}\n${intentPrompt}\n7. Ensure all names`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a structured data expert helping websites dominate AI search engines.",
      },
      {
        role: "user",
        content: enhancedPrompt,
      },
    ],
    temperature: 0.4,
  });

  const result = completion.choices?.[0]?.message?.content ?? "";
  return result.trim();
}

// Schema validation and optimization
export function validateAndOptimizeSchema(schemaString: string): {
  isValid: boolean;
  optimizedSchema: string;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  let optimizedSchema = schemaString;

  try {
    // Extract JSON from script tag if present
    const scriptMatch = schemaString.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      optimizedSchema = scriptMatch[1].trim();
    }

    // Parse JSON
    const schema = JSON.parse(optimizedSchema);

    // Validate required fields
    if (!schema["@context"]) {
      errors.push("Missing @context field");
    }
    if (!schema["@type"]) {
      errors.push("Missing @type field");
    }

    // Check for common issues
    if (schema["@type"] && Array.isArray(schema["@type"])) {
      warnings.push("Multiple @type values may cause confusion");
    }

    // Validate schema.org compliance
    if (schema["@context"] !== "https://schema.org") {
      warnings.push("Consider using https://schema.org as @context");
    }

    // Add script tags if missing
    if (!schemaString.includes("<script")) {
      optimizedSchema = `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`;
    }

    return {
      isValid: errors.length === 0,
      optimizedSchema,
      errors,
      warnings
    };
  } catch (error) {
    errors.push(`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      isValid: false,
      optimizedSchema: schemaString,
      errors,
      warnings
    };
  }
}

// Generate schema recommendations based on analysis
export function generateSchemaRecommendations(
  originalSchema: Record<string, any>,
  targetQuery: string,
  intentType: string
): Array<{
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  impact: number;
  implementation: string;
}> {
  const recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    impact: number;
    implementation: string;
  }> = [];

  // Analyze schema completeness
  const hasName = originalSchema.name || originalSchema.title;
  const hasDescription = originalSchema.description;
  const hasUrl = originalSchema.url;

  if (!hasName) {
    recommendations.push({
      priority: 'high' as const,
      category: 'completeness',
      title: 'Add Name/Title',
      description: 'Missing name or title property which is crucial for AI understanding',
      impact: 85,
      implementation: 'Add "name" or "title" property with your page title'
    });
  }

  if (!hasDescription) {
    recommendations.push({
      priority: 'high' as const,
      category: 'completeness',
      title: 'Add Description',
      description: 'Missing description which helps AI understand your content',
      impact: 75,
      implementation: 'Add "description" property with a compelling summary'
    });
  }

  if (!hasUrl) {
    recommendations.push({
      priority: 'medium' as const,
      category: 'completeness',
      title: 'Add URL',
      description: 'Missing URL which helps with canonicalization',
      impact: 60,
      implementation: 'Add "url" property with your page URL'
    });
  }

  // Intent-specific recommendations
  if (intentType === 'informational') {
    recommendations.push({
      priority: 'high' as const,
      category: 'intent',
      title: 'Add FAQ Content',
      description: 'FAQ content performs well for informational queries',
      impact: 90,
      implementation: 'Include FAQPage schema with relevant questions and answers'
    });
  }

  if (intentType === 'transactional') {
    recommendations.push({
      priority: 'high' as const,
      category: 'intent',
      title: 'Add Product Schema',
      description: 'Product schema is essential for transactional queries',
      impact: 95,
      implementation: 'Include Product schema with pricing and availability information'
    });
  }

  return recommendations;
}

// Usage example function
export async function generateOptimizedSchemaForQuery(
  extractedSchema: Record<string, any>,
  targetQuery: string,
  intentType: 'informational' | 'transactional' | 'navigational' = 'informational'
): Promise<{
  schema: string;
  validation: ReturnType<typeof validateAndOptimizeSchema>;
  recommendations: ReturnType<typeof generateSchemaRecommendations>;
}> {
  const schema = await generateIntentSpecificSchema(extractedSchema, targetQuery, intentType);
  const validation = validateAndOptimizeSchema(schema);
  const recommendations = generateSchemaRecommendations(extractedSchema, targetQuery, intentType);

  return {
    schema: validation.optimizedSchema,
    validation,
    recommendations
  };
} 