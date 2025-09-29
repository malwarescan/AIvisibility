import { validateSchema } from '@/lib/validateSchema'

interface OptimizedSchemaOutputProps {
  schema: Record<string, unknown>;
  onCopy: () => void;
  onValidate: () => void;
  onDownload: () => void;
}

export default function OptimizedSchemaOutput({ schema, onCopy, onValidate, onDownload }: OptimizedSchemaOutputProps) {
  const result = validateSchema(schema)

  return (
    <div className="bg-white rounded-xl p-4 border">
      <h2 className="text-xl font-bold mb-2">Optimized JSON-LD</h2>

      {result.valid ? (
        <div className="text-green-700 text-sm mb-2">✓ Schema is valid</div>
      ) : (
        <div className="text-red-700 text-sm mb-2">
          ✗ Invalid schema:
          <ul className="list-disc pl-4 text-xs mt-1">
            {result.errors?.map((e, i) => <li key={i}>{e.message}</li>)}
          </ul>
        </div>
      )}

      <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
        {JSON.stringify(schema, null, 2)}
      </pre>

      <div className="flex gap-2 mt-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onCopy}>Copy</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={onValidate}>Validate</button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={onDownload}>Download</button>
      </div>
    </div>
  )
} 