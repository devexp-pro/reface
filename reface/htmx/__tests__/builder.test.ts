import { assertEquals } from "jsr:@std/assert";
import { hx } from "../mod.ts";

Deno.test("HxBuilder - chaining methods", async (t) => {
  await t.step("should chain basic methods", () => {
    const attrs = hx()
      .get("/api/data")
      .trigger("click")
      .swap("innerHTML")
      .build();

    assertEquals(attrs, {
      "hx-get": "/api/data",
      "hx-trigger": "click",
      "hx-swap": "innerHTML",
    });
  });

  await t.step("should chain complex trigger", () => {
    const attrs = hx()
      .get("/api/data")
      .trigger({
        event: "click",
        once: true,
        delay: "0.5s",
      })
      .build();

    assertEquals(attrs, {
      "hx-get": "/api/data",
      "hx-trigger": "click once delay:0.5s",
    });
  });

  await t.step("should chain with vals", () => {
    const attrs = hx()
      .post("/api/submit")
      .trigger("submit")
      .vals({ id: 123, name: "test" })
      .build();

    assertEquals(attrs, {
      "hx-post": "/api/submit",
      "hx-trigger": "submit",
      "hx-vals": JSON.stringify({ id: 123, name: "test" }),
    });
  });
});

Deno.test("HxBuilder - spread operator", async (t) => {
  await t.step("should work with spread operator", () => {
    const attrs = { ...hx().get("/api/data").trigger("click") };

    assertEquals(attrs, {
      "hx-get": "/api/data",
      "hx-trigger": "click",
    });
  });

  await t.step("should work with spread in JSX-like context", () => {
    const props = {
      className: "button",
      ...hx()
        .post("/api/submit")
        .trigger("click")
        .swap("innerHTML")
        .target("#result"),
    };

    assertEquals(props, {
      className: "button",
      "hx-post": "/api/submit",
      "hx-trigger": "click",
      "hx-swap": "innerHTML",
      "hx-target": "#result",
    });
  });
});

Deno.test("HxBuilder - trigger variations", async (t) => {
  await t.step("should handle string array triggers", () => {
    const attrs = hx()
      .get("/api")
      .trigger(["click", "mouseover"])
      .build();

    assertEquals(attrs, {
      "hx-get": "/api",
      "hx-trigger": "click, mouseover",
    });
  });

  await t.step("should handle numeric timing values", () => {
    const attrs = hx()
      .get("/api")
      .trigger({
        event: "click",
        delay: 0.5,
        every: 2,
      })
      .build();

    assertEquals(attrs, {
      "hx-get": "/api",
      "hx-trigger": "click delay:0.5s every 2s",
    });
  });
});