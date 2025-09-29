# Neural Command - Element Inventory System

## 🎯 How to Use This System

1. **Identify the element** you want to work on using the ID system
2. **Reference the exact code** from this inventory
3. **Make changes only to that specific element**
4. **Test the change** in isolation
5. **Update this inventory** with any changes

## 📋 Element ID System

### Format: `SECTION-ELEMENT-COMPONENT`
Example: `HERO-HEADING-MAIN` = Hero section, Main heading element

---

## 🏠 HERO SECTION

### HERO-HEADING-MAIN
**Location**: `src/app/page.tsx` lines 12-16
**Purpose**: Main "Neural Command" title
```tsx
<h1 className="text-6xl md:text-8xl font-thin tracking-tight text-gray-900 mb-8">
  Neural Command
</h1>
```
**Safe to modify**: ✅ Text content, font weight, text size
**Do NOT change**: ❌ Animation wrapper, positioning classes

### HERO-SUBTITLE-MAIN
**Location**: `src/app/page.tsx` lines 18-22
**Purpose**: Subtitle text
```tsx
<p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light leading-relaxed max-w-4xl mx-auto">
  The search intelligence platform that thinks ahead
</p>
```
**Safe to modify**: ✅ Text content, font weight, text size
**Do NOT change**: ❌ Animation wrapper, positioning classes

### HERO-BUTTON-PRIMARY
**Location**: `src/app/page.tsx` lines 26-28
**Purpose**: "Get Started" button
```tsx
<button className="bg-blue-500 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105">
  Get Started
</button>
```
**Safe to modify**: ✅ Button text, colors, hover effects
**Do NOT change**: ❌ Animation wrapper, positioning classes

### HERO-BUTTON-SECONDARY
**Location**: `src/app/page.tsx` lines 29-31
**Purpose**: "Learn More" button
```tsx
<button className="bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 px-10 py-4 rounded-xl font-medium text-lg hover:bg-white transition-all duration-200">
  Learn More
</button>
```
**Safe to modify**: ✅ Button text, colors, hover effects
**Do NOT change**: ❌ Animation wrapper, positioning classes

### HERO-FEATURES-INDICATORS
**Location**: `src/app/page.tsx` lines 35-49
**Purpose**: Feature indicator dots and text
```tsx
<div className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500">
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <span>AI Search Intelligence</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    <span>Real-time Analytics</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
    <span>Predictive Insights</span>
  </div>
</div>
```
**Safe to modify**: ✅ Feature text, colors, number of features
**Do NOT change**: ❌ Animation wrapper, positioning classes

---

## 📊 DASHBOARD SECTION

### DASHBOARD-COMMAND-INPUT
**Location**: `src/components/AppleAgenticDashboard.tsx` lines 8-18
**Purpose**: Command center input field
```tsx
<div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
  <div className="flex items-center space-x-4">
    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
      <span className="text-white text-sm">⚡</span>
    </div>
    <input 
      className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-400"
      placeholder="Ask anything about your AI search performance..."
    />
    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
      Analyze
    </button>
  </div>
</div>
```
**Safe to modify**: ✅ Placeholder text, button text, icon
**Do NOT change**: ❌ Container structure, positioning

### DASHBOARD-METRICS-CARDS
**Location**: `src/components/AppleAgenticDashboard.tsx` lines 20-42
**Purpose**: Intelligence metrics cards
```tsx
{[
  { title: "AI Citations", value: "2,847", change: "+23%", color: "green" },
  { title: "Search Visibility", value: "94%", change: "+12%", color: "blue" },
  { title: "Agent Performance", value: "A+", change: "Stable", color: "purple" },
  { title: "ChatGPT Mentions", value: "156", change: "+45%", color: "green" },
  { title: "Perplexity Citations", value: "89", change: "+18%", color: "blue" },
  { title: "Claude References", value: "234", change: "+32%", color: "purple" }
].map((metric, i) => (
  // Card structure
))}
```
**Safe to modify**: ✅ Metric values, titles, colors, number of cards
**Do NOT change**: ❌ Animation structure, card layout

