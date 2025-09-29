# AI Visibility Testing - API Setup

## OpenAI API Configuration

To enable real AI visibility testing, you need to:

1. **Get your OpenAI API key** from https://platform.openai.com/api-keys

2. **Update the API key** in `/config/api.php`:
   ```php
   define('OPENAI_API_KEY', 'sk-proj-your-actual-api-key-here');
   ```

3. **Test the setup** by running an AI visibility audit on the diagnostic page

## How It Works

The AI visibility test now:

1. **Makes real API calls** to OpenAI GPT-4 with industry-specific prompts
2. **Searches responses** for mentions of the user's domain
3. **Calculates scores** based on:
   - AI mention rate (40 points max)
   - Schema markup analysis (30 points max)  
   - Authority signals (30 points max)

4. **Generates real recommendations** based on actual test results

## Test Prompts Used

- "Name the top 5 [industry] companies with the best customer reviews"
- "What are the leading [industry] providers in the market?"
- "Who should I contact for [industry] services?"
- "List the most reputable [industry] companies"

## Security Note

Keep your API key secure and never commit it to version control. Consider using environment variables for production deployment.
