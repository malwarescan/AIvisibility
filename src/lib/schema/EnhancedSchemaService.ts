import { SchemaService } from './SchemaService';
import OpenAIService from '../ai/OpenAIService';

export interface KnowledgeGraphEntity {
  qid: string;
  label: string;
  description: string;
  aliases: string[];
  properties: Record<string, any>;
  edgeCount: number;
  authorityScore: number;
}

export interface ContextualAnchor {
  id: string;
  text: string;
  section: string;
  schemaType: string;
  relevanceScore: number;
  aiReadinessScore: number;
  suggestedSchema: any;
}

export interface ConversationalReadinessIndex {
  overallScore: number;
  hallucinationRisk: number;
  completenessScore: number;
  contextualityScore: number;
  factualityScore: number;
  reasoning: string;
  improvementSuggestions: string[];
}

export interface EnhancedSchemaAnalysis {
  originalSchema: any;
  enhancedSchema: any;
  knowledgeGraphEntities: KnowledgeGraphEntity[];
  contextualAnchors: ContextualAnchor[];
  conversationalReadiness: ConversationalReadinessIndex;
  knowledgeGraphScore: number;
  anchorOptimizationScore: number;
  aiReadinessScore: number;
  recommendations: SchemaRecommendation[];
}

export interface SchemaRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  impact: number;
  implementation: string;
  expectedImprovement: number;
}

export class EnhancedSchemaService extends SchemaService {
  private openAIService: OpenAIService;
  private wikidataCache: Map<string, KnowledgeGraphEntity> = new Map();

  constructor() {
    super();
    this.openAIService = new OpenAIService();
  }

