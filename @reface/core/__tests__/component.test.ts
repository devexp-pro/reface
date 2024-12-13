import { component } from "../component.ts";
import { RenderManager } from "../render/RenderManager.ts";
import { assertHtml } from "./testUtils.ts";
import { html } from "../html.ts";

interface ButtonProps {
  color?: string;
  size?: string;
}

Deno.test("component - template literal usage", () => {
  const manager = new RenderManager();

  const Button = component<ButtonProps>((props, children) =>
    html`<button class="btn btn-${
      props.color || "default"
    }">${children}</button>`
  );

  const template = Button({ color: "primary" })`Click me`;

  assertHtml(
    manager.render(template),
    '<button class="btn btn-primary">Click me</button>',
  );
});

Deno.test("component - without children", () => {
  const manager = new RenderManager();

  const Icon = component<{ name: string }, never>((props) =>
    html`<i class="icon-${props.name}"/>`
  );

  const template = Icon({ name: "home" })``;

  assertHtml(
    manager.render(template),
    '<i class="icon-home"/>',
  );
});
