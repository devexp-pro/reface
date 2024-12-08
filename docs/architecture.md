# Architecture

## Core Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Reface       │     │    Islands      │     │    Pages        │
│                 │────▶│                 │────▶│                 │
│  (Application)  │     │  (Interactive)  │     │   (Routes)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      JSX        │     │    Elements     │     │     HTML        │
│                 │────▶│                 │────▶│                 │
│    (.tsx)       │     │   (Factory)     │     │   (String)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Templates     │     │     Core        │     │   Security      │
│                 │────▶│                 │────▶│                 │
│  (Intermediate) │     │   (Render)      │     │   (Escape)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Framework Levels

### Framework Level (`/reface`)

- Application setup and configuration
- Layout and page management
- RPC and REST handlers for islands
- Server adapters (Hono, Oak, Express)

### Core Level (`/core`)

- Error handling system
  - Error types and classes
  - Error context management
  - Error logging
- RPC and Islands types

### HTML Level (`/html`)

- HTML string manipulation
  - Template engine core
  - Template interface and types
  - Template fragments
  - Render engine
  - HTML template tag
  - Attribute processing
  - Class name handling
  - Style processing
- Security features (XSS protection)

### Elements Level (`/elements`)

- Component system
  - HTML elements
  - SVG elements
  - Void elements
- Styled components
  - CSS-in-JS support
  - Theme system
- Security features

### JSX Level (`/jsx`)

- JSX runtime support
  - createElement function
  - Fragment component
  - TypeScript integration
- Component features
  - Props validation
  - Children handling
  - Event handling

## Module Structure

Each module has a specific responsibility and clear boundaries:

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
│    elements     ���  Element creation
└───────┬─────────┘
        │
┌───────▼─────────┐
│      html       │  Template engine & HTML processing
└───────┬─────────┘
        │
┌───────▼─────────┐
│      core       │  Error handling & RPC
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
   - Each module has its own mod.ts
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

Reface is built with a modular architecture that separates concerns into distinct layers:

```
source/
├── core/           # Core rendering engine
│   ├── render.ts   # HTML rendering
│   ├── escape.ts   # Security utilities
│   └── types.ts    # Core types
│
├── elements/       # Element system
│   ├── factory.ts  # Element creation
│   ├── styled.ts   # Styled components
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

## Core Concepts

### Template Engine

The template engine converts templates into HTML strings through several stages:

1. **Template Processing**

```typescript
// Template structure
interface Template {
  tag: string;
  attributes: Record<string, unknown>;
  children: (string | Template)[];
  css?: string;
}

// Processing example
const template = {
  tag: "div",
  attributes: { class: "container" },
  children: ["Hello"],
};

render(template); // => <div class="container">Hello</div>
```

2. **Attribute Processing**

```typescript
// Attributes are processed and escaped
const attrs = {
  class: "btn",
  disabled: true,
  "data-id": 123,
};

processAttributes(attrs);
// => class="btn" disabled data-id="123"
```

3. **Content Processing**

```typescript
// Content is escaped by default
div()`${userInput}`; // Content is escaped

// Explicit trust
div()`${html(trustedHTML)}`; // Content is not escaped
```

### Security

The security system provides several layers of protection:

1. **Automatic Escaping**

```typescript
// HTML special characters are escaped
escapeHTML('<script>alert("xss")</script>');
// => &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

// Attributes are escaped
escapeAttribute('"><script>alert(1)</script>');
// => &quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;
```

2. **Type Safety**

```typescript
// Type-safe attributes
button({
  type: "submit", // Only valid button types
  disabled: true, // Must be boolean
});

// Invalid attributes caught at compile time
button({
  invalid: true, // Error: Property 'invalid' does not exist
});
```

### Element System

The element system provides a functional approach to creating HTML:

1. **Element Factory**

```typescript
// Create element factory
const div = createElementFactory("div");

// Usage
div({ class: "container" })`Content`;
```

2. **Styled Components**

```typescript
// Create styled component
const Button = styled.button`
  & {
    background: blue;
  }
`;

// Usage
Button({ class: "primary" })`Click me`;
```

## Performance

1. **String Building**

- Uses string buffers for large templates
- Minimizes string concatenations
- Caches processed templates

2. **Memory Management**

- Reuses template objects
- Minimizes allocations
- Efficient string handling

## Best Practices

1. **Security**

- Always escape user input
- Use proper attribute types
- Follow XSS guidelines

2. **Performance**

- Cache template results
- Minimize DOM updates
- Use appropriate patterns

3. **Type Safety**

- Use TypeScript strict mode
- Define proper interfaces
- Validate input data
