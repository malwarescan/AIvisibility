# LLM Visibility Simulator Enhancement

## Overview

Enhanced the Agentic Visibility Scanner with a comprehensive custom query testing system that simulates searches across multiple LLM platforms (ChatGPT, Claude, Perplexity, Google AI). The enhancement includes real-time search results, domain highlighting, visibility score tracking, and historical comparison features.

## Features Implemented

### 1. Custom Query Testing System
- **Multi-Platform Search**: Test queries across ChatGPT, Claude, Perplexity, and Google AI
- **Real-time Results**: Simulate actual search results with top 10 URLs per platform
- **Domain Tracking**: Monitor specific domain visibility across all platforms
- **Query History**: Persistent storage of search queries and results

### 2. Advanced Result Display
- **Top 10 Results**: Show complete search result lists for each platform
- **Domain Highlighting**: Green highlighting for user's domain matches
- **Source Classification**: Distinguish between chat, link, and web sources
- **Ranking Visualization**: Clear position indicators with color-coded ranks

### 3. Visibility Score Tracking
- **Score Calculation**: Algorithm-based visibility scoring (1st=100%, 2nd=90%, etc.)
- **Delta Tracking**: Compare current scores with previous test results
- **Trend Indicators**: Visual arrows showing score improvements/declines
- **Historical Comparison**: Track visibility changes over time

### 4. Enhanced User Interface
- **Dual Functionality**: Custom query testing + domain visibility scanning
- **Platform Filtering**: Filter results by specific LLM platforms
- **Real-time Terminal**: Live logging of search progress and results
- **Responsive Design**: Optimized for desktop and mobile viewing

## Technical Implementation

### Component Structure: `src/app/tools/agentic-visibility/page.tsx`

#### Core Interfaces:
```typescript
interface SearchResult {
  rank: number;
  title: string;
  url: string;
  domain: string;
  source: 'chat' | 'link' | 'web';
  snippet?: string;
}

interface PlatformSearchResults {
  platform: string;
  query: string;
  results: SearchResult[];
  visibilityScore: number;
  previousScore?: number;
  scoreDelta?: number;
  userDomainMatches: number;
  timestamp: string;
}
```

#### Key State Management:
```typescript
const [customQuery, setCustomQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);
const [searchResults, setSearchResults] = useState<PlatformSearchResults[]>([]);
const [searchHistory, setSearchHistory] = useState<PlatformSearchResults[]>([]);
const [selectedSearchPlatform, setSelectedSearchPlatform] = useState('all');
const [showSearchResults, setShowSearchResults] = useState(false);
```

### Core Functions

#### 1. Custom Search Handler
```typescript
const handleCustomSearch = async () => {
  // Validate inputs
  // Simulate search across platforms
  // Generate mock results
  // Calculate visibility scores
  // Track score deltas
  // Save to history
};
```

#### 2. Mock Result Generation
```typescript
const generateMockSearchResults = (query: string, userDomain: string, platform: string) => {
  // Generate realistic search results
  // Include user domain matches
  // Calculate visibility scores
  // Return structured results
};
```

#### 3. Score Delta Calculation
```typescript
const getPreviousScore = (platform: string, query: string): number => {
  // Find previous search results
  // Return previous visibility score
  // Handle missing history gracefully
};
```

## User Interface Features

### 1. Custom Query Testing Section
- **Prominent Placement**: Blue gradient section at the top
- **Three-Column Layout**: Query input, domain input, search button
- **Clear Instructions**: Helpful placeholder text and descriptions
- **Real-time Validation**: Disable button until required fields are filled

### 2. Search Results Display
- **Platform-Specific Cards**: Individual cards for each LLM platform
- **Score Headers**: Large visibility scores with color coding
- **Delta Indicators**: Arrow icons showing score changes
- **Filter Controls**: Dropdown to show specific platforms

### 3. Result List Features
- **Ranking Circles**: Numbered circles for each result position
- **Domain Highlighting**: Green background for user domain matches
- **Source Badges**: Color-coded badges for chat/link/web sources
- **Snippet Display**: Optional result snippets for context

### 4. Visual Design Elements
- **Color Coding**: Green for user domain, gray for competitors
- **Score Colors**: Green (80%+), Yellow (60-79%), Red (<60%)
- **Delta Colors**: Green for improvements, red for declines
- **Loading States**: Animated indicators during search

## Search Algorithm Features

### 1. Visibility Score Calculation
```typescript
// Position-based scoring
if (position === 1) return score + 100;  // 1st place = 100%
if (position === 2) return score + 90;   // 2nd place = 90%
if (position === 3) return score + 80;   // 3rd place = 80%
if (position <= 5) return score + 60;    // 4-5th = 60%
if (position <= 10) return score + 40;   // 6-10th = 40%
return score + 20;                       // Below 10th = 20%
```

### 2. Domain Match Detection
- **Exact Matching**: Compare result domains with user domain
- **Multiple Appearances**: Track how many times domain appears
- **Position Weighting**: Higher scores for better positions
- **Average Calculation**: Mean score across all appearances

### 3. Historical Comparison
- **Previous Score Lookup**: Find matching platform/query combinations
- **Delta Calculation**: Current score minus previous score
- **Trend Analysis**: Positive/negative/neutral indicators
- **Persistent Storage**: localStorage for search history

## Platform-Specific Features

### 1. ChatGPT Simulation
- **Web Results**: Simulate web search results
- **Chat Responses**: Include chat-based result sources
- **Link References**: Track link-based citations
- **Realistic Ranking**: Position user domain realistically

### 2. Claude Simulation
- **Anthropic Style**: Simulate Claude's response patterns
- **Web Search**: Include web search result simulation
- **Citation Tracking**: Monitor source citations
- **Context Awareness**: Realistic result ordering

