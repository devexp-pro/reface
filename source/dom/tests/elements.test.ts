import { assert } from "@std/assert";
import { div, input } from "../../elements/mod.ts";

Deno.test("element factories", async (t) => {
  await t.step("creates basic elements", () => {
    const result = div()`Hello, world!`;

    assert(result.tag === "div");
    assert(result.children[0] === "Hello, world!");
  });

  await t.step("handles typed attributes", () => {
    const result = div({
      class: "test",
      id: "test-id",
    })``;

    assert(result.attributes.includes('class="test"'));
    assert(result.attributes.includes('id="test-id"'));
    assert(result.children.length === 0);
  });

  await t.step("handles children templates", () => {
    const child = div()`Child`;
    const parent = div()`Parent${child}`;

    assert(parent.children.length === 2);
    assert(parent.children[0] === "Parent");
    assert(parent.children[1] === child);
  });

  await t.step("handles null and undefined children", () => {
    const result = div()`${null}${undefined}`;
    assert(result.children.length === 0);
  });
});
