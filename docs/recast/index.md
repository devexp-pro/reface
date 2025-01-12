---
title: Recast Core Concepts
description: Overview of Recast template engine core concepts and features
tags: [overview, concepts, introduction]
category: Getting Started
sidebar: main
order: 0
---

# Recast Core Concepts

Recast is a string-based HTML template engine designed for server-side rendering. It provides a powerful and type-safe way to build HTML templates with modern developer experience.

Recast is part of the [Reface](../reface/index.md) ecosystem - a collection of tools and
libraries for building modern web applications. While it can be used standalone, it works best
with other Reface components.

## Key Features

- **Server-First**: Optimized for server-side rendering with minimal client-side JavaScript
- **Type Safety**: Full TypeScript support across all APIs
- **Performance**: Efficient template reuse and minimal runtime overhead
- **Developer Experience**: Modern APIs with excellent IDE support
- **Extensibility**: Plugin system for custom functionality
- **Security**: Built-in XSS protection and content security

## Core Systems

1. [JSX](./jsx.md) - High-level component syntax

   ```tsx
   const Button = component((props: Props) => (
     <button class={props.class}>{props.children}</button>
   ));
   ```

   - React-like syntax
   - TypeScript integration
   - Component composition
   - Props validation

2. [HTML API](./html.md) - Low-level HTML string creation

   ```typescript
   // Template literal
   html`<div class="box">${content}</div>`;

   // Function component
   const Button = (props: Props, children: string) => {
     return html`<button class="btn">${children}</button>`;
   };
   ```

   - Safe HTML strings
   - Function components
   - Attribute helpers
   - XSS protection

3. [Template API](./elements.md) - Core API for creating and manipulating HTML elements

   ```typescript
   const template = div({ class: "box" })`${content}`;
   ```

   - Prebuilt HTML tags
   - Template factory
   - Chainable API
   - Security features

4. [Node System](./nodes.md) - Internal representation and render pipeline

   ```typescript
   const node = createElement("div", { class: "box" }, [content]);
   ```

   - Node types (Text, HTML, Element, Component)
   - Template to Node conversion
   - Node processing and normalization
   - Metadata handling

5. [Component System](./components.md) - Reusable elements with unique instance IDs

   ```typescript
   const Button = component((props: Props) => (
     <button class="btn">{props.children}</button>
   ));
   ```

   - ComponentTemplate creation and lifecycle
   - Instance ID management
   - Client-side integration
   - Props validation

6. [Styling System](./styling.md) - Built-in CSS-in-JS solution

   ```typescript
   const StyledDiv = styled.div/*css*/ `
     & {
       color: red;
     }
   `;
   ```

   - Styled components
   - CSS processing and scoping
   - Style deduplication
   - Theme support

7. [Slots System](./slots.md) - Content distribution mechanism

   ```typescript
   const Layout = component(() => (
     <div>
       <slot name="header" />
       <slot />
     </div>
   ));
   ```

   - Named slots
   - Content providers
   - Slot strategies
   - Built-in slots

8. [Plugin System](./plugins.md) - Extensible render pipeline

   ```typescript
   const plugin = createPlugin({
     name: "custom",
     transform: (node) => node,
   });
   ```

   - Plugin architecture
   - Built-in plugins
   - Custom plugins
   - Plugin lifecycle

9. [Render API](./render.md) - Transform NodeProxies into HTML

   ```typescript
   const html = await render(template, {
     plugins: [plugin],
   });
   ```

   - Render pipeline
   - Node transformation
   - HTML generation
   - Optimization strategies

10. [Test Utils](./testing.md) - Testing helpers

```typescript
const utils = new TestUtils();
utils.assertRender(template, "<div>Expected</div>");
```

- Template testing
- Component testing
- Render testing
- Snapshot testing

11. [Integrations](./integrations.md) - Third-party integrations

```typescript
import { htmx } from "@reface/htmx";
div().htmx("get", "/api")`Load more`;
```

- HTMX support
- Other integrations

See each section for detailed documentation.
