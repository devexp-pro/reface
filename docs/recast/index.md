# Recast Core Concepts

Recast is a string-based HTML template engine designed for server-side rendering. It provides a powerful and type-safe way to build HTML templates with modern developer experience.

Recast is part of the [Reface](../reface/index.md) ecosystem - a collection of tools and libraries for building modern web applications. While it can be used standalone, it works best with other Reface components.

## Key Features

- **Server-First**: Optimized for server-side rendering with minimal client-side JavaScript
- **Type Safety**: Full TypeScript support across all APIs
- **Performance**: Efficient template reuse and minimal runtime overhead
- **Developer Experience**: Modern APIs with excellent IDE support
- **Extensibility**: Plugin system for custom functionality
- **Security**: Built-in XSS protection and content security

## Core Systems

Recast consists of several key systems:

1. [Element API](./elements.md) - Core API for creating and manipulating HTML elements

   - Prebuilt HTML tags (`a`, `div`, `span`, etc.)
   - Element factory for custom tags
   - Element methods and chainable API
   - Children normalization
   - Security and HTML escaping
   - TypeScript support

2. [Node System](./nodes.md) - Internal representation and render pipeline

   - Node types (Text, HTML, Element, Component)
   - Template to Node conversion
   - Node processing and normalization
   - Metadata handling

3. [Component System](./components.md) - Reusable elements with unique instance IDs

   - Component creation and lifecycle
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

7. [Render API](./render.md) - Transform Elements into HTML

   - Render pipeline
   - Node transformation
   - HTML generation
   - Optimization strategies

8. [Test Utils](./testing.md) - Testing helpers

   - Element testing
   - Component testing
   - Render testing
   - Snapshot testing

9. [Integrations](./integrations.md) - Third-party integrations
   - HTMX support
   - Other integrations

See each section for detailed documentation.
