import { createElement } from "../jsx/runtime.ts";

import { assertEquals } from "@std/assert";
import { render } from "../render.ts";
import { styled } from "../styled.ts";
import { button } from "../elements.ts";
Deno.test("JSX", async (t) => {
  await t.step("renders basic elements", () => {
    const template = (
      <div class="container">
        <button>Click me!</button>
      </div>
    );

    assertEquals(
      render(template),
      '<div class="container"><button>Click me!</button></div>'
    );
  });

  await t.step("works with styled components", () => {
    const Button = styled(button)`
& {
  color: blue;
}
    `;

    const template = (
      <div>
        <Button class="primary">Submit</Button>
      </div>
    );

    const html = render(template);
    const buttonClass = Button().rootClass;

    assertEquals(
      html,
      `<div><button class="${buttonClass} primary">Submit</button></div>
<style>
.${buttonClass} {
  color: blue;
}
</style>`
    );
  });
});
