import { createElement } from "@reface/jsx";
import { island } from "../island.ts";
import { assertEquals } from "@std/assert";
import { render } from "@reface/html";
import { styled } from "@reface/styled";
import { ISLAND_API_PREFIX } from "../TemplateIsland.ts";
import { compareHTML } from "@reface/test-utils";

Deno.test("Island JSX rendering", () => {
  const TestIsland = island(async () => "test", "test-island");

  // Простой рендер
  compareHTML(
    render(<TestIsland />),
    `<div data-island="test-island" hx-get="${ISLAND_API_PREFIX}/test-island"></div>`
  );

  // С children
  compareHTML(
    render(
      <TestIsland>
        <span>Loading...</span>
      </TestIsland>
    ),
    `<div data-island="test-island" hx-get="${ISLAND_API_PREFIX}/test-island">
      <span>Loading...</span>
    </div>`
  );
});

Deno.test("Island trigger formatting", () => {
  const TestIsland = island(async () => "test", "test-island");

  // Строка
  assertEquals(
    TestIsland.trigger("click"),
    { "hx-trigger": "click" }
  );

  // Массив
  assertEquals(
    TestIsland.trigger(["load", "click"]),
    { "hx-trigger": "load, click" }
  );

  // Объект с настройками
  assertEquals(
    TestIsland.trigger({
      event: "keyup",
      changed: true,
      delay: "1s"
    }),
    { "hx-trigger": "keyup changed delay:1s" }
  );
});

Deno.test("Island combined usage", () => {
  const TestIsland = island(async () => "test", "test-island");

  // JSX с триггером
  compareHTML(
    render(
      <div {...TestIsland.trigger("click")}>
        <TestIsland />
      </div>
    ),
    `<div hx-trigger="click">
      <div data-island="test-island" hx-get="${ISLAND_API_PREFIX}/test-island"></div>
    </div>`
  );

  // Template literal с триггером
  compareHTML(
    render(
      <div {...TestIsland.trigger({ every: 5 })}>
        {TestIsland()`Loading...`}
      </div>
    ),
    `<div hx-trigger="every 5s">
      <div data-island="test-island" hx-get="${ISLAND_API_PREFIX}/test-island">Loading...</div>
    </div>`
  );
});

Deno.test("Island attributes handling", () => {
  const TestIsland = island(async () => "test", "test-island");

  // HTMX атрибуты
  compareHTML(
    render(
      <TestIsland 
        hx-include="#count" 
        hx-target="#result"
      >
        <span>Content</span>
      </TestIsland>
    ),
    `<div data-island="test-island" 
         hx-get="${ISLAND_API_PREFIX}/test-island" 
         hx-include="#count" 
         hx-target="#result">
      <span>Content</span>
    </div>`
  );

  // Классы
  compareHTML(
    render(
      <TestIsland class="custom-class">
        <span>Content</span>
      </TestIsland>
    ),
    `<div data-island="test-island" 
         hx-get="${ISLAND_API_PREFIX}/test-island" 
         class="custom-class">
      <span>Content</span>
    </div>`
  );

  // Комбинация атрибутов
  compareHTML(
    render(
      <TestIsland 
        data-custom="value"
        class="test-class"
        hx-include="#count"
      >
        <span>Content</span>
      </TestIsland>
    ),
    `<div data-island="test-island" 
         hx-get="${ISLAND_API_PREFIX}/test-island" 
         data-custom="value" 
         class="test-class" 
         hx-include="#count">
      <span>Content</span>
    </div>`
  );
});

Deno.test("Island with styled components", () => {
  const TestIsland = island(async () => "test", "test-island");
  const StyledTestIsland = styled(TestIsland)`
    color: red;
  `;

  compareHTML(
    render(
      <StyledTestIsland class="custom-class">
        <span>Content</span>
      </StyledTestIsland>
    ),
    `<div data-island="test-island" 
         hx-get="${ISLAND_API_PREFIX}/test-island" 
         class="${StyledTestIsland.rootClass} custom-class">
      <span>Content</span>
    </div>`
  );
});
