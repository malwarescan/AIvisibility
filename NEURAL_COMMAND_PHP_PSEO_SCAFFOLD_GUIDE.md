# Neural Command — PHP PSEO Scaffold Integration Guide

## Overview

This PHP scaffold provides a production-ready, lightweight structure for **Programmatic SEO (PSEO)** + **Agentic Experience Optimization (AEO)** that complements the existing Next.js Neural Command platform. Built for extreme crawl clarity, rich-result eligibility, and LLM interoperability.

## Architecture Integration

### Two-Platform Strategy
- **Next.js Platform** (`neuralcommandllc.com`) - Advanced AI optimization tools and dashboard
- **PHP Scaffold** (`neuralcommandllc.com/php-scaffold/`) - Lightweight PSEO pages and agentic endpoints

### Technology Stack Comparison

| Aspect | Next.js Platform | PHP Scaffold |
|--------|------------------|--------------|
| **Purpose** | Advanced AI tools & analytics | PSEO pages & agentic actions |
| **Performance** | Client-side rich interactions | Ultra-fast server-side rendering |
| **Schema Coverage** | Dynamic tool-specific schemas | Complete business schema coverage |
| **Agentic Features** | Tool APIs & analysis endpoints | Simple booking/quote endpoints |
| **Crawlability** | JavaScript-dependent | Pure HTML with perfect crawl clarity |

## Directory Structure Analysis

### Core PHP Files
```
/ (web root)
├─ .htaccess              # Clean routing + cache headers
├─ config.php            # Brand constants + PSEO registry
├─ index.php             # Tiny router (minimal overhead)
├─ robots.txt            # Crawl optimization
├─ sitemap.xml.php       # Dynamic programmatic sitemap
├─ agent.json            # LLM/agent affordances
├─ meta.json             # Site manifest for agents
├─ /lib
│  ├─ seo.php            # JSON-LD builders
│  └─ util.php           # Helper functions
├─ /templates
│  ├─ head.php           # <head> + schema injection
│  ├─ header.php         # Site navigation
│  └─ footer.php         # Footer + structured CTAs
├─ /pages
│  ├─ home.php           # Landing page
│  ├─ services.php       # Service listings
│  ├─ service.php        # Dynamic service pages
│  ├─ city-service.php   # Regional PSEO pages
│  └─ contact.php        # Contact form
├─ /api
│  ├─ book.php           # Consultation booking
│  └─ quote.php          # Quote requests
└─ /assets
   ├─ css/styles.css     # Minimal CSS
   └─ img/               # Static assets
```

## Key Features Analysis

### 1. Clean URL Architecture
- `/services/{slug}/` - Service-specific pages
- `/ai-consulting/{city}/` - Regional PSEO pages
- `/about/`, `/contact/` - Standard pages
- `/agent.json` - Agentic affordances
- `/api/book`, `/api/quote` - Simple action endpoints

### 2. Complete Schema Coverage
```php
// Core schemas included:
- LocalBusiness (business info + actions)
- SoftwareApplication (Neural Command suite)
- WebSite (search functionality)
- BreadcrumbList (navigation structure)
- FAQPage (question/answer pairs)
- Dataset (agentic training kit)
- SearchAction/ContactAction (interactive elements)
```

### 3. Agentic Affordances
```json
// agent.json provides:
{
  "capabilities": [
    {"action": "book_consult", "endpoint": "/api/book"},
    {"action": "request_quote", "endpoint": "/api/quote"}
  ],
  "schemas": ["/services/", "/ai-consulting/{city}/"]
}
```

### 4. Regional PSEO Implementation
```php
// 14 priority cities supported:
$CITIES = [
  'new-york-ny' => 'New York, NY',
  'austin-tx' => 'Austin, TX',
  'miami-fl' => 'Miami, FL',
  // ... international cities included
];
```

## Integration with Next.js Platform

### Data Flow Integration
1. **PHP Pages** → Generate high-authority PSEO pages
2. **Next.js Tools** → Provide advanced AI optimization capabilities
3. **Shared APIs** → Both platforms can access same booking/quote endpoints
4. **Schema Consistency** → Both use same business information and actions

