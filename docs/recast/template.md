# Template API Documentation

## Основное использование

Template API предоставляет способ создания HTML-шаблонов с поддержкой атрибутов
и вложенного содержимого.

В конечном итоге, Reface работает на уровне строк и генерирует чистый HTML, что
делает его идеальным для серверного рендеринга. JSX - это просто удобная обертка
для разработки, которая транслируется в те же вызовы Template API.

### Создание шаблона

Есть два способа получить Template для HTML-элементов:

1. Создание через функцию createTemplate:

```typescript
import { createTemplate } from "@reface/template";

// Базовое создание элемента
const div = createTemplate({ tag: "div" });
const span = createTemplate({ tag: "span" });
```

2. Использование готовых элементов из @reface/elements:

```typescript
import { button, div, span } from "@reface/elements";

// Элементы уже готовы к использованию
div`Hello world`; // <div>Hello world</div>
button`Click me`; // <button>Click me</button>
```

@reface/elements предоставляет готовые Template-функции для всех HTML-элементов,
что избавляет от необходимости создавать их вручную.

### Принцип работы

Template построен на концепции цепочки трансформаций:

```
createTemplateFactory() → createTemplate()     → Template     → Template     → Template
(создание фабрики)       (базовый       (с атрибутами) (с доп.       (с контентом)
                         шаблон)                        атрибутами)
```

Каждый вызов в цепочке создает новый экземпляр:

```typescript
// 1. Создаем фабрику шаблонов
const buttonFactory = createTemplateFactory({
    type: "button",
    transformer: (attrs, children) => createTemplate({ tag: "button", ... }),
});

// 2. Создаем базовый шаблон
const baseButton = buttonFactory({ tag: "button" });
                   // Template<ButtonAttrs, ButtonPayload>

// 3. Специализируем шаблон
const primaryButton = baseButton({ class: "primary" });
                     // Новый Template с добавленными атрибутами

// 4. Дальнейшая специализация
const largeButton = primaryButton({ size: "large" });
                    // Еще один Template с накопленными атрибутами

// 5. Финальное использование
largeButton`Click me`;  // <button class="primary" size="large">Click me</button>
```

### Правила использования

Template поддерживает два типа вызовов:

1. Передача атрибутов - через объект:

```typescript
// Атрибуты накапливаются при каждом вызове
const btn = createTemplate({ class: "button" })(
  // class="button"
  { id: "submit" },
)(
  // class="button" id="submit"
  { "data-type": "primary" },
); // class="button" id="submit" data-type="primary"
```

2. Передача содержимого - через tagged template literal:

```typescript
// Важно: каждый вызов с `` полностью заменяет предыдущее содержимое
const btn = div({ class: "button" })`First content`;
btn`New content`; // Предыдущее содержимое "First content" полностью заменено
```

### Работа с атрибутами

Template предоставляет удобные способы работы с атрибутами:

1. Классы можно передавать объектом с флагами:

```typescript
div({
  class: {
    button: true,
    primary: true,
    disabled: false,
    large: someCondition,
  },
})`Click me`; // <div class="button primary">Click me</div>
```

2. Стили передаются в camelCase:

```typescript
div({
  style: {
    backgroundColor: "red",
    fontSize: "14px",
  },
})`Content`; // <div style="background-color: red; font-size: 14px">Content</div>
```

3. Кавычки в атрибутах выбираются автоматически:

```typescript
div({
  title: 'Contains "quotes"',
  "data-message": "Simple text",
})`Content`; // <div title='Contains "quotes"' data-message="Simple text">Content</div>
```

### Безопасность

По умолчанию все строковые значения и переменные автоматически экранируются для
предотвращения XSS-атак:

```typescript
const userInput = '<script>alert("XSS")</script>';
div`${userInput}`; // <div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>

// Переменные тоже безопасны
const message = "<b>Hello</b>";
span`${message}`; // <span>&lt;b&gt;Hello&lt;/b&gt;</span>
```

Для вставки доверенного HTML-контента используйте обертку html:

```typescript
import { html } from "@reface/template";

const trusted = '<span class="highlight">Важный текст</span>';
div`${html`${trusted}`}`;  // <div><span class="highlight">Важный текст</span></div>

⚠️ Используйте html только для доверенного контента!
```

#### Продвинутые возможности

#### Создание собственных типов Template

