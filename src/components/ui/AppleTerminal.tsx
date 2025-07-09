'use client';

import React, { useState, useEffect } from 'react';

interface TerminalStep {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  message: string;
  details?: string;
  timestamp: Date;
}

interface AppleTerminalProps {
  steps: TerminalStep[];
  isVisible: boolean;
  onComplete?: () => void;
}

export const AppleTerminal: React.FC<AppleTerminalProps> = ({ 
  steps, 
  isVisible, 
  onComplete 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedSteps, setDisplayedSteps] = useState<TerminalStep[]>([]);

  useEffect(() => {
    if (isVisible && steps.length > 0) {
      // Animate steps appearing one by one
      const timer = setTimeout(() => {
        if (currentStepIndex < steps.length) {
          setDisplayedSteps(prev => [...prev, steps[currentStepIndex]]);
          setCurrentStepIndex(prev => prev + 1);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps, isVisible]);

  useEffect(() => {
    if (displayedSteps.length === steps.length && steps.every(s => s.status === 'completed')) {
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  }, [displayedSteps, steps, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300 text-sm ml-3 font-mono">
              Authority Analysis Terminal
            </span>
          </div>
          <div className="text-gray-400 text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          <div className="text-green-400 mb-4">
            <span className="text-yellow-400">$</span> neural-command authority-analyzer
          </div>
          
          <div className="text-blue-400 mb-4">
            Starting comprehensive authority signal analysis...
          </div>

          {/* Analysis Steps */}
          <div className="space-y-3">
            {displayedSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {step.status === 'pending' && (
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                  )}
                  {step.status === 'running' && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                  )}
                  {step.status === 'completed' && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  {step.status === 'error' && (
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${
                      step.status === 'completed' ? 'text-green-400' :
                      step.status === 'error' ? 'text-red-400' :
                      step.status === 'running' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    
                    {step.status === 'running' && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-gray-300 mt-1">
                    {step.message}
                  </div>
                  
                  {step.details && (
                    <div className="text-gray-500 text-xs mt-1 ml-4">
                      {step.details}
                    </div>
                  )}
                  
                  <div className="text-gray-600 text-xs mt-1">
                    {step.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {displayedSteps.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Progress</span>
                <span>{displayedSteps.filter(s => s.status === 'completed').length}/{steps.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(displayedSteps.filter(s => s.status === 'completed').length / steps.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Status Summary */}
          {displayedSteps.length === steps.length && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="text-green-400 font-medium mb-2">
                Analysis Summary
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-green-400 ml-2">
                    {steps.filter(s => s.status === 'completed').length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Errors:</span>
                  <span className="text-red-400 ml-2">
                    {steps.filter(s => s.status === 'error').length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Total Time:</span>
                  <span className="text-blue-400 ml-2">
                    {steps.length * 0.8}s
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 ml-2">
                    {steps.every(s => s.status === 'completed') ? 'SUCCESS' : 'IN PROGRESS'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppleTerminal; 