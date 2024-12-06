# HTML Templates

HTML Templates in Reface provide a type-safe way to create HTML markup using tagged template literals.

## Basic Usage

### Simple Templates

```typescript
import { html } from "@vseplet/reface";

// Basic text
const text = html`Hello, World!`;

// With HTML elements
const greeting = html`
  <div class="greeting">
    <h1>Welcome</h1>
    <p>Hello, World!</p>
  </div>
`;
```

### Dynamic Content

```typescript
// Variable interpolation
const name = "User";
const greeting = html`<div>Hello, ${name}!</div>`;

// Expression evaluation
const count = 42;
const message = html`
  <div>You have ${count > 0 ? count : "no"} messages.</div>
`;

// Function calls
const formatDate = (date: Date) => date.toLocaleDateString();
const today = html`
  <time datetime="${new Date().toISOString()}">
    ${formatDate(new Date())}
  </time>
`;
```

### Nested Templates

```typescript
const header = html`<header>Site Header</header>`;
const footer = html`<footer>Site Footer</footer>`;

const page = html`
  ${header}
  <main>
    <h1>Welcome</h1>
    <p>Content goes here...</p>
  </main>
  ${footer}
`;
```

## Conditional Rendering

### If Conditions

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

// Using && for simple conditions
const notification = html`
  <div>${hasError && html` <div class="error">Error occurred!</div> `}</div>
`;
```

### Switch/Case Pattern

```typescript
const status = "loading";

const content = html`
  <div>
    ${(() => {
      switch (status) {
        case "loading":
          return html`<div class="spinner">Loading...</div>`;
        case "error":
          return html`<div class="error">Error occurred!</div>`;
        case "success":
          return html`<div class="success">Data loaded!</div>`;
        default:
          return html`<div>Unknown status</div>`;
      }
    })()}
  </div>
`;
```

## Lists and Iterations

### Array Mapping

```typescript
const items = ["Apple", "Banana", "Orange"];

const list = html`
  <ul>
    ${items.map((item) => html` <li>${item}</li> `)}
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
        <li class="${todo.done ? "completed" : ""}">
          <input type="checkbox" checked=${todo.done} />
          ${todo.text}
        </li>
      `
    )}
  </ul>
`;
```

### Object Iteration

```typescript
const data = {
  name: "John",
  age: 30,
  email: "john@example.com",
};

const details = html`
  <dl>
    ${Object.entries(data).map(
      ([key, value]) => html`
        <dt>${key}</dt>
        <dd>${value}</dd>
      `
    )}
  </dl>
`;
```

## Security

### Automatic Escaping

HTML Templates automatically escape string values to prevent XSS attacks:

```typescript
const userInput = '<script>alert("XSS")</script>';

// Safe output - content will be escaped
const safe = html`<div>${userInput}</div>`;

// Trusted HTML - use with caution!
const trusted = html`<div>${html(userInput)}</div>`;
```

### Sanitization

```typescript
import { sanitize } from "@vseplet/reface/html";

const rawHtml = `
  <div>
    <script>alert("bad")</script>
    <p>Good content</p>
  </div>
`;

const clean = html` <div>${sanitize(rawHtml)}</div> `;
```

## Best Practices

1. **Template Organization**

   - Keep templates small and focused
   - Use composition for complex markup
   - Extract repeated patterns into functions

2. **Security**

   - Always use automatic escaping
   - Sanitize untrusted HTML
   - Validate user input

3. **Performance**

   - Cache repeated templates
   - Minimize template nesting
   - Use memoization for expensive computations

4. **Maintainability**
   - Use meaningful variable names
   - Comment complex logic
   - Follow consistent formatting

For more information about specific features, see:

- [Attributes](./attributes.md)
- [Components](../core/components.md)
