# Использование `styled` API в Reface

`styled` API позволяет создавать компоненты с изолированными стилями, используя современный CSS с поддержкой вложенности. Это делает стилизацию компонентов более удобной и декларативной.

## Основы использования

### Создание стилизованного компонента

Вы можете создать стилизованный компонент, используя функцию `styled`. Она принимает фабрику элемента и возвращает новую фабрику с добавленными стилями.

```typescript
import { styled, button, span } from "@vseplet/reface/dom";

const StyledButton = styled(button)`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }

  &:hover {
    background: darkblue;
  }

  & .icon {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    & {
      padding: 0.5rem;
    }
  }
`;

// Использование компонента
const MyComponent = component(
  () =>
    StyledButton({ onClick: "alert('clicked')" })`
    Click me
    ${span({ class: "icon" })`👋`}
  `
);
```

### Вложенные стили

С помощью `&` вы можете создавать вложенные стили, которые применяются к дочерним элементам или псевдоклассам.

```typescript
const Card = styled(div)`
  & {
    background: white;
    border-radius: 8px;
    padding: 1rem;
  }

  & .title {
    font-size: 1.5rem;
    color: #333;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    & {
      padding: 0.5rem;
    }
  }
`;
```

### Использование медиа-запросов

Вы можете использовать медиа-запросы для адаптивной стилизации компонентов.

```typescript
const ResponsiveBox = styled(div)`
  & {
    width: 100%;
    height: 200px;
    background: lightgray;
  }

  @media (max-width: 600px) {
    & {
      height: 100px;
    }
  }
`;
```

### Композиция стилей

Вы можете комбинировать стилизованные компоненты для создания более сложных компонентов.

```typescript
const BaseButton = styled(button)`
  & {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PrimaryButton = styled(BaseButton)`
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

const SecondaryButton = styled(BaseButton)`
  & {
    background: gray;
    color: white;
  }

  &:hover {
    background: darkgray;
  }
`;
```

### Динамические стили

Вы можете использовать пропсы для создания динамических стилей.

```typescript
const DynamicButton = styled(button)`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 4px;
  }
`;

// Использование
DynamicButton({ primary: true })`Click me`;
```

## Советы и рекомендации

1. **Изоляция стилей**

   - Используйте уникальные классы для компонентов
   - Избегайте глобальных стилей
   - Используйте вложенность для организации стилей

2. **Производительность**

   - Создавайте стилизованные компоненты вне рендер-функций
   - Используйте кэширование для часто используемых стилей

3. **Организация кода**
   - Группируйте связанные стили вместе
   - Используйте композицию для переиспользования стилей
   - Следуйте принципу DRY (Don't Repeat Yourself)

## Примеры использования

### Форма с стилизованными компонентами

```typescript
const Form = styled(form)`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Input = styled(input)`
  & {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &:focus {
    outline: none;
    border-color: blue;
  }
`;

const SubmitButton = styled(button)`
  & {
    padding: 0.5rem;
    background: blue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  &:hover {
    background: darkblue;
  }
`;

// Использование
const LoginForm = component(
  () =>
    Form()`
    ${Input({ type: "email", placeholder: "Email" })}
    ${Input({ type: "password", placeholder: "Password" })}
    ${SubmitButton({ type: "submit" })`Login`}
  `
);
```

## Заключение

styled API в Reface предоставляет мощный и гибкий способ стилизации компонентов, сохраняя при этом изоляцию и удобство использования. Это позволяет создавать более чистый и поддерживаемый код.
