```
source/
├── core/                    # Базовый уровень - работа с Template
│   ├── mod.ts              # Экспорты
│   ├── Template.ts         # Типы и интерфейсы
│   └── render.ts           # Функция рендеринга Template -> HTML
│
├── html/                    # HTML уровень - работа со строками
│   ├── mod.ts              # Экспорты
│   ├── attributes.ts       # attributes() - конвертация атрибутов в строку
│   ├── classes.ts          # generateClassName(), classNames() - работа с классами
│   └── styles.ts           # processStyles() - обработка CSS строк
│
├── elements/               # Elements API - создание элементов
│   ├── mod.ts             # Экспорты
│   ├── factory.ts         # createElementFactory() - фабрика элементов
│   ├── base.ts            # Базовые HTML элементы (div, span и т.д.)
│   ├── styled.ts          # styled API для CSS-in-JS
│   └── css.ts             # css(), cssVar(), keyframes() - CSS утилиты
│
├── jsx/                   # JSX уровень
│   ├── mod.ts            # Экспорты
│   ├── createElement.ts   # createElement() - создание элементов из JSX
│   └── Fragment.ts       # Fragment компонент
│
├── layouts/              # Layouts уровень
│   ├── mod.ts           # Экспорты
│   ├── clean.ts         # Clean layout
│   └── twa.ts           # TWA layout
│
└── Reface.ts           # Основной класс приложения
```

Принципы:

- Один файл = одна функция/тип
- Четкое разделение уровней:
  - core: Template и его рендеринг
  - html: работа со строками HTML/CSS
  - elements: создание элементов
  - jsx: JSX интеграция
  - layouts: шаблоны страниц
- Каждый уровень имеет свой mod.ts для экспортов
- Зависимости идут снизу вверх (core -> html -> elements -> jsx)
