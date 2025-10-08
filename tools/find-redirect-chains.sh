#!/bin/bash
# Find redirect chains in your sitemap
# Usage: bash tools/find-redirect-chains.sh

echo "Checking for redirect chains..."
echo "================================"

# Sample URLs to test (replace with your actual URLs)
urls=(
    "https://nrlcmd.com/"
    "https://nrlcmd.com/services/"
    "https://nrlcmd.com/services/ai-consulting/"
    "https://nrlcmd.com/services/ai-consulting/san-francisco-ca/"
)

for url in "${urls[@]}"; do
    echo ""
    echo "Testing: $url"
    
    # Test with trailing slash
    echo "  With slash:"
    curl -sI -L "$url/" 2>&1 | grep -E "HTTP|Location" | head -3
    
    # Test without trailing slash
    echo "  Without slash:"
    curl -sI -L "${url%/}" 2>&1 | grep -E "HTTP|Location" | head -3
    
    # Test with uppercase
    echo "  Uppercase:"
    url_upper=$(echo "$url" | tr '[:lower:]' '[:upper:]')
    curl -sI -L "$url_upper" 2>&1 | grep -E "HTTP|Location" | head -3
done

echo ""
echo "Expected: All should return HTTP/2 200 with NO Location header"
echo "If you see 301/302 with Location header, that's a redirect chain!"