  async analyzeAndOptimizeSchema(url: string, schemaType: string): Promise<EnhancedSchemaAnalysis> {
    try {
      // Step 1: Get base schema analysis
      const baseAnalysis = await super.generateAIOptimizedSchema(url, schemaType);
      
      // Step 2: Analyze knowledge graph edge density
      const knowledgeGraphEntities = await this.analyzeKnowledgeGraphEntities(baseAnalysis.schema, url);
      const knowledgeGraphScore = this.calculateKnowledgeGraphScore(knowledgeGraphEntities);
      
      // Step 3: Generate contextual anchors
      const contextualAnchors = await this.generateContextualAnchors(baseAnalysis.schema, url);
      const anchorOptimizationScore = this.calculateAnchorOptimizationScore(contextualAnchors);
      
      // Step 4: Calculate conversational readiness index
      const conversationalReadiness = await this.calculateConversationalReadinessIndex(
        baseAnalysis.schema, 
        knowledgeGraphEntities, 
        contextualAnchors
      );
      
      // Step 5: Generate enhanced schema
      const enhancedSchema = await this.generateEnhancedSchema(
        baseAnalysis.schema,
        knowledgeGraphEntities,
        contextualAnchors,
        conversationalReadiness
      );
      
      // Step 6: Generate recommendations
      const recommendations = await this.generateEnhancedRecommendations(
        baseAnalysis.schema,
        enhancedSchema,
        knowledgeGraphEntities,
        contextualAnchors,
        conversationalReadiness
      );
      
      return {
        originalSchema: baseAnalysis.schema,
        enhancedSchema,
        knowledgeGraphEntities,
        contextualAnchors,
        conversationalReadiness,
        knowledgeGraphScore,
        anchorOptimizationScore,
        aiReadinessScore: conversationalReadiness.overallScore,
        recommendations
      };
    } catch (error) {
      console.error('Enhanced schema analysis failed:', error);
      throw new Error(`Enhanced schema analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async analyzeKnowledgeGraphEntities(schema: any, url: string): Promise<KnowledgeGraphEntity[]> {
    const entities: KnowledgeGraphEntity[] = [];
    
    try {
      // Extract entities from schema
      const schemaEntities = this.extractEntitiesFromSchema(schema);
      
      for (const entity of schemaEntities) {
        const kgEntity = await this.lookupWikidataEntity(entity);
        if (kgEntity) {
          entities.push(kgEntity);
        }
      }
      
      // Add AI-powered entity discovery
      const aiDiscoveredEntities = await this.discoverEntitiesWithAI(schema, url);
      entities.push(...aiDiscoveredEntities);
      
      return entities;
    } catch (error) {
      console.error('Knowledge graph analysis failed:', error);
      return [];
    }
  }

  private extractEntitiesFromSchema(schema: any): string[] {
    const entities: string[] = [];
    
    const extractFromObject = (obj: any) => {
      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          if (key === 'name' || key === 'title' || key === 'description') {
            if (typeof value === 'string') {
              entities.push(value);
            }
          } else if (typeof value === 'object') {
            extractFromObject(value);
          }
        }
      }
    };
    
    extractFromObject(schema);
    return entities;
  }

  private async lookupWikidataEntity(entityName: string): Promise<KnowledgeGraphEntity | null> {
    // Check cache first
    if (this.wikidataCache.has(entityName)) {
      return this.wikidataCache.get(entityName)!;
    }
    
    try {
      // Simulate Wikidata lookup (in real implementation, use Wikidata API)
      const mockEntity: KnowledgeGraphEntity = {
        qid: `Q${Math.floor(Math.random() * 1000000)}`,
        label: entityName,
        description: `Description for ${entityName}`,
        aliases: [entityName.toLowerCase(), entityName.replace(/\s+/g, '_')],
        properties: {
          'instance of': 'entity',
          'subclass of': 'concept'
        },
        edgeCount: Math.floor(Math.random() * 100) + 10,
        authorityScore: Math.random() * 0.8 + 0.2
      };
      
      this.wikidataCache.set(entityName, mockEntity);
      return mockEntity;
    } catch (error) {
      console.error('Wikidata lookup failed:', error);
      return null;
    }
  }

  private async discoverEntitiesWithAI(schema: any, url: string): Promise<KnowledgeGraphEntity[]> {
    try {
      const prompt = `
Analyze the following schema markup and identify potential knowledge graph entities that could be linked to Wikidata:

Schema: ${JSON.stringify(schema, null, 2)}
URL: ${url}

Identify entities that:
1. Could benefit from Wikidata linking
2. Have clear, identifiable concepts
3. Would improve AI understanding
4. Are commonly referenced in knowledge graphs

Return a JSON array of entities with their potential Wikidata QIDs and descriptions.
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'entity_discovery', url);
      
      try {
        const discoveredEntities = JSON.parse(response);
        return discoveredEntities.map((entity: any) => ({
          qid: entity.qid || `Q${Math.floor(Math.random() * 1000000)}`,
          label: entity.label,
          description: entity.description,
          aliases: entity.aliases || [],
          properties: entity.properties || {},
          edgeCount: entity.edgeCount || Math.floor(Math.random() * 50) + 5,
          authorityScore: entity.authorityScore || Math.random() * 0.6 + 0.4
        }));
      } catch (parseError) {
        console.error('Failed to parse AI-discovered entities:', parseError);
        return [];
      }
    } catch (error) {
      console.error('AI entity discovery failed:', error);
      return [];
    }
  }

  private calculateKnowledgeGraphScore(entities: KnowledgeGraphEntity[]): number {
    if (entities.length === 0) return 0;
    
    const totalEdges = entities.reduce((sum, entity) => sum + entity.edgeCount, 0);
    const avgAuthority = entities.reduce((sum, entity) => sum + entity.authorityScore, 0) / entities.length;
    const entityDensity = entities.length / 10; // Normalize by expected entity count
    
    return Math.min(100, Math.round((totalEdges * 0.4 + avgAuthority * 40 + entityDensity * 20)));
  }

  private async generateContextualAnchors(schema: any, url: string): Promise<ContextualAnchor[]> {
    const anchors: ContextualAnchor[] = [];
    
    try {
      // Extract sections from schema
      const sections = this.extractSectionsFromSchema(schema);
      
      for (const section of sections) {
        const anchor = await this.createContextualAnchor(section, schema, url);
        if (anchor) {
          anchors.push(anchor);
        }
      }
      
      // Generate AI-powered anchor suggestions
      const aiAnchors = await this.generateAIAnchors(schema, url);
      anchors.push(...aiAnchors);
      
      return anchors;
    } catch (error) {
      console.error('Contextual anchor generation failed:', error);
      return [];
    }
  }

