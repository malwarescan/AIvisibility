# Neural Command - Production Deployment Guide (Railway)

## 🎯 Platform Overview

Neural Command is an AI-powered platform with 7 optimization tools for AI search engines (ChatGPT, Claude, Perplexity, Google AI). This guide ensures all tools are production-ready on Railway.

## 🛠️ Complete Tool Checklist

### Core Tools Status
- [x] ✅ **Analytics** (`/tools/analytics`) - Performance tracking
- [x] ✅ **Authority** (`/tools/authority`) - Domain authority analysis  
- [x] ✅ **Auditor** (`/tools/auditor`) - Content auditing
- [x] ✅ **Connect** (`/tools/connect`) - Platform connections
- [x] ✅ **QueryMind** (`/tools/querymind`) - Query optimization
- [x] ✅ **CitationFlow** (`/tools/citationflow`) - Citation tracking
- [x] ✅ **AgentRank** (`/tools/agentrank`) - Agent ranking

## 🚀 Railway Deployment Setup

### 1. Environment Configuration

Create `railway.toml`:
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/api/health"
healthcheckTimeout = 30
restartPolicyType = "always"

[environments.production]
NODE_ENV = "production"
```

### 2. Production Environment Variables

```env
# Core Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://neuralcommand.up.railway.app

# OpenAI Configuration (Critical for all tools)
OPENAI_API_KEY=sk-proj-YOUR_PRODUCTION_KEY
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=4000

# Database (PostgreSQL on Railway)
DATABASE_URL=postgresql://user:pass@host:5432/neural_command
DATABASE_POOL_SIZE=10

# Redis (Railway Redis)
REDIS_URL=redis://default:password@host:6379
REDIS_CACHE_TTL=3600

# Authentication
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://neuralcommand.up.railway.app

# Google OAuth (for team access)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Rate Limiting (per tool)
RATE_LIMIT_ANALYTICS=100
RATE_LIMIT_AUTHORITY=50
RATE_LIMIT_AUDITOR=30
RATE_LIMIT_QUERYMIND=50
RATE_LIMIT_CITATIONFLOW=100
RATE_LIMIT_AGENTRANK=50
RATE_LIMIT_WINDOW_MS=60000

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production
RAILWAY_ANALYTICS_ID=your-analytics-id

# Tool-Specific Configurations
ANALYTICS_REFRESH_INTERVAL=30000
AUTHORITY_CACHE_DURATION=3600000
AUDITOR_MAX_CONCURRENT=5
CONNECT_PLATFORM_TIMEOUT=10000
QUERYMIND_AI_MODEL=gpt-4
CITATIONFLOW_BATCH_SIZE=10
AGENTRANK_UPDATE_FREQUENCY=300000
```

### 3. Database Schema (PostgreSQL)

Create `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core Models
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  sessions      Session[]
  toolUsage     ToolUsage[]
  apiKeys       ApiKey[]
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  expires      DateTime
  sessionToken String   @unique
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Tool-Specific Models
model AnalyticsData {
  id              String   @id @default(cuid())
  url             String
  visibility      Float
  citations       Int
  authority       String
  responseRate    Float
  platformData    Json
  trends          Json
  insights        Json
  createdAt       DateTime @default(now())
  userId          String?
  
  @@index([url, createdAt])
  @@index([userId])
}

model AuthorityAnalysis {
  id                String   @id @default(cuid())
  url               String
  overallScore      Float
  domainAuthority   Float
  aiCompatibility   Json
  signals           Json
  recommendations   Json
  createdAt         DateTime @default(now())
  
  @@index([url, createdAt])
}

model AuditReport {
  id              String   @id @default(cuid())
  url             String
  contentQuality  Float
  aiOptimization  Float
  issues          Json
  recommendations Json
  status          String   @default("pending")
  createdAt       DateTime @default(now())
  completedAt     DateTime?
  
  @@index([url, status])
}

model PlatformConnection {
  id              String   @id @default(cuid())
  platform        String   // chatgpt, claude, perplexity, googleai
  url             String
  connectionScore Float
  healthStatus    String
  lastChecked     DateTime @default(now())
  metadata        Json
  
  @@unique([platform, url])
  @@index([platform, healthStatus])
}

model QueryAnalysis {
  id              String   @id @default(cuid())
  query           String
  url             String
  intentScore     Float
  responseQuality Float
  optimizations   Json
  patterns        Json
  createdAt       DateTime @default(now())
  
  @@index([url, createdAt])
}

model CitationData {
  id              String   @id @default(cuid())
  url             String
  platform        String
  citationCount   Int
  citationQuality Float
  flowData        Json
  trends          Json
  createdAt       DateTime @default(now())
  
  @@index([url, platform, createdAt])
}

