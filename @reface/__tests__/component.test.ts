import { component, html } from "@reface";
import { TestUtils } from "./testUtils.ts";

Deno.test("component - template literal usage", () => {
  const utils = new TestUtils();
  const Button = component<{
    color?: string;
    size?: string;
  }>((props, children) =>
    html`<button class="btn btn-${
      props.color || "default"
    }">${children}</button>`
  );

  utils.assertRender(
    Button({ color: "primary" })`Click me`,
    '<button class="btn btn-primary">Click me</button>',
  );
});

Deno.test("component - without children", () => {
  const utils = new TestUtils();
  const Icon = component<{ name: string }>((props) =>
    html`<i class="icon-${props.name}"/>`
  );

  utils.assertRender(
    Icon({ name: "home" })``,
    '<i class="icon-home"/>',
  );
});
