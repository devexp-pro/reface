---
title: Plugin System
description: Extensible render pipeline for Recast
tags: [plugins, pipeline, extensions]
category: Advanced
sidebar: main
order: 6
---

Import from:

```typescript
import { Plugin } from "@reface/recast";
```

## Plugin Context

Plugins receive a rich context for working with templates:

```typescript
class MyPlugin {
  name = "my-plugin";

  processNode(context: RenderContext) {
    const {
      // Core
      template, // Current template
      html, // Current HTML (if exists)

      // Query API
      query: {
        is, // Check node type
        matches, // Check selector
        closest, // Find nearest ancestor
        find, // Find descendants
        parent, // Parent node
      },

      // Helpers
      utils: {
        isTemplate, // Check if Template
        isComponent, // Check if Component
        isElement, // Check if Element
        isEmpty, // Check if empty value
      },

      // Storage
      store: {
        get, // Get plugin data
        set, // Store plugin data
      },
    } = context;

    // Usage examples
    if (query.is(template, "button")) {
      // Process buttons
    }

    if (query.matches(template, "[data-action]")) {
      // Process elements with data-action
    }

    const form = query.closest(template, "form");
    const inputs = query.find(template, "input");

    // Store data
    store.set("my-plugin", { count: inputs.length });
  }
}
```

## Plugin Lifecycle

Plugins can hook into different render phases:

```typescript
class MyPlugin {
  // Initialization
  setup(recast) {
    // Access to Recast instance
  }

  // Before render
  beforeRender(context) {
    // Setup
  }

  // During render
  processNode(context) {
    // Node transformation
    return node;
  }

  // After render
  afterRender(context) {
    // Final processing
  }
}
```

## Built-in Plugins

### LoggerPlugin

Debug render process:

```typescript
const logger = new LoggerPlugin();
recast.use(logger);

// After rendering
console.log(logger.toText());
// Outputs detailed render process log
```

### StyledPlugin

Process CSS-in-JS styles:

```typescript
recast.use(new StyledPlugin());

// Now styled components will work
const Button = styled.button/*css*/ `
  & {
    color: red;
  }
`;
```

## Plugin Communication

Plugins can exchange data through store:

```typescript
// Plugin A
store.set("shared-data", { value: 123 });

// Plugin B
const data = store.get("shared-data");
```

## Best Practices

1. **Unique Names**

   - Use unique plugin names
   - Prefixes for related plugins

2. **Data Isolation**

   - Store data in plugin store
   - Use unique keys

3. **Performance**

   - Minimize operations in processNode
   - Cache results where possible

4. **Type Safety**
   - Define types for store data
   - Use types for context
