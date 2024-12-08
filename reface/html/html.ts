import type { Template, TemplateFragment } from "./types.ts";
import { escapeHTML } from "./escape.ts";
import { isTemplateFragment } from "./types.ts";
import { render } from "./render.ts";

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
    if (value === null || value === undefined) {
      result += "";
    }
    // Don't escape TemplateFragments
    else if (isTemplateFragment(value)) {
      result += value.content;
    }
    // Render nested templates
    else if (typeof value === "object" && "isTemplate" in value) {
      result += render(value as Template);
    }
    // Escape everything else
    else {
      result += escapeHTML(String(value));
    }
    result += strings[i + 1];
  }

  return {
    type: "fragment",
    content: result,
  };
}
