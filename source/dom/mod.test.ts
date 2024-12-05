import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { classNames, attrs, div, input } from "./mod.ts";

Deno.test("classNames function", async (t) => {
  await t.step("handles strings", () => {
    assertEquals(classNames("foo"), "foo");
    assertEquals(classNames("foo bar"), "foo bar");
    assertEquals(classNames("foo", "bar"), "foo bar");
    assertEquals(classNames("foo", "bar baz"), "foo bar baz");
  });

  await t.step("handles objects", () => {
    assertEquals(classNames({ foo: true, bar: false }), "foo");
    assertEquals(classNames({ foo: true, bar: true }), "foo bar");
    assertEquals(classNames({ "foo-bar": true, baz: false }), "foo-bar");
  });

  await t.step("handles mixed inputs", () => {
    assertEquals(
      classNames("foo", { bar: true, baz: false }, "qux"),
      "foo bar qux"
    );
    assertEquals(
      classNames("button", { primary: true, large: true }),
      "button primary large"
    );
  });

  await t.step("handles falsy values", () => {
    assertEquals(classNames(null, undefined, "", false), "");
    assertEquals(classNames("foo", null, "bar"), "foo bar");
  });
});

Deno.test("attrs function", async (t) => {
  await t.step("handles basic attributes", () => {
    assertEquals(attrs({ id: "test" }), 'id="test"');
    assertEquals(
      attrs({ id: "test", title: "title" }),
      'id="test" title="title"'
    );
  });

  await t.step("handles boolean attributes", () => {
    assertEquals(attrs({ disabled: true }), "disabled");
    assertEquals(attrs({ disabled: false }), "");
    assertEquals(attrs({ disabled: true, readonly: false }), "disabled");
  });

  await t.step("handles class attribute", () => {
    assertEquals(attrs({ class: "foo" }), 'class="foo"');
    assertEquals(
      attrs({ class: { active: true, disabled: false } }),
      'class="active"'
    );
    assertEquals(attrs({ class: "foo", id: "test" }), 'class="foo" id="test"');
  });

  await t.step("handles undefined values", () => {
    assertEquals(attrs({ id: undefined }), "");
    assertEquals(attrs({ id: "test", title: undefined }), 'id="test"');
  });
});

Deno.test("element factories", async (t) => {
  await t.step("creates basic elements", () => {
    const result = div({ class: "container" })`Hello, world!`;
    assertEquals(result.tag, "div");
    assertEquals(result.attributes, ' class="container"');
    assertEquals(result.args, ["Hello, world!"]);
  });

  await t.step("handles typed attributes", () => {
    const result = input({
      type: "text",
      value: "test",
      required: true,
    })``;
    assertEquals(result.tag, "input");
    assertEquals(result.attributes, ' type="text" value="test" required');
    assertEquals(result.args, []);
  });

  await t.step("handles children templates", () => {
    const child = div()`Child`;
    const parent = div()`Parent${child}`;
    assertEquals(parent.tag, "div");
    assertEquals(parent.attributes, "");
    assertEquals(parent.args.length, 2);
    assertEquals(parent.args[0], "Parent");
    assertEquals(parent.args[1], child);
  });

  await t.step("handles null and undefined children", () => {
    const result = div()`${null}${undefined}`;
    assertEquals(result.args, []);
  });
});
