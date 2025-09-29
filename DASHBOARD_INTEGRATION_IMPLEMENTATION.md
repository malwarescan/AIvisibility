# Dashboard Integration Implementation

## Overview

The dashboard integration provides a unified view of AI search optimization insights from all Neural Command tools. Each tool returns standardized insights that feed into a comprehensive dashboard, enabling users to see all optimization opportunities in one place.

## Shared Format Implementation

### Core Interface: `ToolInsight`

All tools now return a standardized `ToolInsight` interface:

```typescript
interface ToolInsight {
  tool: string;
  score?: number;
  insights: string[];
  recommendations: string[];
  updatedAt: string;
  metadata?: {
    url?: string;
    query?: string;
    domain?: string;
    agent?: string;
    platform?: string;
    [key: string]: any;
  };
}
```

### Tool-Specific Extensions

Each tool has a specific insight type that extends the base interface:

#### OverviewIQ
```typescript
interface OverviewInsight extends ToolInsight {
  tool: 'overviewiq';
  score: number; // Probability percentage
  metadata: {
    url?: string;
    query?: string;
    probability: number;
    confidence: number;
    factors: string[];
    competitors: Array<{
      domain: string;
      probability: number;
    }>;
  };
}
```

#### AgentRank
```typescript
interface AgentRankInsight extends ToolInsight {
  tool: 'agentrank';
  score: number; // Average agent score
  metadata: {
    url?: string;
    query?: string;
    agent?: string;
    platform?: string;
    rankings: Array<{
      agent: string;
      score: number;
      ranking: number;
    }>;
    topAgent: string;
    averageScore: number;
  };
}
```

#### Agentic Visibility
```typescript
interface AgenticVisibilityInsight extends ToolInsight {
  tool: 'agentic-visibility';
  score: number; // Presence rate percentage
  metadata: {
    domain: string;
    presenceRate: number;
    activeAgents: number;
    totalAgents: number;
    topAgents: string[];
    agentPresence: Array<{
      agent: string;
      presence: boolean;
      frequency: number;
    }>;
  };
}
```

## API Endpoints Updated

### 1. OverviewIQ API
**Endpoint**: `/api/tools/overviewiq/predictOverview`

**Updated Response Format**:
```json
{
  "success": true,
  "data": {
    "insight": {
      "tool": "overviewiq",
      "score": 75,
      "insights": [
        "AI Overview probability: 75%",
        "Confidence level: 82%",
        "Key factors: FAQ content, Schema markup, Authority signals"
      ],
      "recommendations": [
        "Add more FAQ sections",
        "Implement FAQ schema markup"
      ],
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "metadata": {
        "url": "https://example.com",
        "query": "AI optimization guide",
        "probability": 0.75,
        "confidence": 0.82
      }
    },
    "analysis": {
      "prediction": { /* detailed prediction data */ },
      "serpAnalysis": { /* SERP analysis data */ }
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tool": "overviewiq",
  "action": "predictOverview"
}
```

### 2. AgentRank API
**Endpoint**: `/api/tools/agentrank/queryAgent`

**Updated Response Format**:
```json
{
  "success": true,
  "data": {
    "insight": {
      "tool": "agentrank",
      "score": 85,
      "insights": [
        "Agent response confidence: 85%",
        "Response time: 1200ms",
        "Sources found: 3"
      ],
      "recommendations": [
        "Optimize content for agent-specific capabilities",
        "Improve source quality and relevance"
      ],
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "metadata": {
        "query": "What is AI search optimization?",
        "agent": "chatgpt",
        "platform": "chatgpt",
        "rankings": [
          { "agent": "chatgpt", "score": 85, "ranking": 2 }
        ]
      }
    },
    "analysis": {
      "agentResponse": { /* agent response data */ },
      "analysis": { /* analysis data */ }
    }
  }
}
```

### 3. Agentic Visibility API
**Endpoint**: `/api/tools/agentic-visibility/analyze`

