import { escapeHTML } from "./escape.ts";
import type { TemplateFragment } from "./types.ts";
import { isTemplateFragment } from "./types.ts";

/**
 * Creates a trusted HTML fragment
 */
export function html(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): TemplateFragment {
  // If used as a function for trusted HTML
  if (typeof strings === "string") {
    return {
      type: "fragment",
      content: strings,
    };
  }

  // Process interpolated values
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    // Don't escape TemplateFragments
    if (isTemplateFragment(value)) {
      result += value.content;
    } else {
      // Escape everything else
      result += escapeHTML(String(value));
    }
    result += strings[i + 1];
  }

  return {
    type: "fragment",
    content: result,
  };
}
