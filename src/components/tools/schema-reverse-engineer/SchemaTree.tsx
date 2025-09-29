'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, Tag } from 'lucide-react';
import { ParsedSchema, SchemaNode } from '@/types/schema-reverse-engineer';

interface SchemaTreeProps {
  schemas: ParsedSchema[];
  onNodeSelect: (node: SchemaNode) => void;
  expandedNodes?: string[];
}

export default function SchemaTree({ schemas, onNodeSelect, expandedNodes = [] }: SchemaTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(expandedNodes));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpanded(newExpanded);
  };

  const convertSchemaToNode = (schema: ParsedSchema, path = ''): SchemaNode => {
    const nodeId = `${path}.${schema.type}`;
    const node: SchemaNode = {
      id: nodeId,
      type: schema.type,
      properties: schema.properties,
      path: nodeId,
      children: schema.nested?.map((nested, index) => 
        convertSchemaToNode(nested, `${nodeId}.${index}`)
      ),
      isExpanded: expanded.has(nodeId)
    };
    return node;
  };

  const renderPropertyValue = (value: any): string => {
    if (typeof value === 'string') {
      return value.length > 50 ? `${value.substring(0, 50)}...` : value;
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    if (typeof value === 'boolean') {
      return value.toString();
    }
    if (Array.isArray(value)) {
      return `[${value.length} items]`;
    }
    if (typeof value === 'object' && value !== null) {
      return '{...}';
    }
    return String(value);
  };

  const renderNode = (node: SchemaNode, depth = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const propertyCount = Object.keys(node.properties).length;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer ${
            depth > 0 ? 'ml-' + (depth * 4) : ''
          }`}
          onClick={() => onNodeSelect(node)}
        >
          <div className="flex items-center gap-1">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            
            {hasChildren ? (
              <Folder className="w-4 h-4 text-blue-500" />
            ) : (
              <FileText className="w-4 h-4 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{node.type}</span>
              <span className="text-xs text-gray-500">({propertyCount} props)</span>
            </div>
          </div>
        </div>

        {/* Properties Preview */}
        {isExpanded && propertyCount > 0 && (
          <div className="ml-6 mb-2">
            <div className="text-xs text-gray-500 mb-1">Properties:</div>
            <div className="space-y-1">
              {Object.entries(node.properties).slice(0, 5).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 font-medium">{key}:</span>
                  <span className="text-gray-500 truncate">
                    {renderPropertyValue(value)}
                  </span>
                </div>
              ))}
              {propertyCount > 5 && (
                <div className="text-xs text-gray-400">
                  +{propertyCount - 5} more properties
                </div>
              )}
            </div>
          </div>
        )}

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="ml-4">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const schemaNodes = schemas.map((schema, index) => 
    convertSchemaToNode(schema, `schema-${index}`)
  );

  if (schemas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">No schemas found</p>
        <p className="text-sm">Analyze a URL to see its schema structure</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="space-y-1">
        {schemaNodes.map((node) => renderNode(node))}
      </div>
    </div>
  );
} 