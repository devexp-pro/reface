export { createElement } from "./createElement.ts";
export { Fragment } from "./Fragment.ts";

// JSX namespace
declare global {
  namespace JSX {
    type Element = import("../core/Template.ts").Template;
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: Partial<
        import("../core/Template.ts").HTMLAttributes
      >;
    };
  }
}