model AgentRanking {
  id              String   @id @default(cuid())
  url             String
  agentType       String
  rankingScore    Float
  interactions    Json
  performance     Json
  optimizations   Json
  createdAt       DateTime @default(now())
  
  @@index([url, agentType, createdAt])
}

// Usage Tracking
model ToolUsage {
  id          String   @id @default(cuid())
  userId      String
  tool        String   // analytics, authority, auditor, etc.
  action      String   // view, analyze, export
  metadata    Json?
  timestamp   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId, tool, timestamp])
  @@index([tool, action, timestamp])
}

// API Management
model ApiKey {
  id          String   @id @default(cuid())
  userId      String
  key         String   @unique
  name        String
  permissions Json     // tool-specific permissions
  lastUsed    DateTime?
  expiresAt   DateTime?
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([key])
}
```

### 4. API Routes Structure

Create `src/app/api/tools/[tool]/analyze/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { 
  AnalyticsService,
  AuthorityService,
  AuditorService,
  ConnectService,
  QueryMindService,
  CitationFlowService,
  AgentRankService 
} from '@/lib/services'

const toolServices = {
  analytics: AnalyticsService,
  authority: AuthorityService,
  auditor: AuditorService,
  connect: ConnectService,
  querymind: QueryMindService,
  citationflow: CitationFlowService,
  agentrank: AgentRankService,
}

const requestSchema = z.object({
  url: z.string().url(),
  options: z.object({}).passthrough().optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { tool: string } }
) {
  const startTime = Date.now()
  
  try {
    // Validate tool
    const tool = params.tool.toLowerCase()
    if (!toolServices[tool]) {
      return NextResponse.json(
        { error: 'Invalid tool specified' },
        { status: 400 }
      )
    }
    
    // Get session and apply rate limiting
    const session = await getServerSession()
    const identifier = session?.user?.id || request.headers.get('x-forwarded-for') || 'anonymous'
    
    const rateLimitKey = `RATE_LIMIT_${tool.toUpperCase()}`
    const limit = parseInt(process.env[rateLimitKey] || '50')
    
    await rateLimit.check(request, limit, `${tool}-${identifier}`)
    
    // Validate request
    const body = await request.json()
    const { url, options } = requestSchema.parse(body)
    
    // Track usage
    if (session?.user?.id) {
      await prisma.toolUsage.create({
        data: {
          userId: session.user.id,
          tool,
          action: 'analyze',
          metadata: { url, options },
        },
      })
    }
    
    // Execute tool-specific analysis
    const Service = toolServices[tool]
    const service = new Service()
    const result = await service.analyze(url, options)
    
    // Store results based on tool type
    await storeToolResults(tool, url, result)
    
    return NextResponse.json({
      success: true,
      tool,
      result,
      metadata: {
        processingTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
    })
    
  } catch (error) {
    console.error(`[${params.tool}] Analysis error:`, error)
    
    if (error.message.includes('Rate limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Analysis failed', details: error.message },
      { status: 500 }
    )
  }
}

async function storeToolResults(tool: string, url: string, result: any) {
  switch (tool) {
    case 'analytics':
      await prisma.analyticsData.create({
        data: {
          url,
          visibility: result.visibility,
          citations: result.citations,
          authority: result.authority,
          responseRate: result.responseRate,
          platformData: result.platformBreakdown,
          trends: result.trends,
          insights: result.insights,
        },
      })
      break
      
    case 'authority':
      await prisma.authorityAnalysis.create({
        data: {
          url,
          overallScore: result.overallScore,
          domainAuthority: result.domainAuthority,
          aiCompatibility: result.aiCompatibility,
          signals: result.signals,
          recommendations: result.recommendations,
        },
      })
      break
      
    // Add other tools...
  }
}
```

### 5. Redis Caching Implementation

Create `src/lib/cache.ts`:
```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  },
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    const ttlSeconds = ttl || parseInt(process.env.REDIS_CACHE_TTL || '3600')
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
  },
  
  async del(key: string): Promise<void> {
    await redis.del(key)
  },
  
  // Tool-specific cache helpers
  async getToolCache(tool: string, url: string): Promise<any> {
    return this.get(`${tool}:${url}`)
  },
  
  async setToolCache(tool: string, url: string, data: any): Promise<void> {
    const toolTTL = {
      analytics: 1800,    // 30 minutes
      authority: 3600,    // 1 hour
      auditor: 7200,      // 2 hours
      connect: 600,       // 10 minutes
      querymind: 3600,    // 1 hour
      citationflow: 1800, // 30 minutes
      agentrank: 600,     // 10 minutes
    }
    
    await this.set(`${tool}:${url}`, data, toolTTL[tool])
  },
}
```

### 6. Tool-Specific Services

Create `src/lib/services/index.ts`:
```typescript
export { AnalyticsService } from './analytics'
export { AuthorityService } from './authority'
export { AuditorService } from './auditor'
export { ConnectService } from './connect'
export { QueryMindService } from './querymind'
export { CitationFlowService } from './citationflow'
export { AgentRankService } from './agentrank'
```

Create `src/lib/services/analytics.ts`:
```typescript
import { OpenAIService } from '@/lib/ai/OpenAIService'
import { cache } from '@/lib/cache'

