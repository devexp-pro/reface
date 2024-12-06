# Server Integration

[← Home](../readme.md) | [← Component System](./components.md) | [HTML Templates →](../html/templates.md)

Reface provides adapters for popular web servers, making it easy to integrate with your existing infrastructure.

## Available Adapters

### Hono

```typescript
import { Hono } from "@hono/hono";
import { Reface, clean } from "@vseplet/reface";

const app = new Hono();
const reface = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
});

// Add Reface routes
app.route("/", reface.hono());

// Add other Hono routes
app.get("/api/data", (c) => c.json({ data: "value" }));

// Start server
Deno.serve(app.fetch);
```

### Oak (Coming Soon)

```typescript
import { Oak } from "@oak/oak";
import { Reface, clean } from "@vseplet/reface";

const app = new Oak();
const reface = new Reface({
  layout: clean({
    htmx: true,
  }),
});

// Add Reface routes
app.use("/", reface.oak());

// Add other Oak routes
app.get("/api/data", (ctx) => {
  ctx.response.body = { data: "value" };
});

// Start server
await app.listen({ port: 8000 });
```

### Express (Coming Soon)

```typescript
import express from "express";
import { Reface, clean } from "@vseplet/reface";

const app = express();
const reface = new Reface({
  layout: clean({
    htmx: true,
  }),
});

// Add Reface routes
app.use("/", reface.express());

// Add other Express routes
app.get("/api/data", (req, res) => {
  res.json({ data: "value" });
});

// Start server
app.listen(8000);
```

## API Reference

### Reface Server Methods

```typescript
class Reface {
  // Create Hono middleware
  hono(): HonoMiddleware;

  // Create Oak middleware
  oak(): OakMiddleware;

  // Create Express middleware
  express(): ExpressMiddleware;
}
```

### Request/Response Types

```typescript
interface RefaceRequest {
  api: string;
  route: string;
  params: { [x: string]: string };
  query: Record<string, string>;
  headers: Record<string, string>;
  formData: FormData;
}

interface RefaceResponse {
  html?: string;
  status?: number;
}
```

## Advanced Usage

### Custom Headers

```typescript
const reface = new Reface({
  layout: clean({
    htmx: true,
  }),
  headers: {
    "X-Custom": "value",
    "Cache-Control": "no-cache",
  },
});
```

### Error Handling

```typescript
const reface = new Reface({
  layout: clean({
    htmx: true,
  }),
  onError: (error) => {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  },
});
```

### Custom Middleware

```typescript
// Hono middleware
app.use("*", async (c, next) => {
  console.log("Request:", c.req.url);
  await next();
});

// Oak middleware
app.use(async (ctx, next) => {
  console.log("Request:", ctx.request.url);
  await next();
});
```

## Best Practices

1. **Server Setup**

   - Choose appropriate adapter
   - Configure error handling
   - Set up logging

2. **Performance**

   - Use caching when possible
   - Configure compression
   - Monitor response times

3. **Security**

   - Set security headers
   - Validate input data
   - Use HTTPS in production

4. **Maintenance**
   - Keep dependencies updated
   - Monitor server health
   - Log important events

## Examples

### Full Application

```typescript
import { Hono } from "@hono/hono";
import { Reface, clean } from "@vseplet/reface";
import { logger } from "@hono/logger";

// Create Hono app
const app = new Hono();

// Add logger
app.use("*", logger());

// Create Reface instance
const reface = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
    title: "My App",
  }),
});

// Add pages
reface
  .page("/", HomePage)
  .page("/about", AboutPage)
  .page("/contact", ContactPage);

// Add API routes
app.get("/api/data", (c) => c.json({ data: "value" }));
app.post("/api/submit", async (c) => {
  const data = await c.req.json();
  return c.json({ success: true });
});

// Add Reface routes
app.route("/", reface.hono());

// Start server
Deno.serve(app.fetch);
```

For more information, see:

- [Application Setup](./readme.md)
- [Components](./components.md)

## Related Sections

- [Core API](./readme.md) - Application setup
- [Component System](./components.md) - Component creation
- [HTML Templates](../html/templates.md) - Template rendering

## Navigation

- Previous: [← Component System](./components.md)
- Next: [HTML Templates →](../html/templates.md)
