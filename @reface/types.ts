import type { REFACE_EVENT } from "@reface/constants";

// Базовые типы для шаблонов
export interface IRefaceTemplate {
  type: string;
  toHtml(manager: IRefaceRenderManager): string;
  payload?: Record<string, any>;
}

export interface IRefaceTemplateElement extends IRefaceTemplate {
  tag: string;
  attributes: HTMLAttributes;
  children: ElementChildType[];
}

// Общий тип для template literal функций
export type RefaceTemplateFn<T extends IRefaceTemplate = IRefaceTemplate> = {
  (
    strings: TemplateStringsArray | string,
    ...values: (ElementChildType | ElementChildType[])[]
  ): T;
};

// Базовый интерфейс для props
export interface ComponentProps extends Record<string, unknown> {
  [key: string]: unknown;
}

// Базовый компонент с поддержкой props и JSX
export interface ComponentWithProps<
  P extends ComponentProps = ComponentProps,
  T extends IRefaceTemplate = IRefaceTemplate,
> {
  (props?: P): RefaceTemplateFn<T>;
}

// Тип для функции рендеринга компонента
export type ComponentRenderFn<
  P extends ComponentProps = ComponentProps,
  T extends IRefaceTemplate = IRefaceTemplate,
> = {
  (props: P, children?: ElementChildType[]): T;
};

// Тип для фабрики компонентов
export type ComponentFn = {
  <
    P extends ComponentProps = ComponentProps,
    T extends IRefaceTemplate = IRefaceTemplate,
  >(
    fn: ComponentRenderFn<P, T>,
  ): ComponentWithProps<P, T>;
};

// Типы для elementFactory
export type ElementFactoryFn = {
  (tag: string): ComponentWithProps<ComponentProps, IRefaceTemplateElement>;
};

export interface IRefaceComposer {
  plugins: Map<IRefaceComposerPlugin["name"], IRefaceComposerPlugin>;
  getRenderManager(): IRefaceRenderManager;
}

export interface IRefaceRenderManager {
  on(event: RefaceEventType, handler: RenderHandler): void;
  off(event: RefaceEventType, handler: RenderHandler): void;

  render(template: IRefaceTemplate): string;
  renderTemplate(template: IRefaceTemplate): string;
  renderChild(child: ElementChildType): string;
  renderChildren(children: ElementChildType[]): string;
  renderAttributes(attrs: HTMLAttributes): string;
  renderClassAttribute(value: ClassValue): string;
  renderStyleAttribute(value: StyleValue): string;

  store: {
    get<T>(pluginName: string): T | undefined;
    set<T>(pluginName: string, value: T): void;
  };
}

export interface IRefaceComposerPlugin {
  name: string;
  setup(composer: IRefaceComposer): void | Promise<void>;
}

type ExtractValues<T> = T extends object
  ? { [K in keyof T]: ExtractValues<T[K]> }[keyof T]
  : T;

export type RefaceEventType = ExtractValues<typeof REFACE_EVENT>;

// Фазы рендеринга
export type RenderPhaseBase =
  | "render"
  | "renderTemplate"
  | "renderChild"
  | "renderChildren"
  | "renderAttributes"
  | "renderClassAttribute"
  | "renderStyleAttribute";

export type RenderPhase =
  | `${RenderPhaseBase}:start`
  | `${RenderPhaseBase}:end`;

export type RenderHandler = (params: {
  template?: IRefaceTemplate;
  html?: string;
  attributes?: HTMLAttributes;
  class?: ClassValue;
  style?: StyleValue;
  manager: IRefaceRenderManager;
}) => void | IRefaceTemplate | string;

// HTML атрибуты
type ClassObject = Record<string, boolean>;
type StyleObject = Record<string, string | number>;

type SingleClassValue = string | ClassObject;
type SingleStyleValue = string | StyleObject;

export type ClassValue = SingleClassValue | SingleClassValue[];
export type StyleValue = SingleStyleValue | SingleStyleValue[];

export interface HTMLAttributes {
  class?: ClassValue;
  style?: StyleValue;
  [key: string]: unknown;
}

// Общие типы
export type ElementChildType =
  | string
  | number
  | boolean
  | null
  | undefined
  | IRefaceTemplate;
