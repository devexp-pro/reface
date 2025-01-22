import { TestUtils } from "../test-utils/mod.ts";
import { Template } from "./template.ts";
import { assertEquals } from "@std/assert";
import { SlotsPlugin } from "@recast/slots/mod.ts";
import { componentExpression } from "@recast/expressions/mod.ts";
const test = new TestUtils({ plugins: [new SlotsPlugin()] });

Deno.test("Template Slot - render empty when has children", () => {
  test.assertRender(
    <Template slot="test">
      <div>Content</div>
    </Template>,
    "",
  );
});
