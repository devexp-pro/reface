# HTML Module

The HTML module provides low-level utilities for HTML string manipulation with built-in security features.

## HTML Templates

### Basic Usage

```typescript
import { html } from "@reface/html";

// Safe by default - content is escaped
const userInput = "<script>alert('xss')</script>";
html`<div>${userInput}</div>`;
// => <div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>

// Explicit trust for safe HTML
const trustedHTML = "<span>Safe content</span>";
html`<div>${html(trustedHTML)}</div>`;
// => <div><span>Safe content</span></div>
```

### Template Fragments

```typescript
// Create reusable fragments
const header = html`<header>Site Header</header>`;
const footer = html`<footer>Site Footer</footer>`;

// Compose fragments
const page = html`
  ${header}
  <main>Content</main>
  ${footer}
`;
```

## Attribute Processing

### Basic Attributes

```typescript
import { attributes } from "@reface/html";

// Process attribute object
const attrs = {
  class: "btn primary",
  disabled: true,
  "data-id": 123,
};

attributes(attrs);
// => class="btn primary" disabled data-id="123"

// Boolean attributes
attributes({ hidden: true }); // => hidden
attributes({ hidden: false }); // => ""
```

### Data Attributes

```typescript
const dataAttrs = {
  "data-id": "user-123",
  "data-role": "admin",
  "data-permissions": JSON.stringify(["read", "write"]),
};

attributes(dataAttrs);
// => data-id="user-123" data-role="admin" data-permissions="[\"read\",\"write\"]"
```

## Style Processing

### Basic Styles

```typescript
import { processStyles } from "@reface/html";

// Process CSS string
const css = processStyles`
  & {
    color: blue;
    background: white;
  }
  &:hover {
    background: lightblue;
  }
`, "c1");

// => .c1 { color: blue; background: white; }
// => .c1:hover { background: lightblue; }
```

### Class Names

```typescript
import { classNames, generateClassName } from "@reface/html";

// Combine class names
classNames("btn", "primary", isActive && "active");
// => "btn primary active"

// Generate unique class
const className = generateClassName(); // => "c1234ab"
```

## Security

### HTML Escaping

```typescript
import { escapeHTML } from "@reface/html";

// Escape HTML special characters
escapeHTML('<div class="test">');
// => &lt;div class=&quot;test&quot;&gt;

// Escape attribute values
escapeAttribute('"><script>alert(1)</script>');
// => &quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;
```

### Safe HTML

```typescript
// Content is escaped by default
html`<div>${userContent}</div>`;

// Explicitly mark content as safe
const trusted = "<b>Bold</b>";
html`<div>${html(trusted)}</div>`;

// Nested templates are processed safely
const nested = html`
  <div>${html`<span>${escapeHTML(user.name)}</span>`}</div>
`;
```

## Type Safety

### Template Types

```typescript
// Template fragment type
interface TemplateFragment {
  type: "fragment";
  content: string;
}

// Type guard
function isTemplateFragment(value: unknown): value is TemplateFragment {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "fragment"
  );
}
```

### Style Types

```typescript
// Style interpolation types
type StyleInterpolation = string | number | boolean | undefined | null;

// Process styles with type checking
processStyles`
  & {
    width: ${100}px;
    display: ${true ? "block" : "none"};
  }
`;
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

3. **Type Safety**
   - Use TypeScript strict mode
   - Check template types
   - Validate attribute values
