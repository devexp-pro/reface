import { createElement } from "../jsx/createElement.ts";
import { html } from "../html.ts";
import { component } from "../component.ts";
import { createElement as ce } from "../createElement.ts";
import { assertRender } from "./testUtils.ts";

Deno.test("mixed usage - components with html and createElement", () => {
  const div = ce("div");
  
  const Layout = component<{ title: string }>((props, children) => (
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
  
  const Button = component<{ color: string }>((props, children) => (
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