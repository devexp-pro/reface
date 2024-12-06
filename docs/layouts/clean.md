# Clean Layout

Clean layout provides a minimal setup for web applications with optional dependencies.

## Basic Usage

```typescript
import { Reface, clean } from "@vseplet/reface";

const app = new Reface({
  layout: clean({
    title: "My App",
    htmx: true,
    bootstrap: true,
  }),
});
```

## Configuration

### Basic Options

```typescript
interface CleanLayoutOptions {
  // Meta
  title?: string;
  description?: string;
  charset?: string;
  viewport?: string;
  favicon?: string;

  // Dependencies
  htmx?: boolean;
  alpine?: boolean;
  bootstrap?: boolean;
  bootstrapIcons?: boolean;

  // Custom content
  head?: string;
  scripts?: ScriptOptions[];
  styles?: StyleOptions[];
}

interface ScriptOptions {
  src: string;
  integrity?: string;
  defer?: boolean;
  async?: boolean;
  crossorigin?: string;
}

interface StyleOptions {
  href: string;
  integrity?: string;
  crossorigin?: string;
}
```

### Full Example

```typescript
const app = new Reface({
  layout: clean({
    // Meta options
    title: "My Application",
    description: "A modern web application",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0",
    favicon: "/favicon.ico",

    // Dependencies
    htmx: true,
    alpine: true,
    bootstrap: true,
    bootstrapIcons: true,

    // Custom content
    head: `
      <meta name="theme-color" content="#3182CE">
      <link rel="manifest" href="/manifest.json">
    `,

    // Custom scripts
    scripts: [
      {
        src: "/app.js",
        defer: true,
      },
      {
        src: "https://cdn.example.com/script.js",
        integrity: "sha384-...",
        crossorigin: "anonymous",
      },
    ],

    // Custom styles
    styles: [
      {
        href: "/styles.css",
      },
      {
        href: "https://cdn.example.com/style.css",
        integrity: "sha384-...",
        crossorigin: "anonymous",
      },
    ],
  }),
});
```

## Default Dependencies

### HTMX Integration

When `htmx: true`:

```html
<script src="https://unpkg.com/htmx.org@2.0.1"></script>
<script src="https://unpkg.com/htmx-ext-json-enc@2.0.1/json-enc.js"></script>
```

### Alpine.js Integration

When `alpine: true`:

```html
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Bootstrap Integration

When `bootstrap: true`:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

## Best Practices

1. **Dependencies**

   - Include only needed dependencies
   - Use integrity hashes in production
   - Consider loading performance

2. **Meta Tags**

   - Include proper meta description
   - Set appropriate viewport
   - Add favicon and manifest

3. **Performance**

   - Use defer/async for scripts
   - Minimize custom additions
   - Optimize resource loading

4. **Security**
   - Use integrity checks
   - Set proper CSP headers
   - Validate external resources

## Examples

### Basic Application

```typescript
const app = new Reface({
  layout: clean({
    title: "Basic App",
    htmx: true,
  }),
}).page("/", HomePage);
```

### Full-Featured Application

```typescript
const app = new Reface({
  layout: clean({
    title: "Full App",
    description: "A full-featured web application",
    htmx: true,
    alpine: true,
    bootstrap: true,
    bootstrapIcons: true,
    head: `
      <meta name="theme-color" content="#3182CE">
      <link rel="manifest" href="/manifest.json">
      <meta name="apple-mobile-web-app-capable" content="yes">
    `,
    scripts: [
      { src: "/analytics.js", defer: true },
      { src: "/app.js", type: "module" },
    ],
    styles: [{ href: "/theme.css" }, { href: "/components.css" }],
  }),
});
```

For more information, see:

- [TWA Layout](./twa.md)
- [Custom Layouts](./custom.md)
