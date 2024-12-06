# JSX in Reface

JSX in Reface allows you to write templates in a declarative, React-like style. This makes the code more readable and familiar for developers with React experience.

## Setup

### tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```

### Imports

```typescript
import { createElement } from "@vseplet/reface/dom/jsx/runtime";
```

## Basic Usage

### Elements

```typescript
// Simple elements
const template = <div>Hello World</div>;

// With attributes
const template = (
  <div class="container" id="main">
    <button onClick="handleClick()">Click me</button>
  </div>
);

// Nested elements
const template = (
  <div class="card">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

### Expressions

```typescript
const name = "World";
const isActive = true;

const template = (
  <div>
    {/* Variable interpolation */}
    <h1>Hello, {name}!</h1>

    {/* Conditional rendering */}
    {isActive && <span>Active</span>}

    {/* Ternary operator */}
    <div class={isActive ? "active" : "inactive"}>Status</div>
  </div>
);
```

### Lists

```typescript
const items = ["Apple", "Banana", "Orange"];

const template = (
  <ul>
    {items.map((item) => (
      <li>{item}</li>
    ))}
  </ul>
);
```

## Styled Components

JSX works seamlessly with styled components:

```typescript
import { styled, div, button } from "@vseplet/reface/dom";

const StyledButton = styled(button)`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }
`;

const Card = styled(div)`
  & {
    padding: 2rem;
    border: 1px solid #ccc;
  }

  & ${StyledButton} {
    margin-top: 1rem;
  }
`;

// Usage with JSX
const template = (
  <Card>
    <h2>Card Title</h2>
    <p>Card content</p>
    <StyledButton>Click me</StyledButton>
  </Card>
);
```

## Components

### Functional Components

```typescript
import { component } from "@vseplet/reface/dom";

interface ButtonProps {
  text: string;
  onClick?: string;
  primary?: boolean;
}

const Button = component<ButtonProps>(({ text, onClick, primary }) => (
  <button class={primary ? "primary" : "secondary"} onClick={onClick}>
    {text}
  </button>
));

// Usage
const App = component(() => (
  <div>
    <Button text="Primary" primary onClick="handlePrimary()" />
    <Button text="Secondary" onClick="handleSecondary()" />
  </div>
));
```

### Component Composition

```typescript
const Header = component<{ title: string }>(({ title }) => (
  <header class="header">
    <h1>{title}</h1>
  </header>
));

const Footer = component(() => (
  <footer class="footer">
    <p>&copy; 2024</p>
  </footer>
));

const Layout = component<{ title: string }>(({ title }) => (
  <div class="layout">
    <Header title={title} />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
));
```

## Event Handling

```typescript
const Form = component(() => (
  <form onSubmit="handleSubmit(event)">
    <input type="text" onInput="handleInput(event)" placeholder="Enter text" />
    <button type="submit">Submit</button>
  </form>
));
```

## Type Safety

### Built-in Elements

```typescript
// Automatic HTML attribute typing
const element = <div class="container" id="main" />;
const input = <input type="text" required minLength={6} />;
```

### Custom Components

```typescript
interface CardProps {
  title: string;
  content: string;
  className?: string;
}

const Card = component<CardProps>(({ title, content, className }) => (
  <div class={className}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
));

// TypeScript will check all props
const App = component(() => (
  <Card title="Hello" content="This is a card" className="custom-card" />
));
```

## Best Practices

1. **Component Naming**

   - Use PascalCase for component names
   - Use camelCase for props

2. **Type Safety**

   - Always define interfaces for props
   - Use strict typing

3. **Structure**

   - Break down large components into smaller ones
   - Group related components into modules

4. **Styling**

   - Use styled components for style isolation
   - Avoid global styles

     ```

     ```
