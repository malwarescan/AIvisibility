import React, { useState } from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

interface RLHFTrainingData {
  llmResultsCollected: number;
  agentPicksCollected: number;
  totalHumanAnnotations: number;
  averageLLMScore: number;
  averageAgentScore: number;
}

interface RewardModel {
  id: string;
  name: string;
  version: string;
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  lastUpdated: Date;
}

interface AgentChain {
  id: string;
  name: string;
  agents: Array<{
    id: string;
    name: string;
    type: string;
    role: string;
  }>;
  status: string;
  lastRun?: Date;
}

interface SimulationResult {
  id: string;
  url: string;
  status: string;
  overallScore: number;
  confidence: number;
  executionTime: number;
  results: Array<{
    agentName: string;
    task: string;
    score: number;
    confidence: number;
    executionTime: number;
    hasErrors: boolean;
  }>;
}

interface AdvancedAIFeaturesProps {
  url: string;
  content: string;
}

export function AdvancedAIFeatures({ url, content }: AdvancedAIFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'rlhf' | 'simulation'>('rlhf');
  const [isTraining, setIsTraining] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [trainingData, setTrainingData] = useState<RLHFTrainingData | null>(null);
  const [rewardModels, setRewardModels] = useState<RewardModel[]>([]);
  const [agentChains, setAgentChains] = useState<AgentChain[]>([]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [currentSimulation, setCurrentSimulation] = useState<SimulationResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // RLHF Training Functions
  const trainRewardModel = async () => {
    setIsTraining(true);
    addLog('Starting RLHF training...');
    addLog(`URL: ${url}`);
    addLog('Collecting LLM results and agent picks...');

    try {
      const response = await fetch('/api/rlhf/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          content,
          modelName: `RLHF_Model_${Date.now()}`,
          config: {
            learningRate: 0.001,
            batchSize: 32,
            epochs: 10,
            rewardFunction: 'hybrid',
            humanFeedbackWeight: 0.4,
            agentFeedbackWeight: 0.3,
            llmFeedbackWeight: 0.3
          }
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Training failed');
      }

      addLog('Training completed successfully!');
      addLog(`LLM Results: ${data.result.trainingStats.llmResultsCollected}`);
      addLog(`Agent Picks: ${data.result.trainingStats.agentPicksCollected}`);
      addLog(`Model Accuracy: ${(data.result.modelPerformance.accuracy * 100).toFixed(1)}%`);

      setTrainingData(data.result.trainingStats);
      setRewardModels(prev => [...prev, data.result.rewardModel]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Training failed';
      addLog(`Error: ${errorMessage}`);
    } finally {
      setIsTraining(false);
    }
  };

  const loadRLHFData = async () => {
    try {
      const response = await fetch('/api/rlhf/train');
      const data = await response.json();

      if (data.success) {
        setRewardModels(data.result.rewardModels);
        setTrainingData(data.result.trainingStats);
      }
    } catch (error) {
      console.error('Failed to load RLHF data:', error);
    }
  };

  // Agentic Simulation Functions
  const runSimulation = async (chainId: string = 'multi_agent_analysis') => {
    setIsSimulating(true);
    addLog('Starting agentic simulation...');
    addLog(`URL: ${url}`);
    addLog(`Chain: ${chainId}`);

    try {
      const response = await fetch('/api/agentic-simulation/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          chainId
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Simulation failed');
      }

      addLog('Simulation completed successfully!');
      addLog(`Overall Score: ${data.result.simulation.overallScore}/100`);
      addLog(`Confidence: ${(data.result.simulation.confidence * 100).toFixed(1)}%`);
      addLog(`Execution Time: ${data.result.executionTime}ms`);

      setCurrentSimulation(data.result.simulation);
      setSimulationResults(prev => [...prev, data.result.simulation]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Simulation failed';
      addLog(`Error: ${errorMessage}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const loadSimulationData = async () => {
    try {
      const response = await fetch('/api/agentic-simulation/run');
      const data = await response.json();

      if (data.success) {
        setAgentChains(data.result.agentChains);
        setSimulationResults(data.result.simulationResults);
      }
    } catch (error) {
      console.error('Failed to load simulation data:', error);
    }
  };

  // Load data on component mount
  React.useEffect(() => {
    loadRLHFData();
    loadSimulationData();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'running': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Advanced AI Features
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('rlhf')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'rlhf'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            RLHF Training
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'simulation'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Agentic Simulation
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {activeTab === 'rlhf' && (
            <button
              onClick={trainRewardModel}
              disabled={isTraining}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTraining ? 'Training...' : 'Train Reward Model'}
            </button>
          )}
          
          {activeTab === 'simulation' && (
            <button
              onClick={() => runSimulation('multi_agent_analysis')}
              disabled={isSimulating}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSimulating ? 'Simulating...' : 'Run Multi-Agent Simulation'}
            </button>
          )}
        </div>
      </div>

      {/* RLHF Training Tab */}
      {activeTab === 'rlhf' && (
        <div className="space-y-6">
          {/* Training Data Stats */}
          {trainingData && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Training Data Statistics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {trainingData.llmResultsCollected}
                  </div>
                  <div className="text-sm text-gray-600">LLM Results</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {trainingData.agentPicksCollected}
                  </div>
                  <div className="text-sm text-gray-600">Agent Picks</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {trainingData.totalHumanAnnotations}
                  </div>
                  <div className="text-sm text-gray-600">Annotations</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {trainingData.averageLLMScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg LLM Score</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {trainingData.averageAgentScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Agent Score</div>
                </div>
              </div>
            </div>
          )}

          {/* Reward Models */}
          {rewardModels.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trained Reward Models
              </h3>
              
              <div className="space-y-4">
                {rewardModels.map((model) => (
                  <div key={model.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{model.name}</h4>
                      <span className="text-sm text-gray-500">v{model.version}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(model.performance.accuracy * 100)}`}>
                          {(model.performance.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Accuracy</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(model.performance.precision * 100)}`}>
                          {(model.performance.precision * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Precision</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(model.performance.recall * 100)}`}>
                          {(model.performance.recall * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Recall</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(model.performance.f1Score * 100)}`}>
                          {(model.performance.f1Score * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">F1 Score</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-3">
                      Last updated: {new Date(model.lastUpdated).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Agentic Simulation Tab */}
      {activeTab === 'simulation' && (
        <div className="space-y-6">
          {/* Agent Chains */}
          {agentChains.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Agent Chains
              </h3>
              
              <div className="space-y-4">
                {agentChains.map((chain) => (
                  <div key={chain.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{chain.name}</h4>
                      <StatusIndicator 
                        status={chain.status === 'completed' ? 'excellent' : chain.status === 'running' ? 'good' : 'poor'} 
                        size="sm" 
                      />
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {chain.agents.length} agents: {chain.agents.map(agent => agent.name).join(', ')}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => runSimulation(chain.id)}
                        disabled={isSimulating}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Run Simulation
                      </button>
                      
                      {chain.lastRun && (
                        <span className="text-xs text-gray-500 self-center">
                          Last run: {new Date(chain.lastRun).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Simulation Results */}
          {currentSimulation && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Latest Simulation Results
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Overall Score</h4>
                    <p className="text-sm text-gray-600">Multi-agent analysis result</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(currentSimulation.overallScore)}`}>
                      {currentSimulation.overallScore}/100
                    </div>
                    <div className="text-sm text-gray-600">
                      Confidence: {(currentSimulation.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Agent Results</h5>
                  {currentSimulation.results.map((result, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-medium text-gray-900">{result.agentName}</h6>
                          <p className="text-sm text-gray-600">{result.task}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                            {result.score}/100
                          </div>
                          <div className="text-xs text-gray-500">
                            {result.executionTime}ms
                          </div>
                        </div>
                      </div>
                      {result.hasErrors && (
                        <div className="text-xs text-red-600 mt-2">
                          ⚠️ Errors detected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Simulation History */}
          {simulationResults.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Simulation History
              </h3>
              
              <div className="space-y-3">
                {simulationResults.slice(-5).reverse().map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <h6 className="font-medium text-gray-900">{result.url}</h6>
                      <p className="text-sm text-gray-600">
                        {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}/100
                      </div>
                      <div className={`text-xs ${getStatusColor(result.status)}`}>
                        {result.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Logs */}
      <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300 text-sm ml-3">
              Advanced AI Features Terminal
            </span>
          </div>
          <div className="text-gray-400 text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-300">
              {log}
            </div>
          ))}
          {(isTraining || isSimulating) && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 