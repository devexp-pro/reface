# HTML Attributes

Reface provides a type-safe way to work with HTML attributes through its attributes system.

## Basic Usage

### HTML Attributes

```typescript
import { div, button } from "@vseplet/reface/dom";

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
```

### Data Attributes

```typescript
// Simple data attributes
div({
  "data-id": "123",
  "data-type": "user",
  "data-testid": "user-card",
})`User info`;

// Nested data attributes
div({
  "data-user-id": "123",
  "data-user-role": "admin",
})`Admin panel`;
```

### ARIA Attributes

```typescript
// ARIA roles and states
button({
  role: "tab",
  "aria-selected": true,
  "aria-controls": "panel-1",
})`Tab 1`;

// ARIA labels
div({
  role: "dialog",
  "aria-labelledby": "title",
  "aria-describedby": "description",
})`Dialog content`;
```

## Type System

### Base Attributes

```typescript
interface HTMLAttributes {
  // Global attributes
  id?: string;
  class?: string | ClassValue;
  style?: string | StyleValue;
  title?: string;
  hidden?: boolean;

  // Data attributes
  [key: `data-${string}`]: string;

  // ARIA attributes
  role?: string;
  [key: `aria-${string}`]: string | boolean | number;
}
```

### Element-Specific Attributes

```typescript
interface ButtonAttributes extends HTMLAttributes {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formmethod?: "get" | "post";
  name?: string;
  value?: string;
}

interface InputAttributes extends HTMLAttributes {
  type?: "text" | "password" | "email" | "number" | /* ... */;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}
```

## Event Handlers

### Basic Events

```typescript
// Click events
button({
  onClick: "handleClick(event)",
  onDblClick: "handleDoubleClick(event)",
})`Click me`;

// Mouse events
div({
  onMouseEnter: "handleMouseEnter(event)",
  onMouseLeave: "handleMouseLeave(event)",
})`Hover me`;
```

### Form Events

```typescript
// Input events
input({
  onInput: "handleInput(event)",
  onChange: "handleChange(event)",
  onFocus: "handleFocus(event)",
  onBlur: "handleBlur(event)",
})``;

// Form submission
form({
  onSubmit: "handleSubmit(event)",
  onReset: "handleReset(event)",
})`Form content`;
```

## HTMX Integration

### Basic HTMX Attributes

```typescript
// GET request
button({
  "hx-get": "/api/data",
  "hx-target": "#result",
  "hx-swap": "innerHTML",
})`Load data`;

// POST request with trigger
form({
  "hx-post": "/api/submit",
  "hx-trigger": "submit",
  "hx-indicator": "#spinner",
})`Form content`;
```

### Advanced HTMX Usage

```typescript
// Complex triggers
div({
  "hx-get": "/api/data",
  "hx-trigger": "every 2s",
  "hx-target": "#result",
})`Auto-updating content`;

// Request headers
button({
  "hx-get": "/api/data",
  "hx-headers": '{"X-Custom": "value"}',
})`Load with headers`;
```

## Best Practices

1. **Type Safety**

   - Use TypeScript interfaces for attributes
   - Leverage autocomplete for attributes
   - Follow HTML standards

2. **Event Handling**

   - Keep event handlers simple
   - Use consistent naming
   - Document complex interactions

3. **ARIA Support**

   - Include proper ARIA attributes
   - Test with screen readers
   - Follow accessibility guidelines

4. **Performance**
   - Minimize attribute changes
   - Use data attributes sparingly
   - Cache complex attribute objects

For more information, see:

- [Elements API](./elements.md)
- [JSX Types](../jsx/types.md)
