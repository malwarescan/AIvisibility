'use client'

import React, { useState } from 'react';
import { Settings, Plus, Trash2, Sparkles, Eye, EyeOff } from 'lucide-react';

interface ParsedSchema {
  type: string;
  properties: Record<string, any>;
  nested?: ParsedSchema[];
  source: string;
  confidence?: number;
}

interface UserContent {
  title?: string;
  description?: string;
  images?: string[];
  ratings?: number;
  price?: string;
  availability?: string;
  [key: string]: any;
}

interface SchemaGeneratorProps {
  sourceSchemas: ParsedSchema[];
  userContent: UserContent;
  onUserContentChange: (content: UserContent) => void;
  onSchemaGenerated: () => void;
  isLoading: boolean;
}

export function SchemaGenerator({
  sourceSchemas,
  userContent,
  onUserContentChange,
  onSchemaGenerated,
  isLoading
}: SchemaGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'enhancements' | 'preview'>('content');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleContentChange = (field: string, value: any) => {
    onUserContentChange({
      ...userContent,
      [field]: value
    });
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split('\n').map(item => item.trim()).filter(item => item);
    handleContentChange(field, items);
  };

  const getSchemaTypeSuggestions = () => {
    const typeCounts = sourceSchemas.reduce((acc, schema) => {
      acc[schema.type] = (acc[schema.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getCommonProperties = () => {
    const propertyCounts = sourceSchemas.reduce((acc, schema) => {
      Object.keys(schema.properties).forEach(prop => {
        acc[prop] = (acc[prop] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(propertyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      {/* Basic Content */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Basic Content</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={userContent.title || ''}
            onChange={(e) => handleContentChange('title', e.target.value)}
            placeholder="Enter your content title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={userContent.description || ''}
            onChange={(e) => handleContentChange('description', e.target.value)}
            placeholder="Enter a detailed description of your content"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (one per line)
          </label>
          <textarea
            value={Array.isArray(userContent.images) ? userContent.images.join('\n') : ''}
            onChange={(e) => handleArrayChange('images', e.target.value)}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Enhanced Content</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={userContent.ratings || ''}
              onChange={(e) => handleContentChange('ratings', parseFloat(e.target.value) || undefined)}
              placeholder="4.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              value={userContent.price || ''}
              onChange={(e) => handleContentChange('price', e.target.value)}
              placeholder="$99.99"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={userContent.availability || ''}
            onChange={(e) => handleContentChange('availability', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select availability</option>
            <option value="InStock">In Stock</option>
            <option value="OutOfStock">Out of Stock</option>
            <option value="PreOrder">Pre-order</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
      </div>

      {/* Advanced Content */}
      <div className="space-y-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Settings className="h-4 w-4" />
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Fields</span>
        </button>

        {showAdvanced && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={userContent.author || ''}
                onChange={(e) => handleContentChange('author', e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Published
              </label>
              <input
                type="date"
                value={userContent.datePublished || ''}
                onChange={(e) => handleContentChange('datePublished', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={userContent.keywords || ''}
                onChange={(e) => handleContentChange('keywords', e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderEnhancementsTab = () => (
    <div className="space-y-6">
      {/* Schema Type Suggestions */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Recommended Schema Types</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getSchemaTypeSuggestions().map(([type, count]) => (
            <div key={type} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-900">{type}</span>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {count} found
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Properties */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Most Common Properties</h4>
        <div className="space-y-2">
          {getCommonProperties().map(([prop, count]) => (
            <div key={prop} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{prop}</span>
              <span className="text-sm text-gray-500">{count} occurrences</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhancement Suggestions */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
          Enhancement Suggestions
        </h4>
        <div className="space-y-3">
          {!userContent.ratings && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Add ratings:</strong> Including ratings can improve rich snippet eligibility
              </p>
            </div>
          )}
          
          {(!userContent.images || userContent.images.length === 0) && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Add images:</strong> Images enhance visual appeal in search results
              </p>
            </div>
          )}
          
          {!userContent.price && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Add pricing:</strong> Price information can trigger rich snippets
              </p>
            </div>
          )}
          
          {userContent.description && userContent.description.length < 100 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Enhance description:</strong> Longer descriptions (150+ characters) perform better
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Content Preview</h4>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-3">
          {userContent.title && (
            <div>
              <span className="text-sm font-medium text-gray-500">Title:</span>
              <p className="text-gray-900">{userContent.title}</p>
            </div>
          )}
          
          {userContent.description && (
            <div>
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="text-gray-900">{userContent.description}</p>
            </div>
          )}
          
          {userContent.ratings && (
            <div>
              <span className="text-sm font-medium text-gray-500">Rating:</span>
              <p className="text-gray-900">{userContent.ratings}/5</p>
            </div>
          )}
          
          {userContent.price && (
            <div>
              <span className="text-sm font-medium text-gray-500">Price:</span>
              <p className="text-gray-900">{userContent.price}</p>
            </div>
          )}
          
          {userContent.images && userContent.images.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-500">Images:</span>
              <p className="text-gray-900">{userContent.images.length} image(s)</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h5 className="font-medium text-blue-900 mb-2">Ready to Generate</h5>
        <p className="text-sm text-blue-800">
          Your content is ready for schema generation. The system will analyze {sourceSchemas.length} source schemas 
          and create an optimized JSON-LD structure based on the winning patterns.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'content', label: 'Content Input', icon: Plus },
            { id: 'enhancements', label: 'Enhancements', icon: Sparkles },
            { id: 'preview', label: 'Preview', icon: Eye }
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
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'enhancements' && renderEnhancementsTab()}
        {activeTab === 'preview' && renderPreviewTab()}
      </div>

      {/* Generate Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {sourceSchemas.length} source schemas analyzed
        </div>
        
        <button
          onClick={onSchemaGenerated}
          disabled={isLoading || !userContent.title || !userContent.description}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isLoading ? 'Generating...' : 'Generate Optimized Schema'}</span>
        </button>
      </div>
    </div>
  );
} 