**Response Format**:
```json
{
  "success": true,
  "data": {
    "insight": {
      "tool": "agentic-visibility",
      "score": 80,
      "insights": [
        "Strong presence across AI agents",
        "High visibility potential",
        "Present in multiple top agents"
      ],
      "recommendations": [
        "Monitor agent presence trends regularly",
        "Optimize content for conversational queries"
      ],
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "metadata": {
        "domain": "example.com",
        "presenceRate": 0.8,
        "activeAgents": 3,
        "totalAgents": 4,
        "topAgents": ["chatgpt-4", "claude-3", "perplexity"]
      }
    },
    "analysis": {
      "presence": { /* presence analysis data */ }
    }
  }
}
```

## Dashboard API

### Main Dashboard Endpoint
**Endpoint**: `/api/dashboard`

**Method**: GET

**Parameters**:
- `domain` (optional): Domain to analyze
- `url` (optional): URL to analyze
- `query` (optional): Query to analyze

**Response Format**:
```json
{
  "success": true,
  "data": {
    "insights": [
      /* Array of ToolInsight objects from all tools */
    ],
    "summary": {
      "totalTools": 8,
      "averageScore": 78,
      "topPerformingTool": "schema",
      "lastUpdated": "2024-01-01T00:00:00.000Z"
    },
    "trends": [
      {
        "date": "2024-01-01",
        "averageScore": 75,
        "toolCount": 8
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Dashboard UI Implementation

### Dashboard Page
**Location**: `/src/app/dashboard/page.tsx`

**Features**:
- **Unified Input**: Accept domain, URL, or query parameters
- **Real-time Analysis**: Fetch insights from all tools
- **Summary View**: Overview of all tool scores and performance
- **Tool Cards**: Individual insight cards for each tool
- **Trends Display**: Performance trends over time
- **Quick Actions**: Direct links to individual tool pages

### Key Components Used

#### Input Section
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <ToolInput
    type="text"
    value={domain}
    onChange={setDomain}
    placeholder="Enter domain (e.g., example.com)"
    label="Domain"
  />
  <ToolInput
    type="url"
    value={url}
    onChange={setUrl}
    placeholder="Enter URL (e.g., https://example.com)"
    label="URL"
  />
  <ToolInput
    type="text"
    value={query}
    onChange={setQuery}
    placeholder="Enter search query"
    label="Query"
  />
</div>
```

#### Summary Section
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="text-center">
    <div className="text-3xl font-bold text-blue-600">
      {dashboardData.summary.totalTools}
    </div>
    <div className="text-gray-600">Tools Analyzed</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-green-600">
      {dashboardData.summary.averageScore}%
    </div>
    <div className="text-gray-600">Average Score</div>
  </div>
  {/* ... more summary items */}
