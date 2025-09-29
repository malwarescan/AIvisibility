# Neural Command - Complete Programmer's Guide

## Executive Summary

Neural Command is an AI-powered platform designed to optimize content for AI search engines and large language models. The platform provides comprehensive tools for analyzing, optimizing, and monitoring content performance across multiple AI platforms including ChatGPT, Claude, Perplexity, and Google AI Overviews.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks and context
- **Deployment**: Railway with automatic deployments

### Backend
- **API**: Next.js API routes
- **AI Integration**: OpenAI GPT-4 services
- **Web Crawling**: Puppeteer + Cheerio
- **Data Processing**: Custom analysis services

### Design System
- **Theme**: Light theme with liquid light blue over solid white
- **Icons**: Tasteful and minimal (no emojis per user preference)
- **Layout**: Apple-inspired clean design with subtle animations
- **Responsive**: Mobile-first design with progressive enhancement

## Application Architecture

### Directory Structure
```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API endpoints
│   │   └── tools/         # Tool-specific APIs
│   ├── tools/             # Tool pages
│   │   ├── layout.tsx     # Tools layout wrapper
│   │   ├── page.tsx       # Tools overview dashboard
│   │   └── [tool-name]/   # Individual tool pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── common/           # Shared components
│   ├── tools/            # Tool-specific components
│   │   └── shared/       # Shared tool components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── ai/              # AI services
│   ├── analysis/        # Analysis services
│   ├── crawler/         # Web crawling
│   ├── core/            # Core utilities
│   └── queue/           # Queue management
└── types/               # TypeScript definitions
    └── schema/          # Schema-related types
```

## Core Tools & Pages

### 1. AI Overview Schema Reverse Engineer (`/tools/ai-overview-schema-reverse-engineer`)
**Purpose**: Analyze AI Overview snippets to extract and reverse-engineer schema patterns
- **Features**: URL analysis, schema extraction, pattern recognition
- **API**: `/api/tools/ai-overview-schema-reverse-engineer/analyze`
- **Components**: SchemaInputEditor, PatternAnalysis, ExtractionResults

### 2. Schema Scoring & Validation (`/tools/schema-scoring`)
**Purpose**: Score and validate schema markup for AI optimization
- **Features**: Schema validation, scoring algorithms, optimization suggestions
- **API**: `/api/tools/schema-scoring/analyze`
- **Components**: SchemaValidator, ScoreDisplay, OptimizationPanel

### 3. Authority Signal Monitor (`/tools/authority`)
**Purpose**: Monitor and optimize authority signals for AI platforms
- **Features**: E-A-T analysis, authority scoring, signal tracking
- **API**: `/api/tools/authority/analyze`
- **Components**: AuthorityDashboard, SignalTracker, EATAnalyzer
- **Status**: ✅ Fully functional with OpenAI integration

### 4. Agentic Visibility Scanner (`/tools/agentic-visibility`)
**Purpose**: Scan and analyze visibility across AI platforms
- **Features**: Multi-platform visibility analysis, optimization recommendations
- **API**: `/api/tools/agentic-visibility/analyze`
- **Components**: VisibilityScanner, PlatformAnalysis, OptimizationTools

### 5. Agentic API (`/tools/connect`)
**Purpose**: API integrations and automation for AI platforms
- **Features**: Platform connections, automation workflows, API management
- **API**: `/api/tools/connect/analyze`
- **Components**: ConnectionManager, WorkflowBuilder, APIDashboard
- **Status**: ✅ Fully functional

### 6. SEO Flywheel Workflow (`/tools/flywheel`)
**Purpose**: Orchestrated workflow combining all tools
- **Features**: Multi-tool integration, automated workflows, progress tracking
- **Components**: WorkflowEngine, ProgressTracker, IntegrationHub

### 7. Schema Optimizer (`/tools/schema-optimizer`)
**Purpose**: Optimize JSON-LD schema for AI consumption
- **Features**: Schema analysis, optimization, generation, consensus analysis
- **API**: `/api/schema-optimize`, `/api/schema-consensus`
- **Components**: SchemaInputEditor, ConsensusScoreCard, AgentFeedbackAccordion
- **Status**: ✅ Fully functional with Craigslist-esque styling

## API Architecture

### Standardized API Structure
All APIs follow the pattern: `/api/tools/{tool-name}/{action}`

### Available Endpoints

#### Analysis Endpoints
- `POST /api/tools/agentrank/analyze` - Agent ranking analysis
- `POST /api/tools/authority/analyze` - Authority signal analysis
- `POST /api/tools/analytics/analyze` - Performance analytics
- `POST /api/tools/citationflow/analyze` - Citation flow analysis
- `POST /api/tools/agentic-visibility/analyze` - Visibility analysis

#### Schema Endpoints
- `POST /api/schema-optimize` - Schema optimization
- `POST /api/schema-consensus` - Multi-agent consensus analysis
- `POST /api/schema-analyze` - Schema analysis
- `POST /api/schema-reverse-engineer/analyze` - Schema reverse engineering

#### Specialized Endpoints
- `POST /api/analyze-website` - Website analysis
- `POST /api/start-worker` - Background task management
- `POST /api/behavior-replay/replay` - Behavior replay execution

