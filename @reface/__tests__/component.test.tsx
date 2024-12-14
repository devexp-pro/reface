import { createElement } from "../core/jsx/createElement.ts";
import { component } from "../core/component.ts";
import { TestUtils } from "./testUtils.ts";

interface ButtonProps {
  color?: string;
  size?: string;
}

Deno.test("component - template literal usage", () => {
  const utils = new TestUtils();
  const Button = component<ButtonProps>((props, children) => (
    <button class={`btn btn-${props.color || 'default'}`}>
      {children}
    </button>
  ));

  utils.assertRender(
    Button({ color: "primary" })`Click me`,
    '<button class="btn btn-primary">Click me</button>'
  );
});

Deno.test("component - without children", () => {
  const utils = new TestUtils();
  const Icon = component<{ name: string }>((props) => (
    <i class={`icon-${props.name}`}/>
  ));

  const template = Icon({ name: "home" })``;

  utils.assertRender(
    template,
    '<i class="icon-home"></i>'
  );
}); 