import SchemaInputForm from './components/SchemaInputForm'
import SchemaDiffViewer from './components/SchemaDiffViewer'
import OptimizedSchemaOutput from './components/OptimizedSchemaOutput'
import { useState } from 'react'

export default function AgenticSchemaOptimizer() {
  const [query, setQuery] = useState('')
  const [competitorUrl, setCompetitorUrl] = useState('')
  const [userUrl, setUserUrl] = useState('')
  const [competitorSchema, setCompetitorSchema] = useState(null)
  const [userSchema, setUserSchema] = useState(null)
  const [diff, setDiff] = useState(null)
  const [mergedSchema, setMergedSchema] = useState(null)

  const handleFetchSERP = async () => {
    const res = await fetch('/api/tools/agentic-schema-optimizer/fetchSERP', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data?.results?.length > 0) {
      setCompetitorUrl(data.results[0]) // Auto-select first
    }
  }

  const handleExtractSchemas = async () => {
    const [competitorRes, userRes] = await Promise.all([
      fetch('/api/tools/agentic-schema-optimizer/extractSchema', {
        method: 'POST',
        body: JSON.stringify({ url: competitorUrl }),
        headers: { 'Content-Type': 'application/json' },
      }),
      fetch('/api/tools/agentic-schema-optimizer/extractSchema', {
        method: 'POST',
        body: JSON.stringify({ url: userUrl }),
        headers: { 'Content-Type': 'application/json' },
      }),
    ])
    const competitor = await competitorRes.json()
    const user = await userRes.json()

    setCompetitorSchema(competitor.schema)
    setUserSchema(user.schema)

    const optimizeRes = await fetch('/api/tools/agentic-schema-optimizer/optimizeSchema', {
      method: 'POST',
      body: JSON.stringify({
        userSchema: user.schema,
        competitorSchema: competitor.schema,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const { mergedSchema, diff } = await optimizeRes.json()
    setDiff(diff)
    setMergedSchema(mergedSchema)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(mergedSchema, null, 2))
  }

  const handleValidate = () => {
    // Optionally integrate schema validator
    alert('Schema validation coming soon.')
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(mergedSchema, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'optimized-schema.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Agentic Schema Strategist</h1>
      <SchemaInputForm
        query={query}
        setQuery={setQuery}
        competitorUrl={competitorUrl}
        setCompetitorUrl={setCompetitorUrl}
        userUrl={userUrl}
        setUserUrl={setUserUrl}
        onFetchSERP={handleFetchSERP}
        onExtractSchema={handleExtractSchemas}
      />
      {competitorSchema && userSchema && (
        <SchemaDiffViewer
          competitorSchema={competitorSchema}
          userSchema={userSchema}
          diff={diff}
          mergedSchema={mergedSchema}
        />
      )}
      {mergedSchema && (
        <OptimizedSchemaOutput
          schema={mergedSchema}
          onCopy={handleCopy}
          onValidate={handleValidate}
          onDownload={handleDownload}
        />
      )}
    </div>
  )
} 