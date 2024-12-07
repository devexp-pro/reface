import { createElement, Fragment } from "@reface/jsx";
import { render } from "@reface/core";
import type { Template } from "@reface/types";
import { compareHTML } from "@reface/test-utils";

Deno.test("JSX - basic rendering", () => {
  const template = <div class="test">Hello World</div>;
  compareHTML(render(template), `<div class="test">Hello World</div>`);
});

Deno.test("JSX - component with props", () => {
  function Greeting({ name }: { name: string }) {
    return <div class="greeting">Hello, {name}!</div>;
  }

  compareHTML(
    render(Greeting({ name: "John" })),
    `<div class="greeting">Hello, John!</div>`
  );
});

Deno.test("JSX - array children", () => {
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

Deno.test("JSX - nested components", () => {
  function Header({ title }: { title: string }) {
    return (
      <header class="header">
        <h1>{title}</h1>
      </header>
    );
  }

  function Layout({ children }: { children: Template | ((props: any) => Template) }) {
    return (
      <div class="layout">
        <Header title="Welcome" />
        <main>{children}</main>
      </div>
    );
  }

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

Deno.test("JSX - conditional rendering", () => {
  function Message({ isError }: { isError?: boolean }) {
    return (
      <div class={isError ? "error" : "success"}>
        {isError ? "Error occurred" : "Success!"}
      </div>
    );
  }

  compareHTML(
    render(Message({ isError: true })),
    `<div class="error">Error occurred</div>`
  );

  compareHTML(render(Message({})), `<div class="success">Success!</div>`);
});
