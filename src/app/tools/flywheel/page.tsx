"use client";

import { useState } from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { AgenticSEOFlywheel } from '@/components/tools/shared/AgenticSEOFlywheel';
import { MetricCard } from '@/components/ui/MetricCard';

export default function FlywheelPage() {
  const [currentStage, setCurrentStage] = useState('discovery');
  const [workflowProgress, setWorkflowProgress] = useState(20);
  const [completedStages, setCompletedStages] = useState(['discovery']);

  const handleStageClick = (stageId: string) => {
    setCurrentStage(stageId);
    
    // Update progress based on stage
    const stageProgress = {
      'discovery': 20,
      'simulation': 40,
      'generation': 60,
      'measurement': 80,
      'scaling': 100
    };
    
    setWorkflowProgress(stageProgress[stageId as keyof typeof stageProgress] || 20);
    
    // Add to completed stages if not already there
    if (!completedStages.includes(stageId)) {
      setCompletedStages([...completedStages, stageId]);
    }
  };

  const getStageInstructions = (stage: string) => {
    const instructions = {
      discovery: {
        title: "Step 1: Discovery - Reverse Engineer Competitor Schemas",
        description: "Start by analyzing your competitors' schema markup to understand what's working in AI Overviews.",
        actions: [
          "Enter a competitor URL in Schema Reverse Engineer",
          "Extract and analyze their structured data",
          "Review schema quality scores and optimization opportunities",
          "Identify winning schema patterns"
        ],
        toolLink: "/tools/schema-optimizer",
        toolName: "Schema Reverse Engineer"
      },
      simulation: {
        title: "Step 2: Simulation - Test Visibility Across LLM Platforms",
        description: "Simulate how your content appears in ChatGPT, Claude, and Perplexity to understand current visibility.",
        actions: [
          "Use Agentic Visibility Scanner to test queries",
          "Analyze your domain's ranking across platforms",
          "Compare visibility with competitors",
          "Identify improvement opportunities"
        ],
        toolLink: "/tools/agentic-visibility",
        toolName: "Agentic Visibility Scanner"
      },
      generation: {
        title: "Step 3: Generation - Create Optimized Schemas",
        description: "Generate AI-optimized schema markup based on competitor analysis and LLM visibility insights.",
        actions: [
          "Use optimization suggestions from Schema Reverse Engineer",
          "Generate platform-specific schema recommendations",
          "Implement voice search optimization",
          "Add conversational query support"
        ],
        toolLink: "/tools/schema-optimizer",
        toolName: "Schema Generator"
      },
      measurement: {
        title: "Step 4: Measurement - Track Authority and Performance",
        description: "Monitor your authority signals and track improvements in AI platform visibility over time.",
        actions: [
          "Use Authority Signal Monitor to track E-E-A-T signals",
          "Monitor LLM ranking performance",
          "Track schema implementation impact",
          "Measure AI Overview visibility improvements"
        ],
        toolLink: "/tools/authority",
        toolName: "Authority Signal Monitor"
      },
      scaling: {
        title: "Step 5: Scaling - Deploy at Scale with APIs",
        description: "Automate schema deployment and integrate with your existing workflows for continuous optimization.",
        actions: [
          "Connect to LangChain, Zapier, or Make via Agentic API",
          "Set up automated schema deployment",
          "Integrate with your CMS or website",
          "Scale optimization across multiple pages"
        ],
        toolLink: "/tools/connect",
        toolName: "Agentic API"
      }
    };
    
    return instructions[stage as keyof typeof instructions];
  };

  const currentInstructions = getStageInstructions(currentStage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <AutoAnimatedElement animation="slideUp" intensity={1.2}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  SEO Flywheel (Workflow Mode)
                </h1>
                <p className="text-gray-600">
                  Complete guided workflow for AI Overview optimization across all 5 core tools
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-medium">
                  Workflow Mode
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                  {workflowProgress}% Complete
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${workflowProgress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="Current Stage"
                value={currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}
                change="Active"
                changeType="positive"
              />
              <MetricCard
                title="Completed Stages"
                value={`${completedStages.length}/5`}
                change={`${Math.round((completedStages.length / 5) * 100)}%`}
                changeType="positive"
              />
              <MetricCard
                title="Workflow Progress"
                value={`${workflowProgress}%`}
                change="On Track"
                changeType="positive"
              />
            </div>
          </div>
        </AutoAnimatedElement>

        {/* Agentic SEO Flywheel */}
        <AgenticSEOFlywheel 
          currentStage={currentStage}
          onStageClick={handleStageClick}
        />

        {/* Current Stage Instructions */}
        <AutoAnimatedElement animation="slideUp" delay={0.3}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentInstructions.title}
              </h2>
              <a
                href={currentInstructions.toolLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Open {currentInstructions.toolName}
              </a>
            </div>

            <p className="text-gray-600 mb-6">
              {currentInstructions.description}
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Actions to Complete:</h3>
              <ul className="space-y-3">
                {currentInstructions.actions.map((action, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
              <p className="text-blue-800 text-sm">
                Complete the current stage actions, then click on the next stage in the flywheel above to continue your AI Overview optimization journey.
              </p>
            </div>
          </div>
        </AutoAnimatedElement>

        {/* Workflow Tips */}
        <AutoAnimatedElement animation="slideUp" delay={0.4}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Workflow Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Best Practices</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start with 3-5 competitor URLs for comprehensive analysis</li>
                  <li>• Test visibility across all major LLM platforms</li>
                  <li>• Implement schema changes incrementally</li>
                  <li>• Monitor performance for at least 2-4 weeks</li>
                  <li>• Use automation to scale successful patterns</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Success Metrics</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Improved AI Overview visibility (target: +50%)</li>
                  <li>• Higher schema quality scores (target: 85+)</li>
                  <li>• Better LLM platform rankings (target: top 3)</li>
                  <li>• Increased conversational query matches</li>
                  <li>• Automated schema deployment success</li>
                </ul>
              </div>
            </div>
          </div>
        </AutoAnimatedElement>
      </div>
    </div>
  );
} 