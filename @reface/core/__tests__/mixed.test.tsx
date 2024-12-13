import { createElement } from "../jsx/createElement.ts";
import { html } from "../html.ts";
import { component } from "../component.ts";
import { createElement as ce } from "../createElement.ts";
import { assertRender } from "./testUtils.ts";
import { ElementChildType } from "../types.ts";

Deno.test("mixed usage - components with html and createElement", () => {
  const div = ce("div");
  
  const Layout = component<{ title: string, children: ElementChildType[] }>((props, children) => (
    <div class="layout">
      <header>{props.title}</header>
      <main>{children}</main>
    </div>
  ));

  const Content = component(() => 
    html`<div class="content">Static HTML Content</div>`
  );

  assertRender(
    <Layout title="My Page">
      <Content/>
      {div({ class: "dynamic" })`Dynamic Content`}
    </Layout>,
    '<div class="layout">' +
      '<header>My Page</header>' +
      '<main>' +
        '<div class="content">Static HTML Content</div>' +
        '<div class="dynamic">Dynamic Content</div>' +
      '</main>' +
    '</div>'
  );
});

Deno.test("mixed usage - html with components and createElement", () => {
  const span = ce("span");
  
  const Button = component<{ color: string, children: ElementChildType[] | ElementChildType }>((props, children) => (
    <button class={`btn-${props.color}`}>{children}</button>
  ));

  assertRender(
    html`
      <div class="container">
        ${<Button color="primary">Click me</Button>}
        ${span({ class: "text" })`Hello`}
      </div>
    `,
    '<div class="container">' +
      '<button class="btn-primary">Click me</button>' +
      '<span class="text">Hello</span>' +
    '</div>'
  );
});

Deno.test("mixed usage - handles primitives", () => {
  const div = ce("div");
  
  const Content = component(() => 
    html`<span>${false}${null}${undefined}${0}${true}${""}</span>`
  );

  assertRender(
    <div>
      <Content/>
      {div({})`${false}${null}${undefined}${0}${true}${""}`}
    </div>,
    "<div>" +
      "<span>0</span>" +
      "<div>0</div>" +
    "</div>"
  );
});

Deno.test("attributes - class object syntax", () => {
  const Button = component<{ isActive: boolean }>((props) => (
    <button class={{ 
      btn: true, 
      active: props.isActive, 
      disabled: false 
    }}>
      Click me
    </button>
  ));

  assertRender(
    <Button isActive={true}/>,
    '<button class="btn active">Click me</button>'
  );
});

Deno.test("attributes - class array syntax", () => {
  const Button = component<{ type: string }>((props) => (
    <button class={[
      "btn",
      { [`btn-${props.type}`]: true },
      ["nested", "classes"]
    ]}>
      Click me
    </button>
  ));

  assertRender(
    <Button type="primary"/>,
    '<button class="btn btn-primary nested classes">Click me</button>'
  );
});

Deno.test("attributes - style object syntax", () => {
  const Box = component(() => (
    <div style={{ 
      marginTop: "10px",
      fontSize: 14,
      backgroundColor: "#fff" 
    }}>
      Content
    </div>
  ));

  assertRender(
    <Box/>,
    '<div style="margin-top: 10px; font-size: 14; background-color: #fff">Content</div>'
  );
});

Deno.test("attributes - style array syntax", () => {
  const Box = component<{ theme: "light" | "dark" }>((props) => (
    <div style={[
      "padding: 10px",
      { 
        backgroundColor: props.theme === "dark" ? "#000" : "#fff",
        color: props.theme === "dark" ? "#fff" : "#000"
      },
      ["border: 1px solid", "border-radius: 4px"]
    ]}>
      Content
    </div>
  ));

  assertRender(
    <Box theme="dark"/>,
    '<div style="padding: 10px; background-color: #000; color: #fff; border: 1px solid; border-radius: 4px">Content</div>'
  );
});

Deno.test("attributes - handles duplicates and empty values", () => {
  assertRender(
    <div 
      class={[
        "btn btn", // duplicate in string
        { btn: true }, // duplicate as object
        { hidden: false }, // should be excluded
        null, // should be ignored
        undefined // should be ignored
      ]}
      style={[
        "color: red; color: blue", // duplicate property
        { color: "green" }, // should override
        { display: false }, // should be excluded
        null, // should be ignored
        undefined // should be ignored
      ]}
    >
      Content
    </div>,
    '<div class="btn" style="color: green">Content</div>'
  );
}); 