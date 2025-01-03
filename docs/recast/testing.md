---
title: Test Utils
description: Testing utilities for Recast components and elements
tags: [testing, utils, assertions]
category: Tools
sidebar: main
order: 8
---

Import from:

```typescript
import { TestUtils } from "@reface/recast/test-utils";
```

Test utilities for Recast components and elements.

## Basic Usage

```typescript
import { TestUtils } from "@reface/recast/test-utils";

const utils = new TestUtils();

// Test template rendering
utils.assertRender(
  div({ class: "container" })`Content`,
  '<div class="container">Content</div>'
);
```

## Configuration

TestUtils can be configured with plugins:

```typescript
import { StyledPlugin } from "@reface/styled";

const utils = new TestUtils({
  plugins: [new StyledPlugin()],
});
```

## Testing Different Syntaxes

```typescript
// JSX Syntax
utils.assertRender(
  <div class="container">
    <h1>Title</h1>
    <p>Content</p>
  </div>,
  '<div class="container"><h1>Title</h1><p>Content</p></div>'
);

// Template Literal Syntax
utils.assertRender(
  html` <div class="container">${h1`Title`} ${p`Content`}</div> `,
  '<div class="container"><h1>Title</h1><p>Content</p></div>'
);

// Mixed Syntax
utils.assertRender(
  <Layout title="My Page">
    <Content />${div({ class: "dynamic" })`Dynamic Content`}
  </Layout>,
  "..."
);
```

## Debug Output

When assertion fails, TestUtils provides detailed logging:

```typescript
// On failure outputs:
// Render assertion failed:
// Expected: <expected HTML>
// Received: <actual HTML>
// Render log: <detailed render process log>
```
