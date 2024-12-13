import { createElement } from "../core/createElement.ts";
import { assertRender } from "./testUtils.ts";

Deno.test("createElement - basic usage", () => {
  const div = createElement("div");
  assertRender(
    div({ class: "container" })`Hello World`,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("createElement - nested elements", () => {
  const div = createElement("div");
  const span = createElement("span");

  assertRender(
    div({ class: "container" })`
      ${span({ class: "text" })`Hello`}
      ${span({ class: "text" })`World`}
    `,
    '<div class="container"><span class="text">Hello</span><span class="text">World</span></div>',
  );
});

Deno.test("createElement - handles primitives", () => {
  const div = createElement("div");

  assertRender(
    div({ class: "container" })`
      ${false}
      ${null}
      ${undefined}
      ${0}
      ${true}
      ${""}
    `,
    '<div class="container">0</div>',
  );
});
