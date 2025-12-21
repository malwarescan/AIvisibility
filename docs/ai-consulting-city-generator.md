# AI Consulting City Page Generator

## Overview
A plug-and-play PHP city-page generator for nrlcmd.com that outputs fully SSR pages at `/ai-consulting/{city}/` and auto-emits LocalBusiness + Service + FAQPage + BreadcrumbList JSON-LD per city, wired to agent.json @ids.

## File Structure

```
/ai-consulting/
├── index.php                // router: /ai-consulting/{city}/
├── cities.csv               // list of cities + optional overrides
├── templates/
│   └── city.php             // HTML template for a city page
└── lib/
    ├── CityData.php         // loads cities.csv with validation
    ├── TokenEngine.php      // deterministic token system
    └── Schema.php           // JSON-LD builders (echo SSR)

/sitemap-city.xml.php         // dynamic sitemap for city pages
```

## Cities Data

### cities.csv Format
```csv
city,region,country,slug,cta_phone,cta_email,alt_service
New York,NY,US,new-york,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO & Schema Optimization
Austin,TX,US,austin,+1 844-568-4624,consult@nrlcmd.com,AI Visibility Audit
Miami,FL,US,miami,+1 844-568-4624,consult@nrlcmd.com,Generative Engine Optimization
San Francisco,CA,US,san-francisco,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO
Seattle,WA,US,seattle,+1 844-568-4624,consult@nrlcmd.com,Schema Optimization
London,,GB,london,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO
Dubai,,AE,dubai,+1 844-568-4624,consult@nrlcmd.com,AI Visibility Audit
Singapore,,SG,singapore,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO
Berlin,,DE,berlin,+1 844-568-4624,consult@nrlcmd.com,Schema Optimization
Toronto,ON,CA,toronto,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO
Tel Aviv,,IL,tel-aviv,+1 844-568-4624,consult@nrlcmd.com,AI Visibility Audit
Sao Paulo,,BR,sao-paulo,+1 844-568-4624,consult@nrlcmd.com,Agentic SEO
Tokyo,,JP,tokyo,+1 844-568-4624,consult@nrlcmd.com,Schema Optimization
Sydney,,AU,sydney,+1 844-568-4624,consult@nrlcmd.com,Generative Engine Optimization
```

## Core Classes

### CityData.php
- Loads and validates cities.csv
- Provides `getBySlug()` and `all()` methods
- Handles missing fields with defaults

### TokenEngine.php
- Deterministic content generation based on city slug
- Generates intro paragraphs and FAQ content
- Uses CRC32 seeding for consistency

### Schema.php
- JSON-LD schema builders for all required types
- Emits server-side rendered JSON-LD
- Links to agent.json action @ids

## Generated Pages

### Page Structure
Each city page includes:
- **Title**: "AI Consulting in {City} | Neural Command"
- **Meta Description**: Agentic SEO description with city name
- **H1**: "Agentic SEO & AI Consulting for {City}"
- **Intro**: Deterministic content based on city/service
- **FAQs**: 3-5 city-specific questions and answers
- **Contact Info**: Phone and email from CSV
- **Related Links**: Internal navigation

### JSON-LD Schemas
Each page emits 5 JSON-LD blocks:
1. **WebSite** - Sitewide with potentialAction schemas
2. **LocalBusiness** - Company info with areaServed
3. **Service** - City-specific service offering
4. **FAQPage** - Generated FAQ content
5. **BreadcrumbList** - Navigation hierarchy

## URL Structure

### Routes
- `/ai-consulting/` - City index listing
- `/ai-consulting/{city}/` - Individual city pages
- `/sitemap-city.xml.php` - Dynamic sitemap

### Apache Rewrite Rules
```apache
# AI Consulting city pages
RewriteRule ^ai-consulting/([^/]+)/?$ ai-consulting/index.php [L,QSA]
RewriteRule ^ai-consulting/?$ ai-consulting/index.php [L,QSA]
```

## Agent Integration

### Agent.json Linkage
All schemas reference agent.json action @ids:
- `https://nrlcmd.com/#bookConsultAction`
- `https://nrlcmd.com/#requestQuoteAction`
- `https://nrlcmd.com/#visibilityAuditAction`

