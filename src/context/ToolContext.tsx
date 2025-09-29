'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tool types for the SEO Flywheel suite
export type ToolType = 
  | 'schema-optimizer'
  | 'authority-monitor'
  | 'agentic-visibility'
  | 'agentic-api'
  | 'seo-flywheel';

// Schema data structure
export interface SchemaData {
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

// Authority data structure
export interface AuthorityData {
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

// Agentic visibility data structure
export interface VisibilityData {
  url: string;
  domain: string;
  overallVisibility: number;
  visibilityTrend: number;
  platformResults: {
    chatgpt: {
      averageVisibility: number;
      topRankings: number;
      queryResults: any[];
    };
    claude: {
      averageVisibility: number;
      topRankings: number;
      queryResults: any[];
    };
    perplexity: {
      averageVisibility: number;
      topRankings: number;
      queryResults: any[];
    };
  };
  timestamp: Date;
}

// Agentic API data structure
export interface AgenticAPIData {
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

// Flywheel workflow state
export interface FlywheelState {
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

// Global tool state
export interface ToolState {
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

// Action types
export type ToolAction =
  | { type: 'SET_ACTIVE_TOOL'; payload: ToolType }
  | { type: 'SET_ANALYZED_URL'; payload: string }
  | { type: 'SET_DOMAIN'; payload: string }
  | { type: 'SET_SCHEMA_DATA'; payload: SchemaData }
  | { type: 'SET_AUTHORITY_DATA'; payload: AuthorityData }
  | { type: 'SET_VISIBILITY_DATA'; payload: VisibilityData }
  | { type: 'SET_AGENTIC_API_DATA'; payload: AgenticAPIData }
  | { type: 'SET_FLYWHEEL_STATE'; payload: FlywheelState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_TOOL_DATA'; payload: ToolType }
  | { type: 'RESET_STATE' }
  | { type: 'UPDATE_FLYWHEEL_PROGRESS'; payload: { stage: number; completed: boolean; data?: any } };

// Initial state
const initialState: ToolState = {
  activeTool: null,
  previousTool: null,
  analyzedUrl: '',
  domain: '',
  schemaData: null,
  authorityData: null,
  visibilityData: null,
  agenticAPIData: null,
  flywheelState: {
    currentStage: 0,
    stages: [
      { id: 1, name: 'Schema Analysis', tool: 'schema-optimizer', completed: false, data: null },
      { id: 2, name: 'Authority Monitoring', tool: 'authority-monitor', completed: false, data: null },
      { id: 3, name: 'Visibility Scanning', tool: 'agentic-visibility', completed: false, data: null },
      { id: 4, name: 'API Integration', tool: 'agentic-api', completed: false, data: null },
      { id: 5, name: 'Workflow Complete', tool: 'seo-flywheel', completed: false, data: null }
    ],
    progress: 0,
    timestamp: new Date()
  },
  isLoading: false,
  error: null,
  canNavigateToNext: false,
  canNavigateToPrevious: false
};

// Reducer function
function toolReducer(state: ToolState, action: ToolAction): ToolState {
  switch (action.type) {
    case 'SET_ACTIVE_TOOL':
      return {
        ...state,
        previousTool: state.activeTool,
        activeTool: action.payload,
        error: null
      };
    
    case 'SET_ANALYZED_URL':
      return {
        ...state,
        analyzedUrl: action.payload,
        domain: action.payload ? new URL(action.payload).hostname : ''
      };
    
    case 'SET_DOMAIN':
      return {
        ...state,
        domain: action.payload
      };
    
    case 'SET_SCHEMA_DATA':
      return {
        ...state,
        schemaData: action.payload,
        error: null
      };
    
    case 'SET_AUTHORITY_DATA':
      return {
        ...state,
        authorityData: action.payload,
        error: null
      };
    
    case 'SET_VISIBILITY_DATA':
      return {
        ...state,
        visibilityData: action.payload,
        error: null
      };
    
    case 'SET_AGENTIC_API_DATA':
      return {
        ...state,
        agenticAPIData: action.payload,
        error: null
      };
    
    case 'SET_FLYWHEEL_STATE':
      return {
        ...state,
        flywheelState: action.payload,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case 'CLEAR_TOOL_DATA':
      return {
        ...state,
        ...(action.payload === 'schema-optimizer' && { schemaData: null }),
        ...(action.payload === 'authority-monitor' && { authorityData: null }),
        ...(action.payload === 'agentic-visibility' && { visibilityData: null }),
        ...(action.payload === 'agentic-api' && { agenticAPIData: null }),
        ...(action.payload === 'seo-flywheel' && { flywheelState: initialState.flywheelState })
      };
    
    case 'UPDATE_FLYWHEEL_PROGRESS':
      if (!state.flywheelState) return state;
      
      const updatedStages = state.flywheelState.stages.map(stage => 
        stage.id === action.payload.stage 
          ? { ...stage, completed: action.payload.completed, data: action.payload.data || stage.data }
          : stage
      );
      
      const completedStages = updatedStages.filter(stage => stage.completed).length;
      const progress = (completedStages / updatedStages.length) * 100;
      
      return {
        ...state,
        flywheelState: {
          ...state.flywheelState,
          stages: updatedStages,
          progress,
          timestamp: new Date()
        },
        canNavigateToNext: completedStages > 0 && completedStages < updatedStages.length,
        canNavigateToPrevious: completedStages > 1
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context interface
interface ToolContextType {
  state: ToolState;
  // Tool management
  setActiveTool: (tool: ToolType) => void;
  getActiveTool: () => ToolType | null;
  
  // URL and domain management
  setAnalyzedUrl: (url: string) => void;
  getAnalyzedUrl: () => string;
  setDomain: (domain: string) => void;
  getDomain: () => string;
  
  // Data management
  setSchemaData: (data: SchemaData) => void;
  getSchemaData: () => SchemaData | null;
  setAuthorityData: (data: AuthorityData) => void;
  getAuthorityData: () => AuthorityData | null;
  setVisibilityData: (data: VisibilityData) => void;
  getVisibilityData: () => VisibilityData | null;
  setAgenticAPIData: (data: AgenticAPIData) => void;
  getAgenticAPIData: () => AgenticAPIData | null;
  
  // Flywheel workflow management
  setFlywheelState: (state: FlywheelState) => void;
  getFlywheelState: () => FlywheelState | null;
  updateFlywheelProgress: (stage: number, completed: boolean, data?: any) => void;
  getCurrentStage: () => number;
  getProgress: () => number;
  
  // Utility methods
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearToolData: (tool: ToolType) => void;
  resetState: () => void;
  
  // Navigation helpers
  canNavigateToNext: () => boolean;
  canNavigateToPrevious: () => boolean;
  
  // Data validation
  hasDataForTool: (tool: ToolType) => boolean;
  getToolData: (tool: ToolType) => any;
}

// Create context
const ToolContext = createContext<ToolContextType | undefined>(undefined);

// Provider component
interface ToolProviderProps {
  children: ReactNode;
}

export function ToolProvider({ children }: ToolProviderProps) {
  const [state, dispatch] = useReducer(toolReducer, initialState);

  // Tool management
  const setActiveTool = (tool: ToolType) => {
    dispatch({ type: 'SET_ACTIVE_TOOL', payload: tool });
  };

  const getActiveTool = () => state.activeTool;

  // URL and domain management
  const setAnalyzedUrl = (url: string) => {
    dispatch({ type: 'SET_ANALYZED_URL', payload: url });
  };

  const getAnalyzedUrl = () => state.analyzedUrl;

  const setDomain = (domain: string) => {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
  };

  const getDomain = () => state.domain;

  // Data management
  const setSchemaData = (data: SchemaData) => {
    dispatch({ type: 'SET_SCHEMA_DATA', payload: data });
  };

  const getSchemaData = () => state.schemaData;

  const setAuthorityData = (data: AuthorityData) => {
    dispatch({ type: 'SET_AUTHORITY_DATA', payload: data });
  };

  const getAuthorityData = () => state.authorityData;

  const setVisibilityData = (data: VisibilityData) => {
    dispatch({ type: 'SET_VISIBILITY_DATA', payload: data });
  };

  const getVisibilityData = () => state.visibilityData;

  const setAgenticAPIData = (data: AgenticAPIData) => {
    dispatch({ type: 'SET_AGENTIC_API_DATA', payload: data });
  };

  const getAgenticAPIData = () => state.agenticAPIData;

  // Flywheel workflow management
  const setFlywheelState = (flywheelState: FlywheelState) => {
    dispatch({ type: 'SET_FLYWHEEL_STATE', payload: flywheelState });
  };

  const getFlywheelState = () => state.flywheelState;

  const updateFlywheelProgress = (stage: number, completed: boolean, data?: any) => {
    dispatch({ type: 'UPDATE_FLYWHEEL_PROGRESS', payload: { stage, completed, data } });
  };

  const getCurrentStage = () => state.flywheelState?.currentStage || 0;

  const getProgress = () => state.flywheelState?.progress || 0;

  // Utility methods
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearToolData = (tool: ToolType) => {
    dispatch({ type: 'CLEAR_TOOL_DATA', payload: tool });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  // Navigation helpers
  const canNavigateToNext = () => state.canNavigateToNext;
  const canNavigateToPrevious = () => state.canNavigateToPrevious;

  // Data validation
  const hasDataForTool = (tool: ToolType): boolean => {
    switch (tool) {
      case 'schema-optimizer':
        return !!state.schemaData;
      case 'authority-monitor':
        return !!state.authorityData;
      case 'agentic-visibility':
        return !!state.visibilityData;
      case 'agentic-api':
        return !!state.agenticAPIData;
      case 'seo-flywheel':
        return !!state.flywheelState;
      default:
        return false;
    }
  };

  const getToolData = (tool: ToolType): any => {
    switch (tool) {
      case 'schema-optimizer':
        return state.schemaData;
      case 'authority-monitor':
        return state.authorityData;
      case 'agentic-visibility':
        return state.visibilityData;
      case 'agentic-api':
        return state.agenticAPIData;
      case 'seo-flywheel':
        return state.flywheelState;
      default:
        return null;
    }
  };

  const contextValue: ToolContextType = {
    state,
    setActiveTool,
    getActiveTool,
    setAnalyzedUrl,
    getAnalyzedUrl,
    setDomain,
    getDomain,
    setSchemaData,
    getSchemaData,
    setAuthorityData,
    getAuthorityData,
    setVisibilityData,
    getVisibilityData,
    setAgenticAPIData,
    getAgenticAPIData,
    setFlywheelState,
    getFlywheelState,
    updateFlywheelProgress,
    getCurrentStage,
    getProgress,
    setLoading,
    setError,
    clearToolData,
    resetState,
    canNavigateToNext,
    canNavigateToPrevious,
    hasDataForTool,
    getToolData
  };

  return (
    <ToolContext.Provider value={contextValue}>
      {children}
    </ToolContext.Provider>
  );
}

// Custom hook to use the context
export function useToolContext(): ToolContextType {
  const context = useContext(ToolContext);
  if (context === undefined) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
}

// Convenience hooks for specific tools
export function useSchemaOptimizer() {
  const { getSchemaData, setSchemaData, hasDataForTool } = useToolContext();
  return {
    schemaData: getSchemaData(),
    setSchemaData,
    hasData: hasDataForTool('schema-optimizer')
  };
}

export function useAuthorityMonitor() {
  const { getAuthorityData, setAuthorityData, hasDataForTool } = useToolContext();
  return {
    authorityData: getAuthorityData(),
    setAuthorityData,
    hasData: hasDataForTool('authority-monitor')
  };
}

export function useAgenticVisibility() {
  const { getVisibilityData, setVisibilityData, hasDataForTool } = useToolContext();
  return {
    visibilityData: getVisibilityData(),
    setVisibilityData,
    hasData: hasDataForTool('agentic-visibility')
  };
}

export function useAgenticAPI() {
  const { getAgenticAPIData, setAgenticAPIData, hasDataForTool } = useToolContext();
  return {
    agenticAPIData: getAgenticAPIData(),
    setAgenticAPIData,
    hasData: hasDataForTool('agentic-api')
  };
}

export function useSEOFlywheel() {
  const { 
    getFlywheelState, 
    setFlywheelState, 
    updateFlywheelProgress, 
    getCurrentStage, 
    getProgress,
    hasDataForTool 
  } = useToolContext();
  return {
    flywheelState: getFlywheelState(),
    setFlywheelState,
    updateFlywheelProgress,
    currentStage: getCurrentStage(),
    progress: getProgress(),
    hasData: hasDataForTool('seo-flywheel')
  };
} 