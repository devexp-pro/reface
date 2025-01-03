---
title: Styling System
description: Built-in CSS-in-JS solution for Recast components
tags: [styling, css, css-in-js]
category: Features
sidebar: main
order: 4
---

Import from:

```typescript
import { styled, css } from "@reface/recast";
```

Recast provides built-in CSS-in-JS solution for styling NodeProxies and components.

## Basic Usage

```typescript
import { styled } from "@reface/styled";

// Basic styled NodeProxy
const Button = styled.button/*css*/ `
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

// Style existing NodeProxy
const StyledDiv = styled(div)/*css*/ `
  & {
    padding: 1rem;
    margin: 1rem;
  }
`;

// Style Component that accepts class prop
const Card = component(
  (props) => div({ class: props.class })`${props.children}`
);

const StyledCard = styled(Card)/*css*/ `
  & {
    border: 1px solid #eee;
    border-radius: 4px;
  }
`;
```

## Direct CSS API

For more control, use the CSS API directly:

```typescript
import { css } from "@reface/styled";

const style = css/*css*/ `
  & {
    color: red;
  }
`;

// Get generated class name
const className = style.getRootClass(); // "s1a"

// Access raw style data
const rawData = style.raw.payload.styled;
// {
//   css: ".s1a { color: red; }",
//   className: "s1a",
//   ...
// }

// Use in any NodeProxy or Component that accepts class
div({ class: className })`Content`;
Card({ class: className })`Content`;
```

## Style Composition

Combine and extend styles:

```typescript
// Extend any styled NodeProxy
const PrimaryButton = styled(Button)/*css*/ `
  & {
    background: green;
  }
`;

// Extend Component
const PrimaryCard = styled(Card)/*css*/ `
  & {
    border-color: blue;
  }
`;

// Compose multiple styles
const style1 = css/*css*/ `
  & {
    color: red;
  }
`;
const style2 = css/*css*/ `
  & {
    background: blue;
  }
`;

// Use with any NodeProxy/Component that accepts class
div({
  class: [style1.getRootClass(), style2.getRootClass()],
})`Content`;

Card({
  class: [style1.getRootClass(), style2.getRootClass()],
})`Content`;
```

## Plugin Integration

StyledPlugin handles style injection:

```typescript
import { RefaceComposer } from "@reface/recast";
import { StyledPlugin } from "@reface/styled";

const composer = new RefaceComposer();
composer.use(new StyledPlugin());

// Now styles will be automatically collected and injected
const html = composer.render(Card({ class: style.getRootClass() })`Content`);
// <style>.s1a {...}</style>
// <div class="s1a">Content</div>
```

## Key Features

1. **Universal Styling**

   - Style any NodeProxy
   - Style any Component that accepts class
   - Consistent API across all types

2. **Scoped Styles**

   - Unique class names
   - No style conflicts
   - Automatic CSS injection

3. **CSS Syntax**

   - Full CSS support
   - Nested selectors
   - Pseudo-classes
   - Media queries

4. **Performance**
   - Style deduplication
   - Minimal runtime overhead
   - Optimized class generation
