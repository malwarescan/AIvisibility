# Schema Consensus UI Integration Plan

## 1. UI Location
- **Integration Point:**
  - Add a new tab labeled **"Consensus"** to the existing Schema Optimizer tool interface (likely in `src/app/tools/schema-optimizer/page.tsx` or its layout).
  - The tab should be easily accessible alongside other schema tools.

## 2. Components Needed

### a. Schema Input Editor
- **Component:** `SchemaInputEditor`
- **Features:**
  - JSON text area for pasting/editing schema markup
  - Option to upload a `.json` file (with drag-and-drop and file picker)
  - Validation and error highlighting for invalid JSON
  - Submit button to trigger analysis

### b. Agent Feedback Display
- **Component:** `AgentFeedbackAccordion`
- **Features:**
  - Accordion or expandable panels, one per agent (ChatGPT, Claude, Perplexity, Google AI)
  - Each panel shows:
    - Valuable fields (with icons)
    - Missing fields (with icons)
    - Agent summary (formatted for readability)

### c. Consensus Score Card
- **Component:** `ConsensusScoreCard`
- **Features:**
  - Large, visually prominent score (0-100)
  - Trend coloring: green (high), yellow (medium), red (low)
  - Brief explanation of what the score means

### d. Agreement Matrix Table
- **Component:** `AgreementMatrixTable`
- **Features:**
  - Table/grid: fields (rows) x agents (columns)
  - Color-coded cells to indicate agreement/ratings
  - Tooltips for detailed info per cell

### e. Recommendations List
- **Component:** `RecommendationsList`
- **Features:**
  - Prioritized list of recommended schema improvements
  - Each item shows field, action (add/improve), reason, impact, and affected agents
  - Icons for action type

## 3. API Integration
- **Endpoint:** `POST /api/schema-consensus`
- **Implementation:**
  - On submit, send schema payload to API
  - Show loading indicator while awaiting response
  - On success, parse and display all structured output in respective components
  - On error, show clear error message and allow retry

## 4. Result Formatting
- **Scores:**
  - Use color-coding: green (≥80), yellow (50–79), red (<50)
  - Display as both number and visual (progress bar or ring)
- **Fields:**
  - Valuable fields: checkmark or star icon
  - Missing fields: warning or plus icon
  - Use tooltips for explanations
- **Summaries:**
  - Format agent summaries as readable paragraphs with spacing

## 5. Responsive Layout & Mobile Consideration
- **Layout:**
  - Use a columnar layout on desktop, stacked layout on mobile
  - Ensure all tables and accordions are scrollable and touch-friendly
  - Large tap targets for buttons and tabs
  - Test on various device sizes

## 6. Testing Plan
- **Mock Inputs:**
  - Use a set of valid and invalid schema examples for testing
- **Response Handling:**
  - Assert correct parsing and rendering of all API response fields
  - Simulate API errors and loading states
- **Edge Cases:**
  - Test with schemas missing fields, extra fields, or with agent disagreement
  - Verify UI gracefully handles empty or malformed feedback

---

**Next Steps:**
- Design wireframes for each component
- Scaffold new components and integrate into Schema Optimizer
- Implement API calls and state management
- Style components for clarity and accessibility
- Write unit and integration tests for all new UI features 