import { assert } from "@std/assert";
import { styled } from "../styled.ts";
import { div } from "../elements.ts";

Deno.test("styled - applies styles with extra class", () => {
  const StyledDiv = styled(div)`
    color: red;
  `;

  const result = StyledDiv({ class: "extra" });
  assert(result.css.includes("color: red"));
  assert(result.attributes?.includes("class"));
  assert(result.attributes?.includes("extra"));
});

Deno.test("styled - applies styles without props", () => {
  const StyledDiv = styled(div)`
    color: blue;
  `;

  const result = StyledDiv();
  assert(result.css.includes("color: blue"));
});
