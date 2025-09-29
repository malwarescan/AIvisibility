# Schema Optimizer - OpenAI Integration Plan

## Context & Overview

### Current State
The Schema Optimizer tool currently uses mock data to simulate JSON-LD schema optimization. It provides basic schema validation and suggestions but lacks the intelligent analysis and optimization capabilities that GPT-4 can provide.

### Goal
Transform the Schema Optimizer into an intelligent, GPT-4-powered tool that can analyze existing schema markup, suggest improvements, and generate optimized JSON-LD for better AI search engine performance.

### Integration Strategy
Leverage the newly enhanced `simulateAgentResponse()` function from OpenAIService to create specialized schema analysis and optimization capabilities.

## Current Implementation Analysis

### Files Involved
- **`src/app/tools/schema-optimizer/page.tsx`** - Main UI component
- **`src/app/api/tools/schema/optimize/route.ts`** - API endpoint (currently mock)
- **`src/lib/analysis/SchemaAnalyzer.ts`** - Schema analysis service
- **`src/lib/ai/OpenAIService.ts`** - Enhanced with agent simulation

### Current Mock Data Structure
```typescript
interface SchemaOptimizationResult {
  originalSchema: any;
  optimizedSchema: any;
  score: number;
  improvements: string[];
  recommendations: string[];
  validationErrors: string[];
  aiOptimization: {
    suggestions: string[];
    confidence: number;
  };
}
```

## OpenAI Integration Requirements

### 1. Schema Analysis Agent
**Purpose**: Analyze existing JSON-LD schema for quality, completeness, and AI optimization potential.

**Input**:
```typescript
{
  schema: string;           // JSON-LD schema markup
  url: string;             // Website URL for context
  contentType: string;     // "article", "product", "organization", etc.
  targetPlatforms: string[]; // ["google", "chatgpt", "claude", "perplexity"]
}
```

**Desired Output**:
```typescript
{
  analysis: {
    qualityScore: number;      // 0-100 overall quality
    completenessScore: number; // 0-100 schema completeness
    aiOptimizationScore: number; // 0-100 AI-specific optimization
    issues: Array<{
      type: "error" | "warning" | "suggestion";
      field: string;
      message: string;
      impact: "high" | "medium" | "low";
    }>;
    strengths: string[];
  };
  recommendations: Array<{
    priority: "high" | "medium" | "low";
    category: string;
    description: string;
    implementation: string;
    expectedImpact: number;
  }>;
}
```

### 2. Schema Optimization Agent
**Purpose**: Generate optimized JSON-LD schema based on analysis and best practices.

**Input**:
```typescript
{
  originalSchema: string;      // Current JSON-LD
  analysis: SchemaAnalysis;    // Results from analysis agent
  optimizationGoals: string[]; // ["rich-results", "ai-consumption", "seo"]
  targetSchema: string;        // Desired schema type
}
```

**Desired Output**:
```typescript
{
  optimizedSchema: string;     // Improved JSON-LD markup
  improvements: Array<{
    field: string;
    originalValue: any;
    optimizedValue: any;
    reason: string;
    impact: number;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  aiOptimization: {
    chatgptScore: number;      // How well ChatGPT can consume
    claudeScore: number;       // How well Claude can consume
    perplexityScore: number;   // How well Perplexity can consume
    googleScore: number;       // Rich results potential
  };
}
```

### 3. Schema Generation Agent
**Purpose**: Generate new JSON-LD schema from scratch based on content and requirements.

**Input**:
```typescript
{
  contentType: string;         // "article", "product", "organization", etc.
  content: string;            // Page content or description
  requirements: {
    richResults: boolean;     // Target rich results
    aiOptimization: boolean;  // Optimize for AI consumption
    seo: boolean;            // SEO optimization
  };
  customFields?: Record<string, any>; // Additional requirements
}
```

**Desired Output**:
```typescript
{
  generatedSchema: string;     // Complete JSON-LD markup
  schemaType: string;         // "@type" value used
  fields: Array<{
    field: string;
    value: any;
    importance: "required" | "recommended" | "optional";
    description: string;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  optimization: {
    richResultsEligibility: boolean;
    aiConsumptionScore: number;
    seoScore: number;
  };
}
```

## Implementation Plan

### Phase 1: Enhanced OpenAIService Methods

