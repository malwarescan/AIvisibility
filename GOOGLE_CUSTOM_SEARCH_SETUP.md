# Google Custom Search API Setup Guide

## Overview
This guide helps you set up Google Custom Search API to enable automated AI Overview discovery in the Schema Optimizer tool.

## Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for API usage)

## Step 2: Enable Custom Search API
1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Custom Search API"
3. Click on it and press "Enable"

## Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the key to Custom Search API only

## Step 4: Create Custom Search Engine
1. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Create a search engine"
3. Enter any website URL (e.g., `https://example.com`)
4. Give it a name like "AI Overview Discovery"
5. Click "Create"
6. Go to "Setup" > "Basics"
7. Under "Sites to search", select "Search the entire web"
8. Copy the Search Engine ID (cx)

## Step 5: Add Environment Variables
Add these to your `.env.local` file:

```env
GOOGLE_CUSTOM_SEARCH_API_KEY=your_api_key_here
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_search_engine_id_here
```

## Step 6: Test the Setup
1. Restart your development server
2. Go to `/tools/schema-optimizer`
3. Enter a test query like "transfer domain to cheaper registrar"
4. Click "Discover AI Overview Winners"

## Usage Limits
- **Free tier:** 100 searches per day
- **Paid tier:** $5 per 1,000 searches
- Perfect for development and moderate usage

## Troubleshooting
- **"API not configured" error:** Check your environment variables
- **"No results found" error:** Verify your search engine is set to search the entire web
- **Rate limiting:** You've hit the daily limit, wait 24 hours or upgrade

## Cost Optimization
- The free tier (100 searches/day) is sufficient for most users
- Each schema optimization session uses 1-2 API calls
- Monitor usage in Google Cloud Console

---

*This setup enables the most intuitive AI Overview discovery workflow - users just enter their target query and the tool automatically finds the winning pages!* 