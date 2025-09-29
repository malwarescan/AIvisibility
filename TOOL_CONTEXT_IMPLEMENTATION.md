# ToolContext Implementation

## Overview
The ToolContext provides a unified state management solution for the Neural Command SEO Flywheel suite, enabling seamless data sharing and workflow coordination across all tools.

## Architecture

### Core Components

#### 1. ToolContext Provider
- **File**: `src/context/ToolContext.tsx`
- **Purpose**: Global state management for all SEO Flywheel tools
- **Pattern**: React Context + useReducer for predictable state updates

#### 2. State Structure
```typescript
interface ToolState {
  // Active tool management
  activeTool: ToolType | null;
  previousTool: ToolType | null;
  
  // Shared data across tools
  analyzedUrl: string;
  domain: string;
  
  // Tool-specific data
  schemaData: SchemaData | null;
  authorityData: AuthorityData | null;
  visibilityData: VisibilityData | null;
  agenticAPIData: AgenticAPIData | null;
  flywheelState: FlywheelState | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Navigation state
  canNavigateToNext: boolean;
  canNavigateToPrevious: boolean;
}
```

## Tool Types

### Supported Tools
1. **schema-optimizer** - Schema Reverse Engineer
2. **authority-monitor** - Authority Signal Monitor  
3. **agentic-visibility** - Agentic Visibility Scanner
4. **agentic-api** - Agentic API Integration
5. **seo-flywheel** - SEO Flywheel Workflow

## Data Structures

### SchemaData
```typescript
interface SchemaData {
  url: string;
  schemas: any[];
  qualityScore: {
    overallScore: number;
    completeness: number;
    accuracy: number;
    optimization: number;
  };
  schemaVersions: any[];
  schemaDiff: {
    changes: any[];
    additions: number;
    modifications: number;
    deletions: number;
  };
  recommendations: any[];
  timestamp: Date;
}
```

### AuthorityData
```typescript
interface AuthorityData {
  url: string;
  overallScore: number;
  platformScores: {
    [platform: string]: {
      score: number;
      rank: number;
      signals: string[];
    };
  };
  componentScores: {
    content: number;
    technical: number;
    authority: number;
    performance: number;
  };
  llmVisibility: {
    chatgpt: number;
    claude: number;
    perplexity: number;
  };
  timestamp: Date;
}
```

### VisibilityData
```typescript
interface VisibilityData {
  url: string;
  domain: string;
  overallVisibility: number;
  visibilityTrend: number;
  platformResults: {
    chatgpt: { averageVisibility: number; topRankings: number; queryResults: any[] };
    claude: { averageVisibility: number; topRankings: number; queryResults: any[] };
    perplexity: { averageVisibility: number; topRankings: number; queryResults: any[] };
  };
  timestamp: Date;
}
```

### AgenticAPIData
```typescript
interface AgenticAPIData {
  url: string;
  deploymentStatus: 'idle' | 'deploying' | 'deployed' | 'error';
  apiEndpoints: {
    name: string;
    url: string;
    status: 'active' | 'inactive';
    responseTime: number;
  }[];
  integrationCode: {
    javascript: string;
    python: string;
    curl: string;
  };
  timestamp: Date;
}
```

### FlywheelState
```typescript
interface FlywheelState {
  currentStage: number;
  stages: {
    id: number;
    name: string;
    tool: ToolType;
    completed: boolean;
    data: any;
  }[];
  progress: number;
  timestamp: Date;
}
```

## Core Methods

### Tool Management
- `setActiveTool(tool: ToolType)` - Set the currently active tool
- `getActiveTool()` - Get the currently active tool
- `setAnalyzedUrl(url: string)` - Set the URL being analyzed
- `getAnalyzedUrl()` - Get the current analyzed URL

### Data Management
- `setSchemaData(data: SchemaData)` - Store schema analysis results
- `getSchemaData()` - Retrieve schema analysis results
- `setAuthorityData(data: AuthorityData)` - Store authority analysis results
- `getAuthorityData()` - Retrieve authority analysis results
- `setVisibilityData(data: VisibilityData)` - Store visibility scan results
- `getVisibilityData()` - Retrieve visibility scan results
- `setAgenticAPIData(data: AgenticAPIData)` - Store API integration data
- `getAgenticAPIData()` - Retrieve API integration data

### Flywheel Workflow
- `setFlywheelState(state: FlywheelState)` - Set complete flywheel state
- `getFlywheelState()` - Get current flywheel state
- `updateFlywheelProgress(stage: number, completed: boolean, data?: any)` - Update stage progress
- `getCurrentStage()` - Get current workflow stage
- `getProgress()` - Get overall workflow progress percentage

### Utility Methods
- `setLoading(loading: boolean)` - Set global loading state
- `setError(error: string | null)` - Set error message
- `clearToolData(tool: ToolType)` - Clear data for specific tool
- `resetState()` - Reset all state to initial values
- `hasDataForTool(tool: ToolType)` - Check if tool has data
- `getToolData(tool: ToolType)` - Get data for specific tool

