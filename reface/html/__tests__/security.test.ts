import { html, render } from "@reface/html";
import { div } from "@reface/elements";
import { compareHTML } from "@reface/test-utils";

Deno.test(
  "HTML Security - should escape potentially malicious user input",
  () => {
    const maliciousInput = "<script>window.xssAttack = true;</script>";
    const template = div()`${maliciousInput}`;

    const result = render(template);

    compareHTML(
      result,
      "<div>&lt;script&gt;window.xssAttack = true;&lt;/script&gt;</div>",
    );
  },
);

Deno.test(
  "HTML Security - should allow trusted HTML when explicitly marked",
  () => {
    const trustedHTML = html`<span>Safe HTML</span>`;
    const template = div()`${trustedHTML}`;

    const result = render(template);

    compareHTML(result, "<div><span>Safe HTML</span></div>");
  },
);

Deno.test(
  "HTML Security - should escape special characters in attributes",
  () => {
    const maliciousAttr = '" onmouseover="alert(\'XSS\')"';
    const template = div({ "data-test": maliciousAttr })``;

    const result = render(template);

    compareHTML(
      result,
      "<div data-test=\"&quot; onmouseover=&quot;alert('XSS')&quot;\"></div>",
    );
  },
);

Deno.test(
  "HTML Security - should handle nested templates with mixed content",
  () => {
    const userContent = "<b>bold</b>";
    const trusted = html`<i>italic</i>`;

    compareHTML(render(trusted), "<i>italic</i>");

    const template = html`
      <div>
        <p>${userContent}</p>
        <p>${trusted}</p>
      </div>
    `;

    compareHTML(
      render(template),
      `<div>
      <p>&lt;b&gt;bold&lt;/b&gt;</p>
      <p><i>italic</i></p>
    </div>`,
    );
  },
);
