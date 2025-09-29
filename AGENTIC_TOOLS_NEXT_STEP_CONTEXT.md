# Neural Command - Agentic Tools Next Step Context

## 1. Project Overview

### High-Level Summary
Neural Command is an AI search optimization platform that provides specialized tools for optimizing content across AI search engines (ChatGPT, Claude, Perplexity, Google AI). The platform offers 8 core tools that analyze, optimize, and monitor content performance in AI-driven search environments.

### Primary Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Node.js
- **AI Integration**: OpenAI API (GPT-4), Anthropic Claude API
- **Database**: PostgreSQL (planned), currently using in-memory storage
- **Deployment**: Vercel (planned)
- **UI Components**: Custom Apple-inspired design system with AutoAnimatedElement

### Directory Structure - `/tools`

```
src/app/tools/
├── agentrank/           # AI agent response simulation
├── authority/           # E-A-T framework analysis
├── analytics/           # Performance analytics
├── citationflow/        # Citation pattern tracking
├── agentic-visibility/  # Cross-agent presence analysis
├── schema-optimizer/    # JSON-LD optimization
├── schema-reverse-engineer/ # Schema pattern analysis
└── schema-scoring/      # Schema validation
```

### Tool Descriptions

1. **AgentRank** (`/tools/agentrank`)
   - Simulates how AI agents (ChatGPT, Claude, Perplexity) would rank content
   - Provides confidence scores and platform-specific insights
   - Uses mock data with realistic scoring algorithms

2. **Authority Signal Monitor** (`/tools/authority`)
   - Analyzes E-A-T (Expertise, Authoritativeness, Trustworthiness) signals
   - Provides comprehensive authority scoring across AI platforms
   - Integrates with real website analysis API

3. **AI Analytics** (`/tools/analytics`)
   - Tracks AI-specific performance metrics
   - Monitors visibility, citations, and authority across platforms
   - Uses real data from website analysis API

4. **CitationFlow** (`/tools/citationflow`)
   - Tracks citation patterns and authority flow
   - Analyzes how content is referenced across AI platforms
   - Uses mock data with realistic citation patterns

5. **Agentic Visibility Scanner** (`/tools/agentic-visibility`)
   - Analyzes domain presence across all AI agents
   - Provides visibility scoring and platform optimization
   - Uses mock data with cross-platform analysis

6. **Schema Optimizer** (`/tools/schema-optimizer`)
   - Optimizes JSON-LD schema markup for AI consumption
   - Provides rich result optimization and AI-friendly markup
   - Uses mock data with schema validation

7. **Schema Reverse Engineer** (`/tools/schema-reverse-engineer`)
   - Extracts and analyzes schema patterns from AI Overview results
   - Provides competitive insights and optimization suggestions
   - Uses mock data with pattern analysis

8. **Schema Scoring** (`/tools/schema-scoring`)
   - Validates and scores JSON-LD schema markup
   - Provides field-level suggestions for AI optimization
   - Uses mock data with scoring algorithms

## 2. Current Tool State

### Tools Using Real Data
- **Authority Signal Monitor**: Integrates with `/api/analyze-website` endpoint
- **AI Analytics**: Uses real data from website analysis API
- **AgentRank**: Partial real data integration (some endpoints)

### Tools Using Mock/Static Data
- **CitationFlow**: Mock citation patterns and authority flow
- **Agentic Visibility Scanner**: Mock cross-platform visibility data
- **Schema Optimizer**: Mock schema validation and optimization
- **Schema Reverse Engineer**: Mock pattern analysis
- **Schema Scoring**: Mock scoring algorithms

### Implementation Status

#### UI Components (✅ Complete)
- All tool pages have functional UI
- Apple-inspired design system implemented
- AutoAnimatedElement for staggered animations
- Responsive design across all tools
- Export functionality (JSON/PDF)

#### API Endpoints (🔄 Partial)
- `/api/analyze-website` - Real website analysis
- `/api/tools/agentrank/queryAgent` - Mock agent simulation
- `/api/tools/authority/analyze` - Real authority analysis
- `/api/tools/analytics/analyze` - Real analytics data
- `/api/tools/citationflow/analyze` - Mock citation data
- `/api/tools/agentic-visibility/analyze` - Mock visibility data
- `/api/tools/schema/optimize` - Mock schema optimization
- `/api/tools/schema-reverse-engineer/analyze` - Mock pattern analysis

#### Backend Services (🔄 Partial)
- `OpenAIService.ts` - OpenAI integration utility
- `EnhancedAuthorityService.ts` - Authority analysis service
- `AgentRankService.ts` - Agent ranking service
- `CitationFlowService.ts` - Citation analysis service
- `SchemaAnalyzer.ts` - Schema analysis service

### OpenAI Integration Status

#### Currently Using OpenAI (✅ Implemented)
- **Authority Signal Monitor**: Uses GPT-4 for content analysis and E-A-T scoring
- **AI Analytics**: Uses GPT-4 for performance insights and recommendations

#### Needs OpenAI Integration (🔄 Pending)
- **AgentRank**: Needs GPT-4 for realistic agent response simulation
- **Schema Optimizer**: Needs GPT-4 for intelligent schema optimization
- **Schema Reverse Engineer**: Needs GPT-4 for pattern recognition
- **CitationFlow**: Needs GPT-4 for citation analysis
- **Agentic Visibility Scanner**: Needs GPT-4 for visibility analysis

## 3. OpenAI Integration Plan

### Current OpenAI Usage
OpenAI is currently used in:
- **Authority Signal Monitor**: Content quality analysis, E-A-T scoring, recommendations
- **AI Analytics**: Performance insights, trend analysis, optimization suggestions

