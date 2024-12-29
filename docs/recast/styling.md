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
import { styled } from "@reface/recast";
```

Recast provides built-in CSS-in-JS solution for styling NodeProxies and components.

## Basic Usage

```typescript
import { styled } from "@reface/styled";

// Basic styled Template
const Button = styled.button/*css*/ `
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

// Style existing Template
const StyledDiv = styled(div)/*css*/ `
  & {
    padding: 1rem;
    margin: 1rem;
  }
`;

// Style Component that accepts class prop
const Card = component(
  (props: Props, children: Children) => div({ class: props.class })`${children}`
);

const StyledCard = styled(Card)/*css*/ `
  & {
    border: 1px solid #eee;
    border-radius: 4px;
  }
`;
```

## Style Composition

Combine and extend styles:

```typescript
// Extend any styled Template
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
```

## Plugin Integration

StyledPlugin handles style injection:

```typescript
import { RefaceComposer } from "@reface/recast";
import { StyledPlugin } from "@reface/recast";

const composer = new RefaceComposer();
composer.use(new StyledPlugin());

// Now styles will be automatically collected and injected
const html = composer.render(Card`Content`);
// <style>.s1a {...}</style>
// <div class="s1a">Content</div>
```

## Key Features

1. **Universal Styling**

   - Style any Template
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
