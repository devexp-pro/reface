/**
 * Generate unique class name
 */
export function generateClassName(): string {
  return `c${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Combine multiple class names
 */
export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}
