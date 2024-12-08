/**
 * Special JSX attributes
 */
export const JSX_ATTRIBUTES = {
  KEY: "key",
  REF: "ref",
  CHILDREN: "children",
} as const;

/**
 * JSX component types
 */
export const COMPONENT_TYPES = {
  FUNCTION: "function",
  CLASS: "class",
  FRAGMENT: "fragment",
  ELEMENT: "element",
} as const;

/**
 * JSX event handlers prefix
 */
export const EVENT_HANDLER_PREFIX = "on";

/**
 * Special JSX props
 */
export const JSX_SPECIAL_PROPS = {
  dangerouslySetInnerHTML: "__html",
  className: "class",
  htmlFor: "for",
} as const;
