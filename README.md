<div align="center">
  <img src="./website/public/assets/logo.png" alt="Reface Logo" width="200" />
</div>

# [Reface](https://reface.deno.dev/)

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)
[![JSR Score](https://jsr.io/badges/@vseplet/reface/score)](https://jsr.io/@vseplet/reface)
[![Discord](https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white)](https://discord.gg/gT4gvVwqb8)

Modern web framework for building interactive applications with Islands Architecture.

## Features

- 🎯 **Type-safe Templates** - Full TypeScript support with JSX
- 🧩 **Template Composition** - Mix JSX and template literals
- 🔌 **Plugin System** - Extensible composition pipeline
- 🎨 **Styled Components** - CSS-in-JS with type safety
- 🏝️ **Partial System** - Interactive components with HTMX
- 🚀 **Framework Agnostic** - Core composition engine

## Quick Start

```typescript
import { RefaceComposer } from "@reface/core";
import { StyledPlugin } from "@reface/plugins/styled";
import { PartialsPlugin } from "@reface/plugins/partials";

// Create composer instance
const composer = new RefaceComposer();
composer.use(new StyledPlugin());
composer.use(new PartialsPlugin());

// Create styled component
const Button = styled.button`
  & {
    background: var(--primary-color, #3182ce);
    color: white;
    padding: 0.5rem 1rem;
  }
`;

// Create interactive component
const Counter = partial(async () => {
  const count = 0;
  return (
    <div>
      <span>{count}</span>
      <Button {...Counter.trigger()}>Increment</Button>
    </div>
  );
}, "counter");

// Create page template
function HomePage() {
  return (
    <div>
      <h1>Welcome to Reface</h1>
      <Counter />
    </div>
  );
}

// Compose HTML
const html = composer.render(<HomePage />);
```

## Examples

- [📚 Basic Components](./examples/basic) - Component composition
- [🧩 Styled Components](./examples/styled) - CSS-in-JS examples
- [🏝️ Partial Components](./examples/partials) - Interactive components
- [🔌 Custom Plugin](./examples/plugin) - Plugin development

## Documentation

- [Architecture](./docs/architecture.md) - Core concepts and composition design
- [Components](./docs/components.md) - Component composition system
- [Styling](./docs/styling.md) - CSS-in-JS styling
- [Partials](./docs/partials.md) - Interactive components
- [Plugins](./docs/plugins.md) - Plugin system

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [Reface](./LICENSE)
