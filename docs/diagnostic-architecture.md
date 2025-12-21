# AI Visibility Diagnostic — Three-Layer Architecture

**Date:** 2025-01-21  
**Status:** ✅ IMPLEMENTED  
**Purpose:** Educational diagnostic that explains how LLMs interpret pages, not a black-box score engine

## Architecture Overview

The diagnostic uses a three-layer architecture that combines deterministic signals with AI interpretation, wrapped in human framing.

### Layer 1: Deterministic Analysis
**File:** `lib/diagnostic_analyzer.php`

Collects real data from the page:
- URL structure and page type
- Indexability (robots meta, noindex)
- Canonical status
- Schema types present
- Content structure (headings, length, paragraphs)
- Internal/external link counts
- Entity references
- Page role alignment (AUTHORITY, CONVERSION, HYBRID)

**This is real data, not model opinion.**

### Layer 2: LLM Interpretation
**File:** `lib/openai_diagnostic.php`

Uses OpenAI API with a constrained system prompt to:
- Explain how language models interpret the page
- Identify ambiguity or missing context
- Describe what is clearly understood
- Note what cannot be inferred without deeper access
- Avoid guarantees, scores, rankings, or SEO prescriptions

**The model reasons, it does not prescribe.**

### Layer 3: Human Framing
**File:** `pages/audit-results.php`

Wraps the output with context:
- What the diagnostic can tell you
- What the diagnostic cannot tell you
- How to interpret the results
- Next steps (conversation, not action)

**This is where we differentiate from grifters.**

## System Prompt Constraints

The OpenAI system prompt explicitly prevents:
- ❌ SEO guarantees
- ❌ Ranking predictions
- ❌ Google algorithm claims
- ❌ "Best practices" filler
- ❌ Generic advice

The prompt enforces:
- ✅ Narrative explanation
- ✅ Diagnostic reasoning
- ✅ Educational tone
- ✅ Bounded claims

## Configuration

### Required: OpenAI API Key

Set the environment variable:
```bash
export OPENAI_API_KEY="sk-..."
```

Or in your hosting environment (Railway, etc.):
- Add `OPENAI_API_KEY` to environment variables

### Optional: Model Selection

Default model: `gpt-4o-mini` (cost-effective, fast)

To change, modify `lib/openai_diagnostic.php`:
```php
$openai = new OpenAIDiagnostic(null, 'gpt-4'); // Use GPT-4 instead
```

## Usage Flow

1. **User submits URL** on `/resources/diagnostic/`
2. **Layer 1 runs:** Deterministic analysis extracts signals
3. **Layer 2 runs:** OpenAI interprets signals (if API key configured)
4. **Layer 3 displays:** Results with human framing
5. **Email sent:** If user provided email (optional)

## Error Handling

- **No API key:** Diagnostic still works with Layer 1 only
- **API failure:** Falls back gracefully, shows deterministic signals
- **Fetch failure:** Shows error, allows retry
- **Invalid URL:** Validates and shows error

## Output Format

### Deterministic Signals (Always Present)
```json
{
  "url": "https://example.com/page",
  "page_type": "service",
  "page_role_alignment": "CONVERSION",
  "indexability": {
    "noindex": false,
    "robots_meta": "index, follow"
  },
  "canonical_status": {
    "present": true,
    "self_referential": true
  },
  "schema_types": ["Organization", "Service", "WebPage"],
  "content_structure": {
    "content_length": 5420,
    "has_h1": true,
    "paragraph_count": 12
  },
  "internal_link_depth": {
    "internal_links": 8,
    "external_links": 3
  }
}
```

### AI Interpretation (If Available)
Narrative text explaining:
- How LLMs interpret the page
- Where ambiguity exists
- What is clearly understood
- What cannot be inferred

## Why This Architecture Works

1. **Credibility:** Deterministic signals are real, verifiable data
2. **Education:** LLM interpretation explains patterns at scale
3. **Trust:** Human framing prevents hype and sets boundaries
4. **Alignment:** Matches homepage positioning ("we work from concept to real application")

## What This Is NOT

- ❌ A ranking predictor
- ❌ A citation guarantee engine
- ❌ A black-box score calculator
- ❌ A generic SEO audit tool

## What This IS

- ✅ An educational diagnostic
- ✅ A credibility amplifier
- ✅ A pre-sales qualifier
- ✅ A bridge between theory and application

## Future Enhancements (Optional)

- Cache deterministic signals (avoid re-fetching)
- Batch analysis for multiple pages
- Historical comparison (track changes over time)
- Export results as PDF
- Integration with contact modal (pre-fill context)

---

**END DOCUMENTATION**

