import { render } from "../../core/mod.ts";
import { html } from "../../html/mod.ts";
import { div } from "../../elements/mod.ts";
import { assertEquals } from "@std/assert";
import pretty from "npm:pretty@2.0.0";

// Helper for HTML comparison
function compareHTML(actual: string, expected: string) {
  assertEquals(pretty(actual, { ocd: true }), pretty(expected, { ocd: true }));
}

Deno.test("XSS - should escape potentially malicious user input", () => {
  const maliciousInput = "<script>window.xssAttack = true;</script>";
  const template = div`${maliciousInput}`;

  const result = render(template);

  compareHTML(
    result,
    "<div>&lt;script&gt;window.xssAttack = true;&lt;/script&gt;</div>"
  );
});

Deno.test("XSS - should allow trusted HTML when explicitly marked", () => {
  const trustedHTML = html`<span>Safe HTML</span>`;
  const template = div`${trustedHTML}`;

  const result = render(template);

  compareHTML(result, "<div><span>Safe HTML</span></div>");
});

Deno.test("XSS - should escape special characters in attributes", () => {
  const maliciousAttr = '" onmouseover="alert(\'XSS\')"';
  const template = div({ "data-test": maliciousAttr })``;

  const result = render(template);

  compareHTML(
    result,
    "<div data-test=\"&quot; onmouseover=&quot;alert('XSS')&quot;\"></div>"
  );
});

Deno.test("XSS - should handle nested templates with mixed content", () => {
  const userContent = "<b>bold</b>";
  const trusted = "<i>italic</i>";

  const template = html`
    <div>
      <p>${userContent}</p>
      <p>${html(trusted)}</p>
    </div>
  `;

  const result = render(template);

  compareHTML(
    result,
    `<div>
      <p>&lt;b&gt;bold&lt;/b&gt;</p>
      <p><i>italic</i></p>
    </div>`
  );
});
