import type { HTMLAttributes } from "../core/Template.ts";

/**
 * Validate component props
 */
export function validateProps<P extends HTMLAttributes>(
  props: P,
  componentName: string
): void {
  // Required props
  const required = new Set(["class", "id"]);
  for (const prop of required) {
    if (prop in props && props[prop] === undefined) {
      throw new Error(
        `${componentName}: Required prop '${prop}' cannot be undefined`
      );
    }
  }

  // Type validation
  if (props.class && typeof props.class !== "string") {
    throw new Error(
      `${componentName}: 'class' must be string, got ${typeof props.class}`
    );
  }

  // ... другие валидации
}
