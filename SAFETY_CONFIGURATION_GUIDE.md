# Safety Configuration Guide - Preventing Future Breakages

## Overview

This guide explains the self-validating configuration system that prevents dangerous experimental features from causing website breakages.

## The Safety System

### How It Works

The `next.config.ts` file now includes a validation function that:

1. **Checks for dangerous experimental features** before the server starts
2. **Automatically disables them** if they're detected
3. **Provides clear error messages** explaining why they were disabled
4. **Allows override** with environment variables for legitimate testing

### The Validation Function

```typescript
// SAFETY CHECK: Prevent dangerous experimental features
const validateExperimentalConfig = (config: any) => {
  if (config.experimental?.optimizeCss === true) {
    console.error('🚨 DANGER: optimizeCss is enabled!')
    console.error('This requires critters dependency and has caused site breakages.')
    console.error('Set ALLOW_EXPERIMENTAL=true environment variable to override.')
    
    if (process.env.ALLOW_EXPERIMENTAL !== 'true') {
      console.error('Forcing optimizeCss to false for safety.')
      config.experimental.optimizeCss = false
    }
  }
}
```

## Safe Configuration

### ✅ Recommended Configuration

```typescript
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // ✅ KEEP FALSE - Required for stability
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

### ❌ Dangerous Configuration (Will Be Auto-Corrected)

```typescript
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true, // ❌ Will be automatically set to false
  },
  // ... rest of config
}
```

## How to Test Experimental Features Safely

### Method 1: Environment Variable Override

If you need to test `optimizeCss: true` for legitimate reasons:

```bash
# Enable experimental features temporarily
ALLOW_EXPERIMENTAL=true npm run dev
```

### Method 2: Feature Branch Testing

```bash
# Create experimental branch
git checkout -b experiment/css-optimization

# Enable experimental feature
# Test thoroughly
# If it works, merge
# If it breaks, delete branch and return to main
```

### Method 3: Isolated Testing

```bash
# Create test project
cp -r nrl-cmd nrl-cmd-test
cd nrl-cmd-test

# Enable experimental features in test project
# Test thoroughly
# If it works, apply to main project
# If it breaks, delete test project
```

## Warning Messages

When dangerous features are detected, you'll see:

```
🚨 DANGER: optimizeCss is enabled!
This requires critters dependency and has caused site breakages.
Set ALLOW_EXPERIMENTAL=true environment variable to override.
Forcing optimizeCss to false for safety.
```

## Adding More Safety Checks

To add protection for other dangerous features:

```typescript
const validateExperimentalConfig = (config: any) => {
  // Existing check
  if (config.experimental?.optimizeCss === true) {
    console.error('🚨 DANGER: optimizeCss is enabled!')
    // ... safety logic
  }
  
  // Add new checks here
  if (config.experimental?.someOtherFeature === true) {
    console.error('🚨 DANGER: someOtherFeature is enabled!')
    // ... safety logic
  }
}
```

## Environment Variables

### ALLOW_EXPERIMENTAL=true
- **Purpose**: Override safety checks for legitimate testing
- **Use case**: When you need to test experimental features
- **Warning**: Only use when you understand the risks

### Example Usage:
```bash
# For development testing
ALLOW_EXPERIMENTAL=true npm run dev

# For build testing
ALLOW_EXPERIMENTAL=true npm run build
```

## Best Practices

### 1. Always Use Safe Defaults
- Keep `optimizeCss: false` as default
- Only enable experimental features when necessary
- Test thoroughly before enabling

### 2. Document Changes
- Record when you enable experimental features
- Document the testing process
- Note any issues encountered

### 3. Have Rollback Plans
- Know how to disable experimental features quickly
- Keep backup configurations
- Test rollback procedures

### 4. Monitor for Issues
- Watch for warning messages in console
- Monitor for build failures
- Check for runtime errors

## Troubleshooting

### If You See Safety Warnings

1. **Check your configuration** - Look for `optimizeCss: true`
2. **Set it to false** - Change to `optimizeCss: false`
3. **Restart the server** - `npm run dev`
4. **Verify it's working** - Check console for confirmation

### If You Need to Test Experimental Features

1. **Use environment variable** - `ALLOW_EXPERIMENTAL=true npm run dev`
2. **Test thoroughly** - Make multiple changes and rebuilds
3. **Monitor for issues** - Watch for any errors or warnings
4. **Document results** - Record what works and what doesn't

### If Something Breaks

1. **Disable experimental features** - Set `optimizeCss: false`
2. **Clear cache** - `rm -rf .next`
3. **Restart server** - `npm run dev`
4. **Check safety messages** - Look for warnings in console

## Current Safe State

Your configuration is now protected by:

- ✅ **Automatic validation** of dangerous features
- ✅ **Clear warning messages** when issues are detected
- ✅ **Automatic correction** of dangerous settings
- ✅ **Environment variable override** for legitimate testing
- ✅ **Documentation** of safe practices

This system prevents the repeated breakages you experienced by automatically detecting and preventing dangerous experimental features from being enabled accidentally. 