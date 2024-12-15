import { RefaceTemplateHtml, RefaceTemplateText } from "@reface";
import type { ElementChildType, IRefaceTemplate } from "@reface/types";

import { isEmptyValue, isTemplate } from "./utils/renderUtils.ts";

/**
 * Creates an HTML template from a template literal or string.
 * Safely escapes only interpolated values, preserving static HTML.
 *
 * @param strings - Template strings or plain string
 * @param values - Template values to interpolate
 * @returns HTML template
 *
 * @example
 * // Static parts are preserved as-is
 * html`<div>safe html</div>`;
 *
 * // Only interpolated values are escaped
 * const unsafe = "<script>alert('xss')</script>";
 * html`<div>${unsafe}</div>`; // <div>&lt;script&gt;...&lt;/script&gt;</div>
 *
 * // Nested templates are preserved
 * const safe = html`<b>safe</b>`;
 * html`<div>${safe}</div>`;
 */
export function html(
  strings: TemplateStringsArray | string,
  ...values: ElementChildType[]
): IRefaceTemplate {
  if (typeof strings === "string") {
    return new RefaceTemplateHtml([strings]);
  }

  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) {
      children.push(new RefaceTemplateHtml([strings[i]]));
    }

    if (i < values.length) {
      const value = values[i];
      if (Array.isArray(value)) {
        children.push(...value);
      } else if (isTemplate(value)) {
        children.push(value);
      } else if (!isEmptyValue(value)) {
        children.push(new RefaceTemplateText(String(value)));
      }
    }
  }

  return new RefaceTemplateHtml(children);
}
