import { createElement, Fragment } from "../jsx/mod.ts";
import { RenderManager } from "../render/RenderManager.ts";
import { assertHtml } from "./testUtils.ts";

Deno.test("JSX - basic element rendering", () => {
  const manager = new RenderManager();
  const template = <div class="container">Hello World</div>;

  assertHtml(
    manager.render(template),
    '<div class="container">Hello World</div>'
  );
});

Deno.test("JSX - nested elements", () => {
  const manager = new RenderManager();
  const template = (
    <div class="container">
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );

  assertHtml(
    manager.render(template),
    '<div class="container"><h1>Title</h1><p>Content</p></div>'
  );
});

Deno.test("JSX - fragments", () => {
  const manager = new RenderManager();
  const template = (
    <>
      <div>First</div>
      <div>Second</div>
    </>
  );

  assertHtml(
    manager.render(template),
    "<div>First</div><div>Second</div>"
  );
});

Deno.test("JSX - conditional rendering", () => {
  const manager = new RenderManager();
  const showContent = true;
  const template = (
    <div>
      {showContent && <span>Visible</span>}
      {!showContent && <span>Hidden</span>}
    </div>
  );

  assertHtml(
    manager.render(template),
    "<div><span>Visible</span></div>"
  );
});

Deno.test("JSX - handles primitives", () => {
  const manager = new RenderManager();
  const template = (
    <div>
      {false}
      {null}
      {undefined}
      {0}
      {true}
      {""}
    </div>
  );

  assertHtml(
    manager.render(template),
    "<div>0</div>"
  );
}); 