# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0 (next)

### Release Notes

Reface 1.0.0 introduces a unified template system with three powerful ways to create templates:

1. JSX Components:

```tsx
// Type-safe components with props
const Greeting = component<{ name: string }>(({ name }, children) => (
  <div class="greeting">
    Hello, {name}! {children}
  </div>
));

// Usage in JSX
<Greeting name="John">Welcome!</Greeting>;
```

2. Template Literals:

```tsx
// Basic elements
const container = div({ class: "container" });
container`Hello World`;

// Components with props
const greeting = Greeting({ name: "John" });
greeting`Welcome!`;

// Styled components
const button = Button({ class: "primary" });
button`Click me`;
```

3. Styled Components:

```tsx
const Button = styled.button`
  & {
    color: blue;
    padding: 1rem;
  }
  &:hover {
    background: darkblue;
  }
`;

// Use in JSX
<Button class="primary">Click me</Button>;

// Use with template literals
Button({ class: "primary" })`Click me`;

// Extend existing components
const PrimaryButton = styled(Button)`
  & {
    background: blue;
    color: white;
  }
`;
```

Key Features:

- Full TypeScript support with type inference
- Mix and match all approaches freely
- Secure by default with automatic HTML escaping
- Efficient rendering with minimal overhead
- Comprehensive component lifecycle
- Rich styling system with CSS-in-JS

### Framework Level (`/reface`)

- Added comprehensive test suite with integration tests
- Added error handling system with detailed error reporting
- Added new documentation website
  - Interactive code examples
  - Live component previews
  - Responsive design
  - Dark/light theme support
  - Search functionality

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
- Added error context system
  - Component stack traces
  - JSX stack traces
  - Detailed error reporting
  - Error formatting utilities

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
- Added utilities
  - Class name generation
  - Class name combining
  - HTML escaping
  - Attribute escaping

### Elements Level (`/elements`)

- Added component system
  - HTML elements (`div`, `span`, etc.)
  - SVG elements (`svg`, `path`, etc.)
  - Void elements (`img`, `input`, etc.)
- Added styled components
  - `styled` factory with proxy support
  - CSS-in-JS support
  - Theme system
  - Nested selectors support
  - Pseudo-class handling
  - Media query support
- Added security features
  - XSS protection
  - Safe HTML fragments
  - Attribute escaping
- Added element factories
  - Type-safe element creation
  - Attribute validation
  - Children processing
- Added comprehensive element types
  - Button attributes
  - Input attributes
  - Form attributes
  - Table attributes
  - Media attributes

### JSX Level (`/jsx`)

- Added JSX support
  - `createElement` function
  - `Fragment` component
  - Full TypeScript integration
- Added component features
  - Props validation
  - Children handling
  - Event handling
- Added error handling
  - JSX stack traces
  - Component stack traces
  - Detailed error messages

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
- Added new documentation website
  - Modern design with responsive layout
  - Interactive code examples with syntax highlighting
  - Live component previews
  - Markdown-based documentation
  - Auto-generated API docs
  - Full-text search
  - Table of contents navigation
  - Mobile-friendly interface
  - Performance optimized
  - Live reload during development

### Website

- Added new website with modern design
  - Landing page with feature overview
  - Interactive examples
  - Documentation browser
  - Component showcase
  - Installation guide
  - Quick start tutorial

## 0.1.0

### Framework Level (`/reface`)

- Added `Reface` class for application setup
- Added support for layouts and pages
- Added RPC and REST handlers for islands
- Added server adapters (Hono, Oak, Express)

#### Template System

- `html`: Template literal tag for HTML creation
- `render(template)`: Renders template to string
- Support for nested templates and components

#### Component System

- `component<Props>(fn)`: Creates static component
- `island<RPC, Props>(config)`: Creates interactive component
- Support for RPC and REST handlers

### Layouts Level (`/layouts`)

- Added layout system
  - Clean layout
  - TWA layout
  - Custom layout support
- Added features
  - Meta tags
  - Scripts injection
  - Style handling
