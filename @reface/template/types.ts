// utility types
type NormalizeAttributes<T extends TemplateAttributes> =
  & Omit<T, "classes" | "styles">
  & {
    classes?: string[];
    styles?: Record<string, string>;
  };

// Базовые типы для атрибутов
type ClassValue =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
type StyleValue =
  | string
  | Record<string, string | number>
  | (string | Record<string, string | number>)[];

// Базовый интерфейс для пользовательских данных
interface TemplatePayload {
  [key: string]: any;
}

// Типы для children
type PrimitiveChild = string | number | boolean | null | undefined;
type ComplexChild = Template | ElementChildType[];
type ElementChildType = PrimitiveChild | ComplexChild;

// Функция-компонент
type ComponentFn<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (
  attrs: A,
  children: ElementChildType[],
) => Template<A, P>;

type RawTemplateAttributes = {
  [key: string]: any;
  classes?: string[];
  styles?: Record<string, string>;
};

// Базовая структура шаблона
interface RawTemplate<
  A extends RawTemplateAttributes = RawTemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> {
  type: string;
  tag?: string;
  attributes: A;
  children: ElementChildType[];
  payload: P;
}

type TemplateAttributesClass =
  | string
  | Record<string, boolean>
  | TemplateAttributesClass[];
type TemplateAttributesStyle =
  | Record<string, string | number>
  | string[]
  | string
  | Record<string, boolean>;

type TemplateAttributes = {
  classes?: TemplateAttributesClass;
  styles?: TemplateAttributesStyle;
  [key: string]: any;
};

// Callable интерфейс шаблона
type Template<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> = {
  // Вызов с атрибутами
  (attributes: A): Template<A, P, M>;
  // Вызов с содержимым
  (strings: TemplateStringsArray, ...values: any[]): Template<A, P, M>;
} & M;

// Фабрика шаблонов
type TemplateFactory<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = {
  // Базовый вызов
  (config: BaseTemplateConfig<P>): Template<A, P>;
  // HTML элемент
  (config: HTMLTemplateConfig<A, P>): Template<A, P>;
  // Компонент с выводом типа атрибутов
  <CA extends Record<string, any>>(
    component: ComponentFn<CA, P>,
  ): Template<CA, P>;
};

type BaseTemplateConfig<P extends TemplatePayload = TemplatePayload> = {
  payload?: P;
  children?: ElementChildType[];
};

// HTML конфигурация с условным типом для children
type HTMLTemplateConfig<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> =
  & BaseTemplateConfig<P>
  & {
    tag: string;
    attributes?: A;
    void?: boolean;
  }
  & (
    | { void: true; children?: never }
    | { void?: false; children?: ElementChildType[] }
  );

// Менеджер рендеринга
interface RenderManager {
  combineClasses(...classes: (string | undefined)[]): string;
  renderChildren(children: ElementChildType[]): string;
  renderAttributes(
    attrs: Record<string, any>,
    options?: { prefix?: string },
  ): string;
  renderStyles(styles: Record<string, string>): string;
  renderClasses(classes: string[]): string;
}

// Полная конфигурация фабрики шаблонов

type TransformTemplate<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (params: {
  attrs: A;
  children: ElementChildType[];
  manager: RenderManager;
}) => RawTemplate<NormalizeAttributes<A>, P>;

interface TemplateFactoryConfig<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> {
  type: string;

  create: {
    transform: TransformTemplate<A, P>;
    defaults?: {
      attributes?: A;
      payload?: P;
    };
  };

  process?: {
    attributes?: (params: {
      oldAttrs: A;
      newAttrs: A;
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: RenderManager;
    }) => A;

    children?: (params: {
      oldChildren: ElementChildType[];
      newChildren: ElementChildType[];
      template: RawTemplate<NormalizeAttributes<A>, P>;
    }) => ElementChildType[];
  };

  methods?: M;

  render?: {
    template?: (params: {
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: RenderManager;
    }) => string;

    attributes?: (params: {
      attrs: A;
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: RenderManager;
    }) => string;

    styles?: (params: {
      styles: Record<string, string>;
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: RenderManager;
    }) => string;

    classes?: (params: {
      classes: string[];
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: RenderManager;
    }) => string;
  };
}

// Интерфейс для методов шаблона
type TemplateMethods<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = {
  [key: string]: (params: {
    template: RawTemplate<NormalizeAttributes<A>, P>;
  }) => any;
};

export type {
  ClassValue,
  ElementChildType,
  RawTemplate,
  RenderManager,
  StyleValue,
  Template,
  TemplateFactory,
  TemplateFactoryConfig,
  TemplatePayload,
};
