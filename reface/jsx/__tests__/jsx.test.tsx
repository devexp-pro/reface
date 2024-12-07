import { createElement, Fragment } from "../mod.ts";
import { render } from "../../core/render.ts";
import { assertEquals } from "@std/assert";
import { compareHTML } from "../../__tests__/utils.ts";
import { styled } from "../../elements/mod.ts";
import { html } from "@reface/html";

Deno.test("JSX - basic elements", () => {
  // Simple element
  compareHTML(
    render(<div>Hello</div>),
    `<div>Hello</div>`
  );

  // With attributes
  compareHTML(
    render(<div class="container">Content</div>),
    `<div class="container">Content</div>`
  );

  // With children
  compareHTML(
    render(
      <div>
        <span>First</span>
        <span>Second</span>
      </div>
    ),
    `<div><span>First</span><span>Second</span></div>`
  );
});

Deno.test("JSX - Fragment", () => {
  // Basic fragment
  compareHTML(
    render(
      <>
        <div>First</div>
        <div>Second</div>
      </>
    ),
    `<div>First</div><div>Second</div>`
  );

  // Nested fragments
  compareHTML(
    render(
      <div>
        <>
          <span>One</span>
          <span>Two</span>
        </>
        <span>Three</span>
      </div>
    ),
    `<div><span>One</span><span>Two</span><span>Three</span></div>`
  );
});

Deno.test("JSX - Components", () => {
  // Function component
  function Button({ text }: { text: string }) {
    return <button class="btn">{text}</button>;
  }

  compareHTML(
    render(<Button text="Click me" />),
    `<button class="btn">Click me</button>`
  );

  // With children
  function Card({ title, children }: { title: string; children: unknown }) {
    return (
      <div class="card">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }

  compareHTML(
    render(
      <Card title="Hello">
        <p>Content</p>
      </Card>
    ),
    `<div class="card"><h2>Hello</h2><p>Content</p></div>`
  );
});

Deno.test("JSX - Dynamic content", () => {
  // Conditional rendering
  const show = true;
  compareHTML(
    render(
      <div>
        {show && <span>Visible</span>}
        {!show && <span>Hidden</span>}
      </div>
    ),
    `<div><span>Visible</span></div>`
  );

  // List rendering
  const items = ["A", "B", "C"];
  compareHTML(
    render(
      <ul>
        {items.map(item => <li>{item}</li>)}
      </ul>
    ),
    `<ul><li>A</li><li>B</li><li>C</li></ul>`
  );

  // Mixed content
  compareHTML(
    render(
      <div>
        Text
        {42}
        <span>Element</span>
        {null}
        {undefined}
      </div>
    ),
    `<div>Text42<span>Element</span></div>`
  );
});

Deno.test("JSX - Attributes", () => {
  // Boolean attributes
  compareHTML(
    render(<input type="checkbox" checked disabled />),
    `<input type="checkbox" checked disabled />`
  );

  // Spread attributes
  const props = { class: "btn", disabled: true };
  compareHTML(
    render(<button {...props}>Click</button>),
    `<button class="btn" disabled>Click</button>`
  );

  // Dynamic attributes
  const isActive = true;
  compareHTML(
    render(<div class={isActive ? "active" : ""}>Content</div>),
    `<div class="active">Content</div>`
  );
});

Deno.test("JSX - styled components", () => {
  // Создаем styled компонент
  const StyledDiv = styled.div`
    & {
      color: blue;
      padding: 10px;
    }
  `;

  // Базовое использование
  const result1 = render(<StyledDiv>Styled content</StyledDiv>);
  const match1 = result1.match(/class="(c[a-z0-9]+)"/);
  const className1 = match1?.[1];

  // Проверяем формат класса
  assertEquals(typeof className1, "string");
  assertEquals(className1?.startsWith("c"), true);
  assertEquals(className1?.length, 7);

  compareHTML(
    result1,
    `<div class="${className1}">Styled content</div>
<style>
  .${className1} {
    color: blue;
    padding: 10px;
  }
</style>`
  );

  // С дополнительными пропсами
  const result2 = render(
    <StyledDiv class="extra-class" data-testid="styled-div">
      With props
    </StyledDiv>
  );
  const match2 = result2.match(/class="(c[a-z0-9]+)\s+extra-class"/);
  const className2 = match2?.[1];

  compareHTML(
    result2,
    `<div class="${className2} extra-class" data-testid="styled-div">With props</div>
<style>
  .${className2} {
    color: blue;
    padding: 10px;
  }
</style>`
  );

  // Вложенные styled компоненты
  const StyledSpan = styled.span`
    & {
      font-weight: bold;
    }
  `;

  const result3 = render(
    <StyledDiv>
      <StyledSpan>Nested styled content</StyledSpan>
    </StyledDiv>
  );
  const match3 = result3.match(/class="(c[a-z0-9]+)"/g);
  const className3 = match3?.[0].match(/"(c[a-z0-9]+)"/)?.[1];
  const className4 = match3?.[1].match(/"(c[a-z0-9]+)"/)?.[1];

  compareHTML(
    result3,
    `<div class="${className3}"><span class="${className4}">Nested styled content</span></div>
<style>
  .${className3} {
    color: blue;
    padding: 10px;
  }
  .${className4} {
    font-weight: bold;
  }
</style>`
  );
});
