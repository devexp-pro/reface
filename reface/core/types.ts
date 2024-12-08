/**
 * Page props interface
 */
export interface PageProps {
  route: string;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string>;
}

/**
 * RPC types
 */
export interface RpcDefinition {
  [key: string]: (args?: any) => Promise<any>;
}

export interface RpcCalls<T> {
  hx: {
    [K in keyof T]?: (args?: any) => string;
  };
}

export interface RpcHandlers<T> {
  [key: string]: (args?: any) => Promise<T>;
}

export interface RestHandlers {
  [key: string]: (req: Request) => Promise<Response>;
}

/**
 * Island interface
 */
export interface Island<R, P> {
  name?: string;
  template: (ctx: {
    rpc: RpcCalls<R>;
    props: P;
    rest: {
      hx: (name: string, method: string, route: string) => string;
    };
  }) => Template;
  rest?: RestHandlers;
  rpc?: RpcHandlers<R>;
}

/**
 * Base component interface
 */
export interface ComponentBase {
  isTemplate: true;
  tag: string;
  css?: string;
  rootClass?: string;
}

/**
 * Template attributes interface
 */
export interface TemplateAttributes {
  class?: string[];
  id?: string;
  style?: string | Record<string, string>;
  [key: string]: unknown;
}

/**
 * Base template interface
 */
export interface Template extends ComponentBase {
  attributes: TemplateAttributes;
  children: ElementChild[];
}

/**
 * HTML Fragment interface for trusted HTML content
 */
export interface TemplateFragment {
  type: "fragment";
  content: string;
}

/**
 * Base HTML attributes interface
 */
export interface HTMLAttributes {
  class?: string | string[];
  id?: string;
  style?: string | Record<string, string>;
  children?: ElementChild | ElementChild[];
  [key: `data-${string}`]: string | number | boolean | undefined;
  [key: string]: unknown;
}

/**
 * Possible child types in templates
 */
export type ElementChild =
  | string
  | number
  | boolean
  | Template
  | TemplateFragment
  | null
  | undefined;

/**
 * Function that accepts template literals and returns Template
 */
export type TemplateLiteralFunction = {
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & ComponentBase;

/**
 * Base component function type
 */
export type ComponentFunction<P = HTMLAttributes> = {
  (props?: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & ComponentBase;

/**
 * Simple component function type (only JSX)
 */
export type SimpleComponentFunction<P = HTMLAttributes> = ((
  props: P
) => Template) &
  ComponentBase;

/**
 * Styled component function type
 */
export type StyledComponentFunction<P = HTMLAttributes> = {
  (props?: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & ComponentBase;
