import { i } from "@recast/element/mod.ts";
import { component, html } from "@recast/mod.ts";
import { TestUtils } from "@recast/test-utils/mod.ts";

interface ButtonProps {
  color?: string;
  size?: string;
}

Deno.test("fn as component", () => {
  const utils = new TestUtils();
  const FnComponent = () => {
    return <div>Hello</div>;
  };
  utils.assertRender(FnComponent(), "<div>Hello</div>");
});

Deno.test("fn as component with props", () => {
  const utils = new TestUtils();
  const FnComponent = (props: { name: string }) => {
    return <div>Hello {props.name}</div>;
  };
  utils.assertRender(FnComponent({ name: "John" }), "<div>Hello John</div>");
});

Deno.test("component - template literal usage", () => {
  const utils = new TestUtils();
  const Button = component<ButtonProps>((props, children) => (
    <button class={`btn btn-${props.color || "default"}`}>
      {children}
    </button>
  ));

  utils.assertRender(
    Button({ color: "primary" })`Click me`,
    '<button class="btn btn-primary">Click me</button>',
  );
});

Deno.test("component - html string usage", () => {
  const utils = new TestUtils();
  const Button = component<ButtonProps>((props, children) => (
    html`<button class="${`btn btn-${props.color || "default"}`}">
      ${children}
    </button>`
  ));

  utils.assertRender(
    Button({ color: "primary" })`Click me`,
    `<button class="btn btn-primary">
    Click me
    </button>`,
  );
});

Deno.test("component - without children", () => {
  const utils = new TestUtils();
  const Icon = component<{ name: string }>((props) => (
    <i class={`icon-${props.name}`} />
  ));

  const template = Icon({ name: "home" });

  utils.assertRender(
    template,
    '<i class="icon-home"></i>',
  );
});

Deno.test("component - required attribute variants", () => {
  const utils = new TestUtils();

  interface IconProps {
    name?: string;
    size?: string;
  }

  const IconJSX = component<IconProps>((props) => (
    <i
      class={`icon-${props.name}`}
      style={props.size ? `font-size: ${props.size}` : ""}
    />
  ));

  const IconHtml = component<IconProps>((props) => (
    html`<i class="icon-${props.name}" style="${
      props.size ? `font-size: ${props.size}` : ""
    }"></i>`
  ));

  const IconElement = component<IconProps>((props) => (
    i({
      class: `icon-${props.name}`,
      style: props.size ? `font-size: ${props.size}` : "",
    })
  ));

  const expected = '<i class="icon-home" style="font-size: 24px"></i>';

  utils.assertRender(
    IconJSX({ name: "home", size: "24px" })``,
    expected,
  );

  utils.assertRender(
    IconHtml({ name: "home", size: "24px" })``,
    expected,
  );

  utils.assertRender(
    IconElement({ name: "home", size: "24px" }),
    expected,
  );
});
