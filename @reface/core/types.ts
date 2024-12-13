// Базовые типы для рендеринга
export interface IRenderManager {
  on(phase: RenderPhase, handler: RenderHandler): void;
  off(phase: RenderPhase, handler: Function): void;

  render(template: ITemplate): string;
  renderTemplate(template: ITemplate): string;
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
  template?: ITemplate;
  html?: string;
  attributes?: HTMLAttributes;
  class?: ClassValue;
  style?: StyleValue;
  manager: IRenderManager;
}) => void | ITemplate | string;

// Базовые типы для шаблонов
export interface ITemplate {
  toHtml(manager: IRenderManager): string;
}

export interface ITemplateElement extends ITemplate {
  tag: string;
  attributes: HTMLAttributes;
  children: ElementChildType[];
}

// Типы для template literals
export interface TemplateTagFunction {
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
}

// Базовый интерфейс для props компонентов
export interface ComponentProps {
  children?: ElementChildType | ElementChildType[];
  [key: string]: unknown;
}

// Тип для template literal функции
export interface TemplateTagFunction {
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
}

// Тип для TemplateFn класса - сам является функцией
export interface TemplateFn extends TemplateTagFunction, ITemplate {
  fn: TemplateTagFunction;
}

// Тип для функции-компонента
export interface Component<P extends ComponentProps = ComponentProps> {
  // Вызов с children как аргументом
  (props: P, children: ElementChildType[]): ITemplate;
  // Вызов с последующим template literal
  (props: P): TemplateFn;
}

// Тип для createElement
export interface ElementFactory {
  (attrs: HTMLAttributes): TemplateTagFunction;
  (attrs: HTMLAttributes, children: ElementChildType[]): ITemplate;
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
  | ITemplate
  | ElementChildType[];

// JSX специфичные типы
export interface JSXComponent<P extends ComponentProps = ComponentProps> {
  (props: P & { children?: ElementChildType | ElementChildType[] }): ITemplate;
}
