---
title: RecastTemplate API
description: Core API for creating and manipulating templates through a convenient proxy interface in Recast
tags: [templates, core, html]
category: Core APIs
sidebar: main
order: 1
---

# RecastTemplate API

RecastTemplate is the key abstraction in Recast that provides a powerful and flexible way to create HTML templates through a proxy interface.

## Key Features

1. **Proxy Interface**

   - Method chaining
   - Attribute access via proxy
   - Built-in manipulation methods
   - Extensible API through custom methods

2. **Immutability**

   - Each operation creates a new instance
   - Safe template reuse
   - Predictable behavior
   - No side effects

3. **Template Literals Syntax**

   - Native template string syntax
   - Children interpolation
   - Automatic escaping
   - HTML content support

4. **Type Safety**
   - Full TypeScript support
   - Attribute validation
   - Typed methods
   - Type inference

## Basic Usage

```typescript
import { div, a } from "@reface/recast/elements";

// Create template
const base = div({ class: "container" });

// Add attributes (creates new template)
const withId = base({ id: "main" });

// Add content (creates new template)
const withContent = base`Hello world`;

// Chain operations (each creates new template)
const link = a({ href: "/" }).setData("key", "value").addClass("active")`Home`;
```

## Advantages

1. **Composition**

   ```typescript
   // Base template
   const baseButton = button({ class: "btn" });

   // Variants (each is a new template)
   const primaryButton = baseButton({ class: "primary" });
   const secondaryButton = baseButton({ class: "secondary" });
   const largeButton = baseButton({ class: "large" });
   ```

2. **Reusability**

   ```typescript
   // One template - multiple instances
   const card = div({ class: "card" });

   const cards = [
     card`Content 1`,
     card`Content 2`,
     card({ id: "special" })`Content 3`,
   ];
   ```

3. **Security**

   ```typescript
   const userInput = '<script>alert("XSS")</script>';

   // Automatic escaping
   div`${userInput}`;

   // Explicit trusted HTML
   div`${html`<b>Safe HTML</b>`}`;
   ```

4. **Extensibility**
   ```typescript
   const Button = createElementFactory({
     type: "element",
     methods: {
       // Custom methods
       primary: ({ raw }) => ({
         class: "btn-primary",
       }),
       loading: ({ raw }, isLoading: boolean) => ({
         disabled: isLoading,
         "data-loading": String(isLoading),
       }),
     },
   });
   ```

# Core Imports

```typescript
// HTML elements
import {
  div,
  span,
  p,
  a,
  button,
  input,
  form,
  img /* etc */,
} from "@reface/recast/elements";

// Core functionality
import {
  html, // For trusted HTML content
  component, // For creating components
  element, // For creating custom elements
  styled, // For styled templates
} from "@reface/recast";
```

# API Overview

## Template Creation and Manipulation

### Basic Operations

```typescript
// Create template
const template = div({ class: "container" });

// Add attributes (creates new template)
template({ id: "main" });

// Add content (creates new template)
template`Hello world`;

// Chain operations (each creates new template)
template({ class: "active" })`Content`;
```

## Content Management

### Children Types

```typescript
type RecastTemplateChildren =
  | RecastTemplate // Other templates
  | TextContent // Strings, numbers
  | HtmlContent; // Trusted HTML

// Examples
div`
  ${"Plain text"}                    // TextContent
  ${42}                             // TextContent (converted)
  ${button`Click me`}               // RecastTemplate
  ${html`<b>Bold</b>`}              // HtmlContent
`;
```

### Content Safety

```typescript
// Automatic escaping
const unsafe = '<script>alert("XSS")</script>';
div`${unsafe}`; // Safely escaped

// Trusted HTML content
const safe = "<b>Bold</b>";
div`${html`${safe}`}`; // Rendered as HTML
```

## Attribute Handling

### Class Attributes

```typescript
div({
  class: "button primary", // String
  class: ["button", "primary"], // Array
  class: {
    // Object with flags
    button: true,
    primary: true,
    disabled: false,
  },
  // Combined
  class: ["button", { primary: true }, condition && "active"],
});
```

### Style Attributes

```typescript
div({
  style: "color: red", // String
  style: ["color: red", "width: 100%"], // Array
  style: {
    // Object (camelCase)
    color: "red",
    backgroundColor: "blue",
    fontSize: "16px",
  },
});
```

### Data Attributes

```typescript
div({
  "data-id": "123",
  "data-type": "button",
  "data-config": JSON.stringify({ key: "value" }),
});
```

## TypeScript Integration

```typescript
// Custom attributes interface
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "large";
  disabled?: boolean;
}

// Typed template
const button = createElement<ButtonProps>("button");

// Type checking
button({ variant: "primary" }); // ✓ OK
button({ variant: "invalid" }); // ✗ Error
button({ unknown: true }); // ✗ Error

// With HTML attributes
interface CardProps extends HTMLAttributes {
  variant?: "outlined" | "filled";
}

const Card = createElement<CardProps>("div");
```