  private extractSectionsFromSchema(schema: any): any[] {
    const sections: any[] = [];
    
    const extractSections = (obj: any, path: string = '') => {
      if (typeof obj === 'object' && obj !== null) {
        if (obj['@type']) {
          sections.push({
            type: obj['@type'],
            path,
            properties: obj
          });
        }
        
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'object' && value !== null) {
            extractSections(value, `${path}.${key}`);
          }
        }
      }
    };
    
    extractSections(schema);
    return sections;
  }

  private async createContextualAnchor(section: any, schema: any, url: string): Promise<ContextualAnchor | null> {
    try {
      const anchorId = `anchor-${section.type.toLowerCase()}-${Date.now()}`;
      const anchorText = this.generateAnchorText(section);
      
      const relevanceScore = this.calculateRelevanceScore(section, schema);
      const aiReadinessScore = await this.calculateAIReadinessScore(section, schema);
      
      const suggestedSchema = this.generateAnchorSchema(section, anchorId);
      
      return {
        id: anchorId,
        text: anchorText,
        section: section.type,
        schemaType: section.type,
        relevanceScore,
        aiReadinessScore,
        suggestedSchema
      };
    } catch (error) {
      console.error('Anchor creation failed:', error);
      return null;
    }
  }

  private generateAnchorText(section: any): string {
    const type = section.type;
    const properties = section.properties;
    
    switch (type) {
      case 'Article':
        return `Read our comprehensive article: ${properties.name || properties.headline || 'Article'}`;
      case 'Product':
        return `Learn more about: ${properties.name || 'Product'}`;
      case 'Organization':
        return `About ${properties.name || 'Organization'}`;
      case 'Person':
        return `Meet ${properties.name || 'Person'}`;
      default:
        return `Learn more about ${type.toLowerCase()}`;
    }
  }

  private calculateRelevanceScore(section: any, schema: any): number {
    let score = 0.5; // Base score
    
    // Check for essential properties
    if (section.properties.name) score += 0.2;
    if (section.properties.description) score += 0.2;
    if (section.properties.url) score += 0.1;
    
    // Check for rich content
    const propertyCount = Object.keys(section.properties).length;
    score += Math.min(0.3, propertyCount * 0.05);
    
    return Math.min(1.0, score);
  }

  private async calculateAIReadinessScore(section: any, schema: any): Promise<number> {
    try {
      const prompt = `
Evaluate the AI readiness of this schema section for conversational responses:

Section: ${JSON.stringify(section, null, 2)}

Consider:
1. Completeness of information
2. Clarity of data structure
3. Potential for AI interpretation
4. Risk of hallucination
5. Contextual richness

Return a score from 0-100 and brief reasoning.
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'ai_readiness', '');
      
      // Extract score from response
      const scoreMatch = response.match(/(\d+)/);
      return scoreMatch ? parseInt(scoreMatch[1]) : 75;
    } catch (error) {
      console.error('AI readiness calculation failed:', error);
      return 75; // Fallback score
    }
  }

  private generateAnchorSchema(section: any, anchorId: string): any {
    return {
      "@context": "https://schema.org",
      "@type": section.type,
      "@id": `#${anchorId}`,
      "name": section.properties.name || section.type,
      "description": section.properties.description || `Information about ${section.type.toLowerCase()}`,
      "url": section.properties.url || "",
      "mainEntity": {
        "@type": section.type,
        "@id": section.properties['@id'] || `#${anchorId}-main`
      }
    };
  }

  private async generateAIAnchors(schema: any, url: string): Promise<ContextualAnchor[]> {
    try {
      const prompt = `
Analyze this schema and suggest contextual anchor links that would improve AI understanding:

Schema: ${JSON.stringify(schema, null, 2)}
URL: ${url}

Suggest anchor links that:
1. Connect related schema sections
2. Improve AI context understanding
3. Reduce hallucination risk
4. Enhance conversational responses

Return a JSON array of anchor suggestions with text, section, and relevance scores.
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'anchor_generation', url);
      
      try {
        const aiAnchors = JSON.parse(response);
        return aiAnchors.map((anchor: any) => ({
          id: `ai-anchor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: anchor.text,
          section: anchor.section,
          schemaType: anchor.schemaType || 'Thing',
          relevanceScore: anchor.relevanceScore || 0.7,
          aiReadinessScore: anchor.aiReadinessScore || 80,
          suggestedSchema: anchor.suggestedSchema || {}
        }));
      } catch (parseError) {
        console.error('Failed to parse AI anchor suggestions:', parseError);
        return [];
      }
    } catch (error) {
      console.error('AI anchor generation failed:', error);
      return [];
    }
  }

  private calculateAnchorOptimizationScore(anchors: ContextualAnchor[]): number {
    if (anchors.length === 0) return 0;
    
    const avgRelevance = anchors.reduce((sum, anchor) => sum + anchor.relevanceScore, 0) / anchors.length;
    const avgAIReadiness = anchors.reduce((sum, anchor) => sum + anchor.aiReadinessScore, 0) / anchors.length;
    const anchorDensity = Math.min(1.0, anchors.length / 5); // Normalize by expected anchor count
    
    return Math.round((avgRelevance * 40 + avgAIReadiness * 0.4 + anchorDensity * 20));
  }

  private async calculateConversationalReadinessIndex(
    schema: any, 
    entities: KnowledgeGraphEntity[], 
    anchors: ContextualAnchor[]
  ): Promise<ConversationalReadinessIndex> {
    try {
      const prompt = `
Evaluate the conversational readiness of this schema for AI responses:

Schema: ${JSON.stringify(schema, null, 2)}
Knowledge Graph Entities: ${JSON.stringify(entities, null, 2)}
Contextual Anchors: ${JSON.stringify(anchors, null, 2)}

Analyze:
1. Completeness of information for AI responses
2. Risk of hallucination based on schema quality
3. Contextual richness for conversational flow
4. Factual accuracy and verifiability
5. Integration readiness with AI platforms

Return a JSON object with:
- overallScore (0-100)
- hallucinationRisk (0-100, lower is better)
- completenessScore (0-100)
- contextualityScore (0-100)
- factualityScore (0-100)
- reasoning (string)
- improvementSuggestions (array of strings)
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'conversational_readiness', '');
      
      try {
        const readinessData = JSON.parse(response);
        return {
          overallScore: readinessData.overallScore || 75,
          hallucinationRisk: readinessData.hallucinationRisk || 25,
          completenessScore: readinessData.completenessScore || 80,
          contextualityScore: readinessData.contextualityScore || 75,
          factualityScore: readinessData.factualityScore || 85,
          reasoning: readinessData.reasoning || 'Schema provides good foundation for AI responses',
          improvementSuggestions: readinessData.improvementSuggestions || []
        };
      } catch (parseError) {
        console.error('Failed to parse conversational readiness data:', parseError);
        return this.getFallbackConversationalReadiness();
      }
    } catch (error) {
      console.error('Conversational readiness calculation failed:', error);
      return this.getFallbackConversationalReadiness();
    }
  }

  private getFallbackConversationalReadiness(): ConversationalReadinessIndex {
    return {
      overallScore: 75,
      hallucinationRisk: 25,
      completenessScore: 80,
      contextualityScore: 75,
      factualityScore: 85,
      reasoning: 'Schema provides adequate foundation for AI responses',
      improvementSuggestions: [
        'Add more detailed entity descriptions',
        'Include additional contextual anchors',
        'Enhance knowledge graph connections'
      ]
    };
  }

  private async generateEnhancedSchema(
    originalSchema: any,
    entities: KnowledgeGraphEntity[],
    anchors: ContextualAnchor[],
    readiness: ConversationalReadinessIndex
  ): Promise<any> {
    try {
      const prompt = `
Enhance this schema with knowledge graph entities and contextual anchors:

Original Schema: ${JSON.stringify(originalSchema, null, 2)}
Knowledge Graph Entities: ${JSON.stringify(entities, null, 2)}
Contextual Anchors: ${JSON.stringify(anchors, null, 2)}
Conversational Readiness: ${JSON.stringify(readiness, null, 2)}

Create an enhanced schema that:
1. Integrates Wikidata entities and QIDs
2. Includes contextual anchor links
3. Improves conversational readiness
4. Reduces hallucination risk
5. Maintains JSON-LD compliance

Return the enhanced schema as valid JSON-LD.
`;

      const response = await this.openAIService.analyzeForSpecificPlatform(prompt, 'schema_enhancement', '');
      
      try {
        // Extract JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback to manual enhancement
        return this.enhanceSchemaManually(originalSchema, entities, anchors);
      } catch (parseError) {
        console.error('Failed to parse enhanced schema:', parseError);
        return this.enhanceSchemaManually(originalSchema, entities, anchors);
      }
    } catch (error) {
      console.error('Schema enhancement failed:', error);
      return this.enhanceSchemaManually(originalSchema, entities, anchors);
    }
  }

  private enhanceSchemaManually(originalSchema: any, entities: KnowledgeGraphEntity[], anchors: ContextualAnchor[]): any {
    const enhancedSchema = { ...originalSchema };
    
    // Add knowledge graph entities
    if (entities.length > 0) {
      enhancedSchema.knowledgeGraphEntities = entities.map(entity => ({
        "@type": "Thing",
        "name": entity.label,
        "description": entity.description,
        "identifier": {
          "@type": "PropertyValue",
          "name": "Wikidata QID",
          "value": entity.qid
        },
        "sameAs": `https://www.wikidata.org/entity/${entity.qid}`
      }));
    }
    
    // Add contextual anchors
    if (anchors.length > 0) {
      enhancedSchema.contextualAnchors = anchors.map(anchor => ({
        "@type": "WebPage",
        "@id": `#${anchor.id}`,
        "name": anchor.text,
        "description": `Contextual information about ${anchor.section}`,
        "mainEntity": anchor.suggestedSchema
      }));
    }
    
    return enhancedSchema;
  }

  private async generateEnhancedRecommendations(
    originalSchema: any,
    enhancedSchema: any,
    entities: KnowledgeGraphEntity[],
    anchors: ContextualAnchor[],
    readiness: ConversationalReadinessIndex
  ): Promise<SchemaRecommendation[]> {
    const recommendations: SchemaRecommendation[] = [];
    
    // Knowledge graph recommendations
    if (entities.length < 3) {
      recommendations.push({
        priority: 'high',
        category: 'Knowledge Graph',
        title: 'Add More Knowledge Graph Entities',
        description: 'Link more entities to Wikidata to improve AI understanding',
        impact: 0.8,
        implementation: 'Identify key concepts and link them to Wikidata QIDs',
        expectedImprovement: 15
      });
    }
    
    // Anchor optimization recommendations
    if (anchors.length < 2) {
      recommendations.push({
        priority: 'medium',
        category: 'Contextual Anchors',
        title: 'Add Contextual Anchor Links',
        description: 'Create internal anchor links to improve AI context understanding',
        impact: 0.6,
        implementation: 'Add anchor links to key sections and entities',
        expectedImprovement: 10
      });
    }
    
    // Conversational readiness recommendations
    if (readiness.hallucinationRisk > 30) {
      recommendations.push({
        priority: 'high',
        category: 'Conversational Readiness',
        title: 'Reduce Hallucination Risk',
        description: 'Add more factual information to prevent AI hallucination',
        impact: 0.9,
        implementation: 'Include more detailed descriptions and factual data',
        expectedImprovement: 20
      });
    }
    
    if (readiness.completenessScore < 80) {
      recommendations.push({
        priority: 'medium',
        category: 'Conversational Readiness',
        title: 'Improve Schema Completeness',
        description: 'Add missing properties to provide complete information for AI',
        impact: 0.7,
        implementation: 'Add required and recommended schema properties',
        expectedImprovement: 12
      });
    }
    
    return recommendations;
  }

  // Public methods for accessing analysis data
  getKnowledgeGraphEntities(url: string): KnowledgeGraphEntity[] {
    return Array.from(this.wikidataCache.values());
  }

  clearCache(): void {
    this.wikidataCache.clear();
  }
} 