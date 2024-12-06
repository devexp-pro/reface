# HTML Template API in Reface

HTML Template API is the primary way to create templates in Reface. It uses tagged template literals to create HTML markup with support for interpolation and type safety.

## Basic Usage

### Creating Simple Templates

```typescript
import { html } from "@vseplet/reface";

// Simple template
const template = html`<div>Hello, World!</div>`;

// Template with interpolation
const name = "User";
const greeting = html`<div>Hello, ${name}!</div>`;

// Nested templates
const header = html`<header>Site Header</header>`;
const footer = html`<footer>Site Footer</footer>`;

const page = html`
  ${header}
  <main>Content</main>
  ${footer}
`;
```

### Conditional Rendering

```typescript
const isLoggedIn = true;
const username = "John";

const header = html`
  <header>
    ${isLoggedIn
      ? html`<span>Welcome, ${username}!</span>`
      : html`<a href="/login">Login</a>`}
  </header>
`;

// Conditional rendering with &&
const notification = html`
  <div>${hasError && html`<div class="error">Error occurred!</div>`}</div>
`;
```

### Loops and Lists

```typescript
const items = ["Apple", "Banana", "Orange"];

const list = html`
  <ul>
    ${items.map((item) => html`<li>${item}</li>`)}
  </ul>
`;

// With index and conditions
const todos = [
  { id: 1, text: "Buy milk", done: true },
  { id: 2, text: "Write docs", done: false },
];

const todoList = html`
  <ul>
    ${todos.map(
      (todo) => html`
        <li class="${todo.done ? "completed" : ""}">${todo.text}</li>
      `
    )}
  </ul>
`;
```

## Components

### Creating Components

```typescript
import { component } from "@vseplet/reface";

// Simple component
const Greeting = component(() => html`<div>Hello, World!</div>`);

// Component with props
const Button = component<{
  text: string;
  onClick?: string;
}>(({ text, onClick }) => html`<button onclick="${onClick}">${text}</button>`);

// Using components
const App = component(
  () => html`
    ${Greeting()} ${Button({ text: "Click me", onClick: "handleClick()" })}
  `
);
```

### Component Composition

```typescript
// Header component
const Header = component<{ title: string }>(
  ({ title }) => html`
    <header>
      <h1>${title}</h1>
    </header>
  `
);

// Navigation component
const Navigation = component(
  () => html`
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  `
);

// Layout component
const Layout = component<{
  title: string;
  children: Template;
}>(
  ({ title, children }) => html`
    ${Header({ title })} ${Navigation()}
    <main>${children}</main>
  `
);

// Usage
const Page = component(
  () => html`
    ${Layout({
      title: "Welcome",
      children: html`<div>Page content</div>`,
    })}
  `
);
```

## Working with Attributes

### Dynamic Attributes

```typescript
const Button = component<{
  disabled?: boolean;
  type?: "button" | "submit";
}>(
  ({ disabled, type = "button" }) => html`
    <button type="${type}" ${disabled ? "disabled" : ""}>Click me</button>
  `
);

// Dynamic data attributes
const Card = component<{ id: string }>(
  ({ id }) => html`
    <div data-id="${id}" data-testid="card-${id}">Card content</div>
  `
);
```

## Security

HTML Template API automatically escapes strings to prevent XSS attacks:

```typescript
const userInput = '<script>alert("XSS")</script>';

// Safe output
const safe = html`<div>${userInput}</div>`; // String will be escaped

// If you need to insert HTML (use with caution!)
const trusted = html`<div>${html(userInput)}</div>`;
```

## Best Practices

1. **Logic Separation**

   - Move complex logic to separate functions
   - Use components for code reuse

2. **Type Safety**

   - Always define prop types for components
   - Use strict typing for better safety

3. **Performance**

   - Avoid unnecessary nested templates
   - Use memoization for heavy computations

4. **Code Organization**
   - Group related components
   - Follow the single responsibility principle

Want me to continue with the other documentation files?
