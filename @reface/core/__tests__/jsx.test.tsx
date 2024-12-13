import { createElement, Fragment } from "../jsx/mod.ts";
import { assertRender } from "./testUtils.ts";

Deno.test("JSX - basic element rendering", () => {
  assertRender(
    <div class="container">Hello World</div>,
    '<div class="container">Hello World</div>'
  );
});

Deno.test("JSX - nested elements", () => {
  assertRender(
    <div class="container">
      <h1>Title</h1>
      <p>Content</p>
    </div>,
    '<div class="container"><h1>Title</h1><p>Content</p></div>'
  );
});

Deno.test("JSX - fragments", () => {
  assertRender(
    <>
      <div>First</div>
      <div>Second</div>
    </>,
    "<div>First</div><div>Second</div>"
  );
});

Deno.test("JSX - conditional rendering", () => {
  const showContent = true;
  assertRender(
    <div>
      {showContent && <span>Visible</span>}
      {!showContent && <span>Hidden</span>}
    </div>,
    "<div><span>Visible</span></div>"
  );
});

Deno.test("JSX - handles primitives", () => {
  assertRender(
    <div>
      {false}
      {null}
      {undefined}
      {0}
      {true}
      {""}
    </div>,
    "<div>0</div>"
  );
}); 