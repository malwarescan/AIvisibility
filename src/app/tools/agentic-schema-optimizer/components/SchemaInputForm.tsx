interface SchemaInputFormProps {
  query: string;
  setQuery: (query: string) => void;
  competitorUrl: string;
  setCompetitorUrl: (url: string) => void;
  userUrl: string;
  setUserUrl: (url: string) => void;
  onFetchSERP: () => void;
  onExtractSchema: () => void;
}

export default function SchemaInputForm({
  query, setQuery,
  competitorUrl, setCompetitorUrl,
  userUrl, setUserUrl,
  onFetchSERP, onExtractSchema
}: SchemaInputFormProps) {
  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Search query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onFetchSERP} type="button">Fetch SERP</button>
      <input
        className="w-full p-2 border rounded"
        placeholder="Competitor URL"
        value={competitorUrl}
        onChange={e => setCompetitorUrl(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Your URL"
        value={userUrl}
        onChange={e => setUserUrl(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={onExtractSchema} type="button">Extract Schemas</button>
    </div>
  )
} 