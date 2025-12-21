# GSC CTR + Intent Realignment Kernel
**VERSION: 1.0** | **MODE: ENFORCEMENT**

## Core Principle

**We do not optimize for rankings. We optimize for selection.**

Google rewards pages users choose. This system exists to make that choice obvious.

---

## Page Role Classification

Every page MUST be classified as exactly ONE role:

### CONVERSION
- **Purpose:** Service, offer, decision
- **Examples:** `/services/*`, `/pricing`, service landing pages
- **Snippet Rules:**
  - Title: Service + Outcome + Geography/Qualifier
  - Description: Who it's for + What changes + Why trust
  - NO abstract language (framework, methodology, etc.)

### AUTHORITY
- **Purpose:** Educational, research, insight
- **Examples:** `/insights/*`, `/case-studies/*`, `/resources/*`, `/how-to-*`
- **Snippet Rules:**
  - Title: Explicitly frame analysis/insight
  - Description: Signal learning, not buying
  - NO service language or CTAs

### HYBRID
- **Purpose:** Authority framed toward a service
- **Examples:** `/about/`, `/contact/`
- **Snippet Rules:**
  - Title: Authority framing FIRST, service implication SECOND
  - Description: Insight → implication → optional next step

---

## Snippet Enforcement Templates

### CONVERSION Title Template
```
[Service Name] [Outcome] in [Location] | Neural Command
```

**Examples:**
- ✅ "ChatGPT SEO Services in New York | Neural Command"
- ✅ "AI Visibility Audit for Healthcare Practices | Neural Command"
- ❌ "GEO-16 Framework Implementation | Neural Command" (too abstract)
- ❌ "AI Visibility Services | Neural Command" (missing outcome/location)

### CONVERSION Description Template
```
For [target audience]. [Outcome statement]. [Proof/trust signal]. [Geography if relevant].
```

**Examples:**
- ✅ "For healthcare practices. Get cited in ChatGPT and AI Overviews. Trusted by 50+ medical practices. Serving practices nationwide."
- ❌ "We help businesses with AI visibility." (missing who, what changes, why trust)

### AUTHORITY Title Template
```
[Topic/Insight] | Neural Command
```

**Examples:**
- ✅ "How AI Overviews Select Sources | Neural Command"
- ✅ "GEO-16 Framework Explained | Neural Command"
- ❌ "AI Visibility Services Guide | Neural Command" (contains service language)

### AUTHORITY Description Template
```
Learn about [topic]. Research and insights on [domain]. [Key takeaway].
```

**Examples:**
- ✅ "Learn about AI citation behavior. Research and insights on answer engine optimization. Understand how AI systems select sources."
- ❌ "Get help with AI visibility. Contact us for services." (signals buying, not learning)

---

## Usage

### Classify a Page
```php
require_once __DIR__.'/lib/page_role_enforcement.php';

$path = '/services/chatgpt-seo/new-york-ny/';
$role = PageRoleEnforcement::classifyPage($path);
// Returns: 'conversion'
```

### Generate Snippets
```php
$role = PageRoleEnforcement::ROLE_CONVERSION;
$data = [
  'service' => 'ChatGPT SEO Services',
  'location' => 'New York',
  'outcome' => 'Get cited in ChatGPT',
  'who' => 'businesses',
  'proof' => 'Trusted by 100+ companies'
];

$title = PageRoleEnforcement::generateTitle($role, $data);
$description = PageRoleEnforcement::generateDescription($role, $data);
```

### Audit Existing Page
```php
$audit = PageRoleEnforcement::auditPage(
  '/services/chatgpt-seo/',
  'ChatGPT SEO Services | Neural Command',
  'Get cited in ChatGPT with our SEO services.',
  PageRoleEnforcement::ROLE_CONVERSION
);

if (!$audit['aligned']) {
  // Fix issues
  foreach ($audit['issues'] as $issue) {
    error_log("Snippet issue: $issue");
  }
}
```

---

## Quality Control Process

### Weekly GSC Review
1. Pull queries with impressions > clicks (low CTR)
2. Identify intent mismatch:
   - Query intent: research/comparison/purchase?
   - Page role: matches intent?
   - Snippet: matches role?
3. Adjust page ROLE or snippet (never both blindly)
4. Observe CTR delta
5. Repeat

### Fail Condition
If a page:
- Ranks top 10
- Has impressions
- Has near-zero CTR

**THAT PAGE IS AT RISK.** Google WILL demote it quietly if unresolved.

---

## Hard Rules (Non-Negotiable)

1. **NO page attempts all three roles**
2. **NO abstract language in conversion titles** (framework, methodology, etc.)
3. **NO service language in authority descriptions**
4. **NO forms anywhere** (contact modal only)
5. **NO direct mailto in navigation** (all go to `/contact/`)
6. **Schema MUST match page role** (no Product/Service on authority pages)

---

## Implementation Checklist

- [ ] Audit all existing pages for role classification
- [ ] Regenerate snippets using enforcement templates
- [ ] Remove abstract language from conversion pages
- [ ] Remove service language from authority pages
- [ ] Set up weekly GSC review process
- [ ] Document page roles in code comments
- [ ] Add validation to CI/CD (if applicable)

---

## Related Files

- `lib/page_role_enforcement.php` - Core enforcement logic
- `templates/head.php` - Where snippets are rendered
- `pages/*.php` - Individual page files (set `$ctx['title']` and `$ctx['desc']`)

