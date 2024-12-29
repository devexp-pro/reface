# Reface next

Complete project restructuring with separation into independent modules.

## Major Changes

- Project divided into independent modules in monorepo style
- Improved modularity and component reusability

## Modules

### @recast

Core templating engine:

- Expression System:
  - Component Expression: `ComponentNode<Attrs, Methods>` - Component-based templating with attributes and methods
  - Element Expression: `ElementNode<Attrs>` - HTML element rendering with attributes
  - Fragment Expression: `FragmentNode` - Fragment support for grouping elements
  - Function Expression: `(context?: RenderOptions) => Child[] | Child` - Function-based templates
  - Primitive Expression: `string | number | boolean | null | undefined` - Basic value types
  - Text Content Expression: `{ type: "text", content: string, meta: Meta }` - Text node handling
  - HTML Content Expression: `{ type: "html", content: string, meta: Meta }` - Raw HTML support
  - Array Expression: `Children[]` - Array rendering support
  - Async Expression: `Promise<Child | Children>` - Async template support
- Plugin System
- JSX Runtime
- Component Model:
  - Proxy-based component system
  - Automatic component naming and ID generation
  - Component payload structure:
    - `name`: Component name (auto-generated if not provided)
    - `id`: Unique component identifier
    - `attributes`: Component props and attributes
    - `children`: Component children elements
    - `render`: Component render function
    - `meta`: Additional metadata storage
    - `methods`: Component methods
  - Component lifecycle:
    - Creation with `create()`
    - Rendering with context
    - Deep copying with `copy()`
  - Type-safe components with `ComponentNode<Attrs, Methods>`
- Slots and Fragments
- Component Styling
- Testing Utilities

### @reface/framework

Web application framework:

- Server-side rendering
- Routing
- State management
- API integration

### @reface-ui

UI component library:

- Base components
- Theming
- Accessibility
- Responsive design

### @restory

Component development and documentation tool:

- CLI interface
- Live examples
- Interactive documentation
- Component testing

### @redocs

Documentation system:

- Automatic documentation generation
- TypeScript integration
- Usage examples

### @common

Common utilities and types:

- TypeScript types
- Helper functions
- Common interfaces
