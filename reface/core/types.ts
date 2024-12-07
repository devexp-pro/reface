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
 * Base template interface
 */
export interface Template {
  tag: string;
  attributes: string;
  children: (string | Template)[];
  css: string;
  isTemplate: true;
  str: TemplateStringsArray;
  args: (string | Template)[];
  rootClass: string;
}

/**
 * HTML Fragment interface
 */
export interface TemplateFragment {
  type: "fragment";
  content: string;
}

/**
 * Base HTML attributes
 */
export interface HTMLAttributes {
  class?: string;
  style?: string;
  id?: string;
  children?: Template | Template[] | string | string[];
  [key: string]: unknown;
}

/**
 * Type guard for TemplateFragment
 */
export function isTemplateFragment(value: unknown): value is TemplateFragment {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "fragment" &&
    "content" in value
  );
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

// Типы для контекста ошибок
export interface ErrorDetails {
  component: string;
  props?: Record<string, unknown>;
  template?: unknown;
}

export interface ErrorContext {
  lastError?: ErrorDetails;
  jsxStack?: string[];
  componentStack?: string[];
}

/**
 * Base template interface
 */
export interface Template {
  tag: string;
  attributes: string;
  children: (string | Template)[];
  css: string;
  isTemplate: true;
  str: TemplateStringsArray;
  args: (string | Template)[];
  rootClass: string;
  trusted?: boolean;
}

/**
 * Base HTML attributes
 */
export interface HTMLAttributes {
  class?: string;
  id?: string;
  style?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Base factory function type
 */
export type ElementFactory<A> = {
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};

/**
 * Template generator function
 */
export type TemplateGenerator<T> = (props: T) => Template;