### Head Links
Each page includes:
```html
<link rel="agent" href="/agent.json">
<link rel="alternate" type="application/json" href="/.well-known/agent.json">
<link rel="preconnect" href="https://nrlcmd.com" crossorigin>
<link rel="dns-prefetch" href="//nrlcmd.com">
```

## Sitemap Generation

### Dynamic Sitemap
`sitemap-city.xml.php` generates:
- All city URLs with proper formatting
- Weekly changefreq
- 0.85 priority
- Current timestamp as lastmod

### Integration
Add to main sitemap index:
```xml
<sitemap>
  <loc>https://nrlcmd.com/sitemap-city.xml.php</loc>
  <lastmod>2025-10-09T23:39:42+00:00</lastmod>
</sitemap>
```

## Content Generation

### Deterministic Tokens
- **Seed**: CRC32 hash of city slug
- **Intro**: 3 opener variants × 3 benefit variants × 3 closer variants
- **FAQs**: 5 base questions, randomly select 3-5 per city
- **Consistency**: Same city always generates same content

### Service Overrides
Each city can have custom `alt_service`:
- Agentic SEO & Schema Optimization
- AI Visibility Audit
- Generative Engine Optimization
- Schema Optimization
- Agentic SEO (default)

## Testing Results

### Syntax Validation
```bash
php -l ai-consulting/index.php
php -l ai-consulting/lib/CityData.php
php -l ai-consulting/lib/TokenEngine.php
php -l ai-consulting/lib/Schema.php
php -l sitemap-city.xml.php
```
All files pass syntax validation.

### Functional Testing
```bash
# Test city index
php ai-consulting/index.php

# Test individual city page
REQUEST_URI="/ai-consulting/london/" php ai-consulting/index.php

# Test sitemap generation
php sitemap-city.xml.php
```

### Sample Output
**London Page**:
- Title: "AI Consulting in London | Neural Command"
- H1: "Agentic SEO & AI Consulting for London"
- Intro: "Deploy AI that actually moves revenue in London using Agentic SEO. We implement JSON-LD completeness, query-aligned copy, and internal links that rank. This is how teams in London ship outcomes in weeks, not quarters."
- FAQs: 3-5 London-specific questions
- JSON-LD: 5 complete schema blocks

## Deployment Checklist

### Pre-Deployment
- [ ] Validate all PHP syntax
- [ ] Test city page generation
- [ ] Verify JSON-LD output
- [ ] Check sitemap generation
- [ ] Test Apache rewrite rules

### Post-Deployment
- [ ] Test `/ai-consulting/` index
- [ ] Test `/ai-consulting/london/` page
- [ ] Validate JSON-LD with Rich Results Test
- [ ] Check sitemap accessibility
- [ ] Verify agent.json integration

## Performance Features

### Server-Side Rendering
- All content generated server-side
- No JavaScript required
- Fast page loads
- SEO-friendly

### Caching Strategy
- Static file serving for CSS/JS
- ETags for agent.json
- Browser caching headers
- CDN-friendly structure

### Mobile Optimization
- Responsive grid layout
- Touch-friendly buttons
- Mobile-first CSS
- Viewport meta tag

## SEO Benefits

### Rich Results Eligibility
- LocalBusiness schema for local SEO
- Service schema for service pages
- FAQPage schema for featured snippets
- BreadcrumbList for navigation

### Agentic SEO
- Structured action endpoints
- Machine-readable content
- AI Overview optimization
- LLM-friendly structure

### Internal Linking
- Hub page structure
- Related service links
- Breadcrumb navigation
- Cross-city connections

## Maintenance

### Adding New Cities
1. Add row to `cities.csv`
2. Deploy changes
3. City page automatically available
4. Sitemap automatically updated

### Content Updates
- Modify `TokenEngine.php` for content changes
- Update `Schema.php` for schema changes
- All cities inherit updates automatically

### Monitoring
- Track city page performance
- Monitor JSON-LD validation
- Check sitemap indexing
- Verify agent integration

## Conclusion

The AI Consulting City Page Generator provides a scalable, maintainable solution for generating city-specific pages with:
- **14 cities** across multiple countries
- **Deterministic content** generation
- **Complete JSON-LD** schemas
- **Agent integration** ready
- **SEO optimized** structure
- **Mobile responsive** design

Ready for immediate deployment and scaling to additional cities as needed.
