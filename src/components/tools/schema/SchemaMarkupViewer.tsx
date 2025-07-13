import React from 'react';
import { StructuredDataMarkup, OpenGraphMarkup, TwitterCardMarkup } from '@/types/schema';

interface SchemaMarkupViewerProps {
  structuredData: StructuredDataMarkup[];
  openGraph: OpenGraphMarkup[];
  twitterCards: TwitterCardMarkup[];
}

export const SchemaMarkupViewer: React.FC<SchemaMarkupViewerProps> = ({
  structuredData,
  openGraph,
  twitterCards
}) => {
  const formatJSON = (json: any) => {
    try {
      return JSON.stringify(json, null, 2);
    } catch {
      return 'Invalid JSON';
    }
  };

  return (
    <div className="space-y-6">
      {/* Structured Data */}
      {structuredData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Structured Data ({structuredData.length})
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {structuredData.map((data, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">
                        {data.schemaType}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.type === 'json-ld' ? 'bg-blue-100 text-blue-700' :
                        data.type === 'microdata' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {data.type}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.aiOptimized ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {data.aiOptimized ? 'AI Optimized' : 'Needs Optimization'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    {formatJSON(data.properties)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Open Graph */}
      {openGraph.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Open Graph ({openGraph.length})
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {openGraph.map((og, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Open Graph</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      og.aiOptimized ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {og.aiOptimized ? 'AI Optimized' : 'Needs Optimization'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {og.title && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Title</div>
                        <div className="text-sm text-gray-900">{og.title}</div>
                      </div>
                    )}
                    {og.description && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Description</div>
                        <div className="text-sm text-gray-900">{og.description}</div>
                      </div>
                    )}
                    {og.image && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Image</div>
                        <div className="text-sm text-blue-600 break-all">{og.image}</div>
                      </div>
                    )}
                    {og.type && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Type</div>
                        <div className="text-sm text-gray-900">{og.type}</div>
                      </div>
                    )}
                    {og.siteName && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Site Name</div>
                        <div className="text-sm text-gray-900">{og.siteName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Twitter Cards */}
      {twitterCards.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Twitter Cards ({twitterCards.length})
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {twitterCards.map((twitter, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Twitter Card</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      twitter.aiOptimized ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {twitter.aiOptimized ? 'AI Optimized' : 'Needs Optimization'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {twitter.title && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Title</div>
                        <div className="text-sm text-gray-900">{twitter.title}</div>
                      </div>
                    )}
                    {twitter.description && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Description</div>
                        <div className="text-sm text-gray-900">{twitter.description}</div>
                      </div>
                    )}
                    {twitter.image && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Image</div>
                        <div className="text-sm text-blue-600 break-all">{twitter.image}</div>
                      </div>
                    )}
                    {twitter.card && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Card Type</div>
                        <div className="text-sm text-gray-900">{twitter.card}</div>
                      </div>
                    )}
                    {twitter.creator && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Creator</div>
                        <div className="text-sm text-gray-900">{twitter.creator}</div>
                      </div>
                    )}
                    {twitter.site && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Site</div>
                        <div className="text-sm text-gray-900">{twitter.site}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Schema Found */}
      {structuredData.length === 0 && openGraph.length === 0 && twitterCards.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Schema Markup Found
          </h3>
          <p className="text-gray-600">
            No structured data, Open Graph, or Twitter Card markup was detected on this page.
          </p>
        </div>
      )}
    </div>
  );
}; 