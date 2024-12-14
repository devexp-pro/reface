import { createElement } from "../core/jsx/mod.ts";
import { assertEquals } from "@std/assert";
import { partial } from "../plugins/partials/mod.ts";
import { TestUtils } from "./testUtils.ts";
import { PartialsPlugin } from "../plugins/partials/mod.ts";
// Тестируем разметку
Deno.test("Parital - markup rendering", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestPartial = partial(async () => "test", "test-partial");

  // HTML синтаксис
  utils.assertRender(
    TestPartial()`Content`,
    `<div data-partial="test-partial">Content</div>`
  );

  // JSX синтаксис
  utils.assertRender(
    <TestPartial>Content</TestPartial>,
    `<div data-partial="test-partial">Content</div>`
  );

  // Element синтаксис
  utils.assertRender(
    TestPartial({}, ["Content"]),
    `<div data-partial="test-partial">Content</div>`
  );
});

// Тестируем автоматическую регистрацию и выполнение
Deno.test("Parital - automatic registration and execution", async () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const handler = async () => ({ value: "test" });
  const TestPartial = partial(handler, "test-handler");
  
  // Рендерим для регистрации
  utils.assertRender(
    <TestPartial>Content</TestPartial>,
    `<div data-partial="test-handler">Content</div>`
  );

  // Проверяем регистрацию
  const plugin = utils.reface.getPlugin(PartialsPlugin);
  const registeredHandler = plugin?.getHandler("test-handler");
  assertEquals(typeof registeredHandler, "function");

  // Проверяем выполнение
  const result = await registeredHandler();
  assertEquals(result, { value: "test" });
});

// Тестируем передачу данных
Deno.test("Parital - data passing", async () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const handler = async () => ({ message: "Hello" });
  const TestParital = partial(handler, "test-data");
  
  // Рендерим для регистрации
  utils.assertRender(
    <TestParital>Test</TestParital>,
    `<div data-partial="test-data">Test</div>`
  );
  
  const plugin = utils.reface.getPlugin(PartialsPlugin);
  const registeredHandler = plugin?.getHandler("test-data");
  const result = await registeredHandler();
  
  assertEquals(result, { message: "Hello" });
});

// Тестируем интеграцию с HTMX
Deno.test("Parital - HTMX integration", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const TestParital = partial(async () => "test", "test-htmx");

  utils.assertRender(
    <button {...TestParital.trigger("click")}>
      Click me
    </button>,
    `<button 
      hx-get="/reface-partial/test-htmx"
      hx-target="[data-partial='test-htmx']"
      hx-trigger="click">Click me</button>`
  );
});

// Тестируем множественные острова
Deno.test("Parital - multiple partials", () => {
  const utils = new TestUtils({ plugins: [new PartialsPlugin()] });
  const FirstParital = partial(async () => "first", "first");
  const SecondParital = partial(async () => "second", "second");

  utils.assertRender(
    <div>
      <FirstParital>First Content</FirstParital>
      <SecondParital>Second Content</SecondParital>
    </div>,
    `<div>
      <div data-partial="first">First Content</div>
      <div data-partial="second">Second Content</div>
    </div>`
  );

  const plugin = utils.reface.getPlugin(PartialsPlugin);
  assertEquals(plugin?.getPartials().size, 2);
}); 
