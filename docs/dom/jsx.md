# JSX в Reface

JSX в Reface позволяет писать шаблоны в декларативном стиле, похожем на React. Это делает код более читаемым и удобным для разработчиков, знакомых с React.

## Настройка

### tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```

### Импорты

```typescript
import { createElement } from "@vseplet/reface/dom/jsx/runtime";
```

## Базовое использование

### Элементы

```typescript
// Простые элементы
const template = <div>Hello World</div>;

// С атрибутами
const template = (
  <div class="container" id="main">
    <button onClick="handleClick()">Click me</button>
  </div>
);

// Вложенные элементы
const template = (
  <div class="card">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

### Выражения

```typescript
const name = "World";
const isActive = true;

const template = (
  <div>
    {/* Интерполяция переменных */}
    <h1>Hello, {name}!</h1>

    {/* Условный рендеринг */}
    {isActive && <span>Active</span>}

    {/* Тернарный оператор */}
    <div class={isActive ? "active" : "inactive"}>Status</div>
  </div>
);
```

### Списки

```typescript
const items = ["Apple", "Banana", "Orange"];

const template = (
  <ul>
    {items.map((item) => (
      <li>{item}</li>
    ))}
  </ul>
);
```

## Styled Components

JSX отлично работает со styled компонентами:

```typescript
import { styled, div, button } from "@vseplet/reface/dom";

const StyledButton = styled(button)`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }
`;

const Card = styled(div)`
  & {
    padding: 2rem;
    border: 1px solid #ccc;
  }

  & ${StyledButton} {
    margin-top: 1rem;
  }
`;

// Использование в JSX
const template = (
  <Card>
    <h2>Card Title</h2>
    <p>Card content</p>
    <StyledButton>Click me</StyledButton>
  </Card>
);
```

## Компоненты

### Функциональные компоненты

```typescript
import { component } from "@vseplet/reface/dom";

interface ButtonProps {
  text: string;
  onClick?: string;
  primary?: boolean;
}

const Button = component<ButtonProps>(({ text, onClick, primary }) => (
  <button class={primary ? "primary" : "secondary"} onClick={onClick}>
    {text}
  </button>
));

// Использование
const App = component(() => (
  <div>
    <Button text="Primary" primary onClick="handlePrimary()" />
    <Button text="Secondary" onClick="handleSecondary()" />
  </div>
));
```

### Композиция компонентов

```typescript
const Header = component<{ title: string }>(({ title }) => (
  <header class="header">
    <h1>{title}</h1>
  </header>
));

const Footer = component(() => (
  <footer class="footer">
    <p>&copy; 2024</p>
  </footer>
));

const Layout = component<{ title: string }>(({ title }) => (
  <div class="layout">
    <Header title={title} />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
));
```

## Обработка событий

```typescript
const Form = component(() => (
  <form onSubmit="handleSubmit(event)">
    <input type="text" onInput="handleInput(event)" placeholder="Enter text" />
    <button type="submit">Submit</button>
  </form>
));
```

## Типизация

### Встроенные элементы

```typescript
// Автоматическая типизация HTML атрибутов
const element = <div class="container" id="main" />;
const input = <input type="text" required minLength={6} />;
```

### Пользовательские компоненты

```typescript
interface CardProps {
  title: string;
  content: string;
  className?: string;
}

const Card = component<CardProps>(({ title, content, className }) => (
  <div class={className}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
));

// TypeScript проверит все пропсы
const App = component(() => (
  <Card title="Hello" content="This is a card" className="custom-card" />
));
```

## Лучшие практики

1. **Именование компонентов**

   - Используйте PascalCase для имен компонентов
   - Используйте camelCase для пропсов

2. **Типизация**

   - Всегда определяйте интерфейсы для пропсов
   - Используйте строгую типизацию

3. **Структура**

   - Разбивайте большие компоненты на маленькие
   - Группируйте связанные компоненты в модули

4. **Стилизация**
   - Используйте styled components для изоляции стилей
   - Избегайте глобальных стилей
     ```

     ```
