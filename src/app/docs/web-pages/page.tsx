'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DocumentationPage() {
  const searchParams = useSearchParams();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const page = searchParams.get('page') || 'index.html';
    const fetchDocumentation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/docs/route?page=${page}`);
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.status}`);
        }
        const content = await response.text();
        setHtmlContent(content);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documentation');
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentation();
  }, [searchParams]);

  // Apple-style immersive hero/header
  const Hero = () => (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-8 mt-8 max-w-4xl mx-auto shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Explore detailed guides, API references, and best practices for maximizing your AI search performance. Designed for clarity, flow, and immersion.
          </p>
        </div>
        <div className="flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full shadow-xl">
          <span className="text-white text-4xl font-bold select-none"></span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Hero />
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Loading Documentation...</h2>
          <p className="text-gray-600 text-center">Please wait while we load the documentation.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Hero />
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Documentation Error</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <a 
            href="/tools" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Hero />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="prose max-w-none prose-blue prose-lg" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
} 