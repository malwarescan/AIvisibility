export async function GET() {
  return Response.json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasGoogle: !!process.env.GOOGLE_CUSTOM_SEARCH_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    // Don't expose the actual keys for security
    openAIKeyPrefix: process.env.OPENAI_API_KEY ? 'sk-proj-' : 'NOT_SET',
    googleKeyPrefix: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY ? 'AIza' : 'NOT_SET'
  });
}
