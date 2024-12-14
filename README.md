<div align="center">
  <img src="./website/public/assets/logo.png" alt="Reface Logo" width="200" />
</div>

# [Reface](https://reface.deno.dev/)

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)
[![JSR Score](https://jsr.io/badges/@vseplet/reface/score)](https://jsr.io/@vseplet/reface)
[![Discord](https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white)](https://discord.gg/gT4gvVwqb8)

Next-generation template engine for HTML with component system and plugin architecture.

## Features

- 🎯 **Type-safe** - Full TypeScript support with JSX
- 🧩 **Component-based** - Functional components with composition
- 🔌 **Plugin System** - Extensible core architecture
- 🎨 **Styled Components** - CSS-in-JS with type safety
- 🏝️ **Partials Architecture** - Interactive components with minimal JS
- 🚀 **Platform Agnostic** - Works with any HTTP framework

## Quick Start

```typescript
import { Reface } from "jsr:@vseplet/reface";
import { StyledPlugin } from "@vseplet/reface/styled";
import { PartialPlugin } from "@vseplet/reface/partials";

// Create instance
const reface = new Reface();
reface.use(new StyledPlugin());
reface.use(new PartialPlugin());

// Create components
const Button = styled.button`
  & {
    background: var(--primary-color, #3182ce);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
  }
`;

const Counter = partial(async () => {
  const count = 0;
  return (
    <div>
      <span>{count}</span>
      <Button {...Counter.trigger()}>Increment</Button>
    </div>
  );
}, "counter");

// Create page
function HomePage() {
  return (
    <div>
      <h1>Welcome to Reface</h1>
      <Counter />
    </div>
  );
}

// Render
const html = reface.render(<HomePage />);
```

## Examples

- [📚 Documentation Site](./examples/docs-viewer) - Documentation with markdown support
- [✅ Todo App](./examples/todo) - Classic todo application
- [💬 Chat App](./examples/chat) - Real-time chat application
- [📝 Blog](./examples/blog) - Blog with SSR and partials

## Documentation

- [Architecture](./docs/architecture.md) - Core concepts and design
- [Components](./docs/components.md) - Component system
- [Styling](./docs/styling.md) - CSS-in-JS styling
- [Partials](./docs/partials.md) - Interactive components
- [Plugins](./docs/plugins.md) - Plugin system

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [Reface](./LICENSE)
