/**
 * HTML void elements that cannot have children
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
 * HTML self-closing elements
 */
export const SELF_CLOSING_ELEMENTS = new Set([
  ...VOID_ELEMENTS,
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
]);

/**
 * HTML entities for escaping
 */
export const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
} as const;

/**
 * Default render options
 */
export const DEFAULT_RENDER_OPTIONS = {
  collectStyles: true,
  escapeHTML: true,
  prettyPrint: false,
} as const;
