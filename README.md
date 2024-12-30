<div align="center">
  <img src="./website/public/assets/logo.png" alt="Reface Logo" width="200" />
</div>

# [Reface](https://reface.deno.dev/)

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)
[![JSR Score](https://jsr.io/badges/@vseplet/reface/score)](https://jsr.io/@vseplet/reface)
[![Discord](https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white)](https://discord.gg/gT4gvVwqb8)

Modern web framework for building interactive applications with Islands
Architecture.

## Features

- 🎯 **Type-safe Templates** - Full TypeScript support with JSX
- 🧩 **Template Composition** - Mix JSX and template literals
- 🔌 **Plugin System** - Extensible composition pipeline
- 🎨 **Styled Components** - CSS-in-JS with type safety
- 🏝️ **Partial System** - Interactive components with HTMX
- 🚀 **Framework Agnostic** - Core composition engine

## What is Reface?

Reface is a modern web framework built on two key components:

1. **Core Library** (RefaceComposer) - Template engine for HTML generation
2. **Framework** (Reface) - Full-featured web framework with plugins and Islands
   Architecture

- [Getting Started](./docs/getting-started.md) - Quick introduction and basic
  setup
- [Main Concepts](./docs/concepts.md) - Core ideas and architecture
- [API Reference](./docs/api.md) - Detailed API documentation

### Quick Example

```typescript
// Core API (Template Engine)
import { RefaceComposer } from "@reface/core";

const composer = new RefaceComposer();
const template = div({ class: "greeting" })`Hello ${name}!`;
const html = composer.render(template);

// Framework API (Full Features)
import { Reface } from "@reface";

const app = new Reface({
  layout: Layout,
}).page("/", Home);

Deno.serve(app.fetch);
```

## Installation

```typescript
// Using Deno
import { Reface } from "jsr:@vseplet/reface";

// Using NPM (coming soon)
npm install @reface/core
```

MIT © [Reface](./LICENSE)