```typescript
const buttonFactory = createTemplateFactory<ButtonAttributes, ButtonPayload>({
  type: "button",

  create: {
    // template - это RawTemplate без callable сигнатуры
    transform: ({ attrs, children, manager }) => ({
      tag: "button",
      attributes: {
        ...attrs,
        class: manager.combineClasses("btn", attrs.class),
      },
      children,
      payload: {
        clickCount: 0,
      },
    }),

    defaults: {
      attributes: {
        class: "default-class",
        type: "button",
      },
      payload: {
        clickCount: 0,
      },
    },
  },

  process: {
    // template - это RawTemplate, содержит только данные
    attributes: ({ oldAttrs, newAttrs, template, manager }) => ({
      ...oldAttrs,
      ...newAttrs,
      class: manager.combineClasses(oldAttrs.class, newAttrs.class),
    }),

    children: ({ oldChildren, newChildren, template }) => {
      return [...oldChildren, ...newChildren];
    },
  },

  methods: {
    // template - это RawTemplate, для работы с данными
    incrementClicks: ({ template }) => {
      template.payload.clickCount++;
      return template;
    },
    getClickCount: ({ template }) => template.payload.clickCount,
  },

  render: {
    // template - это RawTemplate, только для чтения данных
    template: ({ template, manager }) => {
      return `<custom-button>${
        manager.renderChildren(
          template.children,
        )
      }</custom-button>`;
    },

    attributes: ({ attrs, template, manager }) =>
      manager.renderAttributes(attrs, { prefix: "data-" }),

    styles: ({ styles, template, manager }) => manager.renderStyles(styles),

    classes: ({ classes, template, manager }) => manager.renderClasses(classes),
  },
});
```

Важно:

1. Во всех методах параметр `template` является `RawTemplate` - это объект,
   содержащий только данные шаблона, без возможности вызова. Callable сигнатура
   (`template()` и template``) доступна только в финальном Template после
   создания.

2. RawTemplate хранит данные в нормализованном виде:
   - `attributes` - обычные атрибуты
   - `attributes.classes` - массив классов
   - `attributes.styles` - объект стилей
   - `children` - массив дочерних элементов
   - `payload` - пользовательские данные

Это позволяет удобно работать с данными внутри методов фабрики, а RenderManager
предоставляет утилиты для работы с этими нормализованными данными.

Основные разделы API:

1. `type` - идентификатор типа шаблона
2. `create` - настройки создания шаблона
   - `transform({ attrs, children, manager })` - трансформация входных
     параметров
   - `defaults` - значения по умолчанию
3. `process` - обработка вызовов
   - `attributes({ oldAttrs, newAttrs, template, manager })` - обработка
     атрибутов
   - `children({ oldChildren, newChildren, template })` - обработка содержимого
4. `methods` - методы экземпляра, получают `{ template }`
5. `render` - настройки рендеринга, все методы получают `{ template, manager }`
   - `template({ template, manager })` - рендеринг всего шаблона
   - `attributes({ attrs, template, manager })` - рендеринг атрибутов
   - `styles({ styles, template, manager })` - рендеринг стилей
   - `classes({ classes, template, manager })` - рендеринг классов

RenderManager предоставляет полезные утилиты для работы с шаблонами:

- combineClasses - объединение классов
- renderChildren - рендеринг дочерних элементов
- renderAttributes - рендеринг атрибутов
- renderStyles - рендеринг стилей
- renderClasses - рендеринг классов

#### Пример: Создание styled компонентов

Пример того, как можно использовать createTemplateFactory для создания
styled-components (уже реализовано в @reface/styled):

```typescript
// 1. Создаем фабрику для styled компонентов
const styledFactory = createTemplateFactory<StyledAttributes, StyledPayload>({
  type: "styled",

  create: {
    transform: ({ attrs, children, manager }) => {
      // Парсим CSS из children и создаем уникальный класс
      const css = parseCss(children);
      const className = generateUniqueClassName();

      return {
        tag: attrs.tag || "div",
        attributes: {
          ...attrs,
          class: manager.combineClasses(className, attrs.class),
        },
        children: [],
        payload: {
          css,
          className,
        },
      };
    },
  },

  render: {
    template: ({ template, manager }) => {
      // CSS добавится в head при рендеринге
      return `<${template.tag} ${
        manager.renderAttributes(
          template.attributes,
        )
      }>${manager.renderChildren(template.children)}</${template.tag}>
                   <style>.${template.payload.className} { ${template.payload.css} }</style>`;
    },
  },
});

// 2. Создаем API для styled
const styled = {
  div: (strings: TemplateStringsArray, ...values: any[]) => {
    return styledFactory({
      tag: "div",
      payload: { styles: strings },
    });
  },
  span: (strings: TemplateStringsArray, ...values: any[]) => {
    return styledFactory({
      tag: "span",
      payload: { styles: strings },
    });
  },
  // ... другие элементы
};

// Использование (уже доступно в @reface/styled)
const RedButton = styled.div`
  & {
    color: red;
    padding: 10px;
  }

  &:hover {
    color: darkred;
  }
`;

RedButton`Click me!`; // <div class="styled-xxx">Click me!</div>
// + <style>.styled-xxx { color: red; ... }</style>
```

⚠️ Примечание: Это упрощенный пример. Полная реализация styled-components уже
доступна в пакете @reface/styled.

### Альтернативные способы создания

1. Использование createTemplate без указания тега:

```typescript
import { createTemplate } from "@reface/template";

// Создание шаблона без тега - будет использоваться DocumentFragment
const fragment = createTemplate({});
fragment`Hello world`; // Hello world (без обертки)

// Удобно для группировки элементов
fragment`
    ${div`First`}
    ${div`Second`}
`; // <div>First</div><div>Second</div>
```

## Типы

### TemplatePayload

Базовый интерфейс для пользовательских данных, который могут расширять плагины:

