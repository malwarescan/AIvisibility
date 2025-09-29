"use client";

import { useState, useEffect, useRef } from "react";
import SchemaInputEditor from './components/SchemaInputEditor';
import AgentFeedbackAccordion from './components/AgentFeedbackAccordion';
import ConsensusScoreCard from './components/ConsensusScoreCard';
import AgreementMatrixTable from './components/AgreementMatrixTable';
import RecommendationsList from './components/RecommendationsList';

type Mode = 'analyze' | 'optimize' | 'generate' | 'feedback' | 'consensus';

interface AnalysisResult {
  qualityScore: number;
  completenessScore: number;
  aiOptimizationScore: number;
  issues: Array<{
    type: 'error' | 'warning' | 'suggestion';
    field: string;
    message: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  strengths: string[];
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    implementation: string;
    expectedImpact: number;
  }>;
}

interface OptimizedSchemaResult {
  optimizedSchema: string;
  improvements: Array<{
    field: string;
    originalValue: any;
    optimizedValue: any;
    reason: string;
    impact: number;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  aiOptimization: {
    chatgptScore: number;
    claudeScore: number;
    perplexityScore: number;
    googleScore: number;
  };
}

interface GeneratedSchemaResult {
  generatedSchema: string;
  schemaType: string;
  fields: Array<{
    field: string;
    value: any;
    importance: 'required' | 'recommended' | 'optional';
    description: string;
  }>;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  optimization: {
    richResultsEligibility: boolean;
    aiConsumptionScore: number;
    seoScore: number;
  };
}

interface AgentFeedbackResult {
  agent: string;
  valuableFields: string[];
  missingFields: string[];
  summary: string;
}

// --- Types for Consensus API ---
interface AgentFeedback {
  agent: string;
  valuableFields: string[];
  missingFields: string[];
  summary: string;
}

interface AgreementMatrix {
  [field: string]: string[]; // field -> array of agents who agree
}

interface FieldRating {
  [agent: string]: number;
}

interface RecommendedChange {
  field: string;
  action: 'add' | 'improve' | 'remove';
  reason: string;
  impact: number;
  affectedAgents: string[];
}

interface ConsensusResult {
  consensusScore: number;
  agreementMatrix: AgreementMatrix;
  fieldRatings: { [field: string]: FieldRating };
  recommendedChanges: RecommendedChange[];
  agentFeedback: {
    [agent: string]: {
      valuableFields: string[];
      missingFields: string[];
      summary: string;
    };
  };
}

const TABS = [
  { label: 'Optimizer', key: 'optimizer' },
  { label: 'Consensus', key: 'consensus' },
  // ... add other tabs as needed ...
];

function consensusToCSV(score: number | null, matrix: AgreementMatrix, recommendations: RecommendedChange[]): string {
  let csv = `Consensus Score,${score ?? ''}\n`;
  csv += '\nAgreement Matrix\nField,' + Object.keys(matrix).join(',') + '\n';
  Object.entries(matrix).forEach(([field, agents]) => {
    csv += `${field},${agents.join(',')}\n`;
  });
  csv += '\nRecommendations\nField,Action,Reason,Impact,Affected Agents\n';
  recommendations.forEach(rec => {
    csv += `${rec.field},${rec.action},"${rec.reason}",${rec.impact},${rec.affectedAgents.join('|')}\n`;
  });
  return csv;
}

export default function SchemaOptimizerPage() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [mode, setMode] = useState<Mode>('analyze');
  const [schema, setSchema] = useState('');
  const [content, setContent] = useState('');
  const [schemaType, setSchemaType] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<'chatgpt' | 'claude' | 'perplexity' | 'google'>('chatgpt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | OptimizedSchemaResult | GeneratedSchemaResult | AgentFeedbackResult | ConsensusResult | null>(null);

  // Consensus tab state
  const [consensusSchema, setConsensusSchema] = useState(`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Example Article",
  "author": "Jane Doe"
}`);
  const [consensusError, setConsensusError] = useState<string | undefined>(undefined);
  const [consensusLoading, setConsensusLoading] = useState(false);
  const [consensusScore, setConsensusScore] = useState<number | null>(null);
  const [consensusAgentFeedback, setConsensusAgentFeedback] = useState<AgentFeedback[]>([]);
  const [consensusMatrix, setConsensusMatrix] = useState<AgreementMatrix>({});
  const [consensusFields, setConsensusFields] = useState<string[]>([]);
  const [consensusAgents, setConsensusAgents] = useState<string[]>([]);
  const [consensusRecommendations, setConsensusRecommendations] = useState<RecommendedChange[]>([]);

  // Mock state for consensus tab
  // const [consensusSchema, setConsensusSchema] = useState(`{
  //   "@context": "https://schema.org",
  //   "@type": "Article",
  //   "headline": "Example Article",
  //   "author": "Jane Doe"
  // }`);
  // const [consensusError, setConsensusError] = useState<string | undefined>(undefined);

  // Mock agent feedback
  // const consensusAgentFeedback = [
  //   {
  //     agent: 'ChatGPT',
  //     valuableFields: ['headline - helps identify topic', 'author - source credibility'],
  //     missingFields: ['datePublished - important for recency'],
  //     summary: 'The schema provides a clear topic and author, but lacks publication date which is important for ranking.'
  //   },
  //   {
  //     agent: 'Claude',
  //     valuableFields: ['headline', 'author'],
  //     missingFields: ['description - summary missing'],
  //     summary: 'Good structure, but a description field would improve understanding.'
  //   },
  //   {
  //     agent: 'Perplexity',
  //     valuableFields: ['headline'],
  //     missingFields: ['url - source reference'],
  //     summary: 'Headline is useful, but URL is missing for source verification.'
  //   },
  //   {
  //     agent: 'Google AI',
  //     valuableFields: ['headline', 'author'],
  //     missingFields: ['image - enhances snippet'],
  //     summary: 'Image field would help with rich results.'
  //   }
  // ];

  // Mock consensus score
  // const consensusConsensusScore = 72;

  // Mock agreement matrix
  // const consensusFields = ['headline', 'author', 'datePublished', 'description', 'url', 'image'];
  // const consensusAgents = ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'];
  // const consensusMatrix = {
  //   headline: ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'],
  //   author: ['ChatGPT', 'Claude', 'Google AI'],
  //   datePublished: [],
  //   description: ['Claude'],
  //   url: [],
  //   image: ['Google AI']
  // };

  // Mock recommendations
  // const consensusRecommendations = [
  //   {
  //     field: 'datePublished',
  //     action: 'add' as 'add',
  //     reason: 'Low rating across 3 agents: ChatGPT, Perplexity, Google AI',
  //     impact: 80,
  //     affectedAgents: ['ChatGPT', 'Perplexity', 'Google AI']
  //   },
  //   {
  //     field: 'description',
  //     action: 'add' as 'add',
  //     reason: 'Missing in Claude feedback',
  //     impact: 60,
  //     affectedAgents: ['Claude']
  //   },
  //   {
  //     field: 'image',
  //     action: 'add' as 'add',
  //     reason: 'Recommended by Google AI for rich results',
  //     impact: 50,
  //     affectedAgents: ['Google AI']
  //   }
  // ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      if (mode === 'feedback') {
        // Handle agent feedback
        if (!schema.trim()) {
          throw new Error('Schema is required for agent feedback');
        }
        
        response = await fetch('/api/schema-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schema: schema,
            agent: selectedAgent
          })
        });
      } else if (mode === 'consensus') {
        // Handle consensus analysis
        if (!schema.trim()) {
          throw new Error('Schema is required for consensus analysis');
        }
        
        response = await fetch('/api/schema-consensus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schema: schema
          })
        });
      } else {
        // Handle other modes
        const requestBody: any = { mode };

        switch (mode) {
          case 'analyze':
          case 'optimize':
            if (!schema.trim()) {
              throw new Error('Schema is required for analysis and optimization');
            }
            requestBody.schema = schema;
            break;
          case 'generate':
            if (!content.trim()) {
              throw new Error('Content is required for schema generation');
            }
            if (!schemaType.trim()) {
              throw new Error('Schema type is required for schema generation');
            }
            requestBody.content = content;
            requestBody.type = schemaType;
            break;
        }

        response = await fetch('/api/schema-optimize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to process request');
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle Consensus API call
  const handleConsensusSubmit = async () => {
    setConsensusError(undefined);
    // 1. Schema validation pre-submit
    try {
      JSON.parse(consensusSchema);
    } catch {
      setConsensusError('Invalid JSON format');
      return;
    }
    setConsensusLoading(true);
    setConsensusScore(null);
    setConsensusAgentFeedback([]);
    setConsensusMatrix({});
    setConsensusFields([]);
    setConsensusAgents([]);
    setConsensusRecommendations([]);
    try {
      const res = await fetch('/api/schema-consensus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema: consensusSchema })
      });
      const json = await res.json();
      if (!json.success) {
        setConsensusError(json.error || 'Consensus analysis failed.');
        setConsensusLoading(false);
        return;
      }
      const data: ConsensusResult = json.data;
      setConsensusScore(data.consensusScore);
      setConsensusAgentFeedback(
        Object.entries(data.agentFeedback).map(([agent, feedback]) => ({
          agent,
          ...feedback
        }))
      );
      setConsensusMatrix(data.agreementMatrix);
      setConsensusRecommendations(data.recommendedChanges);
      const fields = Object.keys(data.agreementMatrix);
      setConsensusFields(fields);
      const agentsSet = new Set<string>();
      Object.values(data.agreementMatrix).forEach(arr => arr.forEach(agent => agentsSet.add(agent)));
      Object.keys(data.agentFeedback).forEach(agent => agentsSet.add(agent));
      setConsensusAgents(Array.from(agentsSet));
      setConsensusLoading(false);
    } catch (e: any) {
      setConsensusError(e.message || 'Consensus analysis failed.');
      setConsensusLoading(false);
    }
  };

  const renderModeSelector = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-black mb-4">Select Operation Mode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {[
          { id: 'analyze', title: 'Analyze Schema', description: 'Analyze existing JSON-LD schema for quality and AI optimization potential' },
          { id: 'optimize', title: 'Optimize Schema', description: 'Enhance existing schema for better AI consumption and rich results' },
          { id: 'generate', title: 'Generate Schema', description: 'Create new JSON-LD schema from scratch based on content and type' },
          { id: 'feedback', title: 'Agent Feedback', description: 'Get AI agent perspective on how your schema affects their understanding' },
          { id: 'consensus', title: 'Agent Consensus', description: 'Multi-agent consensus analysis for unified schema optimization' }
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setMode(option.id as Mode)}
            className={`p-3 border-2 border-black text-left ${
              mode === option.id
                ? 'bg-gray-200'
                : 'bg-white'
            }`}
          >
            <h3 className="font-bold text-black mb-2">{option.title}</h3>
            <p className="text-sm text-black">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderInputForm = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-black mb-4">Input Data</h2>
      
      {(mode === 'analyze' || mode === 'optimize' || mode === 'feedback' || mode === 'consensus') && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              JSON-LD Schema {mode === 'consensus' ? 'for Consensus Analysis' : mode === 'feedback' ? 'for Agent Feedback' : mode === 'analyze' ? 'to Analyze' : 'to Optimize'}
            </label>
            <textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder='{"@context": "https://schema.org", "@type": "Article", ...}'
              className="w-full h-48 p-4 border border-black font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>
      )}

      {mode === 'generate' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Content for Schema Generation
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content you want to create schema for..."
              className="w-full h-48 p-4 border border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Schema Type
            </label>
            <select
              value={schemaType}
              onChange={(e) => setSchemaType(e.target.value)}
              className="w-full p-3 border border-black"
            >
              <option value="">Select a schema type...</option>
              <option value="Article">Article</option>
              <option value="Product">Product</option>
              <option value="Organization">Organization</option>
              <option value="Person">Person</option>
              <option value="Event">Event</option>
              <option value="Recipe">Recipe</option>
              <option value="FAQPage">FAQ Page</option>
              <option value="HowTo">How-To</option>
              <option value="Review">Review</option>
              <option value="LocalBusiness">Local Business</option>
            </select>
          </div>
        </div>
      )}

      {mode === 'feedback' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Select AI Agent
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI Assistant' },
                { id: 'claude', name: 'Claude', description: 'Anthropic AI' },
                { id: 'perplexity', name: 'Perplexity', description: 'Search Engine' },
                { id: 'google', name: 'Google AI', description: 'Google Overview' }
              ].map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id as any)}
                  className={`p-3 border-2 border-black text-center ${
                    selectedAgent === agent.id
                      ? 'bg-gray-200'
                      : 'bg-white'
                  }`}
                >
                  <div className="font-bold text-black">{agent.name}</div>
                  <div className="text-xs text-black">{agent.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-black text-white border border-black disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {loading ? 'Processing...' : 
           mode === 'feedback' ? 'Get Agent Feedback' : 
           mode === 'consensus' ? 'Analyze Consensus' : 
           'Process Schema'}
        </button>
      </div>
    </div>
  );

  const renderAnalysisResult = (data: AnalysisResult) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-black">Analysis Results</h2>
      
      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-2">Quality Score</h3>
          <div className="text-3xl font-bold text-black">{data.qualityScore}/100</div>
          <p className="text-sm text-black">Overall schema quality</p>
        </div>
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-2">Completeness Score</h3>
          <div className="text-3xl font-bold text-black">{data.completenessScore}/100</div>
          <p className="text-sm text-black">Schema completeness</p>
        </div>
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-2">AI Optimization Score</h3>
          <div className="text-3xl font-bold text-black">{data.aiOptimizationScore}/100</div>
          <p className="text-sm text-black">AI consumption potential</p>
        </div>
      </div>

      {/* Issues */}
      {data.issues.length > 0 && (
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-3">Issues Found</h3>
          <div className="space-y-2">
            {data.issues.map((issue, index) => (
              <div key={index} className="p-3 border border-black">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-1 text-xs font-bold border border-black">
                        {issue.type.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 text-xs font-bold border border-black">
                        {issue.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <p className="font-bold text-black">{issue.field}</p>
                    <p className="text-sm text-black">{issue.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {data.strengths.length > 0 && (
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-3">Strengths</h3>
          <div className="space-y-2">
            {data.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-black font-bold">✓</span>
                <span className="text-black">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div className="bg-white border border-black p-4">
          <h3 className="font-bold text-black mb-3">Recommendations</h3>
          <div className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="border border-black p-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2 py-1 text-xs font-bold border border-black">
                    {rec.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-sm text-black">+{rec.expectedImpact} points</span>
                </div>
                <h4 className="font-bold text-black mb-1">{rec.category}</h4>
                <p className="text-sm text-black mb-2">{rec.description}</p>
                <p className="text-xs text-black bg-gray-100 p-2 border border-black">
                  <strong>Implementation:</strong> {rec.implementation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderOptimizationResult = (data: OptimizedSchemaResult) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-black">Optimization Results</h2>
      
      {/* AI Optimization Scores */}
      <div className="bg-white border border-black p-4">
        <h3 className="font-bold text-black mb-3">AI Platform Optimization Scores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center border border-black p-2">
            <div className="text-2xl font-bold text-black">{data.aiOptimization.chatgptScore}</div>
            <div className="text-sm text-black">ChatGPT</div>
          </div>
          <div className="text-center border border-black p-2">
            <div className="text-2xl font-bold text-black">{data.aiOptimization.claudeScore}</div>
            <div className="text-sm text-black">Claude</div>
          </div>
          <div className="text-center border border-black p-2">
            <div className="text-2xl font-bold text-black">{data.aiOptimization.perplexityScore}</div>
            <div className="text-sm text-black">Perplexity</div>
          </div>
          <div className="text-center border border-black p-2">
            <div className="text-2xl font-bold text-black">{data.aiOptimization.googleScore}</div>
            <div className="text-sm text-black">Google AI</div>
          </div>
        </div>
      </div>

      {/* Validation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Validation</h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className={`w-4 h-4 rounded-full ${
            data.validation.isValid ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span className="font-medium">
            {data.validation.isValid ? 'Schema is valid' : 'Schema has validation issues'}
          </span>
        </div>
        {data.validation.errors.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-red-700 mb-2">Errors:</h4>
            <ul className="list-disc pl-5 text-sm text-red-600">
              {data.validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {data.validation.warnings.length > 0 && (
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Warnings:</h4>
            <ul className="list-disc pl-5 text-sm text-yellow-600">
              {data.validation.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Improvements */}
      {data.improvements.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Improvements Made</h3>
          <div className="space-y-3">
            {data.improvements.map((improvement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{improvement.field}</span>
                  <span className="text-sm text-green-600">+{improvement.impact} points</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{improvement.reason}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-500">Original:</span>
                    <pre className="bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                      {JSON.stringify(improvement.originalValue, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Optimized:</span>
                    <pre className="bg-green-50 p-2 rounded mt-1 overflow-x-auto">
                      {JSON.stringify(improvement.optimizedValue, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimized Schema */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Optimized Schema</h3>
        <textarea
          value={data.optimizedSchema}
          readOnly
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          spellCheck={false}
        />
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => navigator.clipboard.writeText(data.optimizedSchema)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => {
              const blob = new Blob([data.optimizedSchema], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "optimized-schema.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );

  const renderGenerationResult = (data: GeneratedSchemaResult) => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Generation Results</h2>
      
      {/* Optimization Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">AI Consumption Score</h3>
          <div className="text-3xl font-bold text-blue-600">{data.optimization.aiConsumptionScore}/100</div>
          <p className="text-sm text-gray-600">How well AI can consume this schema</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">SEO Score</h3>
          <div className="text-3xl font-bold text-green-600">{data.optimization.seoScore}/100</div>
          <p className="text-sm text-gray-600">Search engine optimization potential</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Rich Results</h3>
          <div className="text-3xl font-bold text-purple-600">
            {data.optimization.richResultsEligibility ? 'Eligible' : 'Not Eligible'}
          </div>
          <p className="text-sm text-gray-600">Rich snippet eligibility</p>
        </div>
      </div>

      {/* Validation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Validation</h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className={`w-4 h-4 rounded-full ${
            data.validation.isValid ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span className="font-medium">
            {data.validation.isValid ? 'Schema is valid' : 'Schema has validation issues'}
          </span>
        </div>
        {data.validation.errors.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-red-700 mb-2">Errors:</h4>
            <ul className="list-disc pl-5 text-sm text-red-600">
              {data.validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {data.validation.warnings.length > 0 && (
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Warnings:</h4>
            <ul className="list-disc pl-5 text-sm text-yellow-600">
              {data.validation.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Generated Fields</h3>
        <div className="space-y-2">
          {data.fields.map((field, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{field.field}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    field.importance === 'required' ? 'bg-red-100 text-red-800' :
                    field.importance === 'recommended' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {field.importance.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{field.description}</p>
              </div>
              <div className="text-sm text-gray-500">
                {typeof field.value === 'string' ? field.value : JSON.stringify(field.value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Schema */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Generated Schema</h3>
        <textarea
          value={data.generatedSchema}
          readOnly
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          spellCheck={false}
        />
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => navigator.clipboard.writeText(data.generatedSchema)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => {
              const blob = new Blob([data.generatedSchema], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${data.schemaType.toLowerCase()}-schema.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );

  const renderAgentFeedbackResult = (data: AgentFeedbackResult) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Agent Feedback Results</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Agent:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
            {data.agent}
          </span>
        </div>
      </div>

      {/* Agent Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🤖</span>
          Agent Interpretation Summary
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      </div>

      {/* Valuable Fields */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">✅</span>
          Most Valuable Fields for {data.agent.charAt(0).toUpperCase() + data.agent.slice(1)}
        </h3>
        <div className="space-y-3">
          {data.valuableFields.map((field, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-600 mt-1">✓</span>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{field}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Fields */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">⚠️</span>
          Missing or Weak Fields
        </h3>
        <div className="space-y-3">
          {data.missingFields.map((field, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-orange-600 mt-1">✗</span>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{field}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Optimization Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-700">
              <strong>Focus on missing fields:</strong> Prioritize adding the fields that {data.agent} identified as missing or weak to improve your schema's effectiveness for this AI platform.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-gray-700">
              <strong>Leverage valuable fields:</strong> The fields marked as valuable are working well. Consider expanding on these areas to further enhance your schema's impact.
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-gray-700">
              <strong>Test with other agents:</strong> Try getting feedback from different AI agents to ensure your schema works well across all platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsensusResult = (data: ConsensusResult) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Multi-Agent Consensus Analysis</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Consensus Score:</span>
          <span className={`px-4 py-2 rounded-full text-lg font-bold ${
            data.consensusScore >= 80 ? 'bg-green-100 text-green-800' :
            data.consensusScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {data.consensusScore}/100
          </span>
        </div>
      </div>

      {/* Consensus Score Explanation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🎯</span>
          Consensus Score Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.consensusScore}</div>
            <div className="text-sm text-gray-600">Overall Consensus</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(data.fieldRatings).length}
            </div>
            <div className="text-sm text-gray-600">Fields Analyzed</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {data.recommendedChanges.length}
            </div>
            <div className="text-sm text-gray-600">Recommended Changes</div>
          </div>
        </div>
      </div>

      {/* Field Ratings Matrix */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📊</span>
          Field Ratings by Agent
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Field</th>
                <th className="text-center py-3 px-2 font-medium text-gray-900">ChatGPT</th>
                <th className="text-center py-3 px-2 font-medium text-gray-900">Claude</th>
                <th className="text-center py-3 px-2 font-medium text-gray-900">Perplexity</th>
                <th className="text-center py-3 px-2 font-medium text-gray-900">Google</th>
                <th className="text-center py-3 px-2 font-medium text-gray-900">Agreement</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.fieldRatings).map(([field, ratings]) => (
                <tr key={field} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{field}</td>
                  {['chatgpt', 'claude', 'perplexity', 'google'].map(agent => (
                    <td key={agent} className="text-center py-3 px-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        ratings[agent] >= 80 ? 'bg-green-100 text-green-800' :
                        ratings[agent] >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ratings[agent]}
                      </span>
                    </td>
                  ))}
                  <td className="text-center py-3 px-2">
                    <span className="text-xs text-gray-600">
                      {data.agreementMatrix[field]?.length || 0}/4 agents
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Changes */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">💡</span>
          Recommended Schema Changes
        </h3>
        <div className="space-y-4">
          {data.recommendedChanges.map((change, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    change.action === 'add' ? 'bg-green-100 text-green-800' :
                    change.action === 'improve' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {change.action.toUpperCase()}
                  </span>
                  <span className="font-medium text-gray-900">{change.field}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Impact:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {change.impact}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{change.reason}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Affected agents:</span>
                <div className="flex space-x-1">
                  {change.affectedAgents.map(agent => (
                    <span key={agent} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Agent Feedback Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🤖</span>
          Individual Agent Feedback Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.agentFeedback).map(([agent, feedback]) => (
            <div key={agent} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-medium text-gray-900 capitalize">{agent}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {feedback.valuableFields.length} valuable, {feedback.missingFields.length} missing
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{feedback.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!result) return null;

    if (mode === 'feedback') {
      return (
        <div className="mt-8">
          {renderAgentFeedbackResult(result as AgentFeedbackResult)}
        </div>
      );
    }

    if (mode === 'consensus') {
      return (
        <div className="mt-8">
          {renderConsensusResult(result as ConsensusResult)}
        </div>
      );
    }

    return (
      <div className="mt-8">
        {mode === 'analyze' && renderAnalysisResult(result as AnalysisResult)}
        {mode === 'optimize' && renderOptimizationResult(result as OptimizedSchemaResult)}
        {mode === 'generate' && renderGenerationResult(result as GeneratedSchemaResult)}
      </div>
    );
  };

  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Persist last used schema in localStorage
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('consensusSchema') : null;
    if (saved) setConsensusSchema(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('consensusSchema', consensusSchema);
    }
  }, [consensusSchema]);

  const [viewDiff, setViewDiff] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Onboarding popup (one-time)
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('consensusOnboarded')) {
      setShowOnboarding(true);
    }
  }, []);
  const closeOnboarding = () => {
    setShowOnboarding(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('consensusOnboarded', '1');
    }
  };

  // Save snapshot/history after each successful result
  useEffect(() => {
    if (consensusScore !== null && consensusFields.length > 0) {
      const snapshot = {
        timestamp: Date.now(),
        schema: consensusSchema,
        consensusScore,
        consensusAgentFeedback,
        consensusMatrix,
        consensusFields,
        consensusAgents,
        consensusRecommendations
      };
      setHistory(prev => {
        const updated = [snapshot, ...prev].slice(0, 10); // keep last 10
        if (typeof window !== 'undefined') {
          localStorage.setItem('consensusHistory', JSON.stringify(updated));
        }
        return updated;
      });
    }
  }, [consensusScore]);
  // Load history on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('consensusHistory');
      if (saved) setHistory(JSON.parse(saved));
    }
  }, []);

  // Export function
  const download = (format: 'json' | 'csv') => {
    let blob;
    if (format === 'json') {
      blob = new Blob([
        JSON.stringify({
          consensusScore,
          consensusMatrix,
          consensusRecommendations
        }, null, 2)
      ], { type: 'application/json' });
    } else {
      blob = new Blob([
        consensusToCSV(consensusScore, consensusMatrix, consensusRecommendations)
      ], { type: 'text/csv' });
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consensus.${format}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // View Differences logic
  const missingFields: string[] = consensusFields.filter(field => {
    let missingCount = 0;
    consensusAgentFeedback.forEach(agent => {
      const allFields = [...(agent.valuableFields || []), ...(agent.missingFields || [])].map(f => f.toLowerCase());
      if (!allFields.some(f => f.includes(field.toLowerCase()))) {
        missingCount++;
      }
    });
    return missingCount >= 2;
  });

  // Helper: render side-by-side diffs for missing fields
  function renderDiffs() {
    if (!viewDiff) return null;
    return (
        <div className="bg-gray-100 border border-black p-4 mt-4">
        <h4 className="font-bold mb-2">Fields missing in 2 or more agents</h4>
        {missingFields.length === 0 && <div className="text-black">No major differences detected.</div>}
        {missingFields.map(field => (
          <div key={field} className="mb-4">
            <div className="font-mono text-xs mb-1">{field}</div>
            <div className="flex gap-4">
              {consensusAgentFeedback.map(agent => (
                <div key={agent.agent} className="flex-1 border border-black p-2 bg-white">
                  <div className="font-bold text-sm mb-1">{agent.agent}</div>
                  <div className="text-xs">
                    {agent.valuableFields.concat(agent.missingFields).find(f => f.toLowerCase().includes(field.toLowerCase())) || <span className="text-black font-bold">Missing</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Load selected history snapshot
  useEffect(() => {
    if (selectedHistoryIdx !== null && history[selectedHistoryIdx]) {
      const snap = history[selectedHistoryIdx];
      setConsensusSchema(snap.schema);
      setConsensusScore(snap.consensusScore);
      setConsensusAgentFeedback(snap.consensusAgentFeedback);
      setConsensusMatrix(snap.consensusMatrix);
      setConsensusFields(snap.consensusFields);
      setConsensusAgents(snap.consensusAgents);
      setConsensusRecommendations(snap.consensusRecommendations);
    }
  }, [selectedHistoryIdx]);

  // Helper: Collapsible hint
  function CollapsibleHint({ title, children }: { title: string, children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="mb-2">
        <button className="text-xs text-black underline" onClick={() => setOpen(o => !o)}>{open ? 'Hide' : 'What is this?'}</button>
        {open && <div className="mt-1 text-xs text-black bg-gray-100 p-2 border border-black">{children}</div>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-4 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">Schema Optimizer</h1>
          <p className="text-black">AI-powered JSON-LD schema analysis, optimization, and generation</p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-black p-4">
          <div className="flex border-b-2 border-black mb-4">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`px-4 py-2 font-bold text-sm border-r border-black ${activeTab === tab.key ? 'bg-gray-200 text-black' : 'bg-white text-black'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'consensus' && (
            <div className="space-y-4">
              <CollapsibleHint title="Schema Input">
                Paste or upload your JSON-LD schema here. This will be analyzed for agent consensus and recommendations.
              </CollapsibleHint>
              <SchemaInputEditor
                value={consensusSchema}
                onChange={setConsensusSchema}
                error={consensusError}
                onUpload={file => {
                  const reader = new FileReader();
                  reader.onload = e => {
                    if (typeof e.target?.result === 'string') {
                      setConsensusSchema(e.target.result);
                    }
                  };
                  reader.readAsText(file);
                }}
              />
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-2 items-center">
                  <button
                    className="px-6 py-2 bg-black text-white border border-black disabled:opacity-50"
                    onClick={handleConsensusSubmit}
                    disabled={consensusLoading}
                  >
                    {consensusLoading ? 'Analyzing...' : 'Analyze Consensus'}
                  </button>
                  <button
                    className="px-3 py-2 bg-white border border-black text-xs"
                    onClick={() => download('json')}
                    disabled={consensusScore === null}
                  >Export JSON</button>
                  <button
                    className="px-3 py-2 bg-white border border-black text-xs"
                    onClick={() => download('csv')}
                    disabled={consensusScore === null}
                  >Export CSV</button>
                </div>
                <div>
                  <label className="text-xs mr-2">History:</label>
                  <select
                    className="text-xs border border-black px-2 py-1"
                    value={selectedHistoryIdx ?? ''}
                    onChange={e => setSelectedHistoryIdx(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">Current</option>
                    {history.map((snap, idx) => (
                      <option key={snap.timestamp} value={idx}>
                        {new Date(snap.timestamp).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CollapsibleHint title="Consensus Score">
                This score reflects the overall agreement between agents on the value and completeness of your schema.
              </CollapsibleHint>
              <div className="flex items-center gap-4">
                <ConsensusScoreCard score={consensusScore ?? 0} description="Agreement across agents on schema quality." />
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={viewDiff} onChange={e => setViewDiff(e.target.checked)} />
                  View Differences
                </label>
              </div>
              {consensusError && (
                <div className="text-red-600 text-sm font-medium text-center">{consensusError}</div>
              )}
              {consensusLoading && (
                <div className="text-center text-gray-500">Loading consensus analysis...</div>
              )}
              {!consensusLoading && consensusScore !== null && (
                <div id="consensus-results" ref={resultsRef}>
                  {renderDiffs()}
                  <CollapsibleHint title="Agent Feedback">
                    See what each agent found valuable or missing in your schema, and their summary feedback.
                  </CollapsibleHint>
                  <AgentFeedbackAccordion feedback={consensusAgentFeedback} />
                  <CollapsibleHint title="Agreement Matrix">
                    This table shows which agents agree on the value of each field in your schema.
                  </CollapsibleHint>
                  <AgreementMatrixTable fields={consensusFields} agents={consensusAgents} matrix={consensusMatrix} />
                  <CollapsibleHint title="Recommendations">
                    These are prioritized suggestions to improve your schema based on agent consensus.
                  </CollapsibleHint>
                  <RecommendationsList recommendations={consensusRecommendations} />
                </div>
              )}
            </div>
          )}
          {renderModeSelector()}
          {renderInputForm()}
          
          {error && (
            <div className="mb-4 p-4 bg-white border border-black text-black">
              ERROR: {error}
            </div>
          )}
          
          {loading && (
            <div className="mb-4 text-center py-4">
              <p className="text-black font-bold">Processing your request with AI...</p>
            </div>
          )}
          
          {renderResults()}
        </div>
      </div>
      {showOnboarding && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white border border-black p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-black" onClick={closeOnboarding}>×</button>
            <h2 className="text-lg font-bold mb-2">Welcome to Schema Consensus!</h2>
            <p className="mb-4 text-sm text-black">Paste or upload a JSON-LD schema, analyze agent consensus, and export or compare results. Use the "What is this?" links for help.</p>
            <button className="px-4 py-2 bg-black text-white border border-black" onClick={closeOnboarding}>Get Started</button>
          </div>
        </div>
      )}
    </div>
  );
} 