#### 1. Add Schema Analysis Method
```typescript
// Add to OpenAIService.ts
async analyzeSchema(schema: string, url: string, contentType: string): Promise<SchemaAnalysis> {
  const systemPrompt = `You are a Schema.org and JSON-LD expert specializing in AI search optimization. Analyze the provided JSON-LD schema for quality, completeness, and AI optimization potential. Consider how well AI agents like ChatGPT, Claude, and Perplexity can consume and understand the structured data.`;
  
  const userPrompt = `
    Analyze this JSON-LD schema:
    
    URL: ${url}
    Content Type: ${contentType}
    Schema: ${schema}
    
    Provide a comprehensive analysis including:
    - Quality score (0-100)
    - Completeness score (0-100) 
    - AI optimization score (0-100)
    - Issues and warnings
    - Strengths
    - Specific recommendations for improvement
    
    Return only valid JSON in the specified format.
  `;
  
  return this.simulateAgentResponse(userPrompt, 'schema-analyzer');
}
```

#### 2. Add Schema Optimization Method
```typescript
async optimizeSchema(originalSchema: string, analysis: SchemaAnalysis, goals: string[]): Promise<SchemaOptimization> {
  const systemPrompt = `You are a Schema.org optimization expert. Generate improved JSON-LD schema that maximizes AI consumption and rich results potential while maintaining semantic accuracy.`;
  
  const userPrompt = `
    Optimize this JSON-LD schema:
    
    Original Schema: ${originalSchema}
    Analysis: ${JSON.stringify(analysis)}
    Optimization Goals: ${goals.join(', ')}
    
    Generate an optimized schema with:
    - Improved field values
    - Additional recommended fields
    - Better AI consumption structure
    - Rich results optimization
    
    Return only valid JSON in the specified format.
  `;
  
  return this.simulateAgentResponse(userPrompt, 'schema-optimizer');
}
```

#### 3. Add Schema Generation Method
```typescript
async generateSchema(contentType: string, content: string, requirements: SchemaRequirements): Promise<SchemaGeneration> {
  const systemPrompt = `You are a Schema.org expert. Generate complete, optimized JSON-LD schema markup based on content type and requirements. Focus on AI consumption and rich results eligibility.`;
  
  const userPrompt = `
    Generate JSON-LD schema for:
    
    Content Type: ${contentType}
    Content: ${content.substring(0, 1000)}...
    Requirements: ${JSON.stringify(requirements)}
    
    Create a complete schema with:
    - All required fields
    - Recommended optional fields
    - AI-optimized structure
    - Rich results eligibility
    
    Return only valid JSON in the specified format.
  `;
  
  return this.simulateAgentResponse(userPrompt, 'schema-generator');
}
```

### Phase 2: Update API Endpoint

#### Enhanced Route Handler
```typescript
// src/app/api/tools/schema/optimize/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schema, url, contentType, action, requirements } = body;
    
    const openAIService = new OpenAIService();
    
    let result;
    
    switch (action) {
      case 'analyze':
        result = await openAIService.analyzeSchema(schema, url, contentType);
        break;
      case 'optimize':
        const analysis = await openAIService.analyzeSchema(schema, url, contentType);
        result = await openAIService.optimizeSchema(schema, analysis, requirements.goals);
        break;
      case 'generate':
        result = await openAIService.generateSchema(contentType, requirements.content, requirements);
        break;
      default:
        throw new Error('Invalid action specified');
    }
    
    // Create dashboard insight
    const insight = createToolInsight(
      'schema-optimizer',
      result.analysis?.qualityScore || result.optimization?.aiOptimization?.averageScore || 75,
      [
        `Schema quality score: ${result.analysis?.qualityScore || 'N/A'}`,
        `AI optimization score: ${result.analysis?.aiOptimizationScore || 'N/A'}`,
        `Issues found: ${result.analysis?.issues?.length || 0}`,
        `Recommendations: ${result.recommendations?.length || 0}`
      ],
      result.recommendations?.map(r => r.description) || [
        'Improve schema completeness',
        'Add AI-optimized fields',
        'Enhance rich results eligibility'
      ]
    );
    
    return NextResponse.json({
      success: true,
      data: { result, insight },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Schema optimization error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Schema optimization failed' },
      { status: 500 }
    );
  }
}
```

### Phase 3: Update UI Component

