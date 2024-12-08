# HTML Module

The HTML module is responsible for template processing and HTML generation.

## Template Engine

### Basic Usage

```typescript
import { html, render } from "@reface/html";

// Basic template
const template = html`<div>Hello</div>`;
render(template); // => <div>Hello</div>

// With interpolation
const name = "World";
const greeting = html`<div>Hello, ${name}!</div>`;
render(greeting); // => <div>Hello, World!</div>
```

### Template Structure

```typescript
interface Template {
  tag: string;
  attributes: TemplateAttributes;
  children: ElementChild[];
  css?: string;
  script?: string;
  scriptFile?: string;
  isTemplate: true;
}

// Example
const template = {
  tag: "div",
  attributes: { class: "container" },
  children: ["Hello"],
  isTemplate: true,
};
```

## Security

### HTML Escaping

```typescript
// Content is escaped by default
const userInput = "<script>alert('xss')</script>";
html`<div>${userInput}</div>`;
// => <div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>

// Attributes are always escaped
html`<div data-value="${userInput}">Content</div>`;
// => <div data-value="&lt;script&gt;...">Content</div>
```

### Safe HTML

```typescript
// Explicitly mark content as safe
const trustedHTML = "<b>Bold</b>";
html`<div>${html(trustedHTML)}</div>`;
// => <div><b>Bold</b></div>

// Template fragments are safe
const header = html`<header>Site Header</header>`;
const footer = html`<footer>Site Footer</footer>`;

// Compose fragments
const page = html`
  ${header}
  <main>Content</main>
  ${footer}
`;
```

## Styles

### CSS Processing

```typescript
// Add styles to template
const template = html`<div class="${className}">Content</div>`;
template.css = `
  .${className} {
    color: blue;
  }
`;

// Styles are collected and deduplicated
render(template);
// => <div class="c1">Content</div>
//    <style>.c1 { color: blue; }</style>
```

## Scripts

### Script Handling

```typescript
// Inline scripts
const template = html`
  <div>
    <button onclick="handleClick()">Click me</button>
  </div>
`;
template.script = `
  function handleClick() {
    console.log('Clicked!');
  }
`;

// External scripts
const template = html`
  <div>
    <button onclick="init()">Initialize</button>
  </div>
`;
template.scriptFile = "/scripts/init.js";
```

## Performance

### Optimization

```typescript
// Reuse template fragments
const header = html`<header>Header</header>`;
const footer = html`<footer>Footer</footer>`;

// Multiple usage
const page1 = html`${header}
  <main>Page 1</main>
  ${footer}`;
const page2 = html`${header}
  <main>Page 2</main>
  ${footer}`;

// Styles and scripts are deduplicated automatically
```

## Best Practices

1. **Security**

   - Always escape user input
   - Use html`` for trusted content
   - Validate external HTML

2. **Performance**

   - Reuse template fragments
   - Cache processed styles
   - Minimize string operations

3. **Maintainability**

   - Keep templates small
   - Use meaningful class names
   - Document complex templates

4. **Type Safety**
   - Use TypeScript strict mode
   - Define proper interfaces
   - Validate template structure
