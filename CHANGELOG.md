# Reface next

Complete project restructuring with separation into independent modules.

## Major Changes

- Project divided into independent modules in monorepo style
- `@reface` sepoarated into `@recast` and `@framework`
- added modules `@reface-ui`, `@restory`, `@redocs` and common code between them in `@common`
- `@reface` is now a facade for `@recast` and `@framework`

## Modules

### @framework – all about routing and web server

- saved after sporated in `@framework`
  - `htmx`, `partials`, `islands`
- Migrated to singleton pattern
- `setupReface({...options})` is now a function that returns a singleton instance of `Reface`
- added autosetup when imported `reface` from `@reface/setup`
- added import of `reface` from `@reface`, proxy for access to current instance of `Reface`
- hono is now a dependency, and access to `reface` is now available via `reface.router`
- added reface render support to hono `c.render(Element | FragmentNode)`
- partial
  - rewrtite to use `ComponentNode` instead of `ElementNode`
  - auto-register partial handler for hono when called `createPartial(name, partial)`
- errors
  - added `errorScreen` component and handling hono errors for displaying pretty error messages and stack trace in browser
- liveReload
  - added `liveReload` plugin for hono and browser, for live reloading of changes in browser

`@framework` is shallow module, use not needed for import in direct, we always use it via `reface` facade

### `@recast` – all about templating, components, proccessing and rendering html

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
