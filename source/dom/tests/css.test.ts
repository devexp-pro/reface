import { assert } from "@std/assert";
import { styled, css } from "../../styled/mod.ts";
import { div, button } from "../../elements/mod.ts";

Deno.test("css - applies styles to component", () => {
  const Button = styled(button)`
    color: blue;
  `;

  const result = Button();
  assert(result.css.includes("color: blue"));
});

Deno.test("css - supports nested selectors", () => {
  const Button = styled(button)`
    color: blue;
  `;

  const Card = styled(div)`
    & .${Button().rootClass} {
      color: red;
    }
  `;

  const cardResult = Card();
  const buttonResult = Button();

  assert(cardResult.css.includes(buttonResult.rootClass));
  assert(cardResult.css.includes("color: red"));
});
