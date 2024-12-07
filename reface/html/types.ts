/**
 * Represents a trusted HTML fragment
 */
export interface TemplateFragment {
  type: "fragment";
  content: string;
}

/**
 * Type guard for TemplateFragment
 */
export function isTemplateFragment(value: unknown): value is TemplateFragment {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "fragment" &&
    "content" in value
  );
}
