import { assert } from "@std/assert";
import { styles, cssVar } from "../styles.ts";

Deno.test("styles function", async (t) => {
  await t.step("handles string inputs", () => {
    assert(styles("color: red;") === "color: red;");
    assert(
      styles("color: red;", "background: blue;") ===
        "color: red; background: blue;"
    );
  });

  await t.step("handles object inputs", () => {
    assert(
      styles({ color: "red", background: "blue" }) ===
        "color: red; background: blue;"
    );
  });

  await t.step("handles numbers", () => {
    assert(
      styles({ width: 100, height: "50px" }) === "width: 100; height: 50px;"
    );
  });
});

Deno.test("cssVar function", async (t) => {
  await t.step("handles variable reference", () => {
    assert(cssVar("primary-color") === "var(--primary-color)");
  });

  await t.step("handles variable definition", () => {
    assert(cssVar("primary-color", "#fff") === "--primary-color: #fff");
  });
});
