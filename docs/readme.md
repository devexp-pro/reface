# Reface Documentation

<div align="center">
  <img src="./assets/logo.svg" alt="Reface" width="300" />
  <h1>Reface</h1>
  <p><strong>Modern Template Engine for Server-Side Applications</strong></p>
</div>

## Quick Navigation

### Core Concepts

📦 [Application Setup](./core/readme.md)  
🧩 [Component System](./core/components.md)  
🌐 [Server Integration](./core/server.md)

### Template Creation

📝 [HTML Templates](./html/templates.md)  
🏗️ [Elements API](./html/elements.md)  
🎯 [Attributes](./html/attributes.md)

### JSX Support

⚛️ [JSX Runtime](./jsx/runtime.md)  
📐 [JSX Types](./jsx/types.md)

### Styling

💅 [Styled Components](./styled/components.md)  
🎨 [CSS API](./styled/css.md)  
🎭 [Theme System](./styled/theme.md)

### Layouts

🏗️ [Clean Layout](./layouts/clean.md)  
📱 [TWA Layout](./layouts/twa.md)  
🛠️ [Custom Layouts](./layouts/custom.md)

## Overview

Reface is a modern template engine that combines several powerful approaches:

- **Server-Side Rendering** - All templates are rendered on the server
- **Islands Architecture** - Interactive parts are isolated and hydrated
- **Type Safety** - Full TypeScript support with compile-time checks
- **Multiple APIs** - Choose the approach that fits your needs

## Features

### 🎨 Multiple Styling Approaches

- Styled Components with CSS nesting
- CSS-in-JS with theme support
- Global styles and CSS variables
- Dynamic styling based on props

### 🔧 Flexible Template Creation

- Tagged template literals
- JSX support
- Functional approach
- Component composition

### 🛡️ Type Safety

- Full TypeScript support
- Type inference
- Compile-time checks
- Attribute validation

### 🚀 Modern Development

- Zero runtime dependencies
- Tree-shakeable
- SSR ready
- Small bundle size

## Quick Start

1. Install Reface:

```bash
# Using npm
npm install @vseplet/reface

# Using Deno
import { Reface } from "@vseplet/reface";
```

2. Create your first application:

```typescript
import { Reface, clean } from "@vseplet/reface";

// Create a styled component
const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }
`;

// Create a page component
const HomePage = component(() => (
  <div class="container">
    <h1>Welcome to Reface</h1>
    <Button>Click me!</Button>
  </div>
));

// Setup the application
const app = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
}).page("/", HomePage);

// Start the server
Deno.serve(app.fetch);
```

## Documentation

### Core Concepts

- [Application Setup](./core/readme.md)
- [Component System](./core/components.md)
- [Server Integration](./core/server.md)

### Template Creation

- [HTML Templates](./html/templates.md)
- [Elements API](./html/elements.md)
- [Attributes](./html/attributes.md)

### Styling

- [Styled Components](./styled/components.md)
- [CSS API](./styled/css.md)
- [Theme System](./styled/theme.md)

### JSX Support

- [JSX Runtime](./jsx/runtime.md)
- [TypeScript Integration](./jsx/types.md)

### Layouts

- [Clean Layout](./layouts/clean.md)
- [TWA Layout](./layouts/twa.md)
- [Custom Layouts](./layouts/custom.md)

## Examples

Check out our [examples directory](../examples) for complete applications:

- [📚 Docs Viewer](../examples/docs-viewer) - Documentation site with markdown support
- [✅ Todo App](../examples/todo) - Classic todo application
- [💬 Chat App](../examples/chat) - Real-time chat application
- [📝 Blog](../examples/blog) - Blog with SSR and islands

## Contributing

We welcome contributions! Please see our [contributing guide](../CONTRIBUTING.md) for details.

## License

MIT © [Reface](../LICENSE)
