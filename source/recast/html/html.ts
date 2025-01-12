import type { Html } from "./types.ts";
import type { Child, Children } from "@recast/expressions";
import { isTemplateLiteralCall } from "@common/templateLiteral.ts";
import { fragmentExpression, htmlContentExpression } from "@recast/expressions";

function processHtmlContent(
  strings: TemplateStringsArray,
  values: unknown[],
): Children {
  const result: Children = [];

  for (let i = 0; i < values.length; i++) {
    if (strings[i] !== "") {
      result.push(htmlContentExpression.create(strings[i]));
    }

    const value = values[i];
    if (Array.isArray(value)) {
      result.push(...value.flat());
    } else {
      result.push(value as Child);
    }
  }

  if (strings[values.length]) {
    result.push(htmlContentExpression.create(strings[values.length]));
  }

  return result;
}

/**
 * Creates HTML content with two calling styles:
 * 1. html(trustedHtml) - creates trusted HTML node from pre-sanitized string
 * 2. html`<div>${var}</div>` - template literal with automatic escaping
 *
 * @example Template literal syntax
 * ```ts
 * // Basic static HTML
 * html`<div>Hello World</div>`
 *
 * // With interpolation
 * const name = "John";
 * html`<div>Hello ${name}!</div>`
 *
 * // Safe by default - automatic escaping
 * const unsafe = "<script>alert('xss')</script>";
 * html`<div>${unsafe}</div>`
 * // <div>&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;</div>
 * ```
 *
 * @example Function call syntax - Trusted HTML
 * ```ts
 * // Direct trusted HTML string
 * const trustedHtml = "<div>Hello World</div>";
 * html(trustedHtml) // Creates safe HTML node
 * ```
 *
 * @param strings - Template literal array or trusted HTML string
 * @param values - Interpolated values for template literal
 * @returns Fragment node with processed HTML content
 */
export const html: Html = function (
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  if (!isTemplateLiteralCall(strings, ...values)) {
    return fragmentExpression.create(
      htmlContentExpression.create(strings as string),
    );
  }
  return fragmentExpression.create(processHtmlContent(strings, values));
};
