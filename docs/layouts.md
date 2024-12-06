# Layouts in Reface

Layouts in Reface provide a way to define the HTML structure and include common dependencies for your applications. Reface comes with two built-in layouts: `clean` and `twa` (Telegram Web App).

## Clean Layout

The clean layout is a basic layout for web applications. It provides a clean HTML structure with optional dependencies.

### Basic Usage

```typescript
import { Reface, clean } from "@vseplet/reface";

const app = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
    title: "My App",
  }),
});
```

### Configuration Options

```typescript
interface CleanLayoutOptions {
  // JavaScript Libraries
  htmx?: boolean; // Include HTMX for dynamic updates
  alpine?: boolean; // Include Alpine.js for reactivity
  hyperscript?: boolean; // Include Hyperscript for behaviors
  jsonEnc?: boolean; // Include JSON encoding support

  // CSS Frameworks
  bootstrap?: boolean; // Include Bootstrap CSS
  bootstrapIcons?: boolean; // Include Bootstrap Icons
  bluma?: boolean; // Include Bulma CSS

  // Meta
  title?: string; // Page title
  head?: string; // Additional head content
}
```

### Example with All Options

```typescript
const app = new Reface({
  layout: clean({
    // JavaScript Libraries
    htmx: true,
    alpine: true,
    hyperscript: true,
    jsonEnc: true,

    // CSS Frameworks
    bootstrap: true,
    bootstrapIcons: true,
    bluma: false,

    // Meta
    title: "My Application",
    head: `
      <meta name="description" content="My awesome app">
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/custom.css">
    `,
  }),
});
```

## TWA Layout (Telegram Web App)

The TWA layout is specifically designed for creating Telegram Web Apps. It includes the Telegram Web App SDK and supports the same options as the clean layout.

### Basic Usage

```typescript
import { Reface, twa } from "@vseplet/reface";

const app = new Reface({
  layout: twa({
    bootstrap: true,
    htmx: true,
    title: "My Telegram App",
  }),
});
```

### Example TWA Application

```typescript
const TelegramApp = island<{ save: { data: string } }, void>({
  template: ({ rpc }) => (
    <div class="container">
      <h1>Telegram Web App</h1>
      <button
        {...rpc.hx.save({ data: "example" })}
        class="btn btn-primary"
        onClick="window.Telegram.WebApp.close()"
      >
        Save and Close
      </button>
    </div>
  ),
  rpc: {
    save: async ({ args }) => {
      await saveToDatabase(args.data);
      return RESPONSE(<div>Saved!</div>);
    },
  },
});

const app = new Reface({
  layout: twa({
    bootstrap: true,
    htmx: true,
    head: `
      <style>
        body {
          background: var(--tg-theme-bg-color);
          color: var(--tg-theme-text-color);
        }
      </style>
    `,
  }),
}).page("/", TelegramApp);
```

## Creating Custom Layouts

You can create custom layouts using the `layout` helper:

```typescript
import { layout } from "@vseplet/reface";

const custom = layout<{
  theme?: "light" | "dark";
  analytics?: boolean;
}>((options) => {
  return (page: string) => {
    return `
      <!DOCTYPE html>
      <html data-theme="${options.theme || "light"}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${options.title || "Custom Layout"}</title>
          ${options.analytics ? '<script src="/analytics.js"></script>' : ""}
          ${options.head || ""}
        </head>
        <body>
          <nav><!-- Your navigation --></nav>
          <main>${page}</main>
          <footer><!-- Your footer --></footer>
        </body>
      </html>
    `;
  };
});

// Usage
const app = new Reface({
  layout: custom({
    theme: "dark",
    analytics: true,
    head: `<link rel="stylesheet" href="/theme.css">`,
  }),
});
```

## Best Practices

1. **Resource Management**

   - Only include the dependencies you need
   - Consider using dynamic imports for large libraries
   - Use CDN resources in development, local in production

2. **Performance**

   - Minimize the number of external resources
   - Use async/defer for non-critical scripts
   - Consider resource preloading for critical assets

3. **Maintainability**

   - Keep layout options simple and focused
   - Use TypeScript for better type safety
   - Document custom layouts thoroughly

4. **Accessibility**
   - Include proper meta tags
   - Ensure proper HTML structure
   - Consider color schemes and contrasts

For more examples and use cases, check out our [examples directory](../../examples).
