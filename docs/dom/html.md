# HTML Template API в Reface

HTML Template API - это основной способ создания шаблонов в Reface. Он использует tagged template literals для создания HTML-разметки с поддержкой интерполяции и типизации.

## Основы использования

### Создание простых шаблонов

```typescript
import { html } from "@vseplet/reface";

// Простой шаблон
const template = html` <div>Hello, World!</div> `;

// Шаблон с интерполяцией
const name = "User";
const greeting = html` <div>Hello, ${name}!</div> `;

// Вложенные шаблоны
const header = html`<header>Site Header</header>`;
const footer = html`<footer>Site Footer</footer>`;

const page = html`
  ${header}

  <main>Content</main>
  ${footer}
`;
```

### Условный рендеринг

```typescript
const isLoggedIn = true;
const username = "John";

const header = html`
  <header>
    ${isLoggedIn
      ? html`<span>Welcome, ${username}!</span>`
      : html`<a href="/login">Login</a>`}
  </header>
`;

// Условный рендеринг с &&
const notification = html`
  <div>${hasError && html` <div class="error">Error occurred!</div> `}</div>
`;
```

### Циклы и списки

```typescript
const items = ["Apple", "Banana", "Orange"];

const list = html`
  <ul>
    ${items.map((item) => html` <li>${item}</li> `)}
  </ul>
`;

// С индексом и условиями
const todos = [
  { id: 1, text: "Buy milk", done: true },
  { id: 2, text: "Write docs", done: false },
];

const todoList = html`
  <ul>
    ${todos.map(
      (todo) => html`
        <li class="${todo.done ? "completed" : ""}">${todo.text}</li>
      `
    )}
  </ul>
`;
```

## Компоненты

### Создание компонентов

```typescript
import { component } from "@vseplet/reface";

// Простой компонент
const Greeting = component(() => html` <div>Hello, World!</div> `);

// Компонент с пропсами
const Button = component<{
  text: string;
  onClick?: string;
}>(({ text, onClick }) => html` <button onclick="${onClick}">${text}</button>`);

// Использование компонентов
const App = component(
  () =>
    html` ${Greeting()} ${Button({
      text: "Click me",
      onClick: "handleClick()",
    })}`
);
```

### Композиция компонентов

```typescript
// Компонент заголовка
const Header = component<{ title: string }>(
  ({ title }) => html`
    <header>
      <h1>${title}</h1>
    </header>
  `
);

// Компонент навигации
const Navigation = component(
  () => html`
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  `
);

// Компонент макета
const Layout = component<{
  title: string;
  children: Template;
}>(
  ({ title, children }) => html`
    ${Header({ title })} ${Navigation()}

    <main>${children}</main>
  `
);

// Использование
const Page = component(
  () =>
    html` ${Layout({
      title: "Welcome",
      children: html` <div>Page content</div> `,
    })}`
);
```

## Работа с атрибутами

### Динамические атрибуты

```typescript
const Button = component<{
  disabled?: boolean;
  type?: "button" | "submit";
}>(
  ({ disabled, type = "button" }) => html`
    <button type="${type}" ${disabled ? "disabled" : ""}>Click me</button>
  `
);

// Динамические data-атрибуты
const Card = component<{ id: string }>(
  ({ id }) => html`
    <div data-id="${id}" data-testid="card-${id}">Card content</div>
  `
);
```

## Безопасность

HTML Template API автоматически экранирует строки для предотвращения XSS-атак:

```typescript
const userInput = '<script>alert("XSS")</script>';

// Безопасный вывод
const safe = html` <div>${userInput}</div> `; // Строка будет экранирована

// Если нужно вставить HTML (используйте осторожно!)
const trusted = html` <div>${html(userInput)}</div> `;
```

## Лучшие практики

1. **Разделение логики**

   - Выносите сложную логику в отдельные функции
   - Используйте компоненты для переиспользования кода

2. **Типизация**

   - Всегда определяйте типы пропсов для компонентов
   - Используйте строгую типизацию для улучшения безопасности

3. **Производительность**

   - Избегайте ненужных вложенных шаблонов
   - Используйте мемоизацию для тяжелых вычислений

4. **Организация кода**
   - Группируйте связанные компоненты
   - Следуйте принципу единой ответственности

## Примеры использования

### Форма с валидацией

```typescript
const LoginForm = component(
  () => html`
    <form onsubmit="handleSubmit(event)">
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          minlength="6"
          placeholder="Enter your password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  `
);
```

### Список с фильтрацией

```typescript
const FilterableList = component<{ items: string[] }>(
  ({ items }) => html`
    <div>
      <input
        type="text"
        placeholder="Search..."
        oninput="handleFilter(event)"
      />

      <ul>
        ${items.map((item) => html` <li>${item}</li> `)}
      </ul>
    </div>
  `
);
```
