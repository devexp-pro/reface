# Дизайн-документация: Reface UI

## Reference:

- https://github.com/pmndrs/leva - 🌋 React-first components GUI

## Введение

Reface UI - это библиотека компонентов, построенная на принципах серверного рендеринга и современных веб-стандартах:

### Основные принципы

1. **Server-side First**:

   - Компоненты рендерятся на сервере
   - Нет сборки на клиенте
   - Чистый HTML на выходе

2. **Семантичность и минимализм**:

   - Семантическая HTML-разметка
   - Минимальный JavaScript
   - Интерактивность через HTMX
   - Доступность из коробки

3. **Типизация и компоненты**:

   - Type-first подход
   - Строгая типизация через TypeScript
   - Компоненты на базе `component` из Reface
   - Стилизация через `styled` из Reface

4. **Контекстность и композиция**:

   - Родительские компоненты влияют на дочерние
   - Поддержка слотов (`start`, `end`)
   - Предсказуемое поведение вложенных элементов
   - Гибкая система компоновки

5. **CSS и адаптивность**:
   - CSS-переменные для темизации
   - Container Queries для адаптивности
   - Единая система размеров (базовый шаг 2px)
   - Предсказуемая система отступов

### Пример компонента

```typescript
type ButtonProps = {
  variant?: "primary" | "secondary";
  slotStart?: JSX.Element;
  slotEnd?: JSX.Element;
  children: string;
};

const StyledButton = styled.button`
  // Контекстное влияние на дочерние элементы
  & .icon {
    --icon-size: var(--button-icon-size, 1.5em);
  }

  // Адаптивность через Container Queries
  @container (min-width: 600px) {
    font-size: var(--font-size-lg);
  }

  // Использование единой системы размеров
  padding: var(--size-2) var(--size-3);
`;

export const Button = component((props: ButtonProps, children) => (
  <StyledButton {...props}>
    {props.slotStart}
    {children}
    {props.slotEnd}
  </StyledButton>
));
```

### Использование

```typescript
<Button
  variant="primary"
  slotStart={<Icon name="home" />}
  slotEnd={<Icon name="arrow-right" />}
>
  Главная
</Button>
```

---

## Базовые принципы

### 1. Контекстность

Родительские компоненты автоматически задают стили для дочерних элементов. Например, `Stack` определяет отступы между вложенными элементами, а `Button` автоматически адаптирует размеры иконок в своих слотах.

```css
.stack > * {
  margin-top: 0;
  margin-bottom: var(--stack-gap, 16px);
}

.button .icon {
  --icon-size: var(--button-icon-size, 1.5em);
}
```

---

## Слоты

Reface UI использует систему слотов, основанную на Web Components и дополненную строгой типизацией:

### 1. Определение компонента со слотами

```typescript
// Определение типов для слотов
type ButtonSlots = {
  start: JSX.Element;
  end: JSX.Element;
};

// Определение атрибутов
type ButtonAttrs = {
  variant?: "primary" | "secondary";
};

// Создание компонента
export const Button = component<ButtonAttrs, ButtonSlots>(
  (attrs, children, slots) => (
    <button class={attrs.variant}>
      {slots.start}
      {children}
      {slots.end}
    </button>
  )
);

// Статические свойства для имен слотов
Button.start = "start" as const;
Button.end = "end" as const;
```

### 2. Использование слотов

```typescript
<Button variant="primary">
  <Icon slot={Button.start} name="search" />
  Поиск
  <span slot={Button.end}>→</span>
</Button>
```

### 3. Преимущества подхода

#### Типобезопасность

```typescript
// Ошибка типизации при неверном имени слота
<Button>
  <Icon slot="wrong-slot" /> // Error: Type '"wrong-slot"' is not assignable...
</Button>
```

#### Автокомплит

```typescript
<Button>
  <Icon slot={Button.} /> // IDE подскажет доступные слоты: start, end
</Button>
```

### 4. Композиция слотов

```typescript
const Panel = component<PanelAttrs, PanelSlots>((attrs, children, slots) => (
  <div class="panel">
    {slots.header}
    <div class="content">
      {slots.sidebar}
      {children}
      {slots.details}
    </div>
    {slots.footer}
  </div>
));

Panel.header = "header" as const;
Panel.sidebar = "sidebar" as const;
Panel.details = "details" as const;
Panel.footer = "footer" as const;

// Использование
<Panel>
  <Header slot={Panel.header} />
  <Sidebar slot={Panel.sidebar} />
  Основной контент
  <Details slot={Panel.details} />
  <Footer slot={Panel.footer} />
</Panel>;
```

### 5. Стилизация слотов

