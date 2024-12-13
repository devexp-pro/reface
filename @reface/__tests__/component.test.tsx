import { createElement } from "../core/jsx/createElement.ts";
import { component } from "../core/component.ts";
import { assertRender } from "./testUtils.ts";

interface ButtonProps {
  color?: string;
  size?: string;
}

Deno.test("component - template literal usage", () => {  
  const Button = component<ButtonProps>((props, children) => (
    <button class={`btn btn-${props.color || 'default'}`}>
      {children}
    </button>
  ));

  const template = Button({ color: "primary" })`Click me`;

  assertRender(
    template,
    '<button class="btn btn-primary">Click me</button>'
  );
});

Deno.test("component - without children", () => {
  const Icon = component<{ name: string }>((props) => (
    <i class={`icon-${props.name}`}/>
  ));

  const template = Icon({ name: "home" })``;

  assertRender(
    template,
    '<i class="icon-home"/>'
  );
}); 