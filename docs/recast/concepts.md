# Recast Core Concepts

Recast is a string-based HTML Element engine designed for server-side rendering. It consists of several key systems:

1. **Element API** - Core API for creating and manipulating HTML elements

   - **Prebuilt html tags** - `import {a, div, span, script, style ...other} from "@reface/recast/elements"`
   - **Element factory** - `createElement('custom-tag')`

2. **JSX Support** - Syntactic sugar for Element API
3. **Component System** - Reusable Elements with unique instance IDs
4. **Styling System** - Built-in CSS-in-JS solution
5. **Slots System** - Content distribution mechanism
6. **Plugin System** - Extensible render pipeline
7. **Render** - Render API to transform Elements into Nodes into HTML
8. **Test Utils** - Test utils
9. **HTMX** - HTMX integration

## Element API

### Creating Elements

```typescript
// Example of Element usage
const div = createElement("div");

// Set attributes
div({ class: "box" });

// set children
div`Hello ${name}`;

// Both can be chained
div({ class: "box" })`Hello ${name}`;
```

### Reusability: Immutability, Element chainable API

Elements are immutable - each operation creates a new instance:

```typescript
// Each call returns new Element instance
const base = div({ class: "box" });
const withId = base({ id: "box-1" }); // <div class="box" id="box-1"></div>
const withText = base`Hello`; // <div class="box">Hello</div>
const withBoth = base({ id: "box-2" })`Hello`; // <div class="box" id="box-2">Hello</div>

// JSX also creates new instances
const Element = <div class="box" />; // <div class="box"></div>
const withChildren = <Element>Hello</Element>; // <div class="box">Hello</div>
```

### Element Methods

Elements can have custom methods that operate on their raw node:

```typescript
// Method definition in factory
interface ElementMethod {
  (context: { Element: RawElement }, ...args: any[]): any;
}

// Example: HTMX attribute helpers
const Button = createElementFactory({
  type: "button",
  methods: {
    // Store metadata
    setData: ({ Element }, key: string, value: any) => {
      Element.meta[key] = value;
      return Element;
    },

    // HTMX attributes helper
    hx: (
      { Element },
      config: {
        post?: string;
        get?: string;
        trigger?: string;
        target?: string;
        swap?: string;
      }
    ) => {
      const attrs: Record<string, string> = {};

      if (config.post) attrs["hx-post"] = config.post;
      if (config.get) attrs["hx-get"] = config.get;
      if (config.trigger) attrs["hx-trigger"] = config.trigger;
      if (config.target) attrs["hx-target"] = config.target;
      if (config.swap) attrs["hx-swap"] = config.swap;

      return attrs;
    },
  },
});

// Usage
<Button
  {...Button.hx({
    post: "/api/submit",
    trigger: "click",
    target: "#form",
    swap: "outerHTML",
  })}
>
  Submit
</Button>;
```

### Element Children

Elements accept various types of children that get normalized during Node creation:

```typescript
type PrimitiveChild = string | number | boolean | null | undefined;
type ComplexChild = Element;
type ElementChildType =
  | PrimitiveChild
  | ComplexChild
  | (PrimitiveChild | ComplexChild)[];

// All these are valid Element children
div`
  ${true}                   // boolean
  ${null}                   // null
  ${undefined}             // undefined
  ${"text"}                // string
  ${42}                    // number
  ${button`Click me`}      // Element
  ${[1, 2, "three"]}      // Array
`;

// During Node creation:
// 1. false, null, undefined are removed
// 2. true is removed
// 3. numbers are converted to strings
// 4. arrays are flattened
// 5. Elements are converted to Nodes
```

### Security and HTML Escaping

By default, all string values are automatically escaped to prevent XSS attacks:

```typescript
const userInput = '<script>alert("XSS")</script>';
div`${userInput}`;
// <div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>

// Variables are also escaped
const message = "<b>Hello</b>";
span`${message}`;
// <span>&lt;b&gt;Hello&lt;/b&gt;</span>

// For trusted HTML content, use the html helper
import { html } from "@reface/recast";

const trusted = '<span class="highlight">Important text</span>';
div`${html`${trusted}`}`;
// <div><span class="highlight">Important text</span></div>

// html`` is also useful for fragments
const fragment = html`
  <span>First</span>
  <span>Second</span>
`;
div`${fragment}`;
// <div><span>First</span><span>Second</span></div>

⚠️ Use html`` only for trusted content!
```

Key security features:

1. Automatic HTML escaping
2. Safe string interpolation
3. XSS protection by default
4. Explicit opt-in for trusted HTML
5. Fragment support via html``

### Attribute Handling

Elements provide convenient ways to work with attributes:

```typescript
// Classes can be passed as string, array or object with flags
div({
  class: "button primary", // string
  class: ["button", "primary"], // array
  class: {
    // object with flags
    button: true,
    primary: true,
    disabled: false,
    large: someCondition,
  },
  // All these forms can be combined
  class: ["button", { primary: true, large: false }, condition && "active"],
})`Click me`;

// Classes are automatically deduplicated
div({
  class: ["button", "primary", "button"], // duplicates removed
})`Click me`; // <div class="button primary">Click me</div>

// Styles can be string, array or object
div({
  style: "color: red; font-size: 14px", // string
  style: ["color: red", "font-size: 14px"], // array
  style: {
    // object (camelCase)
    backgroundColor: "red",
    fontSize: "14px",
  },
})`Content`;
```

