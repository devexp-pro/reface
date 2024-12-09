import { assertEquals } from "@std/assert";

import { html, TemplateHtml } from "@reface/html";
import { span } from "@reface/elements";
import { compareHTML } from "@reface/test-utils";

Deno.test("html should create TemplateHtml from string", () => {
  const template = html`<div>Hello</div>`;
  assertEquals(template instanceof TemplateHtml, true);
  assertEquals(template.toString(), "<div>Hello</div>");
});

Deno.test("html should escape unsafe content", () => {
  const unsafe = "<script>alert('xss')</script>";
  const template = html`${unsafe}`;
  assertEquals(
    template.toString(),
    "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;",
  );
});

Deno.test("html should allow nested html templates", () => {
  const header = html`<h1>Title</h1>`;
  const content = html`<p>Content</p>`;
  const template = html`
    <div>
      ${header}
      ${content}
    </div>
  `;
  assertEquals(
    template.toString().trim(),
    `<div>
      <h1>Title</h1>
      <p>Content</p>
    </div>`,
  );
});

Deno.test("html should allow nested elements", () => {
  const el = span()`Hello`;
  const template = html`<div>${el}</div>`;
  assertEquals(template.toString(), "<div><span>Hello</span></div>");
});

Deno.test("html should handle null/undefined values", () => {
  const template = html`<div>${null}${undefined}</div>`;
  assertEquals(template.toString(), "<div></div>");
});

Deno.test("html should handle primitive values", () => {
  const number = 42;
  const boolean = true;
  const template = html`<div>${number} ${boolean}</div>`;
  assertEquals(template.toString(), "<div>42 true</div>");
});

Deno.test("html should handle complex interpolation", () => {
  const items = ["One", "Two"];
  const list = html`
    <ul>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ul>
  `;
  compareHTML(
    list.toString(),
    `<ul>
      <li>One</li>
      <li>Two</li>
    </ul>`,
  );
});

Deno.test("html should handle trusted HTML strings", () => {
  const trusted = "<b>Bold</b>";
  const template = html(trusted);
  assertEquals(template.toString(), "<b>Bold</b>");
});

Deno.test("html should handle mixed content", () => {
  const unsafe = "<b>bold</b>";
  const safe = html`<i>italic</i>`;
  const template = html`
    <div>
      <p>${unsafe}</p>
      <p>${safe}</p>
    </div>
  `;
  assertEquals(
    template.toString().trim(),
    "<div>\n      <p>&lt;b&gt;bold&lt;/b&gt;</p>\n      <p><i>italic</i></p>\n    </div>",
  );
});