#### Enhanced Schema Optimizer Page
```typescript
// src/app/tools/schema-optimizer/page.tsx
export default function SchemaOptimizerPage() {
  const [action, setAction] = useState<'analyze' | 'optimize' | 'generate'>('analyze');
  const [schema, setSchema] = useState('');
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('Article');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/tools/schema/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          schema: action !== 'generate' ? schema : '',
          url,
          contentType,
          requirements: {
            goals: ['rich-results', 'ai-consumption', 'seo'],
            content: action === 'generate' ? schema : '',
            richResults: true,
            aiOptimization: true,
            seo: true
          }
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data.data.result);
      }
    } catch (error) {
      console.error('Schema optimization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Action Selection */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Schema Optimization</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setAction('analyze')}
            className={`px-4 py-2 rounded-lg ${action === 'analyze' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Analyze Schema
          </button>
          <button
            onClick={() => setAction('optimize')}
            className={`px-4 py-2 rounded-lg ${action === 'optimize' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Optimize Schema
          </button>
          <button
            onClick={() => setAction('generate')}
            className={`px-4 py-2 rounded-lg ${action === 'generate' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Generate Schema
          </button>
        </div>
      </div>
      
      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Article">Article</option>
              <option value="Product">Product</option>
              <option value="Organization">Organization</option>
              <option value="WebPage">WebPage</option>
              <option value="FAQPage">FAQPage</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {action === 'generate' ? 'Content Description' : 'JSON-LD Schema'}
            </label>
            <textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder={action === 'generate' ? 'Describe your content...' : '{"@context": "https://schema.org", ...}'}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `${action.charAt(0).toUpperCase() + action.slice(1)} Schema`}
          </button>
        </div>
      </div>
      
      {/* Results Display */}
      {result && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          {/* Display results based on action type */}
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
```

## Expected Outcomes

### 1. Enhanced Schema Analysis
- **Intelligent Quality Assessment**: GPT-4 analyzes schema completeness and quality
- **AI Optimization Scoring**: Specific scores for ChatGPT, Claude, and Perplexity consumption
- **Detailed Recommendations**: Actionable suggestions for improvement
- **Issue Detection**: Identifies errors, warnings, and optimization opportunities

### 2. Smart Schema Optimization
- **Field Enhancement**: Improves existing field values for better AI consumption
- **Missing Field Addition**: Suggests and adds recommended optional fields
- **Structure Optimization**: Reorganizes schema for better AI parsing
- **Rich Results Enhancement**: Optimizes for Google rich results eligibility

### 3. Intelligent Schema Generation
- **Content-Aware Generation**: Creates schema based on content description
- **Type-Specific Optimization**: Tailors schema to specific content types
- **AI-Consumption Focus**: Prioritizes fields that AI agents value
- **Validation Integration**: Ensures generated schema is valid and complete

### 4. Dashboard Integration
- **Real Insights**: Feeds actual analysis data to the dashboard
- **Performance Tracking**: Monitors schema optimization effectiveness
- **Trend Analysis**: Tracks improvements over time
- **Recommendation Engine**: Provides ongoing optimization suggestions

## Success Metrics

### Technical Metrics
- **Analysis Accuracy**: 90%+ correlation with manual schema review
- **Optimization Quality**: 85%+ improvement in AI consumption scores
- **Generation Completeness**: 95%+ of generated schemas pass validation
- **Response Time**: < 5 seconds for schema analysis and optimization

### User Experience Metrics
- **Schema Quality Improvement**: 70%+ average improvement in quality scores
- **User Satisfaction**: 4.5+ star rating for schema optimization
- **Adoption Rate**: 60%+ of users implement suggested optimizations
- **Return Usage**: 80%+ of users return for additional optimizations

## Implementation Timeline

### Week 1: Core Integration
- Add schema analysis method to OpenAIService
- Update API endpoint with basic analysis functionality
- Test with sample schemas

### Week 2: Optimization Features
- Add schema optimization method
- Implement optimization logic
- Add validation and error handling

### Week 3: Generation Features
- Add schema generation method
- Implement content-aware generation
- Add comprehensive validation

### Week 4: UI Enhancement
- Update frontend with new features
- Add result visualization
- Implement dashboard integration

This integration will transform the Schema Optimizer from a basic validation tool into an intelligent, GPT-4-powered schema optimization platform that significantly improves AI search engine performance and rich results eligibility. 