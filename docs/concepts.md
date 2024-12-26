# Main Concepts

## System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                           Reface                               │
│                                                                │
│  ┌─────────────┐          ┌────────────┐                       │
│  │    Deno     │          │   Router   │                       │
│  │   Server    │─────────▶│   System   │                       │
│  └─────────────┘          └────────────┘                       │
│         │                       │                              │
│         ▼                       ▼                              │
│  ┌─────────────┐          ┌────────────┐                       │
│  │   Static    │          │  Layouts   │                       │
│  │   Files     │          │            │                       │
│  └─────────────┘          └────────────┘                       │
│                                │                               │
│                                ▼                               │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                    RefaceComposer                   │       │
│  │                                                     │       │
│  │    ┌──────────┐    ┌─────────────────────────┐      │       │
│  │    │  Plugin  │───▶│     Template Process    │      │       │
│  │    │  System  │    │                         │      │       │
│  │    └──────────┘    │  1. createTemplateFactory      │       │
│  │         │          │     ↓                   │      │       │
│  │         │          │  2. createTemplate      │      │       │
│  │         │          │     ↓                   │      │       │
│  │         └─────────▶│  3. Template(attrs)     │      │       │
│  │                    │     ↓                   │      │       │
│  │                    │  4. Template`content`   │      │       │
│  │                    │     ↓                   │      │       │
│  │                    │  5. HTML Output         │      │       │
│  │                    └─────────────────────────┘      │       │
│  └─────────────────────────────────────────────────────┘       │
└────────────────────────────────────────────────────────────────┘
```

## Core Concepts

### 1. Template System

The template system is built on a chain of transformations, with plugins able to
hook into each step:

Two main ways to work with templates:

1. **Attributes** - via function call:

```typescript
div({ class: "container", id: "main" });
```

2. **Content** - via template literals:

```typescript
div`Hello world`;
```

### 2. Component Architecture

Components in Reface are functions that create and return templates. They can be
created in two ways:

1. **Elements API** - native approach
2. **JSX** - developer-friendly wrapper

Both approaches are translated into the same Template API calls.

### 3. Plugin System

Plugins extend template capabilities through a transformation system:

```typescript
interface TemplatePlugin {
  // Transform during creation
  create?: (template: Template) => Template;

  // Transform during rendering
  render?: (html: string) => string;
}
```

### 4. Islands Architecture

Islands Architecture enables interactive components without excessive
JavaScript:

1. **Partials** - components with HTMX updates
2. **Islands** - isolated micro-applications with RPC

```
Server ←→ HTMX/RPC ←→ Island Component
  ↓                          ↓
Static HTML        Isolated Interactivity
```

## Framework vs Core

1. **RefaceComposer (Core)**

   - Basic template engine
   - Plugin system
   - HTML rendering

2. **Reface (Framework)**
   - Ready-to-use ecosystem
   - Routing and layouts
   - Islands Architecture
   - Built-in plugins

## Best Practices

1. **Template Composition**

   - Use components for reusability
   - Mix Elements API and JSX where appropriate
   - Keep template nesting manageable

2. **Performance**

   - Minimize JavaScript usage
   - Use HTMX for simple updates
   - Islands only for complex interactivity

3. **Type Safety**
   - Define interfaces for props
   - Use TypeScript for components
   - Validate types in templates
