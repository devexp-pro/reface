import { html } from "@reface";
import { TestUtils } from "./testUtils.ts";

Deno.test("html template literal - basic rendering", () => {
  const utils = new TestUtils();
  utils.assertRender(
    html`<div>Hello World</div>`,
    "<div>Hello World</div>",
  );
});

Deno.test("html template literal - with interpolation", () => {
  const name = "John";
  const utils = new TestUtils();

  utils.assertRender(
    html`<div>Hello ${name}!</div>`,
    "<div>Hello John!</div>",
  );
});

Deno.test("html template literal - escapes unsafe content", () => {
  const unsafe = "<script>alert('xss')</script>";
  const utils = new TestUtils();
  utils.assertRender(
    html`<div>${unsafe}</div>`,
    "<div>&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;</div>",
  );
});

Deno.test("html string - renders raw HTML", () => {
  const utils = new TestUtils();
  utils.assertRender(
    html`<div>Static HTML</div>`,
    "<div>Static HTML</div>",
  );
});

Deno.test("html template literal - handles primitives", () => {
  const utils = new TestUtils();
  utils.assertRender(
    html`<div>${false}${null}${undefined}${0}${true}${""}</div>`,
    "<div>0</div>",
  );
});