### Cross-Platform Linking Strategy
```php
// PHP pages link to Next.js tools:
<a href="https://neuralcommandllc.com/tools/schema-optimizer">
  Advanced Schema Optimization Tools
</a>

// Next.js tools link back to PHP pages:
<Link href="https://neuralcommandllc.com/services/agentic-seo/">
  Learn More About Agentic SEO
</Link>
```

## Performance Optimization

### Caching Strategy
```apache
# .htaccess cache headers
<FilesMatch "\.(php)$">
  Header set Cache-Control "public, max-age=3600, s-maxage=86400"
</FilesMatch>

<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

### Edge/CDN Optimization
- PHP pages cacheable at edge (1 hour TTL)
- Static assets with immutable caching
- Minimal JavaScript (optional enhancements)
- Preloaded critical CSS

## SEO & Agentic Benefits

### Programmatic SEO Advantages
- **Clean URLs**: Perfect crawl structure
- **Dynamic Sitemaps**: Auto-generated from config
- **Regional Pages**: City-specific optimization
- **Schema Coverage**: 100% business schema implementation

### LLM/AI Agent Benefits
- **Structured Data**: Complete JSON-LD coverage
- **Agentic Actions**: Simple, documented API endpoints
- **Training Signals**: Machine-readable business information
- **Semantic CTAs**: Clear action affordances

## Implementation Checklist

### Phase 1: Basic Setup
- [ ] Deploy PHP scaffold to subdomain or subdirectory
- [ ] Configure .htaccess routing
- [ ] Set up config.php with Neural Command details
- [ ] Validate JSON-LD schemas

### Phase 2: Content Integration
- [ ] Add Neural Command-specific service content
- [ ] Expand FAQ sections with tool-specific questions
- [ ] Create city-specific content for regional pages
- [ ] Link between PHP and Next.js platforms

### Phase 3: API Integration
- [ ] Wire /api/book and /api/quote to CRM system
- [ ] Set up email notifications
- [ ] Add analytics tracking
- [ ] Test agentic endpoints

### Phase 4: Optimization
- [ ] Submit sitemap.xml to Search Console
- [ ] Validate rich results
- [ ] Monitor crawl efficiency
- [ ] A/B test conversion rates

## Code Quality & Standards

### PHP Best Practices
- **Security**: Input sanitization with `htmlspecialchars()`
- **Performance**: Minimal includes, efficient routing
- **Maintainability**: Clear separation of concerns
- **SEO**: Canonical URLs, proper meta tags

### Schema Validation
- **Rich Results Test**: Validate all JSON-LD schemas
- **Structured Data Testing**: Ensure proper formatting
- **Consistency**: Match schemas across both platforms

## Monitoring & Analytics

### Key Metrics to Track
- **Page Load Speed**: PHP pages should load <200ms
- **Crawl Efficiency**: Monitor sitemap coverage
- **Conversion Rates**: Track /api/book and /api/quote usage
- **Rich Results**: Monitor schema markup performance

### Tools Integration
- **Google Search Console**: Sitemap and rich results monitoring
- **PageSpeed Insights**: Performance tracking
- **Schema.org Validator**: Schema markup validation
- **Custom Analytics**: API endpoint usage tracking

## Future Enhancements

### Planned Features
- **Multi-language Support**: International PSEO pages
- **Advanced Analytics**: Integration with Neural Command dashboard
- **Dynamic Content**: Real-time service updates
- **A/B Testing**: Conversion optimization

### Integration Opportunities
- **Shared Database**: Connect PHP and Next.js data
- **Unified Analytics**: Cross-platform performance tracking
- **API Gateway**: Centralized endpoint management
- **Content Management**: Shared content updates

This PHP scaffold provides an excellent foundation for PSEO while complementing the advanced AI optimization capabilities of the Next.js platform. Together, they create a comprehensive solution for both technical SEO and agentic optimization.

