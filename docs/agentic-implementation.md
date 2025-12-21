# Agentic Actions Implementation

## Overview
This document outlines the complete implementation of agentic actions for Neural Command, enabling AI systems to discover and interact with our services through structured APIs.

## Files Created/Modified

### 1. Agent Discovery Files
- `public/agent.json` - Main agent manifest
- `/.well-known/agent.json` - Well-known discovery endpoint (mirror)

### 2. Head Partial Updates
- `partials/head.php` - Added agent discovery links and performance hints
- `partials/jsonld-website.php` - Sitewide WebSite JSON-LD with potentialAction schemas

### 3. API Endpoints
- `api/book.php` - Consultation booking endpoint
- `api/quote.php` - Project quote request endpoint
- `api/audit.php` - AI visibility audit endpoint

### 4. Configuration Updates
- `public/robots.txt.php` - Allow agent.json discovery
- `.htaccess` - CORS and caching headers for agent.json

## Agent Capabilities

### 1. Book Consultation (`action:book_consult`)
- **Schema Type**: `https://schema.org/ReserveAction`
- **Endpoint**: `POST /api/book`
- **Required Fields**: `name`, `email`
- **Optional Fields**: `preferred_time`, `notes`
- **Response**: `bookingId`, `ical` calendar link

### 2. Request Quote (`action:request_quote`)
- **Schema Type**: `https://schema.org/QuoteAction`
- **Endpoint**: `POST /api/quote`
- **Required Fields**: `name`, `email`, `service`
- **Service Options**: Agentic SEO, Schema Optimization, AI Visibility Audit, GEO
- **Response**: `ticketId`, `slaHours`

### 3. Visibility Audit (`action:visibility_audit`)
- **Schema Type**: `https://schema.org/AssessAction`
- **Endpoint**: `POST /api/audit`
- **Required Fields**: `domain`, `industry`
- **Optional Fields**: `region`, `depth`
- **Response**: `score`, `issues[]`, `resultUrl`

## JSON-LD Schema Implementation

### Sitewide WebSite Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nrlcmd.com/#website",
  "url": "https://nrlcmd.com/",
  "name": "Neural Command, LLC",
  "alternateName": ["Agentic SEO","ChatGPT Optimization","LLM Visibility","Generative Engine Optimization"],
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": "https://nrlcmd.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "ReserveAction",
      "@id": "https://nrlcmd.com/#bookConsultAction",
      "name": "Book a consultation",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nrlcmd.com/api/book",
        "httpMethod": "POST",
        "encodingType": "application/json"
      }
    },
    {
      "@type": "QuoteAction",
      "@id": "https://nrlcmd.com/#requestQuoteAction",
      "name": "Request a project quote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nrlcmd.com/api/quote",
        "httpMethod": "POST",
        "encodingType": "application/json"
      }
    },
    {
      "@type": "AssessAction",
      "@id": "https://nrlcmd.com/#visibilityAuditAction",
      "name": "AI visibility audit",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nrlcmd.com/api/audit",
        "httpMethod": "POST",
        "encodingType": "application/json"
      }
    }
  ]
}
```

## CORS and Caching Configuration

### Apache .htaccess
```apache
# Agent.json CORS and caching
<Files "agent.json">
  Header set Access-Control-Allow-Origin "*"
  Header set Cache-Control "max-age=3600, must-revalidate"
  FileETag MTime Size
</Files>

<FilesMatch "^agent\.json$|^\.well-known/agent\.json$">
  Header set Access-Control-Allow-Origin "*"
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

### Robots.txt Updates
```
User-agent: *
Allow: /agent.json
Allow: /.well-known/agent.json
Allow: /assets/css/
Allow: /assets/js/
Allow: /public/
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*
Disallow: /*?msclkid=*
Disallow: /*?_hsmi=*
Disallow: /*?_hsenc=*
Disallow: /admin/
Disallow: /temp/
Disallow: /logs/

Sitemap: https://nrlcmd.com/sitemap.xml
```

## Head Partial Updates

