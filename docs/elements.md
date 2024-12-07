# Elements

The Elements module provides a functional approach to creating HTML elements with template literals.

## Basic Usage

```typescript
import { div, span } from "@reface/elements";

// Empty element
div()``; // => <div></div>

// With attributes
div({ class: "container" })``; // => <div class="container"></div>

// With text content
div()`Hello world`; // => <div>Hello world</div>

// With nested elements
div()`
  ${span()`First`}
  ${span()`Second`}
`; // => <div><span>First</span><span>Second</span></div>
```

## Element Factory

### Creating Elements

```typescript
// Basic element
const container = div({ class: "container" });
const button = button({ type: "submit" });

// Usage
container`
  ${button`Submit`}
`;

// Direct usage
div({ id: "root" })`Content`;
```

### HTML Attributes

```typescript
// Global attributes
div({
  id: "main",
  class: "container",
  title: "Main content",
  hidden: true,
})`Content`;

// Element-specific attributes
button({
  type: "submit",
  disabled: true,
  form: "login-form",
})`Submit`;

// Data attributes
div({
  "data-id": "123",
  "data-testid": "container",
  "data-user-role": "admin",
})`Content`;

// ARIA attributes
button({
  role: "tab",
  "aria-selected": true,
  "aria-controls": "panel-1",
})`Tab 1`;
```

## Children

### Text Content

```typescript
// Simple text
p()`Hello world`;

// Interpolation
const name = "World";
p()`Hello, ${name}!`;

// Numbers and other primitives
div()`Count: ${42}`;
div()`Active: ${true}`;
```

### Nested Elements

```typescript
// Basic nesting
div()`
  ${h1()`Title`}
  ${p()`Content`}
`;

// Complex structure
div({ class: "card" })`
  ${div({ class: "card-header" })`
    ${h2()`Card Title`}
  `}
  ${div({ class: "card-body" })`
    ${p()`Card content`}
    ${button({ class: "btn" })`Click me`}
  `}
`;
```

### Dynamic Content

```typescript
// Conditional rendering
div()`
  ${condition ? span()`True` : span()`False`}
`;

// List rendering
ul()`
  ${items.map((item) => li()`${item}`)}
`;

// Fragments
div()`
  ${[span()`First`, span()`Second`, span()`Third`]}
`;
```

## Type Safety

### HTML Attributes

```typescript
// Type-safe attributes
button({
  type: "submit", // Only valid button types
  disabled: true, // Must be boolean
  "aria-pressed": true, // Valid ARIA attribute
})`Submit`;

// Invalid attributes caught at compile time
button({
  invalid: true, // Error: Property 'invalid' does not exist
})``;

// Element-specific attributes
input({
  type: "email", // Only valid input types
  required: true,
  pattern: "[^@]+@[^@]+\\.[^@]+",
})``;
```

### Content Types

```typescript
// Type-safe children
type ElementChild = string | number | boolean | Template | null | undefined;

// Valid children
div()`
  ${42} // number
  ${true} // boolean
  ${span()`Text`} // Template
  ${null} // ignored
  ${undefined} // ignored
`;
```

## Security

### XSS Prevention

```typescript
// Safe by default
div()`${userInput}`; // Content is escaped

// Explicit trust
import { html } from "@reface/html";
div()`${html(trustedHTML)}`; // Content is not escaped

// Attributes are always escaped
div({
  "data-value": userInput, // Automatically escaped
})``;
```

## Best Practices

1. **Element Creation**

   - Create elements outside render functions
   - Use meaningful names
   - Keep element definitions clean

2. **Type Safety**

   - Use TypeScript strict mode
   - Define custom attribute types
   - Follow HTML standards

3. **Performance**

   - Reuse element definitions
   - Minimize nesting
   - Use appropriate element types

4. **Security**
   - Always escape user input
   - Use proper ARIA attributes
   - Follow accessibility guidelines
     </rewritten_file>
