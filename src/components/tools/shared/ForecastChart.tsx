import React from 'react';
import { DashboardChart } from '@/components/ui/DashboardChart';

interface ForecastChartProps {
  data: any[];
  showConfidence?: boolean;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  data,
  showConfidence = true,
}) => {
  const lines = [
    { dataKey: 'chatgpt', stroke: '#3B82F6', name: 'ChatGPT' },
    { dataKey: 'claude', stroke: '#10B981', name: 'Claude' },
    { dataKey: 'perplexity', stroke: '#8B5CF6', name: 'Perplexity' },
    { dataKey: 'gemini', stroke: '#F59E0B', name: 'Google Gemini' },
  ];

  if (showConfidence) {
    lines.push({ dataKey: 'confidence', stroke: '#EF4444', name: 'Confidence' });
  }

  return (
    <DashboardChart
      data={data}
      lines={lines}
      height={350}
      type="area"
    />
  );
}; 