# DOM API в Reface

DOM API предоставляет удобный способ создания HTML элементов в функциональном стиле с типизацией и вспомогательными утилитами.

## Основные элементы

### Создание элементов

Каждый HTML элемент представлен функцией, которая принимает атрибуты и возвращает шаблонный литерал:

```typescript
import { div, span, a, button } from "@vseplet/reface/dom";

// Простой div
div()`Hello World`;

// Div с атрибутами
div({ id: "greeting", class: "message" })`  Hello World`;

// Вложенные элементы
div({ class: "card" })`
  ${h1()`Title`}
  ${p()`Content`}
  ${button({ onClick: "alert('clicked')" })`Click me`}
`;
```

## Утилиты для работы с классами

### Управление классами

Для управления классами элементов используется встроенный атрибут `class`. Он поддерживает как строковые значения, так и объекты с условиями:

### Примеры использования class

```typescript
import { div } from "@vseplet/reface/dom";

// Простое строковое значение
div({ class: "card" })`Content`;

// Несколько классов
div({ class: "card primary large" })`Content`;

// Условные классы через объект
div({
  class: {
    card: true,
    active: isActive,
    disabled: isDisabled,
    loading: isLoading,
  },
})`Content`;

// Комбинирование строк и объектов
div({
  class: [
    "card", // базовый класс
    props.className, // классы из пропсов
    {
      "card--active": isActive,
      "card--disabled": isDisabled,
    },
    size && `card--${size}`, // условный класс с модификатором
    {
      "card--loading": isLoading,
      "card--error": hasError,
    },
  ],
})`Content`;

// Практический пример компонента кнопки
const Button = component<{
  primary?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}>(
  ({
    primary = false,
    size = "medium",
    disabled = false,
    loading = false,
    className,
  }) =>
    button({
      class: [
        "button", // базовый класс
        className, // внешние классы
        `button--${size}`, // модификатор размера
        {
          "button--primary": primary, // вариант кнопки
          "button--disabled": disabled,
          "button--loading": loading,
        },
      ],
      disabled,
    })`    ${loading ? "Loading..." : "Click me"}
 `
);

// Использование компонента Button
const App = component(
  () => div()`  ${Button({ primary: true, size: "large" })}
  ${Button({ disabled: true })}
  ${Button({ loading: true, className: "custom-button" })}`
);
```

## Работа со стилями

### Работа со стилями

Для управления стилями элементов используется встроенный атрибут `style`. Он поддерживает как строковые значения, так и объекты для определения инлайн-стилей:

```typescript
import { div } from "@vseplet/reface/dom";

// Простое строковое значение
div({ style: "background: white; padding: 1rem;" })`Content`;

// Использование объекта для стилей
div({
  style: {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
})`Content`;

// Динамические стили
const Button = component<{ primary?: boolean }>(
  ({ primary }) => button({
    style: {
      background: primary ? "blue" : "gray",
      color: "white",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "4px",
    },
  })`
    Click me
  `
);

// Использование компонента Button
const App = component(
  () => div()`
  ${Button({ primary: true })}
  ${Button({ primary: false })}
`
);
```

### Примеры использования style

```typescript
// Базовое использование
div({ style: "color: red; font-size: 16px;" }); // => style="color: red; font-size: 16px;"

// Использование объекта
div({ style: { color: "red", fontSize: "16px" } }); // => style="color: red; font-size: 16px;"

// Динамические стили
const isActive = true;
div({
  style: {
    color: isActive ? "green" : "red",
    fontWeight: isActive ? "bold" : "normal",
  },
}); // => style="color: green; font-weight: bold;"

// Комбинирование строк и объектов
div({
  style: ["display: flex;", { justifyContent: "center", alignItems: "center" }],
}); // => style="display: flex; justify-content: center; align-items: center;"

// Практические примеры
const Card = component<{ highlighted?: boolean }>(
  ({ highlighted }) => div({
    style: {
      background: "white",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      border: highlighted ? "2px solid blue" : "none",
    },
  })`
    Card Content
  `
);

const Badge = component<{ count: number }>(
  ({ count }) => span({
    style: {
      display: "inline-block",
      padding: "0.25rem 0.5rem",
      background: count > 0 ? "red" : "gray",
      color: "white",
      borderRadius: "12px",
    },
  })`
    ${count}
  `
);
```

## Типизация

DOM API полностью типизирован, что обеспечивает безопасность типов и автодополнение в IDE:

```typescript
// Типизированные атрибуты для input
const SearchInput = component(
  () =>
    input({
      type: "search",
      placeholder: "Search...",
      required: true,
      minLength: 3,
      "aria-label": "Search input",
    })``
);

// Типизированные атрибуты для ссылок
const Link = component(
  () =>
    a({
      href: "https://example.com",
      target: "_blank",
      rel: "noopener noreferrer",
    })`    Visit site
 `
);
```

## Работа с событиями

DOM API поддерживает все стандартные события HTML:

```typescript
const InteractiveButton = component(
  () =>
    button({
      onClick: "handleClick(event)",
      onMouseEnter: "handleHover(event)",
      onMouseLeave: "handleLeave(event)",
    })`    Hover me
 `
);
```

## ARIA и доступность

DOM API включает поддержку ARIA-атрибутов для создания доступных компонентов:

```typescript
const Modal = component(
  () =>
    div({
      role: "dialog",
      "aria-modal": true,
      "aria-labelledby": "modal-title",
      "aria-describedby": "modal-content",
    })`
    ${h2({ id: "modal-title" })`Modal Title`}
    ${div({ id: "modal-content" })`Modal content`}
  `
);
```

## Практические примеры

### Карточка продукта

```typescript
const ProductCard = component<{
  title: string;
  price: number;
  isAvailable: boolean;
}>(
  ({ title, price, isAvailable }) =>
    div({
      class: classNames("product-card", {
        available: isAvailable,
        "sold-out": !isAvailable,
      }),
      style: {
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: "8px",
      },
    })`
    ${h3({ class: "title" })`${title}`}
    ${div({ class: "price" })`$${price}`}
    ${button({
      disabled: !isAvailable,
      class: classNames("buy-button", {
        disabled: !isAvailable,
      }),
    })`
${isAvailable ? "Buy Now" : "Sold Out"}
`}
  `
);
```

### Форма с валидацией

```typescript
const LoginForm = component(
  () =>
    form({
      class: "login-form",
      onSubmit: "handleSubmit(event)",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      },
    })`
    ${div({ class: "form-group" })`
${label({ for: "email" })`Email:`}
${input({
  id: "email",
  type: "email",
  required: true,
  placeholder: "Enter your email",
})``}
    `}

    ${div({ class: "form-group" })`
      ${label({ for: "password" })`Password:`}
      ${input({
        id: "password",
        type: "password",
        required: true,
        minLength: 6,
        placeholder: "Enter your password",
      })``}
    `}

    ${button({
      type: "submit",
      class: classNames("submit-button", {
        loading: isLoading,
      }),
    })`
      ${isLoading ? "Loading..." : "Login"}
    `}

`
);
```

## Заключение

DOM API в Reface предоставляет мощный и типобезопасный способ создания HTML-элементов с поддержкой современных возможностей CSS и JavaScript. Использование утилит `classNames` и `styles` делает работу с классами и стилями более удобной и предсказуемой.
