---
title: Slots System
description: Content distribution mechanism for Recast components
tags: [slots, content, distribution]
category: Features
sidebar: main
order: 5
---

Import from:

```typescript
import { createSlot, Template } from "@reface/recast/slots";
```

Slots System provides a mechanism for content distribution and management across components.

## Content Distribution

Recast provides a slot system for content distribution:

```typescript
import { createSlot } from "@reface/slots";
import { Template } from "@reface/slots";

// Create named slot
const HeadSlot = createSlot("head");
const TitleSlot = createSlot(
  "head.title",
  (content) => title`${content}` // Optional render transform
);

// Fill slots with content using ComponentTemplate
const Page = component((props: Props, children: Children) => (
  <html>
    <head>
      <HeadSlot /> {/* Slot placeholder */}
      <TitleSlot>Page Title</TitleSlot>
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
));

// Provide content for slots
const Layout = component((props: Props, children: Children) => (
  <>
    <Template slot="head">
      <meta charset="utf-8" />
      <link rel="stylesheet" href="/style.css" />
    </Template>

    <Template slot="head.title" key="main">
      My Website
    </Template>
    {children}
  </>
));
```

## Key Features

1. **Named Slots**

   - Unique slot identifiers
   - Optional render transforms
   - Hierarchical naming (e.g., "head.title")

2. **Multiple Providers**

   - Multiple content providers for same slot
   - Content deduplication via keys
   - Custom content merging logic

3. **Scope Control**

   - Global slots
   - Component-scoped slots
   - Inheritance control

4. **Content Management**
   - Content collection
   - Key-based deduplication
   - Transform pipeline
   - Injection system

## Built-in Slots

Recast provides several built-in slots:

```typescript
// Head content
const HeadSlot = createSlot("head");

// Page title
const TitleSlot = createSlot("head.title", (content) => title`${content}`);

// End of body content
const BodyEndSlot = createSlot("body.end");

// Usage with Template
const Page = component((props: Props, children: Children) => (
  <html>
    <head>
      <HeadSlot />
      <TitleSlot>Default Title</TitleSlot>
    </head>
    <body>
      {children}
      <BodyEndSlot />
    </body>
  </html>
));
```

## Render Process

During render, slots follow this process:

1. Slots collect content from Templates
2. Content is deduplicated by keys
3. Optional render transforms are applied
4. Content is injected into slot placeholders

## Best Practices

1. Use meaningful slot names
2. Always provide keys for content deduplication
3. Use hierarchical naming for related slots
4. Keep transforms pure and simple
5. Consider scope when designing slot structure
