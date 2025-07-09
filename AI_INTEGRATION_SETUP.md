# AI Integration Setup Guide

## OpenAI API Integration

The Neural Command tools now use OpenAI's GPT-4 for intelligent analysis and recommendations. Follow these steps to enable AI-powered features:

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in your dashboard
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# Redis Configuration (optional for development)
USE_REDIS=false
REDIS_URL=redis://localhost:6379

# Development Settings
NODE_ENV=development
```

### 3. Install Dependencies

The OpenAI package is already installed. If you need to reinstall:

```bash
npm install openai
```

### 4. AI-Powered Features

Once configured, the following tools will use AI analysis:

#### Authority Signal Monitor
- **AI Content Analysis**: Analyzes content quality for AI platforms
- **AI Authority Scoring**: Intelligent authority signal assessment
- **AI SEO Analysis**: AI-specific SEO optimization analysis
- **AI Recommendations**: Personalized improvement suggestions
- **AI Performance Prediction**: Predicts AI search performance

#### AI Analysis Capabilities
- **Content Quality**: Readability, tone, complexity analysis
- **Authority Signals**: Expertise level, credibility factors
- **SEO for AI**: Conversational queries, knowledge graph signals
- **Platform-Specific**: ChatGPT, Claude, Perplexity optimization
- **Predictive Analytics**: AI search performance forecasting

### 5. Testing AI Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/tools/authority`

3. Enter a website URL and click "Analyze Authority"

4. The analysis will now use AI-powered insights

### 6. API Usage Monitoring

Monitor your OpenAI API usage at:
- [OpenAI Usage Dashboard](https://platform.openai.com/usage)

### 7. Cost Optimization

- **Development**: Use fallback mode when API key is not set
- **Production**: Monitor usage and set rate limits
- **Caching**: Results are cached to reduce API calls

### 8. Error Handling

If the OpenAI API is unavailable:
- Tools fall back to rule-based analysis
- Error messages indicate AI analysis status
- All core functionality remains available

### 9. Security Notes

- Never commit your API key to version control
- Use environment variables for all API keys
- Consider using API key rotation for production

### 10. Troubleshooting

**Common Issues:**

1. **"Enable OpenAI API for detailed analysis"**
   - Check that your API key is set correctly
   - Verify the key has sufficient credits
   - Ensure the key has the correct permissions

2. **Analysis timeout**
   - Check your internet connection
   - Verify OpenAI API status
   - Consider increasing timeout limits

3. **Rate limiting**
   - Monitor your API usage
   - Implement request throttling
   - Consider upgrading your OpenAI plan

### 11. Production Deployment

For production deployment:

1. Set environment variables in your hosting platform
2. Enable Redis for better queue management
3. Monitor API usage and costs
4. Implement proper error handling and fallbacks

### 12. Advanced Configuration

For advanced users, you can customize:

- **Model Selection**: Change from GPT-4 to GPT-3.5-turbo for cost savings
- **Temperature**: Adjust creativity vs consistency
- **Max Tokens**: Control response length
- **Rate Limiting**: Implement custom rate limiting

Example advanced configuration in `src/lib/ai/OpenAIService.ts`:

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // Cost-effective alternative
  messages: [...],
  temperature: 0.2, // More consistent
  max_tokens: 500, // Shorter responses
})
```

## Success!

Once configured, your Neural Command tools will provide:

- **Intelligent Analysis**: AI-powered content and authority assessment
- **Personalized Recommendations**: Tailored improvement suggestions
- **Predictive Insights**: AI search performance forecasting
- **Platform-Specific Optimization**: ChatGPT, Claude, Perplexity targeting

The tools now truly live up to their AI-powered promise! 