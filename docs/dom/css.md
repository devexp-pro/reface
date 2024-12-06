# CSS API in Reface

CSS API provides powerful tools for styling components with support for style isolation and modern CSS features.

## Core Concepts

Each component can have a unique `rootClass` which is used for style isolation. This allows styles to be applied to specific components without affecting other parts of the application.

## styled API

### Basic Usage

```typescript
import { styled, div } from "@vseplet/reface/dom";

const Card = styled(div)`
  & {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Usage
const App = component(() => Card()`Hello World`);
```

### Nested Selectors

```typescript
const Container = styled(div)`
  & {
    padding: 2rem;
  }

  & .title {
    font-size: 1.5rem;
    color: #333;
  }

  & .content {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    & {
      padding: 1rem;
    }
  }
`;
```

### Component Composition

```typescript
const Button = styled(button)`
  & {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: blue;
    color: white;
  }
`;

const Card = styled(div)`
  & {
    padding: 1rem;
  }

  & ${Button} {
    margin-top: 1rem;
  }
`;

// Usage
const App = component(
  () => Card()`
    Some content
    ${Button()`Click me`}
  `
);
```

## css API

The CSS API allows you to apply styles to existing components without modifying them.

### Basic Usage

```typescript
import { css } from "@vseplet/reface/dom";

const MyComponent = component(() => div({ class: "my-component" })`Content`);

// Apply styles to component
const StyledComponent = css`
  ${MyComponent} {
    color: red;
    font-size: 16px;
  }

  ${MyComponent}:hover {
    color: blue;
  }
`(MyComponent);
```

### Media Queries

```typescript
const ResponsiveComponent = css`
  ${MyComponent} {
    width: 100%;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    ${MyComponent} {
      padding: 1rem;
    }
  }
`(MyComponent);
```

## Practical Examples

### Component Theme

```typescript
const theme = {
  primary: "blue",
  secondary: "gray",
  spacing: "1rem",
};

const ThemedButton = styled(button)`
  & {
    padding: ${theme.spacing};
    background: ${theme.primary};
    color: white;
    border: none;
    border-radius: 4px;
  }

  &.secondary {
    background: ${theme.secondary};
  }
`;

const ThemedCard = styled(div)`
  & {
    padding: ${theme.spacing};
    border: 1px solid ${theme.secondary};
  }

  & ${ThemedButton} {
    margin-top: ${theme.spacing};
  }
`;
```

### Component with States

```typescript
const StatusButton = styled(button)`
  & {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    transition: all 0.3s;
  }

  &.success {
    background: green;
    color: white;
  }

  &.error {
    background: red;
    color: white;
  }

  &.loading {
    background: gray;
    color: white;
    cursor: wait;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Usage
const App = component(
  () => html`
    ${StatusButton({ class: "success" })`Success`} ${StatusButton({
      class: "error",
    })`Error`} ${StatusButton({ class: "loading" })`Loading...`} ${StatusButton(
      { class: "success" }
    )`Success`} ${StatusButton({
      class: "error",
    })`Error`} ${StatusButton({ class: "loading" })`Loading...`}
  `
);
```

### Адаптивная карточка

```typescript
const AdaptiveCard = styled(div)`
  & {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    transition: all 0.3s;
  }

  & .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  & .content {
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    & {
      padding: 1.5rem;
    }

    & .title {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    & {
      padding: 1rem;
      border-radius: 4px;
    }

    & .title {
      font-size: 1rem;
    }
  }
`;

// Использование
const App = component(
  () =>
    AdaptiveCard()`    <h2 class="title">Card Title</h2>
    <div class="content">
      Card content goes here...
    </div>
 `
);
```

## Глобальные стили

Для определения глобальных стилей можно использовать функцию `style` в сочетании с `css`:

```typescript
import { style, css } from "@vseplet/reface/dom";

// Определение глобальных стилей
const globalStyles = style()`
  ${css`
    /_ Reset styles _/ \* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
      line-height: 1.5;
    }

    /* Theme variables */
    :root {
      --primary-color: #007bff;
      --secondary-color: #6c757d;
    }

    /* Global components */
    .button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
    }

    /* Utility classes */
    .mt-1 {
      margin-top: 0.5rem;
    }
    .mt-2 {
      margin-top: 1rem;
    }
    .mt-3 {
      margin-top: 1.5rem;
    }
  `}
`;

// Использование в компоненте
const App = component(
  () => html`
    ${globalStyles}

    <div>Your app content</div>
  `
);
```
