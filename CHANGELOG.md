# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 (next)

### DOM API

#### JSX Support

- `createElement(tag, props, ...children)`: Core JSX runtime function
- `Fragment`: JSX fragment support
- Full TypeScript types for HTML elements and attributes

#### Styled Components

- `styled(element)`: Creates styled component
- `css`: Template literal tag for CSS
- `cssVar(name, value?)`: CSS variable helper

#### Element Functions

- HTML elements: `div()`, `span()`, `button()`, etc.
- SVG elements: `svg()`, `path()`, `circle()`, etc.
- Void elements: `img()`, `input()`, `br()`, etc.

#### Attribute Helpers

- `attrs(attributes)`: Processes HTML attributes
- `classNames(...inputs)`: Class name utility
- `styles(...inputs)`: Style string utility

### Documentation

#### API Reference

- `dom.md`: Core DOM API concepts and usage
- `jsx.md`: JSX syntax and features guide
- `styled.md`: Styled components documentation
- `components.md`: Component system overview
- `layouts.md`: Layout system documentation

### Examples

- Added docs-viewer example
  - Server-side rendering
  - HTMX integration
  - Markdown processing
  - Syntax highlighting
  - Responsive layout

## 0.1.0

#### Template System

- `html`: Template literal tag for HTML creation
- `render(template)`: Renders template to string
- Support for nested templates and components

#### Component System

- `component<Props>(fn)`: Creates static component
- `island<RPC, Props>(config)`: Creates interactive component
- Support for RPC and REST handlers
