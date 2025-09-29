'use client';

import * as React from 'react';

type SchemaInputEditorProps = {
  value: string;
  onChange: (v: string) => void;
  onUpload?: (file: File) => void;
  error?: string;
};

export default function SchemaInputEditor({
  value,
  onChange,
  onUpload,
  error,
}: SchemaInputEditorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <label className="block text-sm font-medium mb-2">
        Paste or upload your JSON-LD schema
      </label>

      <textarea
        className="w-full h-48 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm font-mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='{"@context":"https://schema.org",...}'
        spellCheck={false}
      />

      <div className="mt-3">
        <input
          type="file"
          accept=".json,.txt,.ldjson,.jsonld"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && onUpload) onUpload(f);
          }}
        />
      </div>

      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
} 