# Components

RefaceComposer provides a component system for building reusable templates.

## Basic Components

### Function Components

```typescript
// Simple component
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}

// Usage
<Button text="Click me" />;

// With children
function Container({ children }: { children: ElementChild[] }) {
  return <div class="container">{children}</div>;
}

// Usage
<Container>
  <h1>Title</h1>
  <p>Content</p>
</Container>;
```

### Template Literals

```typescript
import { html } from "@reface/core";

// HTML template
const template = html`
  <div class="container">
    <h1>Title</h1>
    <p>Content</p>
  </div>
`;

// With interpolation
const name = "John";
const greeting = html`<div>Hello ${name}!</div>`;
```

## Mixed Usage

### Components with Template Literals

```typescript
function Layout({
  title,
  children,
}: {
  title: string;
  children: ElementChild[];
}) {
  return html`
    <div class="layout">
      <header>${title}</header>
      <main>${children}</main>
    </div>
  `;
}

// Usage
<Layout title="My Page">
  <div>Content</div>
</Layout>;
```

### Element Creation

```typescript
import { createElement } from "@reface/core";

const div = createElement("div");
const span = createElement("span");

// Usage
div({ class: "container" })`
  ${span({ class: "text" })`Hello`}
  ${span({ class: "text" })`World`}
`;
```

## Type Safety

### Props Validation

```typescript
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ variant, size = "medium", disabled, onClick }: ButtonProps) {
  return (
    <button
      class={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
```

### Children Types

```typescript
// Single child
interface SingleChildProps {
  children: ElementChild;
}

// Multiple children
interface MultipleChildrenProps {
  children: ElementChild[];
}

// Optional children
interface OptionalChildrenProps {
  children?: ElementChild | ElementChild[];
}
```

## Best Practices

1. **Component Design**

   - Keep components focused
   - Use TypeScript interfaces
   - Follow single responsibility
   - Implement proper error handling

2. **Performance**

   - Minimize nesting
   - Use fragments when needed
   - Optimize templates
   - Cache when possible

3. **Maintainability**

   - Clear naming
   - Document props
   - Consistent patterns
   - Unit tests

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard support
   - Screen reader testing
