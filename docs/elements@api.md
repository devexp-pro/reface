# Elements API Reference

## Overview

Elements module предоставляет функции для создания HTML элементов с гибким API.

## Basic Elements

### Creating Elements

```typescript
import { div, span } from "@reface/elements";
// или
import * as elements from "@reface/elements";

// Пустой элемент
div()``; // => <div></div>

// С атрибутами
div({ class: "container" })``; // => <div class="container"></div>

// С текстом
div()`Hello world`; // => <div>Hello world</div>

// С атрибутами и текстом
div({ class: "container" })`Hello world`; // => <div class="container">Hello world</div>
```

### Nested Elements

```typescript
// Вложенные элементы
div()`
  ${span()`First`}
  ${span()`Second`}
`;
// => <div><span>First</span><span>Second</span></div>

// Сложная структура
div({ class: "container" })`
  ${div({ class: "row" })`
    ${div({ class: "col" })`Content`}
  `}
`;
// => <div class="container"><div class="row"><div class="col">Content</div></div></div>
```

## Styled Components

### Creating Styled Components

```typescript
import { styled } from "@reface/elements";

// Создание styled компонента
const Button = styled.button`
  & {
    background: blue;
    color: white;
  }
`; // => StyledComponent<"button">

// Использование как обычного элемента
Button()``; // => <button style="background: blue; color: white;"></button>
Button({ class: "primary" })``; // => <button class="primary" style="background: blue; color: white;"></button>
Button()`Click me`; // => <button style="background: blue; color: white;">Click me</button>

// Наследование стилей
const PrimaryButton = styled(Button)`
  & {
    background: darkblue;
  }
`; // => StyledComponent<"button"> с объединенными стилями
```

## JSX Support

### Using with JSX

```tsx
import { createElement, Fragment } from "@reface/jsx";

// Базовое использование
<div class="container">Hello</div>
// => <div class="container">Hello</div>

// Вложенные элементы
<div class="container">
  <span>First</span>
  <span>Second</span>
</div>
// => <div class="container"><span>First</span><span>Second</span></div>

// Использование Fragment
<Fragment>
  <div>One</div>
  <div>Two</div>
</Fragment>
// => <div>One</div><div>Two</div>

// Со styled компонентами
<Button class="primary">Click me</Button>
// => <button class="primary" style="background: blue; color: white;">Click me</button>
```

## Types

### Element Factory

```typescript
type ElementFactory<A = HTMLAttributes> = {
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};
```

### Template

```typescript
interface Template {
  tag: string;
  attributes: string;
  children: (string | Template)[];
  css: string;
  isTemplate: true;
  str: TemplateStringsArray;
  args: string[];
  rootClass: string;
}
```

### Styled Component

```typescript
interface StyledComponent<T = string> {
  (props?: Record<string, unknown>): Template;
  css: string;
  isTemplate: true;
  tag: T;
}
```
