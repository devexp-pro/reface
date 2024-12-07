# API Reference

## Elements Module

The Elements module provides factory functions for creating HTML elements with a flexible API.

### Basic Element Usage

```typescript
import { div, span } from "@reface/elements";
import { globalRegister } from "@reface/elements";
globalRegister();

// Basic element with no attributes or children
div(); // => Template<"div">
span(); // => Template<"span">

// Element with attributes
div({ class: "container" }); // => Template<"div"> with class="container"

// Element with template literal children
div()`Hello world`; // => Template<"div"> with children: ["Hello world"]

// Element with attributes and template literal children
div({ class: "container" })`Hello world`; // => Template<"div"> with class="container", children: ["Hello world"]

// Element with multiple children
div()`
  ${span`First`}  // => Template<"span"> with children: ["First"]
  ${span`Second`}  // => Template<"span"> with children: ["Second"]
`; // => Template<"div"> with children: [Template<"span">, Template<"span">]

// Nested elements
div({ class: "container" })`
  ${div({ class: "row" })`
    ${div({
      class: "col",
    })`Content`}  // => Template<"div"> with class="col", children: ["Content"]
  `}  // => Template<"div"> with class="row", children: [Template<"div">]
`; // => Template<"div"> with class="container", children: [Template<"div">]
```

### Styled Components

```typescript
import { styled } from "@reface/elements";

// Create styled component
const Button = styled.button`
  & {
    background: blue;
    color: white;
  }
`; // => StyledComponent<"button"> with css

// Use like regular elements
Button(); // => Template<"button"> with css
Button({ class: "primary" }); // => Template<"button"> with class="primary", css
Button()`Click me`; // => Template<"button"> with children: ["Click me"], css
Button({ class: "primary" })`Click me`; // => Template<"button"> with class="primary", children: ["Click me"], css

// Extend existing styled components
const PrimaryButton = styled(Button)`
  & {
    background: darkblue;
  }
`; // => StyledComponent<"button"> with merged css
```

### JSX Support

```tsx
import { createElement, Fragment } from "@reface/jsx";

// Basic JSX
<div class="container">Hello</div>  // => Template<"div"> with class="container", children: ["Hello"]

// With children
<div class="container">
  <span>First</span>  // => Template<"span"> with children: ["First"]
  <span>Second</span>  // => Template<"span"> with children: ["Second"]
</div>  // => Template<"div"> with class="container", children: [Template<"span">, Template<"span">]

// With Fragment
<Fragment>
  <div>One</div>  // => Template<"div"> with children: ["One"]
  <div>Two</div>  // => Template<"div"> with children: ["Two"]
</Fragment>  // => Template[] with [Template<"div">, Template<"div">]

// With styled components
<Button class="primary">Click me</Button>  // => StyledComponent<"button"> with class="primary", children: ["Click me"], css

```
