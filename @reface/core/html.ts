import type { ElementChildType, ITemplate } from "./templates/types.ts";
import { TemplateHtml, TemplateText } from "./templates/mod.ts";
import { isEmptyValue, isTemplate } from "./render/renderUtils.ts";

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
): ITemplate {
  if (typeof strings === "string") {
    return new TemplateHtml([strings]);
  }

  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) {
      children.push(new TemplateHtml([strings[i]]));
    }

    if (i < values.length) {
      const value = values[i];
      if (Array.isArray(value)) {
        children.push(...value);
      } else if (isTemplate(value)) {
        children.push(value);
      } else if (!isEmptyValue(value)) {
        children.push(new TemplateText(String(value)));
      }
    }
  }

  return new TemplateHtml(children);
}
