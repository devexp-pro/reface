import { assert } from "@std/assert";
import { classNames, attrs } from "../attributes.ts";

Deno.test("classNames function", async (t) => {
  await t.step("handles strings", () => {
    assert(classNames("foo") === "foo");
    assert(classNames("foo bar") === "foo bar");
    assert(classNames("foo", "bar") === "foo bar");
    assert(classNames("foo", "bar baz") === "foo bar baz");
  });

  await t.step("handles objects", () => {
    assert(classNames({ foo: true, bar: false }) === "foo");
    assert(classNames({ foo: true, bar: true }) === "foo bar");
    assert(classNames({ "foo-bar": true, baz: false }) === "foo-bar");
  });

  await t.step("handles mixed inputs", () => {
    assert(
      classNames("foo", { bar: true, baz: false }, "qux") === "foo bar qux"
    );
    assert(
      classNames("button", { primary: true, large: true }) ===
        "button primary large"
    );
  });

  await t.step("handles falsy values", () => {
    assert(classNames(null, undefined, "", false) === "");
    assert(classNames("foo", null, "bar") === "foo bar");
  });
});

Deno.test("attrs function", async (t) => {
  await t.step("handles basic attributes", () => {
    assert(attrs({ id: "test" }) === 'id="test"');
    assert(attrs({ id: "test", title: "title" }) === 'id="test" title="title"');
  });

  await t.step("handles boolean attributes", () => {
    assert(attrs({ disabled: true }) === "disabled");
    assert(attrs({ disabled: false }) === "");
    assert(attrs({ disabled: true, readonly: false }) === "disabled");
  });

  await t.step("handles class attribute", () => {
    assert(attrs({ class: "foo" }) === 'class="foo"');
    assert(
      attrs({ class: { active: true, disabled: false } }) === 'class="active"'
    );
    assert(attrs({ class: "foo", id: "test" }) === 'class="foo" id="test"');
  });

  await t.step("handles undefined values", () => {
    assert(attrs({ id: undefined }) === "");
    assert(attrs({ id: "test", title: undefined }) === 'id="test"');
  });

  await t.step("handles style attribute", () => {
    assert(attrs({ style: "color: red;" }) === 'style="color: red;"');
    assert(
      attrs({ style: { color: "red", fontSize: "16px" } }) ===
        'style="color: red; fontSize: 16px;"'
    );
    assert(
      attrs({
        style: {
          color: "red",
          backgroundColor: "blue",
          margin: 0,
        },
      }) === 'style="color: red; backgroundColor: blue; margin: 0;"'
    );
  });

  await t.step("handles mixed attributes", () => {
    assert(
      attrs({
        class: { active: true },
        style: { color: "red" },
        id: "test",
      }) === 'class="active" style="color: red;" id="test"'
    );
  });
});
