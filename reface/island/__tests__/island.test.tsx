import { createElement } from "@reface/jsx";
import { island } from "../island.ts";
import { render } from "@reface/html";
import { styled } from "@reface/styled";
import { ISLAND_API_PREFIX } from "../constants.ts";
import { compareHTML } from "@reface/test-utils";

Deno.test("Island JSX rendering", () => {
  const TestIsland = island(async () => "test", "test-island");

  // Простой рендер
  compareHTML(
    render(<TestIsland />),
    `<div data-island="test-island"></div>`
  );

  // С children
  compareHTML(
    render(
      <TestIsland>
        <span>Loading...</span>
      </TestIsland>
    ),
    `<div data-island="test-island">
      <span>Loading...</span>
    </div>`
  );
});

Deno.test("Island with HxBuilder", () => {
  const TestIsland = island(async () => "test", "test-island");

  // Базовый триггер
  compareHTML(
    render(
      <div {...TestIsland.trigger("submit").swap("afterbegin")}>
        <span>Content</span>
      </div>
    ),
    `<div hx-trigger="submit" 
         hx-swap="afterbegin" 
         hx-get="${ISLAND_API_PREFIX}/test-island" 
         hx-target='[data-island="test-island"]'>
      <span>Content</span>
    </div>`
  );

  // Сложный триггер
  compareHTML(
    render(
      <div {...TestIsland.trigger({ 
        event: "keyup",
        delay: 500,
        throttle: 1000,
        queue: "last",
        once: true
      }).swap("beforeend")}>
        <span>Content</span>
      </div>
    ),
    `<div hx-trigger="keyup[delay:500ms throttle:1000ms queue:last once]" 
         hx-swap="beforeend"
         hx-get="${ISLAND_API_PREFIX}/test-island"
         hx-target='[data-island="test-island"]'>
      <span>Content</span>
    </div>`
  );
});

Deno.test("Island attributes handling", () => {
  const TestIsland = island(async () => "test", "test-island");

  // HTMX атрибуты через spread
  compareHTML(
    render(
      <TestIsland 
        {...TestIsland.trigger("submit").target("#result").swap("afterbegin")}
      >
        <span>Content</span>
      </TestIsland>
    ),
    `<div data-island="test-island" 
         hx-trigger="submit"
         hx-target="#result"
         hx-swap="afterbegin">
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
        {...TestIsland.trigger("submit").target("#result")}
      >
        <span>Content</span>
      </TestIsland>
    ),
    `<div data-island="test-island" 
         data-custom="value" 
         class="test-class" 
         hx-trigger="submit"
         hx-target="#result">
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
      <StyledTestIsland 
        class="custom-class"
        {...TestIsland.trigger("submit").swap("afterbegin")}
      >
        <span>Content</span>
      </StyledTestIsland>
    ),
    `<div data-island="test-island" 
         class="${StyledTestIsland.rootClass} custom-class"
         hx-trigger="submit"
         hx-swap="afterbegin">
      <span>Content</span>
    </div>`
  );
});