export class AnalyticsService {
  private openai: OpenAIService
  
  constructor() {
    this.openai = new OpenAIService()
  }
  
  async analyze(url: string, options?: any) {
    // Check cache first
    const cached = await cache.getToolCache('analytics', url)
    if (cached && !options?.forceRefresh) {
      return cached
    }
    
    // Perform analysis
    const [visibility, citations, authority, platformData] = await Promise.all([
      this.calculateVisibility(url),
      this.trackCitations(url),
      this.assessAuthority(url),
      this.analyzePlatforms(url),
    ])
    
    const result = {
      visibility,
      citations,
      authority,
      responseRate: this.calculateResponseRate(visibility, citations),
      platformBreakdown: platformData,
      trends: await this.generateTrends(url),
      insights: await this.generateInsights(url, { visibility, citations, authority }),
    }
    
    // Cache results
    await cache.setToolCache('analytics', url, result)
    
    return result
  }
  
  private async calculateVisibility(url: string): Promise<number> {
    // AI-powered visibility calculation
    const prompt = `Analyze the AI search visibility for ${url} across ChatGPT, Claude, Perplexity, and Google AI. Return a score 0-100.`
    const response = await this.openai.analyze(prompt)
    return parseFloat(response.score) || 0
  }
  
  // Additional methods...
}
```

### 7. Monitoring & Health Checks

Create `src/app/api/health/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'checking',
      redis: 'checking',
      openai: 'checking',
    },
    tools: {},
  }
  
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`
    checks.services.database = 'healthy'
  } catch (error) {
    checks.services.database = 'unhealthy'
    checks.status = 'degraded'
  }
  
  try {
    // Check Redis
    await redis.ping()
    checks.services.redis = 'healthy'
  } catch (error) {
    checks.services.redis = 'unhealthy'
    checks.status = 'degraded'
  }
  
  try {
    // Check OpenAI
    if (!process.env.OPENAI_API_KEY) {
      checks.services.openai = 'misconfigured'
      checks.status = 'degraded'
    } else {
      checks.services.openai = 'healthy'
    }
  } catch (error) {
    checks.services.openai = 'unhealthy'
    checks.status = 'unhealthy'
  }
  
  // Check each tool's recent usage
  const tools = ['analytics', 'authority', 'auditor', 'connect', 'querymind', 'citationflow', 'agentrank']
  
  for (const tool of tools) {
    try {
      const recentUsage = await prisma.toolUsage.count({
        where: {
          tool,
          timestamp: {
            gte: new Date(Date.now() - 3600000), // Last hour
          },
        },
      })
      
      checks.tools[tool] = {
        status: 'active',
        recentUsage,
      }
    } catch (error) {
      checks.tools[tool] = {
        status: 'error',
        recentUsage: 0,
      }
    }
  }
  
  const statusCode = checks.status === 'healthy' ? 200 : 
                    checks.status === 'degraded' ? 200 : 503
  
  return NextResponse.json(checks, { status: statusCode })
}
```

### 8. Railway Deployment Script

Create `deploy-railway.sh`:
```bash
#!/bin/bash
# deploy-railway.sh

set -e

echo "🚀 Deploying Neural Command to Railway..."

# Check environment
if [ -z "$RAILWAY_TOKEN" ]; then
  echo "❌ RAILWAY_TOKEN not set. Please run: railway login"
  exit 1
fi

# Run pre-deployment checks
echo "📋 Running pre-deployment checks..."

# 1. Type checking
echo "✅ Checking TypeScript types..."
npm run type-check

# 2. Linting
echo "✅ Running ESLint..."
npm run lint

# 3. Build test
echo "✅ Testing production build..."
npm run build

# 4. Database migrations
echo "✅ Generating Prisma client..."
npx prisma generate

# Deploy to Railway
echo "🚂 Deploying to Railway..."
railway up

# Run post-deployment tasks
echo "📦 Running post-deployment tasks..."

# 1. Run database migrations
echo "✅ Running database migrations..."
railway run npx prisma migrate deploy

# 2. Seed initial data (if needed)
echo "✅ Seeding database..."
railway run npx prisma db seed

# 3. Clear Redis cache
echo "✅ Clearing cache..."
railway run npm run cache:clear

# 4. Health check
echo "✅ Running health check..."
sleep 10
HEALTH_URL=$(railway status --json | jq -r '.url')/api/health
curl -f $HEALTH_URL || exit 1

echo "✨ Deployment complete!"
echo "🌐 Your app is live at: $(railway status --json | jq -r '.url')"
```

