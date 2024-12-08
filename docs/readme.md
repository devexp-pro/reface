# Reface 🎭

Reface is a type-safe template engine for HTML with JSX support.

## Installation

```bash
# Using npm
npm install @reface/html @reface/elements

# Using Deno
import { html } from "@reface/html";
```

## Quick Start

```typescript
import { div, h1 } from "@reface/elements";

// Creating elements
div()`Hello world`; // => <div>Hello world</div>

// With attributes
div({ class: "container" })`Content`; // => <div class="container">Content</div>

// Nested elements
div()`
  ${h1`Title`}
  ${p`Content`}
`; // => <div><h1>Title</h1><p>Content</p></div>

// With JSX
function Greeting({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}
```

## Core Concepts

### [HTML](./html.md)

Core template engine:

```typescript
import { html, render } from "@reface/html";

// Safe by default
const template = html`<div>${userInput}</div>`;

// Render to string
render(template);
```

### [Elements](./elements.md)

Functional approach to creating HTML elements:

```typescript
import { div, span } from "@reface/elements";
// or import all elements
import * from "@reface/elements";

// Empty element
div()``; // => <div></div>

// With attributes
div({ class: "container" })``; // => <div class="container"></div>

// With text
div()`Hello`; // => <div>Hello</div>
```

### [JSX](./jsx.md)

JSX syntax support:

```typescript
import { createElement } from "@reface/jsx";

function Button({ text }: { text: string }) {
  return <button class="btn">{text}</button>;
}

// Usage
<Button text="Click me" />;
```

### [Styled Components](./elements@styled.md)

Type-safe CSS-in-JS:

```typescript
import { styled } from "@reface/elements";

const Button = styled.button`
  & {
    background: blue;
    color: white;
  }
  &:hover {
    background: darkblue;
  }
`;

// Usage
Button({ class: "primary" })`Click me`;
```

## Security

- Automatic HTML escaping
- Type-safe attributes
- XSS protection by default

## Documentation

- [Architecture](./architecture.md)
- [Elements API](./elements.md)
- [Styled Components](./elements@styled.md)
- [JSX](./jsx.md)
