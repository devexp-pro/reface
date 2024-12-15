import type { REFACE_EVENT } from "@reface/constants";

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

// Типы для template literals
export interface TemplateTagFunction {
  (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): IRefaceTemplate;
}

// Базовый интерфейс для props компонентов
export interface ComponentProps extends Record<string, unknown> {
  [key: string]: unknown;
}

// Тип для template literal функции
export interface TemplateTagFunction {
  (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): IRefaceTemplate;
}

// Тип для функции-компонента
export interface Component<P extends ComponentProps = ComponentProps> {
  (props?: P): {
    (
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ): IRefaceTemplateElement;
  };
  (props: P, children: ElementChildType[]): IRefaceTemplateElement;
}

export interface ComponentRenderFunction<
  Props extends ComponentProps = ComponentProps,
> {
  (props: Props, children?: ElementChildType[]): IRefaceTemplate;
}

// Тип для createElement
export interface IElementFactory {
  (tag: string): IElementFunction;
}

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

// JSX специфичные типы
export interface JSXComponent<P extends ComponentProps = ComponentProps> {
  (
    props: P & { children?: ElementChildType | ElementChildType[] },
  ): IRefaceTemplate;
}

// Базовый тип для тегированного вызова
export interface TaggedTemplate {
  (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): IRefaceTemplate;
}

// Компонент с поддержкой обоих типов вызова
export interface ComponentWithTemplate<
  Props extends ComponentProps = ComponentProps,
> {
  (props?: Props): TaggedTemplate;
  (props?: Props, children?: ElementChildType[]): IRefaceTemplate;
}

// Обновленный тип для функции component
export interface ComponentFunction {
  <Props extends ComponentProps = ComponentProps>(
    render: ComponentRenderFunction<Props>,
  ): ComponentWithTemplate<Props>;
}

export interface IElementFunction {
  (attrs?: Record<string, unknown>): TaggedTemplate;
  (
    attrs?: Record<string, unknown>,
    children?: ElementChildType[],
  ): IRefaceTemplate;
}
