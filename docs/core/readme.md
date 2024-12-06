# Core API

[← Home](../readme.md) | [Component System →](./components.md)

Core API provides the foundation for building applications with Reface. It includes application setup, server adapters, and the component system.

## Application Setup

```typescript
import { Reface, clean } from "@vseplet/reface";

const app = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
});
```

## Components

Reface provides two types of components:

### Static Components

```typescript
import { component } from "@vseplet/reface";

const Header = component<{ title: string }>(({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
));
```

### Interactive Islands

```typescript
import { island } from "@vseplet/reface";

const Counter = island<{ increment: null }, { initial: number }>({
  template: ({ props, rpc }) => (
    <div>
      <span id="count">{props.initial}</span>
      <button {...rpc.hx.increment()}>+1</button>
    </div>
  ),
  rpc: {
    increment: async () => {
      const newCount = currentCount + 1;
      return RESPONSE(<span>{newCount}</span>);
    },
  },
});
```

## Server Adapters

### Hono

```typescript
import { Hono } from "@hono/hono";

const app = new Hono().route("/", reface.hono());
```

### Oak (coming soon)

```typescript
import { Oak } from "@oak/oak";

const app = new Oak().use("/", reface.oak());
```

### Express (coming soon)

```typescript
import express from "express";

const app = express().use("/", reface.express());
```

## API Reference

### Reface Class

```typescript
class Reface {
  constructor(options: { layout: Layout });

  page(path: string, component: Component): this;
  api(path: string, handlers: Handlers): this;
  hono(): HonoMiddleware;
  oak(): OakMiddleware;
  express(): ExpressMiddleware;
}
```

### Component Function

```typescript
function component<Props>(render: (props: Props) => Template): Component<Props>;
```

### Island Function

```typescript
function island<RPC, Props>({
  template: (args: {
    props: Props;
    rpc: RpcCalls<RPC>;
    rest: RestCalls;
  }) => Template;
  rpc?: RpcHandlers<RPC>;
  rest?: RestHandlers;
}): Island<RPC, Props>;
```

## Best Practices

1. **Application Structure**

   - Keep pages and components in separate directories
   - Group related islands together
   - Use consistent naming conventions

2. **Component Design**

   - Keep components small and focused
   - Use static components for non-interactive UI
   - Use islands only when interactivity is needed

3. **Performance**

   - Minimize the number of islands
   - Use appropriate caching strategies
   - Optimize server-side rendering

4. **Type Safety**
   - Always define prop types
   - Use strict TypeScript configuration
   - Maintain type definitions

For more detailed information about specific features, check out:

- [Render Pipeline](./render.md)
- [Server Integration](./server.md)
- [Component System](./components.md)

## Related Sections

- [HTML Templates](../html/templates.md) - Basic template creation
- [JSX Runtime](../jsx/runtime.md) - JSX support
- [Server Integration](./server.md) - Server adapters

## Navigation

- Previous: [← Home](../readme.md)
- Next: [Component System →](./components.md)
