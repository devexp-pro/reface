// @deprecated
export { component } from "../component/mod.ts";
// @deprecated
export { styled } from "../styled/mod.ts";

export { js } from "./js.ts";
export { css, cssVar, keyframes } from "./css.ts";

// HTML Elements
export * from "./elements.ts";

// Types
export type {
  ComponentFunction,
  CSSResult,
  ElementFunction,
  HTMLAttributes,
  StyledComponent,
  StyleInterpolation,
} from "./types.ts";