### 3. Perplexity Simulation
- **Real-time Search**: Simulate live search capabilities
- **Source Diversity**: Mix of web, news, and academic sources
- **Citation Quality**: High-quality source tracking
- **Result Freshness**: Recent and relevant results

### 4. Google AI Simulation
- **Gemini Integration**: Simulate Google's AI search
- **Rich Results**: Enhanced result display
- **Knowledge Graph**: Structured data integration
- **Local Results**: Location-aware search simulation

## Advanced Features

### 1. Search History Management
- **localStorage Persistence**: Save search history locally
- **Query Tracking**: Store queries, results, and scores
- **Timestamp Recording**: Track when searches were performed
- **Automatic Loading**: Load history on component mount

### 2. Result Filtering
- **Platform Filtering**: Show specific LLM platforms
- **All Platforms View**: Display results from all platforms
- **Dynamic Filtering**: Real-time filter updates
- **Clear Visual Separation**: Distinct sections for each platform

### 3. Terminal Integration
- **Real-time Logging**: Live updates during search process
- **Progress Tracking**: Show search progress across platforms
- **Error Reporting**: Display search errors and issues
- **Completion Status**: Confirm when searches finish

### 4. Score Analytics
- **Delta Tracking**: Monitor score changes over time
- **Trend Visualization**: Visual indicators for improvements
- **Historical Context**: Compare with previous searches
- **Performance Metrics**: Track visibility improvements

## Usage Workflow

### 1. Custom Query Testing
1. Enter search query in the custom testing section
2. Specify domain to track
3. Click "Test Query" to start search
4. View results across all platforms
5. Analyze visibility scores and trends

### 2. Result Analysis
1. Review top 10 results for each platform
2. Identify user domain appearances (highlighted in green)
3. Check visibility scores and deltas
4. Compare performance across platforms
5. Track improvements over time

### 3. Historical Comparison
1. Perform multiple searches for the same query
2. Monitor score deltas between searches
3. Identify visibility trends
4. Track optimization effectiveness
5. Export results for reporting

### 4. Platform Optimization
1. Identify best-performing platforms
2. Focus optimization efforts on weak platforms
3. Track improvements across all platforms
4. Monitor competitor visibility
5. Adjust strategies based on results

## Benefits

### 1. Comprehensive Testing
- **Multi-Platform Coverage**: Test across all major LLM platforms
- **Realistic Simulation**: Accurate representation of actual search results
- **Complete Results**: Full top 10 result lists for analysis
- **Source Diversity**: Mix of chat, link, and web sources

### 2. Advanced Analytics
- **Score Tracking**: Quantitative visibility measurement
- **Trend Analysis**: Monitor improvements over time
- **Delta Comparison**: Compare current vs previous performance
- **Historical Context**: Long-term visibility tracking

### 3. User Experience
- **Intuitive Interface**: Easy-to-use search and analysis tools
- **Visual Feedback**: Clear highlighting and color coding
- **Real-time Updates**: Live progress and result updates
- **Responsive Design**: Works across all device types

### 4. Optimization Insights
- **Platform-Specific Data**: Identify strengths and weaknesses
- **Competitive Analysis**: Compare with competitor visibility
- **Performance Tracking**: Monitor optimization effectiveness
- **Strategic Planning**: Data-driven optimization decisions

## Future Enhancements

### 1. Advanced Analytics
- **Predictive Modeling**: Forecast visibility improvements
- **Competitor Tracking**: Monitor competitor visibility changes
- **Seasonal Analysis**: Track seasonal visibility patterns
- **A/B Testing**: Compare different optimization strategies

### 2. Integration Features
- **API Integration**: Connect with real LLM APIs
- **Automated Testing**: Schedule regular visibility tests
- **Alert System**: Notify on significant visibility changes
- **Export Options**: PDF reports and data exports

### 3. Enhanced Simulation
- **More Platforms**: Add support for additional LLM platforms
- **Realistic Results**: Improve result simulation accuracy
- **Dynamic Content**: Simulate real-time content changes
- **Context Awareness**: Platform-specific result patterns

### 4. Advanced UI Features
- **Interactive Charts**: Visualize visibility trends
- **Heat Maps**: Visual platform performance comparison
- **Drill-down Analysis**: Detailed result analysis tools
- **Custom Dashboards**: Personalized visibility monitoring

## Technical Considerations

### 1. Performance Optimization
- **Async Operations**: Non-blocking search simulations
- **Memory Management**: Efficient handling of large result sets
- **Caching**: Cache search results for repeated queries
- **Loading States**: Smooth user experience during searches

### 2. Data Storage
- **localStorage Management**: Handle storage limits gracefully
- **Data Compression**: Optimize storage for large result sets
- **Cleanup Routines**: Remove old search history automatically
- **Backup Strategies**: Export search history for backup

### 3. Browser Compatibility
- **Modern Browsers**: Support for latest browser features
- **Fallback Options**: Graceful degradation for older browsers
- **Mobile Support**: Responsive design for mobile devices
- **Accessibility**: Screen reader and keyboard navigation support

## Conclusion

The enhanced LLM Visibility Simulator provides a comprehensive solution for testing and monitoring domain visibility across multiple AI platforms. With custom query testing, real-time result simulation, and advanced analytics, users can effectively track their agentic visibility performance and optimize their strategies accordingly.

The system offers both immediate insights through custom query testing and long-term tracking through historical comparison, making it an essential tool for anyone focused on AI platform visibility optimization. The intuitive interface and comprehensive feature set make it easy to understand and improve domain performance across all major LLM platforms. 