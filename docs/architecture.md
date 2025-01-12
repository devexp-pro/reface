# Reface Ecosystem

Server-side rendering framework built on Deno runtime. Focused on simplicity, performance and developer experience.

## Core Modules

| Module           | Description                             |
| ---------------- | --------------------------------------- |
| Reface Framework | Web framework with Islands and Partials |
| ReCast           | Template engine                         |
| Reface UI        | Core component library                  |
| ReStory          | Component development environment       |
| ReDocs           | Built-in documentation system           |

## System Architecture

```
┌───────────────────────────────────────────────────────┐
│                  Development Tools                    │
├───────────────────────────┬───────────────────────────┤
│         ReStory           │          ReDocs           │
├───────────────────────────┴───────────────────────────┤
│                        Reface UI                      │
├───────────────────┬───────────────────┬───────────────┤
│    Components     │     Layout        │    Theme      │
├───────────────────┴───────────────────┴───────────────┤
│                  Reface Framework                     │
├───────────────────┬───────────────────┬───────────────┤
│      Islands      │     Partials      │    Router     │
├───────────────────┴───────────────────┴───────────────┤
│                      ReCast                           │
├───────────────────────────────────────────────────────┤
│                       Deno                            │
└───────────────────────────────────────────────────────┘
```

## Module Details

### ReCast

Template engine for server-side rendering:

- Component system
- Template composition
- Plugin architecture
- HTML generation

### Reface Framework

Web framework built on ReCast:

- Server integration (Hono)
- Routing system
- Islands architecture
- Partials (HTMX-based components)

### Reface UI

Core component library:

- Base components
- Layout system
- Theming
- Utilities

### ReStory

Component development environment:

- Component preview
- Documentation
- Visual testing
- Theme editor

### ReDocs

Documentation system:

- MDX support
- Code examples
- Live previews
- API references
