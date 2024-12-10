import { createElement, Fragment } from "@reface/jsx";
import { render } from "@reface/html";
import type { Template } from "@reface/html";
import { component } from "@reface/component";
import { compareHTML } from "@reface/test-utils";

Deno.test("JSX - basic rendering", () => {
  const template = <div class="test">Hello World</div>;
  compareHTML(render(template), `<div class="test">Hello World</div>`);
});

Deno.test("JSX - component with props", () => {

  const Greeting = component<{ name: string }>(
    ({ name }, children) => <div class="greeting">Hello, {name}! {children}</div>
  );

  // JSX использование
  compareHTML(
    render(<Greeting name="John">Welcome!</Greeting>),
    `<div class="greeting">Hello, John! Welcome!</div>`
  );

  // Template literal использование
  compareHTML(
    render(Greeting({ name: "John" })`Welcome!`),
    `<div class="greeting">Hello, John! Welcome!</div>`
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
  interface HeaderProps {
    title: string;
  }

  const Header = component<HeaderProps>(
    function Header({ title }) {
      return (
        <header class="header">
          <h1>{title}</h1>
        </header>
      );
    }
  );

  interface LayoutProps {
    title?: string;
  }

  const Layout = component<LayoutProps>(
    function Layout({ title = "Default" }, children) {
      return (
        <div class="layout">
          <Header title={title} />
          <main>{children}</main>
        </div>
      );
    }
  );

  compareHTML(
    render(
      <Layout title="Welcome">
        <div class="content">Hello World</div>
      </Layout>
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
  function Message({ isError }: { isError?: boolean }): Template {
    return (
      <div class={isError ? "error" : "success"}>
        {isError ? "Error occurred" : "Success!"}
      </div>
    );
  }

  compareHTML(
    render(<Message isError />),
    `<div class="error">Error occurred</div>`
  );

  compareHTML(
    render(<Message />),
    `<div class="success">Success!</div>`
  );
});
