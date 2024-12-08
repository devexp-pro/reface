import type { Template, ElementChild } from "../html/types.ts";

export type FragmentProps = {
  children?: ElementChild[];
};

export type FragmentComponent = {
  (props: FragmentProps): ElementChild[];
  isFragment: true;
};

export type JSXElementProps = {
  children?: ElementChild | ElementChild[];
  [key: string]: unknown;
};

export type JSXRenderContext = {
  components: Set<string>;
  currentComponent?: string;
};

export type JSXErrorContext = {
  component?: string;
  props?: Record<string, unknown>;
  children?: ElementChild[];
};
