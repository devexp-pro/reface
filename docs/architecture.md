# Architecture

## System Architecture

```ts
┌─────────────────────────────────────────┐
│               Reface                    │
│                                         │
│  ┌─────────────┐       ┌────────────┐   │
│  │    Deno     │       │   Router   │   │
│  │   Server    │─────▶ │   System   │   │
│  └─────────────┘       └────────────┘   │
│         │                    │          │
│         ▼                    ▼          │
│  ┌─────────────┐       ┌────────────┐   │
│  │   Static    │       │  Layouts   │   │
│  │   Files     │       │            │   │
│  └─────────────┘       └────────────┘   │
│                             │           │
│                             ▼           │
│  ┌─────────────────────────────────┐    │
│  │         RefaceComposer          │    │
│  │                                 │    │
│  │    ┌──────────┐  ┌──────────┐   │    │
│  │    │  Plugin  │  │ Template │   │    │
│  │    │  System  │  │ Process  │   │    │
│  │    └──────────┘  └──────────┘   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │      Interactive System         │    │
│  │                                 │    │
│  │  ┌──────────┐      ┌────────┐   │    │
│  │  │ Partials │      │Islands │   │    │
│  │  │  (HTMX)  │      │ (RPC)  │   │    │
│  │  └──────────┘      └────────┘   │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Reface Framework

High-level framework providing:

- Deno server integration
- Static file handling
- Routing system
- Layout management
- Plugin configuration
- Interactive architecture

### 2. RefaceComposer

Template composition engine:

- Plugin management
- Template processing
- HTML generation
- Component system

### 3. Interactive System

#### Partials (HTMX)

- Live components
- REST-based updates
- HTMX integration
- State management

#### Islands (RPC)

- Micro-applications
- RPC protocol support
- Rich interactions
- Isolated state

## Implementation Details

### Server Layer

```typescript
class Reface {
  constructor(options: { layout: Layout }) {
    this.layout = options.layout;
  }

  // Page routing
  page(route: string, generator: TemplateGenerator<PageProps>) {
    // Page registration
  }

  // Server adapters
  hono() {
    /* Hono integration */
  }
  oak() {
    /* Oak integration */
  }
  express() {
    /* Express integration */
  }
}
```

### Interactive Components

```typescript
// Partial Component (HTMX-based)
const Counter = partial(async () => {
  return (
    <div>
      <button {...Counter.trigger()}>Increment</button>
    </div>
  );
}, "counter");

// Island Component (RPC-based)
const TodoApp = Reface.addIsland({
  name: "todo",
  template: ({ rpc, rest }) => (
    <div>
      <button {...rpc.hx.addTodo()}>Add</button>
      <button {...rest.hx("self", "get", "/list")}>Refresh</button>
    </div>
  ),
  rpc: {
    addTodo: async ({ args }) => {
      /* RPC handler */
    },
  },
  rest: {
    "get|/list": async (req) => {
      /* REST handler */
    },
  },
});
```

## Module Structure

```
@reface/
├── core/                  # Core composition engine
│   └── RefaceComposer    # Template composition
│
├── framework/            # Reface framework
│   ├── server/          # Deno server
│   ├── router/          # Routing system
│   └── static/          # Static files
│
├── interactive/         # Interactive components
│   ├── partials/       # HTMX components
│   └── islands/        # RPC components
│
└── plugins/            # Official plugins
```

## Development Plans

### Near Future

1. **Framework Layer**

   - Full server integration
   - Advanced routing
   - Middleware system
   - Static optimization

2. **Islands Architecture**

   - Enhanced RPC system
   - State management
   - TypeScript integration
   - Development tools

3. **Build System**
   - Asset optimization
   - Code splitting
   - Tree shaking
   - Bundle analysis