```typescript
interface TemplatePayload {
  // Базовые поля, которые могут использовать все шаблоны
  [key: string]: any;
}
```

### RawTemplate

Базовая структура данных шаблона:

```typescript
interface RawTemplate<
  Attributes = any,
  Payload extends TemplatePayload = TemplatePayload,
> {
  // Тип шаблона
  type: string;
  // HTML тег
  tag?: string;
  // Нормализованные атрибуты
  attributes: {
    // Обычные HTML атрибуты
    [key: string]: any;
    // Массив классов
    classes?: string[];
    // Объект стилей
    styles?: Record<string, string>;
  };
  // Массив дочерних элементов
  children: any[];
  // Пользовательские данные
  payload: Payload;
}
```

### Template

Callable интерфейс для работы с шаблоном:

```typescript
interface Template<Attributes = any, Payload = any> {
  // Вызов с атрибутами - возвращает новый Template
  (attributes: Attributes): Template<Attributes, Payload>;

  // Вызов с содержимым - возвращает новый Template
  (strings: TemplateStringsArray, ...values: any[]): Template<
    Attributes,
    Payload
  >;

  // Доступ к RawTemplate
  raw: RawTemplate<Attributes, Payload>;
}
```

### TemplateFactory

Функция для создания шаблонов с кастомной логикой:

```typescript
interface TemplateFactory<Attributes = any, Payload = any> {
  // Создание нового шаблона
  (config: TemplateConfig): Template<Attributes, Payload>;

  // Тип создаваемых шаблонов
  type: string;
}

// Конфигурация для создания шаблона
interface TemplateConfig<Attributes = any, Payload = any> {
  tag?: string;
  attributes?: Attributes;
  children?: any[];
  payload?: Payload;
}
```

### TemplateFactoryConfig

Конфигурация для создания фабрики шаблонов:

```typescript
interface TemplateFactoryConfig<Attributes = any, Payload = any> {
    // Уникальный тип шаблона
    type: string;

    // Настройки создания шаблона
    create: {
        // Трансформация входных параметров
        transform: ({
            attrs: Attributes,
            children: any[],
            manager: RenderManager
        }) => RawTemplate<Attributes, Payload>;

        // Значения по умолчанию
        defaults?: {
            attributes?: Attributes;
            payload?: Payload;
        };
    };

    // Настройки обработки вызовов
    process?: {
        // Обработка атрибутов
        attributes?: ({
            oldAttrs: Attributes,
            newAttrs: Attributes,
            template: RawTemplate<Attributes, Payload>,
            manager: RenderManager
        }) => Attributes;

        // Обработка children
        children?: ({
            oldChildren: any[],
            newChildren: any[],
            template: RawTemplate<Attributes, Payload>
        }) => any[];
    };

    // Методы экземпляра
    methods?: {
        [key: string]: ({
            template: RawTemplate<Attributes, Payload>
        }) => any;
    };

    // Настройки рендеринга
    render?: {
        // Рендеринг всего шаблона
        template?: ({
            template: RawTemplate<Attributes, Payload>,
            manager: RenderManager
        }) => string;

        // Рендеринг атрибутов
        attributes?: ({
            attrs: Attributes,
            template: RawTemplate<Attributes, Payload>,
            manager: RenderManager
        }) => string;

        // Рендеринг стилей
        styles?: ({
            styles: Record<string, string>,
            template: RawTemplate<Attributes, Payload>,
            manager: RenderManager
        }) => string;

        // Рендеринг классов
        classes?: ({
            classes: string[],
            template: RawTemplate<Attributes, Payload>,
            manager: RenderManager
        }) => string;
    };
}
```

Эти типы формируют основу системы шаблонов:

1. `RawTemplate` - хранит данные в нормализованном виде
2. `Template` - предоставляет интерфейс для работы с шаблоном
3. `TemplateFactory` - создает шаблоны с кастомной логикой
4. `TemplateFactoryConfig` - конфигурация для создания фабрики шаблонов

### JSX Поддержка

@reface/jsx предоставляет возможность использовать JSX синтаксис с Template API:

```typescript
import { createElement, Fragment } from "@reface/jsx";
import { button, div } from "@reface/elements";

// JSX транслируется в вызовы template
const App = () => (
  <>
    <div className="container">
      <button type="button">Click me</button>
    </div>
  </>
);

// Эквивалентно:
const App = () =>
  div({ class: "container" })`
        ${button({ type: "button" })`Click me`}
    `;

// Можно комбинировать JSX и Template API
const Header = () => (
  <div className="header">{button({ class: "primary" })`Submit`}</div>
);

// И наоборот
const Container = () =>
  div({ class: "container" })`
        ${<button type="button">Click me</button>}
    `;
```

JSX это просто синтаксический сахар, который транслируется в вызовы Template
API:

1. `createElement` преобразует JSX в вызовы template
2. `Fragment` позволяет группировать элементы без обертки
3. Можно свободно комбинировать JSX и Template API в одном компоненте

⚠️ Для использования JSX необходимо настроить TypeScript/Babel для работы с
@reface/jsx.

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```
