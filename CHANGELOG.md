# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 (next)

### Framework Level (`/reface`)

- Added `Reface` class for application setup
- Added support for layouts and pages
- Added RPC and REST handlers for islands
- Added server adapters (Hono, Oak, Express)

### Core Level (`/core`)

- Added template engine core
  - `Template` interface and types
  - `TemplateFragment` for trusted HTML
  - Efficient render engine
  - Type-safe templates
- Added security features
  - Automatic HTML escaping
  - Attribute value escaping
  - XSS protection
  - Safe HTML fragments

### HTML Level (`/html`)

- Added HTML string manipulation
  - `html` template tag with XSS protection
  - Attribute processing
  - Class name handling
  - Style processing
- Added type safety features
  - Strong type checking
  - Template validation
  - Attribute validation

### Elements Level (`/elements`)

- Added component system
  - HTML elements (`div`, `span`, etc.)
  - SVG elements (`svg`, `path`, etc.)
  - Void elements (`img`, `input`, etc.)
- Added styled components
  - `styled` factory
  - CSS-in-JS support
  - Theme system
- Added security features
  - XSS protection
  - Safe HTML fragments
  - Attribute escaping

### JSX Level (`/jsx`)

- Added JSX support
  - `createElement` function
  - `Fragment` component
  - Full TypeScript integration
- Added component features
  - Props validation
  - Children handling
  - Event handling

### Layouts Level (`/layouts`)

- Added layout system
  - Clean layout
  - TWA layout
  - Custom layout support
- Added features
  - Meta tags
  - Scripts injection
  - Style handling

### Documentation

- Added architecture documentation
- Added API reference
  - Core concepts
  - Component guide
  - Security guide
- Added examples
  - Docs viewer
  - Server-side rendering
  - HTMX integration

## 0.1.0

#### Template System

- `html`: Template literal tag for HTML creation
- `render(template)`: Renders template to string
- Support for nested templates and components

#### Component System

- `component<Props>(fn)`: Creates static component
- `island<RPC, Props>(config)`: Creates interactive component
- Support for RPC and REST handlers
