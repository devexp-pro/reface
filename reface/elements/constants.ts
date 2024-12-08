/**
 * HTML void elements
 */
export const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Self-closing elements
 */
export const SELF_CLOSING_ELEMENTS = new Set([
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
]);

/**
 * Element types
 */
export const ELEMENT_TYPES = {
  VOID: "void",
  NORMAL: "normal",
  SELF_CLOSING: "self-closing",
} as const;

/**
 * Default attributes
 */
export const DEFAULT_ATTRIBUTES = {
  class: "",
  style: "",
  id: "",
} as const;

/**
 * Style prefixes
 */
export const STYLE_PREFIXES = {
  COMPONENT: "c",
  KEYFRAMES: "k",
  ANIMATION: "a",
} as const;

/**
 * CSS property groups
 */
export const CSS_GROUPS = {
  LAYOUT: ["display", "position", "float", "clear"],
  DIMENSIONS: ["width", "height", "margin", "padding"],
  TYPOGRAPHY: ["font", "text", "line-height"],
  VISUAL: ["background", "border", "color"],
} as const;
