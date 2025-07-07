import React from 'react';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { MetricCard } from '@/components/ui/MetricCard';

interface Platform {
  id: string;
  name: string;
  score: number;
  change: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  lastUpdate: string;
  trend: 'up' | 'down' | 'stable';
}

interface PlatformGridProps {
  platforms: Platform[];
  title: string;
  showTrends?: boolean;
}

export const PlatformGrid: React.FC<PlatformGridProps> = ({
  platforms,
  title,
  showTrends = true,
}) => {
  return (
    <AutoAnimatedElement animation="slideUp" delay={0.2}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <AutoAnimatedElement
              key={platform.id}
              animation="slideUp"
              delay={0.1 * index}
            >
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <StatusIndicator status={platform.status} label={platform.status} size="sm" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      {platform.score}%
                    </span>
                    {showTrends && (
                      <div className={`flex items-center space-x-1 text-sm ${
                        platform.change > 0 ? 'text-green-600' : 
                        platform.change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <span>{platform.change > 0 ? '+' : ''}{platform.change}%</span>
                        <div className={`w-2 h-2 rounded-full ${
                          platform.trend === 'up' ? 'bg-green-500' :
                          platform.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Updated {platform.lastUpdate}
                  </div>
                </div>
              </div>
            </AutoAnimatedElement>
          ))}
        </div>
      </div>
    </AutoAnimatedElement>
  );
}; 