# Plugins

RefaceComposer's plugin system allows extending the template composition
process.

## Core Plugin System

### Basic Plugin Structure

```typescript
import type { IPlugin } from "@reface/core";

class CustomPlugin implements IPlugin {
  name = "custom";

  setup(composer: RefaceComposer) {
    const manager = composer.getRenderManager();
    // Plugin initialization
  }
}

// Usage
const composer = new RefaceComposer();
composer.use(new CustomPlugin());
```

## Official Plugins

### Styled Plugin

CSS-in-JS support with type safety:

```typescript
import { StyledPlugin } from "@reface/plugins/styled";

const composer = new RefaceComposer();
composer.use(new StyledPlugin());

// Create styled component
const Button = styled.button`
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

// Extend existing component
const PrimaryButton = styled(Button)`
  & {
    padding: 1rem 2rem;
    border-radius: 4px;
  }
`;
```

### Partials Plugin

Interactive components with HTMX integration:

```typescript
import { PartialsPlugin } from "@reface/plugins/partials";

const composer = new RefaceComposer();
composer.use(new PartialsPlugin());

// Create interactive component
const Counter = partial(async () => {
  const count = 0;
  return (
    <div>
      <span>{count}</span>
      <button {...Counter.trigger()}>Increment</button>
    </div>
  );
}, "counter");

// With custom trigger
const SearchBox = partial(async () => {
  return (
    <div>
      <input type="text" />
      <button {...SearchBox.trigger("keyup delay:500ms from:input")}>
        Search
      </button>
    </div>
  );
}, "search");
```

## Plugin Interface

```typescript
interface IPlugin {
  name: string;
  setup(composer: RefaceComposer): void | Promise<void>;
}
```

## Render Pipeline Hooks

```typescript
class LoggerPlugin implements IPlugin {
  name = "logger";

  setup(composer: RefaceComposer) {
    const manager = composer.getRenderManager();

    // Before render hook
    manager.on("render.render.start", ({ template }) => {
      console.log("Starting render:", template);
    });

    // After render hook
    manager.on("render.render.end", ({ html }) => {
      console.log("Rendered HTML:", html);
    });
  }
}
```

### Available Hooks

- render.render.start/end - Full render cycle
- render.template.start/end - Template processing
- render.child.start/end - Child element processing
- render.children.start/end - Multiple children processing
- render.attributes.start/end - Attribute handling
- render.class.start/end - Class attribute processing
- render.style.start/end - Style attribute processing

## Plugin Storage

```typescript
class StatePlugin implements IPlugin {
  name = "state";

  setup(composer: RefaceComposer) {
    const manager = composer.getRenderManager();

    // Store plugin data
    manager.store.set("state", { count: 0 });

    // Access plugin data
    const state = manager.store.get("state");
  }
}
```

## Best Practices

1. **Plugin Design**

   - Single responsibility
   - Clear initialization
   - Proper error handling
   - TypeScript support

2. **Performance**

   - Minimal overhead
   - Efficient hooks
   - Resource cleanup
   - Caching when possible

3. **Integration**

   - Plugin dependencies
   - Version compatibility
   - Documentation
   - Examples

4. **Testing**
   - Unit tests
   - Integration tests
   - Performance tests
   - Error scenarios

## Development Guide

1. **Setup**

   - Create plugin class
   - Implement IPlugin interface
   - Define clear API
   - Add TypeScript types

2. **Implementation**

   - Add render hooks
   - Handle errors
   - Add cleanup
   - Optimize performance

3. **Documentation**

   - API reference
   - Usage examples
   - Configuration options
   - Best practices

4. **Distribution**
   - Package structure
   - Dependencies
   - Version management
   - Release notes