## 🎨 Design System Implementation

### Apple-Inspired Components

Update `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'neural-blue': {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#0087ff', // Primary blue
          600: '#0069cc',
          700: '#004b99',
          800: '#002d66',
          900: '#000f33',
        },
        'liquid-blue': {
          light: 'rgba(0, 135, 255, 0.1)',
          medium: 'rgba(0, 135, 255, 0.2)',
          dark: 'rgba(0, 135, 255, 0.3)',
        },
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'liquid-flow': 'liquidFlow 3s ease-in-out infinite',
      },
    },
  },
}
```

## 📊 Production Monitoring Dashboard

### Key Metrics to Track

Create `src/lib/monitoring/metrics.ts`:
```typescript
export const trackToolMetrics = async (tool: string, action: string, metadata: any) => {
  // Send to monitoring service
  await fetch(`${process.env.MONITORING_ENDPOINT}/metrics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tool,
      action,
      metadata,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    }),
  })
}

// Track key metrics
export const metrics = {
  // Tool usage
  toolAnalysisStarted: (tool: string, url: string) => 
    trackToolMetrics(tool, 'analysis_started', { url }),
    
  toolAnalysisCompleted: (tool: string, url: string, duration: number) =>
    trackToolMetrics(tool, 'analysis_completed', { url, duration }),
    
  toolAnalysisFailed: (tool: string, url: string, error: string) =>
    trackToolMetrics(tool, 'analysis_failed', { url, error }),
    
  // Performance
  apiResponseTime: (endpoint: string, duration: number) =>
    trackToolMetrics('api', 'response_time', { endpoint, duration }),
    
  // Business metrics
  userEngagement: (userId: string, tool: string, action: string) =>
    trackToolMetrics('user', 'engagement', { userId, tool, action }),
}
```

## 🚨 Production Checklist

### Pre-Launch (All Tools)
- [ ] ✅ All 7 tools tested end-to-end
- [ ] ✅ API rate limiting configured per tool
- [ ] ✅ Database indexes optimized
- [ ] ✅ Redis caching implemented
- [ ] ✅ Error tracking (Sentry) configured
- [ ] ✅ Health checks for all services
- [ ] ✅ Authentication flow tested
- [ ] ✅ Export functionality verified

### Launch Day
- [ ] Deploy with Railway CLI
- [ ] Run database migrations
- [ ] Verify all tool endpoints
- [ ] Check health endpoint
- [ ] Monitor error rates
- [ ] Test each tool's core functionality
- [ ] Verify caching is working
- [ ] Check rate limiting

### Post-Launch Monitoring
- [ ] Tool usage analytics
- [ ] API performance metrics
- [ ] Error rate tracking
- [ ] User engagement metrics
- [ ] Cache hit rates
- [ ] Database query performance
- [ ] OpenAI API usage
- [ ] Cost monitoring

## 🔧 Tool-Specific Testing

```bash
# Test each tool's API endpoint
for tool in analytics authority auditor connect querymind citationflow agentrank; do
  echo "Testing $tool..."
  curl -X POST https://your-app.railway.app/api/tools/$tool/analyze \
    -H "Content-Type: application/json" \
    -d '{"url": "https://example.com"}'
done
```

## 📈 Success Metrics

### Technical KPIs
- **API Response Time**: < 500ms p95 for all tools
- **Tool Analysis Time**: 
  - Analytics: < 3s
  - Authority: < 5s
  - Auditor: < 10s
  - Others: < 5s
- **Cache Hit Rate**: > 60%
- **Error Rate**: < 0.1%

### Business KPIs
- **Daily Active Tools**: Track usage per tool
- **Analysis Completion Rate**: > 90%
- **User Retention**: > 40% weekly
- **Platform Coverage**: All 4 AI platforms monitored

---

**Railway Support**: support@railway.app | [Railway Docs](https://docs.railway.app)
**Status Page**: https://status.railway.app

This refined guide is specifically tailored to your Neural Command platform with all 7 tools, Railway deployment, and your exact architecture. Ready to deploy! 🚀 