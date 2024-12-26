import { button, div, form, img, input, span } from "@reface/elements";
import { TestUtils } from "./testUtils.ts";

Deno.test("elements - basic usage", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`Hello World`,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("elements - nested elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`
      ${span({ class: "text" })`Hello`}
      ${span({ class: "text" })`World`}
    `,
    '<div class="container"><span class="text">Hello</span><span class="text">World</span></div>',
  );
});

Deno.test("elements - handles primitives", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`
      ${false}
      ${null}
      ${undefined}
      ${0}
      ${true}
      ${""}
    `,
    '<div class="container"> 0 </div>',
  );
});

Deno.test("elements - form elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    form({ action: "/submit", method: "post" })`
      ${input({ type: "text", name: "username" })}
      ${button({ type: "submit" })`Submit`}
    `,
    '<form action="/submit" method="post"><input type="text" name="username"/><button type="submit">Submit</button></form>',
  );
});

Deno.test("elements - void elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    img({ src: "image.jpg", alt: "Test image" }),
    '<img src="image.jpg" alt="Test image"/>',
  );
});
