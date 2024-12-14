# Architecture

## Core Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Reface       │     │    Elements     │     │     HTML        │
│                 │────▶│                 │────▶│                 │
│  (Application)  │     │   (Factory)     │     │   (String)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      JSX        │     │    Templates    │     │   Security      │
│                 │────▶│                 │────▶│                 │
│    (.tsx)       │     │  (Intermediate) │     │   (Escape)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Framework Levels

### Core Level (`/core`)

- Error handling system
  - Error types and classes
  - Error context management
  - Error logging
- Logging system
  - Log levels and formatting
  - Debug utilities

### HTML Level (`/html`)

- Template engine core
  - Template interface and types
  - Template fragments
  - Render engine
  - HTML template tag
- Security features
  - HTML escaping
  - XSS protection
  - Attribute validation

### Elements Level (`/elements`)

- Component system
  - HTML elements
  - SVG elements
  - Void elements
- Styled components
  - CSS-in-JS support
  - Style processing
- Script support
  - Inline scripts
  - External scripts

### JSX Level (`/jsx`)

- JSX runtime support
  - createElement function
  - Fragment component
  - TypeScript integration
- Component features
  - Children handling
  - Event handling

## Module Structure

Each module has a specific responsibility:

```
┌─────────────────┐
│     reface      │  Application framework
└───────┬─────────┘
        │
┌───────▼─────────┐
│      jsx        │  JSX integration
└───────┬─────────┘
        │
┌───────▼─────────┐
│    elements     │  Element creation
└───────┬─────────┘
        │
┌───────▼─────────┐
│      html       │  Template engine & HTML processing
└───────┬─────────┘
        │
┌───────▼─────────┐
│      core       │  Error handling & Logging
└─────────────────┘
```

### Module Principles

1. **Single Responsibility**

   - One file = one function/type
   - Clear separation of concerns
   - Focused module boundaries

2. **Dependencies**

   - Flow from bottom to top
   - core → html → elements → jsx → reface
   - No circular dependencies

3. **Exports**
   - Each module has mod.ts
   - Internal imports through mod.ts
   - Main mod.ts exports essentials only

Example:

```typescript
// Correct imports
import { render } from "../core/mod.ts";
import { escapeHTML } from "../html/mod.ts";

// Avoid direct imports
// import { render } from "../core/render.ts"; // ❌
```

## Overview

Source code organization:

```
source/
├── core/           # Core functionality
│   ├── logger.ts   # Logging system
│   ├── errors.ts   # Error handling
│   └── types.ts    # Core types
│
├── elements/       # Element system
│   ├── factory.ts  # Element creation
│   ├── js.ts      # Script handling
│   └── base.ts     # HTML elements
│
├── html/           # HTML processing
│   ├── escape.ts   # HTML escaping
│   ├── styles.ts   # CSS processing
│   └── types.ts    # HTML types
│
└── jsx/           # JSX support
    ├── runtime.ts  # JSX runtime
    └── types.ts    # JSX types
```
