# Architecture

## Core Architecture

```ts
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Reface      │     │     Plugin      │     │    Render       │
│                 │────▶│    System       │────▶│    Manager      │
│     (Core)      │     │   (Extensible)  │     │  (Pipeline)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Components    │     │    Templates    │     │      HTML       │
│                 │────▶│                 │────▶│                 │
│   (Virtual)     │     │  (Processing)   │     │   (String)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Core Concepts

### Platform Agnostic

- Works with any HTTP framework (Hono, Express, etc)
- Supports Deno, Node.js and other platforms
- No framework-specific dependencies
- Pure rendering library

### Plugin System

```typescript
// Creating a plugin
class StyledPlugin implements IPlugin {
  name = "styled";

  setup(reface: Reface) {
    // Register handlers
  }
}

// Usage
const reface = new Reface();
reface.use(new StyledPlugin());
```

### Built-in Plugins

#### Styled Plugin

- CSS-in-JS support
- Type-safe styles
- Style optimization
- Automatic prefixing

#### Island Plugin

- Interactive components
- Progressive enhancement
- Minimal client JS
- HTMX integration

## Render Pipeline

```typescript
Template → Virtual Components → Plugin Processing → HTML String

Example:
<Button>Click</Button> →
{ tag: 'button', children: ['Click'] } →
{ tag: 'button', class: 'styled-xxx', children: ['Click'] } →
<button class="styled-xxx">Click</button>
```

## Module Structure

ts
@reface/
├── core/ # Core functionality
│ ├── render/ # Render pipeline
│ ├── types/ # Core types
│ └── plugins/ # Plugin system
│
├── components/ # Base components
│ └── html/ # HTML elements
│
└── plugins/ # Official plugins
├── styled/ # CSS-in-JS
└── island/ # Interactive components

````

## Best Practices

1. **Component Design**
   - Pure functions
   - Immutable props
   - Single responsibility
   - Composition over inheritance

2. **Plugin Development**
   - Clear API
   - Minimal dependencies
   - Proper typings
   - Documentation

3. **Performance**
   - Virtual components
   - Efficient updates
   - Style optimization
   - Minimal client JS

4. **Type Safety**
   - TypeScript first
   - Strict types
   - Proper interfaces
   - Validation

## Integration Examples

```typescript
// With Hono
import { Hono } from 'hono';
import { Reface } from '@reface';

const app = new Hono();
const reface = new Reface();

app.get('/', (c) => {
  const content = reface.render(<HomePage />);
  return c.html(content);
});

// With Express
import express from 'express';
import { Reface } from '@reface';

const app = express();
const reface = new Reface();

app.get('/', (req, res) => {
  const content = reface.render(<HomePage />);
  res.send(content);
});
````
