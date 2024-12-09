import type { ElementChild, HTMLAttributes, Template } from "@reface/html";

/**
 * Fragment props interface
 */
export interface FragmentProps {
  children?: ElementChild[];
}

/**
 * Fragment component type
 */
export interface FragmentComponent {
  (props: FragmentProps): Template;
  isFragment: true;
  tag: string;
}

/**
 * Component function interface
 */
export interface ComponentFunction<P = HTMLAttributes> {
  (props: P): Template<P>;
  isTemplate?: true;
  tag?: string;
  css?: string;
  rootClass?: string;
}

/**
 * JSX element props interface
 */
export interface JSXElementProps {
  children?: ElementChild | ElementChild[];
  [key: string]: unknown;
}

/**
 * Component types
 */
export type ComponentType = "FUNCTION" | "CLASS" | "FRAGMENT" | "ELEMENT";

/**
 * JSX render context
 */
export interface JSXRenderContext {
  components: Set<string>;
  currentComponent?: string;
}

/**
 * JSX error context
 */
export interface JSXErrorContext {
  component?: string;
  props?: Record<string, unknown>;
  children?: ElementChild[];
}