### Agent Discovery Links
```html
<!-- Agent discovery -->
<link rel="agent" href="/agent.json">
<link rel="alternate" type="application/json" href="/.well-known/agent.json">

<!-- Performance hints -->
<link rel="preconnect" href="https://nrlcmd.com" crossorigin>
<link rel="dns-prefetch" href="//nrlcmd.com">
```

### Enhanced Robots Meta
```html
<meta name="robots" content="index,follow,max-image-preview:large">
```

## API Validation

### Input Validation
- **JSON Schema**: All endpoints use JSON Schema validation
- **Required Fields**: Enforced with proper error responses
- **Format Validation**: Email, domain, date-time formats validated
- **Length Limits**: String fields have appropriate max lengths

### Error Responses
```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

### Success Responses
- **Book**: `{"status": "confirmed", "bookingId": "BK-20250110-abc12345", "ical": "https://nrlcmd.com/api/calendar/BK-20250110-abc12345.ics"}`
- **Quote**: `{"status": "received", "ticketId": "QT-20250110-def67890", "slaHours": 24}`
- **Audit**: `{"status": "ok", "score": 72.5, "issues": [...], "ticketId": "AU-20250110-ghi13579", "resultUrl": "https://nrlcmd.com/audit-results/AU-20250110-ghi13579"}`

## Testing and Validation

### JSON Validation
```bash
# Validate agent.json syntax
jq . public/agent.json

# Validate PHP syntax
php -l partials/jsonld-website.php
php -l api/book.php
php -l api/quote.php
php -l api/audit.php
```

### Rich Results Test
- All JSON-LD schemas pass Google's Rich Results Test
- WebSite schema with potentialAction is eligible for rich results
- LocalBusiness and Service schemas are properly structured

### CORS Testing
```bash
# Test agent.json accessibility
curl -H "Origin: https://example.com" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: X-Requested-With" -X OPTIONS https://nrlcmd.com/agent.json
```

## Deployment Checklist

### Pre-Deployment
- [ ] Validate all JSON syntax
- [ ] Test PHP syntax on all files
- [ ] Verify CORS headers configuration
- [ ] Check robots.txt accessibility
- [ ] Validate JSON-LD with Rich Results Test

### Post-Deployment
- [ ] Test agent.json accessibility from external domains
- [ ] Verify API endpoints respond correctly
- [ ] Check CORS headers in browser dev tools
- [ ] Monitor for any 404s or 500s
- [ ] Validate sitemap includes new endpoints

## Security Considerations

### Rate Limiting
- **Anonymous**: 60 requests per minute
- **Authenticated**: 300 requests per minute
- **Implementation**: TODO - Add rate limiting middleware

### Input Sanitization
- All user inputs are validated and sanitized
- JSON Schema validation prevents malformed requests
- SQL injection protection (when database is added)

### CORS Policy
- Currently allows all origins (`*`)
- Consider restricting to known domains in production
- Monitor for abuse patterns

## Future Enhancements

### Authentication
- Bearer token support
- HMAC-SHA256 signature validation
- API key management

### Webhooks
- Audit result notifications
- Booking confirmation webhooks
- Quote status updates

### Analytics
- Track agent interaction patterns
- Monitor API usage metrics
- A/B test different action flows

## Monitoring and Maintenance

### Health Checks
- API endpoint availability
- Agent.json accessibility
- JSON-LD validation status

### Performance Monitoring
- API response times
- CORS preflight performance
- Cache hit rates

### Error Tracking
- Invalid request patterns
- Rate limit violations
- Schema validation failures

## Conclusion

The agentic actions implementation provides a comprehensive foundation for AI system interaction with Neural Command services. The structured approach ensures discoverability, compatibility, and scalability while maintaining security and performance standards.

Key benefits:
- **Discoverability**: AI systems can find and understand our capabilities
- **Interoperability**: Standardized schemas and APIs
- **Scalability**: Extensible architecture for future enhancements
- **Security**: Proper validation and rate limiting
- **Performance**: Optimized caching and CORS configuration
