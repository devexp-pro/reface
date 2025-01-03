---
title: Recast Core Concepts
description: Overview of Recast template engine core concepts and features
tags: [overview, concepts, introduction]
category: Getting Started
sidebar: main
order: 0
---

Recast is a string-based HTML template engine designed for server-side rendering. It provides a powerful and type-safe way to build HTML templates with modern developer experience.

Recast is part of the [Reface](../reface/index.md) ecosystem - a collection of tools and libraries for building modern web applications. While it can be used standalone, it works best with other Reface components.

## Key Features

- **Server-First**: Optimized for server-side rendering with minimal client-side JavaScript
- **Type Safety**: Full TypeScript support across all APIs
- **Performance**: Efficient template reuse and minimal runtime overhead
- **Developer Experience**: Modern APIs with excellent IDE support
- **Extensibility**: Plugin system for custom functionality
- **Security**: Built-in XSS protection and content security

## Core Concepts

### NodeProxy-Based Architecture

NodeProxies are immutable templates that can be chained and reused:

```typescript
// Create NodeProxies
const base = div({ class: "box" });
const withId = base({ id: "box-1" }); // New instance
const withText = base`Hello`; // New instance
const withBoth = base({ id: "box-2" })`Hello`; // New instance
```

### Security by Default

All string values are automatically escaped:

```typescript
const userInput = '<script>alert("XSS")</script>';
div`${userInput}`;
// <div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>

// Use html`` for trusted content
div`${html`<span>Safe HTML</span>`}`;
```

### Server-Side Rendering

Components are rendered on the server with minimal client JS:

```typescript
const Button = component((props) => (
  <button class="button" data-action="click">
    {props.children}
  </button>
));

// Client code is added only when needed
const script = /*js*/ `
  document.querySelector('[data-action="click"]')
    .addEventListener('click', () => {});
`;
```

## Core Systems

Recast consists of several key systems:

1. [NodeProxy API](./elements.md) - Core API for creating and manipulating HTML elements

   - Prebuilt HTML tags
   - NodeProxy factory
   - Chainable API
   - Security features

2. [Node System](./nodes.md) - Internal representation and render pipeline

   - Node types (Text, HTML, Element, Component)
   - NodeProxy to Node conversion
   - Node processing and normalization
   - Metadata handling

3. [Component System](./components.md) - Reusable elements with unique instance IDs

   - ComponentNodeProxy creation and lifecycle
   - Instance ID management
   - Client-side integration
   - Props validation
   - TypeScript support

4. [Styling System](./styling.md) - Built-in CSS-in-JS solution

   - Styled components
   - CSS processing and scoping
   - Style deduplication
   - Direct CSS API
   - Theme support

5. [Slots System](./slots.md) - Content distribution mechanism

   - Named slots
   - Content providers
   - Slot strategies
   - Built-in slots
   - Global vs scoped slots

6. [Plugin System](./plugins.md) - Extensible render pipeline

   - Plugin architecture
   - Built-in plugins
   - Custom plugins
   - Plugin lifecycle

7. [Render API](./render.md) - Transform NodeProxies into HTML

   - Render pipeline
   - Node transformation
   - HTML generation
   - Optimization strategies

8. [Test Utils](./testing.md) - Testing helpers

   - NodeProxy testing
   - Component testing
   - Render testing
   - Snapshot testing

9. [Integrations](./integrations.md) - Third-party integrations
   - HTMX support
   - Other integrations

See each section for detailed documentation.
