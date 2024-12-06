import {
  createElement,
  render,
  styled,
  component,
  type Template,
} from "../mod.ts";
import { assertEquals } from "@std/assert";
import pretty from "npm:pretty@2.0.0";

// Helper for HTML comparison
function compareHTML(actual: string, expected: string) {
  assertEquals(
    pretty(actual, { ocd: true }),
    pretty(expected, { ocd: true })
  );
}

Deno.test("Basic JSX rendering", () => {
  const template = <div class="test">Hello World</div>;

  compareHTML(render(template), `<div class="test">Hello World</div>`);
});

Deno.test("Component with props", () => {
  const Greeting = component<{ name: string }>(({ name }) => (
    <div class="greeting">Hello, {name}!</div>
  ));

  compareHTML(
    render(Greeting({ name: "John" })),
    `<div class="greeting">Hello, John!</div>`
  );
});

Deno.test("Styled component", () => {
  const Button = styled.button`
    & {
      background: blue;
      color: white;
    }
  `;

  compareHTML(
    render(Button({ class: "primary" })`Click me`),
    `<button class="c0 primary">Click me</button>
<style>
  .c0 {
    background: blue;
    color: white;
  }
</style>`
  );
});

Deno.test("Styled component children jsx", () => {
  const Button = styled.button`
    & {
      background: blue;
      color: white;
    }
  `;

  compareHTML(
    render(<Button class="primary">Click me</Button>),
    `<button class="c0 primary">Click me</button>
<style>
  .c0 {
    background: blue;
    color: white;
  }
</style>`
  );
});

Deno.test("Array children", () => {
  const html = <ul>{["A", "B", "C"].map((item) => <li>{item}</li>)}</ul>;

  compareHTML(
    render(html),
    `<ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>`
  );
});

Deno.test("Nested components", () => {
  const Header = component<{ title: string }>(({ title }) => (
    <header class="header">
      <h1>{title}</h1>
    </header>
  ));

  const Layout = component<{ children: unknown }>(({ children }) => (
    <div class="layout">
      <Header title="Welcome" />
      <main>{children}</main>
    </div>
  ));

  compareHTML(
    render(
      Layout({
        children: <div class="content">Hello World</div>,
      })
    ),
    `
    <div class="layout">
      <header class="header">
        <h1>Welcome</h1>
      </header>
      <main>
        <div class="content">Hello World</div>
      </main>
    </div>
    `
  );
});

Deno.test("Conditional rendering", () => {
  const Message = component<{ isError?: boolean }>(({ isError }) => (
    <div class={isError ? "error" : "success"}>
      {isError ? "Error occurred" : "Success!"}
    </div>
  ));

  compareHTML(
    render(Message({ isError: true })),
    `<div class="error">Error occurred</div>`
  );

  compareHTML(render(Message({})), `<div class="success">Success!</div>`);
});

Deno.test("List rendering", () => {
  const List = component<{ items: string[] }>(({ items }) => (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  ));

  compareHTML(
    render(List({ items: ["A", "B", "C"] })),
    `
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
    `
  );
});