### DASHBOARD-MONITORING-EVENTS
**Location**: `src/components/AppleAgenticDashboard.tsx` lines 60-82
**Purpose**: Live monitoring events
```tsx
{[
  { platform: "ChatGPT", action: "Cited your content", time: "2 min ago", impact: "High" },
  { platform: "Perplexity", action: "Featured in overview", time: "5 min ago", impact: "Medium" },
  { platform: "Claude", action: "Referenced in response", time: "8 min ago", impact: "High" },
  { platform: "Google AI", action: "Included in snippet", time: "12 min ago", impact: "Medium" }
].map((event, i) => (
  // Event structure
))}
```
**Safe to modify**: ✅ Platform names, actions, times, impact levels
**Do NOT change**: ❌ Animation structure, event layout

### DASHBOARD-ACTION-BUTTONS
**Location**: `src/components/AppleAgenticDashboard.tsx` lines 84-90
**Purpose**: Quick action buttons
```tsx
<button className="bg-blue-500 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105">
  Optimize Content
</button>
<button className="bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 px-10 py-4 rounded-xl font-medium text-lg hover:bg-white transition-all duration-200">
  View Analytics
</button>
```
**Safe to modify**: ✅ Button text, colors, hover effects
**Do NOT change**: ❌ Animation wrapper, positioning classes

---

## 🎯 PROBLEM STATEMENT SECTION

### PROBLEM-HEADING-PRIMARY
**Location**: `src/app/page.tsx` lines 58-62
**Purpose**: "While Others Optimize for Google" heading
```tsx
<h2 className="text-4xl md:text-5xl font-light mb-6">
  While Others Optimize for Google
</h2>
```
**Safe to modify**: ✅ Text content, font weight, text size
**Do NOT change**: ❌ Animation wrapper, positioning classes

### PROBLEM-HEADING-SECONDARY
**Location**: `src/app/page.tsx` lines 64-68
**Purpose**: "Leaders Optimize for AI" heading
```tsx
<h2 className="text-4xl md:text-5xl font-light text-blue-400 mb-8">
  Leaders Optimize for AI
</h2>
```
**Safe to modify**: ✅ Text content, accent color
**Do NOT change**: ❌ Animation wrapper, positioning classes

### PROBLEM-DESCRIPTION
**Location**: `src/app/page.tsx` lines 70-74
**Purpose**: Problem statement description
```tsx
<p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
  AI Overviews appear in 13.14% of searches and growing 72% monthly. 
  The future of search is happening now.
</p>
```
**Safe to modify**: ✅ Text content, statistics
**Do NOT change**: ❌ Animation wrapper, positioning classes

---

## 🛠️ FEATURES GRID SECTION

### FEATURES-HEADING-MAIN
**Location**: `src/app/page.tsx` lines 82-86
**Purpose**: "Seven Neural Tools for AI Dominance" heading
```tsx
<h2 className="text-4xl font-bold text-gray-900 mb-4">
  Seven Neural Tools for AI Dominance
</h2>
```
**Safe to modify**: ✅ Text content, number of tools
**Do NOT change**: ❌ Animation wrapper, positioning classes

### FEATURES-DESCRIPTION
**Location**: `src/app/page.tsx` lines 87-89
**Purpose**: Features description
```tsx
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Each tool solves a critical gap in traditional SEO, built specifically for agentic search.
</p>
```
**Safe to modify**: ✅ Text content
**Do NOT change**: ❌ Animation wrapper, positioning classes

### FEATURES-LIST
**Location**: `src/app/page.tsx` lines 91-97
**Purpose**: Array of feature objects
```tsx
{[
  { title: "AgentRank Simulator", metric: "94% prediction accuracy" },
  { title: "CitationFlow Optimizer", metric: "300% citation increase" },
  { title: "AI Search Analytics", metric: "Real-time tracking" },
  { title: "Authority Signal Monitor", metric: "20+ AI platforms" },
  { title: "AI-Readiness Auditor", metric: "Technical optimization" },
  { title: "QueryMind Prediction", metric: "6-month forecasting" },
  { title: "AgentConnect Hub", metric: "API integrations" }
].map((feature, index) => (
  // Feature card structure
))}
```
**Safe to modify**: ✅ Feature titles, metrics, number of features
**Do NOT change**: ❌ Animation structure, card layout

---

## 📈 INTERACTIVE DASHBOARD PREVIEW SECTION

