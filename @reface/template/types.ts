// utility types

export const REFACE_TEMPLATE = Symbol("REFACE_TEMPLATE");

export type NormalizeAttributes<T extends TemplateAttributes> =
  | (
    & Omit<T, "class" | "style">
    & {
      class?: string[];
      styl?: Record<string, string>;
    }
  )
  | Record<string, never>;

// Базовые типы для атрибутов
export type ClassValue =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
export type StyleValue =
  | string
  | Record<string, string | number>
  | (string | Record<string, string | number>)[];

// Базовый интерфейс для пользовательских данных
export interface TemplatePayload {
  [key: string]: any;
}

// Типы для children
export type PrimitiveChild = string | number | boolean | null | undefined;
export type ComplexChild = Template | ElementChildType[];
export type ElementChildType = PrimitiveChild | ComplexChild;

// Функция-компонент
export type ComponentFn<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (
  attrs: A,
  children: ElementChildType[],
) => Template<A, P>;

export type RawTemplateAttributes = {
  [key: string]: any;
  classes?: string[];
  styles?: Record<string, string>;
};

// Базовая структура шаблона
export interface RawTemplate<
  A extends RawTemplateAttributes = RawTemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> {
  type: string;
  tag?: string;
  attributes: A;
  children: ElementChildType[];
  payload: P;
}

export type TemplateAttributesClass =
  | string
  | Record<string, boolean>
  | TemplateAttributesClass[];
export type TemplateAttributesStyle =
  | Record<string, string | number>
  | string[]
  | string
  | Record<string, boolean>;

export type TemplateAttributes = {
  class?: TemplateAttributesClass;
  style?: TemplateAttributesStyle;
  [key: string]: any;
} | Record<string, never>;

// Callable интерфейс шаблона
export type Template<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> =
  & {
    // Вызов с атрибутами
    (attributes: A): Template<A, P, M>;
    // Вызов с содержимым
    (strings: TemplateStringsArray, ...values: any[]): Template<A, P, M>;
  }
  & M
  & {
    [REFACE_TEMPLATE]: true;
    raw: RawTemplate<NormalizeAttributes<A>, P>;
  };

// Фабрика шаблонов
export type TemplateFactory<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> = {
  // Базовый вызов
  (config: BaseTemplateConfig<P>): Template<A, P, M>;
  // HTML элемент
  (config: HTMLTemplateConfig<A, P>): Template<A, P, M>;
  // Компонент с выводом типа атрибутов
  <CA extends Record<string, any>>(
    component: ComponentFn<CA, P>,
  ): Template<CA, P, M>;
};

export type BaseTemplateConfig<P extends TemplatePayload = TemplatePayload> = {
  payload?: P;
  children?: ElementChildType[];
};

// HTML конфигурация с условным типом для children
export type HTMLTemplateConfig<
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
export interface RenderManager {
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

export type TransformTemplate<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (params: {
  attrs: A;
  children: ElementChildType[];
  manager: RenderManager;
}) => RawTemplate<NormalizeAttributes<A>, P>;

export interface TemplateFactoryConfig<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> {
  type: string;

  create?: {
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
export type TemplateMethods<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = {
  [key: string]: (params: {
    template: RawTemplate<NormalizeAttributes<A>, P>;
  }) => any;
};

export type CreateTemplateFactory = <
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
>(
  config: TemplateFactoryConfig<A, P, M>,
) => TemplateFactory<A, P, M>;