## Convenience Hooks

### useSchemaOptimizer()
```typescript
const { schemaData, setSchemaData, hasData } = useSchemaOptimizer();
```

### useAuthorityMonitor()
```typescript
const { authorityData, setAuthorityData, hasData } = useAuthorityMonitor();
```

### useAgenticVisibility()
```typescript
const { visibilityData, setVisibilityData, hasData } = useAgenticVisibility();
```

### useAgenticAPI()
```typescript
const { agenticAPIData, setAgenticAPIData, hasData } = useAgenticAPI();
```

### useSEOFlywheel()
```typescript
const { 
  flywheelState, 
  setFlywheelState, 
  updateFlywheelProgress, 
  currentStage, 
  progress, 
  hasData 
} = useSEOFlywheel();
```

## Usage Examples

### Basic Setup
```typescript
// In your app layout
import { ToolProvider } from '@/context/ToolContext';

export default function Layout({ children }) {
  return (
    <ToolProvider>
      {children}
    </ToolProvider>
  );
}
```

### Using in Components
```typescript
// In any component
import { useToolContext } from '@/context/ToolContext';

export default function MyComponent() {
  const { 
    setActiveTool, 
    setAnalyzedUrl, 
    setSchemaData, 
    isLoading, 
    error 
  } = useToolContext();

  const handleAnalysis = async (url: string) => {
    setActiveTool('schema-optimizer');
    setAnalyzedUrl(url);
    
    // Perform analysis...
    const results = await analyzeSchema(url);
    setSchemaData(results);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {/* Component content */}
    </div>
  );
}
```

### Flywheel Workflow Integration
```typescript
import { useSEOFlywheel } from '@/context/ToolContext';

export default function FlywheelComponent() {
  const { 
    flywheelState, 
    updateFlywheelProgress, 
    currentStage, 
    progress 
  } = useSEOFlywheel();

  const completeStage = (stageId: number, data: any) => {
    updateFlywheelProgress(stageId, true, data);
  };

  return (
    <div>
      <div>Progress: {progress}%</div>
      <div>Current Stage: {currentStage}</div>
      {/* Workflow UI */}
    </div>
  );
}
```

## State Persistence

### Local Storage Integration
The context can be extended to persist state in localStorage:

```typescript
// In ToolProvider
useEffect(() => {
  const savedState = localStorage.getItem('toolContext');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    // Restore state
  }
}, []);

useEffect(() => {
  localStorage.setItem('toolContext', JSON.stringify(state));
}, [state]);
```

## Error Handling

### Error States
- Global error state for tool-wide errors
- Individual tool error handling
- Loading states for async operations
- Validation for data integrity

### Error Recovery
```typescript
const { setError, clearToolData } = useToolContext();

const handleError = (error: Error) => {
  setError(error.message);
  // Optionally clear problematic data
  clearToolData('schema-optimizer');
};
```

## Performance Considerations

### Optimization Strategies
1. **Selective Re-renders** - Use specific hooks to avoid unnecessary re-renders
2. **Memoization** - Memoize expensive computations
3. **Lazy Loading** - Load tool data on demand
4. **State Splitting** - Separate concerns for better performance

### Memory Management
- Clear unused tool data
- Reset state when switching tools
- Implement cleanup on unmount

## Integration Points

### With Existing Tools
1. **Schema Optimizer** - Store analysis results and quality scores
2. **Authority Monitor** - Track platform scores and LLM visibility
3. **Agentic Visibility** - Cache scan results for comparison
4. **Agentic API** - Maintain deployment status and endpoints
5. **SEO Flywheel** - Coordinate workflow progression

### With Navigation
- Sidebar integration for tool switching
- URL-based state restoration
- Breadcrumb navigation support
- Progress indicators

## Future Enhancements

### Planned Features
1. **Real-time Collaboration** - Multi-user state synchronization
2. **Advanced Analytics** - Cross-tool performance metrics
3. **Export/Import** - State backup and restoration
4. **Plugin System** - Extensible tool integration
5. **Offline Support** - Local state persistence

### Scalability Considerations
- Modular state management
- Tool-specific context splitting
- Performance monitoring
- Memory usage optimization

## Testing Strategy

### Unit Tests
- Context provider functionality
- Reducer logic validation
- Hook behavior verification
- Error handling scenarios

### Integration Tests
- Cross-tool data flow
- Workflow progression
- State persistence
- Performance benchmarks

## Documentation

### API Reference
Complete TypeScript definitions for all interfaces and methods

### Examples
Comprehensive usage examples for common scenarios

### Best Practices
Guidelines for optimal context usage and performance

## Status
✅ **Complete** - ToolContext implementation ready for integration with the SEO Flywheel suite 