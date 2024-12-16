import { RefaceTemplateHtml, RefaceTemplateText } from "@reface";
import type {
  ElementChildType,
  IRefaceTemplate,
  RefaceTemplateFn,
} from "@reface/types";

import { isEmptyValue, isTemplate } from "./utils/renderUtils.ts";
import { getChildren } from "./utils/getChildren.ts";

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
export const html: RefaceTemplateFn<IRefaceTemplate> = (strings, ...values) => {
  return new RefaceTemplateHtml(getChildren(strings, values));
};
