import { createElement, Fragment } from "@reface/jsx";
import { render } from "@reface/core";
import { styled, component, div } from "@reface/elements";
import { compareHTML } from "./utils.ts";

// 1. Basic Elements
Deno.test("Integration - Basic Elements", () => {
  // JSX
  const jsxTemplate = <div class="container">Hello</div>;
  compareHTML(render(jsxTemplate), `<div class="container">Hello</div>`);

  // Template literal without props
  compareHTML(render(div()`Hello`), `<div>Hello</div>`);

  // Template literal with props
  const container = div({ class: "container" });
  compareHTML(render(container`Hello`), `<div class="container">Hello</div>`);

});

// 2. Components
Deno.test("Integration - Components", () => {
  const Greeting = component<{ name: string }>(
    ({ name }, children) => <div class="greeting">Hello, {name}! {children}</div>
  );

  // JSX with children
  compareHTML(
    render(<Greeting name="John">Welcome!</Greeting>),
    `<div class="greeting">Hello, John! Welcome!</div>`
  );

  // Template literal with props
  compareHTML(
    render(Greeting({ name: "John" })`Welcome!`),
    `<div class="greeting">Hello, John! Welcome!</div>`
  );

  // Template literal without children
  compareHTML(
    render(Greeting({ name: "John" })``),
    `<div class="greeting">Hello, John! </div>`
  );
});

// 3. Styled Components
Deno.test("Integration - Styled Components", () => {
  const Button = styled.button`
    & {
      color: blue;
    }
  `;

  // JSX with class
  compareHTML(
    render(<Button class="primary">Click me</Button>),
    `<button class="${Button.rootClass} primary">Click me</button>
     <style>
       .${Button.rootClass} {
         color: blue;
       }
     </style>`
  );

  // Template literal with props
  compareHTML(
    render(Button({ class: "primary" })`Click me`),
    `<button class="${Button.rootClass} primary">Click me</button>
     <style>
       .${Button.rootClass} {
         color: blue;
       }
     </style>`
  );

  // Template literal without props
  compareHTML(
    render(Button()`Click me`),
    `<button class="${Button.rootClass}">Click me</button>
     <style>
       .${Button.rootClass} {
         color: blue;
       }
     </style>`
  );
});

// 4. Mixing Components
Deno.test("Integration - Mixing Components", () => {
  // Styled component
  const Card = styled.div`
    & { padding: 1rem; }
  `;

  // Regular component using styled component
  const Article = component<{ title: string }>(
    ({ title }, children) => (
      <Card class="article">
        <h1>{title}</h1>
        <div class="content">{children}</div>
      </Card>
    )
  );

  // JSX usage
  compareHTML(
    render(
      <Article title="Hello">
        <p>Some content</p>
      </Article>
    ),
    `
    <div class="${Card.rootClass} article">
      <h1>Hello</h1>
      <div class="content">
        <p>Some content</p>
      </div>
    </div>
    <style>
      .${Card.rootClass} {
        padding: 1rem;
      }
    </style>
    `
  );

  // Template literal usage
  compareHTML(
    render(Article({ title: "Hello" })`<p>Some content</p>`),
    `
    <div class="${Card.rootClass} article">
      <h1>Hello</h1>
      <div class="content">
        <p>Some content</p>
      </div>
    </div>
    <style>
      .${Card.rootClass} {
        padding: 1rem;
      }
    </style>
    `
  );
});

// 5. Extending Styled Components
Deno.test("Integration - Extending Styled Components", () => {
  const BaseButton = styled.button`
    & { padding: 1rem; }
  `;

  const PrimaryButton = styled(BaseButton)`
    & { 
      background: blue;
      color: white;
    }
  `;

  // JSX usage
  compareHTML(
    render(<PrimaryButton class="large">Click me</PrimaryButton>),
    `
    <button class="${PrimaryButton.rootClass} large">Click me</button>
    <style>
      .${PrimaryButton.rootClass} {
        padding: 1rem;
      }
      .${PrimaryButton.rootClass} {
        background: blue;
        color: white;
      }
    </style>
    `
  );

  // Template literal usage
  compareHTML(
    render(PrimaryButton({ class: "large" })`Click me`),
    `
    <button class="${PrimaryButton.rootClass} large">Click me</button>
    <style>
      .${PrimaryButton.rootClass} {
        padding: 1rem;
      }
      .${PrimaryButton.rootClass} {
        background: blue;
        color: white;
      }
    </style>
    `
  );
});

// 6. Fragments and Lists
Deno.test("Integration - Fragments and Lists", () => {
  const List = component<{ items: string[] }>(
    ({ items }) => (
      <Fragment>
        {items.map(item => <li>{item}</li>)}
      </Fragment>
    )
  );

  // Using in JSX
  compareHTML(
    render(
      <ul>
        <List items={["One", "Two"]} />
      </ul>
    ),
    `
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
    `
  );

  // Using with template literals
  compareHTML(
    render(
      <ul>
        {List({ items: ["One", "Two"] })``}
      </ul>
    ),
    `
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
    `
  );
});

// 7. Complex Nesting
Deno.test("Integration - Complex Nesting", () => {
  const Container = styled.div`
    & { margin: 1rem; }
  `;

  const Section = component<{ title: string }>(
    ({ title }, children) => (
      <Container class="section">
        <h2>{title}</h2>
        {children}
      </Container>
    )
  );

  const List = component<{ items: string[] }>(
    ({ items }) => (
      <ul class="list">
        {items.map(item => <li>{item}</li>)}
      </ul>
    )
  );

  // Complex nesting with both JSX and template literals
  compareHTML(
    render(
      <Section title="My List">
        {List({ items: ["A", "B"] })``}
        <div class="footer">
          {Container()`Footer content`}
        </div>
      </Section>
    ),
    `
    <div class="${Container.rootClass} section">
      <h2>My List</h2>
      <ul class="list">
        <li>A</li>
        <li>B</li>
      </ul>
      <div class="footer">
        <div class="${Container.rootClass}">Footer content</div>
      </div>
    </div>
    <style>
      .${Container.rootClass} {
        margin: 1rem;
      }
    </style>
    `
  );
});