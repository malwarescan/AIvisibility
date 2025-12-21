# Query Expansion Strategy: Role-Aligned Surfaces

**Date:** December 21, 2025  
**Status:** Strategic Directive  
**TL;DR:** You do not expand by writing more generic pages. You expand by turning Google's test queries into owned, role-aligned surfaces and then proving satisfaction.

---

## Current State Analysis

### Performance Data (Last 7 Days)
- **Total Clicks:** 1
- **Total Impressions:** 257
- **Overall CTR:** 0.39%
- **Average Position:** 14.46

### What Google is Testing
**Conceptual Queries:**
- "neural" (42 impressions, 0% CTR, pos 9.64)
- "generative engine optimization new york" (22 impressions, 0% CTR, pos 10.36)
- "answer engine optimization services new york" (10 impressions, 0% CTR, pos 7.2)

**Google's Assessment:**
- Potential authority, not yet the obvious choice
- Weak CTR = users not choosing you
- Trust is conditional

---

## The Core Principle

**You are not "targeting keywords".**

You are:
- Teaching Google where each question belongs
- Showing users they are in the right place
- Reducing the risk of a bad click

---

## Query Buckets

### A. Conceptual / Exploratory
**Examples from your data:**
- "neural"
- "generative engine optimization"
- "ai search optimization"

**User Intent:** Understanding, not vendors  
**Page Role:** AUTHORITY  
**Action:** Create concept anchor pages

### B. Comparative / Evaluative
**Examples:**
- "AI SEO vs traditional SEO"
- "How does LLM search work"
- "Best approach to AI visibility"

**User Intent:** Framing and differentiation  
**Page Role:** HYBRID (authority → service implication)  
**Action:** Create bridge pages

### C. Transactional (but immature)
**Examples:**
- "AI SEO service"
- "LLM SEO agency"
- "AI visibility consulting"

**User Intent:** Confidence, not education  
**Page Role:** CONVERSION  
**Action:** Keep service pages narrow and confident

---

## Expansion Model (In Order)

### STEP 1: Concept Anchor Pages

**Create ONE authoritative page per major theme:**

**Priority Pages to Build:**
1. `/insights/llm-visibility/` - For "neural", "LLM visibility" queries
2. `/insights/ai-search-vs-seo/` - For comparative queries
3. `/insights/how-llms-rank-information/` - For "how does LLM search work"

**Requirements:**
- Long-lived (not time-sensitive)
- Educational (explicitly not salesy)
- Citation magnets
- Schema: Article + Organization only

**Why This Works:**
- Gives Google a safe place to rank you for broad queries
- Reduces risk of user dissatisfaction
- Builds authority without cannibalizing services

---

### STEP 2: Bridge Pages (HyBRID)

**Create pages that answer doubts:**

**Examples:**
- `/insights/when-ai-seo-makes-sense/`
- `/insights/common-mistakes-ai-seo/`
- `/insights/what-llm-visibility-actually-changes/`

**Requirements:**
- Answer doubts explicitly
- Call out bad practices (aligns with homepage positioning)
- Gently imply expertise
- Funnel contextually to services or contact
- Schema: Article + Organization (no Service)

**Why This Works:**
- CTR improves because snippet matches user skepticism
- Pre-qualifies users before they reach service pages
- Reduces bounce rate

---

### STEP 3: Keep Service Pages Narrow

**Service pages should:**
- NOT explain the whole world
- NOT educate beginners
- NOT try to rank for broad concepts

**They should rank for:**
- "AI SEO consulting"
- "LLM visibility audit"
- "AI search strategy"

**And convert only users who are already convinced.**

---

## What NOT to Do (Critical)

❌ **Do NOT:**
- Chase every query with a new page
- Stuff keywords into service pages
- Create thin "AI SEO {city}" clones
- Add more schema to force enhancements

**This creates:**
- Cannibalization
- Lower satisfaction
- Long-term suppression

---

## Quick Wins (Before Building New Pages)

### A. Expand Internal Context

**Link authority pages → service pages with descriptive anchors:**

Example:
```html
<!-- In /insights/llm-visibility/ -->
<p>For businesses ready to implement LLM visibility strategies, 
see our <a href="/services/ai-search-optimization/">AI Search Optimization services</a>.</p>
```

**Reference authority pages inside service pages (below the fold):**

Example:
```html
<!-- In /services/ai-search-optimization/ -->
<section class="related-resources">
  <h2>Learn More</h2>
  <p>Understanding <a href="/insights/llm-visibility/">how LLMs rank information</a> 
  is essential for effective AI search optimization.</p>
</section>
```

**This tells Google:** "We understand this topic deeply and in layers."

---

### B. Improve Snippet Intent Matching

**From your data:**
- Many queries rank but don't get clicked
- Weak CTR = snippet doesn't match intent

**Fix by:**
- Making titles answer the question implied by the query
- Making descriptions pre-qualify the reader

**Example Shift:**
- **From:** "AI SEO Services"
- **To:** "AI SEO for LLM Search Visibility, Not Just Rankings"

**This alone can double CTR without ranking changes.**

---

## Implementation Checklist

### Immediate Actions (No New Pages)

- [ ] Audit all service page titles - do they answer the query?
- [ ] Update meta descriptions to pre-qualify readers
- [ ] Add internal links from authority pages to service pages
- [ ] Add "Learn More" sections to service pages linking to insights
- [ ] Verify schema matches page role (AUTHORITY vs CONVERSION)

### Phase 1: Concept Anchors (Build First)

- [ ] `/insights/llm-visibility/` - For "neural", "LLM visibility"
- [ ] `/insights/ai-search-vs-seo/` - For comparative queries
- [ ] `/insights/how-llms-rank-information/` - For "how does" queries

**Schema:** Article + Organization only

### Phase 2: Bridge Pages (Build Second)

- [ ] `/insights/when-ai-seo-makes-sense/`
- [ ] `/insights/common-mistakes-ai-seo/`
- [ ] `/insights/what-llm-visibility-actually-changes/`

**Schema:** Article + Organization (no Service)

### Phase 3: Monitor & Iterate

- [ ] Track CTR improvements per page
- [ ] Monitor query expansion
- [ ] Adjust snippets based on performance
- [ ] Don't build new pages until existing ones prove satisfaction

---

## Success Metrics

**Google will watch:**
- Do users stay? (Time on page)
- Do they move deeper? (Internal clicks)
- Do they return less to SERPs? (Bounce rate)
- Do different page roles behave predictably? (Role alignment)

**If yes:**
- You expand naturally into more queries
- Enhancements stabilize
- Positions improve without force

---

## Mental Model (Lock This In)

**You are not "targeting keywords".**

**You are:**
- Teaching Google where each question belongs
- Showing users they are in the right place
- Reducing the risk of a bad click

**That is how you earn more queries.**

---

## Current Top Performing Page

**`/insights/geo-16-framework/`**
- 1 click from 27 impressions
- 3.7% CTR (vs 0.39% overall)
- Position 7.19

**Why it works:**
- Authority page (Article schema)
- Educational, not salesy
- Matches user intent for research queries

**This is the model for all new authority pages.**

---

**Next Steps:**
1. Implement snippet improvements on existing pages
2. Build concept anchor pages in priority order
3. Monitor CTR improvements
4. Expand only after proving satisfaction

