# Neural Command Homepage - Complete Project Context

## Project Overview

**Neural Command** is the first AI search intelligence platform built for the agentic era. The homepage showcases Apple's signature cinematic scroll experience with sophisticated animations and a modern design system.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Apple design system
- **Animations**: Framer Motion with custom orchestration
- **Deployment**: Railway (configured)

## Project Structure

```
neural-command-homepage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata and schema
│   │   ├── page.tsx            # Main homepage with cinematic layout
│   │   └── globals.css         # Global styles and Apple design system
│   ├── components/
│   │   ├── Hero.tsx            # Hero section with parallax animations
│   │   ├── FeatureShowcase.tsx # Features grid with staggered animations
│   │   ├── ProblemStatement.tsx # Problem statement section
│   │   ├── AuthoritySection.tsx # Authority and social proof
│   │   ├── FAQ.tsx             # FAQ section
│   │   ├── CTAFooter.tsx       # Call-to-action footer
│   │   ├── AutoAnimatedElement.tsx # Auto-animation wrapper
│   │   ├── CinematicLayout.tsx # Global layout orchestrator
│   │   └── apple/              # Apple design system components
│   │       ├── AppleSection.tsx
│   │       ├── AppleTypography.tsx
│   │       ├── AppleCard.tsx
│   │       ├── AppleAnimatedSection.tsx
│   │       └── AppleAnimatedElement.tsx
│   ├── lib/
│   │   ├── schema.ts           # JSON-LD structured data
│   │   └── globalScrollOrchestrator.ts # Global animation orchestrator
│   └── hooks/
│       └── useAppleScrollTrigger.ts # Apple-style scroll triggers
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind config with Apple colors
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## Apple Design System

### Color Palette
```javascript
colors: {
  'apple-gray-50': '#fafafa',
  'apple-gray-100': '#f5f5f7',
  'apple-gray-200': '#e8e8ed',
  'apple-gray-300': '#d2d2d7',
  'apple-gray-800': '#1d1d1f',
  'apple-gray-900': '#000000',
  'apple-blue': '#007aff',
  'apple-green': '#30d158',
}
```

### Typography
- **Font Family**: `-apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, sans-serif`
- **Heading Scale**: Large, bold headings with proper hierarchy
- **Body Text**: Clean, readable with proper line spacing

### Spacing System
- **8pt Grid**: All spacing follows Apple's 8pt grid system
- **Border Radius**: `12px`, `16px`, `20px`, `24px` for cards and elements
- **Shadows**: Subtle shadows with Apple's signature depth

## Animation System

### Global Scroll Orchestrator
The `GlobalScrollOrchestrator` manages all animations across the page:

```typescript
class GlobalScrollOrchestrator {
  private triggers: ScrollTrigger[] = [];
  private scrollY: MotionValue<number>;
  
  // Auto-register elements based on data attributes
  registerElementsFromDOM() {
    const elements = document.querySelectorAll('[data-scroll-animation]');
    // Registers elements for animation
  }
}
```

### Animation Types
1. **fadeIn** - Smooth opacity transitions
2. **slideUp** - Elements slide up from below
3. **slideLeft** - Horizontal slide animations
4. **parallax** - Background elements moving slower
5. **scale** - Elements grow into view
6. **rotate** - 3D rotation effects

### Apple's Signature Easing
```typescript
ease: [0.25, 0.46, 0.45, 0.94] // Apple's signature easing curve
```

## Page Sections

### 1. Hero Section
- **Background**: Parallax gradient (blue to purple)
- **Content**: Large title with staggered animations
- **Buttons**: Interactive with hover effects
- **Floating Elements**: Rotating and parallax elements

### 2. Problem Statement
- **Layout**: Full-width dark section
- **Animation**: Dramatic slide-up reveals
- **Content**: "While Others Optimize for Google, Leaders Optimize for AI"

### 3. Features Grid
- **Layout**: 3-column grid with cards
- **Animation**: Staggered slide-up animations
- **Content**: 7 neural tools with metrics

### 4. Dashboard Preview
- **Layout**: 2-column with mockup
- **Animation**: Slide-left with floating metrics
- **Content**: Real-time AI search intelligence

### 5. CTA Section
- **Layout**: Gradient background with centered content
- **Animation**: Scale and slide-up animations
- **Content**: Call-to-action for free trial

## Key Components

### AutoAnimatedElement
Automatically applies scroll animations based on data attributes:

```typescript
<AutoAnimatedElement
  animation="slideUp"
  intensity={1.2}
  delay={0.2}
  className="..."
>
  {children}
</AutoAnimatedElement>
```

### CinematicLayout
Wraps the entire page and automatically enhances elements:

```typescript
<CinematicLayout>
  {/* All page content with automatic animations */}
</CinematicLayout>
```

## Performance Optimizations

### Client-Side Rendering
- All animation components use `"use client"` directive
- Proper Next.js App Router setup
- Server-side rendering for static content

### Animation Performance
- Throttled scroll events (60fps)
- Efficient intersection checking
- Batched DOM reads and writes

## SEO and Metadata

### Structured Data
- **WebApplication Schema**: App metadata
- **Organization Schema**: Company information
- **Breadcrumb Schema**: Navigation structure

### Meta Tags
```typescript
export const metadata: Metadata = {
  title: "Neural Command - AI Search Intelligence Platform",
  description: "The first agentic search optimization platform...",
  keywords: "AI search optimization, agentic AI tools...",
  openGraph: { /* Open Graph data */ },
  twitter: { /* Twitter Card data */ }
};
```

## Deployment Configuration

### Railway Configuration
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
```

## Current Status

### ✅ Completed
- Apple design system implementation
- Global scroll orchestration
- Cinematic animations
- Responsive design
- SEO optimization
- Performance optimizations

### 🎯 Features
- Parallax scrolling
- Staggered element reveals
- Interactive buttons
- Floating elements
- Dashboard mockup
- Feature showcase
- Call-to-action sections

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Progressive enhancement for older browsers
- Mobile-responsive design

## Performance Targets
- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

## Future Enhancements
- A/B testing framework
- Analytics integration
- Performance monitoring
- Content management system
- Multi-language support

---

This Neural Command homepage represents a sophisticated implementation of Apple's cinematic scroll experience, optimized for performance and accessibility while maintaining the signature Apple design language throughout. 