import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface LineConfig {
  dataKey: string;
  stroke: string;
  name: string;
  strokeWidth?: number;
}

interface DashboardChartProps {
  data: any[];
  lines: LineConfig[];
  height?: number;
  type?: 'line' | 'area';
  showGrid?: boolean;
  showTooltip?: boolean;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  data,
  lines,
  height = 300,
  type = 'line',
  showGrid = true,
  showTooltip = true,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        )}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        
        {lines.map((line, index) => {
          if (type === 'area') {
            return (
              <Area
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                fill={line.stroke}
                fillOpacity={0.1}
                strokeWidth={line.strokeWidth || 2}
              />
            );
          } else {
            return (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth || 2}
                dot={{ fill: line.stroke, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: line.stroke }}
              />
            );
          }
        })}
      </ChartComponent>
    </ResponsiveContainer>
  );
}; 