# JSX Support

JSX integration for creating templates with TypeScript support.

## Basic Usage

```typescript
import { createElement } from "@reface/jsx";

// Simple element
const element = <div>Hello World</div>;

// With attributes
const container = (
  <div class="container" id="root">
    Content
  </div>
);

// With children
const page = (
  <div>
    <header>Header</header>
    <main>Content</main>
    <footer>Footer</footer>
  </div>
);
```

## Components

### Function Components

```typescript
// Basic component
function Button({ text }: { text: string }) {
  return <button class="btn">{text}</button>;
}

// Usage
const button = <Button text="Click me" />;

// With children
function Container({ children }: { children: Template }) {
  return <div class="container">{children}</div>;
}

// Usage
const container = (
  <Container>
    <h1>Title</h1>
    <p>Content</p>
  </Container>
);
```

### Fragments

```typescript
// Multiple elements without wrapper
function List() {
  return (
    <>
      <li>First</li>
      <li>Second</li>
    </>
  );
}

// Usage in components
function Page() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

## Attributes

### HTML Attributes

```typescript
// Standard attributes
<div id="main" class="container" title="Main content" hidden={true} />;

// Data attributes
<div data-id="123" data-testid="container" />;

// ARIA attributes
<button role="tab" aria-selected={true} aria-controls="panel-1">
  Tab 1
</button>;
```

### Dynamic Attributes

```typescript
// Conditional class
<div class={isActive ? "active" : ""}>Content</div>;

// Spread attributes
const props = { class: "btn", disabled: true };
<button {...props}>Click me</button>;
```

## Scripts

### Adding Scripts

```typescript
// Inline scripts
function Counter() {
  return (
    <div
      script={`
      function increment() {
        const count = document.getElementById('count');
        count.textContent = Number(count.textContent) + 1;
      }
    `}
    >
      <span id="count">0</span>
      <button onclick="increment()">+</button>
    </div>
  );
}

// External scripts
function App() {
  return (
    <div scriptFile="/app.js">
      <button onclick="init()">Initialize</button>
    </div>
  );
}
```

## Type Safety

### Component Types

```typescript
// Props interface
interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

// Typed component
function Button({ text, disabled, onClick }: ButtonProps) {
  return (
    <button class="btn" disabled={disabled} onclick={onClick}>
      {text}
    </button>
  );
}

// Usage with type checking
const button = <Button text="Click me" disabled={true} />;
```

## Best Practices

1. **Component Design**

   - Keep components small and focused
   - Use meaningful component names
   - Follow single responsibility principle

2. **Type Safety**

   - Define prop interfaces
   - Use strict TypeScript settings
   - Validate component props

3. **Performance**

   - Minimize component nesting
   - Reuse components when possible
   - Keep render functions pure

4. **Maintainability**
   - Document complex components
   - Use consistent naming
   - Follow project structure
     </rewritten_file>
