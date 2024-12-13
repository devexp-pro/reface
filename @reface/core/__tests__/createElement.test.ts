import { createElement } from "../createElement.ts";
import { RenderManager } from "../render/RenderManager.ts";
import { assertHtml } from "./testUtils.ts";

Deno.test("createElement - basic usage", () => {
  const manager = new RenderManager();
  const div = createElement("div");

  const template = div({ class: "container" })`Hello World`;

  assertHtml(
    manager.render(template),
    '<div class="container">Hello World</div>',
  );
});

Deno.test("createElement - nested elements", () => {
  const manager = new RenderManager();
  const div = createElement("div");
  const span = createElement("span");

  const template = div({ class: "container" })`
    ${span({ class: "text" })`Hello`}
    ${span({ class: "text" })`World`}
  `;

  assertHtml(
    manager.render(template),
    '<div class="container"><span class="text">Hello</span><span class="text">World</span></div>',
  );
});

Deno.test("createElement - handles primitives", () => {
  const manager = new RenderManager();
  const div = createElement("div");

  const template = div({ class: "container" })`
    ${false}
    ${null}
    ${undefined}
    ${0}
    ${true}
    ${""}
  `;

  assertHtml(
    manager.render(template),
    '<div class="container">0</div>',
  );
});
