---
title: Render API
description: API for transforming NodeProxies into HTML in Recast
tags: [render, html, pipeline]
category: Advanced
sidebar: main
order: 7
---

Import from:

```typescript
import { Recast } from "@reface/recast";
```

## Basic Usage

```typescript
// Create Recast instance
const recast = new Recast();

// Add plugins
recast.use(new LoggerPlugin());
recast.use(new StyledPlugin());

// Simple HTML rendering
const template = div({ class: "container" })`
  ${h1`Title`}
  ${p`Content`}
`;

const html = recast.renderHTML(template);
// <div class="container"><h1>Title</h1><p>Content</p></div>

// Full render with metadata
const result = recast.render(template);
// {
//   html: "<div class="container">...</div>",
//   styles: [".s1a { color: red; }"],
//   slots: {
//     missing: ["header"],
//     used: ["content"]
//   },
//   resources: {
//     scripts: [],
//     styles: []
//   }
// }
```

## Component Phase

First, all components are processed:

```typescript
const Page = component((props: Props, children: Children) => (
  <Layout>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Layout>
));

// 1. Components are rendered top-down
// 2. Each component creates its Node instance
// 3. Component slots are resolved
// 4. Component resources are collected
```

## Template Phase

Then, all remaining NodeProxies are processed:

```typescript
const element = div`
  ${h1`Title`}
  ${null}         // Removed
  ${["a", "b"]}   // Joined
  ${p`Content`}
`;

// 1. NodeProxies are rendered depth-first
// 2. Attributes are normalized
// 3. Children are processed
// 4. HTML is generated
```

## Plugin Integration

Plugins can hook into any render phase:

```typescript
class MyPlugin {
  name = "my-plugin";

  setup(recast) {
    // Initialize plugin
  }

  beforeRender(context) {
    // Pre-render setup
  }

  processNode(node, context) {
    // Transform nodes
    if (context.phase === "component") {
      // Component phase processing
    }
    if (context.phase === "Template") {
      // Template phase processing
    }
    return node;
  }

  afterRender(context) {
    // Post-render cleanup
  }
}

recast.use(new MyPlugin());
```

## Performance

Render process is optimized for:

- Memory usage through streaming
- String concatenation
- Resource deduplication
- Cache utilization
