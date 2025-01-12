---
title: HTML API
description: Low-level HTML string creation API with safety features
tags: [html, api, safety, strings]
category: Core APIs
sidebar: main
order: 2
---

# HTML API

The HTML API provides low-level functions for HTML string creation and manipulation.

## Core Functions

### html Template Literal

Safe HTML string creation with automatic escaping:

```typescript
import { html } from "@reface/recast";

// Basic static HTML
html`<div>Hello World</div>`;

// With interpolation
const name = "John";
html`<div>Hello ${name}!</div>`;

// Safe by default
const unsafe = "<script>alert('xss')</script>";
html`<div>${unsafe}</div>`;
// <div>&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;</div>
```

### css Template Literal

Direct CSS string creation:

```typescript
import { css } from "@reface/recast";

const style = css/*css*/ `
  & {
    color: red;
  }
`;

// Get root class name
style.rootClass; // "s1a"

// Get CSS styles string
style.styles; // ".s1a { color: red; }"

// Get style tag
style.styleTag; // "<style>.s1a { color: red; }</style>"

// Use with html
html`<div class="${style.rootClass}">Content ${style.styleTag}</div>`;
// <div class="s1a">Content <style>.s1a { color: red; }</style></div>
```

### Function Components

Simple functions that return HTML strings:

```typescript
type ButtonProps = {
  variant: string;
};

const Button = (props: ButtonProps, children: Children) => {
  return html`<button class="btn ${props.variant}">${children}</button>`;
};

// Use directly
Button({ variant: "primary" }, "Click me");
```

## Helper Functions

### attrs

Build HTML attributes string:

```typescript
import { attrs } from "@reface/recast";

attrs({
  class: "btn primary",
  "data-id": "123",
  disabled: true,
});
// class="btn primary" data-id="123" disabled
```

### classes

Combine class names:

```typescript
import { classes } from "@reface/recast";

classes(
  "btn",
  {
    primary: true,
    disabled: false,
  },
  ["large", "rounded"]
);
// "btn primary large rounded"
```

### styles

Create style string:

```typescript
import { styles } from "@reface/recast";

styles({
  color: "red",
  fontSize: "14px",
  marginTop: "10px",
});
// "color: red; font-size: 14px; margin-top: 10px"
```

## Best Practices

1. **Use html`` for Safe String Creation**

   ```typescript
   // ✓ Good - automatic escaping
   html`<div>${userInput}</div>`;
   ```

2. **Use Simple Functions for Reusable Logic**

   ```typescript
   // ✓ Good - simple and type-safe
   const Card = (props: CardProps, children: string) => {
     return html` <div class="card">${children}</div> `;
   };
   ```

3. **Use Helpers for Complex Attributes**
   ```typescript
   // ✓ Good - clean and maintainable
   html`<div
     ${attrs({
       class: classes("card", { active: isActive }),
       style: styles({ color: theme.color }),
     })}
   >
     ${content}
   </div>`;
   ```

## See Also

- [JSX](./jsx.md) - High-level component syntax
- [Template](./templates.md) - Higher-level template syntax
- [Components](./components.md) - Component-based architecture
- [Styling](./styling.md) - CSS-in-JS solution
- [Render](./render.md) - how to render to HTML
