'use client';

import React from 'react';

export default function AiOverviewGuidePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          AI Overview Schema Reverse Engineering Guide
        </h1>
        <p className="text-gray-600 mb-4">
          Step-by-step workflow to analyze, extract, and optimize schema markup for AI Overviews and rich results.
        </p>
        <ol className="list-decimal pl-6 space-y-6 text-gray-800">
          <li>
            <strong>Define and Input Your Target Search Query</strong>
            <p className="mt-2 text-gray-600">Begin with a clear, high-intent search phrase relevant to your business or content goals. Examples:</p>
            <ul className="list-disc pl-6 mt-1 text-sm text-gray-700">
              <li>"transfer domain to cheaper registrar"</li>
              <li>"how to transfer domain with no downtime"</li>
              <li>"domain transfer step-by-step guide"</li>
            </ul>
          </li>
          <li>
            <strong>Identify the AI Overview Source</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Search your target phrase in Google.</li>
              <li>Look for the AI Overview box at the top of the results, rich cards, FAQs, instructional lists, or summary-style answers.</li>
              <li>Copy the URL(s) of the website(s) featured in the AI Overview.</li>
            </ul>
          </li>
          <li>
            <strong>Extract and Analyze Schema Markup</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Use online tools like <a href="https://validator.schema.org" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Schema Markup Validator</a> or <a href="https://technicalseo.com/tools/schema-markup-generator/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">TechnicalSEO Schema Markup Generator</a>.</li>
              <li>Or manually extract by viewing page source and searching for <code>&lt;script type="application/ld+json"&gt;</code>.</li>
              <li>Schema types to look for: <span className="font-mono">FAQPage</span>, <span className="font-mono">HowTo</span>, <span className="font-mono">WebPage</span>, <span className="font-mono">Organization</span>, <span className="font-mono">Product</span>, <span className="font-mono">BreadcrumbList</span>.</li>
            </ul>
          </li>
          <li>
            <strong>Study the Winning Schema</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Document the <span className="font-mono">@type</span> (e.g., FAQPage, HowTo).</li>
              <li>Note key properties used (e.g., <span className="font-mono">name</span>, <span className="font-mono">step</span>, <span className="font-mono">acceptedAnswer</span>).</li>
              <li>Look for rich elements (e.g., <span className="font-mono">image</span>, <span className="font-mono">url</span>, <span className="font-mono">aggregateRating</span>, <span className="font-mono">author</span>).</li>
              <li>Check for nested schemas (e.g., FAQPage containing HowTo steps).</li>
            </ul>
          </li>
          <li>
            <strong>Replicate and Enhance Schema for Your Site</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Replicate the structure and types used by the winning page.</li>
              <li>Enhance by adding additional schema types and properties where relevant (e.g., combine FAQPage with HowTo, BreadcrumbList, Organization, and WebPage schemas).</li>
              <li>Include images, author info, ratings, and other rich data.</li>
              <li>Ensure your schema accurately reflects your page content.</li>
            </ul>
          </li>
          <li>
            <strong>Implement Schema on Your Page</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Insert your <code>&lt;script type="application/ld+json"&gt;</code> block in the <code>&lt;head&gt;</code> or just before <code>&lt;/body&gt;</code>.</li>
              <li>Validate your schema using Google’s Rich Results Test or Schema Markup Validator.</li>
              <li>Confirm that the schema matches the visible content on your page.</li>
            </ul>
          </li>
          <li>
            <strong>Request Re-Indexing and Test Visibility</strong>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Use Google Search Console: Go to URL Inspection and request indexing for your updated page.</li>
              <li>Optionally, use AI visibility tools to check if your content is being surfaced in AI Overviews.</li>
            </ul>
          </li>
        </ol>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Example Workflow Algorithm</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-800">
            <li>User enters target search query.</li>
            <li>Query Google, identify AI Overview and source URL(s).</li>
            <li>Extract JSON-LD schema from the source page.</li>
            <li>Analyze schema types, properties, and structure.</li>
            <li>Build optimized schema for your page, combining and enhancing relevant types.</li>
            <li>Validate schema and ensure it matches on-page content.</li>
            <li>Deploy schema, request re-indexing.</li>
            <li>Monitor AI Overview appearances and iterate as needed.</li>
          </ol>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Handling and Automation Tips</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Automate extraction with scripts or browser automation to fetch and parse JSON-LD from target URLs.</li>
            <li>Store and compare extracted schemas to identify patterns among top-performing pages.</li>
            <li>Regularly re-run the process for evolving queries and competitors.</li>
            <li>Integrate with your CMS to streamline schema updates and validation.</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready for a Real Example?</h2>
          <p className="text-gray-700">If you provide a specific target query and a URL currently shown in an AI Overview, you’ll receive a reverse-engineered, ready-to-use JSON-LD schema tailored for your site.</p>
        </div>
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-sm">
            By following this process, you can systematically analyze, replicate, and optimize schema markup to maximize your chances of winning AI Overview spots and increasing your site’s visibility in search.
          </p>
        </div>
      </div>
    </div>
  );
} 