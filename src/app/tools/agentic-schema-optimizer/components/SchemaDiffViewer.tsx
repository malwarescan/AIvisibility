export default function SchemaDiffViewer({ competitorSchema, userSchema, diff, mergedSchema }: any) {
  return (
    <div className="bg-white rounded-xl p-4 border space-y-6">
      <h2 className="text-xl font-bold mb-2">Schema Diff & Merge</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-1">Competitor Schema</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(competitorSchema, null, 2)}</pre>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Your Schema</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(userSchema, null, 2)}</pre>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Diff Object</h3>
        <pre className="bg-yellow-50 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(diff, null, 2)}</pre>
      </div>
      <div>
        <h3 className="font-semibold mb-1 text-green-700">Merged Optimized Schema</h3>
        <pre className="bg-green-50 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(mergedSchema, null, 2)}</pre>
      </div>
    </div>
  )
} 