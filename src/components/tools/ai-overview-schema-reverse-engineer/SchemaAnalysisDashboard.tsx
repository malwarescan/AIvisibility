'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Database, BarChart3, Zap, Star, Image, DollarSign } from 'lucide-react';

interface ParsedSchema {
  type: string;
  properties: Record<string, any>;
  nested?: ParsedSchema[];
  source: string;
  confidence?: number;
}

interface URLData {
  id: string;
  url: string;
  query: string;
  status: 'pending' | 'analyzing' | 'success' | 'error';
  schemas?: ParsedSchema[];
  error?: string;
  analyzedAt?: Date;
}

interface SchemaAnalysis {
  totalSchemas: number;
  schemaTypes: string[];
  commonProperties: string[];
  richElements: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

interface SchemaAnalysisDashboardProps {
  analysis: SchemaAnalysis;
  urls: URLData[];
  onNodeSelect: (node: string) => void;
  selectedNode: string | null;
}

interface SchemaTreeNode {
  id: string;
  type: string;
  properties: Record<string, any>;
  children: SchemaTreeNode[];
  source: string;
  level: number;
}

export function SchemaAnalysisDashboard({ 
  analysis, 
  urls, 
  onNodeSelect, 
  selectedNode 
}: SchemaAnalysisDashboardProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'tree' | 'properties' | 'comparison'>('tree');

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const buildSchemaTree = (): SchemaTreeNode[] => {
    const tree: SchemaTreeNode[] = [];
    let nodeId = 0;

    urls.forEach((url, urlIndex) => {
      if (url.schemas) {
        const urlNode: SchemaTreeNode = {
          id: `url-${urlIndex}`,
          type: 'URL',
          properties: { url: url.url, domain: new URL(url.url).hostname },
          children: [],
          source: url.url,
          level: 0
        };

        url.schemas.forEach((schema, schemaIndex) => {
          const schemaNode: SchemaTreeNode = {
            id: `schema-${urlIndex}-${schemaIndex}`,
            type: schema.type,
            properties: schema.properties,
            children: [],
            source: url.url,
            level: 1
          };

          // Add nested schemas as children
          if (schema.nested) {
            schema.nested.forEach((nested, nestedIndex) => {
              const nestedNode: SchemaTreeNode = {
                id: `nested-${urlIndex}-${schemaIndex}-${nestedIndex}`,
                type: nested.type,
                properties: nested.properties,
                children: [],
                source: url.url,
                level: 2
              };
              schemaNode.children.push(nestedNode);
            });
          }

          urlNode.children.push(schemaNode);
        });

        tree.push(urlNode);
      }
    });

    return tree;
  };

  const renderTreeNode = (node: SchemaTreeNode) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const isSelected = selectedNode === node.id;

    const getIcon = () => {
      if (node.type === 'URL') return <Database className="h-4 w-4 text-blue-500" />;
      if (node.type.includes('Product')) return <DollarSign className="h-4 w-4 text-green-500" />;
      if (node.type.includes('Review') || node.type.includes('Rating')) return <Star className="h-4 w-4 text-yellow-500" />;
      if (node.type.includes('Image')) return <Image className="h-4 w-4 text-purple-500" />;
      return <FileText className="h-4 w-4 text-gray-500" />;
    };

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`
            flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors
            ${isSelected ? 'bg-blue-100 border border-blue-200' : 'hover:bg-gray-50'}
          `}
          onClick={() => onNodeSelect(node.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-500" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-500" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          {getIcon()}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 truncate">
                {node.type}
              </span>
              {node.type !== 'URL' && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {Object.keys(node.properties).length} props
                </span>
              )}
            </div>
            {node.type === 'URL' && (
              <p className="text-sm text-gray-500 truncate">
                {node.properties.domain}
              </p>
            )}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-6 space-y-1">
            {node.children.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  const renderPropertiesPanel = () => {
    const allSchemas = urls
      .filter(url => url.status === 'success' && url.schemas)
      .flatMap(url => url.schemas!);

    const propertyStats = allSchemas.reduce((acc, schema) => {
      Object.keys(schema.properties).forEach(prop => {
        acc[prop] = (acc[prop] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const sortedProperties = Object.entries(propertyStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20);

    const richElementProperties = analysis.richElements;

    return (
      <div className="space-y-6">
        {/* Schema Type Breakdown */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Schema Types Found</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {analysis.schemaTypes.map(type => (
              <div key={type} className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-900">{type}</div>
                <div className="text-sm text-gray-500">
                  {allSchemas.filter(s => s.type === type).length} instances
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Properties */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Most Common Properties</h4>
          <div className="space-y-2">
            {sortedProperties.map(([prop, count]) => (
              <div key={prop} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{prop}</span>
                <span className="text-sm text-gray-500">{count} occurrences</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rich Elements */}
        {richElementProperties.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              Rich Elements Detected
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {richElementProperties.map(prop => (
                <div key={prop} className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <span className="text-sm font-medium text-yellow-800">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderComparisonView = () => {
    const successfulUrls = urls.filter(url => url.status === 'success' && url.schemas);
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Schema Comparison</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {successfulUrls.map((url, index) => (
            <div key={url.id} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">
                {new URL(url.url).hostname}
              </h5>
              <div className="space-y-2">
                {url.schemas!.map((schema, schemaIndex) => (
                  <div key={schemaIndex} className="bg-gray-50 p-2 rounded">
                    <div className="font-medium text-sm">{schema.type}</div>
                    <div className="text-xs text-gray-500">
                      {Object.keys(schema.properties).length} properties
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const schemaTree = buildSchemaTree();

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-blue-900">Total Schemas</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-2">{analysis.totalSchemas}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-500" />
            <span className="font-medium text-green-900">Schema Types</span>
          </div>
          <div className="text-2xl font-bold text-green-900 mt-2">{analysis.schemaTypes.length}</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span className="font-medium text-purple-900">Rich Elements</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 mt-2">{analysis.richElements.length}</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-orange-900">Complexity</span>
          </div>
          <div className="text-lg font-bold text-orange-900 mt-2 capitalize">{analysis.complexity}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'tree', label: 'Schema Tree', icon: FileText },
            { id: 'properties', label: 'Properties Analysis', icon: BarChart3 },
            { id: 'comparison', label: 'URL Comparison', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'tree' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Schema Hierarchy</h4>
            <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
              {schemaTree.length > 0 ? (
                <div className="space-y-1">
                  {schemaTree.map(node => renderTreeNode(node))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No schemas found. Analyze URLs to see schema hierarchy.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'properties' && renderPropertiesPanel()}

        {activeTab === 'comparison' && renderComparisonView()}
      </div>
    </div>
  );
} 