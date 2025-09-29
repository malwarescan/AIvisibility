import React from 'react';

interface ConsensusScoreCardProps {
  score: number;
  description?: string;
}

function getScoreColor(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-400';
  if (score >= 50) return 'bg-yellow-100 text-yellow-700 border-yellow-400';
  return 'bg-red-100 text-red-700 border-red-400';
}

const ConsensusScoreCard: React.FC<ConsensusScoreCardProps> = ({ score, description }) => {
  const colorClass = getScoreColor(score);
  return (
    <div className={`w-full max-w-xs mx-auto mt-6 p-6 border-2 rounded-lg shadow flex flex-col items-center ${colorClass}`}>
      <div className="text-5xl font-bold mb-2">{score}</div>
      <div className="text-sm font-medium mb-2">Consensus Score</div>
      {description && <div className="text-xs text-center text-gray-600">{description}</div>}
    </div>
  );
};

export default ConsensusScoreCard; 