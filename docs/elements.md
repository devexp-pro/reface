# Elements

The Elements module provides a functional approach to creating HTML elements with template literals.

## Basic Usage

```typescript
import { div, span } from "@reface/elements";

// Basic element
div()`Content`; // => <div>Content</div>

// With attributes
div({ class: "container" })`Content`; // => <div class="container">Content</div>

// Nested elements
div()`
  ${span`First`}
  ${span`Second`}
`; // => <div><span>First</span><span>Second</span></div>
```

## Components

### Creating Components

```typescript
import { component } from "@reface/elements";

// Basic component
const Button = component(() => div({ class: "btn" })`Click me`);

// With scripts
const Counter = component(
  () => div`
    <span id="count">0</span>
    <button onclick="increment()">+</button>
  `,
  {
    script: js`
      function increment() {
        const count = document.getElementById('count');
        count.textContent = Number(count.textContent) + 1;
      }
    `,
  }
);

// With external scripts
const ExternalCounter = component(
  () => div`
    <span id="count">0</span>
    <button onclick="increment()">+</button>
  `,
  {
    scriptFile: "/counter.js",
  }
);
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

## Type Safety

### HTML Attributes

```typescript
// Type-safe attributes
button({
  type: "submit", // Only valid button types
  disabled: true, // Must be boolean
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
