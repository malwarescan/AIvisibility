'use client';

import React from 'react';

interface SchemaInputEditorProps {
  value: string;
  onChange: (val: string) => void;
  onUpload?: (file: File) => void;
  error?: string;
}

const SchemaInputEditor: React.FC<SchemaInputEditorProps> = (props) => {
  const { value, onChange, onUpload, error } = props;
  return React.createElement(
    'div',
    { className: 'w-full max-w-2xl mx-auto p-4 bg-white rounded shadow' },
    React.createElement(
      'label',
      { className: 'block text-sm font-medium mb-2' },
      'Paste or upload your JSON-LD schema'
    ),
    React.createElement('textarea', {
      className: 'w-full h-48 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm font-mono',
      value,
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value),
      placeholder: '{\n  "@context": "https://schema.org", ...\n}',
    }),
    React.createElement(
      'div',
      { className: 'flex items-center mt-2 gap-4' },
      React.createElement('input', {
        type: 'file',
        accept: 'application/json',
        className: 'block',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0] && onUpload) {
            onUpload(event.target.files[0]);
          }
        },
      }),
      error
        ? React.createElement('span', { className: 'text-red-500 text-xs' }, error)
        : null
    )
  );
};

export default SchemaInputEditor; 