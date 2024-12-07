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
  /** HTML tag name */
  tag: string;

  /** HTML attributes string */
  attributes: string;

  /** Array of child elements */
  children: (
    | string
    | number
    | boolean
    | Template
    | TemplateFragment
    | null
    | undefined
  )[];

  /** CSS styles associated with the template */
  css: string;

  /** Type guard marker */
  isTemplate: true;

  /** Root CSS class name for scoped styles */
  rootClass: string;

  /** Flag indicating if HTML content is trusted */
  trusted?: boolean;
}

/**
 * HTML Fragment interface for trusted HTML content
 */
export interface TemplateFragment {
  /** Fragment type marker */
  type: "fragment";

  /** Raw HTML content */
  content: string;
}

/**
 * Base HTML attributes interface
 */
export interface HTMLAttributes {
  /** CSS class names */
  class?: string;

  /** Element ID */
  id?: string;

  /** Inline styles */
  style?: string;

  /** Data attributes */
  [key: `data-${string}`]: string | number | boolean | undefined;

  /** Allow any other valid HTML attributes */
  [key: string]: unknown;
}

/**
 * Possible child types in templates
 */
export type ElementChild =
  | string // Text content
  | number // Numbers are converted to strings
  | boolean // Booleans are converted to strings
  | Template // Nested templates
  | TemplateFragment // Trusted HTML fragments
  | null // Ignored
  | undefined; // Ignored

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
 * Error details for template rendering
 */
export interface RenderErrorDetails {
  /** Function source code or description */
  function?: string;

  /** Result of function execution */
  result?: unknown;

  /** Template or invalid value that вызвало ошибку */
  template?: unknown;

  /** Error message */
  message?: string;

  /** Stack trace */
  stack?: string;
}

/**
 * Error types
 */
export interface ErrorDetails {
  /** Component name */
  component: string;

  /** Component props */
  props?: Record<string, unknown>;

  /** Error details */
  template?: RenderErrorDetails;
}

export interface ErrorContext {
  lastError?: ErrorDetails;
  jsxStack?: string[];
  componentStack?: string[];
}

/**
 * Base factory function type for creating elements
 */
export type ElementFactory<A> = {
  /** Create element with attributes */
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;

  /** Create element with template literal */
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};

/**
 * Template generator function type
 */
export type TemplateGenerator<T> = (props: T) => Template;
