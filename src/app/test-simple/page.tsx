'use client';

import React from 'react';

export default function TestSimplePage() {
  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Simple Test Page</h1>
      
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Basic Styling Test</h2>
          <p className="text-gray-600">If you see this styled, Tailwind is working.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">State Test</h2>
          <button 
            onClick={() => alert('State management works!')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Click to Test State
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Component Import Test</h2>
          <p className="text-gray-600">This page uses no external components - pure React.</p>
        </div>
      </div>
    </div>
  );
} 