### Request/Response Format
```typescript
// Request
interface APIRequest {
  url?: string;
  query?: string;
  schema?: string;
  options?: Record<string, any>;
}

// Response
interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
  tool: string;
  action: string;
}
```

## Data Models & Types

### Core Interfaces

#### WebsiteData
```typescript
interface WebsiteData {
  performance: {
    loadTime: number;
    responseTime: number;
    statusCode: number;
  };
  content: {
    wordCount: number;
    readabilityScore: number;
    headingStructure: Record<string, string[]>;
  };
  aiFactors: {
    schemaMarkup: any;
    jsonLd: any;
    citations: any;
  };
}
```

#### AuthorityResult
```typescript
interface AuthorityResult {
  overallScore: number;
  eatScore: {
    expertise: number;
    authoritativeness: number;
    trustworthiness: number;
  };
  aiOptimization: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    google: number;
  };
  recommendations: string[];
}
```

#### SchemaAnalysis
```typescript
interface SchemaAnalysis {
  qualityScore: number;
  completenessScore: number;
  aiOptimizationScore: number;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  recommendations: Recommendation[];
}
```

## Component Architecture

### Shared Components

#### Layout Components
- **ToolsLayout**: Main wrapper for all tool pages
- **Sidebar**: Navigation sidebar with tool descriptions
- **Header**: Page headers and navigation
- **Footer**: Call-to-action sections

#### UI Components
- **Button**: Standardized button component
- **Modal**: Modal dialogs and overlays
- **Card**: Content cards and containers
- **ScoreCircle**: Circular score displays
- **TimeRangeSelector**: Date/time range pickers

#### Tool-Specific Components
- **SchemaInputEditor**: JSON schema input with validation
- **ConsensusScoreCard**: Multi-agent consensus display
- **AgentFeedbackAccordion**: Collapsible agent feedback
- **MetricsOverview**: Performance metrics grid
- **PlatformGrid**: AI platform analysis grid

### Animation System
- **AutoAnimatedElement**: Entrance animations (slideUp, fadeIn, scaleIn)
- **Staggered Animations**: Sequential element animations
- **Scroll Triggers**: Animations based on scroll position

## Service Layer

### Core Services

#### OpenAIService
```typescript
class OpenAIService {
  async analyzeContent(content: string): Promise<AnalysisResult>
  async generateSchema(url: string, type: string): Promise<SchemaResult>
  async calculateAuthority(url: string): Promise<AuthorityScore>
}
```

#### WebCrawler
```typescript
class WebsiteCrawler {
  async crawlPage(url: string): Promise<WebsiteData>
  async extractContent(html: string): Promise<ExtractedContent>
  async analyzePerformance(url: string): Promise<PerformanceData>
}
```

#### AuthorityService
```typescript
class EnhancedAuthorityService {
  async calculateAuthority(url: string): Promise<AuthorityResult>
  async getEATScore(content: ContentData): Promise<EATScore>
  async generateRecommendations(analysis: AuthorityAnalysis): Promise<string[]>
}
```

## State Management

### Global State
- **User Preferences**: Theme, language, default settings
- **Authentication**: User sessions and permissions
- **Tool State**: Current tool configurations
- **Data Cache**: Cached analysis results

### Local State
- **Form Data**: User inputs and selections
- **Loading States**: Progress indicators
- **Error Handling**: Error states and recovery
- **Real-time Updates**: Live data synchronization

## Development Workflow

### Recommended Tool Usage Order
1. **Start with Authority Signal Monitor**: Establish baseline authority
2. **Optimize with Schema Tools**: Enhance structured data
3. **Analyze with AI Overview Reverse Engineer**: Understand AI patterns
4. **Monitor with Visibility Scanner**: Track AI platform performance
5. **Automate with Agentic API**: Set up integrations
6. **Orchestrate with SEO Flywheel**: Run complete workflows

### Performance Optimization
- **Real-time Updates**: 5-second intervals for live data
- **Caching Strategy**: Intelligent data caching
- **API Rate Limiting**: Optimized API usage
- **Lazy Loading**: Component-level code splitting

## Deployment & Infrastructure

### Environment Setup
- **Development**: `npm run dev` (localhost:3000)
- **Production**: Railway automatic deployments
- **Environment Variables**: OpenAI API keys, database URLs

### Build Process
- **TypeScript**: Compile-time type checking
- **Tailwind**: CSS optimization and purging
- **Next.js**: Static generation and optimization

## Testing & Quality Assurance

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Component Testing**: React component tests
- **API Testing**: Endpoint validation

### User Experience
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliance
- **Performance**: Core Web Vitals optimization
- **Error Handling**: Graceful error recovery

## Future Roadmap

### Planned Features
- **Database Integration**: PostgreSQL for data persistence
- **Real-time Updates**: WebSocket connections
- **Advanced Analytics**: Machine learning insights
- **API Marketplace**: Third-party integrations

### Technical Improvements
- **Performance**: Server-side rendering optimization
- **Scalability**: Microservices architecture
- **Security**: Enhanced authentication and authorization
- **Monitoring**: Comprehensive logging and analytics

This guide provides complete context for understanding and working with the Neural Command platform. All tools are functional, APIs are standardized, and the codebase follows modern React/Next.js best practices with a focus on AI optimization and user experience.

