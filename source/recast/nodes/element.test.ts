import { assertEquals } from "@std/assert";
import { normalizeAttributes } from "./element.ts";

Deno.test("normalizeAttributes - class attribute", async (t) => {
  await t.step("handles string", () => {
    assertEquals(
      normalizeAttributes({ class: "foo" }),
      { class: ["foo"] },
    );
  });

  await t.step("handles multiple classes in string", () => {
    assertEquals(
      normalizeAttributes({ class: "foo bar" }),
      { class: ["foo", "bar"] },
    );
  });

  await t.step("handles multiple classes with extra spaces", () => {
    assertEquals(
      normalizeAttributes({ class: "foo   bar  baz" }),
      { class: ["foo", "bar", "baz"] },
    );
  });

  await t.step("deduplicates classes from string and array", () => {
    assertEquals(
      normalizeAttributes({
        class: ["extra", "foo bar", "baz", "foo"],
      }),
      { class: ["extra", "foo", "bar", "baz"] },
    );
  });

  await t.step("handles array", () => {
    assertEquals(
      normalizeAttributes({ class: ["foo", "bar"] }),
      { class: ["foo", "bar"] },
    );
  });

  await t.step("handles object", () => {
    assertEquals(
      normalizeAttributes({
        class: { foo: true, bar: false, baz: true },
      }),
      { class: ["foo", "baz"] },
    );
  });

  await t.step("handles mixed types and deduplicates", () => {
    assertEquals(
      normalizeAttributes({
        class: ["foo bar", { baz: true }, "foo", "bar baz"],
      }),
      { class: ["foo", "bar", "baz"] },
    );
  });
});

Deno.test("normalizeAttributes - style attribute", async (t) => {
  await t.step("handles string", () => {
    assertEquals(
      normalizeAttributes({
        style: "color: red; margin: 10px",
      }),
      {
        style: {
          color: "red",
          margin: "10px",
        },
      },
    );
  });

  await t.step("handles kebab-case properties", () => {
    assertEquals(
      normalizeAttributes({
        style: "background-color: blue; border-top-width: 1px",
      }),
      {
        style: {
          "background-color": "blue",
          "border-top-width": "1px",
        },
      },
    );
  });

  await t.step("handles CSS custom properties", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          "--primary-color": "#ff0000",
          "--font-size-large": "18px",
          color: "var(--primary-color)",
        },
      }),
      {
        style: {
          "--primary-color": "#ff0000",
          "--font-size-large": "18px",
          color: "var(--primary-color)",
        },
      },
    );
  });

  await t.step(
    "handles mixed kebab-case and custom properties in string",
    () => {
      assertEquals(
        normalizeAttributes({
          style: "--custom-color: red; background-color: blue; --spacing: 10px",
        }),
        {
          style: {
            "--custom-color": "red",
            "background-color": "blue",
            "--spacing": "10px",
          },
        },
      );
    },
  );

  await t.step("handles object", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          color: "red",
          margin: "10px",
        },
      }),
      {
        style: {
          color: "red",
          margin: "10px",
        },
      },
    );
  });

  await t.step("handles invalid values", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          color: true,
          margin: 42,
          padding: "10px",
        },
      }),
      {
        style: {
          padding: "10px",
        },
      },
    );
  });

  await t.step("converts camelCase to kebab-case", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          backgroundColor: "blue",
          marginTop: "10px",
          borderBottomWidth: "1px",
        },
      }),
      {
        style: {
          "background-color": "blue",
          "margin-top": "10px",
          "border-bottom-width": "1px",
        },
      },
    );
  });

  await t.step("handles mixed camelCase and kebab-case", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          backgroundColor: "blue",
          "border-color": "red",
          marginTop: "10px",
          "--customProperty": "20px",
          "--custom-property": "30px",
        },
      }),
      {
        style: {
          "background-color": "blue",
          "border-color": "red",
          "margin-top": "10px",
          "--customProperty": "20px",
          "--custom-property": "30px",
        },
      },
    );
  });

  await t.step("deduplicates styles with different cases", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          backgroundColor: "blue",
          "background-color": "red",
          marginTop: "10px",
          "margin-top": "20px",
        },
      }),
      {
        style: {
          "background-color": "red",
          "margin-top": "20px",
        },
      },
    );
  });

  await t.step("deduplicates styles from string and object", () => {
    assertEquals(
      normalizeAttributes({
        style: [
          "background-color: blue; margin-top: 10px",
          {
            backgroundColor: "red",
            marginTop: "20px",
          },
          "background-color: green",
        ],
      }),
      {
        style: {
          "background-color": "green",
          "margin-top": "20px",
        },
      },
    );
  });

  await t.step("handles mixed case CSS variables", () => {
    assertEquals(
      normalizeAttributes({
        style: {
          "--primaryColor": "blue",
          "--primary-color": "red",
          color: "var(--primaryColor)",
          backgroundColor: "var(--primary-color)",
        },
      }),
      {
        style: {
          "--primaryColor": "blue",
          "--primary-color": "red",
          "color": "var(--primaryColor)",
          "background-color": "var(--primary-color)",
        },
      },
    );
  });
});

Deno.test("normalizeAttributes - other attributes", async (t) => {
  await t.step("handles string attributes", () => {
    assertEquals(
      normalizeAttributes({
        id: "foo",
        "data-test": "bar",
      }),
      {
        id: "foo",
        "data-test": "bar",
      },
    );
  });

  await t.step("handles boolean attributes", () => {
    assertEquals(
      normalizeAttributes({
        disabled: true,
        readonly: false,
      }),
      {
        disabled: true,
      },
    );
  });

  await t.step("ignores null/undefined values", () => {
    assertEquals(
      normalizeAttributes({
        foo: null,
        bar: undefined,
      }),
      {},
    );
  });
});
