"use client";

import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  description 
}: MetricCardProps) {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  return (
    <AutoAnimatedElement animation="slideUp" className="group">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          {change && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </AutoAnimatedElement>
  );
} 