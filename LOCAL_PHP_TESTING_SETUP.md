# Local PHP Testing Setup Guide

## Quick Start - Test the PHP PSEO Scaffold Locally

### Option 1: Built-in PHP Server (Easiest)

1. **Navigate to your project directory:**
```bash
cd /Users/malware/Desktop/Loading.../nrlcmd-positionzero/nrl-cmd
```

2. **Start the PHP development server:**
```bash
php -S localhost:8080
```

3. **Open your browser and test:**
- Homepage: `http://localhost:8080/`
- Services: `http://localhost:8080/services/`
- Schema Optimizer: `http://localhost:8080/services/schema-optimizer/`
- New York Consulting: `http://localhost:8080/ai-consulting/new-york-ny/`
- Agent JSON: `http://localhost:8080/agent.json`
- Meta JSON: `http://localhost:8080/meta.json`
- Sitemap: `http://localhost:8080/sitemap.xml`

### Option 2: XAMPP/MAMP (Full Stack)

1. **Install XAMPP or MAMP**
2. **Copy PHP files to htdocs/www folder**
3. **Start Apache server**
4. **Access via `http://localhost/`**

### Option 3: Docker (Advanced)

```bash
# Create a simple Docker setup
docker run -p 8080:80 -v $(pwd):/var/www/html php:8.2-apache
```

## Testing Checklist

### ✅ Basic Routes
- [ ] `/` - Homepage loads
- [ ] `/services/` - Services page loads
- [ ] `/services/agentic-seo/` - Dynamic service page
- [ ] `/ai-consulting/new-york-ny/` - Regional page
- [ ] `/about/` - About page
- [ ] `/contact/` - Contact page

### ✅ API Endpoints
- [ ] `POST /api/book` - Booking form works
- [ ] `POST /api/quote` - Quote form works

### ✅ Agentic Files
- [ ] `/agent.json` - Valid JSON response
- [ ] `/meta.json` - Valid JSON response
- [ ] `/sitemap.xml` - Valid XML sitemap

### ✅ Schema Validation
- [ ] View page source - JSON-LD schemas present
- [ ] Test with Rich Results Tool
- [ ] Validate LocalBusiness schema
- [ ] Check FAQPage schema

## Troubleshooting

### Common Issues

1. **PHP not found:**
```bash
# Install PHP via Homebrew
brew install php
```

2. **Port already in use:**
```bash
# Use different port
php -S localhost:8081
```

3. **File permissions:**
```bash
# Make files readable
chmod 644 *.php
chmod 755 lib/ templates/ pages/ api/ assets/
```

4. **Missing extensions:**
```bash
# Check PHP extensions
php -m | grep json
```

## Development Tips

### Live Reload
```bash
# Use PHP server with auto-reload
php -S localhost:8080 -t . router.php
```

### Debug Mode
Add to top of `index.php`:
```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Log Requests
```bash
# Monitor requests
php -S localhost:8080 2>&1 | tee php-server.log
```

## Next Steps After Testing

1. **Validate all routes work**
2. **Test form submissions**
3. **Check JSON-LD schemas**
4. **Verify mobile responsiveness**
5. **Test API endpoints**

Ready to start testing! Run `php -S localhost:8080` and let me know what you see.
