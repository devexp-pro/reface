import { elementFactory } from "@reface";
import { TestUtils } from "./testUtils.ts";

Deno.test("elementFactory - basic usage", () => {
  const utils = new TestUtils();
  const div = elementFactory("div");
  utils.assertRender(
    div({ class: "container" })`Hello World`,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("elementFactory - nested elements", () => {
  const utils = new TestUtils();
  const div = elementFactory("div");
  const span = elementFactory("span");

  utils.assertRender(
    div({ class: "container" })`
      ${span({ class: "text" })`Hello`}
      ${span({ class: "text" })`World`}
    `,
    '<div class="container"><span class="text">Hello</span><span class="text">World</span></div>',
  );
});

Deno.test("elementFactory - handles primitives", () => {
  const utils = new TestUtils();
  const div = elementFactory("div");

  utils.assertRender(
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
