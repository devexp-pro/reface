import { createElement } from "../jsx/mod.ts";
import { assertEquals } from "@std/assert";
import pretty from "npm:pretty@2.0.0";
import { component, island, RESPONSE, render } from "../mod.ts";
import { styled } from "../styled/mod.ts";

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

Deno.test("Interactive island", () => {
  const Counter = island<{ increment: null }, { count: number }>({
    template: ({ props, rpc }) => (
      <div class="counter">
        <span id="count">{props.count}</span>
        <button onClick={rpc.hx.increment()}>+1</button>
      </div>
    ),
  });

  compareHTML(
    render(Counter({ count: 0 })),
    `
    <div class="counter">
      <span id="count">0</span>
      <button hx-ext="json-enc" hx-post="/rpc/c0/increment">+1</button>
    </div>
    `
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

Deno.test("Form handling", () => {
  const Form = island<{ submit: { email: string } }, void>({
    template: ({ rpc }) => (
      <form onSubmit={rpc.hx.submit()}>
        <input type="email" name="email" required />
        <button type="submit">Send</button>
      </form>
    ),
    rpc: {
      submit: async ({ args }) => {
        return RESPONSE(<div>Sent to {args.email}!</div>);
      },
    },
  });

  compareHTML(
    render(Form()),
    `
    <form hx-ext="json-enc" hx-post="/rpc/c0/submit">
      <input type="email" name="email" required />
      <button type="submit">Send</button>
    </form>
    `
  );
});
