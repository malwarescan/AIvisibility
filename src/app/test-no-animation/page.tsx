'use client';

import React, { useState } from 'react';

export default function TestNoAnimationPage() {
  const [auditUrl, setAuditUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = async () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-8">
        {/* Header - NO ANIMATION */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                AI-Readiness Auditor (No Animation Test)
              </h1>
              <p className="text-gray-600">
                Comprehensive technical SEO audit for AI search engine optimization
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-2 rounded-md text-sm font-medium transition-all bg-blue-600 text-white shadow-sm">
                  30 Days
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-gray-600">Ready</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Run AI-Readiness Audit</h3>
            <div className="flex space-x-4">
              <input
                type="url"
                placeholder="Enter website URL for comprehensive AI readiness audit"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <button
                onClick={handleAudit}
                disabled={!auditUrl || isAuditing}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isAuditing ? 'Auditing...' : 'Start Audit'}
              </button>
            </div>
            
            {isAuditing && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Checking technical infrastructure...</span>
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Analyzing schema markup...</span>
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Testing page performance...</span>
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metrics - NO ANIMATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">AI Readiness Score</h3>
              <span className="text-xs px-2 py-1 rounded-full font-medium text-green-600 bg-green-50">+12</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">87/100</p>
              <p className="text-sm text-gray-500">Overall AI optimization</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Technical SEO</h3>
              <span className="text-xs px-2 py-1 rounded-full font-medium text-green-600 bg-green-50">+8%</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">92%</p>
              <p className="text-sm text-gray-500">Core technical factors</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Schema Coverage</h3>
              <span className="text-xs px-2 py-1 rounded-full font-medium text-green-600 bg-green-50">+15%</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">78%</p>
              <p className="text-sm text-gray-500">Structured data markup</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Performance Score</h3>
              <span className="text-xs px-2 py-1 rounded-full font-medium text-green-600 bg-green-50">+6</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">84/100</p>
              <p className="text-sm text-gray-500">Page speed & optimization</p>
            </div>
          </div>
        </div>

        {/* Footer - NO ANIMATION */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Audit Reports & Monitoring
              </h3>
              <p className="text-gray-600">
                Download detailed audit report or setup automated monitoring
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Download Report
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Setup Monitoring
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 