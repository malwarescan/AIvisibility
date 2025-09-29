"use client";

import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface FlywheelStage {
  id: string;
  title: string;
  description: string;
  tool: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: string;
}

interface AgenticSEOFlywheelProps {
  currentStage?: string;
  onStageClick?: (stageId: string) => void;
}

export const AgenticSEOFlywheel: React.FC<AgenticSEOFlywheelProps> = ({
  currentStage = 'discovery',
  onStageClick
}) => {
  const stages: FlywheelStage[] = [
    {
      id: 'discovery',
      title: 'Discovery',
      description: 'Reverse engineer competitor schemas',
      tool: 'Schema Reverse Engineer',
      status: 'completed',
      icon: 'Search'
    },
    {
      id: 'simulation',
      title: 'Simulation',
      description: 'Test visibility across LLM platforms',
      tool: 'Agentic Visibility Scanner',
      status: 'in-progress',
      icon: 'Test'
    },
    {
      id: 'generation',
      title: 'Generation',
      description: 'Auto-generate optimized schemas',
      tool: 'Schema Generator',
      status: 'pending',
      icon: 'Fast'
    },
    {
      id: 'measurement',
      title: 'Measurement',
      description: 'Track authority and performance',
      tool: 'Authority Signal Monitor',
      status: 'pending',
      icon: 'Analytics'
    },
    {
      id: 'scaling',
      title: 'Scaling',
      description: 'Deploy at scale with APIs',
      tool: 'Agentic API',
      status: 'pending',
      icon: 'Launch'
    }
  ];

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'pending': return 'bg-gray-300 text-gray-600';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  const getStageBorder = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-200 bg-green-50';
      case 'in-progress': return 'border-blue-200 bg-blue-50';
      case 'pending': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <AutoAnimatedElement animation="slideUp" intensity={1.2}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Agentic SEO Flywheel
          </h2>
          <p className="text-gray-600">
            The complete workflow for AI Overview optimization across 5 core tools
          </p>
        </div>

        {/* Circular Flywheel */}
        <div className="relative w-96 h-96 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-spin" style={{ animationDuration: '20s' }}></div>
          
          {stages.map((stage, index) => {
            const angle = (index * 72) - 90; // 360° / 5 stages = 72°, start at -90° for top
            const radius = 140;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <div
                key={stage.id}
                className={`absolute w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
                  getStageColor(stage.status)
                }`}
                style={{
                  left: `calc(50% + ${x}px - 48px)`,
                  top: `calc(50% + ${y}px - 48px)`,
                  zIndex: stage.status === 'in-progress' ? 10 : 5
                }}
                onClick={() => onStageClick?.(stage.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{stage.icon}</div>
                  <div className="text-xs font-medium">{stage.title}</div>
                </div>
              </div>
            );
          })}
          
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              AI
            </div>
          </div>
        </div>

        {/* Stage Details */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md cursor-pointer ${
                getStageBorder(stage.status)
              } ${currentStage === stage.id ? 'ring-2 ring-purple-500' : ''}`}
              onClick={() => onStageClick?.(stage.id)}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{stage.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{stage.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{stage.description}</p>
                <div className="text-xs font-medium text-purple-600">{stage.tool}</div>
                <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                  stage.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {stage.status === 'completed' ? '✓ Complete' :
                   stage.status === 'in-progress' ? '⟳ In Progress' :
                   '⏳ Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Mode Toggle */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
            Enable Workflow Mode
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Guide users through the complete Agentic SEO process
          </p>
        </div>
      </div>
    </AutoAnimatedElement>
  );
}; 