# Common Components

This directory contains shared, reusable components that are not specific to any single tool or UI context. Use this directory for:

- **Utility UI elements** (e.g., buttons, modals, icons, tooltips)
- **Layout primitives** (e.g., containers, grids, cards)
- **Logic wrappers** (e.g., error boundaries, suspense wrappers)
- **Non-domain-specific widgets**

## Guidelines
- Components here should be generic and not reference tool-specific logic.
- Prefer composition and props for customization.
- Document usage and props in each file.

## Example Structure
```
common/
  Button.tsx
  Modal.tsx
  Tooltip.tsx
  Card.tsx
  ErrorBoundary.tsx
  ...
```

## Usage
Import from `src/components/common/` in any tool or UI module that needs a generic, reusable component. 