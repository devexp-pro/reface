import { assertEquals } from "@std/assert";
import { TestUtils } from "@recast/test-utils";
import { partial } from "@reface/framework";
import { PartialsPlugin } from "@reface/framework";

Deno.test("Parital - markup rendering", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestPartial = partial(
    () => Promise.resolve(<div>test</div>),
    "test-partial",
  );

  utils.assertRender(
    TestPartial`Content`,
    `<div data-partial="test-partial">Content</div>`,
  );

  utils.assertRender(
    <TestPartial>Content</TestPartial>,
    `<div data-partial="test-partial">Content</div>`,
  );
});

Deno.test("Parital - automatic registration and execution", async () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const handler = () => Promise.resolve(<div>test</div>);
  const TestPartial = partial(handler, "test-handler");

  utils.assertRender(
    <TestPartial>Content</TestPartial>,
    `<div data-partial="test-handler">Content</div>`,
  );

  const plugin = utils.recast.getPlugin<PartialsPlugin>(PartialsPlugin);
  const registeredHandler = plugin?.getHandler("test-handler");
  assertEquals(typeof registeredHandler, "function");

  if (!registeredHandler) {
    throw new Error("Handler not found");
  }

  const result = utils.reface.render(await registeredHandler({}));
  assertEquals(result, "<div>test</div>");
});

Deno.test("Parital - data passing", async () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const handler = (data: { name: string }) =>
    Promise.resolve(<div>Hello {data.name}</div>);
  const TestParital = partial(handler, "test-data");

  utils.assertRender(
    <TestParital>Test</TestParital>,
    `<div data-partial="test-data">Test</div>`,
  );

  const plugin = utils.reface.getPlugin(PartialsPlugin);
  const registeredHandler = plugin?.getHandler<{ name: string }>(
    "test-data",
  );
  assertEquals(typeof registeredHandler, "function");

  if (!registeredHandler) {
    throw new Error("Handler not found");
  }
  const result = utils.reface.render(await registeredHandler({ name: "John" }));

  assertEquals(result, "<div>Hello John</div>");
});

Deno.test("Parital - HTMX integration", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestParital = partial(
    () => Promise.resolve(<div>test</div>),
    "test-htmx",
  );
  utils.assertRender(
    <button {...TestParital.trigger("click")}>
      Click me
    </button>,
    `<button 
      hx-get="/reface/partial/test-htmx"
      hx-target="[data-partial='test-htmx']"
      hx-trigger="click">Click me</button>`,
  );
});

Deno.test("Parital - multiple partials", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const FirstParital = partial(
    () => Promise.resolve(<div>first</div>),
    "first",
  );
  const SecondParital = partial(
    () => Promise.resolve(<div>second</div>),
    "second",
  );

  utils.assertRender(
    <div>
      <FirstParital>First Content</FirstParital>
      <SecondParital>Second Content</SecondParital>
    </div>,
    `<div>
      <div data-partial="first">First Content</div>
      <div data-partial="second">Second Content</div>
    </div>`,
  );

  const plugin = utils.recast.getPlugin(PartialsPlugin);
  assertEquals(plugin?.getPartials().size, 2);
});
