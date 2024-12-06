# Reface Roadmap

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

1. **Modular Architecture**

   - Each module has its own responsibility
   - Clear boundaries between modules
   - Public API through mod.ts files

2. **Template Engine**

   - Core Template interface
   - Efficient rendering
   - Type safety

3. **Elements API**

   - HTML elements
   - Styled components
   - Factory pattern

4. **JSX Support**

   - Full TypeScript support
   - Fragment support
   - Component composition

5. **Layouts System**
   - Clean layout
   - TWA support
   - Custom layouts

## Development Guidelines

1. **Imports/Exports**

   - External imports only from main mod.ts
   - Internal imports through module mod.ts
   - Direct imports only within module

2. **Types**

   - Types live with their implementations
   - Clear interfaces between modules
   - Strong type safety

3. **Testing**
   - Unit tests for each module
   - Integration tests
   - Example apps

## Future Plans

1. **Core Improvements**

   - [ ] Streaming support
   - [ ] Better error handling
   - [ ] Performance optimizations

2. **Elements API**

   - [ ] More base elements
   - [ ] Better styled components
   - [ ] Animation support

3. **Layouts**

   - [ ] More built-in layouts
   - [ ] Layout composition
   - [ ] Dynamic layouts

4. **Framework**
   - [ ] Better routing
   - [ ] Middleware support
   - [ ] State management
