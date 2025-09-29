'use client';

import React from 'react';

interface SchemaInputEditorProps {
  value: string;
  onChange: (val: string) => void;
  onUpload?: (file: File) => void;
  error?: string;
}

const SchemaInputEditor: React.FC<SchemaInputEditorProps> = ({ value, onChange, onUpload, error }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <label className="block text-sm font-medium mb-2">Paste or upload your JSON-LD schema</label>
      <textarea
        className="w-full h-48 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm font-mono"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="{\n  \"@context\": \"https://schema.org\", ...\n}"
      />
      <div className="flex items-center mt-2 gap-4">
        <input
          type="file"
          accept="application/json"
          className="block"
          onChange={e => {
            if (e.target.files && e.target.files[0] && onUpload) {
              onUpload(e.target.files[0]);
            }
          }}
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  );
};

export default SchemaInputEditor; 