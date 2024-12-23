import "@reface/jsx/global";
import { TestUtils } from "./testUtils.ts";

Deno.test("JSX - basic element rendering", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div class="container">Hello World</div>,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("JSX - nested elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div class="container">
      <h1>Title</h1>
      <p>Content</p>
    </div>,
    '<div class="container"><h1>Title</h1><p>Content</p></div>',
  );
});

Deno.test("JSX - fragments", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <>
      <div>First</div>
      <div>Second</div>
    </>,
    "<div>First</div><div>Second</div>",
  );
});

Deno.test("JSX - conditional rendering", () => {
  const utils = new TestUtils();
  const showContent = true;
  utils.assertRender(
    <div>
      {showContent && <span>Visible</span>}
      {!showContent && <span>Hidden</span>}
    </div>,
    "<div><span>Visible</span></div>",
  );
});

Deno.test("JSX - handles primitives", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div>
      {false}
      {null}
      {undefined}
      {0}
      {true}
      {""}
    </div>,
    "<div>0</div>",
  );
});
