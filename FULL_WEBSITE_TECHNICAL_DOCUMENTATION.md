# Neural Command Platform - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [API Endpoints](#api-endpoints)
8. [Database & Data Models](#database--data-models)
9. [Styling & UI Framework](#styling--ui-framework)
10. [Component Architecture](#component-architecture)
11. [State Management](#state-management)
12. [Authentication & Security](#authentication--security)
13. [Deployment & Infrastructure](#deployment--infrastructure)
14. [Development Workflow](#development-workflow)
15. [Testing Strategy](#testing-strategy)
16. [Performance Optimization](#performance-optimization)
17. [SEO & Meta Tags](#seo--meta-tags)
18. [Accessibility](#accessibility)
19. [Browser Support](#browser-support)
20. [Troubleshooting](#troubleshooting)

## Project Overview

### Purpose
Neural Command is an AI-powered platform that provides comprehensive tools for website analysis, authority scoring, schema optimization, and AI platform compatibility testing.

### Core Features
- **Authority Analysis**: Website authority scoring and analysis
- **Schema Optimizer**: AI-powered schema markup generation and optimization
- **Batch Processing**: Multi-URL analysis capabilities
- **AI Integration**: OpenAI-powered analysis and recommendations
- **Real-time Analytics**: Live data visualization and insights
- **Multi-platform Compatibility**: Support for ChatGPT, Claude, Perplexity, Google AI

### Target Users
- SEO professionals and digital marketers
- Web developers and technical teams
- Content creators and publishers
- AI researchers and developers

## Architecture Overview

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   Services      │
│                 │    │                 │    │   (OpenAI, etc) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Services      │    │   Data Sources  │
│   (React)       │    │   (TypeScript)  │    │   (Web Crawlers)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **User Input** → Frontend Components
2. **API Request** → Next.js API Routes
3. **Service Processing** → TypeScript Services
4. **External API Calls** → OpenAI, Web Crawlers
5. **Response Processing** → Data Transformation
6. **UI Updates** → React Component Re-renders

## Technology Stack

### Frontend
- **Framework**: Next.js 15.3.5 (React 18)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Icons**: Lucide React
- **Charts**: Custom Chart Components

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **HTTP Client**: Fetch API
- **Data Processing**: Custom Services

### External Services
- **AI Provider**: OpenAI GPT-4
- **Web Crawling**: Custom WebCrawler Service
- **Data Storage**: In-memory (development)
- **Hosting**: Vercel (production)

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js Built-in
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

## Project Structure

```
nrl-cmd/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── analyze-website/
│   │   │   ├── start-worker/
│   │   │   ├── test-ai/
│   │   │   ├── test-analysis/
│   │   │   ├── schema-analyze/
│   │   │   └── analyze-schema/
│   │   ├── tools/             # Tool Pages
│   │   │   ├── authority/
│   │   │   ├── analytics/
│   │   │   ├── auditor/
│   │   │   ├── batch-authority/
│   │   │   ├── citationflow/
│   │   │   ├── connect/
│   │   │   ├── querymind/
│   │   │   ├── agentrank/
│   │   │   └── schema-optimizer/
│   │   ├── globals.css        # Global Styles
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React Components
│   │   ├── apple/            # Apple-style Components
│   │   ├── enhanced/         # Enhanced Components
│   │   ├── tools/            # Tool-specific Components
│   │   │   ├── shared/       # Shared Tool Components
│   │   │   ├── batch/        # Batch Processing
│   │   │   └── schema/       # Schema Optimizer
│   │   └── ui/               # UI Components
│   ├── hooks/                # Custom React Hooks
│   ├── lib/                  # Utility Libraries
│   │   ├── ai/              # AI Services
│   │   ├── analysis/        # Analysis Services
│   │   ├── crawler/         # Web Crawling
│   │   └── queue/           # Queue Management
│   └── types/               # TypeScript Types
├── public/                  # Static Assets
├── neural-command-homepage/ # Legacy Homepage
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind Configuration
├── tsconfig.json           # TypeScript Configuration
└── next.config.ts          # Next.js Configuration
```

## Frontend Architecture

### Component Hierarchy
```
Root Layout (layout.tsx)
├── Header (shared/Header.tsx)
├── Sidebar (shared/Sidebar.tsx)
├── Main Content
│   ├── Tool Pages
│   │   ├── Authority (authority/page.tsx)
│   │   ├── Analytics (analytics/page.tsx)
│   │   ├── Auditor (auditor/page.tsx)
│   │   ├── Batch Authority (batch-authority/page.tsx)
│   │   ├── Citation Flow (citationflow/page.tsx)
│   │   ├── Connect (connect/page.tsx)
│   │   ├── QueryMind (querymind/page.tsx)
│   │   ├── AgentRank (agentrank/page.tsx)
│   │   └── Schema Optimizer (schema-optimizer/page.tsx)
│   └── Shared Components
│       ├── ScoreCircle (shared/ScoreCircle.tsx)
│       ├── MetricsOverview (shared/MetricsOverview.tsx)
│       ├── TimeRangeSelector (shared/TimeRangeSelector.tsx)
│       └── PlatformGrid (shared/PlatformGrid.tsx)
└── Footer (CTAFooter.tsx)
```

### Key Components

#### 1. Layout Components
- **RootLayout**: Main application wrapper
- **Header**: Navigation and branding
- **Sidebar**: Tool navigation and user controls
- **Footer**: Call-to-action and links

#### 2. Tool Components
- **AuthoritySection**: Authority analysis and scoring
- **AnalyticsDashboard**: Data visualization and insights
- **AuditorInterface**: Website auditing tools
- **BatchProcessor**: Multi-URL processing
- **SchemaGenerator**: AI-powered schema generation
- **SchemaInsights**: AI optimization insights
- **SchemaAuditor**: Schema validation and analysis

#### 3. Shared Components
- **ScoreCircle**: Visual score representation
- **MetricsOverview**: Key metrics display
- **TimeRangeSelector**: Date range selection
- **PlatformGrid**: Platform compatibility grid
- **ContentAnalyzer**: Content analysis tools
- **ForecastChart**: Trend visualization

#### 4. UI Components
- **DashboardChart**: Chart visualization
- **MetricCard**: Metric display cards
- **StatusIndicator**: Status indicators
- **ToolProgressModal**: Progress modals
- **AppleTerminal**: Terminal-style displays

### State Management

#### Local State (useState)
```typescript
// Component-level state
const [url, setUrl] = useState('')
const [isLoading, setIsLoading] = useState(false)
const [data, setData] = useState(null)
const [terminalLogs, setTerminalLogs] = useState<string[]>([])
```

#### Global State (Context/Props)
```typescript
// Shared data passed via props
interface ToolProps {
  onDataGenerated?: (data: AnalysisData) => void
  onError?: (error: Error) => void
}
```

#### Custom Hooks
```typescript
// useBatchAnalysis.ts
export function useBatchAnalysis() {
  const [batchData, setBatchData] = useState<BatchData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  
  const processBatch = async (urls: string[]) => {
    // Batch processing logic
  }
  
  return { batchData, isProcessing, processBatch }
}
```

## Backend Architecture

### API Routes Structure
```
src/app/api/
├── analyze-website/     # Website analysis
├── start-worker/        # Background processing
├── test-ai/            # AI testing
├── test-analysis/      # Analysis testing
├── schema-analyze/     # Schema analysis
└── analyze-schema/     # Schema validation
```

### Service Layer
```
src/lib/
├── ai/
│   └── OpenAIService.ts    # OpenAI integration
├── analysis/
│   └── AuthorityScorer.ts  # Authority scoring
├── crawler/
│   └── WebCrawler.ts       # Web crawling
├── queue/
│   └── AnalysisQueue.ts    # Queue management
└── schema/
    └── SchemaService.ts    # Schema processing
```

### Key Services

#### 1. OpenAIService
```typescript
export class OpenAIService {
  private client: OpenAI
  
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
  
  async analyzeWebsite(url: string): Promise<AnalysisResult> {
    // Website analysis logic
  }
  
  async generateSchema(url: string, type: string): Promise<SchemaResult> {
    // Schema generation logic
  }
}
```

#### 2. AuthorityScorer
```typescript
export class AuthorityScorer {
  async calculateAuthority(url: string): Promise<AuthorityScore> {
    // Authority calculation logic
  }
  
  async getAuthorityData(url: string): Promise<AuthorityData> {
    // Authority data retrieval
  }
}
```

#### 3. WebCrawler
```typescript
export class WebCrawler {
  async crawlPage(url: string): Promise<PageData> {
    // Web crawling logic
  }
  
  async extractContent(html: string): Promise<ExtractedContent> {
    // Content extraction
  }
}
```

#### 4. SchemaService
```typescript
export class SchemaService {
  async generateAIOptimizedSchema(url: string, type: string): Promise<SchemaResult> {
    // AI-optimized schema generation
  }
  
  async calculateAICompatibility(schema: any): Promise<CompatibilityScores> {
    // AI compatibility calculation
  }
}
```

## API Endpoints

### 1. Website Analysis
```typescript
// POST /api/analyze-website
interface AnalyzeWebsiteRequest {
  url: string
  includeAuthority?: boolean
  includeSchema?: boolean
}

interface AnalyzeWebsiteResponse {
  success: boolean
  result: {
    authority: AuthorityData
    schema: SchemaData
    recommendations: Recommendation[]
  }
}
```

### 2. Schema Analysis
```typescript
// POST /api/schema-analyze
interface SchemaAnalyzeRequest {
  url: string
  schemaType: string
}

interface SchemaAnalyzeResponse {
  success: boolean
  result: {
    schema: any
    aiCompatibilityScores: {
      chatgpt: number
      claude: number
      perplexity: number
      googleAI: number
    }
    recommendations: Recommendation[]
  }
}
```

### 3. Batch Processing
```typescript
// POST /api/start-worker
interface StartWorkerRequest {
  urls: string[]
  analysisType: 'authority' | 'schema' | 'full'
}

interface StartWorkerResponse {
  success: boolean
  jobId: string
  estimatedTime: number
}
```

### 4. AI Testing
```typescript
// POST /api/test-ai
interface TestAIRequest {
  prompt: string
  model: 'gpt-4' | 'gpt-3.5-turbo'
}

interface TestAIResponse {
  success: boolean
  result: {
    response: string
    tokens: number
    model: string
  }
}
```

## Database & Data Models

### Data Models

#### 1. Authority Data
```typescript
interface AuthorityData {
  url: string
  overallScore: number
  domainAuthority: number
  pageAuthority: number
  trustFlow: number
  citationFlow: number
  backlinks: number
  referringDomains: number
  socialSignals: {
    facebook: number
    twitter: number
    linkedin: number
  }
  technicalFactors: {
    pageSpeed: number
    mobileFriendly: boolean
    sslSecure: boolean
  }
}
```

#### 2. Schema Data
```typescript
interface SchemaData {
  url: string
  schemaTypes: string[]
  jsonLD: any[]
  microdata: any[]
  rdfa: any[]
  openGraph: {
    title?: string
    description?: string
    image?: string
    url?: string
  }
  twitterCard: {
    card: string
    title?: string
    description?: string
    image?: string
  }
}
```

#### 3. Analysis Results
```typescript
interface AnalysisResult {
  url: string
  timestamp: Date
  authority: AuthorityData
  schema: SchemaData
  aiCompatibility: {
    chatgpt: number
    claude: number
    perplexity: number
    googleAI: number
  }
  recommendations: Recommendation[]
}
```

#### 4. Batch Job
```typescript
interface BatchJob {
  id: string
  urls: string[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  results: AnalysisResult[]
  createdAt: Date
  completedAt?: Date
}
```

### Data Storage
- **Development**: In-memory storage (arrays/objects)
- **Production**: File-based storage or database
- **Caching**: Browser localStorage for user preferences
- **Session**: Next.js session management

## Styling & UI Framework

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
```

### Design System

#### 1. Color Palette
```css
/* Primary Colors */
--primary-50: #eff6ff
--primary-500: #3b82f6
--primary-600: #2563eb
--primary-700: #1d4ed8

/* Semantic Colors */
--success: #10b981
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6

/* Neutral Colors */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

#### 2. Typography
```css
/* Font Sizes */
text-xs: 0.75rem
text-sm: 0.875rem
text-base: 1rem
text-lg: 1.125rem
text-xl: 1.25rem
text-2xl: 1.5rem
text-3xl: 1.875rem
text-4xl: 2.25rem

/* Font Weights */
font-light: 300
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

#### 3. Spacing
```css
/* Spacing Scale */
space-1: 0.25rem
space-2: 0.5rem
space-3: 0.75rem
space-4: 1rem
space-6: 1.5rem
space-8: 2rem
space-12: 3rem
space-16: 4rem
```

#### 4. Border Radius
```css
/* Border Radius */
rounded-sm: 0.125rem
rounded: 0.25rem
rounded-md: 0.375rem
rounded-lg: 0.5rem
rounded-xl: 0.75rem
rounded-2xl: 1rem
```

### Component Styling Patterns

#### 1. Card Components
```tsx
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <div className="flex items-center gap-2 mb-4">
    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">📊</span>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Title</h3>
      <p className="text-sm text-gray-600">Description</p>
    </div>
  </div>
  {/* Content */}
</div>
```

#### 2. Button Components
```tsx
<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
  Button Text
</button>
```

#### 3. Input Components
```tsx
<input
  type="text"
  placeholder="Enter text..."
  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### 4. Terminal Components
```tsx
<div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-32 overflow-y-auto">
  {logs.map((log, index) => (
    <div key={index}>{log}</div>
  ))}
</div>
```

## Component Architecture

### Component Patterns

#### 1. Container Components
```tsx
// Layout containers
export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
```

#### 2. Presentational Components
```tsx
// Pure UI components
export function ScoreCircle({ score, size = 'md' }: ScoreCircleProps) {
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full" viewBox="0 0 36 36">
        {/* SVG circle implementation */}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {score}
      </span>
    </div>
  )
}
```

#### 3. Smart Components
```tsx
// Components with business logic
export function SchemaGenerator({ onDataGenerated }: SchemaGeneratorProps) {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleGenerate = async () => {
    // Business logic implementation
  }
  
  return (
    // JSX implementation
  )
}
```

### Component Communication

#### 1. Props Down
```tsx
// Parent component
<SchemaGenerator onDataGenerated={handleDataGenerated} />

// Child component
interface SchemaGeneratorProps {
  onDataGenerated?: (data: SchemaAnalysisData) => void
}
```

#### 2. Events Up
```tsx
// Child component
const handleGenerate = async () => {
  const data = await generateSchema()
  onDataGenerated?.(data)
}

// Parent component
const handleDataGenerated = (data: SchemaAnalysisData) => {
  setAnalysisData(data)
}
```

#### 3. Shared State
```tsx
// Custom hook for shared state
export function useAnalysisData() {
  const [data, setData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  return { data, setData, isLoading, setIsLoading }
}
```

## State Management

### Local State Patterns

#### 1. Form State
```tsx
const [formData, setFormData] = useState({
  url: '',
  schemaType: 'Article',
  includeAuthority: true
})

const handleInputChange = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}
```

#### 2. Loading State
```tsx
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async () => {
  setIsLoading(true)
  setError(null)
  try {
    // API call
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
```

#### 3. Data State
```tsx
const [data, setData] = useState<AnalysisData | null>(null)
const [terminalLogs, setTerminalLogs] = useState<string[]>([])

const addLog = (message: string) => {
  setTerminalLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
}
```

### Global State Patterns

#### 1. Context API (if needed)
```tsx
const AnalysisContext = createContext<AnalysisContextType | null>(null)

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [globalData, setGlobalData] = useState<AnalysisData | null>(null)
  
  return (
    <AnalysisContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </AnalysisContext.Provider>
  )
}
```

#### 2. URL State
```tsx
// Using URL parameters for state
const router = useRouter()
const { url, type } = router.query

// Update URL with new state
router.push({
  pathname: router.pathname,
  query: { ...router.query, url: newUrl }
})
```

## Authentication & Security

### Current Implementation
- **No Authentication**: Currently open access
- **API Key Management**: Environment variables for OpenAI
- **Input Validation**: Client and server-side validation
- **Rate Limiting**: Basic request limiting

### Security Measures

#### 1. Environment Variables
```bash
# .env.local
OPENAI_API_KEY=sk-proj-AT...
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-AT...
```

#### 2. Input Validation
```typescript
// Client-side validation
const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Server-side validation
const validateRequest = (body: any): boolean => {
  return body.url && typeof body.url === 'string' && body.url.length > 0
}
```

#### 3. Error Handling
```typescript
// API route error handling
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!validateRequest(body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    // Process request
    const result = await processRequest(body)
    
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Deployment & Infrastructure

### Development Environment
```bash
# Local development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Production Deployment
- **Platform**: Vercel
- **Domain**: Custom domain (if configured)
- **Environment**: Production environment variables
- **Build**: Automatic builds on Git push

### Environment Configuration
```bash
# Development
NODE_ENV=development
OPENAI_API_KEY=sk-proj-AT...

# Production
NODE_ENV=production
OPENAI_API_KEY=sk-proj-AT...
```

### Build Process
```bash
# Build steps
1. npm install          # Install dependencies
2. npm run build        # Build application
3. npm run start        # Start production server
```

## Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/schema-optimizer
# Make changes
git add .
git commit -m "Add schema optimizer feature"
git push origin feature/schema-optimizer
# Create pull request
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

### Testing Strategy
```bash
# Manual testing
1. Start development server
2. Navigate to /tools/schema-optimizer
3. Test schema generation
4. Verify API responses
5. Check component rendering
```

## Performance Optimization

### Frontend Optimization

#### 1. Code Splitting
```tsx
// Dynamic imports for large components
const SchemaGenerator = dynamic(() => import('./SchemaGenerator'), {
  loading: () => <div>Loading...</div>
})
```

#### 2. Image Optimization
```tsx
// Next.js Image component
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

#### 3. Bundle Optimization
```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
}
```

### Backend Optimization

#### 1. Caching
```typescript
// API response caching
const cache = new Map()

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url')
  const cacheKey = `analysis-${url}`
  
  if (cache.has(cacheKey)) {
    return NextResponse.json(cache.get(cacheKey))
  }
  
  const result = await analyzeWebsite(url)
  cache.set(cacheKey, result)
  
  return NextResponse.json(result)
}
```

#### 2. Request Optimization
```typescript
// Batch processing
export async function POST(request: Request) {
  const { urls } = await request.json()
  
  // Process multiple URLs in parallel
  const results = await Promise.all(
    urls.map(url => analyzeWebsite(url))
  )
  
  return NextResponse.json({ success: true, results })
}
```

## SEO & Meta Tags

### Meta Tags Configuration
```tsx
// layout.tsx
export const metadata: Metadata = {
  title: 'Neural Command - AI-Powered Website Analysis',
  description: 'Comprehensive website analysis, authority scoring, and AI optimization tools.',
  keywords: ['AI', 'website analysis', 'SEO', 'authority scoring', 'schema optimization'],
  openGraph: {
    title: 'Neural Command',
    description: 'AI-Powered Website Analysis Platform',
    url: 'https://neuralcommand.com',
    siteName: 'Neural Command',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Command',
    description: 'AI-Powered Website Analysis Platform',
    images: ['/twitter-image.png'],
  },
}
```

### Page-Specific SEO
```tsx
// tools/schema-optimizer/page.tsx
export const metadata: Metadata = {
  title: 'Schema Optimizer - Neural Command',
  description: 'AI-powered schema markup generation and optimization for better AI platform compatibility.',
  openGraph: {
    title: 'Schema Optimizer',
    description: 'Generate AI-optimized schema markup',
  },
}
```

### Structured Data
```tsx
// JSON-LD structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Neural Command",
  "description": "AI-Powered Website Analysis Platform",
  "url": "https://neuralcommand.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
}
```

## Accessibility

### ARIA Labels
```tsx
// Proper ARIA labels
<button
  aria-label="Generate schema"
  aria-describedby="schema-description"
  onClick={handleGenerate}
>
  Generate Schema
</button>
<div id="schema-description" className="sr-only">
  Generate AI-optimized schema markup for the specified URL
</div>
```

### Keyboard Navigation
```tsx
// Keyboard-accessible components
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
  onClick={handleClick}
>
  Clickable content
</div>
```

### Color Contrast
```css
/* High contrast colors */
.text-primary { color: #1e40af; } /* Blue-800 */
.text-success { color: #059669; } /* Emerald-600 */
.text-warning { color: #d97706; } /* Amber-600 */
.text-error { color: #dc2626; } /* Red-600 */
```

### Screen Reader Support
```tsx
// Screen reader only content
<div className="sr-only">
  This content is only visible to screen readers
</div>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {terminalLogs.map((log, index) => (
    <div key={index}>{log}</div>
  ))}
</div>
```

## Browser Support

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Polyfills
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    modern: true,
  },
  transpilePackages: ['@next/font'],
}
```

### Feature Detection
```typescript
// Check for modern features
const supportsIntersectionObserver = typeof IntersectionObserver !== 'undefined'
const supportsResizeObserver = typeof ResizeObserver !== 'undefined'
```

## Troubleshooting

### Common Issues

#### 1. API Errors
```typescript
// Debug API errors
console.log('API Response:', response)
console.log('Response Status:', response.status)
console.log('Response Headers:', response.headers)

// Check environment variables
console.log('OpenAI Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not Set')
```

#### 2. Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check TypeScript errors
npx tsc --noEmit
```

#### 3. Runtime Errors
```typescript
// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }
    return this.props.children
  }
}
```

### Debug Tools

#### 1. Development Tools
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check bundle size
npm run build
npx @next/bundle-analyzer
```

#### 2. Performance Monitoring
```typescript
// Performance monitoring
const startTime = performance.now()
// ... operation
const endTime = performance.now()
console.log(`Operation took ${endTime - startTime}ms`)
```

#### 3. Network Debugging
```typescript
// Network request debugging
const response = await fetch('/api/schema-analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url, schemaType }),
})

console.log('Request URL:', response.url)
console.log('Response Status:', response.status)
console.log('Response Headers:', Object.fromEntries(response.headers))
```

### Environment Setup

#### 1. Development Environment
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

#### 2. Production Environment
```bash
# Build for production
npm run build

# Start production server
npm run start

# Or deploy to Vercel
vercel --prod
```

This comprehensive documentation provides everything a developer or AI tool needs to understand, maintain, and extend the Neural Command platform. The documentation covers all aspects from architecture to deployment, ensuring successful development and maintenance of the application. 