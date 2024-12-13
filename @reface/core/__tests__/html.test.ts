import { html } from "../html.ts";
import { RenderManager } from "../render/RenderManager.ts";
import { assertHtml } from "./testUtils.ts";

Deno.test("html template literal - basic rendering", () => {
  const manager = new RenderManager();
  const template = html`<div>Hello World</div>`;

  assertHtml(
    manager.render(template),
    "<div>Hello World</div>",
  );
});

Deno.test("html template literal - with interpolation", () => {
  const manager = new RenderManager();
  const name = "John";
  const template = html`<div>Hello ${name}!</div>`;

  assertHtml(
    manager.render(template),
    "<div>Hello John!</div>",
  );
});

Deno.test("html template literal - escapes unsafe content", () => {
  const manager = new RenderManager();
  const unsafe = "<script>alert('xss')</script>";
  const template = html`<div>${unsafe}</div>`;

  assertHtml(
    manager.render(template),
    "<div>&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;</div>",
  );
});

Deno.test("html string - renders raw HTML", () => {
  const manager = new RenderManager();
  const template = html("<div>Static HTML</div>");

  assertHtml(
    manager.render(template),
    "<div>Static HTML</div>",
  );
});

Deno.test("html template literal - handles primitives", () => {
  const manager = new RenderManager();
  const template = html`<div>${false}${null}${undefined}${0}${true}${""}</div>`;

  assertHtml(
    manager.render(template),
    "<div>0</div>",
  );
});
