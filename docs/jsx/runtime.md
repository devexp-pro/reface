# JSX in Reface

JSX support in Reface provides a familiar React-like syntax for creating templates with full TypeScript support.

## Setup

### Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vseplet/reface"
  }
}
```

### Basic Imports

```typescript
import { createElement } from "@vseplet/reface/dom";
import { div, button } from "@vseplet/reface/dom";
```

## Basic Usage

### Elements

```typescript
// Simple elements
const template = <div>Hello World</div>;

// With attributes
const button = (
  <button class="primary" onClick="handleClick()" disabled={false}>
    Click me
  </button>
);

// Nested elements
const card = (
  <div class="card">
    <h2 class="card-title">Title</h2>
    <p class="card-content">Content</p>
  </div>
);
```

### Components

```typescript
// Static component
const Header = component<{ title: string }>(({ title }) => (
  <header class="header">
    <h1>{title}</h1>
  </header>
));

// Interactive island
const Counter = island<{ increment: null }, { initial: number }>({
  template: ({ props, rpc }) => (
    <div class="counter">
      <span id="count">{props.initial}</span>
      <button {...rpc.hx.increment()}>+1</button>
    </div>
  ),
  rpc: {
    increment: async () => {
      const newCount = currentCount + 1;
      return RESPONSE(<span>{newCount}</span>);
    },
  },
});
```

### Dynamic Content

```typescript
// Variables and expressions
const name = "World";
const isActive = true;

const greeting = (
  <div class={isActive ? "active" : "inactive"}>
    Hello, {name}!{isActive && <span class="badge">Active</span>}
  </div>
);

// Lists
const items = ["Apple", "Banana", "Orange"];

const list = (
  <ul>
    {items.map((item) => (
      <li>{item}</li>
    ))}
  </ul>
);
```

### Event Handling

```typescript
const Form = component(() => (
  <form onSubmit="handleSubmit(event)">
    <input type="text" onInput="handleInput(event)" required />
    <button type="submit">Submit</button>
  </form>
));
```

## Type Safety

### Element Types

```typescript
// HTML attributes are typed
const input = (
  <input type="email" required minLength={6} pattern="[^@]+@[^@]+\.[^@]+" />
);

// ARIA attributes
const dialog = (
  <div role="dialog" aria-modal={true} aria-labelledby="title">
    <h2 id="title">Dialog Title</h2>
  </div>
);
```

### Component Props

```typescript
interface CardProps {
  title: string;
  content: string;
  className?: string;
}

const Card = component<CardProps>(({ title, content, className }) => (
  <div class={className}>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
));

// TypeScript checks props
const usage = <Card title="Hello" content="Content" className="custom-card" />;
```

## Integration

### With Styled Components

```typescript
const Button = styled(button)`
  & {
    background: blue;
    color: white;
  }
`;

const Card = styled(div)`
  & {
    padding: 1rem;
  }

  & ${Button} {
    margin-top: 1rem;
  }
`;

// Usage
const template = (
  <Card>
    <h2>Card Title</h2>
    <Button>Click me</Button>
  </Card>
);
```

### With HTML Templates

```typescript
const Header = component(() => (
  <header>
    {html`
      <h1>Site Title</h1>
      <nav>
        <a href="/">Home</a>
      </nav>
    `}
  </header>
));
```

## Best Practices

1. **Component Design**

   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Follow consistent naming conventions

2. **Performance**

   - Avoid unnecessary nesting
   - Use static components when possible
   - Minimize state changes

3. **Type Safety**

   - Always define prop types
   - Use strict TypeScript settings
   - Leverage IDE support

4. **Code Style**
   - Use consistent formatting
   - Add meaningful comments
   - Follow project conventions

For more information, see:

- [Components](../core/components.md)
- [Styled Components](../styled/components.md)
