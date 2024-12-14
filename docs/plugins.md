# Plugins

Reface's plugin system allows extending core functionality in a modular way.

## Plugin System

### Basic Plugin Structure

```typescript
import type { IPlugin } from "@reface/core";

class CustomPlugin implements IPlugin {
  name = "custom";

  setup(reface: Reface) {
    // Plugin initialization logic
  }
}

// Usage
const reface = new Reface();
reface.use(new CustomPlugin());
```

## Built-in Plugins

### Styled Plugin

```typescript
import { StyledPlugin } from "@reface/plugins/styled";

const reface = new Reface();
reface.use(new StyledPlugin());

// Now you can use styled components
const Button = styled.button`
  & {
    background: blue;
    color: white;
  }
`;
```

### Island Plugin

```typescript
import { IslandPlugin } from "@reface/plugins/island";

const reface = new Reface();
reface.use(new IslandPlugin());

// Create interactive component
const Counter = island(async () => {
  return <div>Interactive content</div>;
}, "counter");
```

## Creating Custom Plugins

### Plugin Interface

```typescript
interface IPlugin {
  name: string;
  setup(reface: Reface): void | Promise<void>;
}
```

### Example: Logger Plugin

```typescript
class LoggerPlugin implements IPlugin {
  name = "logger";

  setup(reface: Reface) {
    reface.getRenderManager().on("beforeRender", (template) => {
      console.log("Rendering template:", template);
    });

    reface.getRenderManager().on("afterRender", (html) => {
      console.log("Rendered HTML:", html);
    });
  }
}
```

### Example: Analytics Plugin

```typescript
class AnalyticsPlugin implements IPlugin {
  name = "analytics";

  setup(reface: Reface) {
    // Add analytics script
    reface.getRenderManager().on("afterRender", (html) => {
      return html + '<script src="analytics.js"></script>';
    });
  }
}
```

## Plugin Hooks

### Render Pipeline Hooks

- beforeRender
- afterRender
- onError

```typescript
interface RenderHooks {
  beforeRender?: (template: ITemplate) => void | Promise<void>;
  afterRender?: (html: string) => string | Promise<string>;
  onError?: (error: Error) => void | Promise<void>;
}
```

### Component Hooks

- beforeMount
- afterMount
- beforeUnmount

```typescript
interface ComponentHooks {
  beforeMount?: () => void | Promise<void>;
  afterMount?: () => void | Promise<void>;
  beforeUnmount?: () => void | Promise<void>;
}
```

## Best Practices

1. **Plugin Design**

   - Single responsibility
   - Clear API
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

## Plugin Development Guide

1. **Setup**

   - Create plugin class
   - Implement IPlugin interface
   - Define clear API
   - Add TypeScript types

2. **Implementation**

   - Add core functionality
   - Implement hooks
   - Handle errors
   - Add cleanup

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
