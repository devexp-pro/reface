import { assertEquals } from "@std/assert";
import { TemplateText } from "../TemplateText.ts";
import { html } from "../html.ts";
import { render } from "../render.ts";

Deno.test("TemplateText should escape HTML content", () => {
  const text = new TemplateText("<script>alert('xss')</script>");
  assertEquals(
    text.toString(),
    "&lt;script&gt;alert('xss')&lt;/script&gt;",
  );
});

Deno.test("TemplateText should handle null", () => {
  assertEquals(TemplateText.from(null).toString(), "");
});

Deno.test("TemplateText should handle undefined", () => {
  assertEquals(TemplateText.from(undefined).toString(), "");
});

Deno.test("TemplateText should convert integers to strings", () => {
  assertEquals(TemplateText.from(42).toString(), "42");
});

Deno.test("TemplateText should convert floats to strings", () => {
  assertEquals(TemplateText.from(3.14).toString(), "3.14");
});

Deno.test("TemplateText should work with template literals", () => {
  const name = "<user>";
  const template = html`Hello, ${name}!`;
  assertEquals(
    template.toString(),
    "Hello, &lt;user&gt;!",
  );
});

Deno.test("TemplateText should work with nested templates", () => {
  const user = "<admin>";
  const greeting = html`Welcome`;
  const template = html`${greeting}, ${user}!`;
  assertEquals(
    template.toString(),
    "Welcome, &lt;admin&gt;!",
  );
});

Deno.test("TemplateText should work with arrays of text", () => {
  const items = ["<one>", "<two>"];
  const template = html`Items: ${items.join(", ")}`;
  assertEquals(
    template.toString(),
    "Items: &lt;one&gt;, &lt;two&gt;",
  );
});

Deno.test("TemplateText should work with mixed content", () => {
  const name = "<user>";
  const count = 42;
  const template = html`Hello, ${name}! You have ${count} messages.`;
  assertEquals(
    template.toString(),
    "Hello, &lt;user&gt;! You have 42 messages.",
  );
});

Deno.test("TemplateText should handle complex HTML", () => {
  const user = {
    name: "<admin>",
    role: "<super-user>",
  };
  const template = html`
    <div class="user">
      <h1>User: ${user.name}</h1>
      <p>Role: ${user.role}</p>
    </div>
  `;
  assertEquals(
    render(template),
    `
    <div class="user">
      <h1>User: &lt;admin&gt;</h1>
      <p>Role: &lt;super-user&gt;</p>
    </div>
  `,
  );
});

Deno.test("TemplateText should preserve safe HTML", () => {
  const safeHtml = html`<b>Bold</b>`;
  const template = html`Safe: ${safeHtml}`;
  assertEquals(
    template.toString(),
    "Safe: <b>Bold</b>",
  );
});

Deno.test("TemplateText should escape unsafe content in attributes", () => {
  const unsafe = `"><script>alert('xss')</script>`;
  const template = html`<div class="${unsafe}">Content</div>`;
  assertEquals(
    template.toString(),
    `<div class="&quot;&gt;&lt;script&gt;alert('xss')&lt;/script&gt;">Content</div>`,
  );
});

Deno.test("TemplateText should handle boolean values", () => {
  assertEquals(TemplateText.from(true).toString(), "true");
  assertEquals(TemplateText.from(false).toString(), "false");
});

Deno.test("TemplateText should handle special characters", () => {
  const text = new TemplateText("&<>\"'");
  assertEquals(
    text.toString(),
    "&amp;&lt;&gt;&quot;&#39;",
  );
});

Deno.test("TemplateText should handle empty string", () => {
  const text = new TemplateText("");
  assertEquals(text.toString(), "");
});

Deno.test("TemplateText should handle whitespace", () => {
  const text = new TemplateText(" \t\n\r");
  assertEquals(text.toString(), " \t\n\r");
});

Deno.test("TemplateText should not double escape HTML", () => {
  const text = new TemplateText("<script>window.xssAttack = true;</script>");
  const template = html`<div>${text}</div>`;
  assertEquals(
    template.toString(),
    "<div>&lt;script&gt;window.xssAttack = true;&lt;/script&gt;</div>",
  );
});

Deno.test("TemplateText should escape HTML only once", () => {
  const text = new TemplateText("<script>");
  // Многократный вызов toString() не должен приводить к повторному экранированию
  const escaped = text.toString();
  assertEquals(escaped, "&lt;script&gt;");
  assertEquals(text.toString(), "&lt;script&gt;");
  assertEquals(text.toString(), "&lt;script&gt;");
});
