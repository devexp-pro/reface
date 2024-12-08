import {
  STYLE_PREFIXES,
  CSS_GROUPS,
  ELEMENT_TYPES,
  VOID_ELEMENTS,
  SELF_CLOSING_ELEMENTS,
  DEFAULT_ATTRIBUTES,
} from "./constants.ts";

/**
 * Generate unique style identifier
 */
export function generateStyleId(
  prefix: keyof typeof STYLE_PREFIXES = "COMPONENT"
): string {
  return `${STYLE_PREFIXES[prefix]}${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Group CSS properties
 */
export function groupCSSProperties(
  css: Record<string, string>
): Record<string, Record<string, string>> {
  const groups: Record<string, Record<string, string>> = {};

  for (const [prop, value] of Object.entries(css)) {
    for (const [group, props] of Object.entries(CSS_GROUPS)) {
      if (props.some((p) => prop.startsWith(p))) {
        groups[group] = groups[group] || {};
        groups[group][prop] = value;
        break;
      }
    }
  }

  return groups;
}

/**
 * Check if element is of specific type
 */
export function getElementType(tag: string): keyof typeof ELEMENT_TYPES {
  if (VOID_ELEMENTS.has(tag)) return "VOID";
  if (SELF_CLOSING_ELEMENTS.has(tag)) return "SELF_CLOSING";
  return "NORMAL";
}

/**
 * Merge default attributes with provided ones
 */
export function mergeAttributes(
  attrs: Record<string, unknown>
): Record<string, unknown> {
  return {
    ...DEFAULT_ATTRIBUTES,
    ...attrs,
  };
}