#### Attribute Types

```typescript
// Class attribute types
type ClassValue =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];

// Style attribute types
type StyleValue =
  | string
  | Record<string, string | number | null | boolean>
  | (string | Record<string, string | number | null | boolean>)[];

// HTML element attributes
interface ElementAttributes {
  class?: ClassValue;
  style?: StyleValue;
  [key: string]: any;
}
```

### JSX Support

JSX provides a familiar syntax for Element creation, but it's just syntactic sugar over Element API calls:

```typescript
// Configure JSX support in deno.json/tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@reface/recast"
  }
}

// JSX syntax
const Element = (
  <div class="container">
    <button type="submit">Click me</button>
  </div>
);

// Compiles to Element API calls
const Element = div({ class: "container" })`
  ${button({ type: "submit" })`Click me`}
`;

// Fragments are converted to html Element
const Fragment = (
  <>
    <span>First</span>
    <span>Second</span>
  </>
);
// Equivalent to:
html`
  ${span`First`}
  ${span`Second`}
`;
```

## Component System

### Component Features

Components are special Elements that:

```typescript
const script = /*js*/ `
  const componentId = document.currentScript.getAttribute('data-component');
  const root = document.querySelector(`[(__rcc *= "${componentId}")]`);
  
  // Component-scoped client code
  root.querySelector('.button').addEventListener('click', () => {
    console.log('Clicked!');
  });
`;

const Button = component((props) => (
  <div>
    <button class="button">Click me</button>
    <script>{script}</script>
  </div>
));

// Renders with unique component ID:
// <div __rcc="button-1">
//   <button class="button">Click me</button>
//   <script data-component="button-1">...</script>
// </div>
```

## Styling System

### Styled Components

Recast provides built-in CSS-in-JS solution:

```typescript
import { styled } from "@reface/styled";

// Basic styled component
const Button = styled.button/*css*/ `
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

// During render:
// 1. Generate unique class: "s1a"
// 2. Replace all '&' with class name
// 3. Add styles to <style> tag

// Results in:
// <button class="s1a">Click me</button>
// <style>
//   .s1a {
//     background: blue;
//     color: white;
//   }
//   .s1a:hover {
//     background: darkblue;
//   }
// </style>

// Extend existing component
const PrimaryButton = styled(Button)/*css*/ `
  & {
    background: green;
  }
`;

// Direct CSS API usage
import { css } from "@reface/styled";

const style = css/*css*/ `
  & {
    color: red;
  }
`;

style.rootClass; // "s1a" - generated unique class
style.css; // ".s1a { color: red; }" - processed CSS string

// Use in Elements
div({ class: style.rootClass })`Content`;
```

## Slots System

### Content Distribution

Recast provides a slot system for content distribution:

```typescript
import { createSlot } from "@reface/slots";
import { Template } from "@reface/slots";

// Create named slot
const HeadSlot = createSlot("head");
const TitleSlot = createSlot(
  "head.title",
  (content) => title`${content}` // Optional render transform
);

// Fill slots with content
const Page = () => (
  <html>
    <head>
      <HeadSlot /> {/* Slot placeholder */}
      <TitleSlot>Page Title</TitleSlot>
    </head>
    <body>
      <main>Content</main>
    </body>
  </html>
);

// Provide content for slots
const Layout = () => (
  <>
    <Template slot="head">
      <meta charset="utf-8" />
      <link rel="stylesheet" href="/style.css" />
    </Template>

    <Template slot="head.title" key="main">
      My Website
    </Template>
  </>
);
```

Key features:

1. Named slots with optional render transforms
2. Multiple content providers for same slot
3. Content deduplication via keys
4. Global and component-scoped slots
5. Different merge strategies (append/replace/merge)

Built-in slots:

- `head` - For head content
- `head.title` - For page title
- `body.end` - For end-of-body content

During render:

1. Slots collect content from Templates
2. Content is deduplicated by keys
3. Optional render transforms are applied
4. Content is injected into slot placeholders

## Node

```jsx
// Template to Node conversion
const template = div({ class: "box" })`Hello`;

// Creates node tree
const node: Node = {
  type: "element",
  tag: "div",
  attributes: {
    class: ["box"]
  },
  children: [{
    type: "text",
    content: "Hello"
  }],
  meta: {}
}

// Final HTML
"<div class="box">Hello</div>"
```

### Node Types

The template system is built on a unified Node type that can represent different kinds of content:

```ts
type Node = NodeText | NodeHtml | NodeElement | NodeComponent;

type Meta = Record<string, any>;

// Text content
type NodeText = string | number;

// HTML string content with possible children
interface NodeHtml {
  type: "html";
  content: string;
  children: Node[];
  meta: Meta;
}

// HTML and custom elements
interface NodeElement<T extends HTMLAttributes> {
  type: "element";
  tag: string;
  children: Node[];
  attributes: T;
  meta: Meta;
}

// Component instances
interface NodeComponent<T extends Record<string, any>> {
  type: "component";
  children: Node[];
  attributes: T;
  meta: Meta & {
    component: {
      id: string;
      render: (attrs: T, children?: Node[]) => Node;
    };
  };
}
```
