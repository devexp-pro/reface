# Render Pipeline

The render pipeline in Reface handles the transformation of components and templates into HTML. Understanding this process helps in optimizing your applications.

## Pipeline Stages

### 1. Component Resolution

```typescript
// Input: Component with props
const Header = component<{ title: string }>(({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
));

// Resolution: Template object
{
  tag: "header",
  attributes: "",
  children: [{
    tag: "h1",
    attributes: "",
    children: ["My Title"],
    css: "",
    isTemplate: true,
    rootClass: "",
  }],
  css: "",
  isTemplate: true,
  rootClass: "",
}
```

### 2. Template Processing

```typescript
// Input: Template object with interpolation
div()`Hello ${name}!`;

// Processing:
// 1. Evaluate expressions
// 2. Escape values
// 3. Process nested templates
```

### 3. Style Collection

```typescript
// Input: Styled components and global styles
const Button = styled(button)`
  & {
    color: blue;
  }
`;

// Collection:
// 1. Extract CSS from components
// 2. Generate unique class names
// 3. Combine styles
```

### 4. HTML Generation

```typescript
// Final output
<html>
  <head>
    <style>
      /* Collected styles */
    </style>
  </head>
  <body>
    <!-- Generated HTML -->
  </body>
</html>
```

## Template Objects

The core data structure in the render pipeline:

```typescript
interface Template {
  tag: string; // HTML tag name
  attributes: string; // HTML attributes
  children: unknown[]; // Child elements
  css: string; // Component styles
  rootClass: string; // Unique class for styling
  isTemplate: true; // Type marker
  str: TemplateStringsArray; // Original template
  args: (string | Template)[]; // Template arguments
}
```

## Style Processing

### Class Generation

```typescript
import { generateUniqueClass } from "@vseplet/reface/helpers";

// Generates unique class names for style isolation
const className = generateUniqueClass(); // "c1", "c2", etc.
```

### Style Combination

```typescript
// Multiple styled components
const Button = styled(button)`
  & {
    color: blue;
  }
`;

const PrimaryButton = styled(Button)`
  & {
    background: gold;
  }
`;

// Results in:
/*
.c1 { color: blue; }
.c2 { background: gold; }
*/
```

## Best Practices

1. **Performance**

   - Avoid deep nesting of templates
   - Reuse components when possible
   - Keep styles modular

2. **Style Management**

   - Use styled components for scoped styles
   - Combine related styles
   - Avoid global styles when possible

3. **Template Structure**

   - Keep templates clean and readable
   - Use meaningful tag names
   - Structure components logically

4. **Error Handling**
   - Validate input data
   - Handle null and undefined values
   - Provide meaningful error messages

## Advanced Features

### Custom Renderers

```typescript
import { createRenderer } from "@vseplet/reface";

const renderer = createRenderer({
  transformTag: (tag) => tag.toUpperCase(),
  processAttributes: (attrs) => attrs,
  handleChildren: (children) => children,
});
```

### Render Hooks

```typescript
import { useRenderHook } from "@vseplet/reface";

useRenderHook("beforeRender", (template) => {
  // Modify template before rendering
  return template;
});
```

For more information about specific features, see:

- [Component System](./components.md)
- [Style Processing](../styled/styles.md)