</div>
```

#### Tool Insight Cards
```tsx
{dashboardData.insights.map((insight, index) => (
  <Card key={index} className="hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getToolIcon(insight.tool)}</span>
        <div>
          <h4 className="text-lg font-semibold capitalize">
            {insight.tool.replace('-', ' ')}
          </h4>
          <p className="text-sm text-gray-500">
            Updated {new Date(insight.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      {insight.score !== undefined && (
        <ScoreBadge
          score={insight.score}
          type="percentage"
          size="lg"
          className={getScoreColor(insight.score)}
        />
      )}
    </div>
    {/* Insights and Recommendations */}
  </Card>
))}
```

## Utility Functions

### Dashboard Utilities
**Location**: `/src/types/dashboard.ts`

#### Create Tool Insight
```typescript
export function createToolInsight(
  tool: string,
  score: number,
  insights: string[],
  recommendations: string[],
  metadata?: any
): ToolInsight {
  return {
    tool,
    score,
    insights,
    recommendations,
    updatedAt: new Date().toISOString(),
    metadata
  };
}
```

#### Validate Tool Insight
```typescript
export function validateToolInsight(insight: any): insight is ToolInsight {
  return (
    insight &&
    typeof insight.tool === 'string' &&
    (insight.score === undefined || typeof insight.score === 'number') &&
    Array.isArray(insight.insights) &&
    Array.isArray(insight.recommendations) &&
    typeof insight.updatedAt === 'string'
  );
}
```

#### Calculate Dashboard Summary
```typescript
export function calculateDashboardSummary(insights: ToolInsight[]): DashboardData['summary'] {
  const validScores = insights.filter(i => i.score !== undefined).map(i => i.score!);
  const averageScore = validScores.length > 0 
    ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
    : 0;

  const topPerformingTool = insights
    .filter(i => i.score !== undefined)
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0]?.tool || 'none';

  return {
    totalTools: insights.length,
    averageScore,
    topPerformingTool,
    lastUpdated: new Date().toISOString()
  };
}
```

## Integration Benefits

### 1. Unified Experience
- **Single Dashboard**: All tool insights in one view
- **Consistent Format**: Standardized data structure across tools
- **Cross-Tool Analysis**: Compare performance across different tools

### 2. Actionable Insights
- **Prioritized Recommendations**: Focus on highest-impact improvements
- **Score Comparison**: Identify strongest and weakest areas
- **Trend Analysis**: Track performance over time

### 3. Developer Experience
- **Type Safety**: Full TypeScript support with specific interfaces
- **Reusable Components**: Shared UI components across tools
- **Standardized APIs**: Consistent endpoint patterns

### 4. Scalability
- **Easy Addition**: New tools can easily integrate with dashboard
- **Modular Design**: Each tool maintains independence
- **Extensible Format**: Metadata allows tool-specific data

## Usage Examples

### Fetching Dashboard Data
```javascript
// Get dashboard for a domain
const response = await fetch('/api/dashboard?domain=example.com');
const dashboard = await response.json();

// Get dashboard for a URL
const response = await fetch('/api/dashboard?url=https://example.com/page');
const dashboard = await response.json();

// Get dashboard for a query
const response = await fetch('/api/dashboard?query=AI optimization');
const dashboard = await response.json();
```

### Using Tool Insights
```javascript
// Access specific tool insights
const overviewInsight = dashboard.data.insights.find(i => i.tool === 'overviewiq');
const agentRankInsight = dashboard.data.insights.find(i => i.tool === 'agentrank');

// Get recommendations
const allRecommendations = dashboard.data.insights.flatMap(i => i.recommendations);

// Calculate average score
const averageScore = dashboard.data.summary.averageScore;
```

### Dashboard UI Integration
```tsx
// In a React component
const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  const fetchDashboard = async () => {
    const response = await fetch('/api/dashboard?domain=example.com');
    const result = await response.json();
    if (result.success) {
      setDashboardData(result.data);
    }
  };
  
  fetchDashboard();
}, []);
```

## Future Enhancements

### 1. Real-time Updates
- **WebSocket Integration**: Live dashboard updates
- **Progress Indicators**: Real-time analysis progress
- **Auto-refresh**: Periodic dashboard updates

### 2. Advanced Analytics
- **Historical Data**: Long-term performance tracking
- **Predictive Insights**: AI-powered recommendations
- **Competitor Analysis**: Benchmark against competitors

### 3. Customization
- **Dashboard Layouts**: Customizable dashboard views
- **Tool Selection**: Choose which tools to display
- **Alert System**: Notifications for score changes

### 4. Export Features
- **PDF Reports**: Exportable dashboard reports
- **Data Export**: CSV/JSON export of insights
- **Scheduled Reports**: Automated report generation

## Conclusion

The dashboard integration successfully provides a unified view of AI search optimization insights from all Neural Command tools. The standardized `ToolInsight` format ensures consistency across tools while maintaining flexibility for tool-specific data. The dashboard UI offers a comprehensive overview with actionable insights and recommendations, making it easy for users to optimize their content for AI-powered search across all platforms. 