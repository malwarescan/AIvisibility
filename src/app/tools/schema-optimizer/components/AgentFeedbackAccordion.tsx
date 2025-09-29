import React from 'react';

interface AgentFeedback {
  agent: string;
  valuableFields: string[];
  missingFields: string[];
  summary: string;
}

interface AgentFeedbackAccordionProps {
  feedback: AgentFeedback[];
}

const AgentFeedbackAccordion: React.FC<AgentFeedbackAccordionProps> = ({ feedback }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      {feedback.map((agent, idx) => (
        <div key={agent.agent} className="mb-2 border rounded shadow">
          <button
            className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-t focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="font-semibold">{agent.agent}</span>
            <span>{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="p-4 bg-white">
              <div className="mb-2">
                <span className="font-medium">Valuable Fields:</span>
                <ul className="list-disc ml-6 text-green-700">
                  {agent.valuableFields.map((field, i) => (
                    <li key={i}>{field}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-medium">Missing Fields:</span>
                <ul className="list-disc ml-6 text-yellow-700">
                  {agent.missingFields.map((field, i) => (
                    <li key={i}>{field}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium">Summary:</span>
                <p className="mt-1 text-gray-700 whitespace-pre-line">{agent.summary}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AgentFeedbackAccordion; 