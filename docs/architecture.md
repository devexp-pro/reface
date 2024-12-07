# Architecture

Reface is built with a modular architecture that separates concerns into distinct layers. This document outlines the project structure and core concepts.

## Project Structure

```
source/
├── reface/         # Framework level
│   ├── Reface.ts   # Main framework class
│   ├── types.ts    # Framework types
│   └── mod.ts      # Public API
│
├── core/           # Core level - Template engine
│   ├── Template.ts # Template interface & types
│   ├── types.ts    # RPC & Island types
│   ├── render.ts   # Render engine
│   └── mod.ts      # Public API
│
├── html/           # HTML level - string manipulation
│   ├── attributes.ts # HTML attributes
│   ├── classes.ts   # Class names
│   ├── styles.ts    # CSS processing
│   └── mod.ts       # Public API
│
├── elements/       # Elements level - components
│   ├── factory.ts   # Element factory
│   ├── base.ts      # HTML elements
│   ├── styled.ts    # Styled components
│   ├── css.ts       # CSS utilities
│   └── mod.ts       # Public API
│
├── jsx/           # JSX level
│   ├── createElement.ts
│   ├── Fragment.ts
│   └── mod.ts
│
├── layouts/       # Layouts level
│   ├── types.ts
│   ├── clean.ts
│   ├── twa.ts
│   └── mod.ts
│
└── mod.ts        # Main public API
```

## Core Concepts

### Modular Architecture

Reface is built with modularity in mind. Each module has its own responsibility and clear boundaries:

- **Framework Level** (`reface/`) - High-level framework features
- **Core Level** (`core/`) - Template engine and rendering
- **HTML Level** (`html/`) - HTML string manipulation
- **Elements Level** (`elements/`) - Component system
- **JSX Level** (`jsx/`) - JSX support
- **Layouts Level** (`layouts/`) - Layout system

### Module Guidelines

Each module follows these principles:

1. **Clear Responsibility**

   - Each module has a single, well-defined purpose
   - Modules communicate through clear interfaces
   - Dependencies flow downward

2. **Encapsulation**

   - Internal implementation details are hidden
   - Public API exposed through `mod.ts` files
   - Clear separation between public and private features

3. **Type Safety**
   - Strong TypeScript types throughout
   - Types live with their implementations
   - Clear interfaces between modules

### Key Features

1. **Template Engine**

   - Efficient HTML rendering
   - Type-safe templates
   - Component composition

2. **Elements API**

   - HTML element abstractions
   - Styled components system
   - Factory pattern for element creation

3. **JSX Support**

   - Full TypeScript integration
   - Fragment support
   - Component composition

4. **Layouts System**
   - Clean layout
   - TWA support
   - Custom layout creation

## Development Guidelines

1. **Imports/Exports**

   - External imports only from main `mod.ts`
   - Internal imports through module `mod.ts`
   - Direct imports only within module

2. **Testing**

   - Unit tests for each module
   - Integration tests
   - Example applications

3. **Documentation**
   - Clear API documentation
   - Usage examples
   - Architecture overview