```typescript
const StyledButton = styled.button`
  // Стилизация элементов в слотах
  & > [slot="${Button.start}"] {
    margin-right: var(--space-2);
  }

  & > [slot="${Button.end}"] {
    margin-left: var(--space-2);
  }
`;
```

---

### 3. Адаптивность

Компоненты автоматически адаптируются под размер контейнера с помощью `@container` CSS.

```css
@container (min-width: 600px) {
  .button {
    --button-font-size: 1.25rem;
  }
}
```

---

### 4. Единая система размеров

Все размеры кратны базовой единице (2px) и генерируются на сервере:

```css
:root {
  --size-1: 2px;
  --size-2: 4px;
  --size-3: 8px;
  --size-4: 16px;
  --size-5: 32px;
}
```

---

## Компоненты библиотеки

### 1. Контейнеры и компоновка

#### 1.1. `Stack`

Вертикальная или горизонтальная раскладка с отступами между элементами.

**Пропсы:**

- `direction`: `"horizontal" | "vertical"`.
- `gap`: Отступы между элементами.

**Пример:**

```html
<Stack direction="vertical" gap="var(--size-3)">
  <button>Кнопка 1</button>
  <button>Кнопка 2</button>
</Stack>
```

---

#### 1.2. `Panel`

Контейнер для организации содержимого с заголовком и футером.

**Пропсы:**

- `header`: Заголовок панели.
- `footer`: Футер панели.

**Пример:**

```html
<Panel header="Заголовок" footer="Футер"> Основное содержимое панели. </Panel>
```

---

### 2. Формы и взаимодействие

#### 2.1. `FormControl`

Контейнер для элемента формы с лейблом и сообщением об ошибке.

**Пропсы:**

- `label`: Текст лейбла.
- `error`: Сообщение об ошибке.

**Пример:**

```html
<FormControl label="Имя" error="Это поле обязательно">
  <input placeholder="Введите имя" />
</FormControl>
```

---

#### 2.2. `Input`

Поле ввода текста с поддержкой слотов.

**Пропсы:**

- `slotStart`: Слот перед вводом.
- `slotEnd`: Слот после ввода.

**Пример:**

```html
<input slotStart="{<Icon" name="search" />} placeholder="Поиск..." />
```

---

#### 2.3. `Button`

Кнопка с поддержкой слотов.

**Пропсы:**

- `slotStart`: Слот перед текстом кнопки.
- `slotEnd`: Слот после текста кнопки.

**Пример:**

```html
<Button slotStart={<Icon name="settings" />} slotEnd={<Icon name="arrow-right" />}>
  Настройки
</Button>
```

---

### 3. Навигация

#### 3.1. `Tabs`

Вкладки для переключения контента.

**Пропсы:**

- `tabs`: Список вкладок.
- `activeTab`: Активная вкладка.

**Пример:**

```html
<Tabs tabs={['Вкладка 1', 'Вкладка 2']} activeTab={0}>
  <div>Содержимое первой вкладки</div>
  <div>Содержимое второй вкладки</div>
</Tabs>
```

---

### 4. Визуальные элементы

#### 4.1. `Icon`

Компонент для отображения иконок.

**Пропсы:**

- `name`: Название иконки.
- `size`: Размер (по умолчанию `1em`).
- `color`: Цвет (по умолчанию `currentColor`).

**Пример:**

```html
<Icon name="user" size="var(--size-3)" color="blue" />
```

---

### 5. Карточки

#### 5.1. `Card`

Карточка с заголовком и поддержкой слота.

**Пропсы:**

- `title`: Заголовок карточки.
- `slotEnd`: Слот для дополнительных элементов.

**Пример:**

```html
<Card title="Карточка" slotEnd={<Icon name="more-options" />}>
  Содержимое карточки.
</Card>
```

---

## Пример полной компоновки

```html
<Stack direction="vertical" gap="var(--size-3)">
  <Button slotStart={<Icon name="home" />} slotEnd={<Icon name="arrow-right" />}>
    Главная
  </Button>

  <Input slotStart={<Icon name="search" />} placeholder="Искать..." />

  <Card title="Заголовок карточки" slotEnd={<Icon name="info" />}>
    Это содержимое карточки.
  </Card>
</Stack>
```

---

## Заключение

1. **Слоты**: Гибкий способ передачи контента (иконки, тексты и др.).
2. **Контекстность**: Родительские компоненты задают стили дочерним.
3. **Адаптивность**: Использование `Container Queries` для автоматического изменения размеров.
4. **Единая система размеров**: Все размеры кратны 2px и определяются через CSS-переменные.

Эта библиотека даёт гибкость, лёгкость в использовании и мощный API для построения современных интерфейсов.
