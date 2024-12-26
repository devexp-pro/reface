import { assertEquals } from "@std/assert";
import { TestUtils } from "./testUtils.ts";
import { partial } from "@reface/plugins/partials";
import { PartialsPlugin } from "@reface/plugins/partials";

Deno.test("Parital - markup rendering", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestPartial = partial(() => Promise.resolve("test"), "test-partial");

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
  const handler = () => Promise.resolve({ value: "test" });
  const TestPartial = partial(handler, "test-handler");

  utils.assertRender(
    <TestPartial>Content</TestPartial>,
    `<div data-partial="test-handler">Content</div>`,
  );

  const plugin = utils.reface.getPlugin(PartialsPlugin);
  const registeredHandler = plugin?.getHandler("test-handler");
  assertEquals(typeof registeredHandler, "function");

  const result = await registeredHandler?.();
  assertEquals(result, { value: "test" });
});

Deno.test("Parital - data passing", async () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const handler = () => Promise.resolve({ message: "Hello" });
  const TestParital = partial(handler, "test-data");

  utils.assertRender(
    <TestParital>Test</TestParital>,
    `<div data-partial="test-data">Test</div>`,
  );

  const plugin = utils.reface.getPlugin(PartialsPlugin);
  const registeredHandler = plugin?.getHandler("test-data");
  const result = await registeredHandler?.();

  assertEquals(result, { message: "Hello" });
});

Deno.test("Parital - HTMX integration", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestParital = partial(() => Promise.resolve("test"), "test-htmx");
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
  const FirstParital = partial(() => Promise.resolve("first"), "first");
  const SecondParital = partial(() => Promise.resolve("second"), "second");

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

  const plugin = utils.reface.getPlugin(PartialsPlugin);
  assertEquals(plugin?.getPartials().size, 2);
});
