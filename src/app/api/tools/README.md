# Tools API Structure

This directory contains standardized API endpoints for all Neural Command tools, following the `api/tools/{tool-name}/{action}` convention.

## Structure

```
api/tools/
├── agentrank/
│   ├── analyze/
│   │   └── route.ts
│   └── queryAgent/
│       └── route.ts
├── citationflow/
│   └── analyze/
│       └── route.ts
├── analytics/
│   └── analyze/
│       └── route.ts
├── authority/
│   └── analyze/
│       └── route.ts
├── schema/
│   ├── analyze/
│   │   └── route.ts
│   └── validate/
│       └── route.ts
├── serp/
│   └── analyze/
│       └── route.ts
├── agentic-schema-optimizer/
│   ├── extractSchema/
│   │   └── route.ts
│   └── optimizeSchema/
│       └── route.ts
├── overviewiq/
│   └── predictOverview/
│       └── route.ts
└── README.md
```

## API Convention

### URL Pattern
- **Format**: `/api/tools/{tool-name}/{action}`
- **Examples**: 
  - `/api/tools/agentrank/analyze`
  - `/api/tools/agentic-schema-optimizer/extractSchema`
  - `/api/tools/overviewiq/predictOverview`
  - `/api/tools/agentrank/queryAgent`

### Request Format
All endpoints accept POST requests with JSON body:
```json
{
  "url": "https://example.com",
  "query": "search query",
  "options": {
    // Tool-specific options
  }
}
```

### Response Format
Standardized response structure:
```json
{
  "success": true,
  "data": {
    // Tool-specific analysis data
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tool": "tool-name",
  "action": "action-name"
}
```

### Error Handling
Consistent error responses:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Available Endpoints

### AgentRank
- **POST** `/api/tools/agentrank/analyze` - Analyze URL for AI agent predictions
- **POST** `/api/tools/agentrank/queryAgent` - Query specific AI agent

### CitationFlow
- **POST** `/api/tools/citationflow/analyze` - Analyze URL for citation flow optimization

### Analytics
- **POST** `/api/tools/analytics/analyze` - Analyze URL for AI search analytics

### Authority
- **POST** `/api/tools/authority/analyze` - Analyze URL for authority signal optimization

### Schema
- **POST** `/api/tools/schema/analyze` - Analyze JSON-LD schema for optimization
- **POST** `/api/tools/schema/validate` - Validate JSON-LD schema

### SERP
- **POST** `/api/tools/serp/analyze` - Analyze SERP results for optimization opportunities

### Agentic Schema Optimizer
- **POST** `/api/tools/agentic-schema-optimizer/extractSchema` - Extract schema from URL
- **POST** `/api/tools/agentic-schema-optimizer/optimizeSchema` - Optimize schema using competitor analysis

### OverviewIQ
- **POST** `/api/tools/overviewiq/predictOverview` - Predict AI Overview eligibility

## Input Validation

All endpoints include comprehensive input validation:

### Common Validations
- **Required Fields**: Check for required parameters
- **URL Format**: Validate URL structure when applicable
- **Schema Format**: Validate JSON-LD schema structure
- **Agent Validation**: Validate agent names and platforms
- **Data Types**: Ensure correct data types for all inputs

### Error Codes
- `MISSING_URL` - URL parameter is required but not provided
- `INVALID_URL` - URL format is invalid
- `MISSING_SCHEMA` - Schema parameter is required but not provided
- `INVALID_SCHEMA_FORMAT` - Schema format is invalid
- `MISSING_QUERY` - Query parameter is required but not provided
- `MISSING_AGENT` - Agent parameter is required but not provided
- `INVALID_AGENT` - Invalid agent specified
- `INVALID_PLATFORM` - Invalid platform specified
- `ANALYSIS_FAILED` - Analysis process failed
- `EXTRACTION_FAILED` - Schema extraction failed
- `OPTIMIZATION_FAILED` - Schema optimization failed
- `PREDICTION_FAILED` - Overview prediction failed
- `QUERY_FAILED` - Agent query failed
- `VALIDATION_FAILED` - Schema validation failed

## Usage Examples

### AgentRank Analysis
```javascript
const response = await fetch('/api/tools/agentrank/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com',
    options: { includeTrends: true }
  })
});
```

### Agent Query
```javascript
const response = await fetch('/api/tools/agentrank/queryAgent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'What is AI search optimization?',
    agent: 'chatgpt',
    platform: 'chatgpt'
  })
});
```

### Schema Validation
```javascript
const response = await fetch('/api/tools/schema/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    schema: { '@type': 'Article', 'headline': 'Title' }
  })
});
```

### Schema Extraction
```javascript
const response = await fetch('/api/tools/agentic-schema-optimizer/extractSchema', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});
```

### Overview Prediction
```javascript
const response = await fetch('/api/tools/overviewiq/predictOverview', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'How to optimize for AI search',
    url: 'https://example.com'
  })
});
```

## Core Library Integration

All endpoints use the core libraries:
- `@/lib/core/serp` - SERP analysis and fetching
- `@/lib/core/schema` - Schema analysis and validation
- `@/lib/core/agentic` - Agent analysis and scoring
- `@/lib/analysis/*` - Enhanced analysis services

## Response Data Structure

### Analysis Endpoints
```json
{
  "success": true,
  "data": {
    "analysis": { /* tool-specific analysis */ },
    "metrics": { /* performance metrics */ },
    "recommendations": [ /* optimization suggestions */ ]
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tool": "tool-name",
  "action": "action-name"
}
```

### Validation Endpoints
```json
{
  "success": true,
  "data": {
    "validation": {
      "isValid": true,
      "issues": [],
      "warnings": [],
      "score": 85,
      "completeness": 90
    },
    "analysis": { /* detailed analysis */ }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tool": "tool-name",
  "action": "action-name"
}
```

## Migration Guide

To migrate from old endpoints to new standardized endpoints:

1. **Update URLs**: Change from `/api/{tool-name}/analyze` to `/api/tools/{tool-name}/{action}`
2. **Update Response Handling**: Use new standardized response format
3. **Update Error Handling**: Use new error codes and structure
4. **Test Integration**: Verify all endpoints work with new structure

## Future Endpoints

Additional actions can be added following the same pattern:
- `/api/tools/{tool-name}/export` - Export analysis results
- `/api/tools/{tool-name}/batch` - Batch processing
- `/api/tools/{tool-name}/optimize` - Optimization recommendations
- `/api/tools/{tool-name}/compare` - Comparison analysis
- `/api/tools/{tool-name}/monitor` - Continuous monitoring 