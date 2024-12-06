# DOM Elements API in Reface

DOM Elements API provides a functional approach to creating HTML elements with type safety and utility helpers.

## Basic Elements

### Creating Elements

Each HTML element is represented by a function that accepts attributes and returns a template literal:

```typescript
import { div, span, a, button } from "@vseplet/reface/dom";

// Simple div
div()`Hello World`;

// Div with attributes
div({ id: "greeting", class: "message" })`Hello World`;

// Nested elements
div({ class: "card" })`
  ${h1()`Title`}
  ${p()`Content`}
  ${button({ onClick: "alert('clicked')" })`Click me`}
`;
```

## Class Utilities

### Class Management

The built-in `class` attribute supports both string values and conditional objects:

### Class Examples

```typescript
import { div } from "@vseplet/reface/dom";

// Simple string value
div({ class: "card" })`Content`;

// Multiple classes
div({ class: "card primary large" })`Content`;

// Conditional classes via object
div({
  class: {
    card: true,
    active: isActive,
    disabled: isDisabled,
    loading: isLoading,
  },
})`Content`;

// Combining strings and objects
div({
  class: [
    "card", // base class
    props.className, // classes from props
    {
      "card--active": isActive,
      "card--disabled": isDisabled,
    },
    size && `card--${size}`, // conditional class with modifier
    {
      "card--loading": isLoading,
      "card--error": hasError,
    },
  ],
})`Content`;

// Practical button component example
const Button = component<{
  primary?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}>(
  ({
    primary = false,
    size = "medium",
    disabled = false,
    loading = false,
    className,
  }) =>
    button({
      class: [
        "button", // base class
        className, // external classes
        `button--${size}`, // size modifier
        {
          "button--primary": primary, // button variant
          "button--disabled": disabled,
          "button--loading": loading,
        },
      ],
      disabled,
    })`${loading ? "Loading..." : "Click me"}`
);

// Using Button component
const App = component(
  () => div()`
    ${Button({ primary: true, size: "large" })}
    ${Button({ disabled: true })}
    ${Button({ loading: true, className: "custom-button" })}
  `
);
```

## Working with Styles

### Style Management

The built-in `style` attribute supports both string values and objects for defining inline styles:

```typescript
import { div } from "@vseplet/reface/dom";

// Simple string value
div({ style: "background: white; padding: 1rem;" })`Content`;

// Using object for styles
div({
  style: {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
})`Content`;

// Dynamic styles
const Button = component<{ primary?: boolean }>(
  ({ primary }) =>
    button({
      style: {
        background: primary ? "blue" : "gray",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
      },
    })`Click me`
);

// Using Button component
const App = component(
  () => div()`
    ${Button({ primary: true })}
    ${Button({ primary: false })}
  `
);
```

### Style Examples

```typescript
// Basic usage
div({ style: "color: red; font-size: 16px;" }); // => style="color: red; font-size: 16px;"

// Using object
div({ style: { color: "red", fontSize: "16px" } }); // => style="color: red; font-size: 16px;"

// Dynamic styles
const isActive = true;
div({
  style: {
    color: isActive ? "green" : "red",
    fontWeight: isActive ? "bold" : "normal",
  },
}); // => style="color: green; font-weight: bold;"

// Combining strings and objects
div({
  style: ["display: flex;", { justifyContent: "center", alignItems: "center" }],
}); // => style="display: flex; justify-content: center; align-items: center;"

// Practical examples
const Card = component<{ highlighted?: boolean }>(
  ({ highlighted }) =>
    div({
      style: {
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        border: highlighted ? "2px solid blue" : "none",
      },
    })`Card Content`
);

const Badge = component<{ count: number }>(
  ({ count }) =>
    span({
      style: {
        display: "inline-block",
        padding: "0.25rem 0.5rem",
        background: count > 0 ? "red" : "gray",
        color: "white",
        borderRadius: "12px",
      },
    })`${count}`
);
```

## Type Safety

The DOM API is fully typed, providing type safety and IDE autocompletion:

```typescript
// Typed input attributes
const SearchInput = component(
  () =>
    input({
      type: "search",
      placeholder: "Search...",
      required: true,
      minLength: 3,
      "aria-label": "Search input",
    })``
);

// Typed link attributes
const Link = component(
  () =>
    a({
      href: "https://example.com",
      target: "_blank",
      rel: "noopener noreferrer",
    })`Visit site`
);
```

## Event Handling

DOM API supports all standard HTML events:

```typescript
const InteractiveButton = component(
  () =>
    button({
      onClick: "handleClick(event)",
      onMouseEnter: "handleHover(event)",
      onMouseLeave: "handleLeave(event)",
    })`Hover me`
);
```

## ARIA and Accessibility

DOM API includes support for ARIA attributes to create accessible components:

```typescript
const Modal = component(
  () =>
    div({
      role: "dialog",
      "aria-modal": true,
      "aria-labelledby": "modal-title",
      "aria-describedby": "modal-content",
    })`
      ${h2({ id: "modal-title" })`Modal Title`}
      ${div({ id: "modal-content" })`Modal content`}
    `
);
```

## Conclusion

The DOM Elements API in Reface provides a powerful and flexible foundation for building web interfaces. Its key strengths include:

### Type Safety

- Full TypeScript support for all HTML elements and attributes
- Compile-time checking of props and attributes
- IDE autocompletion and documentation

### Flexibility

- Functional approach to element creation
- Support for both string and object-based styling
- Easy composition of elements and components

### Performance

- Minimal runtime overhead
- Efficient updates through template caching
- Small bundle size with tree-shaking support

### Developer Experience

- Intuitive API that follows HTML conventions
- Comprehensive attribute type definitions
- Built-in support for accessibility features

### Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use composition for complex interfaces
   - Maintain clear separation of concerns

2. **Type Safety**

   - Always define proper types for component props
   - Utilize TypeScript's type inference
   - Keep type definitions up to date

3. **Performance**

   - Create element factories outside render functions
   - Use memoization for expensive computations
   - Avoid unnecessary nesting of elements

4. **Accessibility**
   - Include proper ARIA attributes
   - Maintain semantic HTML structure
   - Test with screen readers

The DOM Elements API serves as a foundation for other Reface APIs like Styled Components and JSX support, providing a consistent and powerful way to build modern web applications.
