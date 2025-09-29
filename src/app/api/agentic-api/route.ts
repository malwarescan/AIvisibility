import { NextRequest, NextResponse } from 'next/server';

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

interface SchemaData {
  url: string;
  schema: any;
  schemaType: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data, destinationId } = body;

    switch (action) {
      case 'deploy-schema':
        return await deploySchema(data, destinationId);
      case 'test-webhook':
        return await testWebhook(data);
      case 'get-destinations':
        return await getDestinations();
      case 'save-destination':
        return await saveDestination(data);
      case 'delete-destination':
        return await deleteDestination(destinationId);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Agentic API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function deploySchema(schemaData: SchemaData, destinationId: string) {
  try {
    // Get destination from localStorage (in real app, this would be from database)
    const destinations = getDestinationsFromStorage();
    const destination = destinations.find(d => d.id === destinationId);
    
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    if (!destination.isActive) {
      return NextResponse.json({ error: 'Destination is inactive' }, { status: 400 });
    }

    // Prepare payload based on destination type
    const payload = preparePayloadForDestination(schemaData, destination);
    
    // Send webhook
    const response = await fetch(destination.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': destination.apiKey ? `Bearer ${destination.apiKey}` : '',
        ...destination.headers,
      },
      body: JSON.stringify(payload),
    });

    const success = response.ok;
    
    // Update destination stats
    updateDestinationStats(destinationId, success);
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Schema deployed to ${destination.name}`,
        destination: destination.name,
        response: await response.text(),
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `Failed to deploy to ${destination.name}`,
        status: response.status,
        response: await response.text(),
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Deploy schema error:', error);
    updateDestinationStats(destinationId, false);
    return NextResponse.json({
      success: false,
      error: 'Failed to deploy schema',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

function preparePayloadForDestination(schemaData: SchemaData, destination: WebhookDestination) {
  const basePayload = {
    source: 'neural-command-agentic-api',
    timestamp: new Date().toISOString(),
    schema: schemaData.schema,
    metadata: {
      url: schemaData.url,
      schemaType: schemaData.schemaType,
      ...schemaData.metadata,
    },
  };

  switch (destination.type) {
    case 'wordpress':
      return {
        ...basePayload,
        action: 'update_schema',
        post_type: 'schema_optimization',
        schema_data: schemaData.schema,
      };
    
    case 'zapier':
      return {
        ...basePayload,
        trigger: 'schema_deployment',
        data: schemaData.schema,
      };
    
    case 'make':
      return {
        ...basePayload,
        webhook_type: 'schema_update',
        payload: schemaData.schema,
      };
    
    case 'langchain':
      return {
        ...basePayload,
        tool_name: 'schema_optimizer',
        parameters: {
          schema: schemaData.schema,
          url: schemaData.url,
        },
      };
    
    default:
      return basePayload;
  }
}

async function testWebhook(destination: WebhookDestination) {
  try {
    const testPayload = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Webhook test from Neural Command Agentic API',
    };

    const response = await fetch(destination.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': destination.apiKey ? `Bearer ${destination.apiKey}` : '',
        ...destination.headers,
      },
      body: JSON.stringify(testPayload),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      message: response.ok ? 'Webhook test successful' : 'Webhook test failed',
      response: await response.text(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Webhook test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

function getDestinations(): NextResponse {
  const destinations = getDestinationsFromStorage();
  return NextResponse.json({ destinations });
}

function saveDestination(destination: WebhookDestination): NextResponse {
  try {
    const destinations = getDestinationsFromStorage();
    const existingIndex = destinations.findIndex(d => d.id === destination.id);
    
    if (existingIndex >= 0) {
      destinations[existingIndex] = destination;
    } else {
      destinations.push(destination);
    }
    
    localStorage.setItem('agentic-api-destinations', JSON.stringify(destinations));
    
    return NextResponse.json({
      success: true,
      message: 'Destination saved successfully',
      destination,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to save destination',
    }, { status: 500 });
  }
}

function deleteDestination(destinationId: string): NextResponse {
  try {
    const destinations = getDestinationsFromStorage();
    const filtered = destinations.filter(d => d.id !== destinationId);
    localStorage.setItem('agentic-api-destinations', JSON.stringify(filtered));
    
    return NextResponse.json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete destination',
    }, { status: 500 });
  }
}

// Helper functions (in real app, these would use a database)
function getDestinationsFromStorage(): WebhookDestination[] {
  if (typeof window === 'undefined') {
    // Server-side: return empty array or fetch from database
    return [];
  }
  
  try {
    const stored = localStorage.getItem('agentic-api-destinations');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function updateDestinationStats(destinationId: string, success: boolean) {
  if (typeof window === 'undefined') return;
  
  try {
    const destinations = getDestinationsFromStorage();
    const destination = destinations.find(d => d.id === destinationId);
    
    if (destination) {
      if (success) {
        destination.successCount++;
      } else {
        destination.errorCount++;
      }
      destination.lastUsed = new Date().toISOString();
      
      localStorage.setItem('agentic-api-destinations', JSON.stringify(destinations));
    }
  } catch (error) {
    console.error('Failed to update destination stats:', error);
  }
} 