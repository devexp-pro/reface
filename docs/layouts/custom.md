# Custom Layouts

[← Home](../readme.md) | [← TWA Layout](./twa.md)

Custom layouts allow you to create your own layout system with full control over HTML structure and dependencies.

## Basic Usage

```typescript
import { Reface, layout } from "@vseplet/reface";

const custom = layout<{ theme?: "light" | "dark" }>((options) => {
  return (page: string) => `
    <!DOCTYPE html>
    <html data-theme="${options.theme || "light"}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Custom Layout</title>
      </head>
      <body>
        ${page}
      </body>
    </html>
  `;
});

const app = new Reface({
  layout: custom({ theme: "dark" }),
});
```

## Layout Factory

### Type Definition

```typescript
type Layout = (page: string) => string;
type LayoutFactory<Options> = (options: Options) => Layout;

function layout<Options>(
  factory: (options: Options) => Layout
): LayoutFactory<Options>;
```

### Full Example

```typescript
interface CustomLayoutOptions {
  // Meta options
  title?: string;
  description?: string;

  // Theme options
  theme?: "light" | "dark";
  primaryColor?: string;

  // Features
  analytics?: boolean;
  comments?: boolean;
}

const custom = layout<CustomLayoutOptions>((options) => {
  // Create layout function
  return (page: string) => {
    // Build meta tags
    const meta = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      <meta name="description" content="${options.description || ""}">
    `;

    // Build styles
    const styles = `
      <style>
        :root {
          color-scheme: ${options.theme};
          --primary-color: ${options.primaryColor || "#3182CE"};
        }
      </style>
    `;

    // Build scripts
    const scripts = [
      options.analytics && '<script src="/analytics.js"></script>',
      options.comments && '<script src="/comments.js"></script>',
    ]
      .filter(Boolean)
      .join("\n");

    // Return complete HTML
    return `
      <!DOCTYPE html>
      <html data-theme="${options.theme}">
        <head>
          ${meta}
          <title>${options.title || "App"}</title>
          ${styles}
        </head>
        <body>
          <main>${page}</main>
          ${scripts}
        </body>
      </html>
    `;
  };
});
```

## Advanced Features

### Layout Composition

```typescript
// Base layout
const base = layout<{ title: string }>((options) => {
  return (page: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${options.title}</title>
      </head>
      <body>${page}</body>
    </html>
  `;
});

// Enhanced layout
const enhanced = layout<{ title: string; analytics?: boolean }>((options) => {
  const baseLayout = base({ title: options.title });

  return (page: string) => {
    const analytics = options.analytics
      ? '<script src="/analytics.js"></script>'
      : "";

    return baseLayout(`
      <div class="app">
        ${page}
      </div>
      ${analytics}
    `);
  };
});
```

### Dynamic Content

```typescript
const dynamic = layout<{ api: string }>((options) => {
  return async (page: string) => {
    // Fetch dynamic data
    const data = await fetch(options.api).then((r) => r.json());

    // Build dynamic content
    const menu = data.menu
      .map(
        (item) => `
      <a href="${item.url}">${item.title}</a>
    `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title}</title>
        </head>
        <body>
          <nav>${menu}</nav>
          <main>${page}</main>
        </body>
      </html>
    `;
  };
});
```

## Best Practices

1. **Structure**

   - Keep layouts modular
   - Use composition for reuse
   - Follow HTML5 semantics

2. **Performance**

   - Minimize dynamic content
   - Cache where possible
   - Load resources efficiently

3. **Maintainability**

   - Use TypeScript for options
   - Document layout behavior
   - Keep layouts focused

4. **Security**
   - Sanitize dynamic content
   - Validate options
   - Set security headers

## Examples

### Blog Layout

```typescript
interface BlogLayoutOptions {
  title: string;
  author: string;
  social: {
    twitter?: string;
    github?: string;
  };
}

const blog = layout<BlogLayoutOptions>((options) => {
  return (page: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${options.title}</title>
        <link rel="stylesheet" href="/blog.css">
      </head>
      <body>
        <header>
          <h1>${options.title}</h1>
          <p>By ${options.author}</p>
        </header>

        <main>${page}</main>

        <footer>
          ${
            options.social.twitter &&
            `<a href="https://twitter.com/${options.social.twitter}">Twitter</a>`
          }
          ${
            options.social.github &&
            `<a href="https://github.com/${options.social.github}">GitHub</a>`
          }
        </footer>
      </body>
    </html>
  `;
});
```

## Related Sections

- [Clean Layout](./clean.md) - Basic layout example
- [TWA Layout](./twa.md) - TWA layout example
- [Theme System](../styled/theme.md) - Theme integration
- [Styled Components](../styled/components.md) - Component styling

## Navigation

- Previous: [← TWA Layout](./twa.md)
- Next: [Home →](../readme.md)
