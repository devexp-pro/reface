---
title: JSX Support
description: JSX syntax support for Recast template engine
tags: [jsx, templates, syntax]
category: Core APIs
sidebar: main
order: 2
---

Import from:

```typescript
import /* types */ "@reface/recast/jsx-runtime";
```

JSX provides a familiar syntax for Template creation, but it's just syntactic sugar over Template API calls.

## Configuration

Configure JSX support in your project:

```json
// deno.json/tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@reface/recast"
  }
}
```

## Basic Usage

JSX syntax is transformed into Template API calls:

```typescript
// JSX syntax
const Element = (
  <div class="container">
    <button type="submit">Click me</button>
  </div>
);

// Compiles to Template API calls
const Element = div({ class: "container" })`
  ${button({ type: "submit" })`Click me`}
`;
```

## Fragments

JSX Fragments are converted to Fragment nodes:

```typescript
// Fragment syntax
const Fragment = (
  <>
    <span>First</span>
    <span>Second</span>
  </>
);

// Compiles to:
const Fragment = {
  type: "fragment",
  children: [span`First`, span`Second`],
  meta: {},
};
```

## Component Usage

Components can be used with JSX syntax:

```tsx
// Define component
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "large";
  disabled?: boolean;
}

const Button = component<ButtonProps>((props, children: Children) => (
  <button
    class={[
      "button",
      `button-${props.variant}`,
      props.size && `button-${props.size}`,
    ]}
    disabled={props.disabled}
  >
    {children}
  </button>
));

// Use in JSX
const App = (
  <div>
    <Button variant="primary" size="large" disabled={true}>
      Click me
    </Button>
  </div>
);

// Compiles to
const App = div`
  ${Button({ variant: "primary", size: "large", disabled: true })`Click me`}
`;
```

## Key Differences from React

1. No hooks or state management
2. All components are server-side rendered
3. No dynamic component types
4. Props are passed directly, no special handling
5. Children are always second argument
6. No virtual DOM diffing
7. No event handlers (server-side only)

## Best Practices

1. Use JSX for complex nested structures
2. Use template literals for simple content
3. Mix JSX and template literals as needed
4. Keep components pure and stateless
5. Use data attributes for client interactions
