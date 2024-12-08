import { div, span } from "../mod.ts";
import { render } from "@reface/html";
import { assertEquals } from "@std/assert";
import { compareHTML } from "../../__tests__/utils.ts";

// Basic element usage
Deno.test("elements - basic usage", () => {
  // Basic element with no attributes or children
  compareHTML(render(div()``), "<div></div>");

  // Element with attributes
  compareHTML(
    render(div({ class: "container" })``),
    '<div class="container"></div>'
  );

  // Element with template literal children
  compareHTML(render(div()`Hello world`), "<div>Hello world</div>");

  // Element with attributes and template literal children
  compareHTML(
    render(div({ class: "container" })`Hello world`),
    '<div class="container">Hello world</div>'
  );
});

// Nested elements
Deno.test("elements - nested usage", () => {
  // Element with multiple children
  compareHTML(
    render(div()`
    ${span()`First`}
    ${span()`Second`}
    `),
    `<div>
    <span>First</span>
    <span>Second</span>
</div>`
  );

  // Nested elements
  compareHTML(
    render(div({ class: "container" })`
    ${div({ class: "row" })`
      ${div({ class: "col" })`Content`}
    `}
    `),
    `<div class="container">
    <div class="row">
      <div class="col">Content</div>
    </div>
  </div>`
  );
});

// Import all elements
Deno.test("elements - import all", async () => {
  const elements = await import("../mod.ts");

  // Should have all HTML elements
  assertEquals(typeof elements.div, "function");
  assertEquals(typeof elements.span, "function");
  assertEquals(typeof elements.p, "function");
  assertEquals(typeof elements.button, "function");

  // Should work the same way
  const result = render(elements.div({ class: "test" })`Hello`);
  compareHTML(result, '<div class="test">Hello</div>');
});
