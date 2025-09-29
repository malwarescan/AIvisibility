'use client';

import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '@/components/tools/shared/MetricsOverview';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';

interface WebhookDestination {
  id: string;
  name: string;
  type: 'wordpress' | 'zapier' | 'make' | 'langchain' | 'custom';
  url: string;
  apiKey?: string;
  headers?: Record<string, string>;
  isActive: boolean;
  lastUsed?: string;
  successCount: number;
  errorCount: number;
}

interface ConnectData {
  activeConnections: number;
  responseTime: number;
  successRate: number;
  platformBreakdown: Array<{
    platform: string;
    connections: number;
    responseTime: number;
    status: 'active' | 'inactive' | 'error';
  }>;
  recentActivity: Array<{
    timestamp: string;
    action: string;
    platform: string;
    status: 'success' | 'error' | 'pending';
  }>;
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral';
    message: string;
    impact: string;
  }>;
}

export default function ConnectPage() {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [connectData, setConnectData] = useState<ConnectData | null>(null);
  const [exporting, setExporting] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('langchain');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Webhook destination management
  const [destinations, setDestinations] = useState<WebhookDestination[]>([]);
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState<WebhookDestination | null>(null);
  const [newDestination, setNewDestination] = useState<Partial<WebhookDestination>>({
    name: '',
    type: 'custom',
    url: '',
    apiKey: '',
    isActive: true,
    successCount: 0,
    errorCount: 0,
  });
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);
  const [deployingToDestination, setDeployingToDestination] = useState<string | null>(null);

  // Load destinations from localStorage on component mount
  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = () => {
    try {
      const stored = localStorage.getItem('agentic-api-destinations');
      if (stored) {
        setDestinations(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load destinations:', error);
    }
  };

  const saveDestination = async (destination: WebhookDestination) => {
    try {
      const response = await fetch('/api/agentic-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save-destination',
          data: destination,
        }),
      });

      if (response.ok) {
        loadDestinations();
        setShowDestinationForm(false);
        setEditingDestination(null);
        setNewDestination({
          name: '',
          type: 'custom',
          url: '',
          apiKey: '',
          isActive: true,
          successCount: 0,
          errorCount: 0,
        });
      }
    } catch (error) {
      console.error('Failed to save destination:', error);
    }
  };

  const deleteDestination = async (destinationId: string) => {
    try {
      const response = await fetch('/api/agentic-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete-destination',
          destinationId,
        }),
      });

      if (response.ok) {
        loadDestinations();
      }
    } catch (error) {
      console.error('Failed to delete destination:', error);
    }
  };

  const testWebhook = async (destination: WebhookDestination) => {
    setTestingWebhook(destination.id);
    try {
      const response = await fetch('/api/agentic-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test-webhook',
          data: destination,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Webhook test successful!');
      } else {
        alert(`Webhook test failed: ${result.error}`);
      }
    } catch (error) {
      alert('Webhook test failed');
    } finally {
      setTestingWebhook(null);
    }
  };

  const deployToDestination = async (destinationId: string) => {
    setDeployingToDestination(destinationId);
    try {
      // Mock schema data - in real app, this would come from schema optimizer
      const mockSchemaData = {
        url: 'https://example.com',
        schema: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Sample Article",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          }
        },
        schemaType: 'Article',
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/agentic-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deploy-schema',
          data: mockSchemaData,
          destinationId,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(`Schema deployed to ${result.destination}!`);
        loadDestinations(); // Refresh to update stats
      } else {
        alert(`Deployment failed: ${result.error}`);
      }
    } catch (error) {
      alert('Deployment failed');
    } finally {
      setDeployingToDestination(null);
    }
  };

  const handleSaveDestination = () => {
    if (!newDestination.name || !newDestination.url) {
      alert('Please fill in all required fields');
      return;
    }

    const destination: WebhookDestination = {
      id: editingDestination?.id || `dest_${Date.now()}`,
      name: newDestination.name,
      type: newDestination.type as any,
      url: newDestination.url,
      apiKey: newDestination.apiKey,
      headers: newDestination.headers,
      isActive: newDestination.isActive || true,
      successCount: editingDestination?.successCount || 0,
      errorCount: editingDestination?.errorCount || 0,
      lastUsed: editingDestination?.lastUsed,
    };

    saveDestination(destination);
  };

  const editDestination = (destination: WebhookDestination) => {
    setEditingDestination(destination);
    setNewDestination({
      name: destination.name,
      type: destination.type,
      url: destination.url,
      apiKey: destination.apiKey,
      headers: destination.headers,
      isActive: destination.isActive,
      successCount: destination.successCount,
      errorCount: destination.errorCount,
    });
    setShowDestinationForm(true);
  };

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): ConnectData => {
      return {
        activeConnections: Math.round(150 + Math.random() * 50),
        responseTime: Math.round(200 + Math.random() * 100),
        successRate: Math.round(95 + Math.random() * 5),
        platformBreakdown: [
          { platform: 'ChatGPT', connections: 45 + Math.random() * 20, responseTime: 180 + Math.random() * 50, status: 'active' as const },
          { platform: 'Claude', connections: 35 + Math.random() * 15, responseTime: 220 + Math.random() * 60, status: 'active' as const },
          { platform: 'Perplexity', connections: 25 + Math.random() * 10, responseTime: 250 + Math.random() * 70, status: 'active' as const },
          { platform: 'Google AI', connections: 20 + Math.random() * 8, responseTime: 300 + Math.random() * 80, status: 'active' as const },
        ],
        recentActivity: Array.from({ length: 5 }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 60000).toLocaleTimeString(),
          action: ['Data Sync', 'API Call', 'Webhook', 'Status Check', 'Update'][Math.floor(Math.random() * 5)],
          platform: ['ChatGPT', 'Claude', 'Perplexity', 'Google AI'][Math.floor(Math.random() * 4)],
          status: ['success', 'error', 'pending'][Math.floor(Math.random() * 3)] as 'success' | 'error' | 'pending',
        })),
        insights: [
          { type: 'positive' as const, message: 'ChatGPT connection stability improved', impact: 'High' },
          { type: 'positive' as const, message: 'API response times optimized', impact: 'Medium' },
          { type: 'neutral' as const, message: 'Google AI integration stable', impact: 'Low' },
        ],
      };
    };

    setIsLoading(true);
    const timer = setTimeout(() => {
      setConnectData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(connectData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `connect-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 2000);
  };

  const connectMetrics = connectData ? [
    {
      title: 'Active Connections',
      value: connectData.activeConnections.toString(),
      change: `+${Math.round(Math.random() * 10)}`,
      changeType: 'positive' as const,
      description: 'Real-time API connections',
    },
    {
      title: 'Response Time',
      value: `${connectData.responseTime}ms`,
      change: `-${Math.round(Math.random() * 20)}ms`,
      changeType: 'positive' as const,
      description: 'Average API response',
    },
    {
      title: 'Success Rate',
      value: `${connectData.successRate}%`,
      change: `+${Math.round(Math.random() * 3)}%`,
      changeType: 'positive' as const,
      description: 'API call success rate',
    },
    {
      title: 'Webhook Destinations',
      value: destinations.length.toString(),
      change: `+${Math.round(Math.random() * 2)}`,
      changeType: 'positive' as const,
      description: 'Configured destinations',
    },
  ] : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-gray-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDestinationIcon = (type: string) => {
    switch (type) {
      case 'wordpress': return 'W';
      case 'zapier': return 'Z';
      case 'make': return 'M';
      case 'langchain': return 'L';
      default: return 'C';
    }
  };

  const getDestinationColor = (type: string) => {
    switch (type) {
      case 'wordpress': return 'bg-blue-500';
      case 'zapier': return 'bg-orange-500';
      case 'make': return 'bg-purple-500';
      case 'langchain': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <AutoAnimatedElement animation="slideUp">
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Agentic API
              </h1>
              <p className="text-gray-600">
                Connect schema data to WordPress, Zapier, Make, or LangChain. Auto-post schema to CMS and export JSON-LD to any endpoint
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Live Data</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🔗</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Agentic API Integration
                </h2>
                <p className="text-gray-600">
                  Pipe winning competitor schema into your own site instantly. Configure multiple webhook destinations
                </p>
              </div>
            </div>
          </div>

          {/* Webhook Destinations Management */}
          <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Destinations</h3>
              <button
                onClick={() => setShowDestinationForm(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add Destination
              </button>
            </div>

            {destinations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No webhook destinations configured</p>
                <p className="text-sm mt-2">Add your first destination to start deploying schema</p>
              </div>
            ) : (
              <div className="space-y-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${getDestinationColor(destination.type)} rounded-full flex items-center justify-center text-white font-semibold`}>
                        {getDestinationIcon(destination.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{destination.name}</h4>
                        <p className="text-sm text-gray-600">{destination.url}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${destination.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {destination.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-gray-500">
                            Success: {destination.successCount} | Errors: {destination.errorCount}
                          </span>
                          {destination.lastUsed && (
                            <span className="text-xs text-gray-500">
                              Last used: {new Date(destination.lastUsed).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => deployToDestination(destination.id)}
                        disabled={deployingToDestination === destination.id || !destination.isActive}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {deployingToDestination === destination.id ? 'Deploying...' : 'Send to CMS'}
                      </button>
                      <button
                        onClick={() => testWebhook(destination)}
                        disabled={testingWebhook === destination.id}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {testingWebhook === destination.id ? 'Testing...' : 'Test'}
                      </button>
                      <button
                        onClick={() => editDestination(destination)}
                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDestination(destination.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Destination Configuration Form */}
          {showDestinationForm && (
            <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingDestination ? 'Edit Destination' : 'Add New Destination'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination Name</label>
                  <input
                    type="text"
                    value={newDestination.name}
                    onChange={(e) => setNewDestination({...newDestination, name: e.target.value})}
                    placeholder="My WordPress Site"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform Type</label>
                  <select
                    value={newDestination.type}
                    onChange={(e) => setNewDestination({...newDestination, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="wordpress">WordPress</option>
                    <option value="zapier">Zapier</option>
                    <option value="make">Make (Integromat)</option>
                    <option value="langchain">LangChain</option>
                    <option value="custom">Custom Webhook</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={newDestination.url}
                    onChange={(e) => setNewDestination({...newDestination, url: e.target.value})}
                    placeholder="https://your-site.com/webhook"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key (Optional)</label>
                  <input
                    type="password"
                    value={newDestination.apiKey}
                    onChange={(e) => setNewDestination({...newDestination, apiKey: e.target.value})}
                    placeholder="Bearer token or API key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newDestination.isActive}
                    onChange={(e) => setNewDestination({...newDestination, isActive: e.target.checked})}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSaveDestination}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {editingDestination ? 'Update Destination' : 'Add Destination'}
                </button>
                <button
                  onClick={() => {
                    setShowDestinationForm(false);
                    setEditingDestination(null);
                    setNewDestination({
                      name: '',
                      type: 'custom',
                      url: '',
                      apiKey: '',
                      isActive: true,
                      successCount: 0,
                      errorCount: 0,
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Legacy Quickstart Integration */}
          <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Deploy (Legacy)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Integration Platform</label>
                <select
                  value={selectedIntegration}
                  onChange={(e) => setSelectedIntegration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="langchain">LangChain</option>
                  <option value="zapier">Zapier</option>
                  <option value="make">Make (Integromat)</option>
                  <option value="wordpress">WordPress Plugin</option>
                  <option value="custom">Custom Webhook</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-site.com/webhook"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsDeploying(true)}
                disabled={!webhookUrl.trim() || isDeploying}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isDeploying ? 'Deploying...' : 'Deploy Schema'}
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {exporting ? 'Exporting...' : 'Export JSON-LD'}
              </button>
            </div>
          </div>
        </div>
      </AutoAnimatedElement>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Loading connection data...</span>
          </div>
        </div>
      ) : (
        <>
          <AutoAnimatedElement animation="slideUp" delay={200}>
            <MetricsOverview metrics={connectMetrics} />
          </AutoAnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Platform Connections */}
            <AutoAnimatedElement animation="slideUp" delay={400}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Platform Connections
                </h2>
                
                <div className="space-y-4">
                  {connectData?.platformBreakdown.map((platform) => (
                    <div
                      key={platform.platform}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{platform.platform.charAt(0)}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{platform.platform}</h3>
                          <p className="text-sm text-gray-600">
                            Connections: {platform.connections.toFixed(0)}, Response: {platform.responseTime.toFixed(0)}ms
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIndicator status={platform.status as any} size="sm" />
                        <span className="text-sm font-medium">{platform.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Recent Activity */}
            <AutoAnimatedElement animation="slideUp" delay={600}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  {connectData?.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{activity.timestamp}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">On {activity.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIndicator status={activity.status as any} size="sm" />
                        <span className="text-sm font-medium">{activity.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>

            {/* Insights */}
            <AutoAnimatedElement animation="slideUp" delay={800}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Key Insights
                </h2>
                
                <div className="space-y-4">
                  {connectData?.insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <p className="text-sm text-gray-600 mb-1">
                        {insight.type === 'positive' ? 'positive' : insight.type === 'negative' ? 'negative' : 'neutral'}
                      </p>
                      <p className="font-medium text-gray-900">{insight.message}</p>
                      <p className="text-sm text-gray-600 mt-1">Impact: {insight.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AutoAnimatedElement>
          </div>
        </>
      )}
    </div>
  );
} 