import { createElement } from "../core/jsx/mod.ts";
import { assertEquals } from "@std/assert";
import { island } from "../plugins/island/mod.ts";
import { TestUtils } from "./testUtils.ts";
import { IslandPlugin } from "../plugins/island/mod.ts";

// Тестируем разметку
Deno.test("Island - markup rendering", () => {
  const utils = new TestUtils({ plugins: [new IslandPlugin()] });
  const TestIsland = island(async () => "test", "test-island");

  // HTML синтаксис
  utils.assertRender(
    TestIsland()`Content`,
    `<div data-island="test-island">Content</div>`
  );

  // JSX синтаксис
  utils.assertRender(
    <TestIsland>Content</TestIsland>,
    `<div data-island="test-island">Content</div>`
  );

  // Element синтаксис
  utils.assertRender(
    TestIsland({}, ["Content"]),
    `<div data-island="test-island">Content</div>`
  );
});

// Тестируем автоматическую регистрацию и выполнение
Deno.test("Island - automatic registration and execution", async () => {
  const utils = new TestUtils({ plugins: [new IslandPlugin()] });
  const handler = async () => ({ value: "test" });
  const TestIsland = island(handler, "test-handler");
  
  // Рендерим для регистрации
  utils.assertRender(
    <TestIsland>Content</TestIsland>,
    `<div data-island="test-handler">Content</div>`
  );

  // Проверяем регистрацию
  const plugin = utils.reface.getPlugin("island");
  const registeredHandler = plugin.getHandler("test-handler");
  assertEquals(typeof registeredHandler, "function");

  // Проверяем выполнение
  const result = await registeredHandler();
  assertEquals(result, { value: "test" });
});

// Тестируем передачу данных
Deno.test("Island - data passing", async () => {
  const utils = new TestUtils({ plugins: [new IslandPlugin()] });
  const handler = async () => ({ message: "Hello" });
  const TestIsland = island(handler, "test-data");
  
  // Рендерим для регистрации
  utils.assertRender(
    <TestIsland>Test</TestIsland>,
    `<div data-island="test-data">Test</div>`
  );
  
  const plugin = utils.reface.getPlugin("island");
  const registeredHandler = plugin.getHandler("test-data");
  const result = await registeredHandler();
  
  assertEquals(result, { message: "Hello" });
});

// Тестируем интеграцию с HTMX
Deno.test("Island - HTMX integration", () => {
  const utils = new TestUtils({ plugins: [new IslandPlugin()] });
  const TestIsland = island(async () => "test", "test-htmx");

  utils.assertRender(
    <button {...TestIsland.trigger("click")}>
      Click me
    </button>,
    `<button 
      hx-get="/reface-island/test-htmx"
      hx-target="[data-island='test-htmx']"
      hx-trigger="click">Click me</button>`
  );
});

// Тестируем множественные острова
Deno.test("Island - multiple islands", () => {
  const utils = new TestUtils({ plugins: [new IslandPlugin()] });
  const FirstIsland = island(async () => "first", "first");
  const SecondIsland = island(async () => "second", "second");

  utils.assertRender(
    <div>
      <FirstIsland>First Content</FirstIsland>
      <SecondIsland>Second Content</SecondIsland>
    </div>,
    `<div>
      <div data-island="first">First Content</div>
      <div data-island="second">Second Content</div>
    </div>`
  );

  const plugin = utils.reface.getPlugin("island");
  assertEquals(plugin.getIslands().size, 2);
}); 