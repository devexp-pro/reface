<div style="display: flex; justify-content: center;">
  <img src="./_assets/logo.svg" alt="Reface" style="width: 300px; height: auto;" />
</div>

# Reface Framework

Reface is a lightweight framework for building interactive web applications with server-side rendering and islands architecture.

## Core Concepts

### Islands Architecture

Reface uses the islands architecture pattern, where most of the page is static HTML with interactive "islands" that can be hydrated with JavaScript functionality.

### Server-Side Rendering

All components are rendered on the server, providing excellent performance and SEO benefits.

## Documentation

- [DOM API](./dom/readme.md)
  - [Html](./dom/html.md)
  - [CSS](./dom/css.md)
  - [Styled()](./dom/styled.md)
  - [DOM](./dom/dom.md)
  - [JSX/TSX](./dom/jsx.md)
- [Components API](./components.md)
- [Layouts API](./layouts.md)

## Basic Usage

```tsx
import { Hono } from "@hono/hono";
import { Reface, clean, island, component } from "@vseplet/reface";

// Create an interactive component (island)
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

// Create a page
const Home = component(() => (
  <div class="container">
    <h1>Welcome to Reface</h1>
    <Counter initial={0} />
  </div>
));

// Setup the application
const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      bootstrap: true,
    }),
  })
    .page("/", Home)
    .hono()
);

Deno.serve(app.fetch);
```

## Key Features

### Islands

Interactive components with their own state and behavior:

```tsx
const RandomJoke = island<{ joke: null }, { interval: number }>({
  template: ({ props, rpc }) => (
    <div {...rpc.hx.joke()} hx-trigger={`load, every ${props.interval}s`}>
      <p id="joke-text"></p>
    </div>
  ),
  rpc: {
    joke: async () => {
      const joke = await fetchJoke();
      return RESPONSE(<p>{joke}</p>);
    },
  },
});
```

### Layouts

Pre-defined layouts with common dependencies:

```typescript
new Reface({
  layout: clean({
    htmx: true, // Include HTMX
    bootstrap: true, // Include Bootstrap
    jsonEnc: true, // Enable JSON encoding
    hyperscript: true, // Include Hyperscript
    title: "My App", // Page title
    head: `
      <link rel="stylesheet" href="/custom.css">
    `,
  }),
});
```

### RPC Handlers

Server-side handlers for island interactions:

```tsx
const Form = island<{ submit: { name: string } }, void>({
  template: ({ rpc }) => (
    <form {...rpc.hx.submit()}>
      <input name="name" />
      <button type="submit">Send</button>
    </form>
  ),
  rpc: {
    submit: async ({ args }) => {
      await saveToDatabase(args.name);
      return RESPONSE(<p>Saved: {args.name}</p>);
    },
  },
});
```

### REST Handlers

API endpoints for islands:

```tsx
const DataList = island<{}, void>({
  template: ({ rest }) => (
    <div {...rest.hx("self", "get", "/data")}>Loading...</div>
  ),
  rest: {
    [GET("/data")]: async (req) => {
      const data = await fetchData();
      return RESPONSE(
        <ul>
          {data.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    },
  },
});
```

## Practical Examples

### Data Table with Filtering

```tsx
const DataTable = island<{ filter: { query: string } }, { data: Array<Item> }>({
  template: ({ props, rpc }) => (
    <div class="data-table">
      <input
        type="search"
        placeholder="Search..."
        {...rpc.hx.filter()}
        hx-trigger="input changed delay:500ms"
        hx-target="#results"
      />
      <div id="results">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
  rpc: {
    filter: async ({ args }) => {
      const filtered = await filterData(args.query);
      return RESPONSE(
        <tbody>
          {filtered.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      );
    },
  },
});
```

## Integration with Web Frameworks

Reface can be integrated with various web frameworks:

```typescript
// Hono
const app = new Hono().route("/", reface.hono());

// Oak (coming soon)
const app = new Oak().use("/", reface.oak());

// Express (coming soon)
const app = express().use("/", reface.express());
```

For more detailed examples and use cases, check out our [examples directory](../../examples).
