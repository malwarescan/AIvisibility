# Neural Command - Complete Site Context & Technical Reference

## Table of Contents

1. [Project Overview](#project-overview)
2. [Site Architecture](#site-architecture)
3. [Core Tools & Features](#core-tools--features)
4. [Technical Implementation](#technical-implementation)
5. [API Endpoints](#api-endpoints)
6. [Database & Queue System](#database--queue-system)
7. [AI Integration](#ai-integration)
8. [Frontend Components](#frontend-components)
9. [Development Environment](#development-environment)
10. [Deployment & Configuration](#deployment--configuration)

## Project Overview

**Neural Command** is a comprehensive AI search intelligence platform built with Next.js 15, TypeScript, and Tailwind CSS. The platform provides seven specialized tools for optimizing content across 20+ AI platforms including ChatGPT, Claude, Perplexity, and Google AI Overviews.

### Key Value Proposition
- **AI-First SEO**: Optimize for AI search engines, not just Google
- **Real-time Analytics**: Track performance across multiple AI platforms
- **Predictive Insights**: 6-month forecasting for AI search trends
- **Comprehensive Coverage**: 20+ AI platforms monitored simultaneously

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, BullMQ, Redis, Puppeteer
- **AI Services**: OpenAI GPT-4, Natural Language Processing
- **Database**: Prisma ORM with PostgreSQL support
- **Queue System**: BullMQ with Redis for background processing

## Site Architecture

### File Structure
```
nrl-cmd/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Homepage
│   │   ├── globals.css                   # Global styles
│   │   ├── api/                          # API routes
│   │   │   ├── analyze-website/
│   │   │   ├── start-worker/
│   │   │   ├── test-ai/
│   │   │   └── test-analysis/
│   │   └── tools/                        # Tool pages
│   │       ├── layout.tsx                # Tools layout
│   │       ├── page.tsx                  # Tools overview
│   │       ├── agentrank/
│   │       ├── analytics/
│   │       ├── authority/
│   │       ├── auditor/
│   │       ├── batch-authority/
│   │       ├── citationflow/
│   │       ├── connect/
│   │       └── querymind/
│   ├── components/
│   │   ├── apple/                        # Apple-style components
│   │   ├── enhanced/                     # Enhanced UI components
│   │   ├── tools/                        # Tool-specific components
│   │   │   ├── shared/                   # Shared tool components
│   │   │   └── batch/                    # Batch processing components
│   │   └── ui/                           # UI components
│   ├── hooks/                            # Custom React hooks
│   ├── lib/                              # Core libraries
│   │   ├── ai/                           # AI services
│   │   ├── analysis/                     # Analysis engines
│   │   ├── crawler/                      # Web crawling
│   │   └── queue/                        # Queue management
│   └── types/                            # TypeScript types
├── public/                               # Static assets
├── package.json                          # Dependencies
├── tailwind.config.js                    # Tailwind configuration
└── next.config.ts                        # Next.js configuration
```

### Routing Structure
- **Homepage**: `/` - Landing page with hero and feature showcase
- **Tools Overview**: `/tools` - Complete tools dashboard
- **Individual Tools**: `/tools/[tool-name]` - Specific tool interfaces
- **API Endpoints**: `/api/*` - Backend API routes

## Core Tools & Features

### 1. AgentRank Simulator
**Path**: `/tools/agentrank`
**Purpose**: Predict AI agent ranking across 20+ platforms
**Key Features**:
- 94% prediction accuracy
- Platform-specific analysis
- Real-time scoring
- Historical trend analysis

### 2. CitationFlow Optimizer
**Path**: `/tools/citationflow`
**Purpose**: Increase citation frequency and authority signals
**Key Features**:
- 300% citation increase potential
- Multi-platform citation tracking
- Authority signal optimization
- Citation opportunity identification

### 3. AI Search Analytics
**Path**: `/tools/analytics`
**Purpose**: Track AI-specific metrics ignored by traditional SEO
**Key Features**:
- Real-time performance tracking
- AI platform-specific metrics
- Conversational query analysis
- Knowledge graph optimization

### 4. Authority Signal Monitor
**Path**: `/tools/authority`
**Purpose**: Monitor authority signals across 20+ AI platforms
**Key Features**:
- A+ authority scoring
- E-A-T framework assessment
- Platform-specific analysis
- Real-time terminal display

### 5. AI-Readiness Auditor
**Path**: `/tools/auditor`
**Purpose**: Technical optimization for AI search engines
**Key Features**:
- Comprehensive technical audit
- AI-specific optimization
- Performance analysis
- Security assessment

### 6. QueryMind Prediction
**Path**: `/tools/querymind`
**Purpose**: 6-month forecasting for AI search trends
**Key Features**:
- 6-month trend forecasting
- Opportunity identification
- Competitive analysis
- Strategic planning

### 7. AgentConnect Hub
**Path**: `/tools/connect`
**Purpose**: API integrations and automation
**Key Features**:
- 20+ platform integrations
- Automated workflows
- API management
- Webhook support

## Technical Implementation

### Queue System Architecture

**Location**: `src/lib/queue/AnalysisQueue.ts`

```typescript
// Core queue management
export class AnalysisQueueManager {
  static async addAnalysisJob(jobData: AnalysisJob): Promise<string>
  static async getJobStatus(jobId: string): Promise<any>
  static async getQueueStats(): Promise<any>
  static async cleanupOldJobs(): Promise<void>
}

// Analysis job interface
export interface AnalysisJob {
  url: string
  userId?: string
  priority?: 'low' | 'normal' | 'high'
  options?: {
    includeScreenshots?: boolean
    includePerformance?: boolean
    includeAIFactors?: boolean
  }
}
```

### AI Service Implementation

**Location**: `src/lib/ai/OpenAIService.ts`

```typescript
class OpenAIService {
  // Content quality analysis
  async analyzeContentQuality(content: string, url: string)
  
  // Authority signal analysis
  async analyzeAuthoritySignals(websiteData: any, url: string)
  
  // SEO for AI analysis
  async analyzeSEOForAI(websiteData: any, url: string)
  
  // AI recommendations
  async generateAIRecommendations(websiteData: any, url: string)
  
  // AI search performance prediction
  async predictAISearchPerformance(websiteData: any, url: string)
  
  // Platform-specific analysis
  async analyzeForSpecificPlatform(content: string, platform: string, url: string)
}
```

### Web Crawler Implementation

**Location**: `src/lib/crawler/WebCrawler.ts`

```typescript
class WebsiteCrawler {
  // Initialize browser
  async initBrowser()
  
  // Crawl website
  async crawlWebsite(url: string)
  
  // Extract main content
  async extractMainContent(websiteData: any)
  
  // Analyze performance
  async analyzePerformance(url: string)
  
  // Close browser
  async close()
}
```

## API Endpoints

### 1. Website Analysis API
**Endpoint**: `POST /api/analyze-website`
**Purpose**: Submit analysis job to queue
**Request Body**:
```json
{
  "url": "https://example.com"
}
```
**Response**:
```json
{
  "success": true,
  "jobId": "job_123",
  "message": "Analysis queued successfully"
}
```

### 2. Job Status API
**Endpoint**: `GET /api/analyze-website?jobId=job_123`
**Purpose**: Check job progress and get results
**Response**:
```json
{
  "success": true,
  "jobId": "job_123",
  "status": "completed",
  "progress": 100,
  "result": {
    "authorityScore": {
      "overall": 85,
      "breakdown": {
        "technical": 90,
        "content": 85,
        "aiOptimization": 80
      }
    },
    "platformScores": {
      "chatgpt": 88,
      "claude": 85,
      "perplexity": 82,
      "googleAI": 90
    },
    "recommendations": [
      "Improve page loading speed",
      "Add more structured data",
      "Enhance content quality"
    ]
  }
}
```

### 3. Worker Management API
**Endpoint**: `POST /api/start-worker`
**Purpose**: Initialize background worker
**Response**:
```json
{
  "success": true,
  "message": "Analysis worker started"
}
```

### 4. AI Testing API
**Endpoint**: `GET /api/test-ai`
**Purpose**: Test AI service functionality
**Response**:
```json
{
  "success": true,
  "contentAnalysis": {
    "readability": 85,
    "quality": 78,
    "structure": 90
  }
}
```

## Database & Queue System

### Redis Configuration
```bash
# Redis Installation (macOS)
brew install redis
brew services start redis
redis-cli ping  # Returns: PONG
```

### Queue Configuration
```typescript
// BullMQ Queue Setup
const analysisQueue = new Queue('authority-analysis', {
  connection: new Redis(process.env.REDIS_URL || 'redis://localhost:6379'),
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
})
```

### Fallback System
When Redis is unavailable, the system falls back to in-memory processing:
```typescript
// In-memory job storage for development
const inMemoryJobs = new Map<string, any>()
let jobCounter = 0
```

## AI Integration

### OpenAI Service Configuration
```typescript
// Environment Variables
OPENAI_API_KEY=sk-your-api-key-here
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-api-key-here

// Client Initialization
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})
```

### AI Analysis Capabilities

#### Content Quality Analysis
- **Readability Scoring**: Flesch-Kincaid grade level
- **AI Comprehension**: AI-specific content understanding
- **Structural Analysis**: Content organization assessment
- **Topical Authority**: Subject matter expertise evaluation

#### Authority Signal Analysis
- **E-A-T Framework**: Expertise, Authoritativeness, Trustworthiness
- **Platform Optimization**: ChatGPT, Claude, Perplexity specific
- **Trust Signals**: Security, transparency, user experience
- **Competitive Analysis**: Industry positioning and opportunities

#### SEO for AI Analysis
- **Conversational Queries**: AI-specific query optimization
- **Knowledge Graph**: Entity and relationship optimization
- **Citation Potential**: Likelihood of being cited by AI
- **Technical Optimization**: AI-specific technical factors

## Frontend Components

### Core UI Components

#### Apple-Style Components
**Location**: `src/components/apple/`
- `AppleAnimatedElement.tsx` - Animated UI elements
- `AppleAnimatedSection.tsx` - Section animations
- `AppleCard.tsx` - Card components
- `AppleSection.tsx` - Section layouts
- `AppleTypography.tsx` - Typography system

#### Tool Components
**Location**: `src/components/tools/shared/`
- `Sidebar.tsx` - Navigation sidebar
- `Header.tsx` - Tool headers
- `MetricsOverview.tsx` - Metrics display
- `ScoreCircle.tsx` - Score visualization
- `TimeRangeSelector.tsx` - Time range selection
- `ContentAnalyzer.tsx` - Content analysis display
- `ForecastChart.tsx` - Forecasting charts
- `OpportunityCard.tsx` - Opportunity cards
- `OptimizationCard.tsx` - Optimization suggestions
- `PlatformGrid.tsx` - Platform comparison grid

#### UI Components
**Location**: `src/components/ui/`
- `AppleTerminal.tsx` - Terminal-style display
- `StatusIndicator.tsx` - Status indicators
- `DashboardChart.tsx` - Chart components
- `MetricCard.tsx` - Metric cards
- `AnalysisProgress.tsx` - Progress tracking
- `ToolProgressModal.tsx` - Progress modals

### Animation System
```typescript
// AutoAnimatedElement component
interface AnimationProps {
  animation: 'slideUp' | 'fadeIn' | 'scale' | 'slideLeft'
  intensity?: number
  delay?: number
  className?: string
}
```

### State Management
- **React Hooks**: Custom hooks for state management
- **Local State**: Component-level state with useState
- **Queue Integration**: Real-time progress tracking
- **Error Handling**: Comprehensive error states

## Development Environment

### Prerequisites
```bash
# Node.js (v18+)
node --version

# Redis (for production)
brew install redis
brew services start redis

# Environment Variables
cp .env.example .env
# Add OpenAI API key and other configuration
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```bash
# Required
OPENAI_API_KEY=sk-your-api-key-here
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-api-key-here

# Optional (for production)
REDIS_URL=redis://localhost:6379
USE_REDIS=true
NODE_ENV=production
```

### Development Workflow
1. **Feature Development**: Create feature branches with `feature/` prefix
2. **Testing**: Test each tool individually
3. **Queue Testing**: Verify background job processing
4. **AI Integration**: Test OpenAI service functionality
5. **UI/UX**: Ensure responsive design and animations

## Deployment & Configuration

### Production Deployment
```bash
# Build application
npm run build

# Start production server
npm start

# Environment setup
export NODE_ENV=production
export REDIS_URL=your-redis-url
export OPENAI_API_KEY=your-openai-key
```

### Performance Optimization
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by routes
- **Caching**: Redis-based caching for analysis results
- **CDN**: Static asset delivery optimization

### Security Considerations
- **API Key Management**: Secure environment variable handling
- **Input Validation**: URL validation and sanitization
- **Rate Limiting**: Queue-based processing prevents overload
- **Error Handling**: Comprehensive error recovery

### Monitoring & Analytics
- **Queue Monitoring**: BullMQ dashboard integration
- **Performance Tracking**: Real-time analysis metrics
- **Error Logging**: Comprehensive error tracking
- **User Analytics**: Tool usage and performance metrics

## Current Status & Roadmap

### ✅ Completed Features
- **Core Platform**: All 7 tools implemented and functional
- **Queue System**: BullMQ with Redis fallback
- **AI Integration**: OpenAI GPT-4 analysis
- **Frontend**: Responsive design with animations
- **API Layer**: Complete REST API implementation
- **Error Handling**: Comprehensive error recovery

### 🔄 In Progress
- **Performance Optimization**: Queue processing improvements
- **AI Model Enhancement**: More sophisticated analysis algorithms
- **Platform Expansion**: Additional AI platform support
- **Analytics Dashboard**: Enhanced reporting capabilities

### 🚀 Planned Features
- **Real-time Collaboration**: Multi-user analysis sessions
- **Advanced Forecasting**: Machine learning trend prediction
- **API Marketplace**: Third-party integrations
- **Mobile Application**: Native mobile app development

## Technical Debt & Improvements

### Immediate Priorities
1. **Queue Performance**: Optimize background job processing
2. **AI Accuracy**: Improve analysis algorithm accuracy
3. **Error Recovery**: Enhanced error handling and recovery
4. **Testing Coverage**: Comprehensive unit and integration tests

### Long-term Improvements
1. **Scalability**: Horizontal scaling for high traffic
2. **AI Models**: Custom-trained models for specific domains
3. **Real-time Features**: WebSocket-based real-time updates
4. **Advanced Analytics**: Machine learning insights

## Support & Documentation

### Key Documentation Files
- `FULL_PROJECT_CONTEXT.md` - Complete project overview
- `AUTHORITY_TOOL_COMPLETE_DOCUMENTATION.md` - Authority tool details
- `AI_INTEGRATION_SETUP.md` - AI service configuration
- `REDIS_SETUP_GUIDE.md` - Redis installation and configuration

### Development Resources
- **Next.js Documentation**: https://nextjs.org/docs
- **BullMQ Documentation**: https://docs.bullmq.io
- **OpenAI API Documentation**: https://platform.openai.com/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs

This comprehensive context provides Claude with complete understanding of the Neural Command platform, its architecture, tools, and technical implementation for effective development and maintenance. 