# Elements API

Elements API provides a functional approach to creating HTML elements with full TypeScript support.

## Basic Usage

### Creating Elements

```typescript
import { div, span, button } from "@vseplet/reface/dom";

// Simple element
div()`Hello World`;

// With attributes
button({
  class: "primary",
  onClick: "handleClick()",
  disabled: true,
})`Click me`;

// Nested elements
div({ class: "card" })`
  ${h1()`Title`}
  ${p()`Content`}
`;
```

## Element Types

### HTML Elements

```typescript
// Block elements
div({ id: "main" })`Content`;
p({ class: "text" })`Paragraph`;
section({ role: "region" })`Section content`;

// Inline elements
span({ class: "highlight" })`Text`;
em()`Emphasized`;
strong()`Important`;
```

### Form Elements

```typescript
// Input elements
input({
  type: "email",
  required: true,
  placeholder: "Enter email",
  pattern: "[^@]+@[^@]+.[^@]+",
})``;

// Select elements
select({ name: "options" })`
  ${option({ value: "1" })`Option 1`}
  ${option({ value: "2" })`Option 2`}
`;

// Form structure
form({ onSubmit: "handleSubmit(event)" })`
  ${label({ for: "name" })`Name:`}
  ${input({ id: "name", name: "name", required: true })`}`}
  ${button({ type: "submit" })`Submit`}
`;
```

### Media Elements

```typescript
// Images
img({
  src: "/image.jpg",
  alt: "Description",
  loading: "lazy",
  width: "300",
  height: "200",
})``;

// Video
video({
  src: "/video.mp4",
  controls: true,
  autoplay: false,
})``;

// Audio
audio({
  src: "/audio.mp3",
  controls: true,
})``;
```

### SVG Elements

```typescript
svg({
  viewBox: "0 0 100 100",
  width: "100",
  height: "100",
})`
  ${circle({
    cx: "50",
    cy: "50",
    r: "40",
    fill: "blue",
  })`}`
`;
```

## Attributes

### HTML Attributes

```typescript
// Global attributes
div({
  id: "unique",
  class: "container large",
  title: "Tooltip text",
  hidden: true,
})`Content`;

// Data attributes
div({
  "data-id": "123",
  "data-type": "user",
  "data-test": "container",
})`Content`;
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
})`
  ${h2({ id: "title" })`Dialog Title`}
  ${p({ id: "description" })`Dialog content...`}
`;
```

### Event Handlers

```typescript
// Click events
button({
  onClick: "handleClick(event)",
  onDblClick: "handleDoubleClick(event)",
})`Click me`;

// Form events
input({
  onInput: "handleInput(event)",
  onChange: "handleChange(event)",
  onFocus: "handleFocus(event)",
  onBlur: "handleBlur(event)",
})``;
```

## Type Safety

### Element Type Definitions

```typescript
// Element factory type
type ElementFactory<A extends Attributes = Attributes> = {
  (attributes?: A): TemplateFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};

// Attribute types
interface HTMLAttributes {
  class?: string;
  id?: string;
  style?: string | StyleObject;
  [key: `data-${string}`]: string;
}

interface AriaAttributes {
  role?: string;
  [key: `aria-${string}`]: string | boolean | number;
}
```

### Typed Elements

```typescript
// Input element with specific attributes
const searchInput = input({
  type: "search", // autocomplete for input types
  required: true,
  minLength: 3,
  maxLength: 50,
  pattern: "[a-zA-Z]+",
})``;

// Button with event handler
const submitButton = button({
  type: "submit", // "submit" | "button" | "reset"
  disabled: false,
  onClick: "handleClick(event)",
})`Submit`;
```

## Best Practices

1. **Element Creation**

   - Create elements outside render functions
   - Use meaningful names for elements
   - Keep element definitions clean

2. **Attributes**

   - Use TypeScript for attribute validation
   - Group related attributes together
   - Follow HTML standards

3. **Performance**

   - Reuse element definitions
   - Minimize nested elements
   - Use appropriate element types

4. **Accessibility**
   - Include ARIA attributes
   - Use semantic HTML elements
   - Provide proper labels

For more information, see:

- [Attributes](./attributes.md)
- [Components](../core/components.md)
