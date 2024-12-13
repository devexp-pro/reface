import { component } from "../component.ts";
import { assertRender } from "./testUtils.ts";
import { html } from "../html.ts";

Deno.test("component - template literal usage", () => {
  const Button = component<{
    color?: string;
    size?: string;
  }>((props, children) =>
    html`<button class="btn btn-${
      props.color || "default"
    }">${children}</button>`
  );

  assertRender(
    Button({ color: "primary" })`Click me`,
    '<button class="btn btn-primary">Click me</button>',
  );
});

Deno.test("component - without children", () => {
  const Icon = component<{ name: string }>((props) =>
    html`<i class="icon-${props.name}"/>`
  );

  assertRender(
    Icon({ name: "home" })``,
    '<i class="icon-home"/>',
  );
});
