import React from 'react';

interface AgreementMatrixTableProps {
  fields: string[];
  agents: string[];
  matrix: { [field: string]: string[] }; // field -> array of agents who agree
}

const AgreementMatrixTable: React.FC<AgreementMatrixTableProps> = ({ fields, agents, matrix }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 overflow-x-auto">
      <table className="min-w-full border rounded shadow bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Field</th>
            {agents.map(agent => (
              <th key={agent} className="px-4 py-2 border-b text-center">{agent}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr key={field}>
              <td className="px-4 py-2 border-b font-mono text-xs">{field}</td>
              {agents.map(agent => {
                const agreed = matrix[field]?.includes(agent);
                const cellClass = agreed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700';
                return (
                  <td
                    key={agent}
                    className={`px-4 py-2 border-b text-center ${cellClass}`}
                  >
                    {agreed ? '✔' : '—'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementMatrixTable; 