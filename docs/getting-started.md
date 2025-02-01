# Getting Started

## Quick Setup

1. Create a new project:

```bash
# Using Deno
mkdir my-reface-app
cd my-reface-app
touch main.ts
```

2. Add dependencies:

```typescript
import { Reface } from "jsr:@vseplet/reface";
```

3. Create your first page:

```typescript
// main.ts
import { Reface } from "@reface";
import { Hono } from "@hono/hono";

const app = new Hono();

// Create layout
const Layout = component((_, children) => (
  <html>
    <head>
      <title>My First Reface App</title>
    </head>
    <body>{children}</body>
  </html>
));

// Create page
function HomePage() {
  return (
    <div class="container">
      <h1>Welcome to Reface!</h1>
      <p>This is your first page</p>
    </div>
  );
}

// Initialize Reface
const reface = new Reface({
  layout: Layout,
});

// Setup routes
app.route("/", reface.page("/", HomePage).hono());

// Start server
Deno.serve(app.fetch);
```

4. Run the app:

```bash
deno run -A main.ts
```

## Next Steps

- Learn about [Main Concepts](./concepts.md)
- Explore [API Reference](./api.md)
- Check out [Examples](../examples)
