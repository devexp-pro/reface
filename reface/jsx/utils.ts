import {
  JSX_ATTRIBUTES,
  COMPONENT_TYPES,
  EVENT_HANDLER_PREFIX,
  JSX_SPECIAL_PROPS,
} from "./constants.ts";
import type { JSXElementProps, ComponentType } from "./types.ts";
import { Fragment } from "./Fragment.ts";

/**
 * Extract JSX props without special attributes
 */
export function extractJSXProps(
  props: JSXElementProps
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const specialKeys = new Set(["key", "ref", "children"]);

  for (const [key, value] of Object.entries(props)) {
    if (!specialKeys.has(key.toLowerCase())) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Determine component type
 */
export function getComponentType(component: unknown): ComponentType {
  if (typeof component === "function") {
    return "FUNCTION";
  }
  if (component === Fragment) {
    return "FRAGMENT";
  }
  return "ELEMENT";
}

/**
 * Convert JSX prop name to HTML attribute
 */
export function convertJSXPropName(prop: string): string {
  // Handle event handlers
  if (prop.startsWith(EVENT_HANDLER_PREFIX)) {
    return prop.toLowerCase();
  }

  // Handle special props
  if (prop in JSX_SPECIAL_PROPS) {
    return JSX_SPECIAL_PROPS[prop as keyof typeof JSX_SPECIAL_PROPS];
  }

  return prop;
}

/**
 * Process JSX props
 */
export function processJSXProps(
  props: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    const htmlKey = convertJSXPropName(key);
    result[htmlKey] = value;
  }

  return result;
}
