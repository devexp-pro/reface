import { assert } from "@std/assert";
import { div, input } from "../elements.ts";

Deno.test("element factories", async (t) => {
  await t.step("creates basic elements", () => {
    const result = div({ class: "container" })`Hello, world!`;
    assert(result.tag === "div");
    assert(result.attributes === ' class="container"');
    assert(JSON.stringify(result.args) === JSON.stringify(["Hello, world!"]));
  });

  await t.step("handles typed attributes", () => {
    const result = input({
      type: "text",
      value: "test",
      required: true,
    })``;
    assert(result.tag === "input");
    assert(result.attributes === ' type="text" value="test" required');
    assert(JSON.stringify(result.args) === JSON.stringify([]));
  });

  await t.step("handles children templates", () => {
    const child = div()`Child`;
    const parent = div()`Parent${child}`;
    assert(parent.tag === "div");
    assert(parent.attributes === "");
    assert(parent.args.length === 2);
    assert(parent.args[0] === "Parent");
    assert(parent.args[1] === child);
  });

  await t.step("handles null and undefined children", () => {
    const result = div()`${null}${undefined}`;
    assert(JSON.stringify(result.args) === JSON.stringify([]));
  });
});