### Existing OpenAI Infrastructure
- **File**: `src/lib/ai/OpenAIService.ts`
- **Methods**: 
  - `analyzeContent()` - Content analysis
  - `generateRecommendations()` - Optimization suggestions
  - `scoreAuthority()` - E-A-T scoring
- **Configuration**: Uses GPT-4 with temperature 0.7 for creative analysis

### OpenAI Integration Needed

#### 1. AgentRank Enhancement
- **Current**: Mock agent responses
- **Needed**: Real GPT-4 simulation of ChatGPT, Claude, Perplexity responses
- **Endpoint**: `/api/tools/agentrank/queryAgent`
- **Implementation**: Use different system prompts for each AI agent

#### 2. Schema Optimizer Enhancement
- **Current**: Mock schema validation
- **Needed**: GPT-4-powered schema optimization and suggestions
- **Endpoint**: `/api/tools/schema/optimize`
- **Implementation**: Analyze existing schema and suggest improvements

#### 3. Schema Reverse Engineer Enhancement
- **Current**: Mock pattern analysis
- **Needed**: GPT-4 pattern recognition from AI Overview results
- **Endpoint**: `/api/tools/schema-reverse-engineer/analyze`
- **Implementation**: Extract schema patterns from SERP data

#### 4. CitationFlow Enhancement
- **Current**: Mock citation data
- **Needed**: GPT-4 analysis of citation patterns and authority flow
- **Endpoint**: `/api/tools/citationflow/analyze`
- **Implementation**: Analyze content for citation opportunities

#### 5. Agentic Visibility Enhancement
- **Current**: Mock visibility data
- **Needed**: GPT-4 analysis of cross-platform presence
- **Endpoint**: `/api/tools/agentic-visibility/analyze`
- **Implementation**: Analyze domain presence across AI platforms

## 4. Immediate Next Priority

### Recommended Next Tool: AgentRank
**Why AgentRank**: It's the most visible tool and would benefit most from realistic AI agent simulation.

### Current State
- **UI**: Complete with real-time metrics and agent breakdown
- **API**: `/api/tools/agentrank/queryAgent` exists but uses mock data
- **Backend**: `AgentRankService.ts` exists but needs OpenAI integration

### Desired Behavior
1. **User enters a query** (e.g., "best coffee shops in San Francisco")
2. **System simulates responses** from ChatGPT, Claude, and Perplexity
3. **GPT-4 generates realistic responses** for each AI agent
4. **System analyzes response quality** and provides confidence scores
5. **User sees how their content would rank** in each AI agent's response

### Implementation Plan
1. **Enhance `AgentRankService.ts`** with OpenAI integration
2. **Update `/api/tools/agentrank/queryAgent`** to use real GPT-4 calls
3. **Create agent-specific system prompts** for realistic simulation
4. **Add response quality scoring** using GPT-4
5. **Implement caching** for repeated queries

### Technical Details
```typescript
// Enhanced AgentRankService.ts
class AgentRankService {
  async simulateAgentResponse(query: string, agent: 'chatgpt' | 'claude' | 'perplexity') {
    const systemPrompt = this.getAgentSystemPrompt(agent);
    const response = await openAIService.generateResponse(systemPrompt, query);
    return this.analyzeResponseQuality(response, agent);
  }
  
  private getAgentSystemPrompt(agent: string) {
    // Different prompts for each AI agent's personality
  }
}
```

## 5. API Keys & Environment

### Environment Configuration
**File**: `.env.local`
```env
OPENAI_API_KEY=sk-...  # Required for GPT-4 integration
ANTHROPIC_API_KEY=sk-ant-...  # For Claude integration (future)
DATABASE_URL=postgresql://...  # For persistent storage (future)
```

### OpenAI Service Usage
**File**: `src/lib/ai/OpenAIService.ts`
```typescript
class OpenAIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY!;
  }
  
  async analyzeContent(content: string) {
    // Uses GPT-4 for content analysis
  }
  
  async generateRecommendations(context: string) {
    // Uses GPT-4 for optimization suggestions
  }
  
  async scoreAuthority(domain: string, content: string) {
    // Uses GPT-4 for E-A-T scoring
  }
}
```

### Current Integration Points
- **Authority Signal Monitor**: Uses `OpenAIService.analyzeContent()` and `scoreAuthority()`
- **AI Analytics**: Uses `OpenAIService.generateRecommendations()`
- **AgentRank**: Needs integration with new `simulateAgentResponse()` method

### Security Considerations
- API keys are stored in environment variables
- No hardcoded keys in source code
- Rate limiting implemented for OpenAI API calls
- Error handling for API failures

## 6. Success Metrics

### Technical Metrics
- **Response Time**: < 3 seconds for agent simulation
- **Accuracy**: 90%+ correlation with real AI agent responses
- **Cost**: < $0.10 per analysis
- **Reliability**: 99%+ successful API calls

### User Experience Metrics
- **Engagement**: 70%+ users complete full analysis
- **Satisfaction**: 4.5+ star rating for AgentRank tool
- **Retention**: 60%+ users return for additional analyses

## 7. Next Steps After AgentRank

1. **Schema Optimizer** - GPT-4-powered schema optimization
2. **CitationFlow** - Real citation pattern analysis
3. **Agentic Visibility** - Cross-platform presence analysis
4. **Schema Reverse Engineer** - Pattern recognition from SERP data

This roadmap will transform Neural Command from a prototype with mock data into a production-ready AI search optimization platform with real AI-powered insights. 