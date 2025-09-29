import React from 'react';

interface Recommendation {
  field: string;
  action: 'add' | 'improve' | 'remove';
  reason: string;
  impact: number;
  affectedAgents: string[];
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const actionIcon = (action: string) => {
  if (action === 'add') return <span className="text-blue-500 mr-1">＋</span>;
  if (action === 'improve') return <span className="text-yellow-500 mr-1">▲</span>;
  if (action === 'remove') return <span className="text-red-500 mr-1">✖</span>;
  return null;
};

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Recommended Changes</h3>
      <ul className="space-y-3">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start border-b pb-2 last:border-b-0">
            <div className="mr-3 mt-1">{actionIcon(rec.action)}</div>
            <div className="flex-1">
              <div className="font-mono text-xs mb-1">{rec.field}</div>
              <div className="text-sm mb-1">
                <span className="font-medium capitalize">{rec.action}</span>: {rec.reason}
              </div>
              <div className="text-xs text-gray-500 mb-1">Impact: {rec.impact}</div>
              <div className="text-xs text-gray-600">Affected: {rec.affectedAgents.join(', ')}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList; 