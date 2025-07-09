'use client'
import React, { useState, useEffect } from 'react'
import { SparklesIcon, CpuChipIcon, BoltIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface AgenticNotificationProps {
  isVisible: boolean
  onDismiss?: () => void
}

export const AgenticNotification: React.FC<AgenticNotificationProps> = ({ 
  isVisible, 
  onDismiss 
}) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  const messages = [
    {
      icon: <CpuChipIcon className="w-5 h-5 text-blue-500" />,
      title: "Our Agentic Intelligence Agents Are Crunching Numbers",
      subtitle: "Neural networks analyzing 500+ authority signals across AI platforms"
    },
    {
      icon: <SparklesIcon className="w-5 h-5 text-purple-500" />,
      title: "AI Agents Discovering Authority Patterns",
      subtitle: "Deep learning algorithms evaluating content quality and expertise signals"
    },
    {
      icon: <BoltIcon className="w-5 h-5 text-yellow-500" />,
      title: "Agentic Systems Processing E-A-T Signals",
      subtitle: "Advanced AI analyzing Expertise, Authoritativeness, and Trustworthiness"
    },
    {
      icon: <CpuChipIcon className="w-5 h-5 text-green-500" />,
      title: "Neural Command Agents Optimizing Results",
      subtitle: "Synthesizing insights for maximum AI search performance"
    }
  ]

  useEffect(() => {
    if (isVisible) {
      setShowNotification(true)
      
      // Cycle through messages every 4 seconds
      const interval = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % messages.length)
      }, 4000)

      return () => clearInterval(interval)
    } else {
      setShowNotification(false)
    }
  }, [isVisible])

  if (!showNotification) return null

  const message = messages[currentMessage]

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 transform transition-all duration-500 ease-out">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-20 animate-pulse" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                {message.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Neural Command
                  </h3>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Live Analysis Dashboard</p>
              </div>
            </div>
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Main Message */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
              {message.title}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {message.subtitle}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500">
              {Math.floor((currentMessage + 1) / messages.length * 100)}%
            </span>
          </div>

          {/* Neural Activity Visualization */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span>Processing...</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Agents:</span>
              <span className="font-medium text-blue-600">4 Active</span>
            </div>
          </div>

          {/* Cute Agent Activity */}
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((agent) => (
                  <div
                    key={agent}
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      agent === 1 ? 'bg-blue-500' :
                      agent === 2 ? 'bg-purple-500' :
                      agent === 3 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ animationDelay: `${agent * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                Agent-{currentMessage + 1}: {getAgentActivity(currentMessage)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function for agent activities
const getAgentActivity = (messageIndex: number) => {
  const activities = [
    "Analyzing neural pathways",
    "Discovering authority patterns", 
    "Computing E-A-T signals",
    "Synthesizing final insights"
  ]
  return activities[messageIndex] || "Processing data"
}

export default AgenticNotification 