"use client";

import { AutoAnimatedElement } from './AutoAnimatedElement';

export function AppleAgenticDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Command center */}
        <AutoAnimatedElement animation="slideUp" delay={0.5} intensity={1.3}>
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <input 
                className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-400"
                placeholder="Ask anything about your AI search performance..."
              />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Analyze
              </button>
            </div>
          </div>
        </AutoAnimatedElement>

        {/* Intelligence cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "AI Citations", value: "2,847", change: "+23%", color: "green" },
            { title: "Search Visibility", value: "94%", change: "+12%", color: "blue" },
            { title: "Agent Performance", value: "A+", change: "Stable", color: "purple" },
            { title: "ChatGPT Mentions", value: "156", change: "+45%", color: "green" },
            { title: "Perplexity Citations", value: "89", change: "+18%", color: "blue" },
            { title: "Claude References", value: "234", change: "+32%", color: "purple" }
          ].map((metric, i) => (
            <AutoAnimatedElement
              key={i}
              animation="slideUp"
              delay={0.7 + i * 0.1}
              intensity={1.1}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-sm text-gray-600 mb-2">{metric.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-gray-900">{metric.value}</span>
                  <span className={`text-sm text-${metric.color}-600 bg-${metric.color}-50 px-2 py-1 rounded-full`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </AutoAnimatedElement>
          ))}
        </div>

        {/* Live monitoring section */}
        <AutoAnimatedElement animation="slideUp" delay={1.2} intensity={1.4} className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <AutoAnimatedElement animation="fadeIn" delay={1.4}>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Live AI Search Monitoring</h2>
            </AutoAnimatedElement>
            <div className="space-y-4">
              {[
                { platform: "ChatGPT", action: "Cited your content", time: "2 min ago", impact: "High" },
                { platform: "Perplexity", action: "Featured in overview", time: "5 min ago", impact: "Medium" },
                { platform: "Claude", action: "Referenced in response", time: "8 min ago", impact: "High" },
                { platform: "Google AI", action: "Included in snippet", time: "12 min ago", impact: "Medium" }
              ].map((event, i) => (
                <AutoAnimatedElement
                  key={i}
                  animation="slideLeft"
                  delay={1.6 + i * 0.1}
                  intensity={1.0}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-gray-900">{event.platform}</p>
                        <p className="text-sm text-gray-600">{event.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.impact === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {event.impact}
                      </span>
                    </div>
                  </div>
                </AutoAnimatedElement>
              ))}
            </div>
          </div>
        </AutoAnimatedElement>

        {/* Quick actions */}
        <AutoAnimatedElement animation="scale" delay={2.0} intensity={1.2} className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button className="bg-blue-500 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105">
              Optimize Content
            </button>
            <button className="bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 px-10 py-4 rounded-xl font-medium text-lg hover:bg-white transition-all duration-200">
              View Analytics
            </button>
          </div>
        </AutoAnimatedElement>
      </div>
    </div>
  );
} 