### DASHBOARD-PREVIEW-HEADING
**Location**: `src/app/page.tsx` lines 125-129
**Purpose**: "Real-Time AI Search Intelligence" heading
```tsx
<h2 className="text-4xl font-light mb-6">
  Real-Time AI Search Intelligence
</h2>
```
**Safe to modify**: ✅ Text content
**Do NOT change**: ❌ Animation wrapper, positioning classes

### DASHBOARD-PREVIEW-DESCRIPTION
**Location**: `src/app/page.tsx` lines 131-135
**Purpose**: Dashboard preview description
```tsx
<p className="text-lg opacity-80 mb-6">
  Monitor your content performance across ChatGPT, Claude, Perplexity, 
  and Google AI Overviews in real-time.
</p>
```
**Safe to modify**: ✅ Text content, platform names
**Do NOT change**: ❌ Animation wrapper, positioning classes

### DASHBOARD-PREVIEW-FEATURES
**Location**: `src/app/page.tsx` lines 137-145
**Purpose**: Feature list items
```tsx
{['Citation Tracking', 'Performance Analytics', 'Trend Forecasting'].map((item) => (
  <div key={item} className="flex items-center space-x-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <span className="text-sm">{item}</span>
  </div>
))}
```
**Safe to modify**: ✅ Feature names, number of features
**Do NOT change**: ❌ Animation wrapper, positioning classes

### DASHBOARD-PREVIEW-MOCKUP
**Location**: `src/app/page.tsx` lines 147-165
**Purpose**: Dashboard mockup visualization
```tsx
<div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl">
  {/* Dashboard mockup content */}
</div>
```
**Safe to modify**: ✅ Mockup content, colors
**Do NOT change**: ❌ Animation wrapper, positioning classes

### DASHBOARD-PREVIEW-FLOATING-METRIC
**Location**: `src/app/page.tsx` lines 167-171
**Purpose**: Floating metric badge
```tsx
<div className="absolute -top-4 -right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
  +127% Citations
</div>
```
**Safe to modify**: ✅ Metric value, text
**Do NOT change**: ❌ Animation wrapper, positioning classes

---

## 🎯 CTA SECTION

### CTA-HEADING
**Location**: `src/app/page.tsx` lines 177-181
**Purpose**: "Ready to Dominate AI Search?" heading
```tsx
<h2 className="text-4xl md:text-5xl font-light mb-6">
  Ready to Dominate AI Search?
</h2>
```
**Safe to modify**: ✅ Text content
**Do NOT change**: ❌ Animation wrapper, positioning classes

### CTA-DESCRIPTION
**Location**: `src/app/page.tsx` lines 183-187
**Purpose**: CTA description
```tsx
<p className="text-lg opacity-80 mb-8">
  Join the pioneers who are already winning in the agentic search era.
</p>
```
**Safe to modify**: ✅ Text content
**Do NOT change**: ❌ Animation wrapper, positioning classes

### CTA-BUTTON
**Location**: `src/app/page.tsx` lines 189-191
**Purpose**: CTA button
```tsx
<button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:scale-105">
  Start Your Free Trial
</button>
```
**Safe to modify**: ✅ Button text, colors, hover effects
**Do NOT change**: ❌ Animation wrapper, positioning classes

---

## 🔧 WORKING WITH ELEMENTS

### Step-by-Step Process:

1. **Identify the element** using the ID system above
2. **Locate the exact code** in the specified file and line numbers
3. **Make your changes** only to that specific element
4. **Test the change** by running the development server
5. **Update this inventory** if you modify the element structure

### Example Workflow:

**To change the hero heading:**
1. Find `HERO-HEADING-MAIN` in this inventory
2. Go to `src/app/page.tsx` lines 12-16
3. Modify only the text content: `Neural Command` → `Your New Title`
4. Test the change
5. Update this inventory if needed

### Safety Guidelines:

- ✅ **Always test** changes in isolation
- ✅ **Reference this inventory** before making changes
- ✅ **Update the inventory** after significant changes
- ❌ **Never modify** animation wrappers or positioning classes
- ❌ **Never change** the overall structure of sections

---

## 📝 Change Log

**Date**: Current session
**Changes**: Created element inventory system
**Status**: ✅ Complete and ready for use

**Next Update**: Document any changes made using this system 