# Quick AI Setup Guide

## Fix the OpenAI API Key Error

The error you're seeing is because the OpenAI API key isn't set. Here's how to fix it:

### Option 1: Set API Key (Recommended)

1. **Get an OpenAI API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in
   - Go to "API Keys" 
   - Create a new key (starts with `sk-`)

2. **Create Environment File**:
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env.local
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

### Option 2: Use Without AI (Fallback Mode)

If you don't want to set up AI right now, the tools will work in fallback mode:

- **Authority Signal Monitor**: Will use rule-based analysis
- **All Tools**: Will show "Enable OpenAI API for detailed analysis" messages
- **Core Functionality**: All tools remain fully functional

### Test the Fix

1. **With API Key**: Visit `/tools/authority` and analyze a website
2. **Without API Key**: Tools work with fallback analysis

### What's Fixed

✅ **No More Crashes**: Tools won't crash without API key
✅ **Graceful Fallbacks**: Clear messages when AI unavailable  
✅ **Conditional Loading**: OpenAI only loads when API key is set
✅ **Error Handling**: Proper error messages and fallbacks

### Next Steps

1. **Set API Key**: For full AI-powered analysis
2. **Test Tools**: Verify all tools work properly
3. **Monitor Usage**: Track API costs at OpenAI dashboard

The tools are now robust and won't crash regardless of API key status! 